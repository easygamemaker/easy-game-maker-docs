import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/textures',
  title: t('Texture and TextureCache', 'Texture e TextureCache'),
  description: t(
    'A Texture wraps a WebGL texture with its pixel size; the TextureCache stores them by key.',
    'Uma Texture envolve uma textura WebGL (Web Graphics Library) com seu tamanho em pixels; o TextureCache as guarda por chave.',
  ),
  source: 'src/engine/renderer/Texture.ts',
  related: ['/core/assets', '/core/renderer', '/display/sprite', '/display/animated-sprite'],
  sections: [
    {
      id: 'texture',
      title: t('Texture', 'Texture'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A `Texture` is a small immutable handle: `glTexture` (the raw `WebGLTexture`), `width` and `height`. You rarely construct one yourself. `app.assets.getTexture(key)` returns textures for loaded images, and `Sprite` and `AnimatedSprite` accept them directly.',
            'Uma `Texture` é um pequeno handle imutável: `glTexture` (o `WebGLTexture` bruto), `width` e `height`. Você raramente constrói uma diretamente. `app.assets.getTexture(key)` devolve as texturas das imagens carregadas, e `Sprite` e `AnimatedSprite` as aceitam direto.',
          ),
        },
        {
          type: 'props',
          title: t('Static factories', 'Fábricas estáticas'),
          rows: [
            { name: 'Texture.fromImage(gl, source)', type: 'Texture', description: t('Uploads an `HTMLImageElement` or `ImageBitmap`. Uses linear filtering and clamp-to-edge wrapping.', 'Envia uma `HTMLImageElement` ou `ImageBitmap`. Usa filtragem linear e repetição por borda (clamp-to-edge).') },
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
            '`delete` e `clear` apenas descartam as referências. Nenhum chama `gl.deleteTexture`, então a engine não libera explicitamente a memória da GPU (Graphics Processing Unit).',
          ),
        },
        {
          type: 'p',
          text: t(
            '`renderer.uploadTexture(key, source)` is idempotent: if the key already exists it returns the cached texture and ignores the new source.',
            '`renderer.uploadTexture(key, source)` é idempotente: se a chave já existe, devolve a textura em cache e ignora a nova fonte.',
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
