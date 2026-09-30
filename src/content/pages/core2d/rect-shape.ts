import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/display/rect-shape',
  title: t('RectShape', 'RectShape'),
  description: t(
    'A solid-color rectangle: the quickest way to get something on screen, for prototypes, panels and hitboxes.',
    'Um retângulo de cor sólida: o jeito mais rápido de pôr algo na tela, para protótipos, painéis e hitboxes.',
  ),
  source: 'src/engine/display/RectShape.ts',
  related: ['/display/circle-shape', '/display/polygon-shape', '/display/display-object', '/display/sprite'],
  sections: [
    {
      id: 'options',
      title: t('Options and members', 'Opções e membros'),
      blocks: [
        {
          type: 'props',
          title: t('Constructor options', 'Opções do construtor'),
          rows: [
            { name: 'x, y', type: 'number', default: '0', description: t('Position (default anchor 0.5, so the center).', 'Posição (âncora padrão 0,5, ou seja, o centro).') },
            { name: 'width, height', type: 'number', default: '0', description: t('Size in pixels. With the default 0 the rectangle is invisible, so always set them.', 'Tamanho em pixels. Com o padrão 0 o retângulo é invisível, então sempre defina.') },
            { name: 'fill', type: 'string', default: "'#ffffff'", description: t('Hex color `#RRGGBB` or `#RRGGBBAA`. Any other format falls back to white.', 'Cor hexadecimal `#RRGGBB` ou `#RRGGBBAA`. Qualquer outro formato vira branco.') },
            { name: 'stroke, strokeWidth', type: 'string, number', description: t('Border color (hex) and width in pixels. The border is drawn inside the rectangle, over the fill. Nothing is drawn while `strokeWidth` is 0.', 'Cor da borda (hex) e largura em pixels. A borda é desenhada por dentro do retângulo, sobre o preenchimento. Nada é desenhado enquanto `strokeWidth` for 0.') },
            { name: 'cornerRadius', type: 'number', default: '0', description: t('Corner radius in pixels, clamped to half of the shorter side.', 'Raio dos cantos em pixels, limitado à metade do lado menor.') },
            { name: 'name', type: 'string', description: t('Optional label.', 'Rótulo opcional.') },
          ],
        },
        {
          type: 'props',
          title: t('Public members', 'Membros públicos'),
          rows: [
            { name: 'fillColor', type: '[number, number, number, number]', default: '[1,1,1,1]', description: t('Fill as normalized RGBA (Red, Green, Blue, Alpha). Change it at runtime to recolor.', 'Preenchimento como RGBA (Red, Green, Blue, Alpha) normalizado. Altere em tempo de execução para recolorir.') },
            { name: 'RectShape.parseColor(hex)', type: '[number, number, number, number]', description: t('Static helper that converts a hex string to that RGBA tuple.', 'Auxiliar estático que converte uma string hexadecimal nessa tupla RGBA.') },
            { name: 'getBounds()', type: 'Bounds', description: t('Rectangle honoring the anchor.', 'Retângulo respeitando a âncora.') },
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Plain rectangles stay cheap', 'Retângulos simples continuam baratos'),
          text: t(
            'A rectangle without a border or rounded corners is drawn as one white quad multiplied by `fillColor`, so thousands of them batch into few draw calls. With `strokeWidth` above 0 or a `cornerRadius`, the renderer bakes the shape into a canvas texture once and rebuilds it only when its size, colors, border or radius change. Set `width`/`height` directly to resize.',
            'Um retângulo sem borda e sem cantos arredondados é desenhado como um quad branco multiplicado por `fillColor`, então milhares deles são agrupados em poucas chamadas de desenho. Com `strokeWidth` maior que 0 ou um `cornerRadius`, o renderer gera a forma em uma textura de canvas uma vez e só a refaz quando tamanho, cores, borda ou raio mudam. Altere `width`/`height` diretamente para redimensionar.',
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
          filename: 'src/rects.ts',
          check: 'compile',
          code: `import { RectShape, Scene } from 'easy-game-maker'

export class Paddle extends Scene {
  private paddle!: RectShape
  private flash = 0

  onCreate(): void {
    this.add(new RectShape({ x: 180, y: 320, width: 360, height: 640, fill: '#0b132b' }))
    this.paddle = new RectShape({ x: 180, y: 600, width: 96, height: 16, fill: '#5bc0be80' })
    this.add(this.paddle)
  }

  onUpdate(dt: number): void {
    this.flash += dt
    const glow = 0.6 + 0.4 * Math.sin(this.flash * 6)
    this.paddle.fillColor = [0.36 * glow, 0.75 * glow, 0.74 * glow, 1]
  }
}`,
        },
      ],
    },
  ],
}

export default page
