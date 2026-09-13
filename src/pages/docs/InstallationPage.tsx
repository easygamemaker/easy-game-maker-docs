import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'

const INSTALL = `npm install -g easy-game-maker`
const NEW_PROJECT = `egm new my-game
cd my-game
egm simulate`
const CONFIG = `// egm.config.ts
import { defineConfig } from 'easy-game-maker'

export default defineConfig({
  app: {
    name: 'My Game',
    version: '1.0.0',
    bundleId: 'com.example.mygame',
  },
  display: {
    width: 800,
    height: 600,
    backgroundColor: '#1a1a2e',
  },
})`
const MAIN = `// src/main.ts
import { App } from 'easy-game-maker'
import { GameScene } from './scenes/GameScene'

const app = new App({ width: 800, height: 600 })
app.init()
app.scenes.add('game', GameScene)
void app.scenes.go('game')
app.run()`

const SCENE = `// src/scenes/GameScene.ts
import { Scene, RectShape } from 'easy-game-maker'

export class GameScene extends Scene {
  override onCreate() {
    const rect = new RectShape({ width: 100, height: 100, fill: '#6c63ff' })
    rect.x = 350
    rect.y = 250
    this.add(rect)
  }
}`

export function InstallationPage() {
  const { lang } = useLang()

  return (
    <DocLayout>
      <PageHeader
        title={lang === 'en' ? 'Installation' : 'Instalação'}
        description={
          lang === 'en'
            ? 'Install the EGM CLI and create your first project in under 2 minutes.'
            : 'Instale o CLI do EGM e crie seu primeiro projeto em menos de 2 minutos.'
        }
      />

      <div className="space-y-10">
        <section>
          <h2 className="text-lg font-bold text-[#f0f0f8] mb-2">
            {lang === 'en' ? 'Requirements' : 'Requisitos'}
          </h2>
          <div className="flex gap-3 flex-wrap">
            {[
              { label: 'Node.js', version: '≥ 18' },
              { label: 'npm', version: '≥ 9' },
              { label: 'TypeScript', version: '≥ 5.0' },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-2 bg-[#111118] border border-[#1e1e2a] rounded-lg px-3 py-2 text-sm">
                <span className="text-[#f0f0f8] font-medium">{r.label}</span>
                <span className="text-[#6c63ff] font-mono text-xs">{r.version}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#f0f0f8] mb-3">
            {lang === 'en' ? '1. Install the CLI' : '1. Instalar o CLI'}
          </h2>
          <CodeBlock code={INSTALL} lang="bash" />
          <p className="text-[#55556a] text-xs mt-2">
            {lang === 'en' ? 'This installs the `egm` command globally.' : 'Isso instala o comando `egm` globalmente.'}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#f0f0f8] mb-3">
            {lang === 'en' ? '2. Create a new project' : '2. Criar um novo projeto'}
          </h2>
          <CodeBlock code={NEW_PROJECT} lang="bash" />
          <p className="text-[#8888aa] text-sm mt-3 leading-relaxed">
            {lang === 'en'
              ? 'EGM scaffolds a complete project with TypeScript config, Vite, and a sample scene. `egm simulate` starts the dev server with live reload on port 5173.'
              : 'O EGM cria um projeto completo com configuração TypeScript, Vite e uma cena de exemplo. `egm simulate` inicia o servidor de desenvolvimento com live reload na porta 5173.'}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#f0f0f8] mb-3">
            {lang === 'en' ? 'Project files' : 'Arquivos do projeto'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CodeBlock code={CONFIG} filename="egm.config.ts" />
            <CodeBlock code={MAIN} filename="src/main.ts" />
          </div>
          <div className="mt-4">
            <CodeBlock code={SCENE} filename="src/scenes/GameScene.ts" />
          </div>
        </section>

        <Callout type="info">
          {lang === 'en'
            ? 'The simulator opens automatically in your browser when the Vite dev server is ready. It includes device frames, DevTools, and live console capture.'
            : 'O simulador abre automaticamente no browser quando o servidor Vite está pronto. Inclui frames de dispositivo, DevTools e captura de console ao vivo.'}
        </Callout>
      </div>
    </DocLayout>
  )
}
