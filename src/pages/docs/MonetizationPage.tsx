import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'

const ADS = `import { AdManager } from 'easy-game-maker'

const ads = new AdManager(app)

// Show a banner
ads.showBanner({ position: 'bottom' })
ads.hideBanner()

// Show interstitial
await ads.showInterstitial()

// Rewarded video
const result = await ads.showRewarded()
if (result.earned) {
  player.coins += 100
}`

const IAP = `import { IAPManager } from 'easy-game-maker'

const iap = new IAPManager(app, [
  { id: 'coins_100', type: 'consumable', title: '100 Coins', price: 1.99 },
  { id: 'remove_ads', type: 'nonConsumable', title: 'Remove Ads', price: 2.99 },
  { id: 'premium_pass', type: 'subscription', title: 'Premium Pass', price: 4.99 },
])

// Products must match the native store configuration.
await iap.init()

// Purchase
const result = await iap.purchase('coins_100')
if (result.success) {
  player.coins += 100
}

// Restore purchases (iOS requirement)
await iap.restorePurchases()`

export function MonetizationPage() {
  const { lang } = useLang()
  return (
    <DocLayout>
      <PageHeader title="Monetization" badge={lang === 'en' ? 'Monetization' : 'Monetização'}
        description={lang === 'en'
          ? 'AdMob-style banner, interstitial, and rewarded ads plus in-app purchases through the native bridge.'
          : 'Anúncios de banner, intersticial e recompensado no estilo AdMob, além de compras no app pela ponte nativa.'}
      />
      <div className="space-y-10">
        <ApiSection title="AdManager (AdMob)">
          <CodeBlock code={ADS} />
          <Callout type="info">{lang === 'en'
            ? 'In the simulator, ads show as realistic native-looking mocks. Real ads require AdMob app IDs in egm.config.ts.'
            : 'No simulador, anúncios aparecem como mocks realistas com aparência nativa. Anúncios reais exigem IDs do app AdMob no egm.config.ts.'}
          </Callout>
        </ApiSection>
        <ApiSection title="IAPManager">
          <CodeBlock code={IAP} />
          <Callout type="warning">{lang === 'en'
            ? 'IAP requires native builds (iOS/Android). In the simulator, purchases show Apple Pay and Google Play bottom sheet mocks.'
            : 'IAP requer builds nativas (iOS/Android). No simulador, compras mostram mocks de bottom sheet do Apple Pay e Google Play.'}
          </Callout>
        </ApiSection>
        <ApiSection title={lang === 'en' ? 'Native builds' : 'Builds nativas'}>
          <Callout type="info">{lang === 'en'
            ? 'When egm.config.ts has a monetization block, the iOS and Android builds generate the native bridges (AdMob and StoreKit on iOS, AdMob and Google Play Billing on Android) and register them as window.EgmNative before your game loads. Without your own AdMob IDs, the build uses Google sample IDs, which serve test ads. iOS and Android builds are coming soon.'
            : 'Quando o egm.config.ts tem um bloco monetization, os builds de iOS e Android geram as pontes nativas (AdMob e StoreKit no iOS, AdMob e Google Play Billing no Android) e as registram como window.EgmNative antes de o jogo carregar. Sem IDs próprios do AdMob, o build usa os IDs de exemplo do Google, que exibem anúncios de teste. Os builds de iOS e Android chegam em breve.'}
          </Callout>
        </ApiSection>
      </div>
    </DocLayout>
  )
}
