import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/input/action-map',
  title: t('ActionMap', 'ActionMap'),
  description: t(
    'Action-based input for one or many local players: keyboard, gamepad buttons and sticks merged per action, with pressed and released edges, latched taps, rebinding, persistence and synthetic input for tests.',
    'Entrada por ações para um ou vários jogadores locais: teclado, botões e analógicos do controle unidos por ação, com bordas de pressionado e solto, toques travados, remapeamento, persistência e entrada sintética para testes.',
  ),
  badge: 'NEW',
  source: 'src/engine/input/ActionMap.ts',
  related: ['/input/keyboard-mouse', '/input/gamepad', '/core/fixed-step', '/debug/save'],
  sections: [
    {
      id: 'overview',
      title: t('What it solves', 'O que ele resolve'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`app.input.isKeyDown` answers one question about one key, and it cannot see a key that goes down and up between two frames. A game with two players, a keyboard and a gamepad wants different questions: \"is player 1 holding left?\", \"did player 2 just punch?\". `ActionMap` answers them over **named actions**. You declare, per player, which keys, gamepad buttons and gamepad sticks trigger each action, and then ask `down`, `pressed`, `released` or `axis`.",
            "`app.input.isKeyDown` responde uma pergunta sobre uma tecla, e não enxerga uma tecla que desce e sobe entre dois quadros. Um jogo com dois jogadores, teclado e controle quer outras perguntas: \"o jogador 1 está segurando esquerda?\", \"o jogador 2 acabou de dar um soco?\". O `ActionMap` responde sobre **ações nomeadas**. Você declara, por jogador, quais teclas, botões e analógicos do controle disparam cada ação, e depois consulta `down`, `pressed`, `released` ou `axis`.",
          ),
        },
        {
          type: 'p',
          text: t(
            "It is purely additive: `InputManager` and `GamepadManager` are unchanged, and the `App` is not touched. The map reads the browser keyboard events through `app.input` and the controllers through `navigator.getGamepads()` by itself, so it does not depend on `app.gamepad` and has no one frame delay.",
            "É puramente aditivo: `InputManager` e `GamepadManager` não mudaram, e o `App` não foi tocado. O mapa lê os eventos de teclado do navegador por `app.input` e os controles por `navigator.getGamepads()` por conta própria, então não depende de `app.gamepad` e não tem atraso de um quadro.",
          ),
        },
      ],
    },
    {
      id: 'bindings',
      title: t('Bindings and players', 'Bindings e jogadores'),
      blocks: [
        {
          type: 'p',
          text: t(
            "The first argument is the `app` (anything with `input.on` and `input.off` works, and an optional `gamepad.deadzone`). The second is `{ player: { action: Binding[] } }`. A binding is one of:",
            "O primeiro argumento é o `app` (qualquer objeto com `input.on` e `input.off` serve, e um `gamepad.deadzone` opcional). O segundo é `{ jogador: { ação: Binding[] } }`. Um binding é um destes:",
          ),
        },
        {
          type: 'table',
          head: [t('Binding', 'Binding'), t('Form', 'Forma'), t('Meaning', 'Significado')],
          rows: [
            [t('Keyboard', 'Teclado'), t("`'KeyA'`, `'Numpad1'`", "`'KeyA'`, `'Numpad1'`"), t("A `KeyboardEvent.code`: the physical key, the same on every layout.", "Um `KeyboardEvent.code`: a tecla física, igual em qualquer layout.")],
            [t('Keyboard by character', 'Teclado por caractere'), t("`'key:z'`", "`'key:z'`"), t("Matches `KeyboardEvent.key`, for the key that types that character in the current layout. A single letter is compared in lower case.", "Casa com `KeyboardEvent.key`, a tecla que digita aquele caractere no layout atual. Uma única letra é comparada em minúscula.")],
            [t('Gamepad button', 'Botão de controle'), t("`GButton.X`, or `{ button, slot? }`", "`GButton.X`, ou `{ button, slot? }`"), t("A button index. The object form fixes the gamepad slot; without it, the slot of the player is used.", "Um índice de botão. A forma de objeto fixa o slot do controle; sem ela, vale o slot do jogador.")],
            [t('Gamepad stick', 'Analógico do controle'), t("`{ axis, dir, threshold?, slot? }`", "`{ axis, dir, threshold?, slot? }`"), t("`dir` is `-1` (left or up) or `1` (right or down) of the axis. `threshold` (default 0.5) is the deflection from which the action counts as held.", "`dir` é `-1` (esquerda ou cima) ou `1` (direita ou baixo) do eixo. `threshold` (padrão 0,5) é a inclinação a partir da qual a ação conta como segurada.")],
          ],
        },
        {
          type: 'props',
          title: t('ActionMapOptions', 'ActionMapOptions'),
          rows: [
            { name: 'latchTaps', type: 'boolean', default: 'true', description: t('Keep a key that went down and up between two polls alive for one poll, so it still reads as `pressed` and `down` once.', 'Mantém viva por uma consulta uma tecla que desceu e subiu entre duas consultas, para ela ainda aparecer como `pressed` e `down` uma vez.') },
            { name: 'gamepadSlots', type: 'Record<string, number>', description: t('Gamepad slot per player (an index in `navigator.getGamepads()`). A player that is not listed gets the slot equal to its position in `bindings`: the first player uses controller 0, the second uses controller 1.', 'Slot de controle por jogador (um índice em `navigator.getGamepads()`). Um jogador não listado recebe o slot igual à sua posição em `bindings`: o primeiro jogador usa o controle 0, o segundo usa o controle 1.') },
            { name: 'deadzone', type: 'number', default: 'app.gamepad.deadzone, else 0.12', description: t('Stick deadzone from 0 to 1. A stick inside it counts as 0.', 'Zona morta do analógico, de 0 a 1. Um analógico dentro dela conta como 0.') },
            { name: 'autoPoll', type: 'boolean', default: 'true', description: t('Poll once per App frame by itself. Use `false` when your simulation has its own fixed loop and call `poll()` once per step.', 'Consulta uma vez por quadro do App por conta própria. Use `false` quando a sua simulação tem um laço fixo próprio e chame `poll()` uma vez por passo.') },
          ],
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'actions.ts',
          check: 'compile',
          code: `import { ActionMap, GAxis, GButton, type App } from 'easy-game-maker'

export function createActions(app: App): ActionMap {
  return new ActionMap(
    app,
    {
      p1: {
        left: ['KeyA', GButton.DPAD_LEFT, { axis: GAxis.LEFT_X, dir: -1 }],
        right: ['KeyD', GButton.DPAD_RIGHT, { axis: GAxis.LEFT_X, dir: 1 }],
        punch: ['KeyJ', GButton.X],
        block: ['key:l', { button: GButton.B }],
      },
      p2: {
        left: ['ArrowLeft'],
        right: ['ArrowRight'],
        punch: ['Numpad1'],
        block: ['Numpad0'],
      },
    },
    { gamepadSlots: { p1: 0, p2: 1 } },
  )
}`,
        },
      ],
    },
    {
      id: 'queries',
      title: t('Asking about actions', 'Consultando as ações'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'down(player, action)', type: 'boolean', description: t('True while the action is held, including the frame of a latched tap.', 'True enquanto a ação está segurada, incluindo o quadro de um toque travado.') },
            { name: 'pressed(player, action)', type: 'boolean', description: t('True only on the first poll after the press, including latched taps shorter than a frame.', 'True só na primeira consulta depois do aperto, incluindo toques travados mais curtos que um quadro.') },
            { name: 'released(player, action)', type: 'boolean', description: t('True only on the first poll after the release.', 'True só na primeira consulta depois da soltura.') },
            { name: 'axis(player, negative, positive)', type: 'number', description: t('A value from -1 to 1 built from a pair of actions. See the axis rule below.', 'Um valor de -1 a 1 montado a partir de um par de ações. Veja a regra do eixo abaixo.') },
            { name: 'pressedAny / downAny / releasedAny(action)', type: 'boolean', description: t('The same questions, true if **any** player triggers the action. For menus shared by all players.', 'As mesmas perguntas, true se **qualquer** jogador dispara a ação. Para menus compartilhados por todos os jogadores.') },
            { name: 'players()', type: 'string[]', description: t('Player names, in declaration order.', 'Nomes dos jogadores, na ordem de declaração.') },
            { name: 'setGamepadSlot(player, slot) / gamepadSlot(player)', type: 'void / number | undefined', description: t('Move a player to another controller, or read its slot.', 'Move um jogador para outro controle, ou lê o slot dele.') },
            { name: 'destroy()', type: 'void', description: t('Removes every listener and stops polling. Queries keep returning the last state (false after a `clear()`).', 'Remove todos os ouvintes e para de consultar. As consultas continuam devolvendo o último estado (false depois de um `clear()`).') },
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('The axis rule', 'A regra do eixo'),
          text: t(
            "`axis(player, 'left', 'right')` is the value of `right` minus the value of `left`, clamped to -1..1. A **digital** source (a key, a button, synthetic input) counts as a full 1. A **stick** counts as its deflection past the deadzone, so a half-pushed stick gives 0.5, and the value is returned even below the action `threshold` (the threshold only decides `down` and `pressed`). Opposite directions cancel: holding `KeyA` and `KeyD` together gives 0.",
            "`axis(player, 'left', 'right')` é o valor de `right` menos o valor de `left`, limitado a -1..1. Uma fonte **digital** (tecla, botão, entrada sintética) conta como 1 cheio. Um **analógico** conta como a inclinação além da zona morta, então um analógico meio empurrado dá 0,5, e o valor é devolvido mesmo abaixo do `threshold` da ação (o limiar só decide `down` e `pressed`). Sentidos opostos se cancelam: segurar `KeyA` e `KeyD` juntas dá 0.",
          ),
        },
      ],
    },
    {
      id: 'frame',
      title: t('Frames, edges and latched taps', 'Quadros, bordas e toques travados'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`pressed` and `released` are **edges**, computed by `poll()`. By default the map polls itself once per rendered frame, at the start of the frame (it listens to the `update` event that the App emits on `app.input` before anything else). A key held across frames is `pressed` only in the first one.",
            "`pressed` e `released` são **bordas**, calculadas por `poll()`. Por padrão, o mapa consulta a si mesmo uma vez por quadro desenhado, no início do quadro (ele escuta o evento `update` que o App emite em `app.input` antes de tudo). Uma tecla segurada por vários quadros é `pressed` só no primeiro.",
          ),
        },
        {
          type: 'list',
          items: [
            t('**Latching.** With `latchTaps` (the default) a key pressed and released between two polls still reads as `down` and `pressed` for one poll, and `released` on the next. A tap shorter than a frame is never lost. Taps in consecutive frames count as separate presses.', '**Travamento.** Com `latchTaps` (o padrão), uma tecla apertada e solta entre duas consultas ainda aparece como `down` e `pressed` em uma consulta, e `released` na seguinte. Um toque mais curto que um quadro nunca se perde. Toques em quadros seguidos contam como apertos separados.'),
            t('**Focus loss.** Keys held when the window loses focus (`blur`) or the page becomes hidden are released.', '**Perda de foco.** As teclas seguradas quando a janela perde o foco (`blur`) ou a página fica oculta são soltas.'),
            t('**Own loop.** A game with a fixed simulation creates the map with `autoPoll: false` and calls `poll()` (alias `beginFrame()`) exactly **once per step**. Polling more than once per step consumes the edges early.', '**Laço próprio.** Um jogo com simulação fixa cria o mapa com `autoPoll: false` e chama `poll()` (alias `beginFrame()`) exatamente **uma vez por passo**. Consultar mais de uma vez por passo consome as bordas antes da hora.'),
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Why autoPoll: false with a fixed step', 'Por que autoPoll: false com passo fixo'),
          text: t(
            "With the default `autoPoll`, edges are computed once per frame. If the frame then runs two fixed steps, both see the same `pressed`, so a punch would start twice. If it runs zero steps, the press is consumed by a frame with no step and lost. Polling inside the step keeps one edge for exactly one step. See [Fixed Step](/core/fixed-step).",
            "Com o `autoPoll` padrão, as bordas são calculadas uma vez por quadro. Se o quadro roda dois passos fixos, os dois veem o mesmo `pressed`, e um soco começaria duas vezes. Se roda zero passos, o aperto é consumido por um quadro sem passo e se perde. Consultar dentro do passo mantém uma borda para exatamente um passo. Veja [Passo Fixo](/core/fixed-step).",
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'fixed-loop-input.ts',
          check: 'compile',
          code: `import { ActionMap, App } from 'easy-game-maker'

const app = new App({ width: 800, height: 450 })
const actions = new ActionMap(app, { p1: { left: ['KeyA'], right: ['KeyD'], punch: ['KeyJ'] } }, { autoPoll: false })

let x = 400
app.fixedUpdate(60, (_step, dt) => {
  actions.poll() // exactly once per fixed step
  x += actions.axis('p1', 'left', 'right') * 240 * dt
  if (actions.pressed('p1', 'punch')) console.log('punch at', x)
})`,
        },
      ],
    },
    {
      id: 'rebinding',
      title: t('Rebinding and persistence', 'Remapeamento e persistência'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'rebind(player, action, bindings)', type: 'void', description: t('Replaces the bindings of an action. A new player or action is created when it does not exist.', 'Troca os bindings de uma ação. Um jogador ou uma ação novos são criados quando não existem.') },
            { name: 'bindings(player, action)', type: 'readonly Binding[]', description: t('What the action listens for now (empty for unknown ones). Do not mutate.', 'O que a ação escuta agora (vazio para desconhecidas). Não modifique.') },
            { name: 'findConflicts(player)', type: 'BindingConflict[]', description: t('Controls used by more than one action of that player, as `{ binding, actions }`, so a rebind screen can warn about them.', 'Controles usados por mais de uma ação daquele jogador, como `{ binding, actions }`, para uma tela de remapeamento avisar.') },
            { name: 'captureNext(options?) / listen(options?)', type: 'Promise<Binding | null>', description: t('Resolves with the next key (a `KeyboardEvent.code`) or gamepad button (`{ button, slot }`) pressed, for "press a key to rebind" screens. `listen` is an alias.', 'Resolve com a próxima tecla (um `KeyboardEvent.code`) ou botão de controle (`{ button, slot }`) apertados, para telas de "aperte uma tecla para remapear". `listen` é um alias.') },
            { name: 'cancelCapture()', type: 'void', description: t('Cancels a pending capture; its promise resolves `null`.', 'Cancela uma captura pendente; a promessa resolve `null`.') },
            { name: 'toJSON() / fromJSON(data)', type: 'object / void', description: t('A serialisable copy of every binding, and the way back. `fromJSON` ignores players and actions the map does not know, and throws `TypeError` (before changing anything) when a binding is malformed.', 'Uma cópia serializável de todos os bindings, e o caminho de volta. O `fromJSON` ignora jogadores e ações que o mapa não conhece, e lança `TypeError` (antes de mudar qualquer coisa) quando um binding está malformado.') },
          ],
        },
        {
          type: 'props',
          title: t('CaptureOptions', 'CaptureOptions'),
          rows: [
            { name: 'keyboard', type: 'boolean', default: 'true', description: t('Accept keyboard keys.', 'Aceita teclas do teclado.') },
            { name: 'gamepad', type: 'boolean', default: 'true', description: t('Accept gamepad buttons.', 'Aceita botões do controle.') },
            { name: 'axes', type: 'boolean', default: 'false', description: t('Also accept a stick pushed past 0.75, as an axis binding.', 'Aceita também um analógico empurrado além de 0,75, como binding de eixo.') },
          ],
        },
        {
          type: 'list',
          items: [
            t('While a capture is pending the key is **swallowed**: it does not trigger actions. Only one capture runs at a time; a new one cancels the previous.', 'Enquanto uma captura está pendente, a tecla é **engolida**: não dispara ações. Só uma captura roda por vez; uma nova cancela a anterior.'),
            t('Gamepad capture happens inside `poll()`, so keep polling. Buttons already held when the capture starts are ignored until released.', 'A captura de controle acontece dentro de `poll()`, então continue consultando. Botões já segurados quando a captura começa são ignorados até serem soltos.'),
            t('`JSON.stringify(actions)` works, because `toJSON` is the standard hook. Store the result with the [SaveManager](/debug/save) or `localStorage`.', '`JSON.stringify(actions)` funciona, porque `toJSON` é o gancho padrão. Guarde o resultado com o [SaveManager](/debug/save) ou o `localStorage`.'),
          ],
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'rebind.ts',
          check: 'compile',
          code: `import { ActionMap, SaveManager } from 'easy-game-maker'

const save = new SaveManager('my-fighter')

export function loadControls(actions: ActionMap): void {
  const stored = save.load<unknown>('controls')
  if (stored === null) return
  try {
    actions.fromJSON(stored)
  } catch (error) {
    console.warn('Ignoring a corrupt controls save', error)
  }
}

export async function rebindPunch(actions: ActionMap): Promise<void> {
  const next = await actions.captureNext() // waits for a key or a button
  if (next === null) return // cancelled
  actions.rebind('p1', 'punch', [next])
  for (const conflict of actions.findConflicts('p1')) {
    console.warn(conflict.binding, 'is used by', conflict.actions.join(' and '))
  }
  save.save('controls', actions.toJSON())
}`,
        },
      ],
    },
    {
      id: 'testing',
      title: t('Synthetic input for tests', 'Entrada sintética para testes'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`press`, `release`, `tap` and `clear` feed input without a keyboard, for tests, replays and on-screen buttons. `press` holds the action until `release`. `tap` is a press and release within one frame: the next poll reports `pressed`, the one after reports `released`. A synthetic tap is **always** latched, whatever `latchTaps` says, because a tap you asked for must be seen. `clear()` forgets held keys, synthetic holds, taps and edges, and keeps the bindings.",
            "`press`, `release`, `tap` e `clear` alimentam a entrada sem teclado, para testes, replays e botões na tela. O `press` segura a ação até o `release`. O `tap` é um aperto e soltura dentro de um quadro: a próxima consulta reporta `pressed`, a seguinte reporta `released`. Um toque sintético é **sempre** travado, qualquer que seja o `latchTaps`, porque um toque que você pediu precisa ser visto. O `clear()` esquece teclas seguradas, travas sintéticas, toques e bordas, e mantém os bindings.",
          ),
        },
        {
          type: 'p',
          text: t(
            "The map only needs `input.on` and `input.off`, so a test can hand it a bare `EventEmitter` instead of an `App`.",
            "O mapa só precisa de `input.on` e `input.off`, então um teste pode entregar a ele um `EventEmitter` simples em vez de um `App`.",
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'action-map.test.ts',
          check: 'compile',
          code: `import { ActionMap, EventEmitter } from 'easy-game-maker'

const host = { input: new EventEmitter() }
const actions = new ActionMap(host, { p1: { punch: ['KeyJ'] } }, { autoPoll: false })

actions.tap('p1', 'punch')
actions.poll()
console.log(actions.pressed('p1', 'punch')) // true
actions.poll()
console.log(actions.pressed('p1', 'punch'), actions.released('p1', 'punch')) // false true

actions.destroy()`,
        },
      ],
    },
    {
      id: 'limits',
      title: t('What it does not cover yet', 'O que ainda não cobre'),
      blocks: [
        {
          type: 'callout',
          kind: 'info',
          title: t('Sources', 'Fontes'),
          text: t(
            "The sources are the keyboard, gamepad buttons and gamepad sticks. Touch pads, a command buffer and UI focus are not part of `ActionMap`, and the pointer or mouse is not a binding source yet. The SDK tests exercised controllers only through a simulated `navigator.getGamepads`, not a physical pad. See the [roadmap](https://github.com/easygamemaker/easy-game-maker/blob/main/docs/roadmap-2d.md) for what is planned.",
            "As fontes são o teclado, os botões e os analógicos do controle. Toque na tela, um buffer de comandos e foco de interface não fazem parte do `ActionMap`, e o ponteiro ou mouse ainda não é uma fonte de binding. Os testes do SDK (Software Development Kit) exercitaram os controles só por um `navigator.getGamepads` simulado, não por um controle físico. Veja o [roadmap](https://github.com/easygamemaker/easy-game-maker/blob/main/docs/roadmap-2d.md) para o que está planejado.",
          ),
        },
      ],
    },
  ],
}

export default page
