import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/monetization/ads',
  title: t('AdManager', 'AdManager'),
  description: t(
    'Banner, interstitial and rewarded ads through one API, with a simulated ad UI when no native bridge is present.',
    'Anúncios de banner, intersticial e com recompensa por uma só API (Application Programming Interface), com uma interface de anúncio simulada quando não há ponte nativa.',
  ),
  source: 'src/engine/monetization/AdManager.ts',
  related: ['/monetization/iap', '/tools/config', '/cli/build', '/build/mobile', '/simulator/overview'],
  sections: [
    {
      id: 'status',
      title: t('What works today', 'O que funciona hoje'),
      blocks: [
        {
          type: 'callout',
          kind: 'warning',
          title: t('Read this first', 'Leia isto primeiro'),
          text: t(
            "`egm build` only produces a working build for desktop today. The other platforms are not available yet (the EGM Marketplace is planned). The SDK does contain code generators for an Android (Kotlin) and an iOS (Swift) AdMob bridge, but since those builds are not available, real ads are not something you can ship right now.",
            "Hoje o `egm build` só gera uma build funcional para desktop. As outras plataformas ainda não estão disponíveis (o EGM Marketplace está planejado). O SDK (Software Development Kit) contém geradores de código para uma ponte AdMob em Android (Kotlin) e em iOS (Swift), mas como essas builds não estão disponíveis, anúncios reais não são algo que você possa publicar agora.",
          ),
        },
        {
          type: 'table',
          head: [t('Where the game runs', 'Onde o jogo roda'), t('What `AdManager` does', 'O que o `AdManager` faz')],
          rows: [
            [t('Browser, simulator, desktop build', 'Navegador, simulador, build desktop'), t('Draws fake ads as DOM overlays (a mock banner, a 5 second interstitial, a 6 second rewarded video). No real ad is ever requested. The desktop builder writes no native bridge.', 'Desenha anúncios falsos como camadas DOM (Document Object Model), com um banner de mentira, um intersticial de 5 segundos e um vídeo com recompensa de 6 segundos. Nenhum anúncio real é pedido. O builder desktop não escreve ponte nativa.')],
            [t('Android or iOS build (not available yet)', 'Build Android ou iOS (ainda não disponível)'), t('If `window.EgmNative` exists, every call is forwarded to it. The generated bridges are meant to answer with Google AdMob.', 'Se `window.EgmNative` existe, cada chamada é repassada a ele. As pontes geradas foram feitas para responder com o Google AdMob.')],
          ],
        },
        {
          type: 'callout',
          kind: 'danger',
          title: t('Do not ship the simulator ads', 'Não publique os anúncios simulados'),
          text: t(
            'Outside a native bridge the overlays are mock-ups with placeholder brands. Treat `AdManager` as a way to design and test the ad flow, not as a revenue source on desktop or web.',
            'Fora de uma ponte nativa, as camadas são maquetes com marcas fictícias. Trate o `AdManager` como forma de desenhar e testar o fluxo de anúncios, não como fonte de receita no desktop ou na web.',
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('Methods', 'Métodos'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`AdManager` is not created by the `App`. Instantiate it yourself with `new AdManager(app)`.',
            'O `AdManager` não é criado pelo `App`. Instancie você mesmo com `new AdManager(app)`.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'showBanner(position?: BannerPosition): void', type: 'method', default: "'bottom'", description: t('Shows a banner at `top` or `bottom`. Does nothing if one is already visible.', 'Mostra um banner em `top` ou `bottom`. Não faz nada se já há um visível.') },
            { name: 'hideBanner(): void', type: 'method', description: t('Hides the banner.', 'Esconde o banner.') },
            { name: 'isBannerVisible', type: 'boolean', readonly: true, description: t('Whether the banner is currently shown.', 'Se o banner está visível agora.') },
            { name: 'showInterstitial(): Promise<void>', type: 'method', description: t('Resolves when the player closes the ad. In the simulator the close button appears after 5 seconds.', 'Resolve quando o jogador fecha o anúncio. No simulador o botão de fechar aparece após 5 segundos.') },
            { name: 'showRewarded(): Promise<RewardResult>', type: 'method', description: t('Resolves with `{ earned, type?, amount? }`. In the simulator, watching the full 6 seconds gives `{ earned: true, type: "coins", amount: 50 }`; skipping gives `{ earned: false }`.', 'Resolve com `{ earned, type?, amount? }`. No simulador, assistir aos 6 segundos completos dá `{ earned: true, type: "coins", amount: 50 }`; pular dá `{ earned: false }`.') },
          ],
        },
        {
          type: 'p',
          text: t(
            "Pause your game logic while an interstitial or rewarded ad is on screen, and only grant the reward when `earned` is `true`. The simulator overlay has an iOS/Android toggle that changes only how the mock looks.",
            "Pause a lógica do jogo enquanto um anúncio intersticial ou com recompensa estiver na tela, e só conceda a recompensa quando `earned` for `true`. A camada do simulador tem um seletor iOS/Android que muda apenas a aparência da maquete.",
          ),
        },
      ],
    },
    {
      id: 'config',
      title: t('Configuring AdMob', 'Configurando o AdMob'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Ads are declared in `egm.config.ts` under `monetization.admob`. The key only has to exist: an empty `admob: {}` turns ads on with Google public sample ids, which are safe for testing. All fields are optional.',
            'Os anúncios são declarados no `egm.config.ts`, em `monetization.admob`. A chave só precisa existir: um `admob: {}` vazio liga os anúncios com os ids de exemplo públicos do Google, seguros para teste. Todos os campos são opcionais.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'egm.config.ts',
          check: 'compile',
          code: `import { defineConfig } from 'easy-game-maker'

export default defineConfig({
  app: { name: 'My Game', version: '1.0.0', bundleId: 'com.example.mygame' },
  display: { width: 360, height: 640 },
  monetization: {
    admob: {
      iosAppId: 'ca-app-pub-0000000000000000~0000000000',
      androidAppId: 'ca-app-pub-0000000000000000~0000000000',
      banner: { ios: 'ca-app-pub-0000000000000000/1111111111', android: 'ca-app-pub-0000000000000000/2222222222' },
      interstitial: { ios: 'ca-app-pub-0000000000000000/3333333333', android: 'ca-app-pub-0000000000000000/4444444444' },
      rewarded: { ios: 'ca-app-pub-0000000000000000/5555555555', android: 'ca-app-pub-0000000000000000/6666666666' },
    },
  },
})`,
        },
      ],
    },
    {
      id: 'example',
      title: t('Rewarded ad for extra lives', 'Anúncio com recompensa por vidas extras'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/ads.ts',
          check: 'compile',
          code: `import { App, AdManager } from 'easy-game-maker'

export async function offerExtraLife(app: App, addLife: () => void): Promise<void> {
  const ads = new AdManager(app)

  ads.showBanner('bottom')

  const result = await ads.showRewarded()
  if (result.earned) {
    addLife()
    console.log('reward:', result.type, result.amount)
  }

  ads.hideBanner()
  await ads.showInterstitial()
}`,
        },
        {
          type: 'p',
          text: t(
            'See the [monetization demo](/examples/monetization-demo) for the flow running in the simulator.',
            'Veja a [demo de monetização](/examples/monetization-demo) com o fluxo rodando no simulador.',
          ),
        },
      ],
    },
  ],
}

export default page
