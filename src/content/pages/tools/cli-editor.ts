import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/cli/editor',
  title: t('egm editor', 'egm editor'),
  badge: 'BETA',
  description: t(
    'Open the EGM editor: a scene editor for Visual Editor projects and a code editor for every project.',
    'Abra o editor do EGM: um editor de cenas para projetos do Editor Visual e um editor de código para qualquer projeto.',
  ),
  source: 'src/cli/commands/editor.ts',
  related: ['/visual-editor', '/cli/new', '/project-structure', '/cli/simulate'],
  sections: [
    {
      id: 'usage',
      title: t('Usage', 'Uso'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm editor              # http://localhost:5174/__editor.html
egm edit -p 4000        # alias, custom port`,
        },
        {
          type: 'props',
          rows: [
            { name: '-p, --port <number>', type: 'number', default: '5174', description: t('Port of the Vite dev server that hosts the editor page and the game preview.', 'Porta do servidor de desenvolvimento do Vite que hospeda a página do editor e a prévia do jogo.') },
          ],
        },
        {
          type: 'p',
          text: t(
            '`edit` is an alias. The command must run inside a game project with `egm.config.ts` and installed dependencies (it uses the project\'s own Vite, like `egm simulate`). It is a beta: expect rough edges.',
            '`edit` é um apelido. O comando precisa rodar dentro de um projeto de jogo com `egm.config.ts` e dependências instaladas (ele usa o Vite do próprio projeto, como o `egm simulate`). É uma versão beta: espere arestas.',
          ),
        },
      ],
    },
    {
      id: 'modes',
      title: t('Three modes, chosen by the config', 'Três modos, escolhidos pela configuração'),
      blocks: [
        {
          type: 'table',
          head: [t('Config', 'Configuração'), t('Header shows', 'O cabeçalho mostra'), t('What you get', 'O que você recebe')],
          rows: [
            [t('`visualEditor: true`', '`visualEditor: true`'), t('Visual Editor', 'Visual Editor'), t('Scenes list, object tree, drag-and-drop viewport, inspector, add-object palette, undo and redo, plus the code editor.', 'Lista de cenas, árvore de objetos, viewport com arrastar e soltar, inspetor, paleta para adicionar objetos, desfazer e refazer, além do editor de código.')],
            [t('no `visualEditor`', 'sem `visualEditor`'), t('Code-Only', 'Code-Only'), t('A file explorer and a Monaco code editor. A dialog explains how to turn the visual editor on.', 'Um explorador de arquivos e um editor de código Monaco. Um diálogo explica como ativar o editor visual.')],
            [t('`mode: "3d"`', '`mode: "3d"`'), t('3D', '3D'), t('Same page in code-only shape: 3D games have no scene files to edit visually.', 'A mesma página no formato somente código: jogos 3D não têm arquivos de cena para editar visualmente.')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Both `visualEditor` and `mode` are read from `egm.config.ts` with regular expressions, so write them as literals: `visualEditor: true` and `mode: "3d"`.',
            'Tanto `visualEditor` quanto `mode` são lidos do `egm.config.ts` com expressões regulares, então escreva-os como literais: `visualEditor: true` e `mode: "3d"`.',
          ),
        },
      ],
    },
    {
      id: 'what-it-runs',
      title: t('What it starts', 'O que ele inicia'),
      blocks: [
        {
          type: 'list',
          items: [
            t('A small file server (port 5175 preferred, then up to the next five) that lets the editor list, read, save, rename and delete project files and scenes.', 'Um pequeno servidor de arquivos (porta 5175 de preferência, depois até as cinco seguintes) que permite ao editor listar, ler, salvar, renomear e apagar arquivos e cenas do projeto.'),
            t('The project\'s Vite on the chosen port, serving `public/__editor.html` and `public/__simulator.html` (the latter powers the Execute button).', 'O Vite do projeto na porta escolhida, servindo `public/__editor.html` e `public/__simulator.html` (este último alimenta o botão Execute).'),
            t('Your default browser, opened on the editor page. Ctrl+C stops everything and removes the two temporary pages.', 'O seu navegador padrão, aberto na página do editor. Ctrl+C encerra tudo e remove as duas páginas temporárias.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'Edits are written to your project files: scene layouts to `public/views/<Scene>.view.json`, logic to `src/events/<Scene>.events.ts`. Commit them like any other source.',
            'As edições são gravadas nos arquivos do projeto: layouts de cena em `public/views/<Cena>.view.json`, lógica em `src/events/<Cena>.events.ts`. Versione-os como qualquer outro código.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('The file server is local and token-protected', 'O servidor de arquivos é local e protegido por token'),
          text: t(
            'The editor\'s file server reads and writes files inside the project folder, so it is locked down. It listens on `127.0.0.1` only (other devices on your network cannot reach it), requires a random per-session token sent in the `X-Egm-Token` header, and answers CORS (Cross-Origin Resource Sharing) only for `localhost` and `127.0.0.1` origins. Open the editor with the URL that `egm editor` prints: it carries the token in the fragment (`#token=...`). Opening the editor page without the token shows the file server as unavailable. Stop the command when you are done.',
            'O servidor de arquivos do editor lê e grava arquivos dentro da pasta do projeto, então ele é trancado. Escuta somente em `127.0.0.1` (outros dispositivos da sua rede não o alcançam), exige um token aleatório por sessão enviado no cabeçalho `X-Egm-Token` e responde a CORS (Cross-Origin Resource Sharing, compartilhamento de recursos entre origens) apenas para origens `localhost` e `127.0.0.1`. Abra o editor pela URL que o `egm editor` imprime: ela leva o token no fragmento (`#token=...`). Abrir a página do editor sem o token mostra o servidor de arquivos como indisponível. Encerre o comando quando terminar.',
          ),
        },
      ],
    },
    {
      id: 'events-module',
      title: t('The code side of a scene', 'O lado de código de uma cena'),
      blocks: [
        {
          type: 'p',
          text: t(
            'In a Visual Editor project each scene has an events module. The **Events** tab and the Files panel open it in the code editor. This is the same module you would write by hand:',
            'Em um projeto do Editor Visual, cada cena tem um módulo de eventos. A aba **Events** e o painel de arquivos o abrem no editor de código. É o mesmo módulo que você escreveria à mão:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/events/GameScene.events.ts',
          code: `import type { App, SceneEvents, Sprite, VisualScene } from 'easy-game-maker'

export default {
  onUpdate(scene: VisualScene, app: App, dt: number) {
    const player = scene.getById<Sprite>('player')
    if (!player) return
    if (app.input.isKeyDown('ArrowRight')) player.x += 200 * dt
    if (app.input.isKeyDown('ArrowLeft')) player.x -= 200 * dt
  },
} satisfies SceneEvents`,
        },
      ],
    },
  ],
}

export default page
