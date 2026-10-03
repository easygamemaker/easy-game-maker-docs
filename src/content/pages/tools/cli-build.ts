import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/cli/build',
  title: t('egm build', 'egm build'),
  description: t(
    'Package the game for a target platform. Only desktop builds run today; every other target exits with a "not available yet" message.',
    'Empacote o jogo para uma plataforma de destino. Só builds desktop funcionam hoje; todos os outros alvos encerram com a mensagem "not available yet".',
  ),
  source: 'src/cli/commands/build.ts',
  related: ['/build/desktop', '/tools/config', '/workflow', '/build/web', '/build/mobile', '/cli/publish'],
  sections: [
    {
      id: 'usage',
      title: t('Usage', 'Uso'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm build desktop            # the current operating system
egm build desktop macos      # .app + .dmg
egm build desktop windows    # .msi + .exe (Tauri)
egm build desktop linux      # .AppImage + .deb (Tauri)
egm build desktop --yes      # answer yes to the interactive questions
egm build desktop --no-prompt # never ask (the default without a terminal)`,
        },
        {
          type: 'props',
          rows: [
            { name: '<platform>', type: 'string', required: true, description: t('One of `web`, `ios`, `android`, `desktop`, `tizen`, `webos`, `androidtv`, `tvos`, `xbox`, `playstation`. Only `desktop` is available.', 'Um entre `web`, `ios`, `android`, `desktop`, `tizen`, `webos`, `androidtv`, `tvos`, `xbox`, `playstation`. Só `desktop` está disponível.') },
            { name: '[os]', type: '"macos" | "windows" | "linux"', default: 'current OS', description: t('Only for `desktop`. Selects the desktop target. When omitted, the OS you run on is used.', 'Somente para `desktop`. Seleciona o alvo desktop. Quando omitido, usa o SO em que você roda.') },
            { name: '-y, --yes', type: 'boolean', default: 'false', description: t('Answer yes to "Would you like to build now?" and "Would you like to open the app now?".', 'Responde sim a "Would you like to build now?" e "Would you like to open the app now?".') },
            { name: '--no-prompt', type: 'boolean', default: 'false', description: t('Never ask questions. This is also the behavior when the command does not run in a terminal (CI, pipes).', 'Nunca faz perguntas. Também é o comportamento quando o comando não roda em um terminal (CI, pipes).') },
          ],
        },
      ],
    },
    {
      id: 'availability',
      title: t('What is available', 'O que está disponível'),
      blocks: [
        {
          type: 'table',
          head: [t('Platform', 'Plataforma'), t('Status in 0.2.0', 'Situação na 0.2.0'), t('Intended output', 'Saída prevista')],
          rows: [
            [t('`desktop`', '`desktop`'), t('Available', 'Disponível'), t('`.app` + `.dmg` (macOS), `.msi` + `.exe` (Windows), `.AppImage` + `.deb` (Linux)', '`.app` + `.dmg` (macOS), `.msi` + `.exe` (Windows), `.AppImage` + `.deb` (Linux)')],
            [t('`web`', '`web`'), t('Not available yet', 'Ainda não disponível'), t('Static bundle', 'Bundle estático')],
            [t('`ios`, `android`', '`ios`, `android`'), t('Not available yet', 'Ainda não disponível'), t('Xcode and Gradle projects', 'Projetos Xcode e Gradle')],
            [t('`tizen`, `webos`, `androidtv`, `tvos`', '`tizen`, `webos`, `androidtv`, `tvos`'), t('Not available yet', 'Ainda não disponível'), t('Smart TV packages', 'Pacotes de Smart TV')],
            [t('`xbox`, `playstation`', '`xbox`, `playstation`'), t('Not available yet', 'Ainda não disponível'), t('Console projects', 'Projetos de console')],
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'The builders for the other targets are still in the code base but are refused at the command boundary. Running one prints `The "<platform>" build target is not available yet. Only desktop builds are supported right now: egm build desktop [macos|windows|linux]` and exits with code 1. They will be opened one target at a time.',
            'Os builders dos outros alvos continuam no código, mas são recusados na borda do comando. Executar um deles imprime `The "<platform>" build target is not available yet. Only desktop builds are supported right now: egm build desktop [macos|windows|linux]` e encerra com código 1. Eles serão abertos um alvo por vez.',
          ),
        },
      ],
    },
    {
      id: 'checks',
      title: t('What it checks, in order', 'O que ele confere, em ordem'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('The platform is known. Otherwise: `Unknown platform "x". Valid: ...` and exit 1.', 'A plataforma é conhecida. Caso contrário: `Unknown platform "x". Valid: ...` e saída 1.'),
            t('The platform is available. Otherwise the "not available yet" message and exit 1.', 'A plataforma está disponível. Caso contrário, a mensagem "not available yet" e saída 1.'),
            t('For `desktop`, the OS is one of `macos`, `windows`, `linux`. Otherwise: `Unknown OS "x" for desktop` and exit 1.', 'Para `desktop`, o SO é `macos`, `windows` ou `linux`. Caso contrário: `Unknown OS "x" for desktop` e saída 1.'),
            t('`egm.config.ts` (or `.js`) exists in the current folder, loads, and has `app.name`, `app.bundleId`, `display.width` and `display.height`.', '`egm.config.ts` (ou `.js`) existe na pasta atual, carrega e tem `app.name`, `app.bundleId`, `display.width` e `display.height`.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'The config is transpiled with esbuild and executed in Node.js, with `require("easy-game-maker")` replaced by a stub that only provides `defineConfig` (the real engine needs a browser). So keep `egm.config.ts` self-contained: import `defineConfig` and nothing else from the engine.',
            'A configuração é transpilada com o esbuild e executada no Node.js, com `require("easy-game-maker")` substituído por um stub que só fornece `defineConfig` (a engine de verdade precisa de um navegador). Portanto mantenha o `egm.config.ts` autossuficiente: importe `defineConfig` e nada mais da engine.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'egm.config.ts',
          code: `import { defineConfig } from 'easy-game-maker'

const NAME = 'Cosmic Pong' // plain constants are fine

export default defineConfig({
  app: { name: NAME, version: '1.0.0', bundleId: 'com.studio.cosmicpong', icon: 'public/assets/icon.png' },
  display: { width: 800, height: 500, orientation: 'landscape', backgroundColor: '#0a0a1a', scaling: 'fit' },
  build: { desktop: { width: 1024, height: 640, resizable: false } },
})`,
        },
      ],
    },
    {
      id: 'output',
      title: t('Output', 'Saída'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Desktop builds write to `dist/desktop/`. A failed build prints `Build failed:` with the error and exits with code 1. Toolchain requirements and the per-OS flow are in [Desktop](/build/desktop).',
            'Os builds desktop escrevem em `dist/desktop/`. Um build que falha imprime `Build failed:` com o erro e encerra com código 1. Os requisitos de ferramentas e o fluxo por sistema operacional estão em [Desktop](/build/desktop).',
          ),
        },
      ],
    },
  ],
}

export default page
