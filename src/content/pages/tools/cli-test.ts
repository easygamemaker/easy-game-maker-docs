import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/cli/test',
  title: t('egm test', 'egm test'),
  description: t(
    'Run your Vitest suite and get a formatted report with the right exit code for CI.',
    'Execute a sua suíte do Vitest e receba um relatório formatado, com o código de saída certo para CI (Continuous Integration, integração contínua).',
  ),
  source: 'src/cli/commands/test.ts',
  related: ['/tools/testing', '/cli/e2e', '/workflow', '/guide/troubleshooting'],
  sections: [
    {
      id: 'usage',
      title: t('Usage', 'Uso'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm test`,
        },
        {
          type: 'p',
          text: t(
            '`egm test` takes no options. It is a thin, friendlier wrapper over Vitest: it runs `vitest run --reporter=json` in the current project, hides Vitest\'s own output behind a spinner and prints its own report.',
            '`egm test` não tem opções. É um invólucro fino e mais amigável sobre o Vitest: executa `vitest run --reporter=json` no projeto atual, esconde a saída do próprio Vitest atrás de um spinner e imprime o seu próprio relatório.',
          ),
        },
      ],
    },
    {
      id: 'how',
      title: t('What it does', 'O que ele faz'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('Reads the project name and canvas size from `egm.config.ts` for the report header (defaults are used when the file is missing).', 'Lê o nome do projeto e o tamanho do canvas do `egm.config.ts` para o cabeçalho do relatório (usa valores padrão se o arquivo não existir).'),
            t('Picks the runner from your lock file: `pnpm` when `pnpm-lock.yaml` exists, `yarn` when `yarn.lock` exists, `npx` otherwise.', 'Escolhe o executor pelo arquivo de lock: `pnpm` quando existe `pnpm-lock.yaml`, `yarn` quando existe `yarn.lock` e `npx` nos demais casos.'),
            t('Runs `vitest run --reporter=json --outputFile=.egm-test-result.json`, then reads and deletes that file.', 'Executa `vitest run --reporter=json --outputFile=.egm-test-result.json`, depois lê e apaga esse arquivo.'),
            t('Prints a per-file report with test names, durations, failure messages and a PASSED or FAILED summary.', 'Imprime um relatório por arquivo, com nomes de testes, durações, mensagens de falha e um resumo PASSED ou FAILED.'),
            t('Exits with code 0 when every test passed and 1 otherwise, so CI can gate on it.', 'Encerra com código 0 quando todos os testes passaram e 1 caso contrário, para que o CI possa usá-lo como critério.'),
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Vitest comes with new projects', 'O Vitest vem nos projetos novos'),
          text: t(
            '`egm new` adds `vitest`, `happy-dom` and a `vitest.config.ts` (with `environment: "happy-dom"`), so `egm test` works after `npm install`. In a project created before that, when `vitest` is not in `node_modules`, `egm test` prints how to install it (`npm install -D vitest happy-dom`) and exits 1 without running anything. See [Testing](/tools/testing).',
            'O `egm new` adiciona `vitest`, `happy-dom` e um `vitest.config.ts` (com `environment: "happy-dom"`), então o `egm test` funciona após o `npm install`. Em um projeto criado antes disso, quando o `vitest` não está em `node_modules`, o `egm test` mostra como instalá-lo (`npm install -D vitest happy-dom`) e encerra com 1 sem executar nada. Veja [Testes](/tools/testing).',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('A test-friendly scene', 'Uma cena fácil de testar'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Keep game rules in plain functions or in a scene you can step by hand. A scene needs no renderer to run `onCreate` and `onUpdate`, so a test can build it, step a few frames and read the state. The helper below does the stepping:',
            'Mantenha as regras do jogo em funções simples ou em uma cena que você consegue avançar à mão. Uma cena não precisa de renderizador para rodar `onCreate` e `onUpdate`, então um teste pode construí-la, avançar alguns quadros e ler o estado. O auxiliar abaixo faz o avanço:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/__tests__/stepScene.ts',
          code: `import type { Scene, SceneParams } from 'easy-game-maker'

const FRAME = 1 / 60

/** Build a scene and step it \`frames\` times. Errors name the frame that crashed. */
export async function runScene(
  SceneClass: new () => Scene,
  params: SceneParams = {},
  frames = 60,
): Promise<Scene> {
  const scene = new SceneClass()
  await Promise.resolve(scene.onCreate(params))
  for (let i = 0; i < frames; i++) {
    try {
      scene.onUpdate(FRAME)
    } catch (error) {
      throw new Error(\`Scene crashed on frame \${i + 1}: \${String(error)}\`)
    }
  }
  return scene
}`,
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/__tests__/scene.test.ts',
          check: 'skip',
          code: `import { describe, expect, it } from 'vitest'
import { GameScene } from '../scenes/GameScene'
import { runScene } from './stepScene'

describe('GameScene', () => {
  it('survives one second of updates', async () => {
    const scene = await runScene(GameScene, {}, 60)
    expect(scene.children.length).toBeGreaterThan(0)
  })
})`,
        },
        {
          type: 'p',
          text: t(
            'Scenes that use `app.input`, `app.audio` or physics need those pieces stubbed, and `happy-dom` provides the browser globals. Both are covered in [Testing](/tools/testing).',
            'Cenas que usam `app.input`, `app.audio` ou física precisam desses componentes simulados, e o `happy-dom` fornece os globais do navegador. Os dois casos estão em [Testes](/tools/testing).',
          ),
        },
      ],
    },
  ],
}

export default page
