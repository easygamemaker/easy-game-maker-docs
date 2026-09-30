import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/renderer',
  title: t('WebGLRenderer', 'WebGLRenderer'),
  description: t(
    'Draws the display tree with batched WebGL2 quads. What it renders, in which order, and what it skips.',
    'Desenha a árvore de exibição com quads WebGL2 (Web Graphics Library 2) em lote. O que ele renderiza, em que ordem e o que ignora.',
  ),
  source: 'src/engine/renderer/WebGLRenderer.ts',
  related: ['/core/textures', '/display/display-object', '/shaders/system', '/display/line-shape'],
  sections: [
    {
      id: 'overview',
      title: t('Role', 'Papel'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`app.renderer` is the `WebGLRenderer` created by `App`. You normally never call it: the frame loop calls `render(scene)` for you. It requires WebGL2 and throws `WebGL2 not supported in this environment` if the canvas cannot provide it. It clears the canvas, then walks the tree from the scene root and pushes quads to a sprite batcher that groups draw calls by texture.',
            '`app.renderer` é o `WebGLRenderer` criado pelo `App`. Normalmente você nunca o chama: o laço de quadros chama `render(scene)` por você. Ele exige WebGL2 e lança `WebGL2 not supported in this environment` se o canvas não oferecer. Ele limpa o canvas, percorre a árvore a partir da raiz da cena e envia quads a um batcher de sprites que agrupa chamadas de desenho por textura.',
          ),
        },
        {
          type: 'props',
          title: t('Members', 'Membros'),
          rows: [
            { name: 'gl', type: 'WebGL2RenderingContext', readonly: true, description: t('The context, for custom texture uploads.', 'O contexto, para envios de textura personalizados.') },
            { name: 'textureCache', type: 'TextureCache', readonly: true, description: t('See [Textures](/core/textures).', 'Veja [Textures](/core/textures).') },
            { name: 'drawCalls', type: 'number', readonly: true, description: t('Draw calls issued in the last frame, handy for profiling.', 'Chamadas de desenho emitidas no último quadro, útil para profiling.') },
            { name: 'uploadTexture(key, source)', type: 'Texture', description: t('Uploads an image once per key and caches it.', 'Envia uma imagem uma vez por chave e a guarda em cache.') },
            { name: 'resize(width, height)', type: 'void', description: t('Updates the projection and viewport. `app.resize` calls it.', 'Atualiza a projeção e o viewport. `app.resize` o chama.') },
            { name: 'render(root)', type: 'void', description: t('Draws one frame from a `Group` root.', 'Desenha um quadro a partir de uma raiz `Group`.') },
          ],
        },
      ],
    },
    {
      id: 'what-draws',
      title: t('What gets drawn', 'O que é desenhado'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The renderer knows six drawable types. Anything else is only a container.',
            'O renderer conhece seis tipos desenháveis. Qualquer outra coisa é apenas um contêiner.',
          ),
        },
        {
          type: 'table',
          head: [t('Type', 'Tipo'), t('How it is drawn', 'Como é desenhado')],
          rows: [
            [t('`Sprite`, `AnimatedSprite`', '`Sprite`, `AnimatedSprite`'), t('Its texture, sized by `displayWidth`/`displayHeight`, multiplied by `tint`. Skipped if there is no texture.', 'Sua textura, com tamanho `displayWidth`/`displayHeight`, multiplicada por `tint`. Ignorado se não houver textura.')],
            [t('`RectShape`', '`RectShape`'), t('A white texture quad tinted with `fillColor`. With a border (`strokeWidth` above 0) or `cornerRadius`, it is baked into a canvas texture instead and rebuilt when its size or style changes.', 'Um quad de textura branca tingido com `fillColor`. Com borda (`strokeWidth` maior que 0) ou `cornerRadius`, é gerado em uma textura de canvas e refeito quando tamanho ou estilo mudam.')],
            [t('`CircleShape`', '`CircleShape`'), t('Baked into a canvas texture (fill and outline in their own colors), rebuilt when radius or colors change or `isDirty` is set. Honors the anchor.', 'Gerado em uma textura de canvas (preenchimento e contorno, cada um na sua cor), refeito quando raio ou cores mudam ou `isDirty` é definido. Respeita a âncora.')],
            [t('`Text`', '`Text`'), t('Rendered to a canvas and uploaded again whenever text or style changes.', 'Renderizado em um canvas e reenviado sempre que texto ou estilo mudam.')],
            [t('`PolygonShape`', '`PolygonShape`'), t('Baked into a canvas texture. Needs at least 3 points.', 'Gerado em uma textura de canvas. Precisa de pelo menos 3 pontos.')],
            [t('`LineShape`', '`LineShape`'), t('One white quad stretched to the segment length, `strokeWidth` thick, rotated to the segment direction and tinted with `strokeColor`.', 'Um quad branco esticado até o comprimento do segmento, com espessura `strokeWidth`, rotacionado na direção do segmento e tingido com `strokeColor`.')],
            [t('`ParticleEmitter`', '`ParticleEmitter`'), t('One quad per live particle.', 'Um quad por partícula viva.')],
          ],
        },
      ],
    },
    {
      id: 'order',
      title: t('Order, alpha and visibility', 'Ordem, alpha e visibilidade'),
      blocks: [
        {
          type: 'list',
          items: [
            t('Parents draw before their children, so a child is on top of its parent.', 'Pais são desenhados antes dos filhos, então o filho fica sobre o pai.'),
            t('Siblings draw in insertion order. If any child has a non-zero `zIndex`, that group is sorted by `zIndex` (ascending) first.', 'Irmãos são desenhados na ordem de inserção. Se algum filho tem `zIndex` diferente de zero, o grupo é ordenado por `zIndex` (crescente) antes.'),
            t('`alpha` multiplies down the tree. `visible = false` hides a node and its whole subtree.', '`alpha` se multiplica ao longo da árvore. `visible = false` esconde um nó e toda a sua subárvore.'),
            t('Blending is standard alpha (`SRC_ALPHA`, `ONE_MINUS_SRC_ALPHA`) and the context keeps its drawing buffer, so screenshots of the canvas work.', 'A mistura é alpha padrão (`SRC_ALPHA`, `ONE_MINUS_SRC_ALPHA`) e o contexto mantém o buffer de desenho, então capturas de tela do canvas funcionam.'),
          ],
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
          filename: 'src/layers.ts',
          check: 'compile',
          code: `import { App, Scene, RectShape, CircleShape } from 'easy-game-maker'

class Layers extends Scene {
  onCreate(): void {
    const front = new RectShape({ x: 200, y: 150, width: 120, height: 120, fill: '#ef476f' })
    const back = new CircleShape({ x: 230, y: 180, radius: 60, fill: '#06d6a0' })
    front.zIndex = 1 // drawn above the circle even though it was added first
    this.add(front, back)
  }
}

export async function run(app: App): Promise<void> {
  app.scenes.add('layers', Layers)
  await app.goto('layers')
  app.run()
  setInterval(() => console.log('draw calls', app.renderer.drawCalls), 1000)
}`,
        },
      ],
    },
  ],
}

export default page
