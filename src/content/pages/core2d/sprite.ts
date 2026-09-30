import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/display/sprite',
  title: t('Sprite', 'Sprite'),
  description: t(
    'Draws a texture at a position, with size, tint and the usual transform properties.',
    'Desenha uma textura em uma posição, com tamanho, cor de tingimento e as propriedades de transformação usuais.',
  ),
  source: 'src/engine/display/Sprite.ts',
  related: ['/display/animated-sprite', '/core/assets', '/core/textures', '/display/display-object'],
  sections: [
    {
      id: 'create',
      title: t('Creating a sprite', 'Criando um sprite'),
      blocks: [
        {
          type: 'props',
          title: t('Constructor options', 'Opções do construtor'),
          rows: [
            { name: 'texture', type: 'Texture', description: t('What to draw. Without a texture the sprite draws nothing.', 'O que desenhar. Sem textura, o sprite não desenha nada.') },
            { name: 'x, y', type: 'number', default: '0', description: t('Position (the anchor point).', 'Posição (o ponto da âncora).') },
            { name: 'width, height', type: 'number', default: '0', description: t('Drawn size. When 0 the texture size is used.', 'Tamanho desenhado. Quando 0, usa-se o tamanho da textura.') },
            { name: 'name', type: 'string', description: t('Optional label.', 'Rótulo opcional.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'The usual way to get a texture is `app.assets.getTexture(key)` after [loading a manifest](/core/assets). For a one-off image, `Sprite.fromUrl(url, app, options?)` loads and creates the sprite in a single call, and `sprite.setUrl(url, app)` swaps the texture of an existing one. Both fill `width` and `height` from the image when they are still 0.',
            'O jeito usual de obter uma textura é `app.assets.getTexture(key)` depois de [carregar um manifesto](/core/assets). Para uma imagem avulsa, `Sprite.fromUrl(url, app, options?)` carrega e cria o sprite em uma só chamada, e `sprite.setUrl(url, app)` troca a textura de um existente. Ambos preenchem `width` e `height` a partir da imagem quando ainda são 0.',
          ),
        },
      ],
    },
    {
      id: 'members',
      title: t('Members', 'Membros'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'texture', type: 'Texture | null', description: t('Assign a new one at any time.', 'Atribua uma nova a qualquer momento.') },
            { name: 'tint', type: '[number, number, number, number]', default: '[1, 1, 1, 1]', description: t('RGBA (Red, Green, Blue, Alpha) multiplier from 0 to 1. `[1,1,1,1]` shows the texture unchanged.', 'Multiplicador RGBA (Red, Green, Blue, Alpha, ou seja, vermelho, verde, azul e opacidade) de 0 a 1. `[1,1,1,1]` mostra a textura sem alteração.') },
            { name: 'setTintRGB(r, g, b)', type: 'void', description: t('Sets `tint` with alpha 1.', 'Define `tint` com alpha 1.') },
            { name: 'displayWidth, displayHeight', type: 'number', readonly: true, description: t('`width`/`height`, or the texture size when they are 0.', '`width`/`height`, ou o tamanho da textura quando são 0.') },
            { name: 'getBounds()', type: 'Bounds', description: t('Top-left corner and size using the anchor (default 0.5, so `x, y` is the center).', 'Canto superior esquerdo e tamanho usando a âncora (padrão 0,5, então `x, y` é o centro).') },
          ],
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Flip and stretch', 'Espelhar e esticar'),
          text: t(
            'Use `scaleX = -1` to mirror a sprite horizontally, and set `width`/`height` to stretch it.',
            'Use `scaleX = -1` para espelhar um sprite na horizontal, e defina `width`/`height` para esticá-lo.',
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
          filename: 'src/sprites.ts',
          check: 'compile',
          code: `import { App, Scene, Sprite } from 'easy-game-maker'
import type { SceneParams } from 'easy-game-maker'

class Play extends Scene {
  private hero!: Sprite

  async onCreate(params?: SceneParams): Promise<void> {
    const app = params?.app as App

    // One call: fetch the image, upload it and build the sprite.
    this.hero = await Sprite.fromUrl('/assets/hero.png', app, { x: 180, y: 320, name: 'hero' })
    this.hero.setTintRGB(1, 0.8, 0.8)
    this.hero.scaleX = -1 // face left
    this.add(this.hero)
  }

  onUpdate(dt: number): void {
    if (this.hero) this.hero.y -= 20 * dt
  }
}

export { Play }`,
        },
      ],
    },
  ],
}

export default page
