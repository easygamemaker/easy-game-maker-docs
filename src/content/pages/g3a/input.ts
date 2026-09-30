import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/input',
  title: t('input', 'input'),
  description: t(
    'Keyboard, mouse, touch and gamepad as one snapshot per frame: held versus just pressed, actions and bindings.',
    'Teclado, mouse, toque e gamepad como um retrato por quadro: segurando versus acabou de apertar, ações e atalhos.',
  ),
  source: 'easy-game-maker/src/engine3d/input.ts',
  related: ['/3d/engine', '/3d/controls', '/3d/hud', '/3d/game-shape'],
  sections: [
    {
      id: 'why',
      title: t('Ask questions, do not handle events', 'Faça perguntas, não trate eventos'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`createInput({ engine, actions })`, or `game.input`, keeps one snapshot per frame so the game asks "is the player holding left?" and "did they just jump?". Listening to `keydown` directly loses the difference between held and just pressed and repeats at the OS (operating system) key-repeat rate, which is why a jump wired to `keydown` either double-jumps or feels sticky.',
            'O `createInput({ engine, actions })`, ou `game.input`, mantém um retrato por quadro para o jogo perguntar "o jogador está segurando a esquerda?" e "ele acabou de pular?". Ouvir o `keydown` direto perde a diferença entre segurar e acabar de apertar, e repete na taxa de repetição de teclas do SO (sistema operacional), por isso um pulo ligado ao `keydown` ou pula duas vezes ou parece grudento.',
          ),
        },
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`createInput`', '`createInput`'), t('`createInput({ engine?, target?, element?, actions?, touchStick? }) => Input`', '`createInput({ engine?, target?, element?, actions?, touchStick? }) => Input`'), t('`target` is where keys are heard (default `window`). `element` is where pointer and touch are heard (default the engine canvas, else `document.body`). `touchStick` (default true) adds a thumb stick on touch screens.', '`target` é onde as teclas são ouvidas (padrão `window`). `element` é onde ponteiro e toque são ouvidos (padrão o canvas da engine, senão `document.body`). `touchStick` (padrão true) adiciona um direcional de polegar em telas de toque.')],
          ],
        },
        {
          type: 'p',
          text: t(
            'With an `engine` the frame bookkeeping is automatic: `move` is refreshed before your updates and the one-frame flags clear after all of them. Create the input before registering your own `onUpdate` listeners. Without an engine, call `input.beginFrame()` at the start of your update and `input.endFrame()` after it, or `pressed` never clears.',
            'Com uma `engine`, o controle de quadros é automático: o `move` é atualizado antes dos seus updates e as flags de um quadro são limpas depois de todos eles. Crie a entrada antes de registrar seus próprios listeners de `onUpdate`. Sem engine, chame `input.beginFrame()` no início do update e `input.endFrame()` no fim, ou o `pressed` nunca é limpo.',
          ),
        },
      ],
    },
    {
      id: 'queries',
      title: t('Queries', 'Consultas'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'move', type: 'THREE.Vector2', description: t('Already normalised, from WASD, arrows, a gamepad stick or a thumb drag on the left half of a touch screen. Diagonals are not faster. `move.y` is -1 while up/W is held and +1 while down/S is held, so "forward" is `-move.y`.', 'Já normalizado, vindo de WASD, setas, um analógico ou um arrasto de polegar na metade esquerda de uma tela de toque. Diagonais não são mais rápidas. O `move.y` é -1 com cima/W pressionado e +1 com baixo/S, então "para frente" é `-move.y`.') },
            { name: 'down(action)', type: 'boolean', description: t('True every frame the control is held. Use it for movement. Wiring a jump to `down` is what makes a character fly.', 'Verdadeiro em todo quadro em que o controle está segurado. Use para movimento. Ligar o pulo ao `down` é o que faz o personagem voar.') },
            { name: 'pressed(action)', type: 'boolean', description: t('True for exactly one frame. Use it for jumps, shots and menu choices.', 'Verdadeiro em exatamente um quadro. Use para pulos, tiros e escolhas de menu.') },
            { name: 'released(action)', type: 'boolean', description: t('The one-frame release, for charge shots and hold-to-aim.', 'A soltura de um quadro, para tiros carregados e mirar segurando.') },
            { name: 'axis(negative, positive)', type: 'number', description: t('-1, 0 or 1 from a pair of actions, for stepwise movement.', '-1, 0 ou 1 a partir de um par de ações, para movimento em passos.') },
            { name: 'pointer', type: 'THREE.Vector2', description: t('The pointer in clip space (-1..1), ready for a raycaster.', 'O ponteiro em clip space (-1..1), pronto para um raycaster.') },
            { name: 'pointerPixels', type: 'THREE.Vector2', description: t('The pointer in CSS pixels within the canvas, for placing DOM over the world.', 'O ponteiro em pixels CSS (Cascading Style Sheets) dentro do canvas, para posicionar elementos DOM (Document Object Model) sobre o mundo.') },
            { name: 'look', type: 'THREE.Vector2', description: t('Mouse travel this frame (and the right stick). The only thing that works under pointer lock.', 'Deslocamento do mouse neste quadro (e do analógico direito). É a única coisa que funciona com o pointer lock.') },
            { name: 'wheel', type: 'number', description: t('Wheel steps this frame, one per event: +1 for down and -1 for up.', 'Passos da roda neste quadro, um por evento: +1 para baixo e -1 para cima.') },
            { name: 'pointerDown', type: 'boolean', description: t('A pointer went down and Mouse0 has not been released.', 'Um ponteiro foi pressionado e o Mouse0 ainda não foi solto.') },
            { name: 'locked', type: 'boolean', description: t('Pointer lock is active.', 'O pointer lock está ativo.') },
            { name: 'touch', type: 'boolean', description: t('A coarse-pointer (touch) device.', 'Dispositivo de ponteiro grosso (toque).') },
            { name: 'gamepadIndex', type: 'number | null', description: t('`null` without a pad.', '`null` sem gamepad.') },
          ],
        },
        {
          type: 'p',
          text: t(
            '`input.requestPointerLock()` hides the cursor and gives unbounded mouse look (a click must allow it), and `input.exitPointerLock()` gives it back.',
            '`input.requestPointerLock()` esconde o cursor e dá mouse look sem limites (um clique precisa permitir), e `input.exitPointerLock()` devolve o cursor.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Read one-frame state in onUpdate', 'Leia o estado de um quadro no onUpdate'),
          text: t(
            '`pressed`, `released`, `look` and `wheel` are cleared by the input\'s own `onLateUpdate` listener, the first one registered. A late listener you add afterwards always sees them cleared. `down` and `move` are not cleared.',
            '`pressed`, `released`, `look` e `wheel` são limpos pelo próprio listener de `onLateUpdate` da entrada, o primeiro a ser registrado. Um listener tardio que você adicione depois sempre os vê já limpos. `down` e `move` não são limpos.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          code: `import { createGame } from 'easy-game-maker/3d';

const game = createGame();

game.onUpdate(() => {
  if (game.input.pressed('jump')) console.log('jump: true for one frame'); // works
});
game.onLateUpdate(() => {
  if (game.input.pressed('jump')) console.log('never runs: already cleared');
});
`,
        },
      ],
    },
    {
      id: 'bindings',
      title: t('Actions and bindings', 'Ações e atalhos'),
      blocks: [
        {
          type: 'p',
          text: t(
            'An action name is looked up in the bindings. A name with no binding is treated as a raw key code, so `input.down("KeyQ")` works too. Mouse buttons are `Mouse0`, `Mouse1` and `Mouse2`.',
            'O nome de uma ação é procurado nos atalhos. Um nome sem atalho é tratado como código de tecla bruto, então `input.down("KeyQ")` também funciona. Os botões do mouse são `Mouse0`, `Mouse1` e `Mouse2`.',
          ),
        },
        {
          type: 'table',
          head: [t('Action', 'Ação'), t('Keys', 'Teclas'), t('Gamepad (standard mapping)', 'Gamepad (mapeamento padrão)')],
          rows: [
            [t('`left`', '`left`'), t('KeyA, ArrowLeft', 'KeyA, ArrowLeft'), t('none listed', 'nenhum listado')],
            [t('`right`', '`right`'), t('KeyD, ArrowRight', 'KeyD, ArrowRight'), t('none listed', 'nenhum listado')],
            [t('`up`', '`up`'), t('KeyW, ArrowUp', 'KeyW, ArrowUp'), t('none listed', 'nenhum listado')],
            [t('`down`', '`down`'), t('KeyS, ArrowDown', 'KeyS, ArrowDown'), t('none listed', 'nenhum listado')],
            [t('`jump`', '`jump`'), t('Space', 'Space'), t('button 0', 'botão 0')],
            [t('`fire`', '`fire`'), t('Mouse0, Enter', 'Mouse0, Enter'), t('button 2', 'botão 2')],
            [t('`sprint`', '`sprint`'), t('ShiftLeft, ShiftRight', 'ShiftLeft, ShiftRight'), t('none listed', 'nenhum listado')],
            [t('`crouch`', '`crouch`'), t('ControlLeft, KeyC', 'ControlLeft, KeyC'), t('button 1', 'botão 1')],
            [t('`pause`', '`pause`'), t('Escape, KeyP', 'Escape, KeyP'), t('button 9', 'botão 9')],
            [t('`restart`', '`restart`'), t('KeyR', 'KeyR'), t('button 3', 'botão 3')],
          ],
        },
        {
          type: 'p',
          text: t(
            'On a gamepad, buttons 12 to 15 are the d-pad, the left stick is `move` and the right stick is `look`.',
            'Em um gamepad, os botões 12 a 15 são o direcional, o analógico esquerdo é o `move` e o direito é o `look`.',
          ),
        },
        {
          type: 'props',
          title: t('Methods', 'Métodos'),
          rows: [
            { name: 'bind(name, codes)', type: '(string, string[]) => void', description: t('Adds or replaces a binding at runtime: `input.bind("dash", ["KeyQ"])`.', 'Adiciona ou substitui um atalho em tempo de execução: `input.bind("dash", ["KeyQ"])`.') },
            { name: 'codes(name)', type: 'string[] | undefined', description: t('The codes an action listens for, for extending a binding.', 'Os códigos que uma ação escuta, para estender um atalho.') },
            { name: 'press(code), release(code)', type: 'void', description: t('Synthetic input, so on-screen buttons, a tutorial or a replay use the same queries.', 'Entrada sintética, para botões na tela, um tutorial ou um replay usarem as mesmas consultas.') },
            { name: 'endFrame()', type: 'void', description: t('Clears the one-frame state. The engine calls it for you.', 'Limpa o estado de um quadro. A engine chama por você.') },
            { name: 'dispose()', type: 'void', description: t('Removes every listener the input registered.', 'Remove todos os listeners que a entrada registrou.') },
          ],
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: a custom action', 'Exemplo: uma ação própria'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { createGame, lights, models } from 'easy-game-maker/3d';

const game = createGame({
  background: '#0b1020',
  actions: { dash: ['ShiftLeft'], grab: ['KeyE'] },
});
lights.daylight(game.scene);
game.add(models.ground(60));

const player = models.character();
game.add(player);

// Remap or extend at runtime.
game.input.bind('shoot', ['Mouse0', 'KeyF']);

game.onUpdate((dt) => {
  // move is normalised: forward is -move.y, matching -Z forward.
  player.position.x += game.input.move.x * 6 * dt;
  player.position.z += game.input.move.y * 6 * dt;

  if (game.input.pressed('dash')) player.position.x += game.input.axis('left', 'right') * 2;
  if (game.input.pressed('shoot')) game.audio.play('jump');
  if (game.input.down('crouch')) player.scale.y = 0.6;
  else player.scale.y = 1;
});
`,
        },
        {
          type: 'p',
          text: t(
            'Other things the input does for you: Space and the arrows are `preventDefault`ed so the page does not scroll mid-jump, OS key repeat is ignored, losing window focus releases every key (no stuck "running" bug), and the context menu is disabled on the canvas so right mouse is a game button.',
            'Outras coisas que a entrada faz por você: Space e as setas recebem `preventDefault` para a página não rolar no meio do pulo, a repetição de teclas do SO é ignorada, perder o foco da janela solta todas as teclas (sem o bug de "correndo" travado) e o menu de contexto é desativado no canvas, então o botão direito do mouse é um botão do jogo.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Gamepad edge cases', 'Casos especiais do gamepad'),
          text: t(
            'For a gamepad, `released("jump")` is never true: only the `Pad<N>` code enters the released set, not the action\'s keyboard codes. Releasing a gamepad button also clears the keyboard keys held for the same action.',
            'Em um gamepad, `released("jump")` nunca é verdadeiro: só o código `Pad<N>` entra no conjunto de soltos, não os códigos de teclado da ação. Soltar um botão do gamepad também limpa as teclas do teclado seguradas para a mesma ação.',
          ),
        },
        {
          type: 'p',
          text: t(
            'Exported types: `Input`, `InputHost`, `InputOptions` and `KeyTarget`.',
            'Tipos exportados: `Input`, `InputHost`, `InputOptions` e `KeyTarget`.',
          ),
        },
      ],
    },
  ],
}

export default page
