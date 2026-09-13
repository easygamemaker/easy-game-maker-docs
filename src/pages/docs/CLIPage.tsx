import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'
import { Badge } from '@/components/ui/Badge'

interface CLICommandProps {
  command: string
  description_en: string
  description_pt: string
  flags?: { flag: string; desc_en: string; desc_pt: string }[]
  example: string
  badge?: string
}

function CLICommand({ command, description_en, description_pt, flags, example, badge }: CLICommandProps) {
  const { lang } = useLang()

  return (
    <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1e2a] bg-[#0d0d14]">
        <code className="text-[#8b85ff] font-mono text-sm font-semibold">{command}</code>
        {badge && <Badge variant={badge === 'BETA' ? 'orange' : 'green'}>{badge}</Badge>}
      </div>
      <div className="p-4">
        <p className="text-[#8888aa] text-sm mb-4 leading-relaxed">
          {lang === 'en' ? description_en : description_pt}
        </p>
        {flags && flags.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-[#55556a] text-xs uppercase tracking-wider font-semibold">
              {lang === 'en' ? 'Flags' : 'Flags'}
            </p>
            {flags.map(f => (
              <div key={f.flag} className="flex items-start gap-3 text-sm">
                <code className="text-[#fbbf24] font-mono text-xs bg-[#fbbf2411] px-2 py-0.5 rounded flex-shrink-0">
                  {f.flag}
                </code>
                <span className="text-[#8888aa] text-xs">
                  {lang === 'en' ? f.desc_en : f.desc_pt}
                </span>
              </div>
            ))}
          </div>
        )}
        <CodeBlock code={example} lang="bash" />
      </div>
    </div>
  )
}

export function CLIPage() {
  const { lang } = useLang()

  return (
    <DocLayout>
      <PageHeader
        title="CLI Reference"
        badge="CLI"
        description={
          lang === 'en'
            ? 'The egm command-line interface — everything from project creation to multi-platform builds.'
            : 'A interface de linha de comando egm — desde a criação do projeto até builds multiplataforma.'
        }
      />

      <div className="space-y-6">
        <CLICommand
          command="egm new <name>"
          description_en="Scaffold a new EGM project with TypeScript, Vite, and a sample scene."
          description_pt="Cria um novo projeto EGM com TypeScript, Vite e uma cena de exemplo."
          example="egm new my-game\ncd my-game\nnpm install"
        />

        <CLICommand
          command="egm simulate"
          description_en="Start the development simulator with live reload, device frames, DevTools overlay, and optional ngrok tunnel."
          description_pt="Inicia o simulador de desenvolvimento com live reload, frames de dispositivo, overlay DevTools e túnel ngrok opcional."
          flags={[
            { flag: '-p, --port <n>', desc_en: 'Vite port (default: 5173)', desc_pt: 'Porta Vite (padrão: 5173)' },
            { flag: '-t, --tunnel', desc_en: 'Expose via ngrok tunnel — playable from any network', desc_pt: 'Expõe via túnel ngrok — jogável de qualquer rede' },
          ]}
          example="egm simulate\negm simulate --tunnel\negm sim -p 3000"
        />

        <CLICommand
          command="egm build <platform>"
          description_en="Build for a target platform. Supports: web, ios, android, desktop, tizen, webos, androidtv, tvos, xbox, playstation."
          description_pt="Build para uma plataforma alvo. Suporta: web, ios, android, desktop, tizen, webos, androidtv, tvos, xbox, playstation."
          flags={[
            { flag: '[os]', desc_en: 'For desktop: macos | windows | linux (default: all)', desc_pt: 'Para desktop: macos | windows | linux (padrão: todos)' },
          ]}
          example="egm build web\negm build ios\negm build desktop macos\negm build android"
        />

        <CLICommand
          command="egm test"
          description_en="Run unit tests and display results in the terminal with a styled reporter."
          description_pt="Executa testes unitários e exibe resultados no terminal com reporter estilizado."
          example="egm test"
        />

        <CLICommand
          command="egm e2e"
          description_en="Run end-to-end tests with a visual Playwright-based runner. Opens in the browser for interactive mode or runs headless in CI."
          description_pt="Executa testes E2E com runner visual baseado em Playwright. Abre no browser no modo interativo ou executa headless em CI."
          flags={[
            { flag: '-H, --headless', desc_en: 'Run without browser (CI mode)', desc_pt: 'Executar sem browser (modo CI)' },
            { flag: '-j, --json', desc_en: 'Output JSON report file', desc_pt: 'Gerar arquivo de relatório JSON' },
            { flag: '-f, --file <path>', desc_en: 'Run a specific .e2e.ts file', desc_pt: 'Executar um arquivo .e2e.ts específico' },
          ]}
          example="egm e2e\negm e2e --headless\negm e2e -f src/tests/game.e2e.ts"
        />

        <CLICommand
          command="egm editor"
          badge="BETA"
          description_en="Open the EGM visual scene editor. Inspect, move objects, edit code with Monaco, and play/pause the game — all without touching game code."
          description_pt="Abre o editor visual de cenas EGM. Inspecione, mova objetos, edite código com Monaco e dê play/pause no jogo — tudo sem tocar no código do jogo."
          flags={[
            { flag: '-p, --port <n>', desc_en: 'Port (default: 5174)', desc_pt: 'Porta (padrão: 5174)' },
          ]}
          example="egm editor\negm edit -p 5200"
        />

        <CLICommand
          command="egm go [platform]"
          description_en="Build and configure the EgmGO companion app for iOS and/or Android. Generates a QR code to scan with the native app for remote device testing."
          description_pt="Build e configura o app companion EgmGO para iOS e/ou Android. Gera um QR code para escanear com o app nativo para testes em dispositivos remotos."
          example="egm go          # iOS + Android\negm go ios      # iOS only\negm go android  # Android only"
        />

        <Callout type="info">
          {lang === 'en'
            ? 'All commands must be run from the root of your EGM project directory (where egm.config.ts is located).'
            : 'Todos os comandos devem ser executados a partir do diretório raiz do projeto EGM (onde egm.config.ts está localizado).'}
        </Callout>
      </div>
    </DocLayout>
  )
}
