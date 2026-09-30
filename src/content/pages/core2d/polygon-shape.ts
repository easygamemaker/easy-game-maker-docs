import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/display/polygon-shape',
  title: t('PolygonShape', 'PolygonShape'),
  description: t(
    'A filled polygon defined by local-space vertices, baked into a texture. Good for triangles, stars and custom shapes.',
    'Um polígono preenchido definido por vértices no espaço local, gerado em uma textura. Bom para triângulos, estrelas e formas personalizadas.',
  ),
  source: 'src/engine/display/PolygonShape.ts',
  related: ['/display/rect-shape', '/display/circle-shape', '/display/line-shape', '/physics/body'],
  sections: [
    {
      id: 'options',
      title: t('Options and members', 'Opções e membros'),
      blocks: [
        {
          type: 'props',
          title: t('Constructor options', 'Opções do construtor'),
          rows: [
            { name: 'points', type: '[number, number][]', description: t('Vertices as `[x, y]` pairs relative to the polygon origin (`x, y`). At least 3 are needed to draw anything.', 'Vértices como pares `[x, y]` relativos à origem do polígono (`x, y`). São necessários pelo menos 3 para desenhar algo.') },
            { name: 'fill', type: 'string', default: "'#ffffff'", description: t('Hex color: `#RGB`, `#RGBA`, `#RRGGBB` or `#RRGGBBAA`. Anything else falls back to white.', 'Cor hexadecimal: `#RGB`, `#RGBA`, `#RRGGBB` ou `#RRGGBBAA`. Qualquer outra coisa vira branco.') },
            { name: 'stroke, strokeWidth', type: 'string, number', description: t('Outline color and width.', 'Cor e largura do contorno.') },
            { name: 'x, y', type: 'number', default: '0', description: t('Where the local origin sits in the parent.', 'Onde a origem local fica no pai.') },
            { name: 'name', type: 'string', description: t('Optional label.', 'Rótulo opcional.') },
          ],
        },
        {
          type: 'props',
          title: t('Members', 'Membros'),
          rows: [
            { name: 'points', type: '[number, number][]', description: t('The current vertices. Prefer `setPoints`.', 'Os vértices atuais. Prefira `setPoints`.') },
            { name: 'setPoints(points)', type: 'this', description: t('Replaces all vertices, recomputes the bounds and marks the polygon for re-baking.', 'Substitui todos os vértices, recalcula os limites e marca o polígono para ser gerado de novo.') },
            { name: 'markDirty()', type: 'void', description: t('Call after changing `strokeWidth` (it pads the bounds) or mutating `points` in place. Changes to `fillColor` and `strokeColor` are picked up on their own.', 'Chame depois de alterar `strokeWidth` (ele aumenta os limites) ou de mudar `points` no lugar. Mudanças em `fillColor` e `strokeColor` são percebidas sozinhas.') },
            { name: 'fillColor, strokeColor', type: '[number, number, number, number]', description: t('Normalized RGBA (Red, Green, Blue, Alpha).', 'RGBA (Red, Green, Blue, Alpha) normalizado.') },
            { name: 'localBounds', type: '{ minX, minY, maxX, maxY }', readonly: true, description: t('Box around the vertices, padded by `strokeWidth`.', 'Caixa em volta dos vértices, com folga de `strokeWidth`.') },
            { name: 'getBounds()', type: 'Bounds', description: t('`localBounds` offset by `x, y`. It does not use the anchor.', '`localBounds` deslocado por `x, y`. Não usa a âncora.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Vertices are relative to the origin', 'Vértices são relativos à origem'),
          text: t(
            'Points are drawn where you give them, not re-centered. A star defined around `[0, 0]` is centered on `x, y`; a shape whose points start at `[0, 0]` and grow right/down hangs from `x, y` like a top-left origin. Fill and outline are baked into one texture in their own colors, so the outline is not tinted by the fill. Use 6 or 8 digit hex colors.',
            'Os pontos são desenhados onde você os coloca, sem recentralizar. Uma estrela definida em torno de `[0, 0]` fica centrada em `x, y`; uma forma cujos pontos começam em `[0, 0]` e crescem para a direita e para baixo fica pendurada em `x, y`, como uma origem no canto superior esquerdo. Preenchimento e contorno são gerados em uma só textura, cada um na sua cor, então o contorno não é tingido pelo preenchimento. Use cores hexadecimais de 6 ou 8 dígitos.',
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
          filename: 'src/polygons.ts',
          check: 'compile',
          code: `import { PolygonShape, Scene } from 'easy-game-maker'

export class Shapes extends Scene {
  private star!: PolygonShape

  onCreate(): void {
    this.star = new PolygonShape({
      x: 180,
      y: 200,
      points: [[0, -50], [14, -14], [48, -15], [24, 8], [30, 44], [0, 25], [-30, 44], [-24, 8], [-48, -15], [-14, -14]],
      fill: '#f59e0b',
    })
    this.add(this.star)

    this.add(new PolygonShape({ x: 180, y: 400, points: [[0, -40], [35, 20], [-35, 20]], fill: '#3b82f6' }))
  }

  onUpdate(dt: number): void {
    this.star.rotation += dt // rotation needs no rebake
  }

  makeSpiky(): void {
    this.star.setPoints([[0, -70], [20, 0], [0, 70], [-20, 0]])
  }
}`,
        },
      ],
    },
  ],
}

export default page
