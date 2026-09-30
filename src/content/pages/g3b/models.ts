import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/models',
  title: t('models', 'models'),
  description: t(
    'Primitives, prefabs, instancing, pooling and loaders: everything you put in a 3D scene without shipping a single art asset.',
    'Primitivos, prefabs, instâncias, pools e loaders: tudo o que você coloca numa cena 3D sem precisar de nenhum asset de arte.',
  ),
  source: 'src/engine3d/models',
  related: ['/3d/materials', '/3d/lights', '/3d/effects', '/3d/physics'],
  sections: [
    {
      id: 'overview',
      title: t('Built from primitives', 'Montado com primitivos'),
      blocks: [
        {
          type: 'p',
          text: t(
            'EGM ships no art assets and no model to download. Every object is assembled from boxes, spheres and cylinders, which is what most stylised games look like anyway. The `models` namespace already does the assembling.',
            'A EGM não traz nenhum asset de arte nem modelo para baixar. Todo objeto é montado com caixas, esferas e cilindros, que é o visual de boa parte dos jogos estilizados. O namespace `models` já faz essa montagem.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('A lit scene with a few models', 'Uma cena iluminada com alguns models'),
          code: `import { createGame, models, lights } from 'easy-game-maker/3d'

const game = createGame({ background: '#0b1020', cameraPosition: [0, 6, 12] })
lights.daylight(game.scene)

game.add(models.ground(60))
game.add(models.box(2, { color: '#f97316', radius: 0.15, position: [-3, 1, 0] }))
game.add(models.sphere(0.8, { color: '#22d3ee', position: [0, 0.8, 0] }))

const hero = game.add(models.character({ shirt: '#ef4444' }))
hero.position.set(3, 0, 0)

game.onUpdate((_dt, elapsed) => {
  hero.userData.animate(elapsed, 1)
})`,
        },
      ],
    },
    {
      id: 'primitives',
      title: t('Primitives', 'Primitivos'),
      description: t(
        'Every primitive returns a Mesh with shadows already configured (it casts and receives).',
        'Todo primitivo devolve um Mesh com as sombras já configuradas (ele projeta e recebe).',
      ),
      blocks: [
        {
          type: 'p',
          text: t(
            'All primitives accept `{ color, material, position }`: a colour for the default matte material, a ready `material` (which wins over `color`) and a starting `[x, y, z]`.',
            'Todos os primitivos aceitam `{ color, material, position }`: uma cor para o material fosco padrão, um `material` pronto (que vence a `color`) e um `[x, y, z]` inicial.',
          ),
        },
        {
          type: 'table',
          head: [t('Function', 'Função'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`models.box`', '`models.box`'), t('`box(size = 1, { radius, ... })`', '`box(size = 1, { radius, ... })`'), t('`size` is a number (cube) or `[w, h, d]`. A `radius` above 0 rounds the corners.', '`size` é um número (cubo) ou `[w, h, d]`. Um `radius` acima de 0 arredonda os cantos.')],
            [t('`models.sphere`', '`models.sphere`'), t('`sphere(radius = 0.5, { segments = 24 })`', '`sphere(radius = 0.5, { segments = 24 })`'), t('A sphere.', 'Esfera.')],
            [t('`models.cylinder`', '`models.cylinder`'), t('`cylinder(radius = 0.5, height = 1, { segments = 20 })`', '`cylinder(radius = 0.5, height = 1, { segments = 20 })`'), t('A cylinder.', 'Cilindro.')],
            [t('`models.cone`', '`models.cone`'), t('`cone(radius = 0.5, height = 1, { segments = 20 })`', '`cone(radius = 0.5, height = 1, { segments = 20 })`'), t('A cone.', 'Cone.')],
            [t('`models.capsule`', '`models.capsule`'), t('`capsule(radius = 0.4, height = 1, options)`', '`capsule(radius = 0.4, height = 1, options)`'), t('A capsule.', 'Cápsula.')],
            [t('`models.torus`', '`models.torus`'), t('`torus(radius = 0.6, tube = 0.2, options)`', '`torus(radius = 0.6, tube = 0.2, options)`'), t('A torus (donut).', 'Toro (rosca).')],
            [t('`models.ground`', '`models.ground`'), t('`ground(size = 100, { color, accent, texture, repeat, material })`', '`ground(size = 100, { color, accent, texture, repeat, material })`'), t('The floor, already in the XZ plane, checkered by default. `texture: null` leaves it plain. It receives shadows but does not cast them.', 'O chão, já no plano XZ, xadrez por padrão. `texture: null` deixa liso. Ele recebe sombras, mas não projeta.')],
            [t('`models.arena`', '`models.arena`'), t('`arena(size = 40, { height = 3, thickness = 1, color, material })`', '`arena(size = 40, { height = 3, thickness = 1, color, material })`'), t('Four walls around the play area. Its `userData.bounds` holds `{ size, height, thickness }`.', 'Quatro paredes em volta da área de jogo. O `userData.bounds` guarda `{ size, height, thickness }`.')],
            [t('`models.castShadows`', '`models.castShadows`'), t('`castShadows(object, cast = true, receive = true)`', '`castShadows(object, cast = true, receive = true)`'), t('Sets `castShadow` and `receiveShadow` on every mesh under `object`. The step everyone forgets after loading a model.', 'Liga `castShadow` e `receiveShadow` em todo mesh sob `object`. O passo que todo mundo esquece depois de carregar um modelo.')],
          ],
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Ground defaults', 'Padrões do ground'),
          text: t(
            'Defaults are `color` `#1f1f1f`, `accent` `#171717` and `repeat` of `size / 4`. A plain-coloured floor gives the player no sense of speed, which is why the checkerboard is the default.',
            'Os padrões são `color` `#1f1f1f`, `accent` `#171717` e `repeat` igual a `size / 4`. Um chão de cor lisa não dá noção de velocidade ao jogador, e é por isso que o xadrez é o padrão.',
          ),
        },
      ],
    },
    {
      id: 'prefabs',
      title: t('Prefabs', 'Prefabs'),
      blocks: [
        {
          type: 'table',
          head: [t('Function', 'Função'), t('What you get', 'O que você recebe')],
          rows: [
            [t('`models.crate(size = 1, { color, accent })`', '`models.crate(size = 1, { color, accent })`'), t('Rounded box with a darker edge frame.', 'Caixa arredondada com uma moldura de borda mais escura.')],
            [t('`models.coin({ radius, color, thickness })`', '`models.coin({ radius, color, thickness })`'), t('A glowing collectible. Call `coin.userData.update(dt, elapsed)` each frame to spin and hover it.', 'Um colecionável brilhante. Chame `coin.userData.update(dt, elapsed)` a cada quadro para girar e flutuar.')],
            [t('`models.tree({ height, trunk, leaves, tiers })`', '`models.tree({ height, trunk, leaves, tiers })`'), t('Low-poly conifer. Height (2.5 to 4) and tiers (2 or 3) are random by default.', 'Conífera low-poly. Altura (2,5 a 4) e camadas (2 ou 3) são aleatórias por padrão.')],
            [t('`models.rock({ radius, color, jitter })`', '`models.rock({ radius, color, jitter })`'), t('A faceted boulder, never twice the same.', 'Uma pedra facetada, nunca duas iguais.')],
            [t('`models.cloud({ color, puffs, spread })`', '`models.cloud({ color, puffs, spread })`'), t('A few blobs. It casts no shadow.', 'Algumas bolhas. Não projeta sombra.')],
            [t('`models.character({ skin, shirt, trousers, height })`', '`models.character({ skin, shirt, trousers, height })`'), t('A blocky humanoid with its origin at the feet. See below.', 'Um humanoide de blocos com a origem nos pés. Veja abaixo.')],
            [t('`models.vehicle({ color, accent, length, width })`', '`models.vehicle({ color, accent, length, width })`'), t('A simple car or ship body pointing down -Z.', 'Um corpo simples de carro ou nave apontando para -Z.')],
            [t('`models.ring({ radius, color, thickness })`', '`models.ring({ radius, color, thickness })`'), t('A flat transparent ring on the ground that you animate yourself. `effects.shockwave` is the ready-made expanding one.', 'Um anel plano e transparente no chão que você anima por conta própria. O `effects.shockwave` é a versão pronta que se expande.')],
            [t('`models.label(text, { color, size, background, font })`', '`models.label(text, { color, size, background, font })`'), t('Floating text that always faces the camera (a sprite). `label.setText(next)` swaps the text in place.', 'Texto flutuante que sempre encara a câmera (um sprite). `label.setText(next)` troca o texto no lugar.')],
          ],
        },
        {
          type: 'props',
          title: t('character', 'character'),
          rows: [
            { name: 'userData.parts', type: 'CharacterParts', description: t('`head`, `body`, `armLeft`, `armRight`, `legLeft`, `legRight`. The limbs are pivot groups.', '`head`, `body`, `armLeft`, `armRight`, `legLeft`, `legRight`. Os membros são grupos de pivô.') },
            { name: 'userData.animate', type: '(elapsed: number, speed?: number) => void', description: t('A walk cycle. Speed 0 settles into an idle sway.', 'Um ciclo de caminhada. Velocidade 0 vira um balanço parado.') },
            { name: 'userData.height', type: 'number', description: t('Total height (default 1.8).', 'Altura total (padrão 1,8).') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('coin.update resets y', 'coin.update zera o y'),
          text: t(
            '`coin.userData.update` resets the coin\'s `position.y` to about 0 on every call, so a coin placed at y = 2 loses its height. Put the coin inside a parent group and lift the group instead.',
            '`coin.userData.update` zera o `position.y` da moeda (perto de 0) a cada chamada, então uma moeda posicionada em y = 2 perde a altura. Coloque a moeda dentro de um grupo pai e suba o grupo.',
          ),
        },
      ],
    },
    {
      id: 'scale',
      title: t('Scale: instances, merge and pools', 'Escala: instâncias, merge e pools'),
      blocks: [
        {
          type: 'list',
          items: [
            t(
              '`models.instances(geometry, material, count)` draws thousands of copies in one draw call. The `InstancedMesh` has `place(i, position, { scale, rotation })`, `hide(i)` and `tint(i, color)`, all chainable.',
              '`models.instances(geometry, material, count)` desenha milhares de cópias numa única draw call. O `InstancedMesh` tem `place(i, position, { scale, rotation })`, `hide(i)` e `tint(i, color)`, todos encadeáveis.',
            ),
            t(
              '`models.merge(meshes)` welds static scenery into one mesh (world transforms are baked in). It uses the first mesh\'s material, and every geometry must carry the same attributes.',
              '`models.merge(meshes)` solda cenário estático num único mesh (as transformações de mundo são embutidas). Ele usa o material do primeiro mesh, e toda geometria precisa ter os mesmos atributos.',
            ),
            t(
              '`models.createPool(factory, { size = 32, parent, onTake, onGive })` gives you `take()` and `give(item)` instead of `new` and discard. Members: `each(fn)` (return `true` to retire the item), `clear()`, `live` and `count`.',
              '`models.createPool(factory, { size = 32, parent, onTake, onGive })` dá `take()` e `give(item)` no lugar de `new` e descartar. Membros: `each(fn)` (devolva `true` para aposentar o item), `clear()`, `live` e `count`.',
            ),
          ],
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('A forest, a field of stars and a bullet pool', 'Uma floresta, um campo de estrelas e um pool de balas'),
          code: `import * as THREE from 'three'
import { createGame, models, lights, materials, math } from 'easy-game-maker/3d'

const game = createGame({ background: '#0b1020' })
lights.daylight(game.scene)
game.add(models.ground(80))

// One draw call for 500 pebbles.
const pebbles = models.instances(new THREE.SphereGeometry(0.15, 8, 6), materials.matte('#94a3b8'), 500)
for (let i = 0; i < 500; i++) {
  pebbles.place(i, [math.randSpread(30), 0.1, math.randSpread(30)], { scale: math.randRange(0.5, 1.5) })
}
game.add(pebbles)

// Reuse bullets instead of allocating one per shot.
const bullets = models.createPool(() => models.sphere(0.1, { color: '#facc15' }), { size: 64, parent: game.scene })
const fire = () => {
  const bullet = bullets.take()
  bullet.position.set(0, 1, 0)
}

game.onUpdate((dt) => {
  bullets.each((bullet) => {
    bullet.position.z -= 20 * dt
    return bullet.position.z < -40
  })
})
setInterval(fire, 400)`,
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Behavior notes', 'Notas de comportamento'),
          text: t(
            '`instances.hide(i)` moves instance `i` to y = -9999 with a tiny scale: it is not removed from the buffer. A pool\'s `size` is only pre-allocation, so `take()` beyond it creates more objects. `merge([])` and `merge` with incompatible geometries throw an `Error`.',
            '`instances.hide(i)` move a instância `i` para y = -9999 com escala minúscula: ela não sai do buffer. O `size` de um pool é só pré-alocação, então `take()` além dele cria mais objetos. `merge([])` e `merge` com geometrias incompatíveis lançam um `Error`.',
          ),
        },
      ],
    },
    {
      id: 'loading',
      title: t('Loading your own files', 'Carregando arquivos próprios'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`models.loadModel(url)` loads a `.glb` or `.gltf` (glTF, the GL Transmission Format) and resolves `{ scene, animations, gltf }` with shadows already enabled. Pair `animations` with `anim.createMixer`. `models.loadTexture(url, { data, repeat })` resolves a texture tagged sRGB unless `data: true` (normal or roughness maps), tiled `repeat: [x, y]` times when given.',
            '`models.loadModel(url)` carrega um `.glb` ou `.gltf` (glTF, o GL Transmission Format) e resolve `{ scene, animations, gltf }` com as sombras já ligadas. Combine `animations` com `anim.createMixer`. `models.loadTexture(url, { data, repeat })` resolve uma textura marcada como sRGB, a menos que `data: true` (mapas de normal ou rugosidade), repetida `repeat: [x, y]` vezes quando informado.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Loading a model with its clips', 'Carregando um modelo com seus clipes'),
          code: `import { createGame, models, lights, createMixer } from 'easy-game-maker/3d'

const game = createGame()
lights.studio(game.scene)

async function main() {
  const { scene, animations } = await models.loadModel('/assets/robot.glb')
  game.add(scene)
  const mixer = createMixer(scene, animations, game.engine)
  mixer.play(mixer.names()[0] ?? '')
}
main().catch((error) => console.error('model failed to load', error))`,
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'Both loaders return promises that reject on a wrong address. EGM ships no local model, so use them only for a file you are certain resolves. An address on another origin also needs a content security policy that allows it.',
            'Os dois loaders devolvem promises que são rejeitadas quando o endereço está errado. A EGM não traz modelo local, então use só para um arquivo que você tem certeza que existe. Um endereço em outra origem também precisa de uma política de segurança de conteúdo que o permita.',
          ),
        },
      ],
    },
  ],
}

export default page
