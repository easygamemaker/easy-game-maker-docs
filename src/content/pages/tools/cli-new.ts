import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/cli/new',
  title: t('egm new', 'egm new'),
  description: t(
    'Create a new project: a code-first 2D game, a Visual Editor project or a 3D game.',
    'Crie um projeto novo: um jogo 2D code-first, um projeto do Editor Visual ou um jogo 3D.',
  ),
  source: 'src/cli/commands/new.ts',
  related: ['/project-structure', '/installation', '/cli/simulate', '/visual-editor', '/guide/2d-or-3d'],
  sections: [
    {
      id: 'usage',
      title: t('Usage', 'Uso'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm new <name>            # 2D, code-first
egm new <name> --visual   # 2D, Visual Editor project (alias -v)
egm new <name> --3d       # 3D project (alias -3)`,
        },
        {
          type: 'p',
          text: t(
            '`egm new` creates a folder called `<name>` in the current directory and writes the project into it. It does not run `npm install`: do that yourself, then start the simulator.',
            '`egm new` cria uma pasta chamada `<name>` no diretório atual e escreve o projeto dentro dela. Ele não roda `npm install`: faça isso você mesmo e depois inicie o simulador.',
          ),
        },
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm new my-game
cd my-game
npm install
egm simulate`,
        },
      ],
    },
    {
      id: 'options',
      title: t('Arguments and options', 'Argumentos e opções'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: '<name>', type: 'string', required: true, description: t('Folder and project name. The `package.json` name is the lower-cased name with spaces turned into hyphens.', 'Nome da pasta e do projeto. O nome no `package.json` é o nome em minúsculas, com espaços trocados por hífens.') },
            { name: '-v, --visual', type: 'boolean', default: 'false', description: t('Scaffold a Visual Editor project: views in `public/views`, event modules in `src/events`, `visualEditor: true` in the config.', 'Cria um projeto do Editor Visual: views em `public/views`, módulos de eventos em `src/events` e `visualEditor: true` na configuração.') },
            { name: '-3, --3d', type: 'boolean', default: 'false', description: t('Scaffold a 3D project on `easy-game-maker/3d`, with `mode: "3d"` and `three` pinned.', 'Cria um projeto 3D sobre `easy-game-maker/3d`, com `mode: "3d"` e o `three` fixado.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            '`--visual` and `--3d` cannot be combined: the command prints an error and exits with code 1. It also refuses to write into a directory that already exists.',
            '`--visual` e `--3d` não podem ser combinados: o comando imprime um erro e encerra com código 1. Ele também se recusa a escrever em um diretório que já existe.',
          ),
        },
      ],
    },
    {
      id: 'result',
      title: t('What you get', 'O que você recebe'),
      blocks: [
        {
          type: 'table',
          head: [t('Flavor', 'Variante'), t('Key files', 'Arquivos principais'), t('`dev` script', 'Script `dev`')],
          rows: [
            [t('Code-first 2D', '2D code-first'), t('`src/main.ts`, `src/scenes/GameScene.ts`, `egm.config.ts`', '`src/main.ts`, `src/scenes/GameScene.ts`, `egm.config.ts`'), t('`egm simulate`', '`egm simulate`')],
            [t('Visual 2D', '2D visual'), t('`src/main.ts`, `src/events/*.events.ts`, `public/views/*.view.json`', '`src/main.ts`, `src/events/*.events.ts`, `public/views/*.view.json`'), t('`egm editor` (plus a `simulate` script)', '`egm editor` (mais um script `simulate`)')],
            [t('3D', '3D'), t('`src/main.ts` calling `createGame`, `egm.config.ts` with `mode: "3d"`', '`src/main.ts` chamando `createGame`, `egm.config.ts` com `mode: "3d"`'), t('`egm simulate`', '`egm simulate`')],
          ],
        },
        {
          type: 'p',
          text: t(
            'All flavors also get `index.html`, `vite.config.ts`, `tsconfig.json` (strict, ES2022, bundler resolution) and a `.gitignore`. `package.json` depends on `easy-game-maker` `^0.2.0`, with `vite` `^6.4.3`, `vitest` and `happy-dom` as dev dependencies (and a `vitest.config.ts`), so `egm test` works right after `npm install`; the 3D flavor adds `three` `0.185.1` and `@types/three`. The `test` script runs `egm test`, and the `build` and `build:desktop` scripts both run `egm build desktop`. The Visual flavor creates `new App({ ..., physics: true })` so the physics bodies declared in the views exist, and its `tsconfig.json` adds `vite/client` types for `import.meta.glob`. The full tree is in [Project Structure](/project-structure).',
            'Todas as variantes também recebem `index.html`, `vite.config.ts`, `tsconfig.json` (strict, ES2022, resolução bundler) e um `.gitignore`. O `package.json` depende de `easy-game-maker` `^0.2.0`, com `vite` `^6.4.3`, `vitest` e `happy-dom` como dependências de desenvolvimento (e um `vitest.config.ts`), então o `egm test` funciona logo após o `npm install`; a variante 3D acrescenta `three` `0.185.1` e `@types/three`. O script `test` executa `egm test`, e os scripts `build` e `build:desktop` executam `egm build desktop`. A variante Visual cria `new App({ ..., physics: true })` para que os corpos de física declarados nas views existam, e o `tsconfig.json` dela acrescenta os tipos `vite/client` para o `import.meta.glob`. A árvore completa está em [Estrutura do Projeto](/project-structure).',
          ),
        },
        {
          type: 'p',
          text: t(
            'The 2D scene `egm new` writes is small on purpose. This is its shape, ready to replace with your own game:',
            'A cena 2D que o `egm new` escreve é pequena de propósito. Este é o formato dela, pronto para você trocar pelo seu jogo:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/scenes/GameScene.ts',
          code: `import { Scene, RectShape, Text } from 'easy-game-maker'
import type { SceneParams, App } from 'easy-game-maker'

export class GameScene extends Scene {
  override onCreate(params?: SceneParams): void {
    const app = params?.['app'] as App
    void app

    const bg = new RectShape({ width: 360, height: 640, fill: '#1a1a2e' })
    bg.anchorX = 0 // anchors are properties, not constructor options
    bg.anchorY = 0
    this.add(bg)

    const title = new Text({ text: 'my-game', x: 180, y: 280, fontSize: 28, color: '#4dabf7' })
    this.add(title)
  }

  override onUpdate(_dt: number): void {}
}`,
        },
      ],
    },
  ],
}

export default page
