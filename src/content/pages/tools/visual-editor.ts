import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/visual-editor',
  title: t('Visual Editor Workflow', 'Workflow do Editor Visual'),
  badge: 'NEW',
  description: t(
    'Lay out 2D scenes visually and write their logic in TypeScript: how views, events and the editor fit together.',
    'Monte cenas 2D visualmente e escreva a lógica em TypeScript: como views, eventos e o editor se encaixam.',
  ),
  source: 'src/engine/scene/ViewLoader.ts',
  related: ['/cli/editor', '/cli/new', '/project-structure', '/core/visual-scene', '/tools/config'],
  sections: [
    {
      id: 'idea',
      title: t('The idea', 'A ideia'),
      blocks: [
        {
          type: 'p',
          text: t(
            'In a Visual Editor project a scene is two files. The **view** (`public/views/<Scene>.view.json`) says what is on the screen and where. The **events** module (`src/events/<Scene>.events.ts`) says what happens. The editor edits the first visually and opens the second in a code editor, so designers and programmers work on the same scene without stepping on each other.',
            'Em um projeto do Editor Visual, uma cena são dois arquivos. A **view** (`public/views/<Cena>.view.json`) diz o que está na tela e onde. O módulo de **eventos** (`src/events/<Cena>.events.ts`) diz o que acontece. O editor edita a primeira visualmente e abre o segundo em um editor de código, então quem desenha e quem programa trabalham na mesma cena sem se atrapalhar.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'The Visual Editor is for 2D projects and is a beta. 3D games are code-first: see [egm editor](/cli/editor) for what the editor does in a 3D project.',
            'O Editor Visual é para projetos 2D e está em beta. Jogos 3D são code-first: veja [egm editor](/cli/editor) para saber o que o editor faz em um projeto 3D.',
          ),
        },
      ],
    },
    {
      id: 'workflow',
      title: t('The workflow', 'O fluxo de trabalho'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('Create the project: `egm new my-game --visual`, then `npm install`. `egm.config.ts` gets `visualEditor: true`.', 'Crie o projeto: `egm new my-game --visual` e depois `npm install`. O `egm.config.ts` recebe `visualEditor: true`.'),
            t('Open the editor with `egm editor` (or `npm run dev`, which runs it). The project starts with `MenuScene` and `GameScene`.', 'Abra o editor com `egm editor` (ou `npm run dev`, que o executa). O projeto começa com `MenuScene` e `GameScene`.'),
            t('In the **Visual** tab, add objects from the palette (Rect, Circle, Text, Group, Sprite, Anim, Line, Particles), drag them in the viewport and set their properties in the inspector. Undo and redo are in the toolbar.', 'Na aba **Visual**, adicione objetos pela paleta (Rect, Circle, Text, Group, Sprite, Anim, Line, Particles), arraste-os no viewport e ajuste as propriedades no inspetor. Desfazer e refazer ficam na barra de ferramentas.'),
            t('Give objects an `id` you will use from code. Name scenes and objects for what they are.', 'Dê aos objetos um `id` que você usará no código. Nomeie cenas e objetos pelo que são.'),
            t('Switch to the **Events** tab to write the logic in `src/events/<Scene>.events.ts`.', 'Mude para a aba **Events** para escrever a lógica em `src/events/<Cena>.events.ts`.'),
            t('Press **Execute** to run the game from the editor, or run `egm simulate` in another terminal to use the device presets.', 'Aperte **Execute** para rodar o jogo dentro do editor, ou rode `egm simulate` em outro terminal para usar os presets de dispositivo.'),
          ],
        },
      ],
    },
    {
      id: 'view-json',
      title: t('What a view contains', 'O que uma view contém'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A view is a flat list of objects. `parent` builds the hierarchy (the parent must be a `Group`). `type` is the class name: `RectShape`, `CircleShape`, `Text`, `Sprite`, `AnimatedSprite`, `LineShape`, `ParticleEmitter` or `Group`. Any object can carry a `physics` block. The editor writes this file, but it is plain JSON and you can also write or generate one, typed with `ViewJson`:',
            'Uma view é uma lista plana de objetos. `parent` monta a hierarquia (o pai precisa ser um `Group`). `type` é o nome da classe: `RectShape`, `CircleShape`, `Text`, `Sprite`, `AnimatedSprite`, `LineShape`, `ParticleEmitter` ou `Group`. Qualquer objeto pode ter um bloco `physics`. O editor escreve este arquivo, mas ele é JSON puro e você também pode escrever ou gerar um, tipado com `ViewJson`:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'a view, typed',
          code: `import type { ViewJson } from 'easy-game-maker'

export const menuView: ViewJson = {
  name: 'MenuScene',
  version: 1,
  width: 360,
  height: 640,
  objects: [
    { id: 'background', type: 'RectShape', x: 0, y: 0, width: 360, height: 640, anchorX: 0, anchorY: 0, fill: '#1a1a2e', zIndex: 0 },
    { id: 'title', type: 'Text', x: 180, y: 280, text: 'Star Catch', fontSize: 28, color: '#4dabf7', zIndex: 1 },
    { id: 'floor', type: 'RectShape', x: 180, y: 620, width: 360, height: 40, fill: '#495057', physics: { type: 'static', shape: 'rect' } },
  ],
}`,
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Physics needs the app world', 'A física precisa do mundo do app'),
          text: t(
            'Objects with a `physics` block are added to `app.physics`, which the app only steps when created with `new App({ ..., physics: true })`. The `main.ts` that `egm new --visual` writes already sets `physics: true`. In a project created before that, add it yourself.',
            'Objetos com um bloco `physics` são adicionados a `app.physics`, que o app só avança quando criado com `new App({ ..., physics: true })`. O `main.ts` que o `egm new --visual` escreve já define `physics: true`. Em um projeto criado antes disso, acrescente você mesmo.',
          ),
        },
      ],
    },
    {
      id: 'events',
      title: t('Events: the logic', 'Eventos: a lógica'),
      blocks: [
        {
          type: 'p',
          text: t(
            'An events module default-exports an object with optional hooks `onInit`, `onUpdate`, `onResume` and `onDestroy`, each receiving the `VisualScene`, the `App` and (for updates) `dt`. Use `scene.getById<T>(id)` to reach an object from the view. `satisfies SceneEvents` gives you checking without losing the exact type.',
            'Um módulo de eventos exporta por padrão um objeto com os ganchos opcionais `onInit`, `onUpdate`, `onResume` e `onDestroy`, cada um recebendo a `VisualScene`, o `App` e (nas atualizações) o `dt`. Use `scene.getById<T>(id)` para alcançar um objeto da view. `satisfies SceneEvents` dá verificação sem perder o tipo exato.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/events/GameScene.events.ts',
          code: `import type { App, CircleShape, SceneEvents, Text, VisualScene } from 'easy-game-maker'

let score = 0

export default {
  onInit(scene: VisualScene, _app: App) {
    score = 0
    const label = scene.getById<Text>('score')
    if (label) label.text = 'Score: 0'
  },

  onUpdate(scene: VisualScene, app: App, dt: number) {
    const ball = scene.getById<CircleShape>('ball')
    const label = scene.getById<Text>('score')
    if (!ball || !label) return

    ball.y += 160 * dt
    if (ball.y > 640) {
      ball.y = 0
      ball.x = 40 + Math.random() * 280
    }
    if (app.input.pointer.isDown && Math.hypot(app.input.pointer.x - ball.x, app.input.pointer.y - ball.y) < ball.radius) {
      score += 1
      label.text = \`Score: \${score}\`
      ball.y = 0
    }
  },
} satisfies SceneEvents`,
        },
        {
          type: 'p',
          text: t(
            '`main.ts` wires every `*.events.ts` file to the scene of the same name with `import.meta.glob` and `app.scenes.addVisual`, so adding a scene in the editor needs no change to `main.ts`. Navigate with `app.goto("GameScene")`, which is `app.scenes.go`.',
            'O `main.ts` liga cada arquivo `*.events.ts` à cena de mesmo nome com `import.meta.glob` e `app.scenes.addVisual`, então adicionar uma cena no editor não exige mudar o `main.ts`. Navegue com `app.goto("GameScene")`, que é o `app.scenes.go`.',
          ),
        },
      ],
    },
    {
      id: 'tips',
      title: t('Tips and limits', 'Dicas e limites'),
      blocks: [
        {
          type: 'list',
          items: [
            t('Commit `public/views/*.view.json` and `src/events/*.events.ts`. Both are source.', 'Versione `public/views/*.view.json` e `src/events/*.events.ts`. Os dois são código-fonte.'),
            t('A view is fetched at runtime from `/views/<Scene>.view.json`, so it must live under `public/`. If it cannot be loaded, the scene starts empty and logs a warning.', 'Uma view é buscada em tempo de execução em `/views/<Cena>.view.json`, então precisa ficar em `public/`. Se não puder ser carregada, a cena começa vazia e registra um aviso.'),
            t('Scenes are cached like any other scene: `onInit` runs once. Reset state in `onResume` if a scene can be revisited.', 'As cenas ficam em cache como qualquer outra: `onInit` roda uma vez. Reinicie o estado em `onResume` se a cena puder ser revisitada.'),
            t('The editor\'s file server listens on `127.0.0.1` only and requires a per-session token, so open the editor with the URL that `egm editor` prints (the token is in `#token=...`). Without it the editor shows the file server as unavailable. See [egm editor](/cli/editor).', 'O servidor de arquivos do editor escuta somente em `127.0.0.1` e exige um token por sessão, então abra o editor pela URL que o `egm editor` imprime (o token vai em `#token=...`). Sem ele, o editor mostra o servidor de arquivos como indisponível. Veja [egm editor](/cli/editor).'),
          ],
        },
      ],
    },
  ],
}

export default page
