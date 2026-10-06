import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/texture-atlas',
  title: t('TextureAtlas', 'TextureAtlas'),
  description: t(
    'A packed image plus the named frames cut from it: Texture Packer JSON or the simple format, anchors, trimmed frames, pixel art filtering and one draw call for every frame of the same atlas.',
    'Uma imagem empacotada mais os quadros nomeados recortados dela: JSON (JavaScript Object Notation) do Texture Packer ou o formato simples, âncoras, quadros cortados, filtro para pixel art e uma única chamada de desenho para todos os quadros do mesmo atlas.',
  ),
  badge: 'NEW',
  source: 'src/engine/renderer/TextureAtlas.ts',
  related: ['/core/textures', '/display/sprite', '/display/animated-sprite', '/animation/clips', '/guide/recipes-2d'],
  sections: [
    {
      id: 'overview',
      title: t('What an atlas is', 'O que é um atlas'),
      blocks: [
        {
          type: 'p',
          text: t(
            "A sprite sheet or atlas is one image holding many frames, plus a description of where each frame is. A `TextureAtlas` uploads that image to the GPU (Graphics Processing Unit) **once** and hands out each frame as a [Texture](/core/textures) that is a window (a `region`) of the same GPU texture. Sprites that draw different frames of one atlas share the texture, so they go into a **single draw call**.",
            "Uma folha de sprites, ou atlas, é uma imagem que guarda vários quadros, mais uma descrição de onde cada quadro está. O `TextureAtlas` envia essa imagem à GPU (Graphics Processing Unit) **uma vez** e entrega cada quadro como uma [Texture](/core/textures) que é uma janela (uma `region`) da mesma textura da GPU. Sprites que desenham quadros diferentes de um atlas compartilham a textura, então entram em uma **única chamada de desenho**.",
          ),
        },
        {
          type: 'p',
          text: t(
            "Everything is additive. A game that draws whole images with `Sprite` and `Texture` renders exactly the same pixels as before. There is no Canvas 2D fallback renderer in the engine, so regions exist only on the WebGL renderer.",
            "Tudo é aditivo. Um jogo que desenha imagens inteiras com `Sprite` e `Texture` desenha exatamente os mesmos pixels de antes. O motor não tem um renderizador de contingência em Canvas 2D, então as regiões existem apenas no renderizador WebGL.",
          ),
        },
      ],
    },
    {
      id: 'loading',
      title: t('Loading an atlas', 'Carregando um atlas'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'TextureAtlas.load(app, jsonUrl, options?)', type: 'Promise<TextureAtlas>', description: t('Fetches the JSON at `jsonUrl`, loads its image and builds the atlas. The image is the one named by `meta.image` (or a top-level `image`) in the JSON, resolved next to the JSON file, unless `options.image` gives one. Both URLs get the asset base URL (`app.assets.setBaseUrl`) like every other loader. Throws when the fetch fails, when no image is named, or when the image does not load.', 'Busca o JSON em `jsonUrl`, carrega a imagem dele e monta o atlas. A imagem é a que o JSON nomeia em `meta.image` (ou em um `image` no topo), resolvida ao lado do arquivo JSON, a menos que `options.image` indique outra. As duas URLs (Uniform Resource Locators) recebem a URL base de assets (`app.assets.setBaseUrl`) como todo carregador. Lança erro quando o fetch falha, quando nenhuma imagem é nomeada ou quando a imagem não carrega.') },
            { name: 'TextureAtlas.fromData(app, data, bitmap, options?)', type: 'TextureAtlas', description: t('Builds an atlas from JSON you already parsed and an image you already decoded (`HTMLImageElement` or `ImageBitmap`). No network. Useful in tests and for atlases you generate at run time.', 'Monta um atlas a partir de um JSON que você já leu e de uma imagem que você já decodificou (`HTMLImageElement` ou `ImageBitmap`). Sem rede. Útil em testes e para atlas gerados em tempo de execução.') },
          ],
        },
        {
          type: 'props',
          title: t('AtlasOptions', 'AtlasOptions'),
          rows: [
            { name: 'filter', type: "'linear' | 'nearest'", default: "'linear'", description: t("Sampling filter of the atlas image. Use `'nearest'` for pixel art, so scaled frames keep hard edges.", "Filtro de amostragem da imagem do atlas. Use `'nearest'` para pixel art, para que quadros ampliados mantenham bordas duras.") },
            { name: 'image', type: 'string', description: t('`load` only: the image URL, overriding the one named by the JSON.', 'Só em `load`: a URL da imagem, no lugar da que o JSON nomeia.') },
          ],
        },
      ],
    },
    {
      id: 'formats',
      title: t('Supported JSON formats', 'Formatos de JSON aceitos'),
      blocks: [
        {
          type: 'table',
          head: [t('Format', 'Formato'), t('Shape', 'Forma'), t('Notes', 'Observações')],
          rows: [
            [t('Texture Packer, JSON (hash)', 'Texture Packer, JSON (hash)'), t('`{ "frames": { "idle_0": { "frame": { x, y, w, h }, ... } } }`', '`{ "frames": { "idle_0": { "frame": { x, y, w, h }, ... } } }`'), t('The frame name is the key. Reads `trimmed`, `spriteSourceSize`, `sourceSize` and `pivot`.', 'O nome do quadro é a chave. Lê `trimmed`, `spriteSourceSize`, `sourceSize` e `pivot`.')],
            [t('Texture Packer, JSON (array)', 'Texture Packer, JSON (array)'), t('`{ "frames": [ { "filename": "idle_0", "frame": { x, y, w, h } } ] }`', '`{ "frames": [ { "filename": "idle_0", "frame": { x, y, w, h } } ] }`'), t('The frame name is `filename` (or `name`). A frame without one is an error.', 'O nome do quadro é `filename` (ou `name`). Um quadro sem nome é um erro.')],
            [t('Simple format', 'Formato simples'), t('`{ "image": "x.png", "frames": { "idle_0": { "x", "y", "w", "h", "anchorX", "anchorY" } } }`', '`{ "image": "x.png", "frames": { "idle_0": { "x", "y", "w", "h", "anchorX", "anchorY" } } }`'), t('The format of the Street Brazil Fighter example. The anchor is in **pixels** from the top left of the frame; without it the anchor is the center. The image may also be named by `meta.image`.', 'O formato do exemplo Street Brazil Fighter. A âncora é em **pixels** a partir do canto superior esquerdo do quadro; sem ela, a âncora é o centro. A imagem também pode ser nomeada por `meta.image`.')],
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Rotated frames are rejected', 'Quadros rotacionados são recusados'),
          text: t(
            "A frame with `rotated: true` throws a clear error (the atlas is not built). In Texture Packer, turn \"Allow rotation\" off when you export. A frame whose rectangle lies outside the image is also an error, and the GPU texture is released again.",
            "Um quadro com `rotated: true` lança um erro claro (o atlas não é montado). No Texture Packer, desligue \"Allow rotation\" ao exportar. Um quadro cujo retângulo fica fora da imagem também é um erro, e a textura da GPU é liberada de novo.",
          ),
        },
      ],
    },
    {
      id: 'frames',
      title: t('Reading frames', 'Lendo os quadros'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'frame(name)', type: 'Texture', description: t('The frame texture: a region of the shared texture, with its anchor. Throws an error that names the closest frame names when `name` does not exist (and when the atlas was disposed).', 'A textura do quadro: uma região da textura compartilhada, com a sua âncora. Lança um erro que cita os nomes de quadro mais parecidos quando `name` não existe (e quando o atlas foi descartado).') },
            { name: 'has(name)', type: 'boolean', description: t('Whether the atlas has a frame called `name`.', 'Se o atlas tem um quadro chamado `name`.') },
            { name: 'frames(prefix)', type: 'Texture[]', description: t("The frames whose name starts with `prefix`, in **natural order**: `walk_2` comes before `walk_10`. Empty when nothing matches.", "Os quadros cujo nome começa com `prefix`, em **ordem natural**: `walk_2` vem antes de `walk_10`. Vazio quando nada casa.") },
            { name: 'names()', type: 'string[]', description: t('Every frame name, in natural order.', 'Todos os nomes de quadro, em ordem natural.') },
            { name: 'texture', type: 'Texture', readonly: true, description: t('The shared texture of the whole atlas image.', 'A textura compartilhada da imagem inteira do atlas.') },
            { name: 'dispose() / disposed', type: 'void / boolean', description: t('Releases the shared GPU texture. Frames taken before stop drawing and `frame()` throws afterwards. Safe to call twice.', 'Libera a textura compartilhada da GPU. Quadros pegos antes param de desenhar e `frame()` lança erro depois. Pode ser chamado duas vezes.') },
          ],
        },
      ],
    },
    {
      id: 'anchors',
      title: t('Anchors, trimmed frames and setFrame', 'Âncoras, quadros cortados e setFrame'),
      blocks: [
        {
          type: 'p',
          text: t(
            "Every frame texture carries an `anchor`: a fraction of the frame rectangle, where 0 is the left or top edge and 1 is the right or bottom edge. [Sprite.setFrame](/display/sprite) copies it into `anchorX` and `anchorY`. The anchor is the point that sits at `sprite.x` and `sprite.y`, and the point that rotation and scale pivot around, so a fighter keeps its feet on the ground when the frame changes size.",
            "Toda textura de quadro carrega uma `anchor`: uma fração do retângulo do quadro, em que 0 é a borda esquerda ou de cima e 1 é a borda direita ou de baixo. O [Sprite.setFrame](/display/sprite) a copia para `anchorX` e `anchorY`. A âncora é o ponto que fica em `sprite.x` e `sprite.y`, e o ponto em torno do qual rotação e escala giram, então um lutador mantém os pés no chão quando o quadro muda de tamanho.",
          ),
        },
        {
          type: 'list',
          items: [
            t('**Simple format:** `anchorX` and `anchorY` are in pixels, and the engine divides by the frame size. A missing anchor is the center (0.5, 0.5).', '**Formato simples:** `anchorX` e `anchorY` são em pixels, e o motor divide pelo tamanho do quadro. Uma âncora ausente é o centro (0,5; 0,5).'),
            t('**Texture Packer:** the anchor is the `pivot` (default 0.5, 0.5), a fraction of the **original, untrimmed** frame.', '**Texture Packer:** a âncora é o `pivot` (padrão 0,5; 0,5), uma fração do quadro **original, sem corte**.'),
            t('**Trimmed frames** (`trimmed: true`): the packer removed transparent borders, so the packed rectangle is smaller than the original. The engine re-expresses the pivot against the packed rectangle, which is why the anchor can fall **outside 0..1** (a foot that sat below the packed pixels, for instance). The trim data stays on `texture.trim` for reference.', '**Quadros cortados** (`trimmed: true`): o empacotador removeu as bordas transparentes, então o retângulo empacotado é menor que o original. O motor reexpressa o pivô em relação ao retângulo empacotado, e por isso a âncora pode cair **fora de 0..1** (um pé que ficava abaixo dos pixels empacotados, por exemplo). Os dados do corte ficam em `texture.trim` para consulta.'),
            t('A texture without an anchor leaves the sprite anchor alone. Because `setFrame` sets the size to the frame size in pixels, scale the sprite with `scaleX` and `scaleY`.', 'Uma textura sem âncora deixa a âncora do sprite como está. Como o `setFrame` define o tamanho como o do quadro em pixels, escale o sprite com `scaleX` e `scaleY`.'),
          ],
        },
      ],
    },
    {
      id: 'pixel-art',
      title: t('Pixel art and edge bleeding', 'Pixel art e vazamento de borda'),
      blocks: [
        {
          type: 'p',
          text: t(
            "Pass `filter: 'nearest'` for pixel art: scaled frames keep hard edges instead of blurring. The default `'linear'` is smooth. The asset manifest (`app.assets.load`) always uploads with `'linear'`; for `'nearest'` use `TextureAtlas` or `app.renderer.uploadTexture(key, bitmap, 'nearest')`.",
            "Passe `filter: 'nearest'` para pixel art: quadros ampliados mantêm bordas duras em vez de embaçar. O padrão `'linear'` é suave. O manifesto de assets (`app.assets.load`) sempre envia com `'linear'`; para `'nearest'` use o `TextureAtlas` ou `app.renderer.uploadTexture(key, bitmap, 'nearest')`.",
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Edge bleeding with linear filtering', 'Vazamento de borda com filtro linear'),
          text: t(
            "With `'linear'`, a scaled or sub-pixel draw can blend in the neighbouring atlas pixels at the edge of a frame. Leave one pixel of padding or edge extrusion when you pack the atlas, or use `'nearest'`. This follows the SDK documentation of `Texture.region`; it was not measured for every scale.",
            "Com `'linear'`, um desenho ampliado ou em posição fracionária pode misturar os pixels vizinhos do atlas na borda de um quadro. Deixe um pixel de margem ou extrusão de borda ao empacotar o atlas, ou use `'nearest'`. Isso segue a documentação do SDK (Software Development Kit) sobre `Texture.region`; não foi medido para todas as escalas.",
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
          filename: 'atlas-demo.ts',
          check: 'compile',
          code: `import { AnimatedSprite, App, Sprite, TextureAtlas } from 'easy-game-maker'

export async function buildFighter(app: App): Promise<{ hero: Sprite; walk: AnimatedSprite; atlas: TextureAtlas }> {
  const atlas = await TextureAtlas.load(app, 'assets/fighters/craque-anim.json', { filter: 'nearest' })

  const hero = new Sprite({ x: 200, y: 400 })
  if (atlas.has('idle_0')) hero.setFrame(atlas.frame('idle_0')) // texture, size and anchor
  hero.scaleX = hero.scaleY = 3 // scale with scaleX/scaleY, the size is the frame size

  const walk = new AnimatedSprite({ frames: atlas.frames('walk_'), fps: 12 }) // walk_2 before walk_10
  walk.x = 400
  walk.y = 400
  walk.play()

  return { hero, walk, atlas }
}

// Without a network: JSON already parsed, image already decoded
export function fromMemory(app: App, bitmap: ImageBitmap): TextureAtlas {
  return TextureAtlas.fromData(
    app,
    { frames: { idle_0: { x: 0, y: 0, w: 32, h: 48, anchorX: 16, anchorY: 46 } } },
    bitmap,
  )
}`,
        },
      ],
    },
  ],
}

export default page
