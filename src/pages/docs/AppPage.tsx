import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropTable } from '@/components/docs/PropTable'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'
import type { PropDef } from '@/components/docs/PropTable'

const CONFIG_PROPS: PropDef[] = [
  { name: 'width', type: 'number', default: '360', description: 'Canvas width in pixels' },
  { name: 'height', type: 'number', default: '640', description: 'Canvas height in pixels' },
  { name: 'backgroundColor', type: 'string', default: '"#000000"', description: 'CSS hex color for the canvas background' },
  { name: 'physics', type: 'boolean', default: 'false', description: 'Enable the planck.js physics simulation step each frame' },
  { name: 'pixelsPerMeter', type: 'number', default: '50', description: 'Physics unit conversion ratio' },
  { name: 'targetFps', type: 'number', default: '60', description: 'Target frames per second for the game loop' },
  { name: 'canvas', type: 'HTMLCanvasElement', description: 'Provide an existing canvas element instead of creating one' },
]

const MEMBERS: PropDef[] = [
  { name: 'renderer', type: 'WebGLRenderer', readonly: true, description: 'The WebGL2 rendering subsystem' },
  { name: 'audio', type: 'AudioManager', readonly: true, description: 'Web Audio API manager' },
  { name: 'input', type: 'InputManager', readonly: true, description: 'Keyboard, mouse, and pointer events' },
  { name: 'gamepad', type: 'GamepadManager', readonly: true, description: 'Gamepad / controller input' },
  { name: 'physics', type: 'PhysicsWorld', readonly: true, description: 'planck.js physics simulation' },
  { name: 'scenes', type: 'SceneManager', readonly: true, description: 'Scene registration and transition system' },
  { name: 'assets', type: 'AssetManager', readonly: true, description: 'Texture, audio, and font loading' },
  { name: 'timers', type: 'TimerManager', readonly: true, description: 'Delay and interval utilities' },
  { name: 'transitions', type: 'TransitionManager', readonly: true, description: 'Tween-based value transitions' },
  { name: 'shaders', type: 'ShaderSystem', readonly: true, description: 'GLSL shader kernel management' },
  { name: 'network', type: 'NetworkManager', readonly: true, description: 'Native WebSocket multiplayer networking' },
  { name: 'canvas', type: 'HTMLCanvasElement', readonly: true, description: 'The underlying canvas element' },
  { name: 'isRunning', type: 'boolean', readonly: true, description: 'Whether the game loop is currently active' },
]

const BASIC = `import { App } from 'easy-game-maker'
import { GameScene } from './scenes/GameScene'

const app = new App({
  width: 800,
  height: 600,
  backgroundColor: '#0a0a0f',
})

app.init()
app.scenes.add('game', GameScene)
void app.scenes.go('game')
app.run()`

const PHYSICS = `const app = new App({
  width: 800,
  height: 600,
  physics: true,           // enables physics step
  pixelsPerMeter: 60,      // 1 physics unit = 60 pixels
})
app.init()`

const STOP = `// Pause the loop
app.stop()

// Resume it
app.run()

// Clean up everything
app.destroy()`

export function AppPage() {
  const { lang } = useLang()

  return (
    <DocLayout>
      <PageHeader
        title="App"
        badge="Core"
        description={
          lang === 'en'
            ? 'The root object of every EGM game. It wires together the renderer, audio, input, physics, scenes, and all other subsystems.'
            : 'O objeto raiz de todo jogo EGM. Conecta o renderer, áudio, input, física, cenas e todos os outros subsistemas.'
        }
      />

      <div className="space-y-10">
        <ApiSection
          title={lang === 'en' ? 'Basic usage' : 'Uso básico'}
          description={lang === 'en' ? 'Create, initialize, add scenes, and run.' : 'Crie, inicialize, adicione cenas e execute.'}
        >
          <CodeBlock code={BASIC} filename="src/main.ts" />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Configuration' : 'Configuração'}>
          <PropTable props={CONFIG_PROPS} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Enabling physics' : 'Habilitando física'}>
          <CodeBlock code={PHYSICS} />
          <Callout type="info">
            {lang === 'en'
              ? 'Physics is disabled by default for performance. Enable it only in scenes that require collision detection.'
              : 'A física é desabilitada por padrão por performance. Habilite apenas em cenas que precisam de detecção de colisão.'}
          </Callout>
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Properties & subsystems' : 'Propriedades & subsistemas'}>
          <PropTable props={MEMBERS} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Stop, run, destroy' : 'Stop, run, destroy'}>
          <CodeBlock code={STOP} />
        </ApiSection>
      </div>
    </DocLayout>
  )
}
