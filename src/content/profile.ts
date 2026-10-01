import { certifications } from './data/certifications'
import { education } from './data/education'
import { milestones } from './data/milestones'
import { experience } from './data/experience'
import { projects } from './data/projects'
import { recommendations } from './data/recommendations'
import { skills } from './data/skills'
import { profileSchema, type Profile } from './schema'

const dados: Profile = {
  name: 'Matheus Lucindo',
  headline: 'Desenvolvedor de Software & Analista · BCR.CX | Time Channels | Full Stack',
  location: 'Ferraz de Vasconcelos, São Paulo, Brasil',
  availability: true,
  tagline: 'Integrações, APIs e produtos web. Hoje conecto a Zendesk a marketplaces no Time Channels da BCR.CX.',
  summary: [
    'Sou desenvolvedor de software júnior e analista na BCR.CX, na squad de Zendesk Channels. Minha trajetória junta paixão por tecnologia com soft skills que considero essenciais: comunicação clara, organização, pontualidade e inteligência emocional.',
    'Curso Análise e Desenvolvimento de Sistemas na Universidade de Mogi das Cruzes, onde também participo de um projeto de Iniciação Científica voltado ao setor privado.',
    'No dia a dia uso Python, TypeScript, Node.js e PHP, com Docker em Ubuntu/Linux e Postman para validar APIs. Domino bancos relacionais e MongoDB. Meu interesse de futuro está na dualidade entre carreira acadêmica e governança de TI.',
  ],
  links: [
    { label: 'Portfólio', href: 'https://lucindoporto.netlify.app' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/matheus-lucindo-b35b68190' },
    { label: 'GitHub', href: 'https://github.com/Matheus904-12' },
    { label: 'Credly', href: 'https://www.credly.com/users/matheus-lucindo' },
    { label: 'Currículo Lattes', href: 'https://wwws.cnpq.br/cvlattesweb/PKG_MENU.menu?f_cod=53217E03D11D285AD6BAD12311586B96' },
  ],
  email: 'matheuslucindo904@gmail.com',
  updatedAt: '2026-10-01',
  experience, education, certifications, projects, skills,
  languages: [{ name: 'Português', level: 'Fluente ou nativo' }, { name: 'Inglês', level: 'Nível básico' }],
  recommendations, milestones,
}

/** Falha o build se qualquer dado sair do formato. */
export const profile: Profile = profileSchema.parse(dados)

/** Versão que vai para o navegador: sem o e-mail em texto puro. */
const { email: _email, ...semEmail } = profile
export const publicProfile = semEmail
