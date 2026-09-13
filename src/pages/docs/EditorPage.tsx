import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'
import { Badge } from '@/components/ui/Badge'

const OPEN = `egm editor
egm editor -p 5200`

const CODE_ONLY = `# Code-Only mode (visualEditor not set)
# File tree, Monaco editor, Execute button, File CRUD`

const VISUAL = `# Visual Editor mode (visualEditor: true)
# Scene CRUD, Object palette, Inspector, Undo/Redo, Zoom`

export function EditorPage() {
  const { lang } = useLang()
  const l = (en: string, pt: string) => lang === 'en' ? en : pt
  return (
    <DocLayout>
      <PageHeader title="egm editor" badge="BETA" badgeVariant="orange"
        description={l('Browser-based editor. Two modes: Code-Only (all projects) and Visual Editor (visualEditor: true).','Editor baseado em browser. Dois modos: Code-Only (todos os projetos) e Editor Visual (visualEditor: true).')} />
      <div className="space-y-10">
        <ApiSection title={l('Usage','Uso')}><CodeBlock code={OPEN} lang="bash" /></ApiSection>
        <ApiSection title={l('Code-Only Mode','Modo Code-Only')}><CodeBlock code={CODE_ONLY} lang="bash" /><Callout type="info">{l('File tree + Monaco + Execute. See the Visual Editor page for the full visual workflow.','Árvore de arquivos + Monaco + Execute. Veja a página Editor Visual para o workflow visual completo.')}</Callout></ApiSection>
        <ApiSection title={l('Visual Editor Mode','Modo Editor Visual')}><CodeBlock code={VISUAL} lang="bash" /><Callout type="tip">{l('Requires visualEditor: true in egm.config.ts and the views/ + events/ structure. See the Visual Editor page.','Requer visualEditor: true no egm.config.ts e a estrutura views/ + events/. Veja a página Editor Visual.')}</Callout></ApiSection>
        <Callout type="warning"><div className="flex items-center gap-2">{l('The editor is in ','O editor está em ')}<Badge variant="orange">BETA</Badge>{l(' — some features may be incomplete.',' — algumas funcionalidades podem estar incompletas.')}</div></Callout>
      </div>
    </DocLayout>
  )
}
