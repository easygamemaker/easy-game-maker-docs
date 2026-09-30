import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/gameplay/tilemap',
  title: t('Tilemap', 'Tilemap'),
  description: t(
    'Load a Tiled JSON map, render each tile layer as one texture and read object layers and collision tiles.',
    'Carregue um mapa JSON (JavaScript Object Notation) do Tiled, renderize cada camada de tiles como uma textura e leia as camadas de objetos e os tiles de colisão.',
  ),
  source: 'src/engine/tilemap/Tilemap.ts',
  related: ['/physics/world', '/core/assets', '/display/group', '/core/scene'],
  sections: [
    {
      id: 'overview',
      title: t('What it does', 'O que faz'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`Tilemap` reads a map exported from the Tiled editor as JSON. Every visible tile layer is drawn once onto a canvas and uploaded as a single texture, so a layer costs one draw call no matter how many tiles it has. Object layers are kept as plain data. `Tilemap` extends [Group](/display/group), so you add it to a scene like any other object.",
            "`Tilemap` lê um mapa exportado do editor Tiled em JSON. Cada camada de tiles visível é desenhada uma vez num canvas e enviada como uma única textura, então uma camada custa uma chamada de desenho, não importa quantos tiles tenha. As camadas de objetos ficam como dados simples. `Tilemap` estende [Group](/display/group), então você o adiciona a uma cena como qualquer outro objeto.",
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Supported subset', 'Subconjunto suportado'),
          text: t(
            'Only `tilelayer` (with `data` as a number array) and `objectgroup` layers are used. Layers with `visible: false`, image layers and group layers are skipped. The code does not decode Tiled flip flags, so do not rely on flipped or rotated tiles.',
            'Só são usadas camadas `tilelayer` (com `data` como array de números) e `objectgroup`. Camadas com `visible: false`, camadas de imagem e de grupo são ignoradas. O código não decodifica os flags de espelhamento do Tiled, então não conte com tiles espelhados ou rotacionados.',
          ),
        },
      ],
    },
    {
      id: 'loading',
      title: t('Loading a map', 'Carregando um mapa'),
      blocks: [
        {
          type: 'props',
          title: t('Tilemap.fromJSON(mapJson, app, basePath?)', 'Tilemap.fromJSON(mapJson, app, basePath?)'),
          rows: [
            { name: 'mapJson', type: 'TiledMap', required: true, description: t('The parsed Tiled JSON (`width`, `height`, `tilewidth`, `tileheight`, `layers`, `tilesets`).', 'O JSON do Tiled já convertido em objeto (`width`, `height`, `tilewidth`, `tileheight`, `layers`, `tilesets`).') },
            { name: 'app', type: 'App', required: true, description: t('Used to upload the baked layer to the GPU (Graphics Processing Unit) through the renderer.', 'Usado para enviar a camada pronta à GPU (Graphics Processing Unit) pelo renderer.') },
            { name: 'basePath', type: 'string', default: "''", description: t('Prefix added to each tileset `image` path.', 'Prefixo somado ao caminho `image` de cada tileset.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'It returns a `Promise<Tilemap>`. The tileset images must be embedded in the map (a tileset with `image`, `columns`, `firstgid`); external `.tsx` tilesets are not resolved. A failed image load rejects with `Tilemap: failed to load tileset: <url>`.',
            'Retorna uma `Promise<Tilemap>`. As imagens dos tilesets precisam estar embutidas no mapa (um tileset com `image`, `columns`, `firstgid`); tilesets externos `.tsx` não são resolvidos. Uma imagem que falha ao carregar rejeita com `Tilemap: failed to load tileset: <url>`.',
          ),
        },
      ],
    },
    {
      id: 'members',
      title: t('Reading the map', 'Lendo o mapa'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'tileW, tileH', type: 'number', readonly: true, description: t('Tile size in pixels.', 'Tamanho do tile em pixels.') },
            { name: 'mapCols, mapRows', type: 'number', readonly: true, description: t('Map size in tiles.', 'Tamanho do mapa em tiles.') },
            { name: 'mapPxW, mapPxH', type: 'number', readonly: true, description: t('Map size in pixels.', 'Tamanho do mapa em pixels.') },
            { name: 'getObjects(layerName): TiledObject[]', type: 'method', description: t('Objects of a named object layer, or `[]`.', 'Objetos de uma camada de objetos pelo nome, ou `[]`.') },
            { name: 'getObjectsByType(layerName, type): TiledObject[]', type: 'method', description: t('Same, filtered by the object `type`.', 'O mesmo, filtrado pelo `type` do objeto.') },
            { name: 'getTileAt(layerName, col, row): number', type: 'method', description: t('Tile id (GID) at a tile coordinate. `0` is empty or unknown layer.', 'Id do tile (GID, Global ID) numa coordenada de tile. `0` significa vazio ou camada desconhecida.') },
            { name: 'getTileAtWorld(layerName, wx, wy): number', type: 'method', description: t('Same, from pixel coordinates. It ignores the tilemap position, so pass coordinates relative to the map.', 'O mesmo, a partir de coordenadas em pixels. Ignora a posição do tilemap, então passe coordenadas relativas ao mapa.') },
            { name: 'addCollisionBodies(physics, layerName): Promise<void>', type: 'method', description: t('Creates one static rectangular body per non-empty tile of that layer, offset by the tilemap position.', 'Cria um corpo retangular estático para cada tile não vazio da camada, deslocado pela posição do tilemap.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('One body per tile', 'Um corpo por tile'),
          text: t(
            'Tiles are not merged into larger shapes. A big solid layer creates many bodies, so keep collision layers sparse. The App needs physics enabled (`new App({ physics: true })`).',
            'Os tiles não são fundidos em formas maiores. Uma camada sólida grande cria muitos corpos, então mantenha as camadas de colisão enxutas. O App precisa ter a física ligada (`new App({ physics: true })`).',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Level with spawns and collision', 'Fase com pontos de início e colisão'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { App, Scene, Tilemap } from 'easy-game-maker'
import type { TiledMap } from 'easy-game-maker'

class LevelScene extends Scene {
  async onCreate(): Promise<void> {
    const json = (await fetch('maps/level1.json').then((r) => r.json())) as TiledMap
    const map = await Tilemap.fromJSON(json, app, 'maps/')
    this.add(map)

    const spawns = map.getObjects('Spawns')
    const start = spawns[0]
    if (start) console.log('player starts at', start.x, start.y)

    console.log('tile under the start:', map.getTileAtWorld('Ground', start?.x ?? 0, start?.y ?? 0))
    await map.addCollisionBodies(app.physics, 'Collision')
  }
}

const app = new App({ width: 360, height: 640, physics: true })

async function main(): Promise<void> {
  await app.init()
  app.scenes.add('level', LevelScene)
  await app.goto('level')
  app.run()
}

void main()`,
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Asset paths', 'Caminhos de assets'),
          text: t(
            'Put the JSON and tileset images under `public/maps/` so that `fetch` and the tileset `image` paths resolve at runtime.',
            'Coloque o JSON e as imagens dos tilesets em `public/maps/` para que o `fetch` e os caminhos `image` dos tilesets sejam resolvidos em tempo de execução.',
          ),
        },
      ],
    },
  ],
}

export default page
