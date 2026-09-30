import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/math/bounds-rect',
  title: t('BoundsRect and Bounds', 'BoundsRect e Bounds'),
  description: t(
    'A rectangle class with edge getters, point tests and overlap tests, plus the plain Bounds shape returned by getBounds().',
    'Uma classe de retângulo com getters de bordas, testes de ponto e de sobreposição, mais o formato simples Bounds retornado por getBounds().',
  ),
  source: 'src/engine/core/math/BoundsRect.ts',
  related: ['/math/vec2', '/display/display-object', '/display/group', '/physics/world'],
  sections: [
    {
      id: 'boundsrect',
      title: t('BoundsRect', 'BoundsRect'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`new BoundsRect(x = 0, y = 0, width = 0, height = 0)` describes an axis-aligned rectangle by its top-left corner and size. `x`, `y`, `width` and `height` are public and mutable.',
            '`new BoundsRect(x = 0, y = 0, width = 0, height = 0)` descreve um retângulo alinhado aos eixos pelo canto superior esquerdo e pelo tamanho. `x`, `y`, `width` e `height` são públicos e mutáveis.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'left, right, top, bottom', type: 'number', readonly: true, description: t('The four edges (`right = x + width`, `bottom = y + height`).', 'As quatro bordas (`right = x + width`, `bottom = y + height`).') },
            { name: 'centerX, centerY', type: 'number', readonly: true, description: t('Center of the rectangle.', 'Centro do retângulo.') },
            { name: 'contains(px, py)', type: 'boolean', description: t('True if the point is inside; the edges count as inside.', 'True se o ponto está dentro; as bordas contam como dentro.') },
            { name: 'intersects(other)', type: 'boolean', description: t('True if the rectangles overlap. Rectangles that only touch along an edge do not intersect.', 'True se os retângulos se sobrepõem. Retângulos que só se tocam em uma borda não se intersectam.') },
            { name: 'clone()', type: 'BoundsRect', description: t('A copy.', 'Uma cópia.') },
            { name: 'BoundsRect.fromPoints(topLeft, size)', type: 'BoundsRect', description: t('Builds one from two [Vec2](/math/vec2): position and size.', 'Cria um a partir de dois [Vec2](/math/vec2): posição e tamanho.') },
          ],
        },
      ],
    },
    {
      id: 'bounds',
      title: t('The Bounds type', 'O tipo Bounds'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`Bounds` is a plain interface `{ x, y, width, height }`, and it is what `DisplayObject.getBounds()` returns. It has no methods. To use `contains` or `intersects` with it, wrap it: `new BoundsRect(b.x, b.y, b.width, b.height)`.',
            '`Bounds` é uma interface simples `{ x, y, width, height }`, e é o que `DisplayObject.getBounds()` retorna. Não tem métodos. Para usar `contains` ou `intersects` com ele, envolva-o: `new BoundsRect(b.x, b.y, b.width, b.height)`.',
          ),
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Good for simple overlap checks', 'Bom para checagens simples de sobreposição'),
          text: t(
            'Bounds ignore rotation and scale (see [DisplayObject](/display/display-object)). For accurate collisions on rotated or moving bodies use the [physics world](/physics/world).',
            'Os limites ignoram rotação e escala (veja [DisplayObject](/display/display-object)). Para colisões precisas em corpos rotacionados ou em movimento, use o [mundo de física](/physics/world).',
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
          filename: 'src/overlap.ts',
          check: 'compile',
          code: `import { BoundsRect, DisplayObject, RectShape, Scene } from 'easy-game-maker'

function rectOf(obj: DisplayObject): BoundsRect {
  const b = obj.getBounds()
  return new BoundsRect(b.x, b.y, b.width, b.height)
}

export class Overlap extends Scene {
  private player!: RectShape
  private coin!: RectShape

  onCreate(): void {
    this.player = new RectShape({ x: 100, y: 100, width: 40, height: 40, fill: '#118ab2' })
    this.coin = new RectShape({ x: 200, y: 100, width: 20, height: 20, fill: '#ffd166' })
    this.add(this.player, this.coin)
  }

  onUpdate(dt: number): void {
    this.player.x += 60 * dt
    if (this.coin.visible && rectOf(this.player).intersects(rectOf(this.coin))) {
      this.coin.visible = false
    }
  }
}`,
        },
      ],
    },
  ],
}

export default page
