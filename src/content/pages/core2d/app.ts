import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/app',
  title: t('App', 'App'),
  description: t(
    'The root object of a 2D game: it creates the canvas and every subsystem, and runs the frame loop.',
    'O objeto raiz de um jogo 2D: cria o canvas e todos os subsistemas, e executa o laço de quadros.',
  ),
  source: 'src/engine/core/App.ts',
  related: ['/core/fixed-step', '/core/scene', '/core/renderer', '/core/timer', '/core/assets'],
  sections: [
    {
      id: 'config',
      title: t('Configuration', 'Configuração'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Pass an `AppConfig` to the constructor. Every field is optional. The constructor only builds the subsystems; nothing touches the DOM until you call `init()`.',
            'Passe um `AppConfig` ao construtor. Todos os campos são opcionais. O construtor apenas cria os subsistemas; nada toca o DOM (Document Object Model, a árvore de elementos da página) até você chamar `init()`.',
          ),
        },
        {
          type: 'props',
          title: t('AppConfig', 'AppConfig'),
          rows: [
            { name: 'canvas', type: 'HTMLCanvasElement', description: t('Existing canvas to render into. When omitted, a canvas is created and appended to `document.body`. An argument passed to `init(canvas)` takes precedence.', 'Canvas existente onde desenhar. Se omitido, um canvas é criado e anexado a `document.body`. Um argumento passado a `init(canvas)` tem precedência.') },
            { name: 'width', type: 'number', default: '360', description: t('Logical width in pixels, used for the canvas and the projection.', 'Largura lógica em pixels, usada no canvas e na projeção.') },
            { name: 'height', type: 'number', default: '640', description: t('Logical height in pixels.', 'Altura lógica em pixels.') },
            { name: 'backgroundColor', type: 'string', default: "'#000000'", description: t('Clear color as a hex string.', 'Cor de limpeza como string hexadecimal.') },
            { name: 'physics', type: 'boolean', default: 'false', description: t('When true, the frame loop steps the physics world each frame.', 'Quando true, o laço de quadros avança o mundo de física a cada quadro.') },
            { name: 'pixelsPerMeter', type: 'number', default: '50', description: t('Scale between pixels and physics meters.', 'Escala entre pixels e metros da física.') },
            { name: 'targetFps', type: 'number', default: '60', description: t('Frame cap. The loop skips animation frames that arrive sooner than `1000 / targetFps` milliseconds after the last one. `0` leaves it uncapped, at the display refresh rate.', 'Limite de quadros por segundo. O laço ignora quadros de animação que chegam antes de `1000 / targetFps` milissegundos após o último. `0` deixa sem limite, na taxa de atualização da tela.') },
            { name: 'fixedHz', type: 'number', default: '60', description: t('Rate in hertz of the scene fixed loop (`Scene.onFixedUpdate`). See [Fixed Step](/core/fixed-step).', 'Taxa em hertz do laço fixo da cena (`Scene.onFixedUpdate`). Veja [Passo Fixo](/core/fixed-step).') },
            { name: 'maxFixedStepsPerFrame', type: 'number', default: '5', description: t('Most fixed steps per frame before the backlog is dropped.', 'Máximo de passos fixos por quadro antes de o excedente ser descartado.') },
          ],
        },
      ],
    },
    {
      id: 'members',
      title: t('Subsystems and methods', 'Subsistemas e métodos'),
      blocks: [
        {
          type: 'props',
          title: t('Subsystems (readonly)', 'Subsistemas (somente leitura)'),
          rows: [
            { name: 'renderer', type: 'WebGLRenderer', readonly: true, description: t('Draws the current scene. See [Renderer](/core/renderer).', 'Desenha a cena atual. Veja [Renderer](/core/renderer).') },
            { name: 'audio', type: 'AudioManager', readonly: true, description: t('Sound playback. See [Audio](/audio/manager).', 'Reprodução de som. Veja [Áudio](/audio/manager).') },
            { name: 'input', type: 'InputManager', readonly: true, description: t('Keyboard and pointer. See [Input](/input/keyboard-mouse).', 'Teclado e ponteiro. Veja [Entrada](/input/keyboard-mouse).') },
            { name: 'physics', type: 'PhysicsWorld', readonly: true, description: t('Physics world. See [Physics](/physics/world).', 'Mundo de física. Veja [Física](/physics/world).') },
            { name: 'transitions', type: 'TransitionManager', readonly: true, description: t('Property tweens. See [Transitions](/animation/transitions).', 'Interpolações de propriedades. Veja [Transições](/animation/transitions).') },
            { name: 'timers', type: 'TimerManager', readonly: true, description: t('See [Timer](/core/timer).', 'Veja [Timer](/core/timer).') },
            { name: 'scenes', type: 'SceneManager', readonly: true, description: t('Registers and switches scenes. See [Scene](/core/scene).', 'Registra e troca cenas. Veja [Scene](/core/scene).') },
            { name: 'shaders', type: 'ShaderSystem', readonly: true, description: t('See [Shaders](/shaders/system).', 'Veja [Shaders](/shaders/system).') },
            { name: 'assets', type: 'AssetManager', readonly: true, description: t('See [Assets](/core/assets).', 'Veja [Assets](/core/assets).') },
            { name: 'network', type: 'NetworkManager', readonly: true, description: t('WebSocket multiplayer. See [Network](/network/manager).', 'Multiplayer por WebSocket. Veja [Rede](/network/manager).') },
            { name: 'gamepad', type: 'GamepadManager', readonly: true, description: t('Controller input, polled each frame. See [Gamepad](/input/gamepad).', 'Entrada de controle, lida a cada quadro. Veja [Gamepad](/input/gamepad).') },
            { name: 'timeScale', type: 'number', default: '1', description: t('Multiplier on game time (0 stops, 0.25 slow motion). See [Fixed Step](/core/fixed-step).', 'Multiplicador do tempo do jogo (0 para, 0.25 é câmera lenta). Veja [Passo Fixo](/core/fixed-step).') },
            { name: 'paused', type: 'boolean', default: 'false', description: t('Stops the fixed steps and makes the variable `dt` 0; the scene is still drawn.', 'Para os passos fixos e zera o `dt` variável; a cena continua sendo desenhada.') },
            { name: 'fixedAlpha / fixedStepCount', type: 'number', readonly: true, description: t('Interpolation factor and step count of the scene fixed loop.', 'Fator de interpolação e contagem de passos do laço fixo da cena.') },
            { name: 'canvas', type: 'HTMLCanvasElement', description: t('Set by `init()`.', 'Definido por `init()`.') },
            { name: 'isRunning', type: 'boolean', readonly: true, description: t('True while the frame loop is active.', 'True enquanto o laço de quadros está ativo.') },
          ],
        },
        {
          type: 'props',
          title: t('Methods', 'Métodos'),
          rows: [
            { name: 'init(canvas?)', type: 'Promise<this>', description: t('Uses the given canvas or creates one (sized to the config and appended to `document.body`), initializes the renderer, shaders, audio, input and assets. Declared `async`, but it runs synchronously before its first `await` point: when it returns the promise, `app.canvas` is already set, so code that skips the `await` still works. Await it anyway before loading assets or going to a scene.', 'Usa o canvas recebido ou cria um (com o tamanho da config e anexado a `document.body`), e inicializa renderer, shaders, áudio, entrada e assets. Declarado `async`, mas roda de forma síncrona antes do primeiro `await`: quando devolve a promessa, `app.canvas` já está definido, então código que pula o `await` ainda funciona. Use `await` mesmo assim antes de carregar assets ou ir a uma cena.') },
            { name: 'fixedUpdate(hz, fn)', type: '() => void', description: t('Registers a fixed step callback at its own rate and returns an unsubscribe function.', 'Registra um callback de passo fixo em taxa própria e devolve uma função de cancelamento.') },
            { name: 'advance(steps?)', type: 'void', description: t('Runs fixed steps by hand, even while paused. For tests and debugging.', 'Roda passos fixos à mão, mesmo com a pausa ligada. Para testes e depuração.') },
            { name: 'run()', type: 'void', description: t('Starts the `requestAnimationFrame` loop. Does nothing if already running.', 'Inicia o laço de `requestAnimationFrame`. Não faz nada se já estiver rodando.') },
            { name: 'stop()', type: 'void', description: t('Stops the loop.', 'Para o laço.') },
            { name: 'goto(name, options?)', type: 'Promise<void>', description: t('Shortcut for `app.scenes.go(name, options)`.', 'Atalho para `app.scenes.go(name, options)`.') },
            { name: 'resize(width, height)', type: 'void', description: t('Resizes the canvas and the renderer viewport and projection.', 'Redimensiona o canvas e o viewport e a projeção do renderer.') },
            { name: 'destroy()', type: 'void', description: t('Stops the loop and tears down input, renderer, audio, physics, scenes, timers and transitions.', 'Para o laço e desmonta entrada, renderer, áudio, física, cenas, timers e transições.') },
          ],
        },
      ],
    },
    {
      id: 'loop',
      title: t('What one frame does', 'O que um quadro faz'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('Skip the frame if it arrived earlier than the `targetFps` interval. Otherwise compute `dt` in seconds, capped at 0.1 so a stalled tab does not produce a huge step.', 'Pula o quadro se ele chegou antes do intervalo de `targetFps`. Caso contrário, calcula `dt` em segundos, limitado a 0,1 para que uma aba parada não gere um passo enorme.'),
            t('Emit an internal `update` event on `app.input` and poll the gamepad.', 'Emite um evento interno `update` em `app.input` e lê o gamepad.'),
            t('Run the fixed steps: `Scene.onFixedUpdate`, then each `app.fixedUpdate` subscriber (see [Fixed Step](/core/fixed-step)).', 'Roda os passos fixos: `Scene.onFixedUpdate`, depois cada inscrito de `app.fixedUpdate` (veja [Passo Fixo](/core/fixed-step)).'),
            t('With `dt` replaced by `dt * timeScale` (0 when paused) from here on: if `physics: true`, step the physics world.', 'Com o `dt` trocado por `dt * timeScale` (0 quando pausado) daqui em diante: se `physics: true`, avança o mundo de física.'),
            t('Update timers, transitions and the current scene (`onUpdate(dt)`), then advance every `AnimatedSprite` and `ParticleEmitter` in that scene that you did not already update by hand.', 'Atualiza timers, transições e a cena atual (`onUpdate(dt)`), e depois avança todo `AnimatedSprite` e `ParticleEmitter` dessa cena que você não atualizou à mão.'),
            t('Call `Scene.onRender(alpha)` if defined, then render the current scene, if there is one.', 'Chama `Scene.onRender(alpha)` se definido, e desenha a cena atual, se houver.'),
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('run() initializes for you', 'run() inicializa por você'),
          text: t(
            'If you did not call `init()`, `run()` initializes the App itself and finishes before the first frame draws. Call `await app.init()` yourself when you need the canvas, assets or a scene before `run()`.',
            'Se você não chamou `init()`, o `run()` inicializa o App por conta própria e termina antes de o primeiro quadro ser desenhado. Chame `await app.init()` você mesmo quando precisar do canvas, dos assets ou de uma cena antes do `run()`.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example', 'Exemplo'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { App, Scene, Text } from 'easy-game-maker'

class Hello extends Scene {
  onCreate(): void {
    const label = new Text({ text: 'Ready', x: 24, y: 24, fontSize: 28 })
    label.anchorX = label.anchorY = 0
    this.add(label)
  }
}

async function main(): Promise<void> {
  const canvas = document.querySelector('canvas') ?? undefined
  const app = new App({ width: 800, height: 500, backgroundColor: '#101020', physics: false })
  await app.init(canvas)

  app.scenes.add('hello', Hello)
  await app.goto('hello')
  app.run()

  window.addEventListener('beforeunload', () => app.destroy())
}

void main()`,
        },
      ],
    },
  ],
}

export default page
