import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Copy } from 'lucide-react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Footer } from '@/components/layout/Footer'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { ExampleCard } from '@/components/examples/ExampleCard'
import { EXAMPLES } from '@/data/examples'
import { GAME_TYPES, visibleSections, type GameType } from '@/data/navigation'
import { HERO_2D, HERO_3D } from '@/content/snippets'
import { useGameType } from '@/context/GameTypeContext'
import { useLang } from '@/context/LangContext'
import { t as l10n, type L10n } from '@/content/types'
import { cn } from '@/lib/utils'

const INSTALL = 'npm install easy-game-maker'

/** What each game type gives you, in the order a reader meets it. Every line maps to real modules of the SDK. */
const FEATURES: Record<GameType, { title: L10n; text: L10n; to: string }[]> = {
  '2d': [
    { title: l10n('Scenes and transitions', 'Cenas e transições'), text: l10n('A scene manager with animated transitions, so menus, levels and results are separate, testable pieces.', 'Um gerenciador de cenas com transições animadas: menus, fases e resultados são peças separadas e testáveis.'), to: '/core/scene' },
    { title: l10n('WebGL2 rendering', 'Renderização WebGL2'), text: l10n('Sprites, animated sprites, shapes, text and particles batched onto the GPU, with a camera and shaders.', 'Sprites, sprites animados, formas, texto e partículas agrupados na GPU, com câmera e shaders.'), to: '/2d/overview' },
    { title: l10n('Physics', 'Física'), text: l10n('planck.js (a Box2D port) behind PhysicsWorld and PhysicsBody: bodies, joints, contacts.', 'planck.js (um port do Box2D) por trás de PhysicsWorld e PhysicsBody: corpos, juntas, contatos.'), to: '/physics/world' },
    { title: l10n('Input everywhere', 'Entrada em qualquer lugar'), text: l10n('Keyboard, mouse, touch and gamepads through one input layer.', 'Teclado, mouse, toque e gamepads por uma única camada de entrada.'), to: '/input/keyboard-mouse' },
    { title: l10n('Tilemaps, tweens, saves', 'Tilemaps, tweens e saves'), text: l10n('Tilemap layers, tweens with easing, an object pool, a state machine and a save manager.', 'Camadas de tilemap, tweens com easing, object pool, máquina de estados e gerenciador de saves.'), to: '/gameplay/tilemap' },
    { title: l10n('Multiplayer and monetization', 'Multiplayer e monetização'), text: l10n('NetworkRoom for real-time rooms, AdManager and IAPManager for ads and purchases.', 'NetworkRoom para salas em tempo real, AdManager e IAPManager para anúncios e compras.'), to: '/network/room' },
  ],
  '3d': [
    { title: l10n('One call to start', 'Uma chamada para começar'), text: l10n('createGame wires the renderer, loop, input, HUD, sound and tweens, and starts running.', 'createGame liga o renderizador, o loop, a entrada, o HUD, o som e os tweens, e já começa a rodar.'), to: '/3d/engine' },
    { title: l10n('Models without assets', 'Modelos sem assets'), text: l10n('Primitives, prefabs, instancing and pools you can build in code, plus loaders for your own files.', 'Primitivos, prefabs, instâncias e pools que você monta no código, e loaders para os seus arquivos.'), to: '/3d/models' },
    { title: l10n('Light rigs and materials', 'Kits de luz e materiais'), text: l10n('Whole lighting setups in a line, and surfaces and textures drawn in code.', 'Iluminações completas em uma linha, e superfícies e texturas desenhadas no código.'), to: '/3d/lights' },
    { title: l10n('Cameras, characters, physics', 'Câmeras, personagens e física'), text: l10n('First-person, third-person, orbit and platformer rigs, with arcade collision.', 'Kits de primeira pessoa, terceira pessoa, órbita e plataforma, com colisão arcade.'), to: '/3d/controls' },
    { title: l10n('Post-processing and effects', 'Pós-processamento e efeitos'), text: l10n('Bloom and friends, particles, trails and shockwaves.', 'Bloom e afins, partículas, rastros e ondas de choque.'), to: '/3d/postfx' },
    { title: l10n('HUD, sound and a probe', 'HUD, som e um probe'), text: l10n('A DOM HUD over the canvas, synthesised sound, and a probe so tests can watch the running game.', 'Um HUD em DOM sobre o canvas, som sintetizado e um probe para os testes observarem o jogo em execução.'), to: '/3d/probe' },
  ],
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)
  const { t } = useLang()
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked: the command is still selectable */
    }
  }
  return (
    <button onClick={copy} className="group flex items-center gap-3 rounded-xl border border-[#2a2a3a] bg-[#0d0d14]/90 px-4 py-2.5 font-mono text-sm text-[#c9c5ff] transition-colors hover:border-[#6c63ff88]" aria-label={t('Copy the install command', 'Copiar o comando de instalação')}>
      <span className="text-[#55556a]">$</span>
      <span>{command}</span>
      {copied ? <Check size={14} className="text-[#34d399]" /> : <Copy size={14} className="text-[#55556a] group-hover:text-[#8b85ff]" />}
    </button>
  )
}

function Hero() {
  const { t } = useLang()
  const { type, setType } = useGameType()
  const navigate = useNavigate()
  const snippet = type === '3d' ? HERO_3D : HERO_2D

  const start = (next: GameType) => {
    setType(next)
    navigate(next === '3d' ? '/3d/quickstart' : '/first-game')
  }

  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)] items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pt-40">
      <div className="min-w-0">
        <p className="rise font-mono text-xs uppercase tracking-[0.2em] text-[#8b85ff]" style={{ animationDelay: '40ms' }}>
          {t('v0.2 · TypeScript · MIT', 'v0.2 · TypeScript · MIT')}
        </p>
        <h1 className="rise mt-5 text-[2.6rem] font-bold leading-[1.05] tracking-tight text-[#f5f5ff] sm:text-6xl" style={{ animationDelay: '110ms' }}>
          {t('Build 2D and 3D games in', 'Crie jogos 2D e 3D em')}{' '}
          <span className="bg-gradient-to-r from-[#8b85ff] via-[#a78bfa] to-[#f0abfc] bg-clip-text text-transparent">TypeScript</span>.
        </h1>
        <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-[#a5a5bd]" style={{ animationDelay: '180ms' }}>
          {t(
            'One SDK, two engines. Pick the kind of game you are making and the documentation, search and examples show only what applies to it.',
            'Um SDK, duas engines. Escolha o tipo de jogo que você está criando e a documentação, a busca e os exemplos mostram só o que vale para ele.',
          )}
        </p>

        <div className="rise mt-9" style={{ animationDelay: '250ms' }}>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[#55556a]">{t('What are you making?', 'O que você vai criar?')}</p>
          <div className="flex flex-wrap gap-3">
            {GAME_TYPES.map((g) => (
              <button
                key={g.id}
                onClick={() => start(g.id)}
                className={cn(
                  'group flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-left transition-all hover:-translate-y-0.5',
                  type === g.id ? 'border-[#6c63ff] bg-[#6c63ff22] shadow-[0_0_30px_-8px_#6c63ff]' : 'border-[#2a2a3a] bg-[#0d0d14]/80 hover:border-[#6c63ff88]',
                )}
              >
                <span className="text-3xl font-black tracking-tighter text-[#f5f5ff]">{g.id.toUpperCase()}</span>
                <span className="text-sm leading-tight text-[#a5a5bd]">
                  {t('Start a', 'Começar um')}<br />
                  <span className="font-semibold text-[#f0f0f8]">{t(`${g.id.toUpperCase()} game`, `jogo ${g.id.toUpperCase()}`)}</span>
                </span>
                <ArrowRight size={16} className="text-[#8b85ff] transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>

        <div className="rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '320ms' }}>
          <CopyCommand command={INSTALL} />
          <Link to="/introduction" className="px-2 py-2 text-sm text-[#8888aa] transition-colors hover:text-[#f0f0f8]">
            {t('Read the introduction', 'Ler a introdução')} →
          </Link>
        </div>
      </div>

      <div className="rise relative min-w-0" style={{ animationDelay: '260ms' }}>
        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#6c63ff33] via-transparent to-[#f0abfc22] blur-2xl" aria-hidden="true" />
        <div className="relative">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#55556a]">{t('The whole game', 'O jogo inteiro')}</span>
            <div className="flex rounded-lg border border-[#1e1e2a] bg-[#0d0d14] p-0.5" role="tablist" aria-label={t('Game type', 'Tipo de jogo')}>
              {GAME_TYPES.map((g) => (
                <button key={g.id} role="tab" aria-selected={type === g.id} onClick={() => setType(g.id)} className={cn('rounded-md px-3 py-1 font-mono text-[11px] font-bold transition-colors', type === g.id ? 'bg-[#6c63ff] text-white' : 'text-[#8888aa] hover:text-[#f0f0f8]')}>
                  {g.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <CodeBlock key={type} code={snippet.code} lang={snippet.lang} filename={snippet.filename} />
        </div>
      </div>
    </section>
  )
}

function TypePanels() {
  const { lang, t } = useLang()
  const { type, setType } = useGameType()

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <h2 className="text-3xl font-bold tracking-tight text-[#f5f5ff]">{t('Two engines, one way of working', 'Duas engines, um jeito de trabalhar')}</h2>
      <p className="mt-3 max-w-2xl text-[#a5a5bd]">{t('Both are TypeScript, both are tested, both build from the same CLI. What differs is what they give you.', 'Ambas são TypeScript, ambas testadas, ambas geradas pela mesma CLI. O que muda é o que cada uma oferece.')}</p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {GAME_TYPES.map((g) => {
          const pages = visibleSections('engine', g.id).reduce((n, s) => n + s.items.length, 0)
          const active = type === g.id
          return (
            <div key={g.id} className={cn('relative overflow-hidden rounded-3xl border p-7 transition-colors', active ? 'border-[#6c63ff88] bg-[#6c63ff10]' : 'border-[#1e1e2a] bg-[#0d0d14]/80')}>
              <span className="pointer-events-none absolute -right-4 -top-8 select-none text-[9rem] font-black leading-none tracking-tighter text-[#ffffff05]" aria-hidden="true">{g.id.toUpperCase()}</span>
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#8b85ff]">{g.id === '2d' ? 'WebGL2 · planck.js' : 'three.js'}</p>
              <h3 className="mt-2 text-2xl font-bold text-[#f5f5ff]">{t(`${g.id.toUpperCase()} engine`, `Engine ${g.id.toUpperCase()}`)}</h3>
              <p className="mt-2 max-w-sm text-[#a5a5bd]">{g.tagline[lang]}</p>
              <p className="mt-5 font-mono text-xs text-[#55556a]">{pages} {t('reference pages', 'páginas de referência')}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link to={g.id === '3d' ? '/3d/quickstart' : '/first-game'} onClick={() => setType(g.id)} className="rounded-lg bg-[#6c63ff] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8b85ff]">{t('Quick start', 'Início rápido')}</Link>
                <Link to={`/${g.id}/overview`} onClick={() => setType(g.id)} className="rounded-lg border border-[#2a2a3a] px-4 py-2 text-sm text-[#a5a5bd] transition-colors hover:border-[#6c63ff66] hover:text-[#f0f0f8]">{t('Overview', 'Visão geral')}</Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Features() {
  const { lang, t } = useLang()
  const { type } = useGameType()
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#8b85ff]">{t(`Inside the ${type.toUpperCase()} engine`, `Dentro da engine ${type.toUpperCase()}`)}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#f5f5ff]">{t('Everything a game needs before it needs anything of its own.', 'Tudo que um jogo precisa antes de precisar de algo só dele.')}</h2>
          <p className="mt-4 text-[#a5a5bd]">{t('Switch the game type at the top of the page to see the other engine.', 'Troque o tipo de jogo no topo da página para ver a outra engine.')}</p>
        </div>
        <ol className="divide-y divide-[#1e1e2a] border-y border-[#1e1e2a]">
          {FEATURES[type].map((f, i) => (
            <li key={f.to}>
              <Link to={f.to} className="group grid grid-cols-[3rem_1fr_auto] items-start gap-3 py-5 transition-colors hover:bg-[#ffffff04]">
                <span className="font-mono text-sm text-[#6c63ff]">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block font-semibold text-[#f0f0f8]">{f.title[lang]}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#8888aa]">{f.text[lang]}</span>
                </span>
                <ArrowRight size={16} className="mt-1 text-[#55556a] transition-all group-hover:translate-x-1 group-hover:text-[#8b85ff]" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Workflow() {
  const { t } = useLang()
  const steps = [
    { n: '01', title: l10n('Write TypeScript', 'Escreva TypeScript'), cmd: 'egm new my-game', text: l10n('A typed project with Vite and a sample scene.', 'Um projeto tipado com Vite e uma cena de exemplo.') },
    { n: '02', title: l10n('Run it live', 'Execute ao vivo'), cmd: 'egm simulate', text: l10n('A simulator with live reload, device frames and DevTools.', 'Um simulador com recarga ao vivo, molduras de dispositivos e DevTools.') },
    { n: '03', title: l10n('Ship it', 'Publique'), cmd: 'egm build desktop', text: l10n('Desktop builds for macOS, Windows and Linux.', 'Builds de desktop para macOS, Windows e Linux.') },
  ]
  const { lang } = useLang()
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <h2 className="text-3xl font-bold tracking-tight text-[#f5f5ff]">{t('From an empty folder to a desktop app', 'De uma pasta vazia a um app de desktop')}</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-[#1e1e2a] bg-[#0d0d14]/80 p-6">
            <span className="font-mono text-sm text-[#6c63ff]">{s.n}</span>
            <h3 className="mt-2 font-semibold text-[#f0f0f8]">{s.title[lang]}</h3>
            <code className="mt-3 block rounded-lg bg-[#070710] px-3 py-2 font-mono text-xs text-[#c9c5ff]">{s.cmd}</code>
            <p className="mt-3 text-sm leading-relaxed text-[#8888aa]">{s.text[lang]}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#55556a]">
        {t('Desktop builds are available today. The other platforms are under review while we prepare the upcoming EGM Marketplace.', 'Os builds de desktop já estão disponíveis. As demais plataformas estão em revisão enquanto preparamos o futuro EGM Marketplace.')}{' '}
        <Link to="/build/desktop" className="text-[#8b85ff] hover:underline">{t('Build targets', 'Alvos de build')}</Link>
      </p>
    </section>
  )
}

function ExamplesStrip() {
  const { t } = useLang()
  const { type } = useGameType()
  const items = EXAMPLES.filter((e) => e.type === type && e.demo).slice(0, 4)
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#8b85ff]">{t('Play before you read', 'Jogue antes de ler')}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#f5f5ff]">{t('Complete games, running in this page', 'Jogos completos, rodando nesta página')}</h2>
        </div>
        <Link to="/examples" className="hidden shrink-0 text-sm text-[#8b85ff] hover:underline sm:block">{t('All examples', 'Todos os exemplos')} →</Link>
      </div>
      {items.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((e) => <ExampleCard key={e.slug} example={e} />)}
        </div>
      ) : (
        <p className="mt-8 rounded-2xl border border-dashed border-[#2a2a3a] p-6 text-sm text-[#8888aa]">
          {t('3D examples are on the way. Start with the ', 'Os exemplos 3D estão a caminho. Comece pelo ')}
          <Link to="/3d/quickstart" className="text-[#8b85ff] hover:underline">{t('3D quick start', 'início rápido 3D')}</Link>.
        </p>
      )}
    </section>
  )
}

export function HomePage() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TypePanels />
        <Features />
        <ExamplesStrip />
        <Workflow />
      </main>
      <Footer />
    </div>
  )
}
