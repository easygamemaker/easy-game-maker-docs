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
      </div>
    </DocLayout>
  )
}
