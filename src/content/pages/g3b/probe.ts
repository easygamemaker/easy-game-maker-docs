import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/probe',
  title: t('probe', 'probe'),
  description: t(
    'A registry of named state readers, so a page or a browser test can ask a running game what is going on.',
    'Um registro de leitores de estado nomeados, para que uma página ou um teste de navegador possa perguntar a um jogo em execução o que está acontecendo.',
  ),
  source: 'src/engine3d/probe.ts',
  related: ['/3d/engine', '/3d/debug', '/3d/postfx', '/3d/state'],
  sections: [
    {
      id: 'overview',
      title: t('Watching a running game', 'Observando um jogo em execução'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`createProbe()` is a registry of named state readers, so a page (or a browser test driving it) can ask a running game what is going on without reaching into its variables. `createGame` makes one for you as `game.probe` and publishes it on the page as `window.__EGM_GAME__`.',
            '`createProbe()` é um registro de leitores de estado nomeados, para que uma página (ou um teste de navegador que a controla) pergunte a um jogo em execução o que está acontecendo sem mexer nas variáveis dele. O `createGame` cria um para você como `game.probe` e o publica na página como `window.__EGM_GAME__`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Exposing state from the game', 'Expondo estado a partir do jogo'),
          code: `import { createGame, models, lights } from 'easy-game-maker/3d'

const game = createGame()
lights.daylight(game.scene)
const player = game.add(models.character())
let hp = 80

const unregister = game.probe.register('player', () => ({ x: player.position.x, hp }))

game.onUpdate((dt) => {
  player.position.x += game.input.move.x * 6 * dt
})

console.log(game.probe.snapshot()) // { player: { x: 0, hp: 80 } }
console.log(game.probe.names()) // ['player']
void unregister`,
        },
      ],
    },
    {
      id: 'api',
      title: t('The registry', 'O registro'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`createProbe`', '`createProbe`'), t('`createProbe() => Probe`', '`createProbe() => Probe`'), t('A standalone registry, for a game that does not use `createGame`.', 'Um registro avulso, para um jogo que não usa `createGame`.')],
            [t('`probe.register`', '`probe.register`'), t('`register(name, read) => unregister`', '`register(name, read) => unregister`'), t('Registers a reader (`() => unknown`) that runs only when a snapshot is taken. A repeated name replaces the old reader. The returned function removes only the reader this call registered; a newer one under the same name stays.', 'Registra um leitor (`() => unknown`) que só roda quando um snapshot é tirado. Um nome repetido substitui o leitor antigo. A função devolvida remove apenas o leitor que esta chamada registrou; um mais novo com o mesmo nome permanece.')],
            [t('`probe.snapshot`', '`probe.snapshot`'), t('`snapshot() => Record<string, unknown>`', '`snapshot() => Record<string, unknown>`'), t('Reads every registered value. A reader that throws becomes `{ error: "..." }` instead of failing the snapshot.', 'Lê todos os valores registrados. Um leitor que lança vira `{ error: "..." }` em vez de derrubar o snapshot.')],
            [t('`probe.names`', '`probe.names`'), t('`names() => string[]`', '`names() => string[]`'), t('The registered names.', 'Os nomes registrados.')],
          ],
        },
      ],
    },
    {
      id: 'window',
      title: t('window.__EGM_GAME__', 'window.__EGM_GAME__'),
      blocks: [
        {
          type: 'props',
          title: t('GameProbeHandle', 'GameProbeHandle'),
          rows: [
            { name: 'frames', type: 'number', readonly: true, description: t('How many frames the loop has run (the engine\'s own counter, one per live frame). It stands still while paused.', 'Quantos quadros o loop rodou (o contador da própria engine, um por quadro vivo). Fica parado enquanto pausado.') },
            { name: 'probe', type: '() => Record<string, unknown>', description: t('The same as `game.probe.snapshot()`.', 'O mesmo que `game.probe.snapshot()`.') },
          ],
        },
        {
          type: 'p',
          text: t(
            '`game.engine.dispose()` removes the entry, unless a newer game has already replaced it. `window.__EGM_3D__` is a separate flag, `true` once any engine has been created (and not cleared by `dispose`), and it is what marks a page as a 3D game.',
            '`game.engine.dispose()` remove a entrada, a menos que um jogo mais novo já a tenha substituído. `window.__EGM_3D__` é uma flag separada, `true` assim que qualquer engine é criada (e não é limpa por `dispose`), e é ela que marca uma página como jogo 3D.',
          ),
        },
      ],
    },
    {
      id: 'testing',
      title: t('Driving it from a browser test', 'Controlando a partir de um teste de navegador'),
      blocks: [
        {
          type: 'p',
          text: t(
            'An outside observer (a browser test, a screenshot tool) can poll `window.__EGM_GAME__.frames` to know the game is running and read `window.__EGM_GAME__.probe()` for the state the game chose to expose. Register what matters in the game\'s own code; register cheap readers, since they run on demand.',
            'Um observador externo (um teste de navegador, uma ferramenta de captura) pode consultar `window.__EGM_GAME__.frames` para saber que o jogo está rodando e ler `window.__EGM_GAME__.probe()` para obter o estado que o jogo escolheu expor. Registre o que importa no código do próprio jogo; registre leitores baratos, já que rodam sob demanda.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Waiting for frames and reading the probe', 'Esperando quadros e lendo o probe'),
          code: `export async function waitForGame(): Promise<Record<string, unknown>> {
  const handle = () => window.__EGM_GAME__
  while (!handle() || handle()!.frames < 10) {
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
  return handle()!.probe()
}`,
          setup: `import 'easy-game-maker/3d'`,
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'The probe is plain JavaScript state, so it works even where post-processing is skipped or WebGL output is hard to inspect. Prefer asserting on probe values over comparing pixels.',
            'O probe é estado JavaScript comum, então funciona mesmo onde o pós-processamento é pulado ou a saída WebGL é difícil de inspecionar. Prefira verificar valores do probe a comparar pixels.',
          ),
        },
      ],
    },
  ],
}

export default page
