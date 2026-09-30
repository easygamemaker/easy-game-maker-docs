import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/materials',
  title: t('materials', 'materials'),
  description: t(
    'Ready-made surfaces, a game palette and textures drawn in code, so a scene never has to load an image.',
    'Superfícies prontas, uma paleta de jogo e texturas desenhadas no código, para que a cena nunca precise carregar uma imagem.',
  ),
  source: 'src/engine3d/materials.ts',
  related: ['/3d/models', '/3d/lights', '/3d/postfx'],
  sections: [
    {
      id: 'overview',
      title: t('Surfaces and textures without art', 'Superfícies e texturas sem arte'),
      blocks: [
        {
          type: 'p',
          text: t(
            'EGM ships no art, so textures are generated: they draw to a canvas and hand back a three.js texture. A checkerboard floor and a gradient sky are the difference between "a grey box in a void" and a scene, and they cost nothing to make. Import the `materials` namespace: `materials.glow(\'#f97316\')`.',
            'A EGM não traz arte, então as texturas são geradas: elas desenham num canvas e devolvem uma textura do three.js. Um chão xadrez e um céu em degradê separam "uma caixa cinza no vazio" de uma cena, e não custam nada. Importe o namespace `materials`: `materials.glow(\'#f97316\')`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Sky, floor and a few surfaces', 'Céu, chão e algumas superfícies'),
          code: `import { createGame, models, lights, materials } from 'easy-game-maker/3d'

const game = createGame({ cameraPosition: [0, 4, 10] })
lights.sunset(game.scene)
materials.skyGradient(game.scene, '#1b2a4a', '#ea580c')

game.add(models.ground(60, { texture: materials.gridTexture({ divisions: 16 }) }))

const shapes = [
  models.box(1.5, { material: materials.toon('#22c55e'), position: [-3, 0.75, 0] }),
  models.sphere(0.8, { material: materials.metal('#cbd5e1'), position: [0, 0.8, 0] }),
  models.sphere(0.8, { material: materials.glow('#f97316'), position: [3, 0.8, 0] }),
]
for (const shape of shapes) game.add(shape)
materials.outline(shapes[0])`,
        },
      ],
    },
    {
      id: 'surfaces',
      title: t('Surfaces', 'Superfícies'),
      blocks: [
        {
          type: 'table',
          head: [t('Function', 'Função'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`materials.standard`', '`materials.standard`'), t('`standard(options?)`', '`standard(options?)`'), t('The default `MeshStandardMaterial`: lit, shadowed, environment-aware. `color` defaults to the palette grey.', 'O `MeshStandardMaterial` padrão: iluminado, com sombra e sensível ao ambiente. `color` usa o cinza da paleta por padrão.')],
            [t('`materials.matte`', '`materials.matte`'), t('`matte(color, options?)`', '`matte(color, options?)`'), t('Matte plastic, the safest look for toy-like readable objects.', 'Plástico fosco, o visual mais seguro para objetos legíveis, de brinquedo.')],
            [t('`materials.metal`', '`materials.metal`'), t('`metal(color, options?)`', '`metal(color, options?)`'), t('Polished metal. Looks best with an environment map.', 'Metal polido. Fica melhor com um mapa de ambiente.')],
            [t('`materials.glow`', '`materials.glow`'), t('`glow(color, { intensity = 1.6, ... })`', '`glow(color, { intensity = 1.6, ... })`'), t('Emissive. Pair with `createPostFX({ bloom: true })` and it actually blooms.', 'Emissivo. Combine com `createPostFX({ bloom: true })` e ele realmente brilha.')],
            [t('`materials.flat`', '`materials.flat`'), t('`flat(color, options?)`', '`flat(color, options?)`'), t('Unlit flat colour (`MeshBasicMaterial`): ignores every light.', 'Cor chapada sem luz (`MeshBasicMaterial`): ignora todas as luzes.')],
            [t('`materials.toon`', '`materials.toon`'), t('`toon(color, steps = 4, options?)`', '`toon(color, steps = 4, options?)`'), t('Cel shading: banded light instead of a smooth falloff.', 'Cel shading: luz em faixas no lugar de um degradê suave.')],
            [t('`materials.glass`', '`materials.glass`'), t('`glass(color = \'#ffffff\', options?)`', '`glass(color = \'#ffffff\', options?)`'), t('Transparent by transmission, like a thick pane of glass.', 'Transparente por transmissão, como um vidro grosso.')],
            [t('`materials.wireframe`', '`materials.wireframe`'), t('`wireframe(color = palette.ember, options?)`', '`wireframe(color = palette.ember, options?)`'), t('Edges only, unlit. Debug volumes and a blueprint look.', 'Só as arestas, sem luz. Volumes de depuração e visual de projeto técnico.')],
            [t('`materials.outline`', '`materials.outline`'), t('`outline(mesh, { color = \'#000000\', thickness = 0.04 })`', '`outline(mesh, { color = \'#000000\', thickness = 0.04 })`'), t('A dark back-face shell one step larger, added as a child of `mesh` and also returned. The cheapest good outline (no post-processing pass).', 'Uma casca escura de faces traseiras um pouco maior, adicionada como filha de `mesh` e também devolvida. O contorno bom mais barato (sem passe de pós-processamento).')],
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            '`toon(color, 1)` divides 0 by 0 while building its gradient and gives a black band. Use 2 or more steps.',
            '`toon(color, 1)` divide 0 por 0 ao montar o degradê e gera uma faixa preta. Use 2 ou mais passos.',
          ),
        },
      ],
    },
    {
      id: 'colour',
      title: t('Colour', 'Cor'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('What it is', 'O que é')],
          rows: [
            [t('`palette`', '`palette`'), t('A general game palette (`red`, `orange`, `yellow`, `lime`, `green`, `teal`, `cyan`, `blue`, `indigo`, `violet`, `pink`, `brown`, `sand`, `sky`, `night`, `white`, `black`, ...), saturated enough to read at speed. It also contains every `brand` key. Also `materials.palette`.', 'Uma paleta geral de jogo (`red`, `orange`, `yellow`, `lime`, `green`, `teal`, `cyan`, `blue`, `indigo`, `violet`, `pink`, `brown`, `sand`, `sky`, `night`, `white`, `black`, ...), saturada o bastante para ler em movimento. Ela também contém todas as chaves de `brand`. Também é `materials.palette`.')],
            [t('`brand`', '`brand`'), t('The EGM accent colours: `ember`, `flame`, `amber`, `ink`, `ash`, `slate`, `smoke`, `mist`, `snow` (`ember` `#ea580c` is the orange). Also `materials.brand`.', 'As cores de destaque da EGM: `ember`, `flame`, `amber`, `ink`, `ash`, `slate`, `smoke`, `mist`, `snow` (`ember` `#ea580c` é o laranja). Também é `materials.brand`.')],
            [t('`materials.mix(a, b, t)`', '`materials.mix(a, b, t)`'), t('Blends two colours and returns a `Color`.', 'Mistura duas cores e devolve uma `Color`.')],
            [t('`materials.shade(color, amount)`', '`materials.shade(color, amount)`'), t('Nudges lightness by `amount` (negative darkens). Good for shading facets.', 'Ajusta a luminosidade em `amount` (negativo escurece). Bom para sombrear facetas.')],
          ],
        },
      ],
    },
    {
      id: 'textures',
      title: t('Textures', 'Texturas'),
      description: t(
        'All return a sRGB CanvasTexture and take an options object.',
        'Todas devolvem uma CanvasTexture sRGB e recebem um objeto de opções.',
      ),
      blocks: [
        {
          type: 'table',
          head: [t('Function', 'Função'), t('Options (defaults)', 'Opções (padrões)'), t('Notes', 'Notas')],
          rows: [
            [t('`checkerTexture`', '`checkerTexture`'), t('`light \'#2a2a2a\'`, `dark \'#1c1c1c\'`, `squares 8`, `size 512`', '`light \'#2a2a2a\'`, `dark \'#1c1c1c\'`, `squares 8`, `size 512`'), t('On a big ground plane it makes speed readable.', 'Num chão grande, é o que faz a velocidade ser legível.')],
            [t('`gridTexture`', '`gridTexture`'), t('`background \'#0a0a0a\'`, `line` ember, `divisions 8`, `lineWidth 2`, `size 512`', '`background \'#0a0a0a\'`, `line` ember, `divisions 8`, `lineWidth 2`, `size 512`'), t('Thin bright lines on a dark field: the arcade and synthwave floor.', 'Linhas finas e claras num fundo escuro: o chão de arcade e synthwave.')],
            [t('`noiseTexture`', '`noiseTexture`'), t('`size 256`, `scale 32`, `contrast 1`, `tint \'#ffffff\'`', '`size 256`, `scale 32`, `contrast 1`, `tint \'#ffffff\'`'), t('Value noise: grain for rock, rust, dirt or a roughness map.', 'Ruído de valor: granulação para pedra, ferrugem, terra ou um mapa de rugosidade.')],
            [t('`gradientTexture`', '`gradientTexture(stops, { size = 256 })`'), t('`stops` is `[[offset, colour], ...]` or a record of colours spread evenly.', '`stops` é `[[offset, cor], ...]` ou um record de cores espalhadas por igual.'), t('A vertical ramp.', 'Uma rampa vertical.')],
            [t('`sparkTexture`', '`sparkTexture`'), t('`size 128`, `color \'#ffffff\'`, `softness 1`', '`size 128`, `color \'#ffffff\'`, `softness 1`'), t('A soft round blob on transparent black. Every particle needs one.', 'Uma bolha redonda e suave sobre preto transparente. Toda partícula precisa de uma.')],
            [t('`textTexture`', '`textTexture(text, { color, background, font, padding = 32 })`'), t('Text rendered to a texture sized to the text\'s aspect.', 'Texto renderizado numa textura com a proporção do texto.'), t('Signs, labels, damage numbers.', 'Placas, rótulos, números de dano.')],
            [t('`skyGradient`', '`skyGradient(scene, top = \'#1b2a4a\', bottom = \'#ea580c\')`'), t('Paints `scene.background` as a vertical gradient and returns the texture.', 'Pinta `scene.background` como um degradê vertical e devolve a textura.'), t('One call replaces a flat background colour, the clearest tell of an unfinished scene.', 'Uma chamada troca a cor de fundo lisa, o sinal mais claro de cena inacabada.')],
          ],
        },
        {
          type: 'p',
          text: t(
            '`checkerTexture`, `gridTexture`, `noiseTexture`, `gradientTexture` and `skyGradient` are repeat-wrapped with anisotropy 8. `sparkTexture` and `textTexture` are sRGB only (clamped, default anisotropy).',
            '`checkerTexture`, `gridTexture`, `noiseTexture`, `gradientTexture` e `skyGradient` têm repetição ligada e anisotropia 8. `sparkTexture` e `textTexture` são só sRGB (com clamp e anisotropia padrão).',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Needs a 2D canvas', 'Precisa de um canvas 2D'),
          text: t(
            'Texture functions need a 2D canvas context and throw a clear `EGM:` error where the host has none (a test runner without a DOM, for example).',
            'As funções de textura precisam de um contexto de canvas 2D e lançam um erro claro com prefixo `EGM:` onde o ambiente não tem um (um test runner sem DOM, por exemplo).',
          ),
        },
      ],
    },
    {
      id: 'gotchas',
      title: t('Gotchas', 'Pegadinhas'),
      blocks: [
        {
          type: 'list',
          items: [
            t(
              '`sparkTexture` and the `tint` of `noiseTexture` read the colour\'s linear channels as if they were sRGB, so `#808080` is drawn as `rgba(55,55,55)`.',
              '`sparkTexture` e o `tint` de `noiseTexture` leem os canais lineares da cor como se fossem sRGB, então `#808080` é desenhado como `rgba(55,55,55)`.',
            ),
            t(
              '`gradientTexture` with a record of stops ignores numeric keys: the stops are spread evenly by insertion order.',
              '`gradientTexture` com um record de paradas ignora chaves numéricas: as paradas são espalhadas por igual na ordem de inserção.',
            ),
          ],
        },
      ],
    },
  ],
}

export default page
