import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/game-shape',
  title: t('The Shape of a Game', 'A Forma de um Jogo'),
  description: t(
    'What createGame returns, when to pass game or game.engine, and the window markers a test can read.',
    'O que o createGame devolve, quando passar game ou game.engine e os marcadores em window que um teste pode ler.',
  ),
  source: 'easy-game-maker/src/engine3d/game.ts',
  related: ['/3d/engine', '/3d/probe', '/3d/overview', '/3d/quickstart'],
  sections: [
    {
      id: 'shape',
      title: t('The Game object', 'O objeto Game'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`createGame(options)` builds an engine (renderer, scene, camera, loop), input, a HUD (Heads-Up Display, the interface over the canvas) inside the engine container, audio, tweens and a probe. It starts the loop and returns them in one flat object. It is flat on purpose: `game.scene` reads better than `game.engine.scene` a hundred times over.',
            'O `createGame(options)` monta uma engine (renderizador, cena, câmera, loop), a entrada, um HUD (Heads-Up Display, a interface sobre o canvas) dentro do container da engine, o áudio, os tweens e um probe. Ele inicia o loop e devolve tudo em um objeto plano. É plano de propósito: `game.scene` lê melhor do que `game.engine.scene` cem vezes seguidas.',
          ),
        },
        {
          type: 'props',
          title: t('Members of `Game`', 'Membros de `Game`'),
          rows: [
            { name: 'engine', type: 'Engine', description: t('The full engine: renderer, scene, camera, loop and everything on the [engine page](/3d/engine).', 'A engine completa: renderizador, cena, câmera, loop e tudo o que está na [página engine](/3d/engine).') },
            { name: 'input', type: 'Input', description: t('Keyboard, mouse, touch and gamepad, see [input](/3d/input).', 'Teclado, mouse, toque e gamepad, veja [input](/3d/input).') },
            { name: 'hud', type: 'Hud', description: t('The DOM (Document Object Model) HUD over the canvas, see [hud](/3d/hud).', 'O HUD em DOM (Document Object Model, a árvore de elementos da página) sobre o canvas, veja [hud](/3d/hud).') },
            { name: 'audio', type: 'GameAudio', description: t('Synthesised sound, see [sound](/3d/sound).', 'Som sintetizado, veja [sound](/3d/sound).') },
            { name: 'tweens', type: 'Tweens', description: t('Tween runner, see [animation](/3d/animation).', 'Executor de tweens, veja [animation](/3d/animation).') },
            { name: 'probe', type: 'Probe', description: t('Registry of named state readers, see [probe](/3d/probe).', 'Registro de leitores de estado nomeados, veja [probe](/3d/probe).') },
            { name: 'scene', type: 'THREE.Scene', description: t('The engine scene.', 'A cena da engine.') },
            { name: 'camera', type: 'THREE.PerspectiveCamera', description: t('The engine camera.', 'A câmera da engine.') },
            { name: 'renderer', type: 'THREE.WebGLRenderer', description: t('The renderer. It takes the type of `rendererFactory` when you pass one.', 'O renderizador. Assume o tipo do `rendererFactory` quando você passa um.') },
            { name: 'onUpdate, onLateUpdate, onResize, add, remove', type: 'methods', description: t('The engine\'s own methods, exposed directly.', 'Os métodos da própria engine, expostos diretamente.') },
          ],
        },
        {
          type: 'p',
          text: t(
            '`GameOptions` is every `createEngine` option plus two: `actions` (extra or replacement key bindings, see [input](/3d/input)) and `hud` (options for the HUD).',
            '`GameOptions` é toda opção do `createEngine` mais duas: `actions` (atalhos de teclado extras ou substitutos, veja [input](/3d/input)) e `hud` (opções do HUD).',
          ),
        },
      ],
    },
    {
      id: 'game-or-engine',
      title: t('game or game.engine', '`game` ou `game.engine`'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Functions that take an engine read only the slice they need, and `game` is a flat subset of the engine. It has `scene`, `camera`, `renderer`, `onUpdate`, `onLateUpdate`, `onResize`, `add` and `remove`, but not `canvas`, `container`, `size`, `fps`, `dt`, `elapsed`, `timeScale`, `pause`, `setRenderTarget` or `dispose`.',
            'As funções que recebem uma engine leem só a fatia de que precisam, e o `game` é um subconjunto plano da engine. Ele tem `scene`, `camera`, `renderer`, `onUpdate`, `onLateUpdate`, `onResize`, `add` e `remove`, mas não tem `canvas`, `container`, `size`, `fps`, `dt`, `elapsed`, `timeScale`, `pause`, `setRenderTarget` nem `dispose`.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Four functions need game.engine', 'Quatro funções exigem game.engine'),
          text: t(
            '`orbitCamera`, `firstPerson`, `createPostFX` and `debug.showStats` fail to type-check with `game` and need `game.engine`. Every other function that takes an engine accepts either. When unsure, pass `game.engine`, which always works.',
            '`orbitCamera`, `firstPerson`, `createPostFX` e `debug.showStats` não passam na checagem de tipos com `game` e exigem `game.engine`. Toda outra função que recebe uma engine aceita qualquer um dos dois. Na dúvida, passe `game.engine`, que sempre funciona.',
          ),
        },
      ],
    },
    {
      id: 'markers',
      title: t('The window markers', 'Os marcadores em window'),
      description: t(
        'Two globals let a page, a browser test or a tool recognise and observe a 3D game.',
        'Dois globais deixam uma página, um teste de navegador ou uma ferramenta reconhecer e observar um jogo 3D.',
      ),
      blocks: [
        {
          type: 'table',
          head: [t('Marker', 'Marcador'), t('Set by', 'Definido por'), t('Meaning', 'Significado')],
          rows: [
            [t('`window.__EGM_3D__`', '`window.__EGM_3D__`'), t('`createEngine` (so `createGame` too)', '`createEngine` (portanto o `createGame` também)'), t('`true` once an engine is created. It marks the page as a 3D game and is not cleared by `engine.dispose()`.', '`true` assim que uma engine é criada. Marca a página como um jogo 3D e não é limpo pelo `engine.dispose()`.')],
            [t('`window.__EGM_GAME__`', '`window.__EGM_GAME__`'), t('`createGame`', '`createGame`'), t('An object `{ frames, probe() }` for observing the running game. `game.engine.dispose()` removes it.', 'Um objeto `{ frames, probe() }` para observar o jogo em execução. O `game.engine.dispose()` o remove.')],
          ],
        },
        {
          type: 'props',
          title: t('`window.__EGM_GAME__` (`GameProbeHandle`)', '`window.__EGM_GAME__` (`GameProbeHandle`)'),
          rows: [
            { name: 'frames', type: 'number', readonly: true, description: t('How many frames the loop has run. It stands still while the game is paused.', 'Quantos quadros o loop já rodou. Fica parado enquanto o jogo está pausado.') },
            { name: 'probe()', type: 'Record<string, unknown>', description: t('The snapshot of every reader registered on `game.probe`, the same as `game.probe.snapshot()`.', 'O retrato de todos os leitores registrados em `game.probe`, igual a `game.probe.snapshot()`.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'Register what matters in the game\'s own code, and read it from outside without reaching into the game\'s variables. A reader that throws becomes `{ error }` in the snapshot. The full API is on the [probe page](/3d/probe).',
            'Registre o que importa no próprio código do jogo e leia de fora sem mexer nas variáveis do jogo. Um leitor que lança erro vira `{ error }` no retrato. A API completa está na [página probe](/3d/probe).',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          code: `import { createGame, lights, models } from 'easy-game-maker/3d';

const game = createGame({ background: '#0b1020' });
lights.daylight(game.scene);
game.add(models.ground(40));

const player = models.character();
game.add(player);
let hp = 100;

game.probe.register('player', () => ({ x: player.position.x, hp }));

// From outside (a browser test, devtools): window.__EGM_GAME__.probe()
// -> { player: { x: 0, hp: 100 } }
const snapshot = window.__EGM_GAME__?.probe();
console.log(window.__EGM_3D__, window.__EGM_GAME__?.frames, snapshot);
`,
        },
      ],
    },
    {
      id: 'lifecycle',
      title: t('Lifecycle', 'Ciclo de vida'),
      blocks: [
        {
          type: 'list',
          items: [
            t('The loop is already running when `createGame` returns: there is nothing to start.', 'O loop já está rodando quando o `createGame` retorna: não há nada para iniciar.'),
            t('`game.engine.dispose()` tears down the whole game (tweens, input, audio, the HUD, the `window.__EGM_GAME__` entry) and then the engine itself. If a newer game replaced the entry, it is left alone.', '`game.engine.dispose()` desmonta o jogo inteiro (tweens, entrada, áudio, HUD, a entrada em `window.__EGM_GAME__`) e depois a própria engine. Se um jogo mais novo substituiu essa entrada, ela é preservada.'),
            t('Prefer `createGame` for a new game. The pieces (`createEngine`, `createInput`, `createHud`, `createAudio`, `createTweens`) can also be assembled by hand; nothing depends on `createGame` existing.', 'Prefira o `createGame` em um jogo novo. As peças (`createEngine`, `createInput`, `createHud`, `createAudio`, `createTweens`) também podem ser montadas à mão; nada depende de o `createGame` existir.'),
          ],
        },
      ],
    },
  ],
}

export default page
