import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/gameplay/state-machine',
  title: t('StateMachine', 'StateMachine'),
  description: t(
    'A small finite state machine with enter, update and exit hooks and guard-based automatic transitions.',
    'Uma máquina de estados finita pequena, com ganchos de entrada, update e saída e transições automáticas por condição.',
  ),
  source: 'src/engine/gameplay/StateMachine.ts',
  related: ['/gameplay/object-pool', '/core/scene', '/core/timer'],
  sections: [
    {
      id: 'overview',
      title: t('What it is', 'O que é'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`StateMachine<C>` models entity behaviour such as an enemy that is idle, chasing or attacking. You give it a context object `C` (the data your states read and write) and the name of the initial state, then register states with `addState`.",
            "`StateMachine<C>` modela o comportamento de uma entidade, como um inimigo que fica parado, persegue ou ataca. Você entrega um objeto de contexto `C` (os dados que os estados leem e escrevem) e o nome do estado inicial, e depois registra os estados com `addState`.",
          ),
        },
        {
          type: 'p',
          text: t(
            "It is a plain class: it does not attach itself to the game loop. Call `fsm.update(dt)` from your scene's `onUpdate`.",
            "É uma classe simples: ela não se conecta sozinha ao laço do jogo. Chame `fsm.update(dt)` no `onUpdate` da sua cena.",
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('Reference', 'Referência'),
      blocks: [
        {
          type: 'props',
          title: t('StateDefinition<C>', 'StateDefinition<C>'),
          rows: [
            { name: 'onEnter', type: '(context: C, fromState: string) => void', description: t('Runs once when the state becomes active.', 'Roda uma vez quando o estado se torna ativo.') },
            { name: 'onUpdate', type: '(context: C, dt: number) => void', description: t('Runs every `update` while the state is active.', 'Roda a cada `update` enquanto o estado está ativo.') },
            { name: 'onExit', type: '(context: C, toState: string) => void', description: t('Runs once when the state is left.', 'Roda uma vez quando o estado é deixado.') },
            { name: 'transitions', type: 'Array<{ to: string; when: (context: C) => boolean }>', description: t('Checked at the start of each `update`, before `onUpdate`. The first one whose `when` returns `true` wins.', 'Verificadas no início de cada `update`, antes do `onUpdate`. A primeira cujo `when` retorna `true` vence.') },
          ],
        },
        {
          type: 'props',
          title: t('StateMachine<C = void>', 'StateMachine<C = void>'),
          rows: [
            { name: 'new StateMachine(context, initialState)', type: 'constructor', description: t('Creates the machine. The initial state is entered (its `onEnter` runs) as soon as it is registered with `addState`, in any registration order.', 'Cria a máquina. O estado inicial é acessado (seu `onEnter` roda) assim que é registrado com `addState`, em qualquer ordem de registro.') },
            { name: 'addState(name, def): this', type: 'method', description: t('Registers a state. Chainable.', 'Registra um estado. Encadeável.') },
            { name: 'update(dt): void', type: 'method', description: t('Evaluates automatic transitions, then calls the active state\'s `onUpdate`.', 'Avalia as transições automáticas e depois chama o `onUpdate` do estado ativo.') },
            { name: 'transition(to): void', type: 'method', description: t('Forces a change, bypassing guards. No-op if already there; warns on an unknown name.', 'Força a mudança, ignorando as condições. Não faz nada se já está lá; avisa no console se o nome não existe.') },
            { name: 'current / previous', type: 'string', readonly: true, description: t('Active state and the one before it (`""` until the first transition).', 'Estado ativo e o anterior (`""` até a primeira transição).') },
            { name: 'context', type: 'C', readonly: true, description: t('The context object you passed in.', 'O objeto de contexto que você passou.') },
            { name: 'is(state) / was(state)', type: 'boolean', description: t('Compare against the current or previous state.', 'Comparam com o estado atual ou o anterior.') },
            { name: 'stateNames', type: 'string[]', readonly: true, description: t('All registered state names.', 'Todos os nomes de estado registrados.') },
            { name: 'onTransition', type: '((from, to) => void) | null', default: 'null', description: t('Callback fired after every change.', 'Callback disparado após cada mudança.') },
          ],
        },
      ],
    },
    {
      id: 'gotchas',
      title: t('Gotchas', 'Armadilhas'),
      blocks: [
        {
          type: 'callout',
          kind: 'info',
          title: t('Transitions from inside hooks are queued', 'Transições dentro dos ganchos entram na fila'),
          text: t(
            'A `transition()` call made from `onEnter` or `onExit` is queued and runs right after the current transition finishes, in order. The queue is bounded (100 hops), so two states that send each other on enter cannot freeze the frame. `onTransition` runs after the switch is complete, so a `transition()` there applies immediately.',
            'Uma chamada a `transition()` feita em `onEnter` ou `onExit` entra na fila e roda logo depois de a transição atual terminar, em ordem. A fila é limitada (100 saltos), então dois estados que se mandam um para o outro ao entrar não travam o quadro. O `onTransition` roda depois de a troca estar completa, então um `transition()` ali vale na hora.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('One hop per update', 'Um salto por update'),
          text: t(
            'Automatic transitions are evaluated once per `update`, so a chain of true guards advances one state per frame.',
            'As transições automáticas são avaliadas uma vez por `update`, então uma cadeia de condições verdadeiras avança um estado por quadro.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('An enemy brain', 'O cérebro de um inimigo'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/enemy.ts',
          check: 'compile',
          code: `import { StateMachine } from 'easy-game-maker'

interface EnemyContext {
  x: number
  playerX: number
  speed: number
  attackTimer: number
}

export function createEnemyBrain(): StateMachine<EnemyContext> {
  const ctx: EnemyContext = { x: 0, playerX: 200, speed: 0, attackTimer: 0 }
  const dist = (c: EnemyContext): number => Math.abs(c.playerX - c.x)

  const fsm = new StateMachine<EnemyContext>(ctx, 'idle')

  fsm
    .addState('idle', {
      onEnter: (c) => {
        c.speed = 0
      },
      transitions: [{ to: 'chase', when: (c) => dist(c) < 150 }],
    })
    .addState('chase', {
      onEnter: (c) => {
        c.speed = 80
      },
      onUpdate: (c, dt) => {
        c.x += Math.sign(c.playerX - c.x) * c.speed * dt
      },
      transitions: [
        { to: 'attack', when: (c) => dist(c) < 20 },
        { to: 'idle', when: (c) => dist(c) > 300 },
      ],
    })
    .addState('attack', {
      onEnter: (c) => {
        c.attackTimer = 0
      },
      onUpdate: (c, dt) => {
        c.attackTimer += dt
      },
      transitions: [{ to: 'chase', when: (c) => c.attackTimer > 1 }],
    })

  fsm.onTransition = (from, to) => console.log(from, '->', to)
  return fsm
}

// In a scene: const brain = createEnemyBrain(); ... brain.update(dt)`,
        },
      ],
    },
  ],
}

export default page
