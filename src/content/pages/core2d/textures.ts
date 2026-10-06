import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/textures',
  title: t('Texture and TextureCache', 'Texture e TextureCache'),
  description: t(
    'A Texture wraps a WebGL texture with its pixel size; the TextureCache stores them by key.',
    'Uma Texture envolve uma textura WebGL (Web Graphics Library) com seu tamanho em pixels; o TextureCache as guarda por chave.',
  ),
  source: 'src/engine/renderer/Texture.ts',
  related: ['/core/texture-atlas', '/core/assets', '/core/renderer', '/display/sprite', '/display/animated-sprite'],
  sections: [
    {
      id: 'texture',
      title: t('Texture', 'Texture'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A `Texture` is a small immutable handle: `glTexture` (the raw `WebGLTexture`), `width` and `height`, plus the optional `region`, `anchor` and `trim` of a sub-texture. You rarely construct one yourself. `app.assets.getTexture(key)` returns textures for loaded images, and `Sprite` and `AnimatedSprite` accept them directly.',
            'Uma `Texture` é um pequeno handle imutável: `glTexture` (o `WebGLTexture` bruto), `width` e `height`, mais os opcionais `region`, `anchor` e `trim` de uma sub-textura. Você raramente constrói uma diretamente. `app.assets.getTexture(key)` devolve as texturas das imagens carregadas, e `Sprite` e `AnimatedSprite` as aceitam direto.',
          ),
        },
        {
          type: 'props',
          title: t('Static factories', 'Fábricas estáticas'),
          rows: [
            { name: 'Texture.fromImage(gl, source, filter?)', type: 'Texture', description: t("Uploads an `HTMLImageElement` or `ImageBitmap` with clamp-to-edge wrapping. `filter` is `'linear'` (the default, smooth) or `'nearest'` (crisp pixels, for pixel art).", "Envia uma `HTMLImageElement` ou `ImageBitmap` com repetição por borda (clamp-to-edge). O `filter` é `'linear'` (o padrão, suave) ou `'nearest'` (pixels nítidos, para pixel art).") },
            { name: 'Texture.region(base, x, y, w, h, options?)', type: 'Texture', description: t("A sub-texture: a window of `base` (in pixels of `base`, from its top left corner) that shares the same GPU texture, so sprites using different regions of one image batch into one draw call. Its `width` and `height` are `w` and `h`, so a `Sprite` draws the window at 1:1. `base` may itself be a region (coordinates are relative to it). Throws `RangeError` when the window is empty or leaves `base`. `options` takes an `anchor` (`{ x, y }`, a fraction of the region, may fall outside 0..1) and `trim` data.", "Uma sub-textura: uma janela de `base` (em pixels de `base`, a partir do canto superior esquerdo) que compartilha a mesma textura da GPU (Graphics Processing Unit), então sprites que usam regiões diferentes de uma imagem entram em uma única chamada de desenho. O `width` e o `height` dela são `w` e `h`, então um `Sprite` desenha a janela em 1:1. A `base` pode ser ela mesma uma região (as coordenadas são relativas a ela). Lança `RangeError` quando a janela é vazia ou sai de `base`. O `options` aceita uma `anchor` (`{ x, y }`, uma fração da região, pode cair fora de 0..1) e dados de `trim`.") },
            { name: 'Texture.fromCanvas(gl, canvas)', type: 'Texture', description: t('Uploads a 2D canvas. This is how text, circles and polygons are baked.', 'Envia um canvas 2D. É assim que texto, círculos e polígonos são gerados.') },
            { name: 'Texture.createWhite(gl)', type: 'Texture', description: t('A 1x1 white pixel, used by the renderer to draw tinted rectangles.', 'Um pixel branco 1x1, usado pelo renderer para desenhar retângulos coloridos.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'All factories need the WebGL2 context, available as `app.renderer.gl` after `init()`.',
            'Todas as fábricas precisam do contexto WebGL2, disponível como `app.renderer.gl` depois de `init()`.',
          ),
        },
      ],
    },
    {
      id: 'cache',
      title: t('TextureCache', 'TextureCache'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The renderer owns one cache, exposed as `app.renderer.textureCache`. It is a thin `Map` wrapper.',
            'O renderer possui um cache, exposto como `app.renderer.textureCache`. É um wrapper fino sobre um `Map`.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'set(key, texture)', type: 'void', description: t('Stores a texture.', 'Guarda uma textura.') },
            { name: 'get(key)', type: 'Texture | undefined', description: t('Looks a texture up.', 'Busca uma textura.') },
            { name: 'has(key)', type: 'boolean', description: t('Whether the key exists.', 'Se a chave existe.') },
            { name: 'delete(key)', type: 'void', description: t('Removes the entry from the cache only.', 'Remove a entrada apenas do cache.') },
            { name: 'clear()', type: 'void', description: t('Empties the cache.', 'Esvazia o cache.') },
            { name: 'size', type: 'number', readonly: true, description: t('Number of cached textures.', 'Número de texturas em cache.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('No GPU cleanup', 'Sem liberação de memória'),
          text: t(
            '`delete` and `clear` only drop the references. Neither calls `gl.deleteTexture`, so the GPU memory is not freed explicitly by the engine.',
            '`delete` e `clear` apenas descartam as referências. Nenhum chama `gl.deleteTexture`, então a engine não libera explicitamente a memória da GPU.',
          ),
        },
        {
          type: 'p',
          text: t(
            '`renderer.uploadTexture(key, source, filter?)` uploads an image and registers it in the cache under `key`. It is idempotent per key: if the key already exists it returns the cached texture and ignores the new `source` **and** the new `filter` (nothing is uploaded again, so pick a distinct key per filter). Call `textureCache.delete(key)` first to replace a texture. `renderer.releaseTexture(key)` deletes the GPU texture cached under `key` and forgets it; sub-textures of it stop drawing.',
            '`renderer.uploadTexture(key, source, filter?)` envia uma imagem e a registra no cache sob `key`. É idempotente por chave: se a chave já existe, devolve a textura em cache e ignora a nova `source` **e** o novo `filter` (nada é enviado de novo, então use uma chave distinta por filtro). Chame `textureCache.delete(key)` antes para trocar uma textura. `renderer.releaseTexture(key)` apaga a textura da GPU guardada em `key` e a esquece; as sub-texturas dela deixam de desenhar.',
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
          filename: 'src/procedural-texture.ts',
          check: 'compile',
          code: `import { App, Sprite, Texture } from 'easy-game-maker'

export function makeCheckerSprite(app: App): Sprite {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext('2d')!
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle = (i + j) % 2 === 0 ? '#ffffff' : '#334155'
      ctx.fillRect(i * 8, j * 8, 8, 8)
    }
  }

  const texture = Texture.fromCanvas(app.renderer.gl, canvas)
  app.renderer.textureCache.set('checker', texture)

  return new Sprite({ texture, x: 200, y: 150 })
}`,
        },
      ],
    },
  ],
}

export default page
