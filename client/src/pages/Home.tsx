import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Rocket
} from "lucide-react";

export default function Home() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8 animate-fade-in-up" data-aos="fade-right">
              <Badge className="bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Especialista em Transformação Digital
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                TRANSFORMAÇÃO DIGITAL COMPLETA:
                <span className="block mt-2 sm:mt-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  O FIM DA PERDA DE OPORTUNIDADES.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                Especialista em Estratégia e Tecnologia, <span className="text-accent font-semibold">Erick Almeida</span> projeta e implementa a infraestrutura digital que seu negócio precisa para dominar o mercado <span className="text-primary font-semibold">24 horas por dia, 7 dias por semana.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 group"
                  onClick={scrollToContact}
                >
                  QUERO MINHA TRANSFORMAÇÃO DIGITAL AGORA
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 sm:pt-8 border-t border-border">
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">R$ 2.000+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Economizados/mês</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">24/7</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Operação contínua</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">100%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Digital</div>
                </div>
              </div>
            </div>
            
            {/* Right side - Animated photo */}
            <div className="relative flex items-center justify-center" data-aos="fade-left" data-aos-delay="200">
              <div className="relative group">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
                
                {/* Photo container with golden border */}
                <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-4 border-accent shadow-2xl shadow-accent/50 group-hover:scale-105 group-hover:shadow-accent/70 transition-all duration-500">
                  <img 
                    src="/assets/erick_almeida_foto.jpg" 
                    alt="Erick Almeida - Especialista em Transformação Digital"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card border-2 border-accent px-6 py-3 rounded-full shadow-lg animate-float">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-sm">Especialista Certificado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-muted-foreground rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* O Problema Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4" data-aos="fade-up">
            <Badge className="bg-destructive/20 text-destructive px-4 py-2">
              <TrendingDown className="w-4 h-4 mr-2 inline" />
              A Realidade do Mercado
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">
              SEU NEGÓCIO ESTÁ DEIXANDO MAIS DE{" "}
              <span className="text-destructive">R$ 2.000 POR MÊS</span>{" "}
              NA MESA.
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Users,
                title: "Invisibilidade Digital",
                description: "Clientes em potencial não encontram sua empresa quando buscam ativamente por seus serviços. Você não existe onde o dinheiro está.",
                color: "text-destructive"
              },
              {
                icon: Zap,
                title: "Concorrência Acelerada",
                description: "Seus concorrentes já estão investindo em tecnologia e automação, crescendo exponencialmente enquanto seu negócio fica estagnado. O digital não espera.",
                color: "text-destructive"
              },
              {
                icon: DollarSign,
                title: "Oportunidades Perdidas",
                description: "A falta de processos automatizados e presença online custa à sua empresa mais de R$ 2.000 mensais em vendas que poderiam ser suas. É um prejuízo diário.",
                color: "text-destructive"
              },
              {
                icon: Clock,
                title: "Crescimento Limitado",
                description: "Seu negócio só opera quando você está trabalhando. Sem uma estrutura digital 24/7, seu potencial de escala é zero. Sua empresa precisa de autonomia.",
                color: "text-destructive"
              }
            ].map((problem, index) => (
              <Card 
                key={index} 
                className="bg-card border-destructive/20 hover:border-destructive/50 transition-all duration-300 hover:scale-105 group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                    <problem.icon className={`w-7 h-7 ${problem.color}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{problem.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Soluções Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4" data-aos="fade-up">
            <Badge className="bg-primary/20 text-primary px-4 py-2">
              <Rocket className="w-4 h-4 mr-2 inline" />
              A Arquitetura do Sucesso
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">
              A INFRAESTRUTURA COMPLETA PARA{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ESCALAR SEU NEGÓCIO.
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Nós não entregamos apenas ferramentas; implementamos uma arquitetura digital robusta e inteligente, desenhada para máxima performance e autoridade no mercado.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Globe,
                title: "Domínio & E-mail Profissional",
                description: "Profissionalize sua identidade digital com um domínio exclusivo e e-mails corporativos.",
                highlight: "Credibilidade instantânea."
              },
              {
                icon: Target,
                title: "Presença no Google (Google Business)",
                description: "Garanta que clientes encontrem você no exato momento da busca. Domine o Google Maps e a busca local.",
                highlight: "Seja a primeira opção."
              },
              {
                icon: Globe,
                title: "Criação de Sites de Alta Conversão",
                description: "Sua vitrine digital 24/7. Sites rápidos, responsivos e otimizados para transformar visitantes em leads qualificados.",
                highlight: "Sua máquina de vendas."
              },
              {
                icon: Zap,
                title: "Automação Inteligente (RPA)",
                description: "Elimine tarefas repetitivas. Implementamos processos automáticos que economizam tempo e garantem a fluidez da operação.",
                highlight: "Foco no que realmente importa."
              },
              {
                icon: Bot,
                title: "Produtividade com Inteligência Artificial",
                description: "Integre IA para vender mais e analisar dados com precisão cirúrgica. De chatbots a previsões de vendas.",
                highlight: "Vantagem competitiva inegável."
              },
              {
                icon: BarChart3,
                title: "Especialista em CRM",
                description: "Gestão profissional do relacionamento com o cliente. Transforme dados em decisões estratégicas e fidelize sua base.",
                highlight: "Relacionamento que gera lucro."
              },
              {
                icon: HeadphonesIcon,
                title: "Suporte Completo 24/7",
                description: "Sua operação digital nunca para. Oferecemos suporte contínuo para garantir que sua infraestrutura esteja sempre no máximo desempenho.",
                highlight: "Paz de espírito garantida."
              }
            ].map((solution, index) => (
              <Card 
                key={index} 
                className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <solution.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{solution.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                  <p className="text-accent font-semibold">{solution.highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4" data-aos="fade-up">
            <Badge className="bg-accent/20 text-accent px-4 py-2">
              <DollarSign className="w-4 h-4 mr-2 inline" />
              O Caminho para a Escala
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">
              ESCOLHA O NÍVEL DE{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DOMÍNIO DIGITAL
              </span>{" "}
              QUE SEU NEGÓCIO PRECISA.
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Básico */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300" data-aos="fade-up" data-aos-delay="0">
              <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Básico</h3>
                  <p className="text-muted-foreground">Início da Presença Digital</p>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-primary">Investimento Personalizado</div>
                  <p className="text-sm text-muted-foreground">Valor definido após diagnóstico do seu negócio</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Domínio profissional",
                    "E-mail profissional",
                    "Google Business",
                    "Site básico"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={scrollToContact}
                >
                  Solicitar Diagnóstico Gratuito
                </Button>
              </CardContent>
            </Card>

            {/* Completo (Destaque) */}
            <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-accent shadow-xl shadow-accent/20 sm:scale-105 relative" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold">
                  MAIS PROCURADO
                </Badge>
              </div>
              <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Completo</h3>
                  <p className="text-muted-foreground">Automação e Crescimento</p>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-accent">Investimento Personalizado</div>
                  <p className="text-sm text-muted-foreground">Valor definido após diagnóstico do seu negócio</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Tudo do Básico +",
                    "Site avançado",
                    "Agendamento online",
                    "Automação de lembretes"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={scrollToContact}
                >
                  SOLICITAR DIAGNÓSTICO GRATUITO
                </Button>
              </CardContent>
            </Card>

            {/* Premium */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Premium</h3>
                  <p className="text-muted-foreground">Máximo Impacto e IA Estratégica</p>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-primary">Investimento Personalizado</div>
                  <p className="text-sm text-muted-foreground">Valor definido após diagnóstico do seu negócio</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Tudo do Completo +",
                    "CRM Profissional",
                    "Automação avançada",
                    "IA para produtividade"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={scrollToContact}
                >
                  Solicitar Diagnóstico Gratuito
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Metodologia Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4" data-aos="fade-up">
            <Badge className="bg-primary/20 text-primary px-4 py-2">
              <Target className="w-4 h-4 mr-2 inline" />
              Autoridade Comprovada
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">
              RESULTADOS REAIS.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                METODOLOGIA COMPROVADA.
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Agende uma Consulta Estratégica",
                description: "Avaliação gratuita e sem compromisso para entender o cenário atual."
              },
              {
                step: "02",
                title: "Diagnóstico e Desafios",
                description: "Discussão aprofundada das suas necessidades e objetivos de mercado."
              },
              {
                step: "03",
                title: "Plano Personalizado",
                description: "Receba uma solução digital sob medida, focada em resultados e ROI."
              },
              {
                step: "04",
                title: "Início da Transformação",
                description: "Implementação com suporte total, garantindo a transição para o novo nível."
              }
            ].map((item, index) => (
              <Card 
                key={index} 
                className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="text-5xl font-bold text-accent opacity-50">{item.step}</div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Por que agora Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <Badge className="bg-destructive/20 text-destructive px-4 py-2">
              <Clock className="w-4 h-4 mr-2 inline" />
              Urgência
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">
              CADA DIA DE ATRASO É UM DIA DE{" "}
              <span className="text-destructive">LUCRO PERDIDO.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              A Transformação Digital não é mais um diferencial, é a fundação para a sobrevivência e escala no mercado moderno. Não espere a concorrência dominar seu espaço. Sua transformação começa com um clique.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section id="contact" className="py-24 bg-card/50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TRANSFORME SUA EMPRESA
              </span>
              <br />
              ANTES QUE SUA CONCORRÊNCIA FAÇA ISSO.
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 group"
                  asChild
                >
                  <a 
                    href="https://wa.me/5511974455563" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('5511974455563')}
                  >
                    WHATSAPP: (11) 97445-5563
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 group"
                  asChild
                >
                  <a 
                    href="https://wa.me/5511984843866" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('5511984843866')}
                  >
                    WHATSAPP: (11) 98484-3866
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="pt-8 space-y-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <a 
                  href="mailto:erick.almeida@eblsolucoescorp.tec.br" 
                  className="hover:text-accent transition-colors"
                  onClick={() => trackEmailClick('erick.almeida@eblsolucoescorp.tec.br')}
                >
                  erick.almeida@eblsolucoescorp.tec.br
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground">
                <a 
                  href="https://wa.me/5511974455563" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent transition-colors"
                  onClick={() => trackWhatsAppClick('5511974455563')}
                >
                  WhatsApp: (11) 97445-5563
                </a>
                <span className="hidden sm:inline">|</span>
                <a 
                  href="https://wa.me/5511984843866" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent transition-colors"
                  onClick={() => trackWhatsAppClick('5511984843866')}
                >
                  WhatsApp: (11) 98484-3866
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Globe className="w-5 h-5" />
                <a href="https://www.instagram.com/eblsolucoescorporatives/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  @eblsolucoescorporatives
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="text-center text-muted-foreground">
            <p>
              Desenvolvido por <span className="text-accent font-semibold">Erick Almeida</span> —{" "}
              <a 
                href="https://www.instagram.com/erickbrendal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                @erickbrendal
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
