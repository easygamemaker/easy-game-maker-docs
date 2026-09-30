import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/2d/overview',
  title: t('2D engine overview', 'Visão geral da engine 2D'),
  description: t(
    'A map of the whole 2D engine: what each module does and which reference page documents it.',
    'Um mapa de toda a engine 2D: o que cada módulo faz e qual página de referência o documenta.',
  ),
  source: 'src/engine/index.ts',
  related: ['/core/app', '/core/scene', '/display/display-object', '/first-game'],
  sections: [
    {
      id: 'shape',
      title: t('How the engine is shaped', 'Como a engine é organizada'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Everything public comes from one import: `easy-game-maker`. The central object is `App`, which owns the renderer, input, audio, physics, scenes, timers, transitions, assets, network and gamepad. A game is a set of `Scene` classes registered on `app.scenes`; each scene is a `Group` (a node of the display tree) that you fill with sprites, shapes and text.',
            'Tudo o que é público vem de um único import: `easy-game-maker`. O objeto central é o `App`, que possui o renderer, a entrada, o áudio, a física, as cenas, os timers, as transições, os assets, a rede e o gamepad. Um jogo é um conjunto de classes `Scene` registradas em `app.scenes`; cada cena é um `Group` (um nó da árvore de exibição) que você preenche com sprites, formas e texto.',
          ),
        },
        {
          type: 'p',
          text: t(
            'Each frame `App` polls the gamepad, steps physics (only if `physics: true`), updates timers, transitions and the current scene (including its animated sprites and particle emitters), then asks the renderer to draw that scene. The delta time is in seconds and capped at 0.1.',
            'A cada quadro o `App` lê o gamepad, avança a física (só se `physics: true`), atualiza timers, transições e a cena atual, e então pede ao renderer que desenhe essa cena. O delta de tempo é em segundos e limitado a 0,1.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('2D only', 'Somente 2D'),
          text: t(
            'The `App` has no 3D mode. 3D games use the separate `easy-game-maker/3d` entry point, documented in the [3D overview](/3d/overview).',
            'O `App` não tem modo 3D. Jogos 3D usam o ponto de entrada separado `easy-game-maker/3d`, documentado na [visão geral do 3D](/3d/overview).',
          ),
        },
      ],
    },
    {
      id: 'core-display',
      title: t('Core, display and math', 'Núcleo, exibição e matemática'),
      blocks: [
        {
          type: 'table',
          head: [t('Area', 'Área'), t('What it gives you', 'O que oferece'), t('Pages', 'Páginas')],
          rows: [
            [
              t('Core', 'Núcleo'),
              t(
                'The `App` loop, scenes, asset loading, textures, the renderer, events, timers, platform detection and editor-authored scenes.',
                'O laço do `App`, cenas, carregamento de assets, texturas, o renderer, eventos, timers, detecção de plataforma e cenas criadas no editor.',
              ),
              t(
                '[App](/core/app), [Scene](/core/scene), [Assets](/core/assets), [Textures](/core/textures), [Renderer](/core/renderer), [Events](/core/events), [Timer](/core/timer), [Platform](/core/platform), [VisualScene](/core/visual-scene)',
                '[App](/core/app), [Scene](/core/scene), [Assets](/core/assets), [Textures](/core/textures), [Renderer](/core/renderer), [Events](/core/events), [Timer](/core/timer), [Platform](/core/platform), [VisualScene](/core/visual-scene)',
              ),
            ],
            [
              t('Display', 'Exibição'),
              t(
                'Everything you can put on screen, all built on `DisplayObject`.',
                'Tudo o que você pode pôr na tela, todos construídos sobre `DisplayObject`.',
              ),
              t(
                '[DisplayObject](/display/display-object), [Group](/display/group), [Sprite](/display/sprite), [AnimatedSprite](/display/animated-sprite), [RectShape](/display/rect-shape), [CircleShape](/display/circle-shape), [LineShape](/display/line-shape), [Text](/display/text), [PolygonShape](/display/polygon-shape), [ParticleEmitter](/display/particles)',
                '[DisplayObject](/display/display-object), [Group](/display/group), [Sprite](/display/sprite), [AnimatedSprite](/display/animated-sprite), [RectShape](/display/rect-shape), [CircleShape](/display/circle-shape), [LineShape](/display/line-shape), [Text](/display/text), [PolygonShape](/display/polygon-shape), [ParticleEmitter](/display/particles)',
              ),
            ],
            [
              t('Math', 'Matemática'),
              t('Small value types and matrix helpers.', 'Tipos de valor pequenos e auxiliares de matriz.'),
              t(
                '[Vec2](/math/vec2), [Mat3](/math/mat3), [BoundsRect](/math/bounds-rect)',
                '[Vec2](/math/vec2), [Mat3](/math/mat3), [BoundsRect](/math/bounds-rect)',
              ),
            ],
          ],
        },
      ],
    },
    {
      id: 'systems',
      title: t('Systems on the App', 'Sistemas do App'),
      description: t(
        'These are exported from the same package and documented on their own pages.',
        'Estes são exportados do mesmo pacote e documentados em páginas próprias.',
      ),
      blocks: [
        {
          type: 'table',
          head: [t('System', 'Sistema'), t('Reference', 'Referência')],
          rows: [
            [
              t('Animation: `Tween`, `Easing`, `TransitionManager`', 'Animação: `Tween`, `Easing`, `TransitionManager`'),
              t(
                '[Tween](/animation/tween), [Easing](/animation/easing), [Transitions](/animation/transitions)',
                '[Tween](/animation/tween), [Easing](/animation/easing), [Transições](/animation/transitions)',
              ),
            ],
            [t('Camera', 'Câmera'), t('[Camera](/camera)', '[Câmera](/camera)')],
            [
              t('Physics: `PhysicsWorld`, `PhysicsBody`', 'Física: `PhysicsWorld`, `PhysicsBody`'),
              t('[World](/physics/world), [Body](/physics/body)', '[World](/physics/world), [Body](/physics/body)'),
            ],
            [
              t('Input: `InputManager`, `GamepadManager`', 'Entrada: `InputManager`, `GamepadManager`'),
              t(
                '[Keyboard and mouse](/input/keyboard-mouse), [Gamepad](/input/gamepad)',
                '[Teclado e mouse](/input/keyboard-mouse), [Gamepad](/input/gamepad)',
              ),
            ],
            [
              t('Audio: `AudioManager`, `AudioChannel`', 'Áudio: `AudioManager`, `AudioChannel`'),
              t('[Manager](/audio/manager), [Channel](/audio/channel)', '[Manager](/audio/manager), [Channel](/audio/channel)'),
            ],
            [
              t('Network: `NetworkManager`, `NetworkRoom`', 'Rede: `NetworkManager`, `NetworkRoom`'),
              t('[Manager](/network/manager), [Room](/network/room)', '[Manager](/network/manager), [Room](/network/room)'),
            ],
            [
              t('Gameplay: `ObjectPool`, `StateMachine`, `Tilemap`', 'Jogabilidade: `ObjectPool`, `StateMachine`, `Tilemap`'),
              t(
                '[ObjectPool](/gameplay/object-pool), [StateMachine](/gameplay/state-machine), [Tilemap](/gameplay/tilemap)',
                '[ObjectPool](/gameplay/object-pool), [StateMachine](/gameplay/state-machine), [Tilemap](/gameplay/tilemap)',
              ),
            ],
            [
              t('Shaders: `ShaderSystem`, `BuiltinShaders`', 'Shaders: `ShaderSystem`, `BuiltinShaders`'),
              t('[System](/shaders/system), [Built-ins](/shaders/builtins)', '[Sistema](/shaders/system), [Embutidos](/shaders/builtins)'),
            ],
            [
              t('Monetization: `AdManager`, `IAPManager`', 'Monetização: `AdManager`, `IAPManager`'),
              t('[Ads](/monetization/ads), [In-app purchases](/monetization/iap)', '[Anúncios](/monetization/ads), [Compras no app](/monetization/iap)'),
            ],
            [
              t('Debug: `DebugHUD`, `SaveManager`', 'Depuração: `DebugHUD`, `SaveManager`'),
              t('[Debug HUD](/debug/hud), [Save manager](/debug/save)', '[Debug HUD](/debug/hud), [Save manager](/debug/save)'),
            ],
            [
              t('Editor-authored scenes', 'Cenas criadas no editor'),
              t('[Visual editor](/visual-editor), [VisualScene](/core/visual-scene)', '[Editor visual](/visual-editor), [VisualScene](/core/visual-scene)'),
            ],
          ],
        },
      ],
    },
    {
      id: 'example',
      title: t('The smallest complete game', 'O menor jogo completo'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { App, Scene, RectShape, Text } from 'easy-game-maker'

class GameScene extends Scene {
  private box!: RectShape

  onCreate(): void {
    this.box = new RectShape({ x: 400, y: 250, width: 80, height: 80, fill: '#6c63ff' })
    const title = new Text({ text: 'Hello EGM', x: 20, y: 20, fontSize: 24 })
    title.anchorX = title.anchorY = 0 // Text is centered on x, y by default
    this.add(this.box, title)
  }

  onUpdate(dt: number): void {
    this.box.rotation += dt
  }
}

async function main(): Promise<void> {
  const app = new App({ width: 800, height: 500, backgroundColor: '#0a0a1a' })
  await app.init()
  app.scenes.add('game', GameScene)
  await app.goto('game')
  app.run()
}

void main()`,
        },
      ],
    },
    {
      id: 'status',
      title: t('Where 2D games can run', 'Onde jogos 2D podem rodar'),
      blocks: [
        {
          type: 'callout',
          kind: 'warning',
          title: t('Build status', 'Estado do build'),
          text: t(
            'A 2D game runs in any WebGL2 browser during development. Today `egm build` only produces a desktop build; other platforms are not available yet (the EGM Marketplace is planned). See [Build for desktop](/build/desktop).',
            'Um jogo 2D roda em qualquer navegador com WebGL2 (Web Graphics Library 2) durante o desenvolvimento. Hoje o `egm build` só gera build para desktop; as outras plataformas ainda não estão disponíveis (o EGM Marketplace está planejado). Veja [Build para desktop](/build/desktop).',
          ),
        },
      ],
    },
  ],
}

export default page
