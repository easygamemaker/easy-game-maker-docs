import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/fixed-step',
  title: t('Fixed Step, Time Scale and HitStop', 'Passo Fixo, Escala de Tempo e HitStop'),
  description: t(
    'Run the simulation at a fixed rate, slow it down, pause it, step it by hand and freeze it for a few frames after a hit: app.fixedUpdate, timeScale, paused, advance, FixedStepLoop and HitStop.',
    'Rode a simulação em uma taxa fixa, deixe-a lenta, pause, avance à mão e congele por alguns quadros depois de um golpe: app.fixedUpdate, timeScale, paused, advance, FixedStepLoop e HitStop.',
  ),
  badge: 'NEW',
  source: 'src/engine/core/FixedStepLoop.ts',
  related: ['/core/rng', '/core/app', '/core/scene', '/input/action-map', '/guide/recipes-2d', '/camera'],
  sections: [
    {
      id: 'why',
      title: t('Why a fixed step', 'Por que um passo fixo'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`Scene.onUpdate(dt)` runs once per rendered frame, and `dt` changes from frame to frame. That is fine for animation and UI, but a game whose rules must play out the same way every time (a fighting game, a replay, lockstep multiplayer, a golden test) needs the simulation to advance in equal steps, no matter how fast the screen refreshes. A fixed step turns the variable frame time into a whole number of equal steps: 60 steps per second on a 60 Hz screen, on a 144 Hz screen or when the browser stutters.",
            "`Scene.onUpdate(dt)` roda uma vez por quadro desenhado, e o `dt` muda de quadro para quadro. Isso serve para animação e interface, mas um jogo cujas regras precisam se repetir do mesmo jeito sempre (um jogo de luta, um replay, um multiplayer em lockstep, um teste de referência) exige que a simulação avance em passos iguais, não importa a velocidade com que a tela atualiza. O passo fixo transforma o tempo variável do quadro em um número inteiro de passos iguais: 60 passos por segundo em uma tela de 60 Hz (hertz), em uma de 144 Hz ou quando o navegador engasga.",
          ),
        },
        {
          type: 'p',
          text: t(
            "Everything here is opt-in. A game that never calls `fixedUpdate`, never sets `timeScale` or `paused` and defines no `onFixedUpdate` or `onRender` behaves exactly as before: with `timeScale` at 1 the `dt` reaches physics, timers, transitions and `onUpdate` untouched.",
            "Tudo aqui é opcional. Um jogo que nunca chama `fixedUpdate`, nunca mexe em `timeScale` ou `paused` e não define `onFixedUpdate` nem `onRender` se comporta exatamente como antes: com `timeScale` em 1, o `dt` chega intacto à física, aos timers, às transições e ao `onUpdate`.",
          ),
        },
      ],
    },
    {
      id: 'app-api',
      title: t('On the App', 'No App'),
      blocks: [
        {
          type: 'props',
          title: t('AppConfig (new fields)', 'AppConfig (campos novos)'),
          rows: [
            { name: 'fixedHz', type: 'number', default: '60', description: t('Rate in hertz of the scene fixed loop (`Scene.onFixedUpdate`, and the `alpha` given to `Scene.onRender`).', 'Taxa em hertz do laço fixo da cena (`Scene.onFixedUpdate`, e o `alpha` entregue a `Scene.onRender`).') },
            { name: 'maxFixedStepsPerFrame', type: 'number', default: '5', description: t('Most fixed steps one frame may run, for each loop. When more are due, the backlog is discarded, so a stalled tab cannot snowball into a spiral of death.', 'Máximo de passos fixos que um quadro pode rodar, em cada laço. Quando há mais pendentes, o excedente é descartado, para que uma aba parada não vire uma espiral da morte.') },
          ],
        },
        {
          type: 'props',
          title: t('App (new members)', 'App (membros novos)'),
          rows: [
            { name: 'fixedUpdate(hz, fn)', type: '(hz: number, fn: (step: number, dt: number) => void) => () => void', description: t('Registers a fixed step callback with its own rate. `fn` receives the zero based step index of this subscriber and the step length in seconds (`1 / hz`). Returns a function that unsubscribes. Subscribers run in registration order, and each one runs all of its due steps.', 'Registra um callback de passo fixo com taxa própria. O `fn` recebe o índice do passo (base zero) deste inscrito e a duração do passo em segundos (`1 / hz`). Devolve uma função que cancela a inscrição. Os inscritos rodam na ordem de registro, e cada um roda todos os seus passos pendentes.') },
            { name: 'timeScale', type: 'number', default: '1', description: t('Multiplier on game time. 1 leaves the frame untouched, 0 stops time, 0.25 is slow motion, 4 is fast forward. Negative or non finite values count as 0.', 'Multiplicador do tempo do jogo. 1 deixa o quadro intocado, 0 para o tempo, 0.25 é câmera lenta, 4 é avanço rápido. Valores negativos ou não finitos contam como 0.') },
            { name: 'paused', type: 'boolean', default: 'false', description: t('While true, fixed steps stop and the variable `dt` is 0. The scene still gets `onUpdate(0)` and is drawn, so a pause menu keeps working.', 'Enquanto for true, os passos fixos param e o `dt` variável vale 0. A cena ainda recebe `onUpdate(0)` e é desenhada, então um menu de pausa continua funcionando.') },
            { name: 'advance(steps?)', type: 'void', description: t('Runs `steps` whole fixed steps right now (default 1) for the scene loop and every `fixedUpdate` subscriber, regardless of `paused`, `timeScale` and elapsed time. No variable update and no render happen. For tests without a browser and frame by frame debugging.', 'Roda agora `steps` passos fixos inteiros (padrão 1) no laço da cena e em cada inscrito de `fixedUpdate`, sem depender de `paused`, `timeScale` nem do tempo decorrido. Não há atualização variável nem desenho. Serve para testes sem navegador e depuração quadro a quadro.') },
            { name: 'fixedAlpha', type: 'number', readonly: true, description: t('Interpolation factor of the scene loop, from 0 to 1. The same value `Scene.onRender` receives.', 'Fator de interpolação do laço da cena, de 0 a 1. O mesmo valor que `Scene.onRender` recebe.') },
            { name: 'fixedStepCount', type: 'number', readonly: true, description: t('Total steps run so far by the scene loop (it keeps counting across scene changes).', 'Total de passos já rodados pelo laço da cena (continua contando ao trocar de cena).') },
          ],
        },
        {
          type: 'p',
          text: t(
            "The scene loop and each `fixedUpdate` subscriber are independent accumulators. `fixedHz` configures only the scene loop; a subscriber picks its own `hz`. `fixedAlpha` and `onRender(alpha)` belong to the scene loop, so for a simulation you drive with `fixedUpdate` at a different rate, interpolate against the rate you chose with `FixedStepLoop` yourself (below) or keep both at the same `hz`.",
            "O laço da cena e cada inscrito de `fixedUpdate` são acumuladores independentes. O `fixedHz` configura só o laço da cena; um inscrito escolhe o próprio `hz`. O `fixedAlpha` e o `onRender(alpha)` pertencem ao laço da cena, então, para uma simulação conduzida por `fixedUpdate` em outra taxa, interpole com um `FixedStepLoop` seu (abaixo) ou mantenha os dois no mesmo `hz`.",
          ),
        },
      ],
    },
    {
      id: 'scene-hooks',
      title: t('Scene hooks', 'Hooks da cena'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'onFixedUpdate(step, dt)', type: 'void', description: t('Optional. Called zero or more times per frame at `fixedHz`, before `onUpdate`, only while the scene is the current one and only if you define it. `step` is the index on the App scene loop and `dt` is `1 / fixedHz`.', 'Opcional. Chamado zero ou mais vezes por quadro em `fixedHz`, antes do `onUpdate`, só enquanto a cena é a atual e só se você o definir. O `step` é o índice no laço da cena do App e o `dt` vale `1 / fixedHz`.') },
            { name: 'onRender(alpha)', type: 'void', description: t('Optional. Called once per frame after `onUpdate` and right before the draw. `alpha` is in [0, 1) and says how far the frame is between the last two fixed steps, so you can interpolate what is drawn.', 'Opcional. Chamado uma vez por quadro depois do `onUpdate` e logo antes do desenho. O `alpha` fica em [0, 1) e diz o quanto o quadro avançou entre os dois últimos passos fixos, para você interpolar o que é desenhado.') },
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Both are optional methods', 'Os dois são métodos opcionais'),
          text: t(
            "They are declared as optional members (`onFixedUpdate?`), not empty defaults, so a scene without them costs nothing. Write them with `override` like the other hooks.",
            "São declarados como membros opcionais (`onFixedUpdate?`), não como padrões vazios, então uma cena sem eles não custa nada. Escreva-os com `override`, como os outros hooks.",
          ),
        },
      ],
    },
    {
      id: 'frame-order',
      title: t('Frame order', 'Ordem do quadro'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('Input and gamepad polling (the `update` event of `app.input`, then `app.gamepad.update()`). An [ActionMap](/input/action-map) with the default `autoPoll` computes its edges here.', 'Leitura de entrada e gamepad (o evento `update` de `app.input`, depois `app.gamepad.update()`). Um [ActionMap](/input/action-map) com o `autoPoll` padrão calcula suas bordas aqui.'),
            t('Fixed steps: first `Scene.onFixedUpdate` on the scene loop, then every `app.fixedUpdate` subscriber in registration order. Each loop runs up to `maxFixedStepsPerFrame` steps.', 'Passos fixos: primeiro o `Scene.onFixedUpdate` no laço da cena, depois cada inscrito de `app.fixedUpdate` na ordem de registro. Cada laço roda até `maxFixedStepsPerFrame` passos.'),
            t('Variable update with `dt * timeScale` (0 when paused): physics (when `physics: true`), timers, transitions, `Scene.onUpdate`, then the built-in `AnimatedSprite` and `ParticleEmitter` updates.', 'Atualização variável com `dt * timeScale` (0 quando pausado): física (com `physics: true`), timers, transições, `Scene.onUpdate`, e depois as atualizações embutidas de `AnimatedSprite` e `ParticleEmitter`.'),
            t('`Scene.onRender(alpha)`, then the renderer draws.', '`Scene.onRender(alpha)`, e então o renderer desenha.'),
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Edges and zero steps', 'Bordas e zero passos'),
          text: t(
            "A frame can run zero fixed steps (a 144 Hz screen against a 60 Hz simulation) or several. An `ActionMap` that polls once per frame would then lose a press on a frame with no step, or show the same `pressed` in two steps of one frame. When the simulation is fixed, create the map with `autoPoll: false` and call `poll()` once per step. See the [ActionMap](/input/action-map) page.",
            "Um quadro pode rodar zero passos fixos (tela de 144 Hz contra simulação de 60 Hz) ou vários. Um `ActionMap` que consulta uma vez por quadro perderia um aperto no quadro sem passo, ou mostraria o mesmo `pressed` em dois passos do mesmo quadro. Com simulação fixa, crie o mapa com `autoPoll: false` e chame `poll()` uma vez por passo. Veja a página do [ActionMap](/input/action-map).",
          ),
        },
      ],
    },
    {
      id: 'time',
      title: t('Time scale, pause and stepping', 'Escala de tempo, pausa e avanço manual'),
      blocks: [
        {
          type: 'list',
          items: [
            t('`timeScale` multiplies the time given to the fixed loops, and (only when it is not 1) the `dt` given to physics, timers, transitions and `onUpdate`. Slow motion is `app.timeScale = 0.25`.', '`timeScale` multiplica o tempo entregue aos laços fixos e (só quando não é 1) o `dt` entregue à física, aos timers, às transições e ao `onUpdate`. Câmera lenta é `app.timeScale = 0.25`.'),
            t('`paused = true` stops the fixed steps and sets the variable `dt` to 0. The scene is still drawn and `onUpdate(0)` still runs.', '`paused = true` para os passos fixos e põe o `dt` variável em 0. A cena continua sendo desenhada e o `onUpdate(0)` continua rodando.'),
            t('`advance(n)` ignores both and runs `n` steps immediately. It does not move the accumulator, so `fixedAlpha` does not change.', '`advance(n)` ignora os dois e roda `n` passos na hora. Ele não mexe no acumulador, então o `fixedAlpha` não muda.'),
            t('`Camera` does not read `timeScale` or `paused` by itself: a shake advances with the `dt` you give to `camera.update(dt)`. Fed from `onUpdate(dt)` it follows the scaled time (and freezes on pause); fed a real frame time it keeps shaking while the game is paused. See [Camera](/camera).', 'A `Camera` não lê `timeScale` nem `paused` por conta própria: o tremor avança com o `dt` que você passa a `camera.update(dt)`. Alimentado pelo `onUpdate(dt)`, ele segue o tempo escalado (e congela na pausa); alimentado com o tempo real do quadro, continua tremendo com o jogo pausado. Veja [Camera](/camera).'),
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Fast forward needs a higher step cap', 'Avanço rápido pede um limite de passos maior'),
          text: t(
            "A frame never carries more than 0.1 s of time, and a loop never runs more than `maxFixedStepsPerFrame` steps. Roughly, steps per frame are `timeScale * dt * hz`. At 60 Hz and 60 frames per second, a `timeScale` above about 5 exceeds the default cap of 5, and the extra steps are dropped (the game runs slower than you asked). Raise `maxFixedStepsPerFrame` when you fast forward.",
            "Um quadro nunca carrega mais de 0,1 s de tempo, e um laço nunca roda mais de `maxFixedStepsPerFrame` passos. Em linhas gerais, os passos por quadro são `timeScale * dt * hz`. A 60 Hz e 60 quadros por segundo, um `timeScale` acima de uns 5 passa do limite padrão de 5, e os passos extras são descartados (o jogo roda mais devagar do que você pediu). Aumente `maxFixedStepsPerFrame` ao acelerar.",
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'time-controls.ts',
          check: 'compile',
          code: `import { App } from 'easy-game-maker'

const app = new App({ width: 640, height: 360, fixedHz: 60, maxFixedStepsPerFrame: 12 })

let simSteps = 0
const stop = app.fixedUpdate(60, (step, dt) => {
  simSteps = step + 1
  void dt // 1 / 60
})

app.timeScale = 0.25 // slow motion
app.paused = true // fixed steps stop, the variable dt becomes 0
app.advance(3) // three steps by hand, even while paused
app.paused = false
app.timeScale = 1

stop() // unsubscribe
console.log(simSteps, app.fixedStepCount)`,
        },
      ],
    },
    {
      id: 'fixed-step-loop',
      title: t('FixedStepLoop (no App needed)', 'FixedStepLoop (sem precisar do App)'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`FixedStepLoop` is the accumulator the App uses, as a pure class with no DOM, timers or `App` dependency. Use it in a test, on a server, or when you want your own interpolation. `tick(dt)` takes the frame time in seconds and returns how many steps to run now.",
            "`FixedStepLoop` é o acumulador que o App usa, como uma classe pura, sem DOM (Document Object Model), timers nem dependência do `App`. Use em um teste, em um servidor, ou quando quiser a sua própria interpolação. O `tick(dt)` recebe o tempo do quadro em segundos e devolve quantos passos rodar agora.",
          ),
        },
        {
          type: 'props',
          title: t('FixedStepLoopOptions', 'FixedStepLoopOptions'),
          rows: [
            { name: 'hz', type: 'number', default: '60', description: t('Steps per second. Must be positive and finite, otherwise the constructor throws `RangeError`.', 'Passos por segundo. Precisa ser positivo e finito, senão o construtor lança `RangeError`.') },
            { name: 'maxStepsPerFrame', type: 'number', default: '5', description: t('Most steps one `tick` may return (at least 1).', 'Máximo de passos que um `tick` pode devolver (no mínimo 1).') },
            { name: 'timeScale', type: 'number', default: '1', description: t('Multiplier on the delta given to `tick`.', 'Multiplicador do delta entregue ao `tick`.') },
            { name: 'paused', type: 'boolean', default: 'false', description: t('When true, `tick` returns 0 and the accumulator does not grow.', 'Quando true, `tick` devolve 0 e o acumulador não cresce.') },
          ],
        },
        {
          type: 'props',
          title: t('Members', 'Membros'),
          rows: [
            { name: 'tick(dtSeconds)', type: 'number', description: t('Feeds one frame delta and returns the steps to run. Negative or non finite deltas count as 0. When more than `maxStepsPerFrame` steps are due, the extra backlog is discarded and counted in `droppedSteps`.', 'Entrega o delta de um quadro e devolve os passos a rodar. Deltas negativos ou não finitos contam como 0. Quando mais de `maxStepsPerFrame` passos estão pendentes, o excedente é descartado e contado em `droppedSteps`.') },
            { name: 'advance(steps?)', type: 'number', description: t('Counts `steps` whole steps without touching the accumulator and returns the sanitised number. Works while paused.', 'Conta `steps` passos inteiros sem mexer no acumulador e devolve o número saneado. Funciona com a pausa ligada.') },
            { name: 'stepSeconds', type: 'number', readonly: true, description: t('Length of one step: `1 / hz`.', 'Duração de um passo: `1 / hz`.') },
            { name: 'alpha', type: 'number', readonly: true, description: t('How far the accumulator is into the next step, from 0 to 1.', 'O quanto o acumulador avançou rumo ao próximo passo, de 0 a 1.') },
            { name: 'stepCount / elapsed', type: 'number', readonly: true, description: t('Total steps handed out (by `tick` and `advance`), and the simulated seconds (`stepCount / hz`).', 'Total de passos entregues (por `tick` e `advance`) e os segundos simulados (`stepCount / hz`).') },
            { name: 'droppedSteps', type: 'number', readonly: true, description: t('Steps discarded by the spiral of death guard so far.', 'Passos descartados até agora pela proteção contra a espiral da morte.') },
            { name: 'reset()', type: 'void', description: t('Clears the accumulator, the step counter and the dropped counter.', 'Zera o acumulador, o contador de passos e o contador de descartados.') },
          ],
        },
        {
          type: 'p',
          text: t(
            "Rounding rule: time is accumulated in seconds, and a step runs when the accumulator reaches the step length minus one millionth of a step. That absorbs floating point error, so 144 frames of 1/144 s give exactly 60 steps at 60 Hz. Over a total time T the count is `floor(T * hz)`, give or take the step still held in the accumulator, whatever the frame pattern.",
            "Regra de arredondamento: o tempo é acumulado em segundos, e um passo roda quando o acumulador alcança a duração do passo menos um milionésimo de passo. Isso absorve o erro de ponto flutuante, então 144 quadros de 1/144 s dão exatamente 60 passos a 60 Hz. Em um tempo total T a contagem é `floor(T * hz)`, com a diferença de no máximo o passo ainda guardado no acumulador, seja qual for o padrão de quadros.",
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'fixed-step-loop.ts',
          check: 'compile',
          code: `import { FixedStepLoop } from 'easy-game-maker'

const loop = new FixedStepLoop({ hz: 60, maxStepsPerFrame: 5 })

function frame(frameDt: number, simulate: (stepSeconds: number) => void, draw: (alpha: number) => void): void {
  const steps = loop.tick(frameDt)
  for (let i = 0; i < steps; i++) simulate(loop.stepSeconds)
  draw(loop.alpha) // 0..1 between the last two steps
}

// 144 frames of 1/144 s are exactly 60 steps at 60 Hz
let ran = 0
for (let i = 0; i < 144; i++) frame(1 / 144, () => ran++, () => {})
console.log(ran) // 60`,
        },
      ],
    },
    {
      id: 'hit-stop',
      title: t('HitStop', 'HitStop'),
      blocks: [
        {
          type: 'p',
          text: t(
            "Hit stop (also called freeze frames) makes time stand still for a few fixed steps after an impact. `HitStop` only counts: the simulation decides what freezes, and rendering never freezes, so a camera shake or a flash can keep playing during the stop.",
            "O hit stop (também chamado de freeze frames) faz o tempo parar por alguns passos fixos depois de um impacto. O `HitStop` só conta: quem decide o que congela é a simulação, e o desenho nunca congela, então um tremor de câmera ou um flash continuam durante a parada.",
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'freeze(frames)', type: 'void', description: t('Freezes for `frames` fixed steps. If already frozen, the longer of the remaining and the new value wins (hits do not add up). Non positive or non finite values are ignored.', 'Congela por `frames` passos fixos. Se já estiver congelado, vale o maior entre o restante e o novo valor (os golpes não se somam). Valores não positivos ou não finitos são ignorados.') },
            { name: 'step()', type: 'boolean', description: t('Call once per fixed step. Returns true when this step is frozen (and uses one up), false when the simulation should run.', 'Chame uma vez por passo fixo. Devolve true quando este passo está congelado (e consome um), false quando a simulação deve rodar.') },
            { name: 'frozen / remaining', type: 'boolean / number', readonly: true, description: t('Whether steps are left, and how many.', 'Se ainda há passos congelados, e quantos.') },
            { name: 'clear()', type: 'void', description: t('Cancels a pending freeze.', 'Cancela um congelamento pendente.') },
          ],
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'hit-stop.ts',
          check: 'compile',
          code: `import { App, HitStop } from 'easy-game-maker'

interface Sim {
  step(): void
  hitLanded: boolean
}

export function runWithHitStop(app: App, sim: Sim): () => void {
  const hitStop = new HitStop()
  return app.fixedUpdate(60, () => {
    if (hitStop.step()) return // frozen: skip the whole simulation step
    sim.step()
    if (sim.hitLanded) hitStop.freeze(6) // six steps, one tenth of a second at 60 Hz
  })
}`,
        },
      ],
    },
  ],
}

export default page
