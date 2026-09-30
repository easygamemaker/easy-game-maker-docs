import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/display/display-object',
  title: t('DisplayObject', 'DisplayObject'),
  description: t(
    'The abstract base of everything on screen: position, rotation, scale, alpha, anchor, z-order and transforms.',
    'A base abstrata de tudo o que aparece na tela: posição, rotação, escala, alpha, âncora, ordem de profundidade e transformações.',
  ),
  source: 'src/engine/display/DisplayObject.ts',
  related: ['/display/group', '/display/sprite', '/core/events', '/math/mat3'],
  sections: [
    {
      id: 'props',
      title: t('Properties', 'Propriedades'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`DisplayObject` extends [EventEmitter](/core/events) and is abstract: you use its subclasses (`Sprite`, `RectShape`, `Text`, `Group` and so on). Coordinates are pixels with the origin at the top-left of the canvas and `y` growing downward.',
            '`DisplayObject` estende [EventEmitter](/core/events) e é abstrato: você usa suas subclasses (`Sprite`, `RectShape`, `Text`, `Group` e assim por diante). As coordenadas são em pixels, com origem no canto superior esquerdo do canvas e `y` crescendo para baixo.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'name', type: 'string', default: "''", description: t('Free label. `scene.getById(id)` matches on it, and the visual editor sets it from the object id.', 'Rótulo livre. `scene.getById(id)` compara com ele, e o editor visual o define a partir do id do objeto.') },
            { name: 'x, y', type: 'number', default: '0', description: t('Position relative to the parent.', 'Posição relativa ao pai.') },
            { name: 'rotation', type: 'number', default: '0', description: t('Radians, clockwise on screen.', 'Radianos, no sentido horário na tela.') },
            { name: 'scaleX, scaleY', type: 'number', default: '1', description: t('Scale around the object origin (its `x, y`).', 'Escala em torno da origem do objeto (seu `x, y`).') },
            { name: 'alpha', type: 'number', default: '1', description: t('Opacity from 0 to 1, multiplied down the tree.', 'Opacidade de 0 a 1, multiplicada ao longo da árvore.') },
            { name: 'visible', type: 'boolean', default: 'true', description: t('When false the object and its children are neither drawn nor hit-tested.', 'Quando false, o objeto e seus filhos não são desenhados nem testados em hit test.') },
            { name: 'anchorX, anchorY', type: 'number', default: '0.5', description: t('Which point of the object sits on `x, y`: 0 is left/top, 0.5 center, 1 right/bottom.', 'Qual ponto do objeto fica sobre `x, y`: 0 é esquerda/topo, 0,5 centro, 1 direita/base.') },
            { name: 'width, height', type: 'number', default: '0', description: t('Size in pixels before scaling. Shapes and sprites use it for drawing.', 'Tamanho em pixels antes da escala. Formas e sprites o usam para desenhar.') },
            { name: 'zIndex', type: 'number', default: '0', description: t('Draw order among siblings. Lower is behind; ties keep insertion order.', 'Ordem de desenho entre irmãos. Menor fica atrás; empates mantêm a ordem de inserção.') },
            { name: 'parent', type: 'Group | null', description: t('Set by `Group.add`. Do not assign it directly.', 'Definido por `Group.add`. Não o atribua diretamente.') },
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Anchor is not a transform pivot', 'A âncora não é um pivô de transformação'),
          text: t(
            'The anchor decides how the quad is placed relative to `x, y` when drawing. Rotation and scale still pivot on `x, y` itself, which for a centered object (anchor 0.5) is its middle.',
            'A âncora decide como o quad é posicionado em relação a `x, y` ao desenhar. Rotação e escala continuam girando em torno de `x, y`, que em um objeto centrado (âncora 0,5) é o seu meio.',
          ),
        },
      ],
    },
    {
      id: 'methods',
      title: t('Methods and getters', 'Métodos e getters'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'localTransform', type: 'Float32Array', readonly: true, description: t('A [Mat3](/math/mat3) built from position, rotation and scale. Allocates a new array on every read.', 'Uma [Mat3](/math/mat3) montada de posição, rotação e escala. Aloca um novo array a cada leitura.') },
            { name: 'worldTransform', type: 'Float32Array', readonly: true, description: t('The local transform multiplied by every ancestor.', 'A transformação local multiplicada por todos os ancestrais.') },
            { name: 'worldAlpha', type: 'number', readonly: true, description: t('Own alpha times all ancestors alphas.', 'O alpha próprio vezes os alphas de todos os ancestrais.') },
            { name: 'getBounds()', type: 'Bounds', description: t('Abstract. Returns `{ x, y, width, height }` of the top-left corner and size. Each subclass computes it its own way.', 'Abstrato. Retorna `{ x, y, width, height }` do canto superior esquerdo e do tamanho. Cada subclasse o calcula à sua maneira.') },
            { name: 'removeFromParent()', type: 'void', description: t('Detaches from the current parent, if any.', 'Desanexa do pai atual, se houver.') },
            { name: 'destroy()', type: 'void', description: t('Removes all event listeners. It does not detach the object from its parent.', 'Remove todos os listeners de evento. Não desanexa o objeto do pai.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('getBounds is local to the parent', 'getBounds é local ao pai'),
          text: t(
            '`getBounds()` uses `x`, `y` and the anchor only. It ignores rotation and scale, and it is not converted to world coordinates for nested objects.',
            '`getBounds()` usa apenas `x`, `y` e a âncora. Ignora rotação e escala, e não é convertido para coordenadas do mundo em objetos aninhados.',
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
          filename: 'src/transform.ts',
          check: 'compile',
          code: `import { Scene, RectShape } from 'easy-game-maker'

export class Spinner extends Scene {
  private card!: RectShape

  onCreate(): void {
    this.card = new RectShape({ x: 200, y: 150, width: 100, height: 60, fill: '#118ab2', name: 'card' })
    this.card.anchorX = 0 // x, y now marks the left edge instead of the center
    this.card.alpha = 0.9
    this.card.zIndex = 5
    this.card.on('done', () => console.log('spun'))
    this.add(this.card)
  }

  onUpdate(dt: number): void {
    this.card.rotation += Math.PI * dt
    this.card.scaleX = 1 + 0.2 * Math.sin(this.card.rotation)
    if (this.card.rotation > Math.PI * 4) this.card.emit('done', null)
  }
}`,
        },
      ],
    },
  ],
}

export default page
