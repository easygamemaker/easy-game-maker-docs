import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/shaders/builtins',
  title: t('Built-in shaders', 'Shaders embutidos'),
  description: t(
    'The six kernels that ShaderSystem registers on init: grayscale, brightness, vignette, pixelate, checkerboard and multiply.',
    'Os seis kernels que o ShaderSystem registra no init: grayscale, brightness, vignette, pixelate, checkerboard e multiply.',
  ),
  source: 'src/engine/shader/ShaderKernel.ts',
  related: ['/shaders/system', '/core/renderer'],
  sections: [
    {
      id: 'overview',
      title: t('The list', 'A lista'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`BuiltinShaders` is an exported array of `ShaderKernel`. When the App initialises, [ShaderSystem](/shaders/system) defines and compiles each one under the key `category.name`.',
            '`BuiltinShaders` é um array exportado de `ShaderKernel`. Quando o App inicializa, o [ShaderSystem](/shaders/system) define e compila cada um sob a chave `category.name`.',
          ),
        },
        {
          type: 'table',
          head: [t('Key', 'Chave'), t('Parameters (default, range)', 'Parâmetros (padrão, faixa)'), t('Effect', 'Efeito')],
          rows: [
            [t('`filter.grayscale`', '`filter.grayscale`'), t('`intensity` (1, 0 to 1)', '`intensity` (1, de 0 a 1)'), t('Mixes the colour towards its luminance.', 'Mistura a cor em direção à luminância.')],
            [t('`filter.brightness`', '`filter.brightness`'), t('`amount` (0, -1 to 1)', '`amount` (0, de -1 a 1)'), t('Adds `amount` to each channel, clamped to 0..1.', 'Soma `amount` a cada canal, limitado a 0..1.')],
            [t('`filter.vignette`', '`filter.vignette`'), t('`intensity` (0.5, 0 to 1), `smoothness` (0.5, 0.01 to 1)', '`intensity` (0.5, de 0 a 1), `smoothness` (0.5, de 0.01 a 1)'), t('Darkens towards the edges.', 'Escurece em direção às bordas.')],
            [t('`filter.pixelate`', '`filter.pixelate`'), t('`blockSize` (8, 1 to 64)', '`blockSize` (8, de 1 a 64)'), t('Samples the texture in square blocks of that many pixels.', 'Amostra a textura em blocos quadrados desse tamanho em pixels.')],
            [t('`generator.checkerboard`', '`generator.checkerboard`'), t('`size` (32, 4 to 256)', '`size` (32, de 4 a 256)'), t('Draws a black and white checkerboard, ignoring the input texture.', 'Desenha um tabuleiro preto e branco, ignorando a textura de entrada.')],
            [t('`composite.multiply`', '`composite.multiply`'), t('none', 'nenhum'), t('Multiplies `u_texture` by `u_dst`.', 'Multiplica `u_texture` por `u_dst`.')],
          ],
        },
      ],
    },
    {
      id: 'uniforms',
      title: t('Uniforms available to every kernel', 'Uniforms disponíveis a todo kernel'),
      blocks: [
        {
          type: 'list',
          items: [
            t('`vec2 uv`: the texture coordinate, in 0..1.', '`vec2 uv`: a coordenada de textura, de 0 a 1.'),
            t('`sampler2D u_texture` and `sampler2D u_dst`: the source and the destination image.', '`sampler2D u_texture` e `sampler2D u_dst`: a imagem de origem e a de destino.'),
            t('`vec2 u_resolution`: size in pixels.', '`vec2 u_resolution`: tamanho em pixels.'),
            t('One `float` per entry in `params`, named after it.', 'Um `float` por entrada em `params`, com o mesmo nome.'),
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Defaults are uploaded for you', 'Os padrões são enviados por você'),
          text: t(
            "When a kernel runs as a scene effect, `ShaderSystem` sets `u_texture`, `u_dst`, `u_resolution` and every param: its `default`, or the value you pass in `setSceneEffects`. `min` and `max` are descriptive and are not enforced.",
            "Quando um kernel roda como efeito de cena, o `ShaderSystem` define `u_texture`, `u_dst`, `u_resolution` e cada param: o `default` ou o valor passado em `setSceneEffects`. `min` e `max` são descritivos e não são impostos.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Inspecting the built-ins', 'Inspecionando os embutidos'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/shaders.ts',
          check: 'compile',
          code: `import { App, BuiltinShaders } from 'easy-game-maker'

export async function listShaders(): Promise<void> {
  const app = new App()
  await app.init()

  for (const kernel of BuiltinShaders) {
    const key = kernel.category + '.' + kernel.name
    const params = (kernel.params ?? []).map((p) => p.name + '=' + p.default).join(', ')
    console.log(key, app.shaders.get(key) ? 'compiled' : 'not compiled', params)
  }
}`,
        },
        {
          type: 'p',
          text: t(
            'To see one on screen, apply it to the scene: `app.shaders.setSceneEffects([{ shader: \'filter.pixelate\', params: { blockSize: 4 } }])`. The effect covers the whole frame; there is no per-sprite application. See [ShaderSystem](/shaders/system).',
            'Para ver um na tela, aplique-o à cena: `app.shaders.setSceneEffects([{ shader: \'filter.pixelate\', params: { blockSize: 4 } }])`. O efeito cobre o quadro inteiro; não há aplicação por sprite. Veja [ShaderSystem](/shaders/system).',
          ),
        },
      ],
    },
  ],
}

export default page
