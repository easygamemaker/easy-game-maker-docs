import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/workflow',
  title: t('TypeScript → EGM → Build', 'TypeScript → EGM → Build'),
  description: t(
    'The day-to-day loop: write TypeScript, run it in the simulator, test it, then package a desktop build.',
    'O ciclo do dia a dia: escrever TypeScript, executar no simulador, testar e depois empacotar um build desktop.',
  ),
  source: 'src/cli/commands/build.ts',
  related: ['/cli/simulate', '/cli/test', '/cli/e2e', '/cli/build', '/build/desktop'],
  sections: [
    {
      id: 'loop',
      title: t('The loop', 'O ciclo'),
      blocks: [
        {
          type: 'table',
          head: [t('Step', 'Etapa'), t('Command', 'Comando'), t('What happens', 'O que acontece')],
          rows: [
            [t('Write', 'Escrever'), t('your editor', 'seu editor'), t('TypeScript in `src/`, config in `egm.config.ts`.', 'TypeScript em `src/`, configuração em `egm.config.ts`.')],
            [t('Run', 'Executar'), t('`egm simulate`', '`egm simulate`'), t('Vite dev server plus the simulator page, with live reload.', 'Servidor de desenvolvimento do Vite mais a página do simulador, com recarga automática.')],
            [t('Unit test', 'Teste unitário'), t('`egm test`', '`egm test`'), t('Runs Vitest and prints a formatted report.', 'Executa o Vitest e imprime um relatório formatado.')],
            [t('E2E test', 'Teste E2E'), t('`egm e2e`', '`egm e2e`'), t('Replays taps, drags and keys against the running game.', 'Reproduz toques, arrastos e teclas no jogo em execução.')],
            [t('Package', 'Empacotar'), t('`egm build desktop`', '`egm build desktop`'), t('Bundles the game and wraps it in a native shell.', 'Empacota o jogo e o envolve em uma casca nativa.')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Everything before packaging happens in a browser, so most of your time never touches a native toolchain.',
            'Tudo antes do empacotamento acontece no navegador, então a maior parte do seu tempo nunca toca em uma ferramenta nativa.',
          ),
        },
      ],
    },
    {
      id: 'config-drives-build',
      title: t('The config drives the build', 'A configuração conduz o build'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`egm build` loads `egm.config.ts`, checks that `app.name`, `app.bundleId`, `display.width` and `display.height` exist, then hands the config to the builder for the platform. The same file feeds the simulator (canvas size, scaling, background, `mode`).',
            'O `egm build` carrega o `egm.config.ts`, confere se `app.name`, `app.bundleId`, `display.width` e `display.height` existem e entrega a configuração ao builder da plataforma. O mesmo arquivo alimenta o simulador (tamanho do canvas, escala, fundo e `mode`).',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'egm.config.ts',
          code: `import { defineConfig } from 'easy-game-maker'

export default defineConfig({
  app: { name: 'Pixel Drift', version: '1.2.0', bundleId: 'com.studio.pixeldrift' },
  display: {
    width: 800,
    height: 500,
    orientation: 'landscape',
    backgroundColor: '#0a0a1a',
    scaling: 'fit',
  },
  build: {
    desktop: { width: 1280, height: 800, resizable: true },
  },
})`,
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'The CLI reads part of this file with regular expressions (name, width, height, scaling, backgroundColor, mode), so keep those values as plain literals. Computed values work in the engine but the simulator will not see them.',
            'A CLI lê parte deste arquivo com expressões regulares (name, width, height, scaling, backgroundColor e mode), então mantenha esses valores como literais simples. Valores calculados funcionam na engine, mas o simulador não os enxerga.',
          ),
        },
      ],
    },
    {
      id: 'what-build-does',
      title: t('What `egm build desktop` does', 'O que o `egm build desktop` faz'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('Runs `vite build` into a temporary folder with `--base ./`, so assets resolve from a local file.', 'Executa `vite build` em uma pasta temporária com `--base ./`, para que os assets sejam resolvidos a partir de um arquivo local.'),
            t('Injects the scaling code into `index.html` unless `display.scaling` is `none`.', 'Injeta o código de escala no `index.html`, a menos que `display.scaling` seja `none`.'),
            t('On macOS, compiles a native Swift app around a WKWebView with `swiftc`, ad-hoc signs it and creates a `.dmg`.', 'No macOS, compila com `swiftc` um app Swift nativo em volta de um WKWebView, assina de forma ad-hoc e cria um `.dmg`.'),
            t('On Windows and Linux, generates a Tauri project in `dist/desktop/src-tauri` and, when Rust and the Tauri CLI are installed, asks whether to run `cargo tauri build` now.', 'No Windows e no Linux, gera um projeto Tauri em `dist/desktop/src-tauri` e, quando Rust e a CLI do Tauri estão instalados, pergunta se deve executar `cargo tauri build` agora.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'The full command reference is in [egm build](/cli/build) and [Desktop](/build/desktop).',
            'A referência completa do comando está em [egm build](/cli/build) e [Desktop](/build/desktop).',
          ),
        },
      ],
    },
    {
      id: 'scripts',
      title: t('Scripts in package.json', 'Scripts no package.json'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A new project already maps the common commands, so `npm run dev` and `npm run build` work without remembering the CLI.',
            'Um projeto novo já mapeia os comandos comuns, então `npm run dev` e `npm run build` funcionam sem precisar lembrar da CLI.',
          ),
        },
        {
          type: 'code',
          lang: 'json',
          filename: 'package.json',
          check: 'skip',
          code: `{
  "scripts": {
    "dev": "egm simulate",
    "build": "egm build desktop",
    "build:desktop": "egm build desktop"
  }
}`,
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'There are no `build:ios` or `build:android` scripts, and `egm build ios` and `egm build android` are refused, because only desktop builds are available in 0.2.0.',
            'Não existem scripts `build:ios` ou `build:android`, e `egm build ios` e `egm build android` são recusados, porque só builds desktop estão disponíveis na 0.2.0.',
          ),
        },
      ],
    },
  ],
}

export default page
