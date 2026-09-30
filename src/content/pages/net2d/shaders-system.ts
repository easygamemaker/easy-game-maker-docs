import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/shaders/system',
  title: t('ShaderSystem', 'ShaderSystem'),
  description: t(
    'A registry that compiles GLSL fragment kernels into WebGL programs, available as app.shaders.',
    'Um registro que compila kernels de fragment shader em GLSL (OpenGL Shading Language) para programas WebGL, disponível como app.shaders.',
  ),
  source: 'src/engine/shader/ShaderSystem.ts',
  related: ['/shaders/builtins', '/core/renderer', '/core/app'],
  sections: [
    {
      id: 'overview',
      title: t('What it does', 'O que faz'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`app.shaders` is a `ShaderSystem`. You describe an effect as a `ShaderKernel` (a category, a name, optional numeric parameters and the body of a GLSL fragment shader) and `define` it. The system wraps your body in a full fragment shader, links it with a fixed vertex shader and stores the compiled program under the key `category.name`, for example `filter.grayscale`.",
            "`app.shaders` é um `ShaderSystem`. Você descreve um efeito como um `ShaderKernel` (uma categoria, um nome, parâmetros numéricos opcionais e o corpo de um fragment shader em GLSL) e o registra com `define`. O sistema envolve seu corpo num fragment shader completo, liga com um vertex shader fixo e guarda o programa compilado sob a chave `category.name`, por exemplo `filter.grayscale`.",
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Scope: whole-scene effects', 'Escopo: efeitos na cena inteira'),
          text: t(
            'Kernels are applied to the whole rendered frame with `setSceneEffects` (a full-screen post-process pass). There is no per-sprite or per-object shader: the sprite batcher draws everything with one built-in program. When no scene effect is set, the render path is unchanged and costs nothing extra.',
            'Os kernels são aplicados ao quadro renderizado inteiro com `setSceneEffects` (um passe de pós-processamento em tela cheia). Não existe shader por sprite ou por objeto: o batcher de sprites desenha tudo com um programa embutido. Sem nenhum efeito de cena, o caminho de render não muda e não custa nada a mais.',
          ),
        },
      ],
    },
    {
      id: 'kernel',
      title: t('ShaderKernel', 'ShaderKernel'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'category', type: "'filter' | 'generator' | 'composite'", required: true, description: t('Groups the kernel and forms the first half of its key.', 'Agrupa o kernel e forma a primeira metade da chave.') },
            { name: 'name', type: 'string', required: true, description: t('Second half of the key.', 'Segunda metade da chave.') },
            { name: 'params', type: 'ShaderParam[]', description: t('Each `{ name, default, min?, max? }` becomes a `uniform float` with that name. `default` is uploaded to the uniform on every pass unless `setSceneEffects` overrides it. `min` and `max` are metadata only.', 'Cada `{ name, default, min?, max? }` vira um `uniform float` com esse nome. `default` é enviado ao uniform em cada passe, a menos que `setSceneEffects` o substitua. `min` e `max` são apenas metadados.') },
            { name: 'fragment', type: 'string', required: true, description: t('Body of `main()`. In scope: `vec2 uv` (origin at the bottom-left), `sampler2D u_texture`, `sampler2D u_dst`, `vec2 u_resolution`, your params, and the output `outColor`.', 'Corpo do `main()`. Disponíveis: `vec2 uv` (origem no canto inferior esquerdo), `sampler2D u_texture`, `sampler2D u_dst`, `vec2 u_resolution`, seus params e a saída `outColor`.') },
            { name: 'vertex', type: 'string', description: t('Deprecated and ignored: kernels always use the built-in full-screen vertex shader. `define` logs a warning if you set it.', 'Obsoleto e ignorado: os kernels sempre usam o vertex shader de tela cheia embutido. O `define` registra um aviso se você o definir.') },
          ],
        },
      ],
    },
    {
      id: 'api',
      title: t('Methods', 'Métodos'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'define(kernel: ShaderKernel): void', type: 'method', description: t('Registers a kernel and, if the GL context exists, compiles it. Redefining the same key replaces it. Before `app.init()` it is only stored and is compiled during init.', 'Registra um kernel e, se o contexto GL existe, o compila. Redefinir a mesma chave o substitui. Antes de `app.init()` ele só é guardado e é compilado durante o init.') },
            { name: 'has(key: string): boolean', type: 'method', description: t('True if a kernel with that key was defined.', 'Verdadeiro se um kernel com essa chave foi definido.') },
            { name: 'get(key: string): CompiledShader | undefined', type: 'method', description: t('The compiled result: `{ program, kernel, uniformLocations }`. `undefined` if it did not compile.', 'O resultado compilado: `{ program, kernel, uniformLocations }`. `undefined` se não compilou.') },
            { name: 'setSceneEffects(effects: (string | SceneEffect)[]): void', type: 'method', description: t('Post-processes the whole frame with these kernels, in order. Each item is a key or `{ shader, params? }`. Params you leave out use their `default`. Throws if a key is undefined or a param name is not declared by the kernel.', 'Pós-processa o quadro inteiro com esses kernels, em ordem. Cada item é uma chave ou `{ shader, params? }`. Params omitidos usam o `default`. Lança erro se a chave não existe ou se um nome de param não é declarado pelo kernel.') },
            { name: 'clearSceneEffects(): void', type: 'method', description: t('Back to the plain render path.', 'Volta ao caminho de render simples.') },
            { name: 'sceneEffects', type: 'readonly SceneEffect[]', readonly: true, description: t('The effects currently applied.', 'Os efeitos aplicados no momento.') },
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Compile errors and limits', 'Erros de compilação e limites'),
          text: t(
            "Kernels defined before `app.init()` are compiled during init (a kernel that redefines a built-in key wins over the built-in). Compile errors do not throw: they are logged with `console.error`, `get` returns `undefined` and a scene effect that points at that kernel is skipped. In a scene effect, `u_texture` and `u_dst` both hold the frame so far, so `composite.multiply` squares the colours; `generator.*` kernels ignore the frame. The full-screen pass uses the canvas size, so a `resize` reallocates its buffers.",
            "Kernels definidos antes de `app.init()` são compilados durante o init (um kernel que redefine a chave de um embutido vence o embutido). Erros de compilação não lançam exceção: são registrados com `console.error`, `get` retorna `undefined` e um efeito de cena que aponta para esse kernel é ignorado. Num efeito de cena, `u_texture` e `u_dst` guardam ambos o quadro até ali, então `composite.multiply` eleva as cores ao quadrado; kernels `generator.*` ignoram o quadro. O passe em tela cheia usa o tamanho do canvas, então um `resize` realoca seus buffers.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Defining a custom kernel', 'Definindo um kernel próprio'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { App } from 'easy-game-maker'
import type { ShaderKernel } from 'easy-game-maker'

const invert: ShaderKernel = {
  category: 'filter',
  name: 'invert',
  params: [{ name: 'amount', default: 1, min: 0, max: 1 }],
  fragment: 'vec4 c = texture(u_texture, uv);' + ' outColor = vec4(mix(c.rgb, 1.0 - c.rgb, amount), c.a);',
}

async function main(): Promise<void> {
  const app = new App({ width: 360, height: 640 })
  await app.init()

  app.shaders.define(invert)

  const compiled = app.shaders.get('filter.invert')
  if (compiled) {
    console.log('compiled with uniforms:', [...compiled.uniformLocations.keys()])
  } else {
    console.warn('filter.invert failed to compile, see the console error above')
  }

  // Post-process the whole frame: invert half way, then a vignette with its defaults.
  app.shaders.setSceneEffects([
    { shader: 'filter.invert', params: { amount: 0.5 } },
    'filter.vignette',
  ])
  app.run()
}

void main()`,
        },
      ],
    },
  ],
}

export default page
