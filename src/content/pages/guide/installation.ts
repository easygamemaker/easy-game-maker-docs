import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/installation',
  title: t('Installation', 'Instalação'),
  description: t(
    'Install the egm command, create a project and check what each build target needs on your machine.',
    'Instale o comando egm, crie um projeto e confira o que cada alvo de build exige na sua máquina.',
  ),
  source: 'README.md',
  related: ['/first-game', '/project-structure', '/cli/new', '/build/desktop'],
  sections: [
    {
      id: 'requirements',
      title: t('Requirements', 'Requisitos'),
      blocks: [
        {
          type: 'p',
          text: t(
            'You need Node.js 18 or newer (the package declares `engines.node >= 18`) and a package manager. A modern browser with WebGL2 is enough to run and test the game.',
            'Você precisa do Node.js 18 ou mais novo (o pacote declara `engines.node >= 18`) e de um gerenciador de pacotes. Um navegador moderno com WebGL2 basta para executar e testar o jogo.',
          ),
        },
        {
          type: 'p',
          text: t(
            'Nothing else is needed until you package the game. Desktop builds add their own toolchain, listed below.',
            'Nada mais é necessário até você empacotar o jogo. Os builds desktop acrescentam a própria cadeia de ferramentas, listada abaixo.',
          ),
        },
      ],
    },
    {
      id: 'install-cli',
      title: t('Install the CLI', 'Instale a CLI'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `npm install -g easy-game-maker
egm --version`,
        },
        {
          type: 'p',
          text: t(
            '`egm --version` prints the version read from the package, `0.2.0` for this documentation. The same package is what your game imports, so the project you create depends on `easy-game-maker` too (scaffolded as `^0.2.0`).',
            '`egm --version` imprime a versão lida do pacote, `0.2.0` nesta documentação. O mesmo pacote é o que o seu jogo importa, então o projeto criado também depende de `easy-game-maker` (gerado como `^0.2.0`).',
          ),
        },
      ],
    },
    {
      id: 'create-project',
      title: t('Create and run a project', 'Crie e execute um projeto'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm new my-game
cd my-game
npm install
egm simulate`,
        },
        {
          type: 'p',
          text: t(
            'Add `--3d` to `egm new` for a 3D project (it also installs `three` 0.185.1) or `--visual` for a Visual Editor project. `egm simulate` refuses to start when `egm.config.ts` or `node_modules` is missing, so run `npm install` first.',
            'Adicione `--3d` ao `egm new` para um projeto 3D (que também instala o `three` 0.185.1) ou `--visual` para um projeto do Editor Visual. `egm simulate` se recusa a iniciar quando falta o `egm.config.ts` ou o `node_modules`, então rode `npm install` antes.',
          ),
        },
        {
          type: 'p',
          text: t(
            'Every project is described by `egm.config.ts`. This is the file `egm new` writes for a 2D project, trimmed:',
            'Todo projeto é descrito pelo `egm.config.ts`. Este é o arquivo que o `egm new` escreve para um projeto 2D, resumido:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'egm.config.ts',
          code: `import { defineConfig } from 'easy-game-maker'

export default defineConfig({
  app: {
    name: 'my-game',
    version: '1.0.0',
    bundleId: 'com.example.mygame',
  },
  display: {
    width: 360,
    height: 640,
    orientation: 'portrait',
    backgroundColor: '#1a1a2e',
  },
})`,
        },
      ],
    },
    {
      id: 'build-toolchains',
      title: t('Toolchains for desktop builds', 'Ferramentas para builds desktop'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Only `egm build desktop` runs today. What it needs depends on the operating system you build for:',
            'Só o `egm build desktop` funciona hoje. O que ele exige depende do sistema operacional de destino:',
          ),
        },
        {
          type: 'table',
          head: [t('Target', 'Alvo'), t('Needs', 'Exige'), t('Output', 'Saída')],
          rows: [
            [t('macOS', 'macOS'), t('Xcode command-line tools (`xcode-select --install`), which provide `swiftc`.', 'Ferramentas de linha de comando do Xcode (`xcode-select --install`), que fornecem o `swiftc`.'), t('`.app` and `.dmg`', '`.app` e `.dmg`')],
            [t('Windows', 'Windows'), t('Rust and the Tauri CLI (`cargo install tauri-cli --version "^2"`).', 'Rust e a CLI do Tauri (`cargo install tauri-cli --version "^2"`).'), t('`.msi` and `.exe`', '`.msi` e `.exe`')],
            [t('Linux', 'Linux'), t('Rust, the Tauri CLI and the WebKitGTK development packages.', 'Rust, a CLI do Tauri e os pacotes de desenvolvimento do WebKitGTK.'), t('`.AppImage` and `.deb`', '`.AppImage` e `.deb`')],
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'The macOS build uses a native Swift shell around a WKWebView, not Tauri. Windows and Linux use Tauri. See [Desktop](/build/desktop) for the full flow.',
            'O build macOS usa uma casca nativa em Swift com WKWebView, e não o Tauri. Windows e Linux usam o Tauri. Veja [Desktop](/build/desktop) para o fluxo completo.',
          ),
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: t('If something fails', 'Se algo falhar'),
      blocks: [
        {
          type: 'list',
          items: [
            t('`egm: command not found`: the global npm bin folder is not on your `PATH`.', '`egm: command not found`: a pasta global de binários do npm não está no seu `PATH`.'),
            t('`Vite not found`: run `npm install` inside the game project, not in a parent folder.', '`Vite not found`: rode `npm install` dentro do projeto do jogo, não em uma pasta acima.'),
            t('More cases are in [Troubleshooting](/guide/troubleshooting).', 'Há mais casos em [Solução de Problemas](/guide/troubleshooting).'),
          ],
        },
      ],
    },
  ],
}

export default page
