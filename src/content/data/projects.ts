import type { Project } from '../schema'

/** Textos de Agendei, InovaMold, Suburban, ConectaTEA e Prodmais vêm do LinkedIn do Matheus. Os demais são refinados na Tarefa 8, lendo o README de cada repositório. */
export const projects: Project[] = [
  {
    slug: 'agendei', title: 'Agendei.', kind: 'Plataforma de agendamento e gestão', status: 'academico',
    role: 'Liderança técnica de uma equipe de cinco pessoas',
    summary: 'Plataforma para barbearias e salões de beleza: aplicativo Android nativo (MVVM, Material Design 3), painel web de gestão e API REST documentada com Swagger/OpenAPI. Desenvolvida com Spec Driven Development, banco relacional e NoSQL, e serviços de nuvem para mídia e notificações.',
    stack: ['Kotlin', 'Jetpack Compose', 'Java', 'Spring Boot', 'TypeScript', 'Next.js', 'PostgreSQL', 'MongoDB', 'Firebase'],
    featured: true,
    repo: 'https://github.com/Agendei-Barbearia-e-Salao-de-Beleza/Agendei.', demo: 'https://agendei-alpha.vercel.app',
  },
  {
    slug: 'prodmais', title: 'Prodmais', kind: 'Pesquisa científica (PIBIC / UMC)', status: 'academico',
    role: 'Estudante de Iniciação Científica',
    summary: 'Ferramenta que agrega currículos da Plataforma Lattes e cruza com OpenAlex e CrossRef para dar visibilidade à produção acadêmica, com busca avançada, painéis de indicadores e exportação para o ORCID.',
    stack: ['PHP', 'JavaScript'], featured: true,
    repo: 'https://github.com/Prodmais-UMC/Prodmais', demo: 'https://prodmais-6g41.onrender.com',
  },
  {
    slug: 'claude-cortex', title: 'claude-cortex', kind: 'Ferramenta de desenvolvimento', status: 'producao',
    role: 'Autor',
    summary: 'Dashboard 100% local para monitorar o uso do Claude Code em todos os repositórios da máquina: tokens, custo, atividade e memória, sem conta e sem nuvem.',
    stack: ['Go'], featured: true,
    repo: 'https://github.com/Matheus904-12/claude-cortex', demo: 'https://claude-cortex.vercel.app/',
  },
  {
    slug: 'weave', title: 'WEAVE', kind: 'Plataforma de arquitetura', status: 'em-construcao',
    role: 'Autor',
    summary: 'Um canvas, sete visões: documento, sequência, C4, cronograma, grafo e custos calculados do mesmo estado. Em construção, com início da produção em janeiro de 2027. O protótipo no ar é uma demonstração.',
    stack: ['TypeScript', 'React', 'GSAP', 'Go'], featured: false,
    repo: 'https://github.com/weave-platform/weave', demo: 'https://weave-platform-neon.vercel.app',
  },
  {
    slug: 'inovamold', title: 'InovaMold', kind: 'Dashboard de logística e rastreabilidade', status: 'academico',
    role: 'Desenvolvimento ponta a ponta',
    summary: 'Sistema de monitoramento logístico do pedido, da entrada no comercial à expedição: CRUD em tempo real, timeline de 8 etapas, dashboards que comparam tempos reais com médias históricas e semáforo de insumos.',
    stack: ['JavaScript', 'HTML', 'CSS', 'PostgreSQL', 'Supabase', 'Chart.js'], featured: false,
  },
  {
    slug: 'suburban', title: 'Suburban', kind: 'Rastreio de trens da CPTM', status: 'estudo',
    role: 'Autor',
    summary: 'Plataforma web para acompanhar linhas e composições da CPTM em tempo real, com WebSockets, mapas interativos, alertas de atraso e processamento assíncrono com Celery e Redis.',
    stack: ['Python', 'Django', 'Django Channels', 'Celery', 'Redis', 'Leaflet.js'], featured: false,
    repo: 'https://github.com/Matheus904-12/Suburban',
  },
  {
    slug: 'conectatea', title: 'ConectaTEA', kind: 'Plataforma de apoio a famílias', status: 'academico',
    role: 'Desenvolvimento e coordenação técnica',
    summary: 'Hub para famílias com filhos no espectro autista: autenticação em duas etapas com OTP por e-mail, JWT, painel para especialistas com prontuário e Google Meet, e chat em tempo real com WebSockets.',
    stack: ['Node.js', 'Express', 'Socket.IO', 'PostgreSQL', 'Supabase', 'JWT'], featured: false,
    repo: 'https://github.com/Matheus904-12/ConectaTEA', demo: 'https://conectatea.netlify.app/',
  },
]
