import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/assets',
  title: t('AssetManager', 'AssetManager'),
  description: t(
    'Loads images, sounds and fonts, with per-platform image variants and a progress callback.',
    'Carrega imagens, sons e fontes, com variantes de imagem por plataforma e um callback de progresso.',
  ),
  source: 'src/engine/core/AssetManager.ts',
  related: ['/core/textures', '/core/platform', '/display/sprite', '/audio/manager'],
  sections: [
    {
      id: 'manifest',
      title: t('Loading a manifest', 'Carregando um manifesto'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`app.assets.load(manifest, onProgress?)` loads everything in parallel and resolves when all items are done. Images are decoded and uploaded to the GPU (Graphics Processing Unit) as textures, sounds are decoded into the audio manager, and fonts are registered on `document.fonts`. If any item fails, the promise rejects.',
            '`app.assets.load(manifest, onProgress?)` carrega tudo em paralelo e resolve quando todos os itens terminam. Imagens são decodificadas e enviadas à GPU (Graphics Processing Unit, a placa de vídeo) como texturas, sons são decodificados no gerenciador de áudio e fontes são registradas em `document.fonts`. Se algum item falhar, a promise é rejeitada.',
          ),
        },
        {
          type: 'props',
          title: t('AssetManifest', 'AssetManifest'),
          rows: [
            { name: 'images', type: 'ImageEntry[]', description: t('Each entry is a URL string (the URL is also the key) or an `ImageVariants` object.', 'Cada entrada é uma string de URL (Uniform Resource Locator; a URL também é a chave) ou um objeto `ImageVariants`.') },
            { name: 'sounds', type: 'string[]', description: t('URLs fetched and decoded; the URL is the sound key.', 'URLs buscadas e decodificadas; a URL é a chave do som.') },
            { name: 'fonts', type: 'Array<{ family: string; url: string }>', description: t('Loaded with `FontFace` and added to the document.', 'Carregadas com `FontFace` e adicionadas ao documento.') },
          ],
        },
        {
          type: 'props',
          title: t('LoadProgress (passed to onProgress)', 'LoadProgress (passado a onProgress)'),
          rows: [
            { name: 'loaded', type: 'number', description: t('Items finished so far.', 'Itens concluídos até agora.') },
            { name: 'total', type: 'number', description: t('Items in the manifest.', 'Itens no manifesto.') },
            { name: 'percent', type: 'number', description: t('0 to 100.', 'De 0 a 100.') },
            { name: 'currentItem', type: 'string', description: t('Key or URL of the item that just finished.', 'Chave ou URL do item que acabou de terminar.') },
          ],
        },
        {
          type: 'p',
          text: t(
            '`setBaseUrl(url)` prefixes every manifest URL (a trailing slash is added if missing). Textures are cached under the key, not the prefixed URL.',
            '`setBaseUrl(url)` adiciona um prefixo a toda URL do manifesto (uma barra final é acrescentada se faltar). As texturas ficam em cache sob a chave, não sob a URL com prefixo.',
          ),
        },
      ],
    },
    {
      id: 'variants',
      title: t('Image variants', 'Variantes de imagem'),
      blocks: [
        {
          type: 'p',
          text: t(
            'An `ImageVariants` object lets one logical key point to different files per platform or pixel density. The engine picks the URL once, at load time, using [PlatformDetector](/core/platform).',
            'Um objeto `ImageVariants` permite que uma chave lógica aponte para arquivos diferentes por plataforma ou densidade de pixels. A engine escolhe a URL uma vez, na hora do carregamento, usando o [PlatformDetector](/core/platform).',
          ),
        },
        {
          type: 'props',
          title: t('ImageVariants', 'ImageVariants'),
          rows: [
            { name: 'key', type: 'string', required: true, description: t('Name used to look the texture up later.', 'Nome usado para buscar a textura depois.') },
            { name: 'default', type: 'string', required: true, description: t('Always-available fallback URL.', 'URL de reserva, sempre disponível.') },
            { name: 'hd', type: 'string', description: t('Used when the display is high density (`devicePixelRatio >= 2`).', 'Usada quando a tela é de alta densidade (`devicePixelRatio >= 2`).') },
            { name: 'ios / android', type: 'string', description: t('Used on that platform.', 'Usadas naquela plataforma.') },
            { name: 'mobile', type: 'string', description: t('Fallback for iOS and Android when their own URL is absent.', 'Reserva para iOS e Android quando a URL própria estiver ausente.') },
            { name: 'web', type: 'string', description: t('Standard 1x browser image.', 'Imagem padrão 1x do navegador.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'Resolution order: `hd`, then the platform URL (`ios` or `android`, falling back to `mobile`), then `web`, then `default`.',
            'Ordem de resolução: `hd`, depois a URL da plataforma (`ios` ou `android`, com `mobile` como reserva), depois `web`, depois `default`.',
          ),
        },
      ],
    },
    {
      id: 'lookup',
      title: t('Reading loaded assets', 'Lendo assets carregados'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'getTexture(key)', type: 'Texture | undefined', description: t('The GPU texture for a loaded image. Pass it to `Sprite` or `AnimatedSprite`.', 'A textura de GPU de uma imagem carregada. Passe-a a `Sprite` ou `AnimatedSprite`.') },
            { name: 'getImage(key)', type: 'HTMLImageElement | undefined', description: t('The decoded DOM image.', 'A imagem decodificada (`HTMLImageElement`).') },
            { name: 'loadImageFromUrl(url)', type: 'Promise<Texture>', description: t('Loads one image on demand and returns its texture; returns the cached texture if the key was already loaded. Note that `baseUrl` is prepended for the fetch but the key stays the plain `url`.', 'Carrega uma imagem sob demanda e retorna a textura; devolve a textura em cache se a chave já foi carregada. Note que `baseUrl` é acrescentada na requisição, mas a chave continua sendo a `url` simples.') },
          ],
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Load in onCreate', 'Carregue no onCreate'),
          text: t(
            'Scene `onCreate` is awaited by the scene manager, so it is the natural place to `await app.assets.load(...)`.',
            'O `onCreate` da cena é aguardado pelo gerenciador de cenas, então é o lugar natural para `await app.assets.load(...)`.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example', 'Exemplo'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/loading.ts',
          check: 'compile',
          code: `import { App, Scene, Sprite, Text } from 'easy-game-maker'
import type { SceneParams } from 'easy-game-maker'

// Start it with: app.goto('boot', { params: { app } })
class Boot extends Scene {
  async onCreate(params?: SceneParams): Promise<void> {
    const app = params?.app as App
    const status = new Text({ text: 'Loading 0%', x: 20, y: 20, fontSize: 20 })
    status.anchorX = status.anchorY = 0
    this.add(status)

    app.assets.setBaseUrl('/assets')
    await app.assets.load(
      {
        images: [
          'hero.png',
          { key: 'bg', default: 'bg.png', hd: 'bg@2x.png', mobile: 'bg-small.png' },
        ],
        sounds: ['jump.wav'],
      },
      (p) => {
        status.text = 'Loading ' + Math.round(p.percent) + '%'
      },
    )

    const hero = app.assets.getTexture('hero.png')
    if (hero) this.add(new Sprite({ texture: hero, x: 200, y: 200 }))
  }
}

export { Boot }`,
        },
      ],
    },
  ],
}

export default page
