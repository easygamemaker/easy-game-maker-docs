import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/debug',
  title: t('debug', 'debug'),
  description: t(
    'Stats, grid and axes, shadow frustum, collider wireframes and a throttled logger: things to look at while building.',
    'Estatísticas, grade e eixos, frustum de sombra, wireframes de colisores e um logger com limite de frequência: coisas para olhar durante o desenvolvimento.',
  ),
  source: 'src/engine3d/debug.ts',
  related: ['/3d/physics', '/3d/lights', '/3d/probe', '/3d/engine'],
  sections: [
    {
      id: 'overview',
      title: t('For building, not for shipping', 'Para construir, não para publicar'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Import the `debug` namespace. The alternative to these helpers is `console.log` in a render loop, which floods the console and drops the framerate enough to hide the problem being investigated. Take them out before shipping.',
            'Importe o namespace `debug`. A alternativa a esses helpers é um `console.log` no loop de renderização, que inunda o console e derruba a taxa de quadros a ponto de esconder o problema investigado. Tire-os antes de publicar.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Stats, helpers and colliders', 'Stats, helpers e colisores'),
          code: `import { createGame, createPhysics, models, lights, debug } from 'easy-game-maker/3d'

const game = createGame()
const { sun } = lights.daylight(game.scene, { area: 20 })
game.add(models.ground(40))

const physics = createPhysics()

const stats = debug.showStats(game.engine, { at: 'top-right' })
const helpers = debug.showHelpers(game, { grid: 40, axes: 5, light: sun })
const colliders = debug.showColliders(game, physics)

game.onUpdate((_dt, elapsed) => debug.log('elapsed', elapsed.toFixed(1), 1))

// Before shipping:
export function stripDebug() {
  stats.remove()
  helpers.remove()
  colliders.remove()
}`,
        },
      ],
    },
    {
      id: 'api',
      title: t('The helpers', 'Os helpers'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`debug.showStats`', '`debug.showStats`'), t('`showStats(engine, { at = \'top-right\' }) => { element, remove() }`', '`showStats(engine, { at = \'top-right\' }) => { element, remove() }`'), t('A readout of framerate, draw calls, triangles, geometries and textures, rewritten four times a second. `at` is `"top-left"`, `"top-right"`, `"bottom-left"` or `"bottom-right"`.', 'Um painel com taxa de quadros, draw calls, triângulos, geometrias e texturas, reescrito quatro vezes por segundo. `at` é `"top-left"`, `"top-right"`, `"bottom-left"` ou `"bottom-right"`.')],
            [t('`debug.showHelpers`', '`debug.showHelpers`'), t('`showHelpers(engine, { grid = 40, axes = 5, light }) => { helpers, remove() }`', '`showHelpers(engine, { grid = 40, axes = 5, light }) => { helpers, remove() }`'), t('A grid, axes and (with `light`, a light that has a shadow) the shadow camera\'s frustum: shadows that vanish at the edge of the level are always that box being too small. `grid: 0` or `axes: 0` skips one.', 'Uma grade, eixos e (com `light`, uma luz que tenha sombra) o frustum da câmera de sombra: sombras que somem na borda da fase são sempre essa caixa pequena demais. `grid: 0` ou `axes: 0` pula um deles.')],
            [t('`debug.showColliders`', '`debug.showColliders`'), t('`showColliders(engine, physics, { color = \'#22c55e\' }) => { group, remove() }`', '`showColliders(engine, physics, { color = \'#22c55e\' }) => { group, remove() }`'), t('Draws a physics world\'s box colliders as wireframes and each body as an orange wireframe sphere, so mismatches with the art are visible.', 'Desenha os colisores de caixa de um mundo de física como wireframes e cada corpo como uma esfera wireframe laranja, para expor diferenças em relação à arte.')],
            [t('`debug.log`', '`debug.log`'), t('`log(label, value, everySeconds = 0.5)`', '`log(label, value, everySeconds = 0.5)`'), t('A throttled logger for values that change every frame: it prints a few times a second instead of ten thousand. It is the one place the engine writes to the console, on purpose.', 'Um logger com limite de frequência para valores que mudam a cada quadro: imprime algumas vezes por segundo em vez de dez mil. É o único lugar em que a engine escreve no console, de propósito.')],
          ],
        },
        {
          type: 'p',
          text: t(
            '`showStats` and `showColliders` update in the engine\'s late update, so they read where things ended up.',
            '`showStats` e `showColliders` atualizam no late update da engine, então leem onde as coisas terminaram.',
          ),
        },
      ],
    },
    {
      id: 'hosts',
      title: t('game or game.engine', 'game ou game.engine'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`showHelpers` and `showColliders` accept `game` or `game.engine`. `showStats` reads `container` and `fps`, which `game` does not have, so pass `game.engine`.',
            '`showHelpers` e `showColliders` aceitam `game` ou `game.engine`. `showStats` lê `container` e `fps`, que o `game` não tem, então passe `game.engine`.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Colliders are a snapshot', 'Colisores são um retrato'),
          text: t(
            '`showColliders` snapshots the colliders and bodies at call time: ones added later are not drawn. It also never disposes its geometry. Call it after the world is built.',
            '`showColliders` tira um retrato dos colisores e corpos no momento da chamada: os adicionados depois não são desenhados. Ele também nunca descarta a própria geometria. Chame depois que o mundo estiver montado.',
          ),
        },
      ],
    },
  ],
}

export default page
