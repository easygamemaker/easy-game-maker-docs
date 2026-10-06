import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/animation/clips',
  title: t('Animation Clips', 'Clipes de Animação'),
  description: t(
    'Clip data with a duration per frame, loop modes and events, the pure clipIndex function, and AnimatedSprite.play(clip), stepClip, seek and clipEvent for fixed-step games.',
    'Dados de clipe com duração por quadro, modos de laço e eventos, a função pura clipIndex, e AnimatedSprite.play(clip), stepClip, seek e clipEvent para jogos de passo fixo.',
  ),
  badge: 'NEW',
  source: 'src/engine/animation/Clip.ts',
  related: ['/display/animated-sprite', '/core/texture-atlas', '/core/fixed-step', '/animation/tween'],
  sections: [
    {
      id: 'overview',
      title: t('A clip is data', 'Um clipe é um dado'),
      blocks: [
        {
          type: 'p',
          text: t(
            "The frame-array animation of `AnimatedSprite` has one `fps` for the whole animation. A fighting game needs more: a punch whose startup lasts 4 steps, the hit 3 and the recovery 9. A `Clip` is plain data that says which frame shows for how long, whether it loops and which events fire. It has no state, so the same clip can drive many sprites.",
            "A animação por array de quadros do `AnimatedSprite` tem um único `fps` para a animação toda. Um jogo de luta precisa de mais: um soco cujo início dura 4 passos, o impacto 3 e a recuperação 9. Um `Clip` é um dado simples que diz qual quadro aparece por quanto tempo, se faz laço e quais eventos disparam. Ele não tem estado, então o mesmo clipe pode conduzir vários sprites.",
          ),
        },
        {
          type: 'props',
          title: t('Clip', 'Clip'),
          rows: [
            { name: 'frames', type: '(Texture | string)[]', required: true, description: t('Frames in play order: textures, or atlas frame names resolved through a [TextureAtlas](/core/texture-atlas).', 'Quadros na ordem de reprodução: texturas, ou nomes de quadros de atlas resolvidos por um [TextureAtlas](/core/texture-atlas).') },
            { name: 'durations', type: 'number[]', description: t('How long each frame stays, in the **play unit** (steps or seconds, chosen when you play). Each must be greater than 0.', 'Quanto cada quadro dura, na **unidade de reprodução** (passos ou segundos, escolhida ao tocar). Cada valor precisa ser maior que 0.') },
            { name: 'fps', type: 'number', default: '12', description: t('Frames per second for the frames that have no `durations` entry (`1 / fps` seconds, or `stepRate / fps` steps).', 'Quadros por segundo para os quadros sem entrada em `durations` (`1 / fps` segundos, ou `stepRate / fps` passos).') },
            { name: 'loop', type: 'boolean | "pingpong"', default: 'true', description: t('`true` loops, `false` plays once and holds the last frame, `"pingpong"` goes forward then back forever without repeating the end frames (0 1 2 1 0 1 2 ...).', '`true` faz laço, `false` toca uma vez e segura o último quadro, `"pingpong"` vai e volta para sempre sem repetir os quadros das pontas (0 1 2 1 0 1 2 ...).') },
            { name: 'events', type: 'Record<number, string>', description: t('Event names by frame index. Each one fires once every time that frame is entered.', 'Nomes de eventos por índice de quadro. Cada um dispara uma vez a cada vez que aquele quadro é alcançado.') },
          ],
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'clips.ts',
          check: 'compile',
          code: `import type { Clip } from 'easy-game-maker'

// Durations in simulation steps: 4 startup, 3 active, 9 recovery
export const punch: Clip = {
  frames: ['punch_0', 'punch_1', 'punch_2'],
  durations: [4, 3, 9],
  loop: false,
  events: { 1: 'hit-active' }, // fires when frame 1 is entered
}

export const idle: Clip = { frames: ['idle_0', 'idle_1', 'idle_2', 'idle_1'], fps: 8 }
export const bounce: Clip = { frames: ['b_0', 'b_1', 'b_2'], fps: 10, loop: 'pingpong' }`,
        },
      ],
    },
    {
      id: 'pure',
      title: t('The pure functions', 'As funções puras'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`clipIndex(clip, t, options)` answers \"which frame is shown at time `t`?\" without any state: the same `(clip, t, options)` always gives the same answer, so a fixed-step simulation and a seconds-driven loop agree frame for frame. Negative `t` counts as 0.",
            "`clipIndex(clip, t, options)` responde \"qual quadro aparece no tempo `t`?\" sem nenhum estado: o mesmo `(clip, t, options)` sempre dá a mesma resposta, então uma simulação de passo fixo e um laço conduzido por segundos concordam quadro a quadro. Um `t` negativo conta como 0.",
          ),
        },
        {
          type: 'props',
          title: t('ClipTimeOptions', 'ClipTimeOptions'),
          rows: [
            { name: 'unit', type: "'seconds' | 'steps'", default: "'seconds'", description: t('The unit of `t` and of `clip.durations`.', 'A unidade de `t` e de `clip.durations`.') },
            { name: 'reverse', type: 'boolean', default: 'false', description: t('Play backwards (for `"pingpong"`, start from the last frame going down).', 'Toca de trás para frente (em `"pingpong"`, começa do último quadro descendo).') },
            { name: 'stepRate', type: 'number', default: '60', description: t('Steps per second, used only to turn `fps` into steps when `unit` is `"steps"`.', 'Passos por segundo, usado só para converter `fps` em passos quando `unit` é `"steps"`.') },
          ],
        },
        {
          type: 'props',
          rows: [
            { name: 'clipIndex(clip, t, options?)', type: 'number', description: t('Index into `clip.frames` of the frame shown at `t`.', 'Índice em `clip.frames` do quadro mostrado em `t`.') },
            { name: 'clipPosition(clip, t, options?)', type: '{ index, slot, done }', description: t('Also gives the `slot` (count of frame entries since the start, growing across loops) and `done` (true once a play-once clip ran out).', 'Também dá o `slot` (contagem de entradas de quadro desde o início, crescendo ao longo dos laços) e `done` (true quando um clipe de uma vez acabou).') },
            { name: 'clipDuration(clip, options?)', type: 'number', description: t('Length of one cycle (the whole run for a play-once clip), in the play unit.', 'Duração de um ciclo (a execução inteira em um clipe de uma vez), na unidade de reprodução.') },
            { name: 'clipSlotFrame(clip, slot, options?)', type: 'number', description: t('The frame index entered by an absolute slot.', 'O índice do quadro alcançado por um slot absoluto.') },
          ],
        },
        {
          type: 'p',
          text: t(
            "All of them throw `RangeError` for an empty clip, or a duration or `fps` that is not greater than 0. For the `punch` clip above, `clipIndex(punch, t, { unit: 'steps' })` gives frame 0 for steps 0 to 3, frame 1 for steps 4 to 6 and frame 2 from step 7 on, and `clipDuration` is 16.",
            "Todas lançam `RangeError` para um clipe vazio, ou para uma duração ou `fps` que não seja maior que 0. Para o clipe `punch` acima, `clipIndex(punch, t, { unit: 'steps' })` dá o quadro 0 nos passos 0 a 3, o quadro 1 nos passos 4 a 6 e o quadro 2 do passo 7 em diante, e `clipDuration` vale 16.",
          ),
        },
      ],
    },
    {
      id: 'animated-sprite',
      title: t('Playing a clip on an AnimatedSprite', 'Tocando um clipe em um AnimatedSprite'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'play(clip, options?)', type: 'void', description: t('Starts the clip. Every frame is shown through `setFrame` (size and anchor come from the frame). The events of the first frame fire right away, and `"complete"` fires when a play-once clip ends. `play()` with no argument keeps resuming the frame-array animation, as before. Throws when the clip names a frame and no atlas is available, or when `speed` is negative.', 'Inicia o clipe. Cada quadro é mostrado por `setFrame` (tamanho e âncora vêm do quadro). Os eventos do primeiro quadro disparam na hora, e `"complete"` dispara quando um clipe de uma vez termina. `play()` sem argumento continua retomando a animação por array de quadros, como antes. Lança erro quando o clipe cita um quadro e não há atlas disponível, ou quando `speed` é negativo.') },
            { name: 'stepClip()', type: 'void', description: t('Advances a `"steps"` clip by one step (times its `speed`). Call it once per simulation step. Does nothing when no clip is playing or the clip is in seconds.', 'Avança um clipe em `"steps"` por um passo (vezes o `speed`). Chame uma vez por passo da simulação. Não faz nada quando nenhum clipe está tocando ou o clipe é em segundos.') },
            { name: 'seek(clip, t, options?)', type: 'void', description: t('Shows the frame of `clip` at time `t` without playing: stateless, so the same `(clip, t)` always gives the same frame. It stops any auto advance. Fires events by the rule below.', 'Mostra o quadro de `clip` no tempo `t` sem tocar: sem estado, então o mesmo `(clip, t)` sempre dá o mesmo quadro. Para qualquer avanço automático. Dispara eventos pela regra abaixo.') },
            { name: 'atlas', type: 'TextureAtlas | null', description: t('Resolves string frame names. Also accepted by the constructor. A per-call `atlas` option overrides it.', 'Resolve nomes de quadros em texto. Também aceito pelo construtor. Uma opção `atlas` por chamada o substitui.') },
            { name: 'clipTime', type: 'number', readonly: true, description: t('Time elapsed in the current clip, in its unit (0 when no clip is set).', 'Tempo decorrido no clipe atual, na unidade dele (0 quando nenhum clipe está definido).') },
          ],
        },
        {
          type: 'props',
          title: t('ClipPlayOptions (seek takes the same, minus speed, plus events)', 'ClipPlayOptions (o seek aceita as mesmas, sem speed, com events)'),
          rows: [
            { name: 'unit', type: "'seconds' | 'steps'", default: "'seconds'", description: t('`"seconds"` clips advance in `update(dt)`, which the scene calls for you. `"steps"` clips advance **only** in `stepClip()`: the fixed-step simulation is in charge, and `update(dt)` leaves them alone.', 'Clipes em `"seconds"` avançam em `update(dt)`, que a cena chama por você. Clipes em `"steps"` avançam **só** em `stepClip()`: quem manda é a simulação de passo fixo, e o `update(dt)` os deixa em paz.') },
            { name: 'speed', type: 'number', default: '1', description: t('Time multiplier, 0 or more.', 'Multiplicador de tempo, 0 ou mais.') },
            { name: 'reverse', type: 'boolean', default: 'false', description: t('Play backwards.', 'Toca de trás para frente.') },
            { name: 'atlas', type: 'TextureAtlas', description: t('Atlas for this clip; falls back to `sprite.atlas`.', 'Atlas para este clipe; cai em `sprite.atlas`.') },
            { name: 'stepRate', type: 'number', default: '60', description: t('Steps per second, converts `fps` for `"steps"` clips.', 'Passos por segundo, converte `fps` em clipes `"steps"`.') },
            { name: 'events (seek only)', type: 'boolean', default: 'true', description: t('Set `false` to seek silently (rollback, replay scrubbing).', 'Use `false` para saltar em silêncio (rollback, navegação de replay).') },
          ],
        },
      ],
    },
    {
      id: 'events',
      title: t('The event rule', 'A regra dos eventos'),
      blocks: [
        {
          type: 'p',
          text: t(
            "An `AnimatedSprite` emits `\"clipEvent\"` with `{ name, frame, clip }`. Each event fires **once per frame entered**:",
            "Um `AnimatedSprite` emite `\"clipEvent\"` com `{ name, frame, clip }`. Cada evento dispara **uma vez por quadro alcançado**:",
          ),
        },
        {
          type: 'list',
          items: [
            t('`play` fires the events of the first frame right away.', '`play` dispara na hora os eventos do primeiro quadro.'),
            t('Advancing (`update` or `stepClip`) fires every frame crossed, in order, across loop wraps, so a long step never skips an event.', 'Avançar (`update` ou `stepClip`) dispara todo quadro atravessado, em ordem, atravessando voltas do laço, então um passo longo nunca pula um evento.'),
            t('`seek` forward fires every frame crossed, including the one landed on. Staying on the same frame, or moving backwards, fires nothing (and moving backwards re-arms the later frames). The first `seek` on a clip fires only the landing frame.', 'O `seek` para frente dispara todo quadro atravessado, incluindo o de chegada. Ficar no mesmo quadro, ou voltar, não dispara nada (e voltar rearma os quadros seguintes). O primeiro `seek` em um clipe dispara só o quadro de chegada.'),
            t('`events: false` makes a `seek` silent.', '`events: false` torna um `seek` silencioso.'),
          ],
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'clip-events.ts',
          check: 'compile',
          code: `import { AnimatedSprite, TextureAtlas, type Clip } from 'easy-game-maker'

const punch: Clip = { frames: ['punch_0', 'punch_1', 'punch_2'], durations: [4, 3, 9], loop: false, events: { 1: 'hit-active' } }

export function startPunch(sprite: AnimatedSprite, atlas: TextureAtlas, openHitbox: () => void): void {
  sprite.on<{ name: string }>('clipEvent', (e) => {
    if (e.name === 'hit-active') openHitbox()
  })
  sprite.play(punch, { unit: 'steps', atlas })
}

// In the fixed update, once per simulation step:
export function onStep(sprite: AnimatedSprite): void {
  sprite.stepClip()
}

// A renderer that rebuilds the picture from the simulation state: same step, same frame
export function draw(sprite: AnimatedSprite, atlas: TextureAtlas, moveFrame: number): void {
  sprite.seek(punch, moveFrame, { unit: 'steps', atlas, events: false })
}`,
        },
      ],
    },
    {
      id: 'tween',
      title: t('Tween milliseconds', 'Milissegundos no Tween'),
      blocks: [
        {
          type: 'callout',
          kind: 'warning',
          title: t('Tween.update takes milliseconds', 'Tween.update recebe milissegundos'),
          text: t(
            "The rest of the engine (`Scene.onUpdate`, timers, transitions, physics) uses seconds, but `Tween` works in milliseconds, and so does its `duration`. Passing the `dt` of `onUpdate` to `tween.update(dt)` moves the tween 1000 times too slowly. Use `tween.updateSeconds(dt)` when you have a `dt` in seconds. See [Tween](/animation/tween).",
            "O resto do motor (`Scene.onUpdate`, timers, transições, física) usa segundos, mas o `Tween` trabalha em milissegundos, e a `duration` dele também. Passar o `dt` do `onUpdate` a `tween.update(dt)` move o tween 1000 vezes devagar demais. Use `tween.updateSeconds(dt)` quando você tem um `dt` em segundos. Veja [Tween](/animation/tween).",
          ),
        },
      ],
    },
  ],
}

export default page
