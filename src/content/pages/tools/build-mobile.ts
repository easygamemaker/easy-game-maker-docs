import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/build/mobile',
  title: t('iOS & Android', 'iOS & Android'),
  description: t(
    'The iOS and Android targets are not available in 0.2.0. What the builders will produce, the settings they read and how to test on a phone today.',
    'Os alvos iOS e Android não estão disponíveis na 0.2.0. O que os builders vão gerar, as configurações que leem e como testar em um celular hoje.',
  ),
  source: 'src/cli/builders/IosBuilder.ts',
  related: ['/cli/build', '/simulator/egmgo', '/cli/go', '/tools/config', '/monetization/ads'],
  sections: [
    {
      id: 'status',
      title: t('Status', 'Situação'),
      blocks: [
        {
          type: 'callout',
          kind: 'warning',
          title: t('Not available yet', 'Ainda não disponíveis'),
          text: t(
            '`egm build ios` and `egm build android` print "not available yet" and exit with code 1. The builders are still in the code base and will be opened target by target. There are no `build:ios` or `build:android` scripts in new projects for that reason. Until then, mobile is a place to test, not to publish. An EGM Marketplace for publishing is planned, not shipped.',
            '`egm build ios` e `egm build android` imprimem "not available yet" e encerram com código 1. Os builders continuam no código e serão abertos alvo por alvo. Por isso os projetos novos não têm scripts `build:ios` nem `build:android`. Até lá, o mobile é um lugar para testar, não para publicar. Um EGM Marketplace para publicação está planejado, mas ainda não existe.',
          ),
        },
      ],
    },
    {
      id: 'test-today',
      title: t('Testing on a phone today', 'Testando em um celular hoje'),
      blocks: [
        {
          type: 'list',
          items: [
            t('Use the simulator device presets (iPhone, Android, iPad) to check layout, orientation and DPI (Dots Per Inch). See [Simulator Overview](/simulator/overview).', 'Use os presets de dispositivo do simulador (iPhone, Android, iPad) para conferir layout, orientação e DPI (Dots Per Inch). Veja [Visão Geral do Simulador](/simulator/overview).'),
            t('Run the game on a real device with the EgmGO app: [egm go](/cli/go) builds it, `egm simulate` shows the QR code. Add `--tunnel` to work across networks.', 'Execute o jogo em um dispositivo real com o app EgmGO: o [egm go](/cli/go) o compila e o `egm simulate` mostra o QR code (Quick Response code). Adicione `--tunnel` para funcionar entre redes.'),
            t('Ship to desktop with [Desktop](/build/desktop) meanwhile.', 'Entregue para desktop com [Desktop](/build/desktop) enquanto isso.'),
          ],
        },
      ],
    },
    {
      id: 'planned',
      title: t('What the builders will produce', 'O que os builders vão gerar'),
      blocks: [
        {
          type: 'table',
          head: [t('Target', 'Alvo'), t('Output', 'Saída'), t('Toolchain', 'Ferramentas')],
          rows: [
            [t('iOS', 'iOS'), t('An Xcode project that hosts the game in a `WKWebView`, for the App Store.', 'Um projeto Xcode que hospeda o jogo em um `WKWebView`, para a App Store.'), t('Xcode 15.4 or newer, the license accepted, `xcode-select` pointing to it.', 'Xcode 15.4 ou mais novo, com a licença aceita e o `xcode-select` apontando para ele.')],
            [t('Android', 'Android'), t('A Gradle project (Kotlin, WebView) for Google Play.', 'Um projeto Gradle (Kotlin, WebView) para o Google Play.'), t('Android Studio, `ANDROID_HOME` set, `platform-tools` on the `PATH`.', 'Android Studio, `ANDROID_HOME` definido e `platform-tools` no `PATH`.')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Both read `build.ios` and `build.android` from `egm.config.ts`. The Android builder also turns `app.icon` into the launcher icon sizes for every density.',
            'Ambos leem `build.ios` e `build.android` do `egm.config.ts`. O builder Android também transforma `app.icon` nos tamanhos de ícone de launcher para todas as densidades.',
          ),
        },
      ],
    },
    {
      id: 'config',
      title: t('Settings the mobile builders read', 'Configurações que os builders mobile leem'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'egm.config.ts',
          code: `import { defineConfig } from 'easy-game-maker'

export default defineConfig({
  app: {
    name: 'Star Catch',
    version: '1.0.0',
    bundleId: 'com.studio.starcatch',
    icon: 'public/assets/icon.png',
  },
  display: { width: 360, height: 640, orientation: 'portrait', backgroundColor: '#0a0e1a' },
  build: {
    ios: { deploymentTarget: '16.0', deviceFamily: 'universal', teamId: 'ABCDE12345' },
    android: { minSdkVersion: 26, targetSdkVersion: 35, compileSdkVersion: 35 },
  },
})`,
        },
        {
          type: 'props',
          title: t('`build.ios`', '`build.ios`'),
          rows: [
            { name: 'deploymentTarget', type: 'string', description: t('Minimum iOS version, for example `"16.0"`.', 'Versão mínima do iOS, por exemplo `"16.0"`.') },
            { name: 'teamId', type: 'string', description: t('Apple developer team identifier, used for signing.', 'Identificador do time de desenvolvedor Apple, usado na assinatura.') },
            { name: 'deviceFamily', type: '"iphone" | "ipad" | "universal"', description: t('Which devices the app targets.', 'Quais dispositivos o app atende.') },
          ],
        },
        {
          type: 'props',
          title: t('`build.android`', '`build.android`'),
          rows: [
            { name: 'minSdkVersion', type: 'number', description: t('Lowest Android API level supported.', 'Menor nível de API do Android suportado.') },
            { name: 'targetSdkVersion', type: 'number', description: t('API level the app is built and tested against.', 'Nível de API contra o qual o app é construído e testado.') },
            { name: 'compileSdkVersion', type: 'number', description: t('API level used to compile.', 'Nível de API usado para compilar.') },
          ],
        },
      ],
    },
    {
      id: 'monetization',
      title: t('Ads and purchases', 'Anúncios e compras'),
      blocks: [
        {
          type: 'p',
          text: t(
            'When `egm.config.ts` has a `monetization` block, the mobile builders generate native bridges for AdMob (ads), StoreKit (App Store purchases) and Google Play Billing, and expose them to the game as `window.EgmNative` before it loads. The engine side is `AdManager` and `IAPManager`. Because the mobile builders are disabled, this is prepared but not reachable yet.',
            'Quando o `egm.config.ts` tem um bloco `monetization`, os builders mobile geram pontes nativas para o AdMob (anúncios), o StoreKit (compras na App Store) e o Google Play Billing, e as expõem ao jogo como `window.EgmNative` antes de ele carregar. O lado da engine são o `AdManager` e o `IAPManager`. Como os builders mobile estão desativados, isso está preparado, mas ainda não é alcançável.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'egm.config.ts',
          code: `import { defineConfig } from 'easy-game-maker'

export default defineConfig({
  app: { name: 'Star Catch', version: '1.0.0', bundleId: 'com.studio.starcatch' },
  display: { width: 360, height: 640 },
  monetization: {
    admob: {
      iosAppId: 'ca-app-pub-0000000000000000~1111111111',
      androidAppId: 'ca-app-pub-0000000000000000~2222222222',
      banner: { ios: 'ca-app-pub-0000000000000000/3333333333', android: 'ca-app-pub-0000000000000000/4444444444' },
    },
    iap: {
      products: [{ id: 'remove_ads', type: 'nonConsumable', title: 'Remove ads', price: 2.99 }],
    },
  },
})`,
        },
      ],
    },
  ],
}

export default page
