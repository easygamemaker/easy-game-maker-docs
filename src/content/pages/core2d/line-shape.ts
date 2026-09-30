import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/display/line-shape',
  title: t('LineShape', 'LineShape'),
  description: t(
    'A straight line segment from (x, y) to (x2, y2), drawn with a stroke color and width.',
    'Um segmento de reta de (x, y) a (x2, y2), desenhado com cor e espessura de traço.',
  ),
  source: 'src/engine/display/LineShape.ts',
  related: ['/display/polygon-shape', '/display/rect-shape', '/core/renderer', '/display/display-object'],
  sections: [
    {
      id: 'model',
      title: t('Data model', 'Modelo de dados'),
      blocks: [
        {
          type: 'props',
          title: t('Constructor options', 'Opções do construtor'),
          rows: [
            { name: 'x, y', type: 'number', default: '0', description: t('Start point.', 'Ponto inicial.') },
            { name: 'x2, y2', type: 'number', default: '0', description: t('End point.', 'Ponto final.') },
            { name: 'strokeWidth', type: 'number', default: '1', description: t('Line thickness in pixels.', 'Espessura da linha em pixels.') },
            { name: 'stroke', type: 'string', default: "'#ffffff'", description: t('Line color as hex `#RRGGBB` or `#RRGGBBAA`. Sets `strokeColor`.', 'Cor da linha em hexadecimal `#RRGGBB` ou `#RRGGBBAA`. Define `strokeColor`.') },
            { name: 'name', type: 'string', description: t('Optional label.', 'Rótulo opcional.') },
          ],
        },
        {
          type: 'props',
          title: t('Members', 'Membros'),
          rows: [
            { name: 'strokeColor', type: '[number, number, number, number]', default: '[1,1,1,1]', description: t('Normalized RGBA (Red, Green, Blue, Alpha), white by default.', 'RGBA (Red, Green, Blue, Alpha) normalizado, branco por padrão.') },
            { name: 'anchorX, anchorY', type: 'number', default: '0', description: t('Unlike other display objects the anchor starts at 0 (the start point).', 'Diferente de outros objetos de exibição, a âncora começa em 0 (o ponto inicial).') },
            { name: 'getBounds()', type: 'Bounds', description: t('The axis-aligned box that contains both endpoints.', 'A caixa alinhada aos eixos que contém os dois pontos.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'The [visual editor](/core/visual-scene) can also emit `LineShape` objects in a view; the loader reads `x2`, `y2` and `strokeWidth` for them, and the optional `stroke` color.',
            'O [editor visual](/core/visual-scene) também pode emitir objetos `LineShape` em uma view; o loader lê `x2`, `y2`, `strokeWidth` e a cor opcional `stroke` deles.',
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
          filename: 'src/lines.ts',
          check: 'compile',
          code: `import { LineShape, Scene } from 'easy-game-maker'

export class Lines extends Scene {
  private laser!: LineShape

  onCreate(): void {
    this.add(new LineShape({ x: 40, y: 40, x2: 320, y2: 200, stroke: '#ffffff', strokeWidth: 3 }))
    this.laser = new LineShape({ x: 40, y: 200, x2: 320, y2: 40, stroke: '#ef476f', strokeWidth: 3 })
    this.add(this.laser)
  }

  onUpdate(): void {
    // Move the end point at runtime: the line follows on the next frame.
    this.laser.x2 = 200 + 120 * Math.sin(performance.now() / 500)
  }
}`,
        },
      ],
    },
  ],
}

export default page
