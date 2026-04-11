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
  X
} from "lucide-react";

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
      style={{ background: 'rgba(255,255,255,0.03)', border: open ? '1px solid rgba(20, 184, 166, 0.4)' : '1px solid rgba(255,255,255,0.08)' }}
    >
      <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-base sm:text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-teal-400' : 'text-gray-500'}`} />
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

  const services = [
    { icon: Globe, title: "Domínio & E-mail Profissional", description: "Identidade digital exclusiva com domínio premium e e-mails corporativos que transmitem credibilidade imediata a cada contato.", highlight: "Credibilidade instantânea", iconColor: "#14b8a6" },
    { icon: Search, title: "Presença no Google", description: "Domine o Google Maps e a busca local. Seja encontrado no exato momento em que clientes buscam ativamente seus serviços.", highlight: "Seja a primeira opção", iconColor: "#0ea5e9" },
    { icon: Rocket, title: "Sites de Alta Conversão", description: "Sua vitrine digital 24/7. Sites rápidos, responsivos e otimizados para transformar visitantes em leads qualificados e clientes.", highlight: "Sua máquina de vendas", iconColor: "#f59e0b" },
    { icon: Zap, title: "Automação Inteligente (RPA)", description: "Elimine tarefas repetitivas com processos automáticos que economizam horas por dia e garantem fluidez operacional total.", highlight: "Foco no que importa", iconColor: "#a855f7" },
    { icon: Bot, title: "Inteligência Artificial", description: "Integre IA para vender mais e analisar dados com precisão cirúrgica. De chatbots inteligentes a previsões de vendas.", highlight: "Vantagem competitiva", iconColor: "#14b8a6" },
    { icon: BarChart3, title: "CRM Profissional", description: "Gestão completa do relacionamento com o cliente. Transforme dados em decisões estratégicas e fidelize sua base.", highlight: "Relacionamento que gera lucro", iconColor: "#22c55e" },
    { icon: Calendar, title: "Agendamento Online", description: "Sistema de agendamento automatizado 24/7, eliminando ligações desnecessárias e reduzindo drasticamente as faltas.", highlight: "Agenda sempre cheia", iconColor: "#f97316" },
    { icon: HeadphonesIcon, title: "Suporte Completo 24/7", description: "Sua operação digital nunca para. Suporte contínuo e dedicado para garantir máximo desempenho em todo momento.", highlight: "Paz de espírito garantida", iconColor: "#f43f5e" }
  ];

  const testimonials = [
    { name: "Carlos Mendes", role: "CEO, Clínica Saúde Total", text: "Em 3 meses com a EBL, nossa agenda lotou e paramos de perder clientes para a concorrência. O site novo e o Google Business foram game-changers para o nosso negócio.", stars: 5, result: "+180% de agendamentos" },
    { name: "Ana Paula Ferreira", role: "Proprietária, Studio Beleza Premium", text: "Antes eu ficava respondendo mensagem o dia todo. Agora o sistema faz tudo automaticamente. Economizo mais de 3 horas por dia e foco no que realmente importa.", stars: 5, result: "3h economizadas/dia" },
    { name: "Roberto Souza", role: "Diretor Comercial, TechVentures", text: "O CRM e a automação transformaram completamente nosso processo de vendas. Fechamos 40% mais contratos no primeiro trimestre após a implementação.", stars: 5, result: "+40% em contratos" }
  ];

  const faqs = [
    { question: "Quanto tempo leva para implementar a transformação digital?", answer: "Depende do pacote escolhido. O plano Básico pode ser implementado em 5 a 7 dias úteis. O Completo leva de 2 a 3 semanas, e o Premium de 4 a 6 semanas para uma implementação completa, bem estruturada e com treinamento da equipe." },
    { question: "Preciso ter conhecimento técnico para usar as soluções?", answer: "Não. Todas as soluções são entregues prontas para uso, com treinamento completo incluído. Nosso suporte 24/7 garante que você nunca fique sem ajuda quando precisar de qualquer assistência." },
    { question: "Como funciona o diagnóstico gratuito?", answer: "É uma conversa estratégica de 30 a 45 minutos onde analisamos o cenário atual do seu negócio, identificamos as maiores oportunidades de crescimento e apresentamos um plano de ação personalizado, sem nenhum compromisso." },
    { question: "Os valores são fixos ou personalizados?", answer: "Os investimentos são personalizados após o diagnóstico, pois cada negócio tem necessidades únicas. Isso garante que você pague apenas pelo que realmente precisa e vai gerar retorno, sem desperdícios." },
    { question: "Vocês oferecem suporte após a implementação?", answer: "Sim. Todos os planos incluem suporte contínuo. O plano Premium inclui suporte prioritário 24/7 com tempo de resposta garantido de até 2 horas para qualquer urgência operacional." },
    { question: "Posso começar com o plano Básico e evoluir depois?", answer: "Absolutamente. Nossa arquitetura é modular e escalável. Você começa onde faz sentido para o momento do seu negócio e expande conforme cresce, sem precisar refazer nada do que já foi implementado." }
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37, 211, 102, 0.5)' }}
        title="Fale no WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
        style={{
          background: scrolled ? 'rgba(8, 8, 20, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none'
        }}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/logo_ebl.png" alt="EBL Logo" className="h-8 w-auto" />
            <span className="font-bold text-sm sm:text-base hidden sm:block text-white/90">EBL Soluções Corporativas</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors font-medium">Serviços</button>
            <button onClick={() => scrollToSection('plans')} className="text-gray-400 hover:text-white transition-colors font-medium">Planos</button>
            <button onClick={() => scrollToSection('process')} className="text-gray-400 hover:text-white transition-colors font-medium">Processo</button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-400 hover:text-white transition-colors font-medium">FAQ</button>
            <Button size="sm" onClick={scrollToContact} className="font-bold px-5 py-2"
              style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)', border: 'none', boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)' }}>
              Diagnóstico Gratuito
            </Button>
          </div>
          <button className="md:hidden text-white p-2" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-3"
            style={{ background: 'rgba(8, 8, 20, 0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <button onClick={() => scrollToSection('services')} className="text-left text-gray-300 hover:text-white transition-colors py-2 font-medium">Serviços</button>
            <button onClick={() => scrollToSection('plans')} className="text-left text-gray-300 hover:text-white transition-colors py-2 font-medium">Planos</button>
            <button onClick={() => scrollToSection('process')} className="text-left text-gray-300 hover:text-white transition-colors py-2 font-medium">Processo</button>
            <button onClick={() => scrollToSection('faq')} className="text-left text-gray-300 hover:text-white transition-colors py-2 font-medium">FAQ</button>
            <Button onClick={scrollToContact} className="w-full font-bold mt-2"
              style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)', border: 'none' }}>
              Diagnóstico Gratuito
            </Button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(20, 184, 166, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(14, 165, 233, 0.06) 0%, transparent 50%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full animate-glow-pulse pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-glow-pulse delay-500 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.10) 0%, transparent 70%)', filter: 'blur(50px)' }} />

        <div className="container relative z-10 py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 animate-fade-in-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.3)', color: '#2dd4bf' }}>
                <Sparkles className="w-4 h-4" />
                Especialista em Transformação Digital
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight">
                DOMINE O
                <span className="block" style={{ background: 'linear-gradient(135deg, #2dd4bf 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  MERCADO DIGITAL
                </span>
                <span className="block">ANTES DA</span>
                <span className="block">CONCORRÊNCIA.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
                <span className="text-teal-400 font-semibold">Erick Almeida</span> projeta e implementa a infraestrutura digital completa que seu negócio precisa para{" "}
                <span className="text-amber-400 font-semibold">gerar clientes 24h por dia, 7 dias por semana</span>, enquanto você foca no que realmente importa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base sm:text-lg px-8 py-6 font-bold group"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)', border: 'none', boxShadow: '0 0 30px rgba(20, 184, 166, 0.4)' }}
                  onClick={scrollToContact}>
                  <span className="flex items-center gap-2">
                    QUERO TRANSFORMAR MEU NEGÓCIO
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button size="lg" variant="outline" className="text-base sm:text-lg px-8 py-6 font-semibold group"
                  style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}
                  onClick={() => scrollToSection('process')}>
                  Ver Como Funciona <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-400"><Shield className="w-4 h-4 text-teal-400" /><span>Especialista Certificado</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-400"><Award className="w-4 h-4 text-amber-400" /><span>Resultados Garantidos</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-400"><HeadphonesIcon className="w-4 h-4 text-blue-400" /><span>Suporte 24/7</span></div>
              </div>
            </div>

            <div className="relative flex flex-col items-center gap-8 animate-fade-in-right delay-200">
              <div className="relative">
                <div className="absolute inset-0 rounded-full animate-glow-pulse pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)', filter: 'blur(30px)', transform: 'scale(1.2)' }} />
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden"
                  style={{ border: '3px solid transparent', background: 'linear-gradient(oklch(0.08 0.015 240), oklch(0.08 0.015 240)) padding-box, linear-gradient(135deg, #14b8a6, #f59e0b) border-box', boxShadow: '0 0 60px rgba(20, 184, 166, 0.25), 0 0 120px rgba(20, 184, 166, 0.1)' }}>
                  <img src="/assets/erick_almeida_foto.jpg" alt="Erick Almeida - Especialista em Transformação Digital" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 animate-float px-5 py-2.5 rounded-full flex items-center gap-2 whitespace-nowrap"
                  style={{ background: 'rgba(8, 8, 20, 0.95)', border: '1px solid rgba(245, 158, 11, 0.5)', boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)' }}>
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm text-amber-400">Especialista Certificado</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-4">
                {[
                  { end: 2000, suffix: "+", prefix: "R$", label: "Economizados/mês", color: "#14b8a6" },
                  { end: 24, suffix: "/7", prefix: "", label: "Operação contínua", color: "#f59e0b" },
                  { end: 100, suffix: "%", prefix: "", label: "Foco em resultado", color: "#0ea5e9" }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-xl sm:text-2xl font-black" style={{ color: stat.color }}>
                      <AnimatedCounter end={stat.end} suffix={stat.suffix} prefix={stat.prefix} />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gray-600 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="py-8 border-y" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: Building2, label: "Empresas Transformadas", value: "50+" },
              { icon: TrendingUp, label: "Crescimento Médio", value: "+150%" },
              { icon: Star, label: "Avaliação Média", value: "5.0★" },
              { icon: Clock, label: "Anos de Experiência", value: "8+" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20, 184, 166, 0.12)' }}>
                  <item.icon className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
              <TrendingDown className="w-4 h-4" />
              A Realidade do Mercado
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
              SEU NEGÓCIO ESTÁ DEIXANDO MAIS DE{" "}
              <span style={{ color: '#f87171' }}>R$ 2.000 POR MÊS</span>{" "}
              NA MESA.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Enquanto você lê isso, seus concorrentes estão conquistando os clientes que deveriam ser seus.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Users, title: "Invisibilidade Digital", description: "Clientes em potencial não encontram sua empresa quando buscam ativamente por seus serviços. Você não existe onde o dinheiro está.", stat: "87%", statLabel: "das buscas ignoram pág. 2" },
              { icon: Zap, title: "Concorrência Acelerada", description: "Seus concorrentes já investem em tecnologia e automação, crescendo exponencialmente enquanto seu negócio fica estagnado.", stat: "3x", statLabel: "mais rápido com automação" },
              { icon: DollarSign, title: "Oportunidades Perdidas", description: "A falta de processos automatizados e presença online custa mais de R$ 2.000 mensais em vendas que poderiam ser suas.", stat: "R$24k", statLabel: "perdidos por ano em média" },
              { icon: Clock, title: "Crescimento Limitado", description: "Seu negócio só opera quando você está trabalhando. Sem estrutura digital 24/7, seu potencial de escala é zero.", stat: "0h", statLabel: "de operação sem você" }
            ].map((problem, index) => (
              <div key={index} className="rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-2 group"
                style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
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

      <div className="h-px mx-auto max-w-4xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.3), rgba(245, 158, 11, 0.3), transparent)' }} />

      {/* SERVIÇOS */}
      <section id="services" className="py-16 sm:py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.3)', color: '#2dd4bf' }}>
              <Rocket className="w-4 h-4" />
              A Arquitetura do Sucesso
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
              A INFRAESTRUTURA COMPLETA PARA{" "}
              <span style={{ background: 'linear-gradient(135deg, #2dd4bf, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                ESCALAR SEU NEGÓCIO.
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Não entregamos apenas ferramentas. Implementamos uma arquitetura digital robusta e inteligente, desenhada para máxima performance e autoridade no mercado.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, index) => (
              <div key={index} className="rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${service.iconColor}18` }}>
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

      {/* PLANOS */}
      <section id="plans" className="py-16 sm:py-20 md:py-28" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24' }}>
              <DollarSign className="w-4 h-4" />
              O Caminho para a Escala
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
              ESCOLHA O NÍVEL DE{" "}
              <span style={{ background: 'linear-gradient(135deg, #2dd4bf, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                DOMÍNIO DIGITAL
              </span>
              {" "}QUE SEU NEGÓCIO PRECISA.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Investimento personalizado após diagnóstico gratuito. Pague apenas pelo que vai gerar retorno real.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {/* Básico */}
            <div className="rounded-2xl p-7 space-y-6 transition-all duration-300 hover:-translate-y-2"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Plano</div>
                <h3 className="text-2xl font-black">Básico</h3>
                <p className="text-gray-400 text-sm mt-1">Início da Presença Digital</p>
              </div>
              <div className="py-4 border-y" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="text-sm font-semibold text-teal-400">Investimento Personalizado</div>
                <div className="text-xs text-gray-500 mt-1">Valor definido após diagnóstico do seu negócio</div>
              </div>
              <ul className="space-y-3">
                {["Domínio profissional", "E-mail profissional", "Google Business", "Site básico de alta conversão"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <Button className="w-full font-bold py-5" variant="outline"
                style={{ borderColor: 'rgba(20, 184, 166, 0.4)', color: '#2dd4bf' }} asChild>
                <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511974455563')}>
                  Solicitar Diagnóstico Gratuito
                </a>
              </Button>
            </div>

            {/* Completo - DESTAQUE */}
            <div className="rounded-2xl p-7 space-y-6 relative transition-all duration-300 hover:-translate-y-3 md:-mt-4"
              style={{ background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(245, 158, 11, 0.06))', border: '2px solid rgba(245, 158, 11, 0.5)', boxShadow: '0 0 40px rgba(245, 158, 11, 0.12), 0 20px 60px rgba(0,0,0,0.4)' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', color: '#0a0a14' }}>
                  ★ MAIS PROCURADO
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Plano</div>
                <h3 className="text-2xl font-black">Completo</h3>
                <p className="text-gray-400 text-sm mt-1">Automação e Crescimento</p>
              </div>
              <div className="py-4 border-y" style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}>
                <div className="text-sm font-semibold text-amber-400">Investimento Personalizado</div>
                <div className="text-xs text-gray-500 mt-1">Valor definido após diagnóstico do seu negócio</div>
              </div>
              <ul className="space-y-3">
                {["Tudo do Básico +", "Site avançado de alta conversão", "Agendamento online 24/7", "Automação de lembretes", "Integração com WhatsApp Business"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <Button className="w-full font-black py-5 text-base"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', border: 'none', color: '#0a0a14', boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' }} asChild>
                <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511974455563')}>
                  SOLICITAR DIAGNÓSTICO GRATUITO
                </a>
              </Button>
            </div>

            {/* Premium */}
            <div className="rounded-2xl p-7 space-y-6 transition-all duration-300 hover:-translate-y-2"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(20, 184, 166, 0.2)' }}>
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Plano</div>
                <h3 className="text-2xl font-black">Premium</h3>
                <p className="text-gray-400 text-sm mt-1">Máximo Impacto e IA Estratégica</p>
              </div>
              <div className="py-4 border-y" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="text-sm font-semibold text-teal-400">Investimento Personalizado</div>
                <div className="text-xs text-gray-500 mt-1">Valor definido após diagnóstico do seu negócio</div>
              </div>
              <ul className="space-y-3">
                {["Tudo do Completo +", "CRM Profissional completo", "Automação avançada RPA", "IA para produtividade e vendas", "Suporte prioritário 24/7"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <Button className="w-full font-bold py-5" variant="outline"
                style={{ borderColor: 'rgba(20, 184, 166, 0.4)', color: '#2dd4bf' }} asChild>
                <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511974455563')}>
                  Solicitar Diagnóstico Gratuito
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.3)', color: '#2dd4bf' }}>
              <Star className="w-4 h-4" />
              Resultados Reais
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
              CLIENTES QUE JÁ{" "}
              <span style={{ background: 'linear-gradient(135deg, #2dd4bf, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                TRANSFORMARAM
              </span>
              {" "}SEUS NEGÓCIOS.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl p-7 space-y-5 relative transition-all duration-300 hover:-translate-y-2"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="absolute top-4 right-6 text-6xl leading-none font-serif" style={{ color: 'rgba(20, 184, 166, 0.15)' }}>"</div>
                <div className="flex gap-1">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm relative z-10">"{t.text}"</p>
                <div className="pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#2dd4bf' }}>
                    <TrendingUp className="w-3 h-3" />{t.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="process" className="py-16 sm:py-20 md:py-28" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.3)', color: '#2dd4bf' }}>
              <Target className="w-4 h-4" />
              Autoridade Comprovada
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
              DO DIAGNÓSTICO À{" "}
              <span style={{ background: 'linear-gradient(135deg, #2dd4bf, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                TRANSFORMAÇÃO REAL.
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Um processo estruturado, transparente e focado em resultados mensuráveis para o seu negócio.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { step: "01", icon: MessageCircle, title: "Consulta Estratégica", description: "Avaliação gratuita e sem compromisso para entender o cenário atual e os objetivos do seu negócio.", color: "#14b8a6" },
              { step: "02", icon: Target, title: "Diagnóstico e Desafios", description: "Análise aprofundada das suas necessidades, gargalos e oportunidades de crescimento no mercado.", color: "#f59e0b" },
              { step: "03", icon: Cpu, title: "Plano Personalizado", description: "Receba uma solução digital sob medida, focada em resultados reais e retorno sobre investimento.", color: "#0ea5e9" },
              { step: "04", icon: Rocket, title: "Transformação em Ação", description: "Implementação com suporte total, garantindo uma transição suave e resultados desde o primeiro dia.", color: "#a855f7" }
            ].map((item, index) => (
              <div key={index} className="rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-2 group"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-black opacity-30" style={{ color: item.color }}>{item.step}</div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${item.color}18` }}>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
              <Clock className="w-4 h-4" />
              Urgência
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
              CADA DIA DE ATRASO É UM DIA DE{" "}
              <span style={{ color: '#f87171' }}>LUCRO PERDIDO.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              A Transformação Digital não é mais um diferencial — é a fundação para a sobrevivência e escala no mercado moderno. Enquanto você espera, sua concorrência avança. Não deixe para amanhã o que pode transformar seu negócio hoje.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-4">
              {[
                { value: "R$2k+", label: "Perdidos por mês sem digital" },
                { value: "73%", label: "Das empresas fecham sem presença online" },
                { value: "5x", label: "Mais caro captar cliente sem automação" }
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl"
                  style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.3)', color: '#2dd4bf' }}>
              <MessageCircle className="w-4 h-4" />
              Perguntas Frequentes
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
              TIRE SUAS{" "}
              <span style={{ background: 'linear-gradient(135deg, #2dd4bf, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                DÚVIDAS
              </span>
              {" "}AGORA.
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} />)}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contact" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(20, 184, 166, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24' }}>
              <Sparkles className="w-4 h-4" />
              Comece Hoje Mesmo
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span style={{ background: 'linear-gradient(135deg, #2dd4bf, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                TRANSFORME SUA EMPRESA
              </span>
              <br /><span className="text-white">ANTES QUE SUA</span>
              <br /><span className="text-white">CONCORRÊNCIA FAÇA ISSO.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Agende agora seu diagnóstico gratuito e descubra exatamente como dobrar seus resultados com a infraestrutura digital certa para o seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="text-base sm:text-lg px-8 py-6 font-black group w-full sm:w-auto"
                style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)', border: 'none', boxShadow: '0 0 40px rgba(20, 184, 166, 0.4)' }} asChild>
                <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511974455563')}>
                  <WaSvg />
                  WHATSAPP: (11) 97445-5563
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-8 py-6 font-bold group w-full sm:w-auto"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }} asChild>
                <a href={whatsappUrl2} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('5511984843866')}>
                  <WaSvg />
                  WHATSAPP: (11) 98484-3866
                </a>
              </Button>
            </div>
            <div className="pt-6 space-y-3">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-teal-400" />
                <a href={`mailto:${emailNew}`} className="hover:text-teal-400 transition-colors text-sm"
                  onClick={() => trackEmailClick(emailNew)}>{emailNew}</a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                <a href="https://wa.me/5511974455563" target="_blank" rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors" onClick={() => trackWhatsAppClick('5511974455563')}>
                  WhatsApp: (11) 97445-5563
                </a>
                <span className="hidden sm:inline text-gray-700">|</span>
                <a href="https://wa.me/5511984843866" target="_blank" rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors" onClick={() => trackWhatsAppClick('5511984843866')}>
                  WhatsApp: (11) 98484-3866
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <Globe className="w-4 h-4 text-teal-400" />
                <a href="https://www.instagram.com/eblsolucoescorporatives/" target="_blank" rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors">@eblsolucoescorporatives</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <img src="/assets/logo_ebl.png" alt="EBL Logo" className="h-6 w-auto opacity-60" />
              <span>© 2025 EBL Soluções Corporativas. Todos os direitos reservados.</span>
            </div>
            <div>
              Desenvolvido por{" "}
              <span className="text-teal-400 font-semibold">Erick Almeida</span>
              {" "}—{" "}
              <a href="https://www.instagram.com/erickbrendal" target="_blank" rel="noopener noreferrer"
                className="hover:text-teal-400 transition-colors">@erickbrendal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
