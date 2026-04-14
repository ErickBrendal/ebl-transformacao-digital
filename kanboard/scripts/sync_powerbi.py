#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sync_powerbi.py
Sincronização automática: Kanboard -> Power BI
Playbook:
  1. Autenticar no Power BI via MSAL (username/password flow)
  2. Buscar tarefas abertas (status_id=1) e fechadas (status_id=0) de todos os projetos
  3. Enriquecer com dados do excel_map.json e metadados da descrição
  4. Calcular KPIs, distribuição por fase e métricas por responsável
  5. Limpar tabelas Demandas/KPIs/Fases/Responsaveis do dataset
  6. Inserir dados atualizados em lotes de 500
  7. Salvar CSV e log
"""

import os
import sys
import re
import json
import csv
import time
import logging
import requests
from datetime import datetime, timezone

# ─── Configurações ───────────────────────────────────────────────────────────
KANBOARD_URL      = "https://kanboard.eblsolucoescorp.tec.br/jsonrpc.php"
KANBOARD_USER     = "jsonrpc"
KANBOARD_TOKEN    = "ea99d4c7d96dbad1b1a1defd79f92286884e1902015ff96731ce624e6317"

PBI_TENANT        = "208364c6-eee7-4324-ac4a-d45fe452a1bd"
PBI_CLIENT_ID     = "1950a258-227b-4e31-a9cf-717495945fc2"
PBI_USERNAME      = "admebl@eblsolucoescorporativas.com"
PBI_PASSWORD      = "Senha@2026"
PBI_DATASET_ID    = "39d50fe5-cde9-4244-b5e5-422a73e8e142"
PBI_SCOPE         = ["https://analysis.windows.net/powerbi/api/.default"]

EXCEL_MAP_PATH    = "/home/ubuntu/kanboard/excel_map.json"
OUTPUT_CSV        = "/home/ubuntu/kanboard/powerbi/kanboard_dados_final.csv"
OUTPUT_LOG        = "/home/ubuntu/kanboard/powerbi/sync_log.json"
BATCH_SIZE        = 500

# ─── Logging ─────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
log = logging.getLogger("sync_powerbi")

sync_log = {
    "inicio": datetime.now(timezone.utc).isoformat(),
    "fim": None,
    "status": "em_andamento",
    "etapas": [],
    "erros": [],
    "totais": {}
}

def log_etapa(nome, status, detalhes=None):
    entry = {"etapa": nome, "status": status, "timestamp": datetime.now(timezone.utc).isoformat()}
    if detalhes:
        entry["detalhes"] = detalhes
    sync_log["etapas"].append(entry)
    log.info(f"[{status.upper()}] {nome}" + (f" — {detalhes}" if detalhes else ""))

def log_erro(nome, erro):
    entry = {"etapa": nome, "erro": str(erro), "timestamp": datetime.now(timezone.utc).isoformat()}
    sync_log["erros"].append(entry)
    log.error(f"[ERRO] {nome}: {erro}")

# ─── 1. Autenticação Power BI via MSAL ───────────────────────────────────────
def autenticar_powerbi():
    log.info("=== ETAPA 1: Autenticação Power BI via MSAL ===")
    try:
        import msal
        authority = f"https://login.microsoftonline.com/{PBI_TENANT}"
        app = msal.PublicClientApplication(PBI_CLIENT_ID, authority=authority)
        result = app.acquire_token_by_username_password(
            username=PBI_USERNAME,
            password=PBI_PASSWORD,
            scopes=PBI_SCOPE
        )
        if "access_token" in result:
            log_etapa("Autenticação Power BI", "sucesso", f"Token obtido para {PBI_USERNAME}")
            return result["access_token"]
        else:
            erro_msg = result.get("error_description", result.get("error", "Erro desconhecido"))
            log_erro("Autenticação Power BI", erro_msg)
            log_etapa("Autenticação Power BI", "falha", erro_msg)
            return None
    except Exception as e:
        log_erro("Autenticação Power BI", e)
        log_etapa("Autenticação Power BI", "falha", str(e))
        return None

# ─── 2. Buscar tarefas do Kanboard ───────────────────────────────────────────
def kanboard_rpc(method, params=None):
    payload = {
        "jsonrpc": "2.0",
        "method": method,
        "id": 1,
        "params": params or {}
    }
    try:
        resp = requests.post(
            KANBOARD_URL,
            json=payload,
            auth=(KANBOARD_USER, KANBOARD_TOKEN),
            timeout=60
        )
        resp.raise_for_status()
        data = resp.json()
        if "error" in data:
            raise Exception(f"JSON-RPC error: {data['error']}")
        return data.get("result", [])
    except Exception as e:
        log_erro(f"Kanboard RPC ({method})", e)
        return None

def buscar_mapeamentos():
    """Retorna dicts de column_id->nome e user_id->nome."""
    col_map = {}
    user_map = {}
    users = kanboard_rpc("getAllUsers") or []
    for u in users:
        user_map[str(u.get("id", ""))] = u.get("name") or u.get("username", "")
    for pid in [1, 2, 3, 4, 5, 6, 7]:
        cols = kanboard_rpc("getColumns", {"project_id": pid}) or []
        for c in cols:
            col_map[str(c.get("id", ""))] = c.get("title", "")
    log.info(f"  Mapeamentos: {len(col_map)} colunas, {len(user_map)} usuários")
    return col_map, user_map

def buscar_tarefas():
    log.info("=== ETAPA 2: Buscar tarefas do Kanboard ===")
    tarefas = []
    projetos = kanboard_rpc("getAllProjects") or []
    projetos_ativos = [p for p in projetos if p.get("is_active")]
    projeto_nome = {str(p["id"]): p["name"] for p in projetos_ativos}
    log.info(f"  Projetos ativos: {[p['name'] for p in projetos_ativos]}")

    col_map, user_map = buscar_mapeamentos()

    total_abertas = 0
    total_fechadas = 0

    for p in projetos_ativos:
        pid = int(p["id"])
        nome_proj = p["name"]

        abertas = kanboard_rpc("getAllTasks", {"project_id": pid, "status_id": 1}) or []
        for t in abertas:
            t["_projeto_nome"] = nome_proj
            t["_col_map"] = col_map
            t["_user_map"] = user_map
        tarefas.extend(abertas)
        total_abertas += len(abertas)

        fechadas = kanboard_rpc("getAllTasks", {"project_id": pid, "status_id": 0}) or []
        for t in fechadas:
            t["_projeto_nome"] = nome_proj
            t["_col_map"] = col_map
            t["_user_map"] = user_map
        tarefas.extend(fechadas)
        total_fechadas += len(fechadas)

        log.info(f"  [{nome_proj}] abertas={len(abertas)}, fechadas={len(fechadas)}")

    log_etapa("Buscar tarefas Kanboard", "sucesso" if tarefas else "aviso",
              f"Total: {len(tarefas)} tarefas (abertas: {total_abertas}, fechadas: {total_fechadas})")
    return tarefas

# ─── 3. Enriquecer com excel_map.json e descrição ────────────────────────────
def carregar_excel_map():
    try:
        with open(EXCEL_MAP_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        log_erro("Carregar excel_map.json", e)
        return {"default": {"area": "Geral", "valor": 0, "horas": 0, "tipo": "Demanda"}, "tarefas": {}}

def extrair_campo_desc(desc, campo):
    """Extrai valor de campo estruturado da descrição Markdown.
    Captura apenas texto na mesma linha, ignorando linhas que começam com **.
    """
    pattern = r'\*\*' + re.escape(campo) + r':\*\*\s*([^\n*][^\n]*)'
    m = re.search(pattern, desc or "")
    val = m.group(1).strip() if m else ""
    return val if val and val not in ("N/A", "-", "—") else ""

def enriquecer_tarefas(tarefas, excel_map):
    log.info("=== ETAPA 3: Enriquecer tarefas com excel_map.json e descrição ===")
    default = excel_map.get("default", {"area": "Geral", "valor": 0, "horas": 0, "tipo": "Demanda"})
    mapa = excel_map.get("tarefas", {})
    enriquecidas = []

    def ts_to_str(ts):
        if ts and str(ts) not in ("0", "None", "null", ""):
            try:
                return datetime.fromtimestamp(int(ts), tz=timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
            except Exception:
                return ""
        return ""

    for t in tarefas:
        tid = str(t.get("id", ""))
        extra = mapa.get(tid, default)

        is_active = t.get("is_active", True)
        status = "Aberta" if (is_active is True or str(is_active) in ("1", "true", "True")) else "Fechada"

        col_map = t.get("_col_map", {})
        user_map = t.get("_user_map", {})
        coluna_nome = col_map.get(str(t.get("column_id", "")), "") or "Sem Fase"

        # Extrair metadados da descrição
        desc = t.get("description", "") or ""
        resp_desc        = extrair_campo_desc(desc, "Responsável TI")
        area_ti_desc     = extrair_campo_desc(desc, "Área TI")
        area_negocio     = extrair_campo_desc(desc, "Área de Negócio")
        sponsor          = extrair_campo_desc(desc, "Sponsor")
        cherwell         = extrair_campo_desc(desc, "Cherwell")
        fase_chamado     = extrair_campo_desc(desc, "Fase/Chamado")
        subcategoria     = extrair_campo_desc(desc, "Subcategoria")

        # Responsável: prioridade descrição > owner_id
        owner_id = str(t.get("owner_id", "0") or "0")
        responsavel = (
            resp_desc or
            (user_map.get(owner_id) if owner_id != "0" else None) or
            "Não atribuído"
        )

        # Área: prioridade descrição > excel_map > default
        area = area_ti_desc or extra.get("area", default.get("area", "Geral"))

        enriquecida = {
            "id":               tid,
            "titulo":           t.get("title", ""),
            "status":           status,
            "projeto":          t.get("_projeto_nome", ""),
            "coluna":           coluna_nome,
            "responsavel":      responsavel,
            "area_ti":          area,
            "area_negocio":     area_negocio,
            "sponsor":          sponsor,
            "cherwell":         cherwell,
            "fase_chamado":     fase_chamado,
            "subcategoria":     subcategoria,
            "prioridade":       t.get("priority", 0),
            "pontos":           t.get("score", 0),
            "data_criacao":     ts_to_str(t.get("date_creation", 0)),
            "data_modificacao": ts_to_str(t.get("date_modification", 0)),
            "data_vencimento":  ts_to_str(t.get("date_due", 0)),
            "data_conclusao":   ts_to_str(t.get("date_completed", 0)),
            "valor":            extra.get("valor", default.get("valor", 0)),
            "horas":            extra.get("horas", default.get("horas", 0)),
            "tipo":             extra.get("tipo", default.get("tipo", "Demanda")),
            "tags":             ", ".join(t.get("tags", [])) if isinstance(t.get("tags"), list) else str(t.get("tags", "")),
        }
        enriquecidas.append(enriquecida)

    log_etapa("Enriquecer tarefas", "sucesso", f"{len(enriquecidas)} tarefas enriquecidas")
    return enriquecidas

# ─── 4. Calcular KPIs, Fases e Responsáveis ──────────────────────────────────
def calcular_kpis(tarefas):
    log.info("=== ETAPA 4: Calcular KPIs, Fases e Responsáveis ===")
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

    total    = len(tarefas)
    abertas  = sum(1 for t in tarefas if t["status"] == "Aberta")
    fechadas = sum(1 for t in tarefas if t["status"] == "Fechada")
    valor_total       = sum(float(t.get("valor", 0) or 0) for t in tarefas)
    horas_total       = sum(float(t.get("horas", 0) or 0) for t in tarefas)
    valor_concluido   = sum(float(t.get("valor", 0) or 0) for t in tarefas if t["status"] == "Fechada")
    horas_concluidas  = sum(float(t.get("horas", 0) or 0) for t in tarefas if t["status"] == "Fechada")
    perc_conclusao    = round((fechadas / total * 100), 2) if total > 0 else 0

    kpis = [
        {"metrica": "Total de Demandas",      "valor": total,                     "unidade": "tarefas", "data_calculo": now_str},
        {"metrica": "Demandas Abertas",        "valor": abertas,                   "unidade": "tarefas", "data_calculo": now_str},
        {"metrica": "Demandas Fechadas",       "valor": fechadas,                  "unidade": "tarefas", "data_calculo": now_str},
        {"metrica": "Percentual de Conclusão", "valor": perc_conclusao,            "unidade": "%",       "data_calculo": now_str},
        {"metrica": "Valor Total",             "valor": round(valor_total, 2),     "unidade": "R$",      "data_calculo": now_str},
        {"metrica": "Valor Concluído",         "valor": round(valor_concluido, 2), "unidade": "R$",      "data_calculo": now_str},
        {"metrica": "Horas Totais",            "valor": round(horas_total, 2),     "unidade": "h",       "data_calculo": now_str},
        {"metrica": "Horas Concluídas",        "valor": round(horas_concluidas, 2),"unidade": "h",       "data_calculo": now_str},
    ]

    # Distribuição por fase (projeto + coluna)
    fases_dict = {}
    for t in tarefas:
        chave = f"{t.get('projeto', '')} | {t.get('coluna', 'Sem Fase') or 'Sem Fase'}"
        if chave not in fases_dict:
            fases_dict[chave] = {
                "fase": t.get("coluna", "Sem Fase") or "Sem Fase",
                "projeto": t.get("projeto", ""),
                "total": 0, "abertas": 0, "fechadas": 0,
                "valor": 0.0, "horas": 0.0, "data_calculo": now_str
            }
        fases_dict[chave]["total"] += 1
        if t["status"] == "Aberta":
            fases_dict[chave]["abertas"] += 1
        else:
            fases_dict[chave]["fechadas"] += 1
        fases_dict[chave]["valor"] += float(t.get("valor", 0) or 0)
        fases_dict[chave]["horas"] += float(t.get("horas", 0) or 0)
    fases = list(fases_dict.values())
    for f in fases:
        f["valor"] = round(f["valor"], 2)
        f["horas"] = round(f["horas"], 2)

    # Métricas por responsável
    resp_dict = {}
    for t in tarefas:
        resp = t.get("responsavel", "Não atribuído") or "Não atribuído"
        if resp not in resp_dict:
            resp_dict[resp] = {
                "responsavel": resp, "total": 0, "abertas": 0, "fechadas": 0,
                "valor": 0.0, "horas": 0.0, "data_calculo": now_str
            }
        resp_dict[resp]["total"] += 1
        if t["status"] == "Aberta":
            resp_dict[resp]["abertas"] += 1
        else:
            resp_dict[resp]["fechadas"] += 1
        resp_dict[resp]["valor"] += float(t.get("valor", 0) or 0)
        resp_dict[resp]["horas"] += float(t.get("horas", 0) or 0)
    responsaveis = list(resp_dict.values())
    for r in responsaveis:
        r["valor"] = round(r["valor"], 2)
        r["horas"] = round(r["horas"], 2)
        r["perc_conclusao"] = round((r["fechadas"] / r["total"] * 100), 2) if r["total"] > 0 else 0

    log_etapa("Calcular KPIs/Fases/Responsáveis", "sucesso",
              f"KPIs: {len(kpis)}, Fases: {len(fases)}, Responsáveis: {len(responsaveis)}")
    return kpis, fases, responsaveis

# ─── 5 & 6. Limpar tabelas e inserir dados no Power BI ───────────────────────
def pbi_headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

def limpar_tabela(token, tabela):
    url = f"https://api.powerbi.com/v1.0/myorg/datasets/{PBI_DATASET_ID}/tables/{tabela}/rows"
    try:
        resp = requests.delete(url, headers=pbi_headers(token), timeout=30)
        if resp.status_code in (200, 204):
            log.info(f"  Tabela '{tabela}' limpa.")
            return True
        else:
            log_erro(f"Limpar tabela {tabela}", f"HTTP {resp.status_code}: {resp.text[:200]}")
            return False
    except Exception as e:
        log_erro(f"Limpar tabela {tabela}", e)
        return False

def inserir_lotes(token, tabela, rows):
    url = f"https://api.powerbi.com/v1.0/myorg/datasets/{PBI_DATASET_ID}/tables/{tabela}/rows"
    total = len(rows)
    inseridos = 0
    for i in range(0, total, BATCH_SIZE):
        lote = rows[i:i+BATCH_SIZE]
        try:
            resp = requests.post(url, headers=pbi_headers(token), json={"rows": lote}, timeout=60)
            if resp.status_code in (200, 201):
                inseridos += len(lote)
                log.info(f"  [{tabela}] Lote {i//BATCH_SIZE + 1}: {len(lote)} registros inseridos.")
            else:
                log_erro(f"Inserir lote {tabela}", f"HTTP {resp.status_code}: {resp.text[:300]}")
        except Exception as e:
            log_erro(f"Inserir lote {tabela}", e)
    return inseridos

def sincronizar_powerbi(token, tarefas, kpis, fases, responsaveis):
    log.info("=== ETAPA 5: Limpar tabelas do dataset Power BI ===")
    tabelas = ["Demandas", "KPIs", "Fases", "Responsaveis"]
    for tabela in tabelas:
        limpar_tabela(token, tabela)
    log_etapa("Limpar tabelas Power BI", "sucesso", f"Tabelas: {tabelas}")

    log.info("=== ETAPA 6: Inserir dados atualizados em lotes de 500 ===")
    ins_d = inserir_lotes(token, "Demandas", tarefas)
    ins_k = inserir_lotes(token, "KPIs", kpis)
    ins_f = inserir_lotes(token, "Fases", fases)
    ins_r = inserir_lotes(token, "Responsaveis", responsaveis)

    log_etapa("Inserir dados Power BI", "sucesso",
              f"Demandas: {ins_d}, KPIs: {ins_k}, Fases: {ins_f}, Responsáveis: {ins_r}")
    return ins_d, ins_k, ins_f, ins_r

# ─── 7. Salvar CSV e Log ─────────────────────────────────────────────────────
def salvar_csv(tarefas):
    log.info("=== ETAPA 7a: Salvar CSV ===")
    os.makedirs(os.path.dirname(OUTPUT_CSV), exist_ok=True)
    if not tarefas:
        log.warning("Nenhuma tarefa para salvar.")
        return
    campos = list(tarefas[0].keys())
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=campos)
        writer.writeheader()
        writer.writerows(tarefas)
    log_etapa("Salvar CSV", "sucesso", f"{len(tarefas)} registros em {OUTPUT_CSV}")
    log.info(f"  CSV salvo: {OUTPUT_CSV}")

def salvar_log():
    log.info("=== ETAPA 7b: Salvar Log ===")
    sync_log["fim"] = datetime.now(timezone.utc).isoformat()
    sync_log["status"] = "concluido" if not sync_log["erros"] else "concluido_com_erros"
    os.makedirs(os.path.dirname(OUTPUT_LOG), exist_ok=True)
    with open(OUTPUT_LOG, "w", encoding="utf-8") as f:
        json.dump(sync_log, f, ensure_ascii=False, indent=2)
    log.info(f"  Log salvo: {OUTPUT_LOG}")

# ─── Main ─────────────────────────────────────────────────────────────────────
def main():
    log.info("=" * 60)
    log.info("  SYNC KANBOARD -> POWER BI")
    log.info(f"  Início: {datetime.now(timezone.utc).isoformat()}")
    log.info("=" * 60)

    token = autenticar_powerbi()
    pbi_disponivel = token is not None

    tarefas_raw = buscar_tarefas()
    if not tarefas_raw:
        log.warning("Nenhuma tarefa encontrada. Encerrando.")
        sync_log["totais"]["tarefas"] = 0
        salvar_log()
        return

    excel_map = carregar_excel_map()
    tarefas = enriquecer_tarefas(tarefas_raw, excel_map)
    kpis, fases, responsaveis = calcular_kpis(tarefas)

    sync_log["totais"] = {
        "tarefas": len(tarefas),
        "kpis": len(kpis),
        "fases": len(fases),
        "responsaveis": len(responsaveis)
    }

    if pbi_disponivel:
        ins_d, ins_k, ins_f, ins_r = sincronizar_powerbi(token, tarefas, kpis, fases, responsaveis)
        sync_log["totais"]["inseridos"] = {
            "Demandas": ins_d, "KPIs": ins_k, "Fases": ins_f, "Responsaveis": ins_r
        }
    else:
        log.warning("Token Power BI indisponível (MFA). Dados salvos localmente.")
        log_etapa("Sincronização Power BI", "pulado",
                  "MFA habilitado — desabilitar MFA ou usar service principal com certificado")

    salvar_csv(tarefas)
    salvar_log()

    log.info("=" * 60)
    log.info("  SYNC CONCLUÍDO")
    log.info(f"  Tarefas: {len(tarefas)} | Fases: {len(fases)} | Responsáveis: {len(responsaveis)}")
    log.info(f"  CSV: {OUTPUT_CSV}")
    log.info(f"  Log: {OUTPUT_LOG}")
    log.info("=" * 60)

if __name__ == "__main__":
    main()
