import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/cli/e2e',
  title: t('egm e2e', 'egm e2e'),
  description: t(
    'Run end-to-end tests that tap, drag and press keys in the real game, in a visual browser runner.',
    'Execute testes end-to-end (de ponta a ponta) que tocam, arrastam e pressionam teclas no jogo de verdade, em um executor visual no navegador.',
  ),
  source: 'src/cli/commands/e2e.ts',
  related: ['/tools/testing', '/simulator/devtools', '/cli/test', '/cli/simulate'],
  sections: [
    {
      id: 'usage',
      title: t('Usage', 'Uso'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm e2e                              # visual runner in the browser
egm e2e -f src/e2e/menu.e2e.ts       # a single file
egm e2e -p 3000                      # choose the Vite port
egm e2e --headless                   # only generate public/__e2e.html (tests NOT run, exit 1)
egm e2e --headless --json            # also write .egm-e2e-report.json (status "not-run")`,
        },
        {
          type: 'props',
          rows: [
            { name: '-H, --headless', type: 'boolean', default: 'false', description: t('Do not start Vite or open a browser. It only writes `public/__e2e.html`, prints that the tests were not executed and exits with code 1.', 'Não inicia o Vite nem abre um navegador. Só escreve `public/__e2e.html`, imprime que os testes não foram executados e encerra com código 1.') },
            { name: '-j, --json', type: 'boolean', default: 'false', description: t('With `--headless`, also writes `.egm-e2e-report.json` and prints it. The report says `"executed": false` and `"status": "not-run"`.', 'Junto com `--headless`, também escreve `.egm-e2e-report.json` e o imprime. O relatório traz `"executed": false` e `"status": "not-run"`.') },
            { name: '-f, --file <path>', type: 'string', description: t('Run one `.e2e.ts` file instead of discovering them all.', 'Executa um único arquivo `.e2e.ts` em vez de descobrir todos.') },
            { name: '-p, --port <number>', type: 'number', default: '5173', description: t('Port for the Vite dev server in visual mode. When omitted, the `port` found in `vite.config.ts` is used, else 5173.', 'Porta do servidor de desenvolvimento do Vite no modo visual. Quando omitida, usa a `port` encontrada no `vite.config.ts`, senão 5173.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Headless does not execute tests', 'O modo headless não executa os testes'),
          text: t(
            'Tests run in a real page, so only the visual mode runs them. `--headless` generates the runner page, states loudly that the tests were NOT executed and exits with code 1, so a CI job never reads "generated" as "passed". `--json` writes metadata (project, canvas size, the list of test files, the path of the HTML) marked `not-run`. Use [egm test](/cli/test) as the pass/fail gate in CI.',
            'Os testes rodam em uma página de verdade, então só o modo visual os executa. `--headless` gera a página do executor, avisa em voz alta que os testes NÃO foram executados e encerra com código 1, para que um job de CI nunca leia "gerado" como "passou". `--json` escreve metadados (projeto, tamanho do canvas, lista de arquivos de teste, caminho do HTML) marcados como `not-run`. Use o [egm test](/cli/test) como critério de aprovação no CI.',
          ),
        },
      ],
    },
    {
      id: 'discovery',
      title: t('Where tests live', 'Onde ficam os testes'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The command searches `src/e2e/` recursively for `*.e2e.ts` and `*.e2e.js`. With none, it prints "No E2E test files found in src/e2e/" and stops. Each file is bundled with esbuild (TypeScript stripped, relative imports resolved and inlined) and embedded in the generated page. If an import cannot be resolved, the command prints the file and the error and exits with code 1.',
            'O comando busca em `src/e2e/`, de forma recursiva, por `*.e2e.ts` e `*.e2e.js`. Sem nenhum, imprime "No E2E test files found in src/e2e/" e para. Cada arquivo é empacotado com o esbuild (TypeScript removido, imports relativos resolvidos e embutidos) e incluído na página gerada. Se um import não puder ser resolvido, o comando imprime o arquivo e o erro e encerra com código 1.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/e2e/menu.e2e.ts',
          check: 'skip',
          code: `import { test } from 'easy-game-maker/e2e'

test('Menu navigates to the level', async ({ game }) => {
  await game.wait(3000) // menu animation
  await game.screenshot('menu-ready')
  await game.tap(284, 240) // Play button, in game coordinates
  await game.expect.scene('level') // retries every 200 ms, up to 6 s
})`,
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'The runner replaces the `import { test } from "easy-game-maker/e2e"` line with its own `test` and provides it itself. That subpath is not published in the package, so your editor will not resolve it. Keep the import for readability and ignore the editor warning, or point a `paths` alias at your own declaration.',
            'O executor troca a linha `import { test } from "easy-game-maker/e2e"` pelo seu próprio `test` e o fornece por conta própria. Esse subcaminho não é publicado no pacote, então o seu editor não vai resolvê-lo. Mantenha o import por legibilidade e ignore o aviso do editor, ou aponte um alias em `paths` para uma declaração sua.',
          ),
        },
      ],
    },
    {
      id: 'fixture',
      title: t('The `game` fixture', 'A fixture `game`'),
      blocks: [
        {
          type: 'table',
          head: [t('Method', 'Método'), t('What it does', 'O que faz')],
          rows: [
            [t('`game.wait(ms)`', '`game.wait(ms)`'), t('Pauses for `ms` milliseconds.', 'Pausa por `ms` milissegundos.')],
            [t('`game.tap(x, y, { count })`', '`game.tap(x, y, { count })`'), t('A pointer tap at game coordinates, `count` times (default 1).', 'Um toque de ponteiro em coordenadas do jogo, `count` vezes (padrão 1).')],
            [t('`game.drag(x1, y1, x2, y2, { duration, steps })`', '`game.drag(x1, y1, x2, y2, { duration, steps })`'), t('A drag gesture. Defaults: 400 ms and 20 intermediate moves.', 'Um gesto de arrastar. Padrões: 400 ms e 20 movimentos intermediários.')],
            [t('`game.key(key, { hold })`', '`game.key(key, { hold })`'), t('Presses and releases a key, holding it `hold` ms (default 50).', 'Pressiona e solta uma tecla, segurando por `hold` ms (padrão 50).')],
            [t('`game.screenshot(name?)`', '`game.screenshot(name?)`'), t('Captures the canvas and returns a data URL.', 'Captura o canvas e devolve uma data URL.')],
            [t('`game.expect.scene(name, { timeout })`', '`game.expect.scene(name, { timeout })`'), t('Asserts the active scene name, retrying until `timeout` (default 6000 ms).', 'Confere o nome da cena ativa, tentando de novo até `timeout` (padrão 6000 ms).')],
            [t('`game.expect.state(fn, message?, { timeout })`', '`game.expect.state(fn, message?, { timeout })`'), t('Asserts a custom condition on `window`; `fn` returns `true` to pass.', 'Confere uma condição própria sobre a `window`; `fn` retorna `true` para passar.')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Repeated steps can become a helper. It can live in its own file, such as `src/e2e/helpers.ts`, and be imported with a relative path, because each `.e2e.ts` is bundled with its relative imports. Type the part of the fixture you use structurally, so the helper does not depend on the unpublished `easy-game-maker/e2e` import:',
            'Passos repetidos podem virar um auxiliar. Ele pode ficar em um arquivo próprio, como `src/e2e/helpers.ts`, e ser importado por caminho relativo, porque cada `.e2e.ts` é empacotado junto com os seus imports relativos. Tipe estruturalmente a parte da fixture que você usa, para que o auxiliar não dependa do import não publicado `easy-game-maker/e2e`:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/e2e/helpers.ts',
          code: `interface GameLike {
  wait(ms: number): Promise<void>
  tap(x: number, y: number): Promise<void>
  expect: { scene(name: string): Promise<void> }
}

/** From a fresh page to the first level. */
export async function startFirstLevel(game: GameLike): Promise<void> {
  await game.wait(3000)
  await game.tap(284, 240)
  await game.expect.scene('level')
}`,
        },
        {
          type: 'callout',
          kind: 'tip',
          text: t(
            'You do not have to write these by hand. The simulator can record your play session and generate the test file: see [DevTools](/simulator/devtools).',
            'Você não precisa escrever tudo isso à mão. O simulador pode gravar a sua sessão de jogo e gerar o arquivo de teste: veja [DevTools](/simulator/devtools).',
          ),
        },
      ],
    },
  ],
}

export default page
