import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/project-structure',
  title: t('Project Structure', 'Estrutura do Projeto'),
  description: t(
    'The folders and files `egm new` creates for code-first, Visual Editor and 3D projects, and what each one is for.',
    'As pastas e os arquivos que o `egm new` cria para projetos code-first, do Editor Visual e 3D, e para que serve cada um.',
  ),
  source: 'src/cli/commands/new.ts',
  related: ['/cli/new', '/tools/config', '/visual-editor', '/workflow'],
  sections: [
    {
      id: 'code-first',
      title: t('Code-first project (2D)', 'Projeto code-first (2D)'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`egm new my-game` writes this layout. Scenes are TypeScript classes, and the game is wired in `src/main.ts`.',
            '`egm new my-game` escreve esta organização. As cenas são classes TypeScript, e o jogo é ligado em `src/main.ts`.',
          ),
        },
        {
          type: 'code',
          lang: 'text',
          check: 'skip',
          code: `my-game/
├── src/
│   ├── main.ts               entry point (createApp)
│   ├── scenes/
│   │   └── GameScene.ts      your first scene
│   └── assets/
│       ├── images/
│       └── sounds/
├── public/                   static files served as-is
├── index.html                loads /src/main.ts
├── egm.config.ts             project config
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
├── package.json
└── .gitignore`,
        },
        {
          type: 'p',
          text: t(
            'The scaffolded `package.json` depends on `easy-game-maker` (`^0.2.0`), with `vite`, `vitest` and `happy-dom` as dev dependencies, and defines the scripts `dev` (`egm simulate`), `test` (`egm test`), `build` and `build:desktop` (both `egm build desktop`). A `vitest.config.ts` sits next to `vite.config.ts`.',
            'O `package.json` gerado depende de `easy-game-maker` (`^0.2.0`), com `vite`, `vitest` e `happy-dom` como dependências de desenvolvimento, e define os scripts `dev` (`egm simulate`), `test` (`egm test`), `build` e `build:desktop` (ambos `egm build desktop`). Um `vitest.config.ts` fica ao lado do `vite.config.ts`.',
          ),
        },
      ],
    },
    {
      id: 'visual',
      title: t('Visual Editor project', 'Projeto do Editor Visual'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`egm new my-game --visual` swaps the scene classes for data. Each scene is a JSON view in `public/views/` plus an events module in `src/events/`. `egm.config.ts` gets `visualEditor: true` and the `dev` script runs `egm editor`.',
            '`egm new my-game --visual` troca as classes de cena por dados. Cada cena é uma view JSON (JavaScript Object Notation) em `public/views/` mais um módulo de eventos em `src/events/`. O `egm.config.ts` recebe `visualEditor: true` e o script `dev` executa `egm editor`.',
          ),
        },
        {
          type: 'code',
          lang: 'text',
          check: 'skip',
          code: `my-game/
├── src/
│   ├── main.ts                       registers every events file as a scene
│   └── events/
│       ├── MenuScene.events.ts
│       └── GameScene.events.ts
├── public/
│   ├── views/
│   │   ├── MenuScene.view.json       objects, positions, colors
│   │   └── GameScene.view.json
│   └── assets/
└── egm.config.ts                     visualEditor: true`,
        },
        {
          type: 'p',
          text: t(
            'The events file is where the logic lives. Objects from the view are reached by their `id` with `scene.getById`.',
            'O arquivo de eventos é onde fica a lógica. Os objetos da view são acessados pelo `id` com `scene.getById`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/events/MenuScene.events.ts',
          code: `import type { App, SceneEvents, Text, VisualScene } from 'easy-game-maker'

export default {
  onInit(scene: VisualScene, _app: App) {
    const title = scene.getById<Text>('title')
    if (title) title.text = 'Ready'
  },

  onUpdate(_scene: VisualScene, _app: App, _dt: number) {
    // per-frame logic, dt in seconds
  },
} satisfies SceneEvents`,
        },
        {
          type: 'p',
          text: t(
            'See [Visual Editor Workflow](/visual-editor) for the editor itself.',
            'Veja o [Workflow do Editor Visual](/visual-editor) para conhecer o editor.',
          ),
        },
      ],
    },
    {
      id: 'three-d',
      title: t('3D project', 'Projeto 3D'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`egm new my-game --3d` (or `-3`) writes a much smaller `src`: a single `main.ts` that calls `createGame`. `egm.config.ts` sets `mode: "3d"` and a landscape 1280 by 720 display, and `package.json` adds `three` 0.185.1 and `@types/three`. `--visual` and `--3d` cannot be combined.',
            '`egm new my-game --3d` (ou `-3`) escreve um `src` bem menor: um único `main.ts` que chama `createGame`. O `egm.config.ts` define `mode: "3d"` e uma tela paisagem de 1280 por 720, e o `package.json` acrescenta `three` 0.185.1 e `@types/three`. `--visual` e `--3d` não podem ser combinados.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          code: `import { createGame, lights, models } from 'easy-game-maker/3d'

const game = createGame({ background: '#101827', cameraPosition: [0, 3, 8] })

lights.daylight(game.scene)
game.add(models.ground(40))

const hero = models.character()
game.add(hero)

game.onUpdate((dt, elapsed) => {
  hero.rotation.y += dt
  hero.userData.animate?.(elapsed, 1)
})`,
        },
      ],
    },
    {
      id: 'generated-files',
      title: t('Files the CLI generates and removes', 'Arquivos que a CLI gera e remove'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Some commands write temporary pages into `public/` so Vite can serve them, and clean them up when they stop (`egm e2e --headless` leaves `__e2e.html` in place for you to open). Do not commit them and do not edit them by hand.',
            'Alguns comandos escrevem páginas temporárias em `public/` para que o Vite as sirva, e as removem ao encerrar (`egm e2e --headless` deixa o `__e2e.html` no lugar para você abrir). Não as versione e não as edite à mão.',
          ),
        },
        {
          type: 'table',
          head: [t('File', 'Arquivo'), t('Written by', 'Escrito por'), t('Purpose', 'Finalidade')],
          rows: [
            [t('`public/__simulator.html`', '`public/__simulator.html`'), t('`egm simulate`, `egm editor`', '`egm simulate`, `egm editor`'), t('Simulator shell around your game.', 'Casca do simulador em volta do jogo.')],
            [t('`public/__go.html`', '`public/__go.html`'), t('`egm simulate`', '`egm simulate`'), t('Handshake page that EgmGO scans.', 'Página de handshake que o EgmGO lê.')],
            [t('`public/__editor.html`', '`public/__editor.html`'), t('`egm editor`', '`egm editor`'), t('The visual editor page.', 'A página do editor visual.')],
            [t('`public/__e2e.html`', '`public/__e2e.html`'), t('`egm e2e`', '`egm e2e`'), t('The E2E (end-to-end) runner page.', 'A página do executor E2E (end-to-end, ponta a ponta).')],
            [t('`dist/desktop/`', '`dist/desktop/`'), t('`egm build desktop`', '`egm build desktop`'), t('Build output.', 'Saída do build.')],
          ],
        },
      ],
    },
  ],
}

export default page
