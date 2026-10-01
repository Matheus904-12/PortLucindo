import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { Profile } from '../content/schema'

const fonte = (arquivo: string) => `node_modules/@fontsource/${arquivo}`
Font.register({
  family: 'Geist',
  fonts: [
    { src: fonte('geist/files/geist-latin-400-normal.woff'), fontWeight: 400 },
    { src: fonte('geist/files/geist-latin-600-normal.woff'), fontWeight: 600 },
  ],
})
Font.register({ family: 'Serif', src: fonte('instrument-serif/files/instrument-serif-latin-400-italic.woff') })
Font.registerHyphenationCallback((palavra) => [palavra]) // sem hifenização automática

const TINTA = '#18181b'
const MUDO = '#52525b'
const LINHA = '#d4d4d8'

const s = StyleSheet.create({
  pagina: { fontFamily: 'Geist', fontSize: 9, color: TINTA, paddingTop: 34, paddingBottom: 40, paddingHorizontal: 38, lineHeight: 1.45 },
  nome: { fontFamily: 'Serif', fontSize: 30, lineHeight: 1 },
  cargo: { fontSize: 10.5, color: MUDO, marginTop: 4 },
  contato: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, fontSize: 8.5 },
  contatoItem: { marginRight: 12, color: TINTA, textDecoration: 'none' },
  titulo: { fontSize: 7.5, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', color: MUDO, marginTop: 13, marginBottom: 5, paddingBottom: 3, borderBottomWidth: 0.6, borderBottomColor: LINHA },
  linha: { flexDirection: 'row', justifyContent: 'space-between' },
  forte: { fontWeight: 600 },
  mudo: { color: MUDO },
  bloco: { marginBottom: 7 },
  item: { flexDirection: 'row', marginTop: 1.5 },
  marcador: { width: 9, color: MUDO },
  rodape: { position: 'absolute', bottom: 18, left: 38, right: 38, flexDirection: 'row', justifyContent: 'space-between', fontSize: 7.5, color: MUDO },
})

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

export function mesAno(aaaamm: string | null): string {
  if (!aaaamm) return 'atual'
  const [ano, mes] = aaaamm.split('-')
  return `${MESES[Number(mes) - 1]}/${ano}`
}

export function dataCompleta(iso: string): string {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

/** A trilha Microsoft Learning aparece à parte, como uma linha de contagem. */
export function selecionarDestaques(profile: Profile, limite: number) {
  return profile.certifications.filter((c) => c.featured && c.id !== 'microsoft-learning').slice(0, limite)
}

/** Texto à esquerda quebra de linha; a data à direita nunca encolhe nem é atropelada. */
const LinhaComData = ({ esquerda, data }: { esquerda: React.ReactNode; data: string }) => (
  <View style={s.linha}>
    <Text style={{ flex: 1, paddingRight: 10 }}>{esquerda}</Text>
    <Text style={[s.mudo, { flexShrink: 0 }]}>{data}</Text>
  </View>
)

export function exibirLink(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

const Secao = ({ titulo }: { titulo: string }) => <Text style={s.titulo}>{titulo}</Text>
const Item = ({ texto }: { texto: string }) => (
  <View style={s.item}><Text style={s.marcador}>•</Text><Text style={{ flex: 1 }}>{texto}</Text></View>
)

function Experiencias({ profile }: { profile: Profile }) {
  return profile.experience.map((e, i) => (
    <View key={e.company + e.start} style={s.bloco} wrap={false}>
      <LinhaComData esquerda={<><Text style={s.forte}>{e.role}</Text> · {e.company}</>} data={`${mesAno(e.start)} – ${mesAno(e.end)}`} />
      <Text style={s.mudo}>{e.summary}</Text>
      {e.highlights.slice(0, i === 0 ? 5 : 2).map((h) => <Item key={h} texto={h} />)}
    </View>
  ))
}

export function CurriculoDocument({ profile }: { profile: Profile }) {
  const destaques = selecionarDestaques(profile, 9)
  const ms = profile.certifications.find((c) => c.id === 'microsoft-learning')
  const projetos = profile.projects.filter((p) => p.featured)
  return (
    <Document title={`Currículo — ${profile.name}`} author={profile.name} language="pt-BR" subject="Currículo" keywords="desenvolvedor, TypeScript, Python, Node.js">
      <Page size="A4" style={s.pagina}>
        <Text style={s.nome}>{profile.name}</Text>
        <Text style={s.cargo}>{profile.headline}</Text>
        <View style={s.contato}>
          <Link src={`mailto:${profile.email}`} style={s.contatoItem}>{profile.email}</Link>
          {profile.links.slice(0, 3).map((l) => <Link key={l.href} src={l.href} style={s.contatoItem}>{exibirLink(l.href)}</Link>)}
          <Text style={s.mudo}>{profile.location}</Text>
        </View>

        <Secao titulo="Resumo" />
        <Text>{profile.summary[0]} {profile.summary[2]}</Text>

        <Secao titulo="Experiência" />
        <Experiencias profile={profile} />

        <Secao titulo="Formação" />
        {profile.education.map((e) => (
          <View key={e.institution + e.start} style={s.bloco} wrap={false}>
            <LinhaComData esquerda={<><Text style={s.forte}>{e.institution}</Text> · {e.course}</>} data={`${mesAno(e.start)} – ${mesAno(e.end)}`} />
            {e.note && <Text style={s.mudo}>{e.note}</Text>}
          </View>
        ))}

        <Secao titulo="Projetos" />
        {projetos.map((p) => (
          <View key={p.slug} style={s.bloco} wrap={false}>
            <Text><Text style={s.forte}>{p.title}</Text> · {p.role}</Text>
            <Text style={s.mudo}>{p.summary}</Text>
            <Text>{p.stack.join(' · ')}</Text>
          </View>
        ))}

        <Secao titulo="Competências" />
        {profile.skills.map((g) => <Text key={g.group}><Text style={s.forte}>{g.group}: </Text>{g.items.join(', ')}</Text>)}

        <Secao titulo="Certificações" />
        {destaques.map((c) => <Text key={c.id}>{c.issuer} — {c.title}{c.issued ? ` (${mesAno(c.issued)})` : ''}</Text>)}
        {ms?.items && <Text style={s.mudo}>Microsoft Learning: {ms.items.length} certificados (GitHub, IA, Copilot for Security)</Text>}

        <Secao titulo="Idiomas" />
        <Text>{profile.languages.map((i) => `${i.name} (${i.level})`).join(' · ')}</Text>

        <View style={s.rodape} fixed>
          <Text>Atualizado em {dataCompleta(profile.updatedAt)}</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}
