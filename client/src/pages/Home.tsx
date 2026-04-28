import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackEmailClick, trackCTAClick } from "@/lib/analytics";
import {
  ArrowRight,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  Globe,
  Mail,
  Sparkles,
  Bot,
  BarChart3,
  HeadphonesIcon,
  CheckCircle2,
  Zap,
  Target,
  Rocket,
  Star,
  Shield,
  Award,
  TrendingUp,
  MessageCircle,
  ChevronDown,
  Building2,
  Cpu,
  Search,
  Calendar,
  ChevronRight,
  Menu,
  X,
  Linkedin,
  Code2,
  BrainCircuit,
  Network,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Quote,
  Crown
} from "lucide-react";

/* ============================================================
 *  EBL — Paleta corporativa
 *  Blue:  #1e3a8a (deep) | #2952c8 (mid) | #3b6df0 (bright) | #93b5ff (soft)
 *  Gold:  #b48800 (deep) | #d4a017 (mid) | #f4cf63 (bright)
 * ============================================================ */
const EBL = {
  blueDeep: '#1e3a8a',
  blueMid: '#2952c8',
  blueBright: '#3b6df0',
  blueSoft: '#93b5ff',
  goldDeep: '#b48800',
  goldMid: '#d4a017',
  goldBright: '#f4cf63',
  bg: '#06091a',
  bg2: '#0b1130',
};
const GRAD_PREMIUM = `linear-gradient(135deg, ${EBL.blueDeep} 0%, ${EBL.blueMid} 45%, ${EBL.goldMid} 100%)`;
const GRAD_BLUE = `linear-gradient(135deg, ${EBL.blueDeep}, ${EBL.blueBright})`;
const GRAD_GOLD = `linear-gradient(135deg, ${EBL.goldDeep}, ${EBL.goldMid}, ${EBL.goldBright})`;
const GRAD_TEXT = `linear-gradient(135deg, ${EBL.blueSoft} 0%, ${EBL.goldBright} 100%)`;

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useIntersectionObserver(0.5);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end]);
  return <div ref={ref} className="tabular-nums">{prefix}{count.toLocaleString('pt-BR')}{suffix}</div>;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.03)', border: open ? `1px solid ${EBL.goldMid}88` : '1px solid rgba(255,255,255,0.08)' }}
    >
      <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-base sm:text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} style={{ color: open ? EBL.goldBright : '#6b7280' }}/>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-5 text-gray-400 leading-relaxed" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>{answer}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
    trackCTAClick('scroll-to-contact', 'navbar');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  const whatsappUrl1 = "https://wa.me/5511974455563";
  const whatsappUrl2 = "https://wa.me/5511984843866";
  const emailNew = "admebl@eblsolucoescorporativas.com";

  /* ===== 4 PILARES DE SERVIÇO ===== */
  const pillars = [
    {
      icon: Briefcase,
      title: "Consultoria em Transformação Digital",
      subtitle: "Diagnóstico → Estratégia → Execução",
      description:
        "Estruturamos um plano executável de digitalização do seu negócio: mapeamento de processos, escolha de ferramentas, integrações e indicadores. 14+ anos de experiência aplicada em ELGIN, Saint-Gobain e Assaí — agora ao lado da sua empresa.",
      bullets: [
        "Diagnóstico 360° gratuito",
        "Roadmap personalizado e mensurável",
        "Acompanhamento estratégico mensal",
      ],
      color: EBL.blueBright,
      glow: 'rgba(59,109,240,0.35)',
      accent: 'Estratégia executiva',
    },
    {
      icon: BrainCircuit,
      title: "Automação com IA & Agentes",
      subtitle: "Equipes virtuais 24/7 que vendem, atendem e operam",
      description:
        "Implantamos agentes de IA que assumem tarefas repetitivas, qualificam leads, respondem clientes em segundos e fazem análises avançadas. Funcionando enquanto você dorme — com ROI mensurável desde o primeiro mês.",
      bullets: [
        "Agentes IA conectados ao seu WhatsApp/CRM",
        "RPA e fluxos inteligentes",
        "Integração com ChatGPT, Claude, n8n e make",
      ],
      color: EBL.goldBright,
      glow: 'rgba(244,207,99,0.35)',
      accent: 'Vantagem competitiva',
    },
    {
      icon: Code2,
      title: "Desenvolvimento Sob Medida",
      subtitle: "Sites, sistemas, integrações e dashboards",
      description:
        "Sites de alta conversão, plataformas SaaS, integrações via API com seu ERP/Salesforce/HubSpot e dashboards em tempo real (Power BI, Tableau, Looker). Tecnologia desenhada para o tamanho e a velocidade do seu negócio.",
      bullets: [
        "Sites profissionais que convertem",
        "APIs e integrações (Salesforce/SAP/ERP)",
        "BI e dashboards estratégicos",
      ],
      color: EBL.blueSoft,
      glow: 'rgba(147,181,255,0.35)',
      accent: 'Tecnologia que escala',
    },
    {
      icon: GraduationCap,
      title: "Treinamentos & Capacitação",
      subtitle: "Time pronto para o futuro digital",
      description:
        "Capacitação prática em IA generativa, Salesforce, Power BI, automação e marketing digital. Formato presencial, online ou híbrido — feito sob medida para o nível do seu time, com certificação ao final.",
      bullets: [
        "IA generativa aplicada ao negócio",
        "Salesforce Admin & avançado",
        "Workshops de produtividade com IA",
      ],
      color: EBL.goldMid,
      glow: 'rgba(212,160,23,0.35)',
      accent: 'Time de alta performance',
    },
  ];

  /* ===== Subprodutos detalhados ===== */
  const services = [
    { icon: Globe, title: "Domínio & E-mail Profissional", description: "Identidade digital exclusiva com domínio premium e e-mails corporativos que transmitem credibilidade imediata.", highlight: "Credibilidade instantânea", iconColor: EBL.blueBright },
    { icon: Search, title: "Presença no Google", description: "Domine o Google Maps e a busca local. Seja encontrado no exato momento em que clientes buscam seus serviços.", highlight: "Seja a primeira opção", iconColor: EBL.blueSoft },
    { icon: Rocket, title: "Sites de Alta Conversão", description: "Vitrine digital 24/7. Sites rápidos, responsivos e otimizados para transformar visitantes em leads e clientes.", highlight: "Sua máquina de vendas", iconColor: EBL.goldBright },
    { icon: Zap, title: "Automação Inteligente (RPA)", description: "Elimine tarefas repetitivas com processos automáticos que economizam horas por dia e dão fluidez operacional.", highlight: "Foco no que importa", iconColor: EBL.goldMid },
    { icon: Bot, title: "Agentes & IA Generativa", description: "Integre IA para vender mais e analisar dados com precisão cirúrgica. De chatbots a previsões de vendas.", highlight: "Vantagem competitiva", iconColor: EBL.blueBright },
    { icon: BarChart3, title: "CRM Profissional", description: "Gestão completa do relacionamento com o cliente. Salesforce, HubSpot, RD ou Pipedrive — implantados com método.", highlight: "Relacionamento que gera lucro", iconColor: EBL.goldBright },
    { icon: Calendar, title: "Agendamento & Atendimento Online", description: "Sistema 24/7 que elimina ligações e reduz drasticamente as faltas, integrado ao seu WhatsApp.", highlight: "Agenda sempre cheia", iconColor: EBL.blueSoft },
    { icon: HeadphonesIcon, title: "Suporte & Sustentação 24/7", description: "Sua operação digital nunca para. Suporte contínuo para garantir máximo desempenho em todo momento.", highlight: "Paz de espírito garantida", iconColor: EBL.goldMid }
  ];

  /* Casos de impacto enterprise comprovados (LinkedIn) */
  const enterpriseCases = [
    {
      company: "Saint-Gobain Brasil",
      role: "Inteligência de Mercado & CRM",
      result: "+20% de NPS",
      detail: "Liderança de CRM com Salesforce, SAP e Microstrategy. Gestão de Key Accounts e segmentação de mercado para o segmento industrial.",
      tools: ["Salesforce", "SAP", "Microstrategy"],
      year: "2020–2022",
      icon: "📈",
      color: EBL.goldBright,
    },
    {
      company: "Assaí Atacadista",
      role: "Analista Sênior de CRM",
      result: "+17% base de clientes em 2 meses",
      detail: "Marketing Cloud + ETL otimizado: -30% no tempo de processamento de dados. Dashboards Power BI e Tableau para tomada de decisão.",
      tools: ["Marketing Cloud", "Power BI", "Tableau"],
      year: "2022–2024",
      icon: "⚡",
      color: EBL.blueBright,
    },
    {
      company: "ELGIN S.A.",
      role: "Líder Técnico de Salesforce",
      result: "Plataforma CRM unificada",
      detail: "Arquitetura de MVPs e integrações via API com ERP, estoque e faturamento. Ponto focal de CRM para toda a empresa.",
      tools: ["Salesforce Sales Cloud", "Apex/LWC", "API REST"],
      year: "2024–atual",
      icon: "🏆",
      color: EBL.blueSoft,
    },
  ];

  const faqs = [
    { question: "Quanto tempo leva para implementar a transformação digital?", answer: "Depende do escopo. Projetos de Consultoria iniciam em 7 dias com diagnóstico estruturado. Implantações completas (CRM + Automação + Site + IA) acontecem em 4 a 8 semanas, sempre com entregas semanais e indicadores claros." },
    { question: "Preciso ter conhecimento técnico para usar as soluções?", answer: "Não. Toda solução é entregue pronta para uso, com treinamento personalizado para o seu time. O suporte 24/7 garante que você nunca fique sem ajuda." },
    { question: "Como funciona o diagnóstico gratuito?", answer: "É uma reunião estratégica de 30 a 45 minutos onde analisamos seu cenário atual, identificamos as 3 maiores oportunidades de crescimento e apresentamos um plano de ação personalizado — sem nenhum compromisso." },
    { question: "Vocês trabalham com Salesforce e outras ferramentas enterprise?", answer: "Sim. Erick é Salesforce Certified Administrator com 14+ anos em Salesforce Sales/Service Cloud, Marketing Cloud, SAP, Power BI, Tableau, ChatGPT, Claude e n8n. Trazemos experiência enterprise para o seu negócio." },
    { question: "Os valores são fixos ou personalizados?", answer: "Personalizados após o diagnóstico, pois cada negócio tem necessidades únicas. Você paga apenas pelo que vai gerar retorno — nada de pacote inflado." },
    { question: "Vocês oferecem suporte após a implementação?", answer: "Sim. Todos os projetos incluem período de sustentação. Para clientes do plano Premium, suporte 24/7 com SLA de 2 horas para urgências operacionais." },
    { question: "É possível começar pequeno e evoluir depois?", answer: "Absolutamente. Nossa arquitetura é modular. Você começa pelo módulo que faz mais sentido para o momento do seu negócio e escala conforme cresce, sem refazer nada." },
    { question: "Vocês entregam treinamentos para meu time?", answer: "Sim — formato presencial, online ou híbrido. Treinamos em IA generativa, Salesforce, Power BI, automação e produtividade com IA. Todos os participantes recebem certificado." }
  ];

  const WaSvg = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* WhatsApp Float */}
      <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511974455563')}
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ background: '#25D366', boxShadow: '0 4px 24px rgba(37, 211, 102, 0.5)' }}
        title="Fale no WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
        style={{
          background: scrolled ? 'rgba(6, 9, 26, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${EBL.goldMid}33` : 'none'
        }}
      >
        <div className="container flex items-center justify-between">
          <button onClick={() => scrollToSection('hero')} className="flex items-center gap-3">
            <img src="/assets/logo_ebl.png" alt="EBL Logo" className="h-9 w-auto" />
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="font-bold text-sm text-white/95 tracking-tight">EBL Soluções Corporativas</span>
              <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: EBL.goldBright }}>Transformação Digital Premium</span>
            </div>
          </button>
          <div className="hidden md:flex items-center gap-7 text-sm">
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors font-medium">Sobre</button>
            <button onClick={() => scrollToSection('pillars')} className="text-gray-300 hover:text-white transition-colors font-medium">Soluções</button>
            <button onClick={() => scrollToSection('results')} className="text-gray-300 hover:text-white transition-colors font-medium">Resultados</button>
            <button onClick={() => scrollToSection('plans')} className="text-gray-300 hover:text-white transition-colors font-medium">Planos</button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-white transition-colors font-medium">FAQ</button>
            <Button size="sm" onClick={scrollToContact} className="font-bold px-5 py-2 btn-gold">
              Diagnóstico Gratuito
            </Button>
          </div>
          <button className="md:hidden text-white p-2" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-3"
            style={{ background: 'rgba(6, 9, 26, 0.98)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${EBL.goldMid}33` }}
          >
            <button onClick={() => scrollToSection('about')} className="text-left text-gray-300 hover:text-white transition-colors py-3 font-medium">Sobre</button>
            <button onClick={() => scrollToSection('pillars')} className="text-left text-gray-300 hover:text-white transition-colors py-3 font-medium">Soluções</button>
            <button onClick={() => scrollToSection('results')} className="text-left text-gray-300 hover:text-white transition-colors py-3 font-medium">Resultados</button>
            <button onClick={() => scrollToSection('plans')} className="text-left text-gray-300 hover:text-white transition-colors py-3 font-medium">Planos</button>
            <button onClick={() => scrollToSection('process')} className="text-left text-gray-300 hover:text-white transition-colors py-3 font-medium">Processo</button>
            <button onClick={() => scrollToSection('faq')} className="text-left text-gray-300 hover:text-white transition-colors py-2 font-medium">FAQ</button>
            <Button onClick={scrollToContact} className="w-full font-bold mt-2 btn-gold">
              Diagnóstico Gratuito
            </Button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-12">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 18% 50%, rgba(41,82,200,0.18) 0%, transparent 60%), radial-gradient(ellipse at 82% 25%, rgba(212,160,23,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(30,58,138,0.18) 0%, transparent 60%)` }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full animate-glow-pulse pointer-events-none" style={{ background: `radial-gradient(circle, ${EBL.blueMid}33 0%, transparent 70%)`, filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full animate-glow-pulse delay-500 pointer-events-none" style={{ background: `radial-gradient(circle, ${EBL.goldMid}28 0%, transparent 70%)`, filter: 'blur(60px)' }} />

        <div className="container relative z-10 py-12">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 animate-fade-in-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: 'rgba(212,160,23,0.10)', border: `1px solid ${EBL.goldMid}55`, color: EBL.goldBright }}>
                <Crown className="w-3.5 h-3.5" />
                Especialista Sênior · 14+ anos enterprise
              </div>
              <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] sm:leading-[1.02] tracking-tight">
                <span className="text-white">A&nbsp;</span>
                <span className="text-gradient-premium">TRANSFORMAÇÃO DIGITAL</span>
                <span className="block text-white">QUE FAZ A SUA</span>
                <span className="block text-gradient-gold">EMPRESA VENDER MAIS.</span>
              </h1>
              <p className="text-[15px] sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                <span className="font-semibold text-white">Erick Almeida</span> traz a expertise enterprise de <span className="font-semibold" style={{ color: EBL.goldBright }}>ELGIN, Saint-Gobain, Assaí e Google</span> para projetar, implementar e operar a infraestrutura digital que sua empresa precisa para <span className="font-semibold" style={{ color: EBL.blueSoft }}>vender 24h por dia, automatizar o trabalho repetitivo e escalar com inteligência</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base sm:text-lg px-8 py-6 font-bold group btn-gold" onClick={scrollToContact}>
                  <span className="flex items-center gap-2">
                    QUERO MEU DIAGNÓSTICO GRATUITO
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button size="lg" variant="outline" className="text-base sm:text-lg px-8 py-6 font-semibold group"
                  style={{ borderColor: `${EBL.blueSoft}55`, color: EBL.blueSoft, background: `${EBL.blueDeep}20` }}
                  onClick={() => scrollToSection('pillars')}>
                  Ver as 4 Soluções <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-300"><Shield className="w-4 h-4" style={{ color: EBL.blueSoft }} /><span>Salesforce Certified</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-300"><Award className="w-4 h-4" style={{ color: EBL.goldBright }} /><span>14+ anos enterprise</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-300"><HeadphonesIcon className="w-4 h-4" style={{ color: EBL.blueSoft }} /><span>Suporte 24/7</span></div>
              </div>
            </div>

            <div className="relative flex flex-col items-center gap-8 animate-fade-in-right delay-200">
              <div className="relative">
                {/* Glow gold layer */}
                <div className="absolute -inset-8 rounded-[2rem] opacity-50 animate-glow-pulse pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${EBL.goldMid}55 0%, ${EBL.blueMid}22 50%, transparent 75%)`, filter: 'blur(40px)' }} />
                {/* Photo with double border premium effect */}
                <div className="relative rounded-[1.5rem] overflow-hidden"
                  style={{
                    border: '2px solid transparent',
                    background: `linear-gradient(${EBL.bg}, ${EBL.bg2}) padding-box, ${GRAD_PREMIUM} border-box`,
                    boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 60px ${EBL.blueMid}40, 0 0 100px ${EBL.goldMid}20`,
                    width: 'min(90vw, 380px)',
                    aspectRatio: '3 / 4',
                  }}>
                  <img
                    src="/assets/erick_hero.jpg"
                    alt="Erick Almeida — Especialista em Transformação Digital, Salesforce e IA"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.04) contrast(1.06) saturate(1.04)' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/erick_almeida_foto.jpg"; }}
                  />
                  {/* Gradient overlay base */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5"
                    style={{ background: `linear-gradient(to top, ${EBL.bg} 5%, rgba(6,9,26,0.55) 50%, transparent 100%)` }} />
                  {/* Caption */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-xl font-black text-white tracking-tight">Erick Almeida</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color: EBL.goldBright }}>Líder Salesforce · CRM · IA</div>
                    <div className="text-[11px] text-gray-400 mt-1">Fundador EBL Soluções Corporativas</div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-3 -right-3 sm:-right-5 px-4 py-2.5 rounded-2xl animate-float-simple"
                  style={{ background: 'rgba(6,9,26,0.96)', border: `1px solid ${EBL.goldMid}88`, boxShadow: `0 8px 32px ${EBL.goldMid}40` }}>
                  <div className="text-2xl font-black" style={{ color: EBL.goldBright }}>14+</div>
                  <div className="text-[10px] text-gray-400 font-medium leading-tight">Anos<br />enterprise</div>
                </div>
                <div className="absolute -bottom-3 -left-3 sm:-left-5 px-4 py-2.5 rounded-2xl animate-float-simple"
                  style={{ animationDelay: '0.5s', background: 'rgba(6,9,26,0.96)', border: `1px solid ${EBL.blueBright}88`, boxShadow: `0 8px 32px ${EBL.blueBright}40` }}>
                  <div className="text-2xl font-black" style={{ color: EBL.blueSoft }}>10+</div>
                  <div className="text-[10px] text-gray-400 font-medium leading-tight">Empresas<br />atendidas</div>
                </div>
                <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-7 px-3 py-2 rounded-xl animate-float-simple items-center justify-center"
                  style={{ animationDelay: '1s', background: 'rgba(6,9,26,0.96)', border: `1px solid ${EBL.goldMid}77` }}>
                  <Sparkles className="w-4 h-4" style={{ color: EBL.goldBright }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-sm">
                {[
                  { end: 10, suffix: "+", label: "Empresas em projetos", color: EBL.blueBright },
                  { end: 14, suffix: "+", label: "Anos de mercado", color: EBL.goldBright },
                  { end: 24, suffix: "/7", label: "Operação contínua", color: EBL.blueSoft }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${stat.color}33` }}>
                    <div className="text-xl sm:text-2xl font-black" style={{ color: stat.color }}>
                      <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 rounded-full flex items-start justify-center p-2" style={{ border: `2px solid ${EBL.goldMid}88` }}>
            <div className="w-1 h-3 rounded-full animate-scroll" style={{ background: EBL.goldBright }} />
          </div>
        </div>
      </section>

      {/* TRUSTED BY (Logos / clientes anteriores) */}
      <section className="py-10 sm:py-14 border-y" style={{ borderColor: `${EBL.goldMid}22`, background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <div className="text-center mb-7">
            <div className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: EBL.goldBright }}>
              Experiência comprovada em
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-16">
            {["ELGIN S.A.", "Saint-Gobain", "Assaí Atacadista", "Google", "Salesforce", "FEBRABAN"].map((name, i) => (
              <div key={i} className="text-base sm:text-lg font-black tracking-tight transition-all"
                style={{ color: '#fff', opacity: 0.55, fontFamily: 'Playfair Display, serif' }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
              <TrendingDown className="w-4 h-4" />
              A Realidade do Mercado
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              SEU NEGÓCIO ESTÁ DEIXANDO MAIS DE{" "}
              <span style={{ color: '#f87171' }}>R$ 24.000 POR ANO</span>{" "}
              NA MESA.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Enquanto você lê isso, seus concorrentes estão conquistando os clientes que deveriam ser seus — com IA, automação e processos digitais.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Users, title: "Invisibilidade Digital", description: "Clientes em potencial não encontram sua empresa quando buscam ativamente seus serviços. Você não existe onde o dinheiro está.", stat: "87%", statLabel: "das buscas ignoram pág. 2" },
              { icon: Zap, title: "Concorrência com IA", description: "Seus concorrentes já operam com agentes de IA, CRM e automação — crescendo enquanto sua operação fica manual.", stat: "3x", statLabel: "mais rápido com IA" },
              { icon: DollarSign, title: "Receita Vazando", description: "A falta de processos automatizados e presença online custa R$ 24.000+ por ano em vendas que deveriam ser suas.", stat: "R$24k", statLabel: "perdidos por ano em média" },
              { icon: Clock, title: "Crescimento Travado", description: "Seu negócio só opera quando você está trabalhando. Sem estrutura digital 24/7, sua escala é zero.", stat: "0h", statLabel: "de operação sem você" }
            ].map((problem, index) => (
              <div key={index} className="rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-2 group"
                style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.18)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.12)' }}>
                  <problem.icon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <div className="text-2xl font-black text-red-400">{problem.stat}</div>
                  <div className="text-xs text-gray-500">{problem.statLabel}</div>
                </div>
                <h3 className="text-lg font-bold">{problem.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider mx-auto max-w-4xl" />

      {/* 4 PILARES */}
      <section id="pillars" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${EBL.blueMid}18 0%, transparent 60%)` }} />
        <div className="container relative z-10">
          <div className="text-center mb-14 md:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: `${EBL.goldMid}15`, border: `1px solid ${EBL.goldMid}55`, color: EBL.goldBright }}>
              <Lightbulb className="w-4 h-4" />
              4 Pilares · Solução Completa
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              TUDO QUE SUA EMPRESA PRECISA{" "}
              <span className="block text-gradient-premium">PARA DOMINAR O DIGITAL.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Quatro frentes integradas, projetadas para empresas que querem escalar com método e tecnologia de ponta — não só ferramentas soltas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {pillars.map((p, idx) => (
              <div key={idx} className="group relative rounded-3xl p-7 sm:p-8 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))`,
                  border: `1px solid ${p.color}40`,
                  boxShadow: `0 4px 30px ${p.color}10`,
                }}>
                {/* corner glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none transition-opacity group-hover:opacity-60"
                  style={{ background: p.glow }} />

                <div className="relative z-10 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: `${p.color}1f`, border: `1px solid ${p.color}55` }}>
                      <p.icon className="w-7 h-7" style={{ color: p.color }} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                      style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}33` }}>
                      Pilar 0{idx + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">{p.title}</h3>
                    <p className="text-sm font-semibold mt-1" style={{ color: p.color }}>{p.subtitle}</p>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-base">{p.description}</p>
                  <ul className="space-y-2 pt-2">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: p.color }}>{p.accent}</span>
                    <button onClick={scrollToContact}
                      className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all hover:gap-2.5"
                      style={{ color: '#fff' }}>
                      Quero saber mais <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBPRODUTOS */}
      <section id="services" className="py-16 sm:py-20 md:py-28" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: `${EBL.blueMid}15`, border: `1px solid ${EBL.blueBright}55`, color: EBL.blueSoft }}>
              <Network className="w-4 h-4" />
              Soluções específicas dentro de cada Pilar
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              A INFRAESTRUTURA COMPLETA{" "}
              <span className="text-gradient-premium">QUE SUA EMPRESA PRECISA.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Não entregamos só ferramentas. Implementamos uma arquitetura digital robusta — desenhada para máxima performance e autoridade no mercado.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, index) => (
              <div key={index} className="rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${service.iconColor}1f`, border: `1px solid ${service.iconColor}33` }}>
                  <service.icon className="w-6 h-6" style={{ color: service.iconColor }} />
                </div>
                <h3 className="text-base font-bold leading-tight">{service.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                <div className="text-xs font-bold pt-1" style={{ color: service.iconColor }}>{service.highlight} →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE MIM */}
      <section id="about" className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 10% 50%, ${EBL.blueMid}1a 0%, transparent 55%), radial-gradient(ellipse at 90% 30%, ${EBL.goldMid}13 0%, transparent 50%)` }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="container relative z-10">
          <div className="text-center mb-16 md:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: `${EBL.goldMid}15`, border: `1px solid ${EBL.goldMid}55`, color: EBL.goldBright }}>
              <Users className="w-4 h-4" />
              O Especialista por Trás da Transformação
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              14 ANOS TRANSFORMANDO{" "}
              <span className="block text-gradient-premium">DADOS EM CRESCIMENTO.</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              A trajetória real de quem leva sua empresa ao próximo nível.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">

            {/* Foto perfil 3/4 + badges */}
            <div className="relative flex justify-center lg:justify-end lg:sticky lg:top-24">
              <div className="relative w-72 sm:w-80 md:w-96 lg:w-[420px]">
                <div className="absolute -inset-6 rounded-3xl opacity-30 animate-glow-pulse pointer-events-none"
                  style={{ background: GRAD_PREMIUM, filter: 'blur(28px)' }} />
                <div className="relative rounded-3xl overflow-hidden"
                  style={{
                    border: '2px solid transparent',
                    background: `linear-gradient(${EBL.bg}, ${EBL.bg2}) padding-box, ${GRAD_PREMIUM} border-box`,
                    boxShadow: `0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.05) inset`
                  }}>
                  <img
                    src="/assets/erick_about.jpg"
                    alt="Erick Almeida — Líder de Plataforma Salesforce & Transformação Digital"
                    className="w-full object-cover"
                    style={{ aspectRatio: '3/4', objectPosition: 'center top', filter: 'brightness(1.04) contrast(1.06) saturate(1.04)' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/erick_almeida_foto.jpg"; }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-44"
                    style={{ background: `linear-gradient(to top, ${EBL.bg} 5%, rgba(6,9,26,0.55) 50%, transparent 100%)` }} />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-2xl font-black text-white tracking-tight">Erick Almeida</div>
                    <div className="text-sm font-bold mt-0.5" style={{ color: EBL.goldBright }}>Líder Salesforce · CRM · IA</div>
                    <div className="text-xs text-gray-400 mt-1">Guarulhos, São Paulo · Fundador da EBL</div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 sm:-right-6 px-4 py-3 rounded-2xl animate-float"
                  style={{ background: 'rgba(6,9,26,0.97)', border: `1px solid ${EBL.goldMid}77`, boxShadow: `0 8px 32px ${EBL.goldMid}40` }}>
                  <div className="text-2xl font-black" style={{ color: EBL.goldBright }}>14+</div>
                  <div className="text-[11px] text-gray-400 font-medium leading-tight">Anos<br />enterprise</div>
                </div>
                <div className="absolute -bottom-4 -left-4 sm:-left-6 px-4 py-3 rounded-2xl animate-float"
                  style={{ animationDelay: '0.4s', background: 'rgba(6,9,26,0.97)', border: `1px solid ${EBL.blueBright}77`, boxShadow: `0 8px 32px ${EBL.blueBright}40` }}>
                  <div className="text-2xl font-black" style={{ color: EBL.blueSoft }}>500+</div>
                  <div className="text-[11px] text-gray-400 font-medium leading-tight">Conexões<br />LinkedIn</div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-8 -translate-y-1/2 px-4 py-3 rounded-2xl animate-float"
                  style={{ animationDelay: '0.8s', background: 'rgba(6,9,26,0.97)', border: `1px solid ${EBL.goldBright}77`, boxShadow: `0 8px 32px ${EBL.goldBright}30` }}>
                  <div className="text-2xl font-black" style={{ color: EBL.goldMid }}>6+</div>
                  <div className="text-[11px] text-gray-400 font-medium leading-tight">Certificações<br />oficiais</div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <blockquote className="relative pl-6 border-l-4" style={{ borderColor: EBL.goldMid }}>
                <Quote className="absolute -top-2 -left-3 w-8 h-8 opacity-30" style={{ color: EBL.goldBright }} />
                <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                  "Transformar dados em crescimento não é teoria — é o que eu faço há 14 anos em empresas como ELGIN, Saint-Gobain e Assaí Atacadista."
                </p>
                <cite className="block mt-3 text-sm font-bold not-italic" style={{ color: EBL.goldBright }}>— Erick Almeida, Fundador da EBL Soluções Corporativas</cite>
              </blockquote>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Erick Almeida é <span className="text-white font-semibold">Analista Sênior de CRM e Líder de Plataforma Salesforce</span> com mais de <span className="font-semibold" style={{ color: EBL.goldBright }}>14 anos de experiência</span> em transformação digital, inteligência de dados e automação de processos. Formado em Análise e Desenvolvimento de Sistemas pela <span className="text-white font-semibold">Faculdade das Américas (FAM)</span>, com pós-graduação em Engenharia de Software pela <span className="text-white font-semibold">Descomplica</span> e especialização em Mercado Financeiro pela <span className="text-white font-semibold">FEBRABAN</span>.
                </p>
                <p>
                  Ao longo da carreira, liderou projetos de alto impacto na <span className="font-semibold" style={{ color: EBL.blueSoft }}>ELGIN S.A.</span>, <span className="font-semibold" style={{ color: EBL.blueSoft }}>Saint-Gobain Brasil</span> e <span className="font-semibold" style={{ color: EBL.blueSoft }}>Assaí Atacadista</span> — entregando resultados como <span className="font-semibold" style={{ color: EBL.goldBright }}>+20% de NPS</span>, <span className="font-semibold" style={{ color: EBL.goldBright }}>+17% de crescimento na base de clientes em 2 meses</span> e <span className="font-semibold" style={{ color: EBL.goldBright }}>-30% no tempo de processamento de dados</span>.
                </p>
                <p>
                  Fundador da <span className="text-white font-semibold">EBL Soluções Corporativas</span>, Erick aplica toda essa expertise para ajudar pequenas, médias e grandes empresas a dominarem o mercado digital — com automação, IA, CRM, presença online e estratégias orientadas por dados.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Salesforce CRM", sub: "Sales & Service · Apex · LWC", color: EBL.blueBright },
                  { label: "BI & Dados", sub: "Power BI · Tableau · SQL · ETL", color: EBL.goldBright },
                  { label: "Automação & IA", sub: "RPA · Agentes · n8n · Make", color: EBL.blueSoft },
                  { label: "Marketing Digital", sub: "Marketing Cloud · Google · Meta", color: EBL.goldMid },
                ].map((skill, i) => (
                  <div key={i} className="rounded-xl p-4 space-y-1 transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${skill.color}33` }}>
                    <div className="text-sm font-bold text-white">{skill.label}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{skill.sub}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-5 space-y-4"
                style={{ background: `${EBL.goldMid}08`, border: `1px solid ${EBL.goldMid}33` }}>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" style={{ color: EBL.goldBright }} />
                  <div className="text-xs font-black uppercase tracking-widest" style={{ color: EBL.goldBright }}>Certificações & Formação Oficial</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { cert: "Salesforce Certified Administrator", org: "Salesforce" },
                    { cert: "Marketing Cloud Expert", org: "Enext / VML Company" },
                    { cert: "Especialista em Salesforce", org: "Sottelli / Capgemini" },
                    { cert: "Cybersecurity", org: "FIAP" },
                    { cert: "Google Workspace & Gemini IA", org: "Google" },
                    { cert: "Double Star Ranger", org: "Trailhead by Salesforce" },
                    { cert: "Pós-graduação Eng. de Software", org: "Descomplica" },
                    { cert: "Mercado Financeiro", org: "FEBRABAN" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-2 py-1">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: EBL.goldBright }} />
                      <div>
                        <div className="text-xs font-semibold text-white leading-tight">{c.cert}</div>
                        <div className="text-xs text-gray-500">{c.org}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Experiência em Grandes Empresas</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { name: "ELGIN S.A.", role: "Analista CRM Sênior", period: "2024–atual", color: EBL.blueBright },
                    { name: "Saint-Gobain", role: "Dev. Sistemas Pleno", period: "10 anos 11 meses", color: EBL.goldBright },
                    { name: "Assaí Atacadista", role: "Analista Sênior", period: "2022–2024", color: EBL.blueSoft },
                    { name: "Google", role: "Consultor Mkt Digital", period: "2017–2018", color: EBL.goldMid },
                  ].map((emp, i) => (
                    <div key={i} className="rounded-xl p-3 text-center transition-all duration-300 hover:-translate-y-1"
                      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${emp.color}33` }}>
                      <div className="text-xs font-black text-white leading-tight">{emp.name}</div>
                      <div className="text-[11px] text-gray-500 mt-1 leading-tight">{emp.role}</div>
                      <div className="text-[11px] font-bold mt-1" style={{ color: emp.color }}>{emp.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <a href="https://www.linkedin.com/in/erick-almeida1509/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                  style={{ background: 'rgba(10,102,194,0.15)', border: '1px solid rgba(10,102,194,0.45)', color: '#60a5fa' }}>
                  <Linkedin className="w-4 h-4" />
                  Ver perfil no LinkedIn
                </a>
                <button onClick={scrollToContact}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 btn-gold">
                  <MessageCircle className="w-4 h-4" />
                  Falar com Erick Agora
                </button>
              </div>
            </div>
          </div>

          {/* Resultados reais */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "+20%", label: "NPS na Saint-Gobain", color: EBL.blueBright },
              { value: "+17%", label: "Base de clientes em 2 meses", color: EBL.goldBright },
              { value: "-30%", label: "Tempo de processamento", color: EBL.blueSoft },
              { value: "14+", label: "Anos enterprise comprovados", color: EBL.goldMid },
            ].map((stat, i) => (
              <div key={i} className="rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-2"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${stat.color}33`, boxShadow: `0 4px 20px ${stat.color}10` }}>
                <div className="text-3xl sm:text-4xl font-black mb-2" style={{ color: stat.color, fontFamily: 'Playfair Display, serif' }}>{stat.value}</div>
                <div className="text-xs text-gray-400 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PLANOS */}
      <section id="plans" className="py-16 sm:py-20 md:py-28" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: `${EBL.goldMid}15`, border: `1px solid ${EBL.goldMid}55`, color: EBL.goldBright }}>
              <DollarSign className="w-4 h-4" />
              O Caminho para a Escala
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              ESCOLHA O NÍVEL DE{" "}
              <span className="text-gradient-premium">DOMÍNIO DIGITAL</span>{" "}
              QUE SEU NEGÓCIO PRECISA.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Investimento personalizado após diagnóstico gratuito. Pague apenas pelo que vai gerar retorno real.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {/* Essencial */}
            <div className="rounded-2xl p-7 space-y-6 transition-all duration-300 hover:-translate-y-2"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Plano</div>
                <h3 className="text-2xl font-black">Essencial</h3>
                <p className="text-gray-400 text-sm mt-1">Ponto de partida da Presença Digital</p>
              </div>
              <div className="py-4 border-y" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="text-sm font-bold" style={{ color: EBL.blueSoft }}>Investimento Personalizado</div>
                <div className="text-xs text-gray-500 mt-1">Valor definido após diagnóstico</div>
              </div>
              <ul className="space-y-3">
                {["Domínio profissional", "E-mail corporativo", "Google Business + SEO Local", "Site institucional de alta conversão", "Treinamento operacional"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: EBL.blueSoft }} />{item}
                  </li>
                ))}
              </ul>
              <Button className="w-full font-bold py-5 text-sm sm:text-[15px] whitespace-nowrap" variant="outline"
                style={{ borderColor: `${EBL.blueBright}55`, color: EBL.blueSoft }} asChild>
                <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511974455563')}>
                  Diagnóstico Gratuito
                </a>
              </Button>
            </div>

            {/* Profissional - DESTAQUE */}
            <div className="rounded-2xl p-7 space-y-6 relative transition-all duration-300 hover:-translate-y-3 lg:-mt-4"
              style={{
                background: `linear-gradient(135deg, ${EBL.blueDeep}33, ${EBL.goldMid}1a)`,
                border: `2px solid ${EBL.goldMid}88`,
                boxShadow: `0 0 40px ${EBL.goldMid}28, 0 20px 60px rgba(0,0,0,0.45)`,
              }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-1.5 btn-gold whitespace-nowrap">
                  <Crown className="w-3 h-3 flex-shrink-0" />
                  <span>MAIS PROCURADO</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: EBL.goldBright }}>Plano</div>
                <h3 className="text-2xl font-black">Profissional</h3>
                <p className="text-gray-400 text-sm mt-1">Automação + IA + Crescimento</p>
              </div>
              <div className="py-4 border-y" style={{ borderColor: `${EBL.goldMid}33` }}>
                <div className="text-sm font-bold" style={{ color: EBL.goldBright }}>Investimento Personalizado</div>
                <div className="text-xs text-gray-500 mt-1">Plano sob medida após diagnóstico</div>
              </div>
              <ul className="space-y-3">
                {["Tudo do Essencial +", "Site avançado de alta conversão", "Agendamento online 24/7", "Agente IA no WhatsApp", "Automações com n8n / Make", "Integração CRM completo"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: EBL.goldBright }} />{item}
                  </li>
                ))}
              </ul>
              <Button className="w-full font-black py-5 text-sm sm:text-[15px] btn-gold whitespace-nowrap" asChild>
                <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511974455563')}>
                  DIAGNÓSTICO GRATUITO
                </a>
              </Button>
            </div>

            {/* Premium */}
            <div className="rounded-2xl p-7 space-y-6 transition-all duration-300 hover:-translate-y-2"
              style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${EBL.blueBright}33` }}>
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Plano</div>
                <h3 className="text-2xl font-black">Premium Enterprise</h3>
                <p className="text-gray-400 text-sm mt-1">Máximo Impacto + Time treinado</p>
              </div>
              <div className="py-4 border-y" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="text-sm font-bold" style={{ color: EBL.blueSoft }}>Investimento Personalizado</div>
                <div className="text-xs text-gray-500 mt-1">Projeto enterprise personalizado</div>
              </div>
              <ul className="space-y-3">
                {["Tudo do Profissional +", "CRM Salesforce completo", "Agentes IA multi-canal", "BI Power BI / Tableau", "Treinamento do time + certificação", "Suporte prioritário 24/7"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: EBL.blueSoft }} />{item}
                  </li>
                ))}
              </ul>
              <Button className="w-full font-bold py-5 text-sm sm:text-[15px] whitespace-nowrap" variant="outline"
                style={{ borderColor: `${EBL.blueBright}55`, color: EBL.blueSoft }} asChild>
                <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511974455563')}>
                  Diagnóstico Gratuito
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTADOS ENTERPRISE */}
      <section id="results" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${EBL.goldMid}12 0%, transparent 60%)` }} />
        <div className="container relative z-10">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: `${EBL.goldMid}15`, border: `1px solid ${EBL.goldMid}55`, color: EBL.goldBright }}>
              <TrendingUp className="w-4 h-4" />
              Casos de Impacto Comprovados
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.05]">
              RESULTADOS REAIS{" "}
              <span className="block sm:inline text-gradient-premium">EM EMPRESAS DE GRANDE PORTE.</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Indicadores comprovados que liderei em multinacionais — a mesma metodologia, agora aplicada ao seu negócio.
              <span className="block mt-2 text-xs sm:text-sm" style={{ color: EBL.goldBright }}>
                Disponíveis para validação no <a href="https://www.linkedin.com/in/erick-almeida1509/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white transition-colors">meu LinkedIn</a>.
              </span>
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
            {enterpriseCases.map((c, i) => (
              <div key={i} className="group rounded-2xl p-6 sm:p-7 space-y-4 relative transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.color}33`, boxShadow: `0 4px 24px ${c.color}10` }}>
                <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-20 blur-3xl pointer-events-none transition-opacity group-hover:opacity-40"
                  style={{ background: c.color }} />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="text-3xl">{c.icon}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                    style={{ background: `${c.color}1a`, color: c.color, border: `1px solid ${c.color}40` }}>
                    {c.year}
                  </div>
                </div>
                <div className="relative z-10 space-y-1.5 pt-1">
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: c.color }}>{c.company}</div>
                  <div className="text-base sm:text-lg font-bold text-white leading-tight">{c.role}</div>
                </div>
                <div className="relative z-10 py-3 border-y" style={{ borderColor: `${c.color}25` }}>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: c.color, fontFamily: 'Playfair Display, serif' }}>
                    {c.result}
                  </div>
                </div>
                <p className="relative z-10 text-sm text-gray-400 leading-relaxed">{c.detail}</p>
                <div className="relative z-10 flex flex-wrap gap-1.5 pt-1">
                  {c.tools.map((t, j) => (
                    <span key={j} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                      style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.color}25`, color: 'rgba(255,255,255,0.7)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Linha de credibilidade */}
          <div className="mt-12 sm:mt-14 max-w-3xl mx-auto rounded-2xl p-6 sm:p-7 text-center"
            style={{ background: `linear-gradient(135deg, ${EBL.blueDeep}25, ${EBL.goldMid}10)`, border: `1px solid ${EBL.goldMid}40` }}>
            <Shield className="w-7 h-7 mx-auto mb-3" style={{ color: EBL.goldBright }} />
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              <span className="font-bold text-white">Mesma metodologia, agora ao alcance da sua empresa.</span> A expertise enterprise que entreguei resultados comprovados em <span className="font-semibold" style={{ color: EBL.goldBright }}>Saint-Gobain, Assaí e ELGIN</span> aplicada ao tamanho e à velocidade do seu negócio.
            </p>
            <button onClick={scrollToContact}
              className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 btn-gold">
              <MessageCircle className="w-4 h-4" />
              Quero esses resultados na minha empresa
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="process" className="py-16 sm:py-20 md:py-28" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: `${EBL.blueMid}15`, border: `1px solid ${EBL.blueBright}55`, color: EBL.blueSoft }}>
              <Target className="w-4 h-4" />
              Método Estruturado
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              DO DIAGNÓSTICO À{" "}
              <span className="text-gradient-premium">TRANSFORMAÇÃO REAL.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Um processo estruturado, transparente e focado em resultados mensuráveis para o seu negócio.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { step: "01", icon: MessageCircle, title: "Diagnóstico Estratégico", description: "Reunião gratuita de 30 a 45 min para entender o cenário e mapear as 3 maiores oportunidades.", color: EBL.blueBright },
              { step: "02", icon: Target, title: "Roadmap Personalizado", description: "Análise técnica + plano de ação com escopo, prazos, indicadores e ROI estimado.", color: EBL.goldBright },
              { step: "03", icon: Cpu, title: "Implementação", description: "Execução em sprints com entregas semanais e acompanhamento direto comigo.", color: EBL.blueSoft },
              { step: "04", icon: Rocket, title: "Operação & Crescimento", description: "Sustentação, evolução contínua e expansão modular conforme seu negócio escala.", color: EBL.goldMid }
            ].map((item, index) => (
              <div key={index} className="rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-2 group"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-black opacity-30" style={{ color: item.color, fontFamily: 'Playfair Display, serif' }}>{item.step}</div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${item.color}1f`, border: `1px solid ${item.color}33` }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* URGÊNCIA */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.08) 0%, transparent 70%)' }} />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
              <Clock className="w-4 h-4" />
              Urgência
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              CADA DIA DE ATRASO É UM DIA DE{" "}
              <span style={{ color: '#f87171' }}>LUCRO PERDIDO.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A Transformação Digital não é mais um diferencial — é a fundação para a sobrevivência e escala no mercado moderno. Enquanto você espera, sua concorrência avança. Não deixe para amanhã o que pode transformar seu negócio hoje.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-4">
              {[
                { value: "R$2k+", label: "Perdidos/mês sem digital" },
                { value: "73%", label: "Empresas fecham sem presença online" },
                { value: "5x", label: "Mais caro captar sem automação" }
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl"
                  style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.18)' }}>
                  <div className="text-xl font-black text-red-400">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 md:py-28" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: `${EBL.blueMid}15`, border: `1px solid ${EBL.blueBright}55`, color: EBL.blueSoft }}>
              <MessageCircle className="w-4 h-4" />
              Perguntas Frequentes
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              TIRE SUAS{" "}
              <span className="text-gradient-premium">DÚVIDAS</span>{" "}
              AGORA.
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} />)}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contact" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 50%, ${EBL.blueMid}20 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, ${EBL.goldMid}18 0%, transparent 60%)` }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: `${EBL.goldMid}15`, border: `1px solid ${EBL.goldMid}55`, color: EBL.goldBright }}>
              <Sparkles className="w-4 h-4" />
              Comece Hoje Mesmo
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">
              <span className="text-gradient-premium">TRANSFORME SUA EMPRESA</span>
              <br /><span className="text-white">ANTES QUE A SUA</span>
              <br /><span className="text-white">CONCORRÊNCIA FAÇA ISSO.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Agende agora seu diagnóstico gratuito e descubra exatamente como dobrar seus resultados com a infraestrutura digital certa para o seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="text-base sm:text-lg px-8 py-6 font-black group w-full sm:w-auto btn-gold" asChild>
                <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511974455563')}>
                  <WaSvg />
                  WHATSAPP: (11) 97445-5563
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-8 py-6 font-bold group w-full sm:w-auto"
                style={{ borderColor: `${EBL.blueSoft}55`, color: EBL.blueSoft, background: `${EBL.blueDeep}20` }} asChild>
                <a href={whatsappUrl2} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511984843866')}>
                  <WaSvg />
                  WHATSAPP: (11) 98484-3866
                </a>
              </Button>
            </div>
            <div className="pt-6 space-y-3">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Mail className="w-4 h-4" style={{ color: EBL.goldBright }} />
                <a href={`mailto:${emailNew}`} className="hover:text-white transition-colors text-sm font-medium"
                  onClick={() => trackEmailClick(emailNew)}>{emailNew}</a>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <Globe className="w-4 h-4" style={{ color: EBL.blueSoft }} />
                <a href="https://www.instagram.com/eblsolucoescorporativas/" target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors">@eblsolucoescorporativas</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8" style={{ borderTop: `1px solid ${EBL.goldMid}22` }}>
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <img src="/assets/logo_ebl.png" alt="EBL Logo" className="h-7 w-auto opacity-70" />
              <span>© 2026 EBL Soluções Corporativas. Todos os direitos reservados.</span>
            </div>
            <div>
              Desenvolvido por{" "}
              <span className="font-bold" style={{ color: EBL.goldBright }}>Erick Almeida</span>
              {" "}—{" "}
              <a href="https://www.instagram.com/erickbrendallin" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition-colors">@erickbrendallin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
