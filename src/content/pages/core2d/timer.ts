import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/timer',
  title: t('TimerManager', 'TimerManager'),
  description: t(
    'Delayed and repeating callbacks driven by game time (seconds), with cancellable handles.',
    'Callbacks atrasados e repetidos guiados pelo tempo de jogo (segundos), com handles canceláveis.',
  ),
  source: 'src/engine/core/Timer.ts',
  related: ['/core/app', '/animation/tween', '/gameplay/state-machine'],
  sections: [
    {
      id: 'api',
      title: t('Methods', 'Métodos'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`app.timers` is a `TimerManager`. The frame loop calls `update(dt)` with the same seconds used by scenes, so timers follow the game clock, not wall-clock time. Both creators return a `TimerHandle` with a `cancel()` method.',
            '`app.timers` é um `TimerManager`. O laço de quadros chama `update(dt)` com os mesmos segundos usados pelas cenas, então os timers seguem o relógio do jogo, não o relógio real. Ambos os criadores retornam um `TimerHandle` com o método `cancel()`.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'after(delaySeconds, callback)', type: 'TimerHandle', description: t('Runs the callback once after the delay.', 'Executa o callback uma vez após o atraso.') },
            { name: 'every(intervalSeconds, callback, options?)', type: 'TimerHandle', description: t('Runs the callback repeatedly. `options.iterations` limits the count; the default is unlimited. An interval that is not greater than 0 is ignored with a console warning.', 'Executa o callback repetidamente. `options.iterations` limita a contagem; o padrão é ilimitado. Um intervalo que não seja maior que 0 é ignorado, com um aviso no console.') },
            { name: 'update(dtSeconds)', type: 'void', description: t('Advances all timers. Called by `App`; call it yourself only if you run your own `TimerManager`.', 'Avança todos os timers. Chamado pelo `App`; chame você mesmo apenas se rodar seu próprio `TimerManager`.') },
            { name: 'cancelAll()', type: 'void', description: t('Cancels and drops every timer.', 'Cancela e descarta todos os timers.') },
          ],
        },
      ],
    },
    {
      id: 'behavior',
      title: t('Behavior details', 'Detalhes de comportamento'),
      blocks: [
        {
          type: 'list',
          items: [
            t('If a frame is long enough to cover several intervals, an `every` callback fires several times in that frame to catch up (the frame delta is already capped at 0.1 s by `App`).', 'Se um quadro for longo o bastante para cobrir vários intervalos, o callback de `every` dispara várias vezes nesse quadro para compensar (o delta do quadro já é limitado a 0,1 s pelo `App`).'),
            t('A timer that finishes or is cancelled is removed at the end of the update pass.', 'Um timer que termina ou é cancelado é removido ao fim da passagem de atualização.'),
            t('Timers are global to the app, not tied to a scene. Cancel the ones you no longer need when a scene pauses or is destroyed.', 'Timers são globais ao app, não presos a uma cena. Cancele os que não precisa mais quando uma cena pausar ou for destruída.'),
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Zero and negative intervals are ignored', 'Intervalos zero e negativos são ignorados'),
          text: t(
            '`every(0, ...)`, a negative interval or `NaN` would make the catch-up loop run forever, so `every` logs a warning and returns a handle that does nothing. Use a positive interval. To run something once on the next frame, use `after(0, ...)`.',
            '`every(0, ...)`, um intervalo negativo ou `NaN` faria o laço de compensação rodar para sempre, então `every` registra um aviso e devolve um handle que não faz nada. Use um intervalo positivo. Para rodar algo uma vez no próximo quadro, use `after(0, ...)`.',
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
          filename: 'src/timers.ts',
          check: 'compile',
          code: `import { App } from 'easy-game-maker'
import type { TimerHandle } from 'easy-game-maker'

export function startWaves(app: App, spawn: (wave: number) => void): TimerHandle {
  let wave = 0

  app.timers.after(2, () => console.log('Get ready'))

  const waves = app.timers.every(
    5,
    () => {
      wave += 1
      spawn(wave)
    },
    { iterations: 10 },
  )

  // Abort the whole sequence early, for example when the player dies.
  app.timers.after(30, () => waves.cancel())
  return waves
}`,
        },
      ],
    },
  ],
}

export default page
