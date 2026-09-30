import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/display/text',
  title: t('Text', 'Text'),
  description: t(
    'Single-line text drawn from a canvas texture that is rebuilt only when the text or its style changes.',
    'Texto de uma linha desenhado a partir de uma textura de canvas, refeita somente quando o texto ou o estilo mudam.',
  ),
  source: 'src/engine/display/Text.ts',
  related: ['/core/assets', '/display/display-object', '/display/rect-shape', '/debug/hud'],
  sections: [
    {
      id: 'options',
      title: t('Options and properties', 'Opções e propriedades'),
      blocks: [
        {
          type: 'props',
          title: t('Constructor options', 'Opções do construtor'),
          rows: [
            { name: 'text', type: 'string', default: "''", description: t('The string to show.', 'A string a exibir.') },
            { name: 'x, y', type: 'number', default: '0', description: t('Position. See the anchor note below.', 'Posição. Veja a nota sobre a âncora abaixo.') },
            { name: 'fontSize', type: 'number', default: '16', description: t('Size in pixels.', 'Tamanho em pixels.') },
            { name: 'fontFamily', type: 'string', default: "'Arial, sans-serif'", description: t('Any CSS (Cascading Style Sheets) font-family string. Load custom fonts through [assets](/core/assets) first.', 'Qualquer string de font-family do CSS (Cascading Style Sheets). Carregue fontes personalizadas antes, pelos [assets](/core/assets).') },
            { name: 'color', type: 'string', default: "'#ffffff'", description: t('Any CSS color string.', 'Qualquer string de cor CSS.') },
            { name: 'align', type: 'CanvasTextAlign', default: "'left'", description: t('Canvas text alignment.', 'Alinhamento de texto do canvas.') },
            { name: 'name', type: 'string', description: t('Optional label.', 'Rótulo opcional.') },
          ],
        },
        {
          type: 'props',
          title: t('Live properties', 'Propriedades dinâmicas'),
          rows: [
            { name: 'text, fontSize, fontFamily, color, fontWeight', type: 'string | number', description: t('Setters that mark the text dirty when the value actually changes. `fontWeight` (default `normal`) is also a constructor option.', 'Setters que marcam o texto como sujo quando o valor realmente muda. `fontWeight` (padrão `normal`) também é uma opção do construtor.') },
            { name: 'baseline', type: 'CanvasTextBaseline', default: "'top'", description: t('Plain field, read when the texture is rendered.', 'Campo simples, lido quando a textura é renderizada.') },
            { name: 'width, height', type: 'number', readonly: true, description: t('Measured as soon as the text or its style changes: text width plus 4 px, and `fontSize * 1.4`. They are available before the first frame (in a runtime without a 2D canvas they stay 0 until the first render).', 'Medidos assim que o texto ou o estilo muda: largura do texto mais 4 px, e `fontSize * 1.4`. Já valem antes do primeiro quadro (em um ambiente sem canvas 2D continuam 0 até a primeira renderização).') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Anchor defaults to the center', 'A âncora padrão é o centro'),
          text: t(
            'Like every display object, `Text` has `anchorX = anchorY = 0.5`, so `x, y` is the middle of the text box, not its top-left. For left aligned labels and HUDs set `anchorX = 0` and `anchorY = 0`.',
            'Como todo objeto de exibição, `Text` tem `anchorX = anchorY = 0.5`, então `x, y` é o meio da caixa de texto, não o canto superior esquerdo. Para rótulos alinhados à esquerda e HUDs, defina `anchorX = 0` e `anchorY = 0`.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Limits', 'Limites'),
          text: t(
            'Text is a single line: newlines are not handled. Every change to the string rebuilds and uploads a canvas texture, so avoid rewriting it every frame with the same value (equal values are ignored) or animating it with a constantly changing number if you can update less often.',
            'O texto é de uma linha: quebras de linha não são tratadas. Toda mudança na string refaz e envia uma textura de canvas, então evite reescrevê-la a cada quadro (valores iguais são ignorados) ou animá-la com um número que muda o tempo todo se puder atualizar com menos frequência.',
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
          filename: 'src/score.ts',
          check: 'compile',
          code: `import { Scene, Text } from 'easy-game-maker'

export class Hud extends Scene {
  private label!: Text
  private score = 0
  private acc = 0

  onCreate(): void {
    this.label = new Text({ text: 'Score: 0', x: 16, y: 16, fontSize: 24, color: '#ffd166' })
    this.label.anchorX = 0 // pin the top-left corner to x, y
    this.label.anchorY = 0
    this.label.fontWeight = 'bold'
    this.add(this.label)
  }

  onUpdate(dt: number): void {
    this.acc += dt
    if (this.acc >= 0.25) {
      // Update a few times per second, not every frame, to avoid rebuilding the texture constantly.
      this.acc = 0
      this.score += 10
      this.label.text = 'Score: ' + this.score
    }
  }
}`,
        },
      ],
    },
  ],
}

export default page
