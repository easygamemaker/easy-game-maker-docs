import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'
import { Link } from 'react-router-dom'

const QUICK_START = `// 1. Create your App
const app = new App({ width: 800, height: 600, backgroundColor: '#1a1a2e' })
app.init()

// 2. Define a Scene
class GameScene extends Scene {
  private ball!: CircleShape

  override onCreate() {
    this.ball = new CircleShape({ radius: 20, fill: '#6c63ff' })
    this.ball.x = 400
    this.ball.y = 300
    this.add(this.ball)
  }

  override onUpdate(dt: number) {
    this.ball.x += 100 * dt
  }
}

// 3. Run
app.scenes.add('game', GameScene)
void app.scenes.go('game')
app.run()`

export function IntroductionPage() {
  const { lang } = useLang()

  return (
    <DocLayout>
      <PageHeader
        title={lang === 'en' ? 'Introduction' : 'Introdução'}
        description={
          lang === 'en'
            ? 'Easy Game Maker (EGM) is a TypeScript-first 2D game engine that compiles to WebGL2 and ships to 10+ platforms with a single CLI command.'
            : 'Easy Game Maker (EGM) é uma engine 2D TypeScript-first que compila para WebGL2 e publica em 10+ plataformas com um único comando CLI.'
        }
      />

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-[#f0f0f8] mb-3">
            {lang === 'en' ? 'What is EGM?' : 'O que é o EGM?'}
          </h2>
          <p className="text-[#8888aa] text-sm leading-7">
            {lang === 'en'
              ? 'EGM is a 2D game development toolkit. You write game logic in TypeScript; the engine provides WebGL2 rendering, planck.js physics, Web Audio API support, native WebSocket networking, and CLI-generated web bundles or native project shells.'
              : 'EGM é um toolkit de desenvolvimento 2D. Você escreve a lógica do jogo em TypeScript; a engine fornece renderização WebGL2, física com planck.js, suporte à Web Audio API, rede WebSocket nativa e bundles web ou shells de projeto nativas geradas pela CLI.'}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#f0f0f8] mb-4">
            {lang === 'en' ? 'Quick example' : 'Exemplo rápido'}
          </h2>
          <CodeBlock code={QUICK_START} filename="src/main.ts" />
        </section>

        {/* Architecture image */}
        <section>
          <h2 className="text-xl font-bold text-[#f0f0f8] mb-4">
            {lang === 'en' ? 'Architecture overview' : 'Visão geral da arquitetura'}
          </h2>
          <div className="rounded-2xl overflow-hidden border border-[#1e1e2a] bg-[#111118]">
            <img
              src="/images/architecture.webp"
              alt="EGM Architecture"
              className="w-full object-cover opacity-90"
              onError={(e) => { (e.target as HTMLImageElement).style.display='none' }}
            />
          </div>
          <p className="text-[#55556a] text-xs mt-2 text-center">
            {lang === 'en' ? 'TypeScript → EGM Engine → 10+ Platforms' : 'TypeScript → Engine EGM → 10+ Plataformas'}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#f0f0f8] mb-4">
            {lang === 'en' ? 'Key concepts' : 'Conceitos chave'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '⚙️', en: 'App', pt: 'App', desc_en: 'The root object. Holds renderer, audio, input, physics, scenes and all subsystems.', desc_pt: 'O objeto raiz. Contém renderer, áudio, input, física, cenas e todos os subsistemas.' },
              { icon: '🎬', en: 'Scene', pt: 'Scene', desc_en: 'A self-contained game state. Extend Scene, override onCreate/onUpdate.', desc_pt: 'Um estado de jogo autocontido. Estenda Scene, sobrescreva onCreate/onUpdate.' },
              { icon: '🎨', en: 'DisplayObject', pt: 'DisplayObject', desc_en: 'Base for everything visible — sprites, shapes, text, particles.', desc_pt: 'Base para tudo visível — sprites, formas, texto, partículas.' },
              { icon: '💻', en: 'CLI', pt: 'CLI', desc_en: 'egm new, simulate, build, test, e2e, editor, go — the complete toolchain.', desc_pt: 'egm new, simulate, build, test, e2e, editor, go — o toolchain completo.' },
            ].map(c => (
              <div key={c.en} className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <p className="text-[#f0f0f8] text-sm font-semibold mb-1">{c.en}</p>
                    <p className="text-[#8888aa] text-xs leading-relaxed">
                      {lang === 'en' ? c.desc_en : c.desc_pt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Callout type="tip" title={lang === 'en' ? 'Next step' : 'Próximo passo'}>
          <Link to="/installation" className="text-[#8b85ff] hover:underline">
            {lang === 'en' ? 'Install EGM and create your first project →' : 'Instale o EGM e crie seu primeiro projeto →'}
          </Link>
        </Callout>
      </div>
    </DocLayout>
  )
}
