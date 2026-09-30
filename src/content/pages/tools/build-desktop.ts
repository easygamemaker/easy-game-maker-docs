import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/build/desktop',
  title: t('Desktop', 'Desktop'),
  description: t(
    'The one build target available today: a native macOS app, or a Tauri project for Windows and Linux, with the toolchain each needs.',
    'O único alvo de build disponível hoje: um app nativo para macOS, ou um projeto Tauri para Windows e Linux, com as ferramentas que cada um exige.',
  ),
  source: 'src/cli/builders/DesktopBuilder.ts',
  related: ['/cli/build', '/tools/config', '/installation', '/workflow', '/guide/troubleshooting'],
  sections: [
    {
      id: 'commands',
      title: t('Commands', 'Comandos'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm build desktop            # the OS you are running on
egm build desktop macos      # .app + .dmg
egm build desktop windows    # Tauri project, .msi + .exe
egm build desktop linux      # Tauri project, .AppImage + .deb
egm build desktop --yes      # answer yes to every question ("build now?", "open the app?")
egm build desktop --no-prompt # never ask; this is also the default without a terminal`,
        },
        {
          type: 'p',
          text: t(
            'The build asks two questions: "Would you like to build now?" (Windows and Linux) and "Would you like to open the app now?" (macOS). When the command does not run in a terminal (CI, a pipe), it skips them and answers no, so it never hangs waiting for input. Use `--yes` to accept them or `--no-prompt` to always skip them.',
            'O build faz duas perguntas: "Would you like to build now?" (Windows e Linux) e "Would you like to open the app now?" (macOS). Quando o comando não roda em um terminal (CI, um pipe), ele as pula e responde não, então nunca trava esperando entrada. Use `--yes` para aceitá-las ou `--no-prompt` para sempre pulá-las.',
          ),
        },
        {
          type: 'p',
          text: t(
            'Every desktop build starts the same way: `vite build` into a temporary folder with `--base ./`, the scaling script injected into `index.html` (unless `display.scaling` is `none`), and the result copied to `dist/desktop/www`. The `crossorigin` attribute Vite adds to module scripts is stripped so a local web view can load them.',
            'Todo build desktop começa do mesmo jeito: `vite build` em uma pasta temporária com `--base ./`, o script de escala injetado no `index.html` (a menos que `display.scaling` seja `none`) e o resultado copiado para `dist/desktop/www`. O atributo `crossorigin` que o Vite adiciona aos scripts de módulo é removido para que uma web view local consiga carregá-los.',
          ),
        },
      ],
    },
    {
      id: 'macos',
      title: t('macOS: a native Swift app', 'macOS: um app Swift nativo'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The macOS target does not use Tauri. It generates a small Swift program (`main.swift` and `AppDelegate.swift`) that hosts your game in a `WKWebView`, serving `www/` through a custom `game://` scheme so ES modules and WebGL textures get a proper origin. It then compiles it with `swiftc` (Cocoa and WebKit frameworks), ad-hoc signs the bundle with `codesign` and creates a `.dmg` with `hdiutil`.',
            'O alvo macOS não usa Tauri. Ele gera um pequeno programa Swift (`main.swift` e `AppDelegate.swift`) que hospeda o seu jogo em um `WKWebView`, servindo `www/` por um esquema `game://` próprio, para que módulos ES e texturas WebGL tenham uma origem adequada. Depois compila com `swiftc` (frameworks Cocoa e WebKit), assina o bundle de forma ad-hoc com `codesign` e cria um `.dmg` com `hdiutil`.',
          ),
        },
        {
          type: 'table',
          head: [t('Output', 'Saída'), t('Where', 'Onde')],
          rows: [
            [t('App bundle', 'Bundle do app'), t('`dist/desktop/<Name>.app` (spaces removed from the name)', '`dist/desktop/<Nome>.app` (espaços removidos do nome)')],
            [t('Disk image', 'Imagem de disco'), t('`dist/desktop/<Name>.dmg`', '`dist/desktop/<Nome>.dmg`')],
          ],
        },
        {
          type: 'list',
          items: [
            t('Requires the Xcode command-line tools: `xcode-select --install`. If `swiftc` fails, the build stops with that hint.', 'Exige as ferramentas de linha de comando do Xcode: `xcode-select --install`. Se o `swiftc` falhar, o build para com essa dica.'),
            t('The icon comes from `build.desktop.icon` (or `app.icon` when it is not set), resized with `sips` and packed with `iconutil` into an `.icns`. Use a square PNG of 512 by 512 pixels or more.', 'O ícone vem de `build.desktop.icon` (ou de `app.icon` quando ela não está definida), redimensionado com o `sips` e empacotado com o `iconutil` em um `.icns`. Use um PNG (Portable Network Graphics) quadrado de 512 por 512 pixels ou mais.'),
            t('Afterwards, in a terminal, the CLI (Command-Line Interface) asks "Would you like to open the app now? [Y/n]" (see `--yes` and `--no-prompt` above).', 'Depois, em um terminal, a CLI (Command-Line Interface) pergunta "Would you like to open the app now? [Y/n]" (veja `--yes` e `--no-prompt` acima).'),
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'The app is ad-hoc signed, not signed with a Developer ID and not notarized. Another Mac may show a Gatekeeper warning on first launch. Sign and notarize it yourself with your Apple developer account before distributing it widely.',
            'O app é assinado de forma ad-hoc, não com um Developer ID, e não é notarizado. Outro Mac pode mostrar um aviso do Gatekeeper na primeira abertura. Assine e notarize com a sua conta de desenvolvedor Apple antes de distribuí-lo amplamente.',
          ),
        },
      ],
    },
    {
      id: 'tauri',
      title: t('Windows and Linux: a Tauri project', 'Windows e Linux: um projeto Tauri'),
      blocks: [
        {
          type: 'p',
          text: t(
            'For Windows and Linux the CLI generates a Tauri 2 project in `dist/desktop/src-tauri` (Rust `Cargo.toml`, `tauri.conf.json`, capabilities and icons) around the `www` folder. The window title, size, `resizable` flag, version and identifier come from your config. If Rust and the Tauri CLI are installed, in a terminal it asks "Would you like to build now? (~2 min first run) [Y/n]" (or just builds with `--yes`) and runs `cargo tauri build` with the right bundles. If they are missing, it prints how to install them and leaves the project ready.',
            'Para Windows e Linux, a CLI gera um projeto Tauri 2 em `dist/desktop/src-tauri` (`Cargo.toml` do Rust, `tauri.conf.json`, capabilities e ícones) em volta da pasta `www`. O título da janela, o tamanho, a flag `resizable`, a versão e o identificador vêm da sua configuração. Se o Rust e a CLI do Tauri estiverem instalados, em um terminal ela pergunta "Would you like to build now? (~2 min first run) [Y/n]" (ou constrói direto com `--yes`) e executa `cargo tauri build` com os bundles certos. Se estiverem ausentes, imprime como instalá-los e deixa o projeto pronto.',
          ),
        },
        {
          type: 'table',
          head: [t('OS', 'SO'), t('Bundles', 'Bundles'), t('Also needs', 'Também exige')],
          rows: [
            [t('Windows', 'Windows'), t('`msi`, `nsis` (`.msi` and `.exe`)', '`msi`, `nsis` (`.msi` e `.exe`)'), t('Rust, `cargo install tauri-cli --version "^2"`, and Edge WebView2 on the target machine (pre-installed on Windows 10 21H2 and Windows 11)', 'Rust, `cargo install tauri-cli --version "^2"` e o Edge WebView2 na máquina de destino (já vem no Windows 10 21H2 e no Windows 11)')],
            [t('Linux', 'Linux'), t('`appimage`, `deb`', '`appimage`, `deb`'), t('Rust, the Tauri CLI and the WebKitGTK and related development packages', 'Rust, a CLI do Tauri e os pacotes de desenvolvimento do WebKitGTK e relacionados')],
          ],
        },
        {
          type: 'list',
          items: [
            t('On Linux it also writes `run-<name>.sh`, a launcher that sets `WEBKIT_DISABLE_DMABUF_RENDERER=1`, the usual fix for a black canvas on some graphics drivers.', 'No Linux ele também grava `run-<nome>.sh`, um lançador que define `WEBKIT_DISABLE_DMABUF_RENDERER=1`, a correção usual para tela preta em alguns drivers gráficos.'),
            t('Run the build on the operating system you target. Tauri packages for the OS it runs on.', 'Rode o build no sistema operacional de destino. O Tauri empacota para o SO em que roda.'),
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Network access', 'Acesso à rede'),
          text: t(
            'The generated content security policy sets `connect-src \'self\' tauri: asset: ws: wss: https:`, so `fetch`, WebSocket and secure requests to outside servers work (a multiplayer game can reach its server). Plain `http:` is not allowed. To narrow or change the list, set `build.desktop.connectSrc` (for example `[\'wss://game.example.com\']`); it replaces `ws: wss: https:`, and an empty array blocks all network access.',
            'A política de segurança de conteúdo gerada define `connect-src \'self\' tauri: asset: ws: wss: https:`, então `fetch`, WebSocket e requisições seguras para servidores externos funcionam (um jogo multiplayer alcança o servidor). O `http:` simples não é permitido. Para restringir ou mudar a lista, defina `build.desktop.connectSrc` (por exemplo `[\'wss://game.example.com\']`); ela substitui `ws: wss: https:`, e um array vazio bloqueia todo acesso à rede.',
          ),
        },
      ],
    },
    {
      id: 'config',
      title: t('Configuring the window', 'Configurando a janela'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The desktop builders read `build.desktop.width`, `build.desktop.height` and `build.desktop.resizable`. When the size is missing they use `display.width` and `display.height`. `resizable` defaults to `false`. `app.name`, `app.version`, `app.bundleId` and `app.icon` come from the `app` block.',
            'Os builders desktop leem `build.desktop.width`, `build.desktop.height` e `build.desktop.resizable`. Quando o tamanho falta, usam `display.width` e `display.height`. `resizable` tem padrão `false`. `app.name`, `app.version`, `app.bundleId` e `app.icon` vêm do bloco `app`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'egm.config.ts',
          code: `import { defineConfig } from 'easy-game-maker'

export default defineConfig({
  app: {
    name: 'Cosmic Pong',
    version: '1.2.0',
    bundleId: 'com.studio.cosmicpong',
    icon: 'public/assets/icon.png', // 512x512 or larger, square PNG
  },
  display: { width: 800, height: 500, orientation: 'landscape', backgroundColor: '#0a0a1a', scaling: 'fit' },
  build: {
    desktop: { width: 1280, height: 800, resizable: true },
  },
})`,
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            '`build.desktop.icon` overrides `app.icon` for desktop builds, and `build.desktop.connectSrc` sets the network sources of the Windows and Linux build. `build.desktop.targets` (`\'mac\' | \'windows\' | \'linux\'`) is reserved and not read yet: choose the operating system with the `egm build desktop <os>` argument.',
            '`build.desktop.icon` tem prioridade sobre `app.icon` nos builds desktop, e `build.desktop.connectSrc` define as origens de rede do build Windows e Linux. `build.desktop.targets` (`\'mac\' | \'windows\' | \'linux\'`) é reservado e ainda não é lido: escolha o sistema operacional com o argumento `egm build desktop <so>`.',
          ),
        },
      ],
    },
  ],
}

export default page
