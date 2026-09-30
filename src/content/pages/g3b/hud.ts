import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/hud',
  title: t('hud', 'hud'),
  description: t(
    'A DOM overlay for scores, bars, toasts, overlays, buttons and world-anchored markers, with styles already injected.',
    'Uma camada DOM para placar, barras, toasts, overlays, botões e marcadores ancorados no mundo, com estilos já injetados.',
  ),
  source: 'src/engine3d/hud.ts',
  related: ['/3d/input', '/3d/state', '/3d/sound', '/3d/engine'],
  sections: [
    {
      id: 'overview',
      title: t('The DOM over the canvas', 'O DOM sobre o canvas'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`createHud({ container })`, or `game.hud`. A HUD (Heads-Up Display, a interface sobreposta ao jogo) is DOM (Document Object Model, a árvore de elementos da página), not 3D: text drawn into the scene fights the camera, blurs at distance and costs a texture upload every time it changes, while an absolutely positioned element is sharp, free and styleable. Styles are injected once, so it looks finished already. The canvas keeps the pointer: clicks fall through to it except on buttons. Text given to any method is shown as text, never parsed as HTML.',
            '`createHud({ container })`, ou `game.hud`. Um HUD (Heads-Up Display, a interface sobreposta ao jogo) é DOM (Document Object Model, a árvore de elementos da página), não 3D: texto desenhado dentro da cena briga com a câmera, borra à distância e custa um upload de textura a cada mudança, enquanto um elemento posicionado de forma absoluta é nítido, de graça e estilizável. Os estilos são injetados uma vez, então já parece pronto. O canvas fica com o ponteiro: os cliques passam para ele, exceto nos botões. O texto passado a qualquer método aparece como texto, nunca interpretado como HTML.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Score, health bar, toast and pause overlay', 'Placar, barra de vida, toast e overlay de pausa'),
          code: `import { createGame, models, lights } from 'easy-game-maker/3d'

const game = createGame()
lights.daylight(game.scene)
game.add(models.ground(40))

const score = game.hud.stat('Score', 0)
const health = game.hud.bar('Health', { at: 'top-left', value: 100, max: 100 })
game.hud.keys({ WASD: 'move', Space: 'jump' })

let hp = 100
window.addEventListener('pointerdown', () => {
  score.add(10)
  hp = Math.max(0, hp - 20)
  health.set(hp)
  game.hud.flash('#ef4444')
  game.hud.toast('Ouch')
  if (hp === 0) {
    game.hud.overlay({
      title: 'Game over',
      body: 'Try again?',
      buttons: [{ label: 'Restart', onClick: () => location.reload() }],
    })
  }
})`,
        },
        {
          type: 'p',
          text: t(
            'Corners are `"top-left"`, `"top-center"`, `"top-right"`, `"center"`, `"bottom-left"`, `"bottom-center"` and `"bottom-right"`. Most widgets take `{ at }` to choose one.',
            'Os cantos são `"top-left"`, `"top-center"`, `"top-right"`, `"center"`, `"bottom-left"`, `"bottom-center"` e `"bottom-right"`. A maioria dos widgets aceita `{ at }` para escolher um.',
          ),
        },
      ],
    },
    {
      id: 'widgets',
      title: t('Widgets', 'Widgets'),
      blocks: [
        {
          type: 'table',
          head: [t('Method', 'Método'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`hud.stat`', '`hud.stat`'), t('`stat(label, value = 0, { at = \'top-left\', format, bump = true })`', '`stat(label, value = 0, { at = \'top-left\', format, bump = true })`'), t('A labelled number that pulses when it changes. Returns `{ element, value, set(n), add(delta), setLabel(text), remove() }`.', 'Um número com rótulo que pulsa quando muda. Devolve `{ element, value, set(n), add(delta), setLabel(text), remove() }`.')],
            [t('`hud.bar`', '`hud.bar`'), t('`bar(label, { at, value = 1, max = 1, color, dangerColor, dangerBelow = 0.3 })`', '`bar(label, { at, value = 1, max = 1, color, dangerColor, dangerBelow = 0.3 })`'), t('Health, fuel, charge. Goes red when at or under `dangerBelow` of full. Returns `{ element, max, set(n), setLabel(text), remove() }`.', 'Vida, combustível, carga. Fica vermelha quando está em `dangerBelow` do total ou abaixo. Devolve `{ element, max, set(n), setLabel(text), remove() }`.')],
            [t('`hud.text`', '`hud.text`'), t('`text(content = \'\', { at = \'bottom-left\' })`', '`text(content = \'\', { at = \'bottom-left\' })`'), t('Free-form line: timers, hints. Returns `{ element, set(text), remove() }`.', 'Linha livre: cronômetros, dicas. Devolve `{ element, set(text), remove() }`.')],
            [t('`hud.toast`', '`hud.toast`'), t('`toast(message, { at = \'bottom-center\', duration = 2400 })`', '`toast(message, { at = \'bottom-center\', duration = 2400 })`'), t('A short message that removes itself after `duration` ms.', 'Uma mensagem curta que se remove após `duration` ms.')],
            [t('`hud.banner`', '`hud.banner`'), t('`banner(message, { duration = 1400 })`', '`banner(message, { duration = 1400 })`'), t('Big centred text that punches in and clears.', 'Texto grande e centralizado que entra com impacto e some.')],
            [t('`hud.overlay`', '`hud.overlay`'), t('`overlay({ title, body, buttons, dismissible })`', '`overlay({ title, body, buttons, dismissible })`'), t('Full-screen modal for game over, pause, victory. `buttons` is `[{ label, onClick, variant, keepOpen }]`: a button closes the overlay first (unless `keepOpen`), then runs `onClick`. `dismissible` closes on a click outside. Returns `{ element, close() }`.', 'Modal de tela cheia para fim de jogo, pausa, vitória. `buttons` é `[{ label, onClick, variant, keepOpen }]`: o botão fecha o overlay primeiro (a menos que `keepOpen`) e depois roda `onClick`. `dismissible` fecha com clique fora. Devolve `{ element, close() }`.')],
            [t('`hud.button`', '`hud.button`'), t('`button(label, onClick, { at = \'bottom-right\', variant })`', '`button(label, onClick, { at = \'bottom-right\', variant })`'), t('A standalone button: a start screen, a mute toggle. Returns `{ element, remove() }`.', 'Um botão avulso: tela inicial, alternar mudo. Devolve `{ element, remove() }`.')],
            [t('`hud.crosshair`', '`hud.crosshair`'), t('`crosshair()`', '`crosshair()`'), t('Centre reticle for anything aimed. Returns `{ element, show(), hide(), remove() }`.', 'Mira central para qualquer coisa apontada. Devolve `{ element, show(), hide(), remove() }`.')],
            [t('`hud.keys`', '`hud.keys`'), t('`keys({ WASD: \'move\', Space: \'jump\' }, { at = \'bottom-center\' })`', '`keys({ WASD: \'move\', Space: \'jump\' }, { at = \'bottom-center\' })`'), t('A row of key caps: the fastest way to teach controls. Returns `{ element, remove() }`.', 'Uma fileira de teclas: o jeito mais rápido de ensinar os controles. Devolve `{ element, remove() }`.')],
            [t('`hud.touchButtons`', '`hud.touchButtons`'), t('`touchButtons({ Jump: \'jump\' }, input, { at = \'bottom-right\', onlyOnTouch = true })`', '`touchButtons({ Jump: \'jump\' }, input, { at = \'bottom-right\', onlyOnTouch = true })`'), t('On-screen buttons that fire like keys: each label maps to an action and presses a synthetic `Touch_<action>` code, so `input.pressed(\'jump\')` works untouched. Creates nothing (and has no `element`) when the device has no touch.', 'Botões na tela que disparam como teclas: cada rótulo mapeia para uma ação e pressiona um código sintético `Touch_<action>`, então `input.pressed(\'jump\')` funciona sem mudança. Não cria nada (e não tem `element`) quando o aparelho não tem toque.')],
            [t('`hud.flash`', '`hud.flash`'), t('`flash(color = \'#ef4444\', { duration = 260, opacity = 0.45 })`', '`flash(color = \'#ef4444\', { duration = 260, opacity = 0.45 })`'), t('A colour wash over the whole screen that fades out: damage red, pickup white, heal green.', 'Um véu de cor sobre a tela inteira que some: vermelho de dano, branco de item, verde de cura.')],
            [t('`hud.marker`', '`hud.marker`'), t('`marker(engine, target, content, { className = \'hud-text\', offsetY = 1.5 })`', '`marker(engine, target, content, { className = \'hud-text\', offsetY = 1.5 })`'), t('Pins a DOM element to a world position: nameplates, waypoints. Call `marker.update()` every frame; it hides while the point is behind the camera. Returns `{ element, set(text), update(), remove() }`.', 'Prende um elemento DOM a uma posição do mundo: nomes, waypoints. Chame `marker.update()` a cada quadro; ele some enquanto o ponto está atrás da câmera. Devolve `{ element, set(text), update(), remove() }`.')],
            [t('`hud.corner`', '`hud.corner`'), t('`corner(name) => HTMLDivElement`', '`corner(name) => HTMLDivElement`'), t('The container element of one corner, created on demand.', 'O elemento contêiner de um canto, criado sob demanda.')],
            [t('`hud.clear` / `hud.remove`', '`hud.clear` / `hud.remove`'), t('`clear()` / `remove()`', '`clear()` / `remove()`'), t('`clear` empties every corner and cancels pending toast and banner timers. `remove` removes the HUD root and cancels pending timers.', '`clear` esvazia todos os cantos e cancela os timers pendentes de toast e banner. `remove` remove a raiz do HUD e cancela os timers pendentes.')],
          ],
        },
        {
          type: 'p',
          text: t(
            '`hud.root` is the HUD\'s root element. Stats, bars, text, toasts, banners, buttons, keys and touch buttons live in the corners; the crosshair and markers are children of the root; overlays and flashes are appended to the container.',
            '`hud.root` é o elemento raiz do HUD. Stats, barras, textos, toasts, banners, botões, teclas e botões de toque vivem nos cantos; a mira e os marcadores são filhos da raiz; overlays e flashes são anexados ao contêiner.',
          ),
        },
      ],
    },
    {
      id: 'markers',
      title: t('World markers and touch controls', 'Marcadores de mundo e controles de toque'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          title: t('A nameplate above a character plus a touch jump button', 'Um nome sobre o personagem e um botão de pulo por toque'),
          code: `import { createGame, models, lights } from 'easy-game-maker/3d'

const game = createGame({ actions: { jump: ['Space'] } })
lights.daylight(game.scene)
game.add(models.ground(40))

const npc = game.add(models.character())
const tag = game.hud.marker(game.engine, npc, 'Guide', { offsetY: 2.2 })
game.hud.touchButtons({ Jump: 'jump' }, game.input)

game.onUpdate(() => {
  tag.update()
  if (game.input.pressed('jump')) game.audio.play('jump')
})`,
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Behavior notes', 'Notas de comportamento'),
          text: t(
            '`hud.remove()` removes only the HUD root: the shared stylesheet stays in the document, and overlays and flashes stay in the container since they are appended to it. `touchButtons` appends the action\'s `Touch_` code to its bindings on every call, so calling it twice binds duplicates.',
            '`hud.remove()` remove apenas a raiz do HUD: a folha de estilos compartilhada permanece no documento, e overlays e flashes ficam no contêiner porque são anexados a ele. `touchButtons` acrescenta o código `Touch_` da ação aos bindings a cada chamada, então chamar duas vezes cria duplicatas.',
          ),
        },
      ],
    },
  ],
}

export default page
