import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/physics',
  title: t('physics', 'physics'),
  description: t(
    'Arcade collision: a floor, walls you slide along, triggers, sphere hits and raycasts. Not a rigid-body simulation.',
    'Colisão arcade: um chão, paredes em que se desliza, triggers, colisões esféricas e raycasts. Não é uma simulação de corpos rígidos.',
  ),
  source: 'easy-game-maker/src/engine3d/physics.ts',
  related: ['/3d/controls', '/3d/models', '/3d/engine', '/3d/debug'],
  sections: [
    {
      id: 'model',
      title: t('What it is (and is not)', 'O que é (e o que não é)'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`createPhysics({ gravity, groundFriction, airFriction, maxSlope })` is not a rigid-body simulation, and does not want to be. Nothing tumbles, stacks or conserves momentum. It does the four things games need: do not fall through the floor, do not walk through walls, slide along them rather than stopping dead, and say when two things touched.',
            'O `createPhysics({ gravity, groundFriction, airFriction, maxSlope })` não é uma simulação de corpos rígidos e não quer ser. Nada rola, empilha ou conserva momento. Ele faz as quatro coisas de que os jogos precisam: não atravessar o chão, não atravessar paredes, deslizar por elas em vez de parar de vez, e avisar quando duas coisas se tocaram.',
          ),
        },
        {
          type: 'props',
          title: t('Options (all optional)', 'Opções (todas opcionais)'),
          rows: [
            { name: 'gravity', type: 'number', default: '-24', description: t('Real gravity of -9.81 feels floaty on a game\'s timescale. It is inert after creation (typed `readonly`): bodies fall by the value the world was created with.', 'A gravidade real de -9.81 parece flutuante na escala de tempo de um jogo. Ela não tem efeito depois da criação (tipada como `readonly`): os corpos caem pelo valor com que o mundo foi criado.') },
            { name: 'groundFriction', type: 'number', default: '12', description: t('Horizontal drag per second on the ground.', 'Arrasto horizontal por segundo no chão.') },
            { name: 'airFriction', type: 'number', default: '0.6', description: t('Horizontal drag per second in the air.', 'Arrasto horizontal por segundo no ar.') },
            { name: 'maxSlope', type: 'number', default: '0.7', description: t('The steepest surface, as the y of its normal, that counts as ground.', 'A superfície mais inclinada, como o y da sua normal, que conta como chão.') },
          ],
        },
      ],
    },
    {
      id: 'world',
      title: t('The world and static colliders', 'O mundo e os colisores estáticos'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`createPhysics`', '`createPhysics`'), t('`createPhysics(options?) => Physics`', '`createPhysics(options?) => Physics`'), t('The world: `gravity`, `statics`, `bodies`, `triggers` plus the methods below.', 'O mundo: `gravity`, `statics`, `bodies`, `triggers` mais os métodos abaixo.')],
            [t('`hits`', '`hits`'), t('`hits(a, b, radiusA = 0.5, radiusB = 0.5) => boolean`', '`hits(a, b, radiusA = 0.5, radiusB = 0.5) => boolean`'), t('Whether two spheres touch, for bullets, pickups and hitboxes that need no body. `a` and `b` are anything with a `position` (`Vector3`).', 'Se duas esferas se tocam, para balas, itens e hitboxes que não precisam de body. `a` e `b` são qualquer coisa com uma `position` (`Vector3`).')],
            [t('`inside`', '`inside`'), t('`inside(point, center, size) => boolean`', '`inside(point, center, size) => boolean`'), t('Whether a point is inside an axis-aligned box given as centre and full size (`{ x, y, z }` each).', 'Se um ponto está dentro de uma caixa alinhada aos eixos, dada por centro e tamanho total (`{ x, y, z }` cada).')],
          ],
        },
        {
          type: 'props',
          title: t('Static colliders', 'Colisores estáticos'),
          rows: [
            { name: 'world.addBox(source, extra?)', type: 'BoxCollider', description: t('A solid box. `source` is a mesh (its world bounding box is used) or `{ min: [x, y, z], max: [x, y, z] }`.', 'Uma caixa sólida. `source` é uma malha (usa-se a bounding box no mundo) ou `{ min: [x, y, z], max: [x, y, z] }`.') },
            { name: 'world.addGround(y = 0, extra?)', type: 'GroundCollider', description: t('An infinite floor at height `y`. Cheaper and steadier than a box.', 'Um chão infinito na altura `y`. Mais barato e estável do que uma caixa.') },
            { name: 'world.addSphere(center, radius, extra?)', type: 'SphereCollider', description: t('A solid sphere. `center` is a `Vector3` or `[x, y, z]`.', 'Uma esfera sólida. `center` é um `Vector3` ou `[x, y, z]`.') },
            { name: 'world.addArena(group)', type: 'BoxCollider[]', description: t('Adds one box per child of `group` (what `models.arena()` builds) and returns the colliders.', 'Adiciona uma caixa por filho de `group` (o que o `models.arena()` constrói) e devolve os colisores.') },
            { name: 'world.removeCollider(collider)', type: 'void', description: t('Removes a collider added by any of the above.', 'Remove um colisor adicionado por qualquer um dos anteriores.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'Each `add*` method takes optional extras such as `{ tag: "wall" }` or `{ disabled: true }`, which are spread onto the collider.',
            'Cada método `add*` aceita extras opcionais como `{ tag: "wall" }` ou `{ disabled: true }`, que são espalhados sobre o colisor.',
          ),
        },
      ],
    },
    {
      id: 'bodies',
      title: t('Bodies', 'Bodies'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`world.addBody(config)` creates a moving thing and returns a `WorldBody` with `position`, `velocity`, `radius`, `height`, `grounded`, `contacts`, `enabled` and the hooks below.',
            'O `world.addBody(config)` cria uma coisa que se move e devolve um `WorldBody` com `position`, `velocity`, `radius`, `height`, `grounded`, `contacts`, `enabled` e os hooks abaixo.',
          ),
        },
        {
          type: 'props',
          title: t('`addBody` config', 'Config do `addBody`'),
          rows: [
            { name: 'object', type: 'Object3D | null', description: t('A mesh whose position follows the body every step.', 'Uma malha cuja posição segue o body a cada passo.') },
            { name: 'radius', type: 'number', default: '0.5', description: t('Sphere radius against static colliders.', 'Raio da esfera contra colisores estáticos.') },
            { name: 'height', type: 'number', default: '1', description: t('Not used for static collision: it only sizes the volume that trigger overlap tests.', 'Não é usada na colisão estática: só dimensiona o volume dos testes de sobreposição de triggers.') },
            { name: 'position', type: '[number, number, number]', default: 'the object\'s position, else the origin', description: t('Starting position.', 'Posição inicial.') },
            { name: 'gravityScale', type: 'number', default: '1', description: t('Multiplier on gravity.', 'Multiplicador da gravidade.') },
            { name: 'bounce', type: 'number', default: '0', description: t('Fraction of impact speed given back on landing.', 'Fração da velocidade de impacto devolvida ao pousar.') },
            { name: 'friction', type: 'number', default: 'the world\'s groundFriction', description: t('Ground friction for this body.', 'Atrito com o chão deste body.') },
            { name: 'trigger', type: 'boolean', default: 'false', description: t('Detects without blocking: pickups, checkpoints, damage zones.', 'Detecta sem bloquear: itens, checkpoints, zonas de dano.') },
            { name: 'tag', type: 'string | null', default: 'null', description: t('A label you can use to tell bodies apart.', 'Um rótulo para distinguir bodies.') },
            { name: 'data', type: 'Record<string, unknown>', default: '{}', description: t('Free-form data carried on the body.', 'Dados livres carregados no body.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'Against static colliders a body is a sphere of `radius` centred on `position`: that is what slides along walls and steps round corners without catching, which a box does not. A body placed exactly at the centre of a box leaves through the nearest face. Set `velocity.x` and `velocity.z` outright for walking (adding force makes a character coast after the key is released) and set `velocity.y` once for a jump.',
            'Contra colisores estáticos, um body é uma esfera de `radius` centrada em `position`: é isso que desliza pelas paredes e contorna quinas sem prender, o que uma caixa não faz. Um body posto exatamente no centro de uma caixa sai pela face mais próxima. Defina `velocity.x` e `velocity.z` diretamente para andar (somar força faz o personagem deslizar depois de soltar a tecla) e defina `velocity.y` uma vez para pular.',
          ),
        },
        {
          type: 'props',
          title: t('World methods', 'Métodos do mundo'),
          rows: [
            { name: 'world.step(dt)', type: 'void', description: t('Advances the world: gravity, movement, collision, drag, `onLand`, trigger events. Call it once per frame from `onUpdate`. It does not sub-step: a large `dt` is only saved by the ground clamp (the engine already caps `dt` at 1/15 s).', 'Avança o mundo: gravidade, movimento, colisão, arrasto, `onLand`, eventos de trigger. Chame uma vez por quadro no `onUpdate`. Não divide em subpassos: um `dt` grande só é salvo pelo limite do chão (a engine já limita `dt` a 1/15 s).') },
            { name: 'world.removeBody(body)', type: 'void', description: t('Removes a body or a trigger (and forgets what it was touching).', 'Remove um body ou um trigger (e esquece no que ele estava encostando).') },
            { name: 'world.overlaps(a, b)', type: 'boolean', description: t('Whether two bodies\' volumes overlap: horizontal reach of the two `radius` values and vertical reach of the two `height` values.', 'Se os volumes de dois bodies se sobrepõem: alcance horizontal dos dois `radius` e vertical das duas `height`.') },
            { name: 'world.groundAt(x, z, meshes, from = 100)', type: 'number | null', description: t('The height of the ground under a point by raycasting real meshes. For terrain and ramps that box colliders cannot describe.', 'A altura do chão sob um ponto por raycast em malhas reais. Para terreno e rampas que colisores de caixa não descrevem.') },
            { name: 'world.raycast(origin, direction, meshes, far = 1000)', type: 'RayHit | null', description: t('The first thing a ray hits as `{ point, normal, object, distance }`.', 'A primeira coisa que um raio atinge, como `{ point, normal, object, distance }`.') },
          ],
        },
      ],
    },
    {
      id: 'hooks',
      title: t('Triggers and hooks', 'Triggers e hooks'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Hooks are properties you assign on the body (they are not `addBody` options). `onEnter` and `onExit` fire once as a body starts and stops overlapping a trigger, and `onLand` fires when a body touches down after being in the air. A trigger is checked after everything else moved, so a pickup is collected at the position the player ended the frame at.',
            'Hooks são propriedades que você atribui ao body (não são opções do `addBody`). `onEnter` e `onExit` disparam uma vez quando um body começa e para de sobrepor um trigger, e `onLand` dispara quando um body pousa depois de estar no ar. Um trigger é verificado depois que tudo o mais se moveu, então um item é coletado na posição em que o jogador terminou o quadro.',
          ),
        },
        {
          type: 'p',
          text: t(
            '`body.contacts` is rewritten by every `step`: the surfaces hit, as `{ collider, normal }`, for wall-jumps and dust. `body.grounded` is true when a contact\'s normal has a y above `maxSlope`. `body.enabled = false` skips the body.',
            '`body.contacts` é reescrito a cada `step`: as superfícies atingidas, como `{ collider, normal }`, para wall-jumps e poeira. `body.grounded` é verdadeiro quando a normal de um contato tem y acima de `maxSlope`. `body.enabled = false` faz o mundo ignorar o body.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Feet-origin models sit radius too high', 'Modelos com origem nos pés ficam radius acima'),
          text: t(
            '`step` copies `body.position` onto `body.object.position` with no offset. A body\'s position is its sphere centre, so an object whose origin is at its feet (like `models.character`) sits `radius` higher than the ground unless a controller offsets it. `firstPerson` and `thirdPerson` do that; `platformer` does not (see [controls](/3d/controls)).',
            'O `step` copia `body.position` para `body.object.position` sem deslocamento. A posição de um body é o centro da esfera, então um objeto com origem nos pés (como o `models.character`) fica `radius` mais alto que o chão, a menos que um controlador o desloque. `firstPerson` e `thirdPerson` fazem isso; o `platformer` não (veja [controls](/3d/controls)).',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: arena, wall and coin', 'Exemplo: arena, parede e moeda'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { createPhysics, createGame, hits, lights, models } from 'easy-game-maker/3d';

const game = createGame({ background: '#0b1020', cameraPosition: [0, 12, 16] });
lights.daylight(game.scene);

const world = createPhysics();
world.addGround(0);

const arena = models.arena(30);
game.add(arena);
world.addArena(arena);

const wall = models.box([6, 3, 1], { color: '#64748b', position: [0, 1.5, -4] });
game.add(wall);
world.addBox(wall, { tag: 'wall' });

const ball = models.sphere(0.5, { color: '#f97316' });
game.add(ball);
const body = world.addBody({ object: ball, radius: 0.5, position: [0, 3, 4], bounce: 0.4 });
body.onLand = () => game.audio.play('jump');

const coin = models.sphere(0.4, { color: '#facc15', position: [4, 1, 4] });
game.add(coin);
const pickup = world.addBody({ object: coin, radius: 1, height: 2, trigger: true, position: [4, 1, 4] });
pickup.onEnter = (other) => {
  if (other === body) coin.visible = false;
};

game.onUpdate((dt) => {
  // Walking: set x and z outright, never add force.
  body.velocity.x = game.input.move.x * 6;
  body.velocity.z = game.input.move.y * 6;
  if (game.input.pressed('jump') && body.grounded) body.velocity.y = 10;

  world.step(dt);

  // No body needed for a quick sphere test.
  if (coin.visible && hits(ball, coin, 0.5, 0.4)) coin.visible = false;
});
`,
        },
        {
          type: 'p',
          text: t(
            'Exported types: `Physics`, `PhysicsOptions`, `PhysicsBody` (the part controllers rely on), `WorldBody` (what `addBody` returns), `BodyConfig`, `Collider` (a union of `BoxCollider`, `GroundCollider` and `SphereCollider`), `ColliderExtras`, `BoxBounds`, `Contact` and `RayHit`.',
            'Tipos exportados: `Physics`, `PhysicsOptions`, `PhysicsBody` (a parte de que os controladores dependem), `WorldBody` (o que o `addBody` devolve), `BodyConfig`, `Collider` (uma união de `BoxCollider`, `GroundCollider` e `SphereCollider`), `ColliderExtras`, `BoxBounds`, `Contact` e `RayHit`.',
          ),
        },
      ],
    },
  ],
}

export default page
