import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/monetization/iap',
  title: t('IAPManager', 'IAPManager'),
  description: t(
    'In-app purchases (consumable, non-consumable, subscription) with a simulated store sheet when no native bridge is present.',
    'Compras dentro do app (consumíveis, não consumíveis, assinaturas) com uma folha de loja simulada quando não há ponte nativa.',
  ),
  source: 'src/engine/monetization/IAPManager.ts',
  related: ['/monetization/ads', '/tools/config', '/cli/build', '/debug/save'],
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
            "`egm build` only produces a working build for desktop today; the other platforms are not available yet (the EGM Marketplace is planned). The SDK has generators for a Google Play Billing bridge (Android) and a StoreKit bridge (iOS), but those builds are not available, so real payments cannot be shipped right now.",
            "Hoje o `egm build` só gera uma build funcional para desktop; as outras plataformas ainda não estão disponíveis (o EGM Marketplace está planejado). O SDK (Software Development Kit) tem geradores de uma ponte de Google Play Billing (Android) e de uma ponte StoreKit (iOS), mas essas builds não estão disponíveis, então pagamentos reais não podem ser publicados agora.",
          ),
        },
        {
          type: 'table',
          head: [t('Where the game runs', 'Onde o jogo roda'), t('What `IAPManager` does', 'O que o `IAPManager` faz')],
          rows: [
            [t('Browser, simulator, desktop build', 'Navegador, simulador, build desktop'), t('Shows a mock Apple or Google purchase sheet. Confirming returns a fake receipt (`ios_sim_...` or `android_sim_...`). No money moves.', 'Mostra uma folha de compra falsa da Apple ou do Google. Confirmar devolve um recibo falso (`ios_sim_...` ou `android_sim_...`). Nenhum dinheiro é movido.')],
            [t('Android or iOS build (not available yet)', 'Build Android ou iOS (ainda não disponível)'), t('If `window.EgmNative` has `iap_purchase`, `iap_restore` and `iap_isOwned`, calls are forwarded to the native store.', 'Se `window.EgmNative` tem `iap_purchase`, `iap_restore` e `iap_isOwned`, as chamadas são repassadas à loja nativa.')],
          ],
        },
        {
          type: 'callout',
          kind: 'danger',
          title: t('Ownership is not persisted in the simulator', 'A posse não é guardada no simulador'),
          text: t(
            'Without a native bridge, owned products live in a JavaScript `Set` on `window`. Reloading the page forgets them. If you need progress to survive, also write it with [SaveManager](/debug/save), and never treat a simulated receipt as proof of payment.',
            'Sem ponte nativa, os produtos comprados ficam num `Set` de JavaScript em `window`. Recarregar a página os esquece. Se precisa que o progresso sobreviva, grave também com o [SaveManager](/debug/save), e nunca trate um recibo simulado como prova de pagamento.',
          ),
        },
      ],
    },
    {
      id: 'types',
      title: t('Types', 'Tipos'),
      blocks: [
        {
          type: 'props',
          title: t('Product', 'Product'),
          rows: [
            { name: 'id', type: 'string', required: true, description: t('Store product id.', 'Id do produto na loja.') },
            { name: 'type', type: "'consumable' | 'nonConsumable' | 'subscription'", required: true, description: t('Consumables can be bought again and are never marked as owned.', 'Consumíveis podem ser comprados de novo e nunca são marcados como possuídos.') },
            { name: 'title', type: 'string', required: true, description: t('Shown in the purchase sheet.', 'Mostrado na folha de compra.') },
            { name: 'description', type: 'string', description: t('Optional extra line.', 'Linha extra opcional.') },
            { name: 'price', type: 'number', required: true, description: t('Price in dollars. `formatPrice` prints it as `$1.99`.', 'Preço em dólares. `formatPrice` o exibe como `$1.99`.') },
          ],
        },
        {
          type: 'props',
          title: t('PurchaseResult', 'PurchaseResult'),
          rows: [
            { name: 'success', type: 'boolean', required: true, description: t('Whether the purchase went through.', 'Se a compra foi concluída.') },
            { name: 'productId', type: 'string', description: t('The purchased id.', 'O id comprado.') },
            { name: 'error', type: 'string', description: t('`cancelled` when the player backs out, or `Unknown: <id>` for an unregistered product.', '`cancelled` quando o jogador desiste, ou `Unknown: <id>` para um produto não registrado.') },
            { name: 'receipt', type: 'string', description: t('Store receipt, or a fake one in the simulator.', 'Recibo da loja, ou um falso no simulador.') },
          ],
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
            '`IAPManager` is not created by the `App`: use `new IAPManager(app, products)`.',
            'O `IAPManager` não é criado pelo `App`: use `new IAPManager(app, products)`.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'init(): Promise<void>', type: 'method', description: t('Sends the product list to the native bridge (`iap_init`). Call once at startup; it is a no-op without a bridge.', 'Envia a lista de produtos à ponte nativa (`iap_init`). Chame uma vez na inicialização; não faz nada sem ponte.') },
            { name: 'products / getProduct(id)', type: 'Product[] / Product | undefined', description: t('The registered catalogue.', 'O catálogo registrado.') },
            { name: 'formatPrice(id): string', type: 'method', description: t('Formats the price with a `$` sign, or `-` for an unknown id.', 'Formata o preço com o sinal `$`, ou um traço para um id desconhecido.') },
            { name: 'isOwned(id): boolean', type: 'method', description: t('Asks the bridge, or the in-memory set in the simulator.', 'Pergunta à ponte, ou ao conjunto em memória no simulador.') },
            { name: 'purchase(productId): Promise<PurchaseResult>', type: 'method', description: t('Starts a purchase. Never rejects: failures come back as `success: false`.', 'Inicia uma compra. Nunca rejeita: as falhas voltam como `success: false`.') },
            { name: 'restorePurchases(): Promise<string[]>', type: 'method', description: t('Resolves with the ids of restored non-consumable products.', 'Resolve com os ids dos produtos não consumíveis restaurados.') },
          ],
        },
      ],
    },
    {
      id: 'config',
      title: t('Declaring products in the config', 'Declarando produtos na configuração'),
      blocks: [
        {
          type: 'p',
          text: t(
            "The same catalogue goes in `egm.config.ts` under `monetization.iap.products`, with the same fields as `Product`. The native bridge generators read it from there, so keep it in sync with what you pass to `new IAPManager`.",
            "O mesmo catálogo vai no `egm.config.ts`, em `monetization.iap.products`, com os mesmos campos de `Product`. Os geradores da ponte nativa leem dali, então mantenha em sincronia com o que você passa a `new IAPManager`.",
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
    iap: {
      products: [
        { id: 'coins_100', type: 'consumable', title: '100 Coins', price: 0.99 },
        { id: 'remove_ads', type: 'nonConsumable', title: 'Remove Ads', price: 2.99 },
      ],
    },
  },
})`,
        },
      ],
    },
    {
      id: 'example',
      title: t('Buying and restoring', 'Comprando e restaurando'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/store.ts',
          check: 'compile',
          code: `import { App, IAPManager } from 'easy-game-maker'
import type { Product } from 'easy-game-maker'

const catalogue: Product[] = [
  { id: 'coins_100', type: 'consumable', title: '100 Coins', price: 0.99 },
  { id: 'remove_ads', type: 'nonConsumable', title: 'Remove Ads', price: 2.99 },
]

export async function setupStore(app: App): Promise<IAPManager> {
  const iap = new IAPManager(app, catalogue)
  await iap.init()

  const restored = await iap.restorePurchases()
  console.log('restored:', restored)
  return iap
}

export async function buyCoins(iap: IAPManager, addCoins: (n: number) => void): Promise<void> {
  const result = await iap.purchase('coins_100')
  if (result.success) {
    addCoins(100)
  } else {
    console.log('purchase failed:', result.error)
  }
  console.log(iap.formatPrice('coins_100'), 'owned remove_ads:', iap.isOwned('remove_ads'))
}`,
        },
      ],
    },
  ],
}

export default page
