import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/tools/config',
  title: t('egm.config.ts', 'egm.config.ts'),
  description: t(
    'Every option of the project configuration, its default, and which tool actually reads it.',
    'Toda opção da configuração do projeto, seu padrão e qual ferramenta realmente a lê.',
  ),
  source: 'src/engine/config.ts',
  related: ['/cli/build', '/build/desktop', '/simulator/overview', '/visual-editor', '/guide/2d-or-3d'],
  sections: [
    {
      id: 'overview',
      title: t('The file', 'O arquivo'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`egm.config.ts` (or `egm.config.js`) sits at the project root and default-exports the result of `defineConfig`. It is what `egm build` validates and hands to the builders, and what the simulator, the editor and the test runner read the game name, canvas size and mode from.',
            'O `egm.config.ts` (ou `egm.config.js`) fica na raiz do projeto e exporta por padrão o resultado de `defineConfig`. É o que o `egm build` valida e entrega aos builders, e de onde o simulador, o editor e o executor de testes leem o nome do jogo, o tamanho do canvas e o modo.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'egm.config.ts',
          code: `import { defineConfig } from 'easy-game-maker'

export default defineConfig({
  app: {
    name: 'My Game',
    version: '1.0.0',
    bundleId: 'com.studio.mygame',
    icon: 'public/assets/icon.png',
  },
  display: {
    width: 568,
    height: 320,
    orientation: 'landscape',
    backgroundColor: '#1a1a2e',
    scaling: 'fit',
  },
  mode: '2d',
  build: {
    ios: { deploymentTarget: '16.0' },
    android: { minSdkVersion: 26, targetSdkVersion: 35 },
    desktop: { width: 1136, height: 640, resizable: false },
  },
})`,
        },
        {
          type: 'p',
          text: t(
            '`defineConfig` returns the config with defaults filled in: `build` becomes `{}`, `plugins` becomes `[]`, `mode` becomes `"2d"` and `display` gets the defaults below. Only `app.name`, `app.bundleId`, `display.width` and `display.height` are validated by `egm build`.',
            '`defineConfig` devolve a configuração com os padrões preenchidos: `build` vira `{}`, `plugins` vira `[]`, `mode` vira `"2d"` e `display` recebe os padrões abaixo. Só `app.name`, `app.bundleId`, `display.width` e `display.height` são validados pelo `egm build`.',
          ),
        },
      ],
    },
    {
      id: 'app-display',
      title: t('app and display', 'app e display'),
      blocks: [
        {
          type: 'props',
          title: t('`app`', '`app`'),
          rows: [
            { name: 'name', type: 'string', required: true, description: t('Human-readable game name. Window title and app name.', 'Nome do jogo legível por pessoas. Título da janela e nome do app.') },
            { name: 'version', type: 'string', required: true, description: t('Version string, for example `"1.0.0"`.', 'Texto de versão, por exemplo `"1.0.0"`.') },
            { name: 'bundleId', type: 'string', required: true, description: t('Reverse-domain identifier, for example `com.studio.mygame`.', 'Identificador em domínio invertido, por exemplo `com.studio.mygame`.') },
            { name: 'icon', type: 'string', description: t('Path to a square PNG of 512 by 512 pixels or more, relative to the project. The macOS build turns it into an `.icns`.', 'Caminho para um PNG quadrado de 512 por 512 pixels ou mais, relativo ao projeto. O build macOS o transforma em `.icns`.') },
          ],
        },
        {
          type: 'props',
          title: t('`display`', '`display`'),
          rows: [
            { name: 'width', type: 'number', default: '360', required: true, description: t('Logical canvas width in game pixels.', 'Largura lógica do canvas em pixels do jogo.') },
            { name: 'height', type: 'number', default: '640', required: true, description: t('Logical canvas height in game pixels.', 'Altura lógica do canvas em pixels do jogo.') },
            { name: 'orientation', type: '"portrait" | "landscape" | "adaptive"', default: '"portrait"', description: t('Preferred orientation. Mobile builders read it.', 'Orientação preferida. Os builders mobile a leem.') },
            { name: 'backgroundColor', type: 'string', default: '"#000000"', description: t('Page and letterbox color behind the canvas.', 'Cor da página e das barras ao redor do canvas.') },
            { name: 'scaling', type: '"fit" | "fill" | "stretch" | "none"', default: '"fit"', description: t('How the canvas fills the screen. See the table below.', 'Como o canvas preenche a tela. Veja a tabela abaixo.') },
          ],
        },
        {
          type: 'table',
          head: [t('`scaling`', '`scaling`'), t('Behavior', 'Comportamento')],
          rows: [
            [t('`fit`', '`fit`'), t('Scales to fit, keeps the aspect ratio, letterbox bars.', 'Escala para caber, mantém a proporção, com barras.')],
            [t('`fill`', '`fill`'), t('Scales to cover the screen, keeps the aspect ratio, crops the edges.', 'Escala para cobrir a tela, mantém a proporção, corta as bordas.')],
            [t('`stretch`', '`stretch`'), t('Stretches to the screen, may distort.', 'Estica até a tela, pode distorcer.')],
            [t('`none`', '`none`'), t('No scaling code is injected.', 'Nenhum código de escala é injetado.')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Scaling is injected automatically into the simulator and into builds. Pointer coordinates stay in game space, so no game code changes. A 3D game skips it, since the 3D engine sizes its own canvas.',
            'A escala é injetada automaticamente no simulador e nos builds. As coordenadas do ponteiro continuam no espaço do jogo, então o código do jogo não muda. Um jogo 3D a ignora, já que a engine 3D dimensiona o próprio canvas.',
          ),
        },
      ],
    },
    {
      id: 'mode-editor',
      title: t('mode and visualEditor', 'mode e visualEditor'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'mode', type: '"2d" | "3d"', default: '"2d"', description: t('The engine the project uses. `egm new --3d` writes `"3d"`. Read by the simulator and the editor.', 'A engine que o projeto usa. `egm new --3d` escreve `"3d"`. Lido pelo simulador e pelo editor.') },
            { name: 'visualEditor', type: 'boolean', description: t('Turns on the scene editor in `egm editor`. `egm new --visual` writes `true`.', 'Liga o editor de cenas no `egm editor`. `egm new --visual` escreve `true`.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Some fields are read with regular expressions', 'Alguns campos são lidos com expressões regulares'),
          text: t(
            'The simulator, the editor and the test runner do not execute your config. They scan the file text for `name`, `width`, `height`, `scaling`, `backgroundColor`, `mode` and `visualEditor`. Write these as plain literals (`width: 800`, `mode: "3d"`), not computed values or spreads. `egm build` is different: it does execute the file, with only `defineConfig` available from `easy-game-maker`.',
            'O simulador, o editor e o executor de testes não executam a sua configuração. Eles varrem o texto do arquivo em busca de `name`, `width`, `height`, `scaling`, `backgroundColor`, `mode` e `visualEditor`. Escreva-os como literais simples (`width: 800`, `mode: "3d"`), e não como valores calculados ou spreads. O `egm build` é diferente: ele executa o arquivo, com apenas `defineConfig` disponível de `easy-game-maker`.',
          ),
        },
      ],
    },
    {
      id: 'build',
      title: t('build', 'build'),
      blocks: [
        {
          type: 'props',
          title: t('`build.desktop`', '`build.desktop`'),
          rows: [
            { name: 'width', type: 'number', default: 'display.width', description: t('Window width of the desktop app.', 'Largura da janela do app desktop.') },
            { name: 'height', type: 'number', default: 'display.height', description: t('Window height of the desktop app.', 'Altura da janela do app desktop.') },
            { name: 'resizable', type: 'boolean', default: 'false', description: t('Whether the window can be resized.', 'Se a janela pode ser redimensionada.') },
            { name: 'targets', type: "Array<'mac' | 'windows' | 'linux'>", description: t('Reserved: not read by the builders yet. Choose the OS with `egm build desktop <os>`.', 'Reservado: ainda não é lido pelos builders. Escolha o SO com `egm build desktop <so>`.') },
            { name: 'icon', type: 'string', description: t('Icon (PNG path) for desktop builds. Overrides `app.icon` when set.', 'Ícone (caminho de um PNG) dos builds desktop. Tem prioridade sobre `app.icon` quando definido.') },
            { name: 'connectSrc', type: 'string[]', default: "['ws:', 'wss:', 'https:']", description: t('Network sources of the `connect-src` CSP (Content Security Policy) directive in the Windows and Linux (Tauri) build, added to `\'self\' tauri: asset:`. Replaces the default; `[]` blocks all network access.', 'Origens de rede da diretiva `connect-src` da CSP (Content Security Policy, política de segurança de conteúdo) no build Windows e Linux (Tauri), somadas a `\'self\' tauri: asset:`. Substitui o padrão; `[]` bloqueia todo acesso à rede.') },
          ],
        },
        {
          type: 'props',
          title: t('`build.ios` and `build.android`', '`build.ios` e `build.android`'),
          rows: [
            { name: 'ios.deploymentTarget', type: 'string', description: t('Minimum iOS version.', 'Versão mínima do iOS.') },
            { name: 'ios.teamId', type: 'string', description: t('Apple developer team identifier.', 'Identificador do time de desenvolvedor Apple.') },
            { name: 'ios.deviceFamily', type: '"iphone" | "ipad" | "universal"', description: t('Target devices.', 'Dispositivos-alvo.') },
            { name: 'android.minSdkVersion', type: 'number', description: t('Lowest API level supported.', 'Menor nível de API suportado.') },
            { name: 'android.targetSdkVersion', type: 'number', description: t('API level targeted.', 'Nível de API alvo.') },
            { name: 'android.compileSdkVersion', type: 'number', description: t('API level used to compile.', 'Nível de API usado para compilar.') },
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'The iOS and Android builders are not available in 0.2.0, so these two blocks have no effect on what you can build today. See [iOS & Android](/build/mobile).',
            'Os builders iOS e Android não estão disponíveis na 0.2.0, então esses dois blocos não têm efeito sobre o que você consegue construir hoje. Veja [iOS & Android](/build/mobile).',
          ),
        },
      ],
    },
    {
      id: 'others',
      title: t('monetization, plugins, assets', 'monetization, plugins, assets'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'monetization.admob', type: 'AdMobConfig', description: t('App ids and banner, interstitial and rewarded unit ids per platform (`{ ios, android }`).', 'Ids do app e dos blocos de banner, intersticial e recompensado por plataforma (`{ ios, android }`).') },
            { name: 'monetization.iap.products', type: 'IAPProductConfig[]', description: t('In-app products: `id`, `type` (`consumable`, `nonConsumable`, `subscription`), `title`, `description`, `price`.', 'Produtos dentro do app: `id`, `type` (`consumable`, `nonConsumable`, `subscription`), `title`, `description`, `price`.') },
            { name: 'plugins', type: 'string[]', default: '[]', description: t('Reserved: declared in the type, but nothing in the CLI or the engine reads it yet.', 'Reservado: declarado no tipo, mas nada na CLI nem na engine o lê ainda.') },
            { name: 'assets.baseDir', type: 'string', description: t('Reserved: declared in the type, but nothing reads it yet. For a base URL use `app.assets.setBaseUrl`.', 'Reservado: declarado no tipo, mas nada o lê ainda. Para uma URL base use `app.assets.setBaseUrl`.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'Give the config a name for its type when you need to share values between files. `EgmConfig` is exported from the package, and `satisfies` keeps your literals precise while checking them:',
            'Dê ao config o tipo dele quando precisar compartilhar valores entre arquivos. `EgmConfig` é exportado pelo pacote, e `satisfies` mantém os seus literais precisos enquanto os confere:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'egm.config.ts',
          code: `import { defineConfig } from 'easy-game-maker'
import type { EgmConfig } from 'easy-game-maker'

const monetization = {
  admob: {
    androidAppId: 'ca-app-pub-0000000000000000~2222222222',
    rewarded: { ios: 'ca-app-pub-0000000000000000/5555555555', android: 'ca-app-pub-0000000000000000/6666666666' },
  },
  iap: { products: [{ id: 'coins_100', type: 'consumable', title: '100 coins', price: 0.99 }] },
} satisfies EgmConfig['monetization']

export default defineConfig({
  app: { name: 'Coin Rush', version: '2.0.0', bundleId: 'com.studio.coinrush' },
  display: { width: 360, height: 640 },
  monetization,
})`,
        },
      ],
    },
  ],
}

export default page
