import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/state',
  title: t('state', 'state'),
  description: t(
    'The part of a game that is not 3D: state machines, score and storage, timers, tickers, cooldowns, difficulty and events.',
    'A parte de um jogo que não é 3D: máquinas de estado, pontuação e armazenamento, timers, tickers, cooldowns, dificuldade e eventos.',
  ),
  source: 'easy-game-maker/src/engine3d/state.ts',
  related: ['/3d/engine', '/3d/hud', '/3d/game-shape', '/3d/probe'],
  sections: [
    {
      id: 'overview',
      title: t('What is in the module', 'O que há no módulo'),
      blocks: [
        {
          type: 'p',
          text: t(
            'What the game is doing, what the player has, and what survives a reload. It is the part most likely to end up as a tangle of booleans (`isPlaying`, `isPaused`, `isGameOver`, three of which can be true at once). All of these are flat exports.',
            'O que o jogo está fazendo, o que o jogador tem e o que sobrevive a um reload. É a parte com mais chance de virar um emaranhado de booleanos (`isPlaying`, `isPaused`, `isGameOver`, três dos quais podem ser verdadeiros ao mesmo tempo). Todos esses são exports soltos.',
          ),
        },
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`createStateMachine`', '`createStateMachine`'), t('`createStateMachine(states, initial?, engine?) => machine`', '`createStateMachine(states, initial?, engine?) => machine`'), t('One named state instead of four booleans. `states` is `{ playing: { enter, update, exit }, over: { ... } }`; `enter`/`exit` receive `(payload, machine)` and `update` receives `(dt, machine)`. With an `engine` it updates itself; without one call `machine.update(dt)`.', 'Um estado nomeado em vez de quatro booleanos. `states` é `{ playing: { enter, update, exit }, over: { ... } }`; `enter`/`exit` recebem `(payload, machine)` e `update` recebe `(dt, machine)`. Com uma `engine` ele se atualiza sozinho; sem uma, chame `machine.update(dt)`.')],
            [t('`createScore`', '`createScore`'), t('`createScore({ key = "best", initial = 0, hud, label = "Score" }) => score`', '`createScore({ key = "best", initial = 0, hud, label = "Score" }) => score`'), t('Keeps a high score in `localStorage`. Give each game its own `key`. With a `hud` it creates a `Score` stat and a `Best` stat at top-right.', 'Guarda a maior pontuação no `localStorage`. Dê a cada jogo a sua própria `key`. Com um `hud`, cria um stat `Score` e um stat `Best` no canto superior direito.')],
            [t('`createStorage`', '`createStorage`'), t('`createStorage(namespace = "game") => storage`', '`createStorage(namespace = "game") => storage`'), t('A namespaced corner of `localStorage` that never throws, so a private window still plays.', 'Um canto do `localStorage` com namespace que nunca lança erro, então uma janela privada ainda joga.')],
            [t('`createTimer`', '`createTimer`'), t('`createTimer({ duration, hud, label = "Time", onEnd, format }) => timer`', '`createTimer({ duration, hud, label = "Time", onEnd, format }) => timer`'), t('A countdown (with `duration`) or a count-up (without). Runs from creation, pausable, driven by the frame delta you feed it.', 'Uma contagem regressiva (com `duration`) ou progressiva (sem). Roda desde a criação, pode ser pausado e é guiado pelo delta do quadro que você fornece.')],
            [t('`createTicker`', '`createTicker`'), t('`createTicker(interval, callback) => ticker`', '`createTicker(interval, callback) => ticker`'), t('Fires the right number of times whatever the framerate (spawns, ticking damage), including more than once in a slow frame; capped at 8 firings per update.', 'Dispara o número certo de vezes seja qual for o framerate (spawns, dano contínuo), inclusive mais de uma vez em um quadro lento; limitado a 8 disparos por update.')],
            [t('`createCooldown`', '`createCooldown`'), t('`createCooldown(seconds) => cooldown`', '`createCooldown(seconds) => cooldown`'), t('`if (gun.ready()) { fire(); gun.use() }`.', '`if (gun.ready()) { fire(); gun.use() }`.')],
            [t('`createDifficulty`', '`createDifficulty`'), t('`createDifficulty({ rampSeconds = 90, curve, max = 1 }) => difficulty`', '`createDifficulty({ rampSeconds = 90, curve, max = 1 }) => difficulty`'), t('Maps elapsed time onto a 0..1 curve you can multiply anything by, so spawn rates do not stay flat. Default `curve` is `t ** 0.7`.', 'Mapeia o tempo decorrido em uma curva 0..1 pela qual você pode multiplicar qualquer coisa, para a taxa de spawn não ficar constante. O `curve` padrão é `t ** 0.7`.')],
            [t('`createEvents`', '`createEvents`'), t('`createEvents() => events`', '`createEvents() => events`'), t('The smallest useful event bus: decouples "a thing happened" from "react".', 'O menor barramento de eventos útil: separa "algo aconteceu" de "reagir".')],
            [t('`formatTime`', '`formatTime`'), t('`formatTime(seconds) => string`', '`formatTime(seconds) => string`'), t('83.4 seconds as `"1:23"`.', '83.4 segundos como `"1:23"`.')],
          ],
        },
      ],
    },
    {
      id: 'members',
      title: t('Members', 'Membros'),
      blocks: [
        {
          type: 'list',
          items: [
            t('**Machine**: `go(name, payload?)` runs the current state\'s `exit`, then the new state\'s `enter`, then emits `"change"` (`name, previous`). Re-entering the current state does nothing, so calling `go` from an update is safe. An unknown name throws `Error("No such state: ...")`. Also `current` (name or `null`), `time` (seconds in the state), `is(name)`, `on(event, handler)`, `update(dt)` and `dispose()`. If `initial` is given the machine enters it at creation.', '**Machine**: `go(name, payload?)` executa o `exit` do estado atual, depois o `enter` do novo, e então emite `"change"` (`name, previous`). Reentrar no estado atual não faz nada, então chamar `go` dentro de um update é seguro. Um nome desconhecido lança `Error("No such state: ...")`. Há também `current` (nome ou `null`), `time` (segundos no estado), `is(name)`, `on(event, handler)`, `update(dt)` e `dispose()`. Se `initial` for informado, a máquina entra nele na criação.'),
            t('**Score**: `value`, `best`, `add(amount = 1)`, `set(next)`, `reset()` (does not touch `best`), `on("change" | "best", handler)`.', '**Score**: `value`, `best`, `add(amount = 1)`, `set(next)`, `reset()` (não mexe no `best`), `on("change" | "best", handler)`.'),
            t('**Storage**: `get(key, fallback?)` (`null` if missing and no fallback), `set(key, value)` (JSON, returns the value), `remove(key)`, `clear()` (only this namespace).', '**Storage**: `get(key, fallback?)` (`null` se não existir e sem fallback), `set(key, value)` (JSON, devolve o valor), `remove(key)`, `clear()` (só este namespace).'),
            t('**Timer**: `time`, `done`, `start()`, `pause()`, `reset(to?)`, `add(seconds)`, `update(dt)`. `onEnd` fires once when a countdown reaches 0. `format` defaults to `formatTime`.', '**Timer**: `time`, `done`, `start()`, `pause()`, `reset(to?)`, `add(seconds)`, `update(dt)`. O `onEnd` dispara uma vez quando a contagem regressiva chega a 0. O `format` padrão é `formatTime`.'),
            t('**Ticker**: `interval` (read on every update, so it can change), `update(dt)`, `reset()`.', '**Ticker**: `interval` (lido a cada update, então pode mudar), `update(dt)`, `reset()`.'),
            t('**Cooldown**: `remaining`, `progress` (0..1, for a HUD bar), `ready()`, `use()`, `update(dt)`.', '**Cooldown**: `remaining`, `progress` (0..1, para uma barra de HUD), `ready()`, `use()`, `update(dt)`.'),
            t('**Difficulty**: `level` (0 at the start, `max` once fully ramped; read it every frame), `between(from, to)`, `update(dt)`, `reset()`.', '**Difficulty**: `level` (0 no início, `max` quando a rampa termina; leia a cada quadro), `between(from, to)`, `update(dt)`, `reset()`.'),
            t('**Events**: `on(event, handler)` and `once(event, handler)` return an unsubscribe; `emit(event, ...args)`; `off(event)` drops every listener of that event.', '**Events**: `on(event, handler)` e `once(event, handler)` devolvem uma função para cancelar; `emit(event, ...args)`; `off(event)` remove todos os listeners daquele evento.'),
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Only the state machine self-updates', 'Só a máquina de estados se atualiza sozinha'),
          text: t(
            'The score, timer, ticker, cooldown and difficulty objects are plain: none of them registers with the engine. Call their `update(dt)` from your own `game.onUpdate`. The state machine is the exception when you pass it the engine.',
            'Os objetos de score, timer, ticker, cooldown e difficulty são simples: nenhum deles se registra na engine. Chame o `update(dt)` de cada um no seu próprio `game.onUpdate`. A máquina de estados é a exceção quando você passa a engine a ela.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: a round with states', 'Exemplo: uma rodada com estados'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import {
  createCooldown,
  createDifficulty,
  createGame,
  createScore,
  createStateMachine,
  createTicker,
  createTimer,
  formatTime,
  lights,
  models,
} from 'easy-game-maker/3d';

const game = createGame({ background: '#0b1020' });
lights.daylight(game.scene);
game.add(models.ground(60));

const score = createScore({ key: 'state-demo-best', hud: game.hud });
const difficulty = createDifficulty({ rampSeconds: 60 });
const gun = createCooldown(0.4);
let spawned = 0;
const spawner = createTicker(2, () => {
  spawned += 1;
  score.add(Math.round(1 + difficulty.level * 4));
});

const timer = createTimer({
  duration: 30,
  hud: game.hud,
  label: 'Time',
  onEnd: () => machine.go('over', { reason: 'time' }),
});

const machine = createStateMachine(
  {
    playing: {
      enter: () => {
        score.reset();
        timer.reset(30);
        timer.start();
      },
      update: (dt) => {
        timer.update(dt);
        difficulty.update(dt);
        spawner.interval = Math.max(0.4, 2 - difficulty.level * 1.5);
        spawner.update(dt);
        gun.update(dt);
        if (game.input.pressed('fire') && gun.ready()) gun.use();
      },
    },
    over: {
      enter: (payload) => {
        const info = payload as { reason: string };
        game.hud.banner(\`Game over (\${info.reason}) \${formatTime(timer.time)}\`);
      },
      update: () => {
        if (game.input.pressed('restart')) machine.go('playing');
      },
    },
  },
  'playing',
  game,
);

machine.on('change', (name, previous) => console.log(previous, '->', name, 'spawned', spawned));
game.probe.register('round', () => ({ state: machine.current, score: score.value, best: score.best }));
`,
        },
        {
          type: 'p',
          text: t(
            'Two small behavior notes: `createCooldown(0)` gives a `NaN` `progress` (it divides by the cooldown length), and `createStateMachine`\'s `go("constructor")` does not throw, because state names are looked up on a plain object.',
            'Duas notas de comportamento: `createCooldown(0)` dá um `progress` `NaN` (ele divide pela duração do cooldown), e o `go("constructor")` da `createStateMachine` não lança erro, porque os nomes de estado são procurados em um objeto simples.',
          ),
        },
        {
          type: 'p',
          text: t(
            'Exported types: `StateMachine`, `StateDef`, `Score`, `ScoreOptions`, `GameStorage`, `Timer`, `TimerOptions`, `Ticker`, `Cooldown`, `Difficulty`, `DifficultyOptions`, `Events` and `EventHandler` (a listener; it may narrow its arguments).',
            'Tipos exportados: `StateMachine`, `StateDef`, `Score`, `ScoreOptions`, `GameStorage`, `Timer`, `TimerOptions`, `Ticker`, `Cooldown`, `Difficulty`, `DifficultyOptions`, `Events` e `EventHandler` (um listener; ele pode estreitar seus argumentos).',
          ),
        },
      ],
    },
  ],
}

export default page
