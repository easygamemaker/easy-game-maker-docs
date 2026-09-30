import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/display/circle-shape',
  title: t('CircleShape', 'CircleShape'),
  description: t(
    'A filled circle with an optional outline, baked into a texture the first time it is drawn.',
    'Um círculo preenchido com contorno opcional, gerado em uma textura na primeira vez que é desenhado.',
  ),
  source: 'src/engine/display/CircleShape.ts',
  related: ['/display/rect-shape', '/display/polygon-shape', '/physics/body', '/display/display-object'],
  sections: [
    {
      id: 'options',
      title: t('Options and members', 'Opções e membros'),
      blocks: [
        {
          type: 'props',
          title: t('Constructor options', 'Opções do construtor'),
          rows: [
            { name: 'x, y', type: 'number', default: '0', description: t('Center of the circle.', 'Centro do círculo.') },
            { name: 'radius', type: 'number', default: '32', description: t('Radius in pixels. Passing it also sets `width` and `height` to the diameter.', 'Raio em pixels. Passá-lo também define `width` e `height` como o diâmetro.') },
            { name: 'fill', type: 'string', default: "'#ffffff'", description: t('Hex color: `#RGB`, `#RGBA`, `#RRGGBB` or `#RRGGBBAA`. Anything else falls back to white.', 'Cor hexadecimal: `#RGB`, `#RGBA`, `#RRGGBB` ou `#RRGGBBAA`. Qualquer outra coisa vira branco.') },
            { name: 'stroke, strokeWidth', type: 'string, number', description: t('Outline color and width in pixels.', 'Cor e largura do contorno em pixels.') },
            { name: 'name', type: 'string', description: t('Optional label.', 'Rótulo opcional.') },
          ],
        },
        {
          type: 'props',
          title: t('Public members', 'Membros públicos'),
          rows: [
            { name: 'radius', type: 'number', default: '32', description: t('Changing it later changes the drawn size and the texture is rebuilt automatically. `width`/`height` are not updated.', 'Alterá-lo depois muda o tamanho desenhado e a textura é refeita automaticamente. `width`/`height` não são atualizados.') },
            { name: 'fillColor, strokeColor', type: '[number, number, number, number]', description: t('Normalized RGBA (Red, Green, Blue, Alpha). Assign a new tuple; the texture is rebuilt on the next frame.', 'RGBA (Red, Green, Blue, Alpha) normalizado. Atribua uma nova tupla; a textura é refeita no quadro seguinte.') },
            { name: 'strokeWidth', type: 'number', default: '0', description: t('Outline width.', 'Largura do contorno.') },
            { name: 'markDirty()', type: 'void', description: t('Tells the renderer to bake the circle texture again next frame.', 'Avisa o renderer para gerar de novo a textura do círculo no próximo quadro.') },
            { name: 'getBounds()', type: 'Bounds', description: t('The square around the circle, centered on `x, y`.', 'O quadrado em volta do círculo, centrado em `x, y`.') },
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Anchor and colors', 'Âncora e cores'),
          text: t(
            'The circle honors `anchorX`/`anchorY` (default 0.5, the center) and `getBounds()` follows the anchor. Fill and outline are baked into one canvas texture in their own colors, so the outline is not tinted by the fill, and changing `fillColor`, `strokeColor`, `strokeWidth` or `radius` is picked up on the next frame.',
            'O círculo respeita `anchorX`/`anchorY` (padrão 0,5, o centro) e `getBounds()` segue a âncora. Preenchimento e contorno são gerados em uma textura de canvas, cada um na sua cor, então o contorno não é tingido pelo preenchimento, e mudanças em `fillColor`, `strokeColor`, `strokeWidth` ou `radius` são percebidas no quadro seguinte.',
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
          filename: 'src/circles.ts',
          check: 'compile',
          code: `import { CircleShape, Scene } from 'easy-game-maker'

export class Bubble extends Scene {
  private bubble!: CircleShape
  private time = 0
  private grown = false

  onCreate(): void {
    this.bubble = new CircleShape({ x: 180, y: 320, radius: 40, fill: '#ffd166', stroke: '#ffd166', strokeWidth: 4 })
    this.add(this.bubble)
  }

  onUpdate(dt: number): void {
    this.time += dt
    this.bubble.scaleX = this.bubble.scaleY = 1 + 0.15 * Math.sin(this.time * 4) // scale needs no rebake
    if (this.time > 2 && !this.grown) {
      this.grown = true
      this.bubble.radius = 60
      this.bubble.markDirty() // radius change needs a rebake
    }
  }
}`,
        },
      ],
    },
  ],
}

export default page
