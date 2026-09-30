import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/controls',
  title: t('controls', 'controls'),
  description: t(
    'Camera rigs and character controllers: follow, top-down, side, orbit, first person, third person and platformer.',
    'Câmeras e controladores de personagem: seguir, vista de cima, lateral, órbita, primeira pessoa, terceira pessoa e plataforma.',
  ),
  source: 'easy-game-maker/src/engine3d/controls.ts',
  related: ['/3d/physics', '/3d/input', '/3d/engine', '/3d/quickstart'],
  sections: [
    {
      id: 'overview',
      title: t('How rigs and controllers work', 'Como kits e controladores funcionam'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The camera is half of how a 3D game feels, and a camera glued rigidly to the player transmits every bump straight into the viewport. Every rig here smooths, and smooths in a way that does not change with the framerate.',
            'A câmera é metade da sensação de um jogo 3D, e uma câmera colada rigidamente no jogador transmite cada tranco direto para a tela. Todos os kits aqui suavizam, e suavizam de um jeito que não muda com o framerate.',
          ),
        },
        {
          type: 'list',
          items: [
            t('Controllers write to a physics `body` when given one, and straight to the object\'s position when not, so they work before a game has any collision (see [physics](/3d/physics)).', 'Os controladores escrevem em um `body` de física quando recebem um, e direto na posição do objeto quando não, então funcionam antes de o jogo ter qualquer colisão (veja [physics](/3d/physics)).'),
            t('Every rig and controller returns a `stop()` that removes what it registered.', 'Todo kit e controlador devolve um `stop()` que remove o que registrou.'),
            t('The first argument is an engine host. `followCamera`, `topDownCamera`, `sideCamera`, `thirdPerson`, `platformer`, `pointerOnGround` and `pointerPicker` accept `game` or `game.engine`. `orbitCamera` and `firstPerson` need `game.engine`, because they read `canvas` (passing `game` fails to type-check).', 'O primeiro argumento é um host de engine. `followCamera`, `topDownCamera`, `sideCamera`, `thirdPerson`, `platformer`, `pointerOnGround` e `pointerPicker` aceitam `game` ou `game.engine`. `orbitCamera` e `firstPerson` exigem `game.engine`, porque leem o `canvas` (passar `game` não passa na checagem de tipos).'),
          ],
        },
      ],
    },
    {
      id: 'cameras',
      title: t('Cameras', 'Câmeras'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`followCamera`', '`followCamera`'), t('`followCamera(engine, target, { distance, height, stiffness, lookHeight, lookAhead, behind }) => rig`', '`followCamera(engine, target, { distance, height, stiffness, lookHeight, lookAhead, behind }) => rig`'), t('Third-person chase in `onLateUpdate`. Defaults 8, 4, 6, 1, 0, true. `behind` turns with the target instead of staying behind it in world space. `lookAhead` looks that many seconds ahead along `target.userData.velocity`. Rig: `target`, `distance`, `height`, `stiffness`, `shake(amount = 0.4, decay = 4)`, `setTarget(next)`, `stop()`.', 'Perseguição em terceira pessoa no `onLateUpdate`. Padrões 8, 4, 6, 1, 0, true. `behind` gira com o alvo em vez de ficar atrás dele no espaço do mundo. `lookAhead` olha essa quantidade de segundos à frente, ao longo de `target.userData.velocity`. Rig: `target`, `distance`, `height`, `stiffness`, `shake(amount = 0.4, decay = 4)`, `setTarget(next)`, `stop()`.')],
            [t('`topDownCamera`', '`topDownCamera`'), t('`topDownCamera(engine, target, { height, tilt, stiffness, bounds }) => rig`', '`topDownCamera(engine, target, { height, tilt, stiffness, bounds }) => rig`'), t('Twin-stick, strategy, puzzle. Defaults 18, 0.35, 6. `tilt` is how far back from straight down, as a fraction of `height`. `bounds: { minX, maxX, minZ, maxZ }` keeps the camera inside a rectangle. Rig: `target`, `height`, `stiffness`, `stop()`.', 'Twin-stick, estratégia, puzzle. Padrões 18, 0.35, 6. `tilt` é o quanto a câmera recua da vertical, como fração de `height`. `bounds: { minX, maxX, minZ, maxZ }` mantém a câmera dentro de um retângulo. Rig: `target`, `height`, `stiffness`, `stop()`.')],
            [t('`sideCamera`', '`sideCamera`'), t('`sideCamera(engine, target, { distance, stiffness, offsetY, deadzone }) => rig`', '`sideCamera(engine, target, { distance, stiffness, offsetY, deadzone }) => rig`'), t('A 2D-style side view for platformers: tracks X and Y, never Z. Defaults 14, 5, 1.5, 1.2. The deadzone means small hops do not bob the view. Rig: `target`, `distance`, `stiffness`, `stop()`.', 'Uma vista lateral estilo 2D para plataformas: acompanha X e Y, nunca Z. Padrões 14, 5, 1.5, 1.2. A deadzone faz pulinhos não balançarem a vista. Rig: `target`, `distance`, `stiffness`, `stop()`.')],
            [t('`orbitCamera`', '`orbitCamera`'), t('`orbitCamera(engine, { target, minDistance, maxDistance, autoRotate }) => rig`', '`orbitCamera(engine, { target, minDistance, maxDistance, autoRotate }) => rig`'), t('Mouse orbit for menus and model viewers. Wraps three\'s `OrbitControls` (with damping, and it will not go under the floor). Defaults `[0, 0, 0]`, 2, 80, false. The rig is the `OrbitControls` plus `stop()`.', 'Órbita com o mouse para menus e visualizadores de modelo. Envolve o `OrbitControls` do three (com amortecimento, e não desce abaixo do chão). Padrões `[0, 0, 0]`, 2, 80, false. O rig é o `OrbitControls` mais `stop()`.')],
          ],
        },
        {
          type: 'p',
          text: t(
            '`followCamera` smooths the position and the look-at point separately: snapping the look point is what causes the jitter people try to fix by smoothing the position harder. `stiffness` is how quickly it catches up. Low is cinematic, high is responsive, and a fast game wants 8 or more or the player outruns their own view.',
            'O `followCamera` suaviza a posição e o ponto de mira separadamente: teleportar o ponto de mira é o que causa a tremedeira que as pessoas tentam corrigir suavizando mais a posição. `stiffness` é a rapidez com que ela alcança o alvo. Baixo é cinematográfico, alto é responsivo, e um jogo rápido quer 8 ou mais, ou o jogador ultrapassa a própria vista.',
          ),
        },
      ],
    },
    {
      id: 'controllers',
      title: t('Controllers', 'Controladores'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`firstPerson`', '`firstPerson`'), t('`firstPerson(engine, input, { body, speed, sprintSpeed, jump, sensitivity, eyeHeight, position, lockOnClick }) => controller`', '`firstPerson(engine, input, { body, speed, sprintSpeed, jump, sensitivity, eyeHeight, position, lockOnClick }) => controller`'), t('Mouse look, WASD, jump and head bob. Jump needs a `body`: without one there is no gravity. Mouse look applies while the pointer is locked (a click on the canvas requests it), or always with `lockOnClick: false`. Defaults: speed 7, sprintSpeed 11, jump 9, sensitivity 0.0022 rad per pixel, eyeHeight 1.7, position `[0, eyeHeight, 6]`, lockOnClick true. Controller: `object`, `body`, `speed`, `grounded`, `stop()`.', 'Mouse look, WASD, pulo e balanço de cabeça. O pulo exige um `body`: sem ele não há gravidade. O mouse look vale enquanto o ponteiro está travado (um clique no canvas pede o lock), ou sempre com `lockOnClick: false`. Padrões: speed 7, sprintSpeed 11, jump 9, sensitivity 0.0022 rad por pixel, eyeHeight 1.7, position `[0, eyeHeight, 6]`, lockOnClick true. Controlador: `object`, `body`, `speed`, `grounded`, `stop()`.')],
            [t('`thirdPerson`', '`thirdPerson`'), t('`thirdPerson(engine, input, object, { body, speed, sprintSpeed, jump, turnRate, relativeTo }) => controller`', '`thirdPerson(engine, input, object, { body, speed, sprintSpeed, jump, turnRate, relativeTo }) => controller`'), t('The character moves in camera space and turns to face travel (the shortest way round, via `math.dampAngle`). Jump needs a `body`. Defaults: speed 6, sprintSpeed 10, jump 10, turnRate 12, `relativeTo` the engine camera. Controller: `object`, `body`, `speed`, `velocity`, `travel` (0..1, for a walk cycle or footsteps), `grounded`, `stop()`.', 'O personagem se move no espaço da câmera e vira para o lado do movimento (pelo caminho mais curto, via `math.dampAngle`). O pulo exige um `body`. Padrões: speed 6, sprintSpeed 10, jump 10, turnRate 12, `relativeTo` a câmera da engine. Controlador: `object`, `body`, `speed`, `velocity`, `travel` (0..1, para um ciclo de caminhada ou passos), `grounded`, `stop()`.')],
            [t('`platformer`', '`platformer`'), t('`platformer(engine, input, object, { body, speed, acceleration, jump, gravity, coyoteTime, jumpBuffer, shortHopFactor, plane }) => controller`', '`platformer(engine, input, object, { body, speed, acceleration, jump, gravity, coyoteTime, jumpBuffer, shortHopFactor, plane }) => controller`'), t('Left/right, jump and gravity. The only controller that brings its own gravity and a floor (at y = 0) when there is no `body`. Defaults: speed 8, acceleration 60, jump 14, gravity -40 (only without a body), coyoteTime 0.12, jumpBuffer 0.12, shortHopFactor 0.45, plane `"x"` (the axis `move.x` drives, or `"z"` for a depth view). Coyote time, a jump buffer and variable jump height are built in. Controller: `object`, `body`, `velocity`, `speed`, `grounded`, `stop()`.', 'Esquerda/direita, pulo e gravidade. É o único controlador que traz a própria gravidade e um chão (em y = 0) quando não há `body`. Padrões: speed 8, acceleration 60, jump 14, gravity -40 (só sem body), coyoteTime 0.12, jumpBuffer 0.12, shortHopFactor 0.45, plane `"x"` (o eixo que o `move.x` controla, ou `"z"` para vista em profundidade). Coyote time, jump buffer e altura de pulo variável já vêm embutidos. Controlador: `object`, `body`, `velocity`, `speed`, `grounded`, `stop()`.')],
            [t('`pointerOnGround`', '`pointerOnGround`'), t('`pointerOnGround(engine, input, height = 0) => () => Vector3 | null`', '`pointerOnGround(engine, input, height = 0) => () => Vector3 | null`'), t('Returns a function giving where the cursor ray meets the horizontal plane at `height`: aiming, click-to-move, tower placement. It works over empty space. The returned vector is reused between calls, so copy it to keep it.', 'Devolve uma função que informa onde o raio do cursor encontra o plano horizontal em `height`: mira, clicar para mover, posicionar torres. Funciona sobre espaço vazio. O vetor devolvido é reaproveitado entre chamadas, então copie-o para guardá-lo.')],
            [t('`pointerPicker`', '`pointerPicker`'), t('`pointerPicker(engine, input, objects) => () => Intersection | null`', '`pointerPicker(engine, input, objects) => () => Intersection | null`'), t('The nearest thing under the cursor among `objects` (recursive). Click-to-select.', 'A coisa mais próxima sob o cursor entre os `objects` (recursivo). Clicar para selecionar.')],
          ],
        },
      ],
    },
    {
      id: 'body-notes',
      title: t('Controllers with a physics body', 'Controladores com body de física'),
      blocks: [
        {
          type: 'p',
          text: t(
            'With a `body`, `firstPerson` and `thirdPerson` set `body.velocity.x/z` outright (walking stops the instant the key is released) and set `velocity.y` once for a jump when `input.pressed("jump")` and the body is grounded. They then copy the body\'s position onto the object (`thirdPerson` subtracts the body\'s `radius` from y, `firstPerson` adds the eye height minus the radius). Without a body they move the object horizontally only, with no gravity, so their jump does nothing.',
            'Com um `body`, `firstPerson` e `thirdPerson` definem `body.velocity.x/z` direto (a caminhada para no instante em que a tecla é solta) e definem `velocity.y` uma vez para o pulo quando `input.pressed("jump")` e o body está no chão. Depois copiam a posição do body para o objeto (o `thirdPerson` subtrai o `radius` do body de y, o `firstPerson` soma a altura dos olhos menos o raio). Sem body, movem o objeto só na horizontal, sem gravidade, então o pulo não faz nada.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('platformer floats a feet-origin model', 'O platformer faz um modelo com origem nos pés flutuar'),
          text: t(
            '`platformer` damps `velocity` on its axis instead of setting it, and copies `body.position` onto the object with no offset. A `models.character` (origin at its feet) under `platformer` with a body floats `radius` above the ground unless you offset the model yourself, for example by parenting it to a group and lowering it by `body.radius`. Its controller `speed` field is unused: the running speed comes from the `speed` option captured at creation.',
            'O `platformer` amortece o `velocity` no seu eixo em vez de defini-lo, e copia `body.position` para o objeto sem deslocamento. Um `models.character` (origem nos pés) sob o `platformer` com body flutua `radius` acima do chão, a menos que você desloque o modelo, por exemplo pondo-o dentro de um grupo e baixando-o em `body.radius`. O campo `speed` do controlador não é usado: a velocidade de corrida vem da opção `speed` capturada na criação.',
          ),
        },
        {
          type: 'p',
          text: t(
            '`thirdPerson` and `platformer` publish their velocity as `object.userData.velocity`, which `followCamera`\'s `lookAhead` reads.',
            '`thirdPerson` e `platformer` publicam a velocidade em `object.userData.velocity`, que o `lookAhead` do `followCamera` lê.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: a third-person character', 'Exemplo: um personagem em terceira pessoa'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import {
  createGame,
  createPhysics,
  followCamera,
  lights,
  models,
  pointerOnGround,
  thirdPerson,
} from 'easy-game-maker/3d';

const game = createGame({ background: '#101827', cameraPosition: [0, 5, 10] });
lights.daylight(game.scene);
game.add(models.ground(80));

const world = createPhysics();
world.addGround(0);

const hero = models.character();
game.add(hero);
const body = world.addBody({ object: hero, radius: 0.5, height: 1.8, position: [0, 0.5, 0] });

const walker = thirdPerson(game, game.input, hero, { body, speed: 6, sprintSpeed: 10 });
const rig = followCamera(game, hero, { distance: 9, height: 5, stiffness: 8, lookAhead: 0.3 });
const cursorOnGround = pointerOnGround(game, game.input, 0);

const marker = models.sphere(0.2, { color: '#22d3ee' });
game.add(marker);

game.onUpdate((dt, elapsed) => {
  world.step(dt);
  hero.userData.animate?.(elapsed, walker.travel * 6);

  const hit = cursorOnGround();
  if (hit) marker.position.copy(hit).setY(0.2);

  if (game.input.pressed('fire')) rig.shake(0.4);
});
`,
        },
        {
          type: 'p',
          text: t(
            'Exported types: `ControlsHost`, `FirstPersonController`, `FirstPersonInput`, `FirstPersonOptions`, `FollowOptions`, `FollowRig`, `OrbitOptions`, `OrbitRig`, `PlatformerAxis`, `PlatformerController`, `PlatformerInput`, `PlatformerOptions`, `PointerInput`, `SideOptions`, `SideRig`, `ThirdPersonController`, `ThirdPersonInput`, `ThirdPersonOptions`, `TopDownBounds`, `TopDownOptions` and `TopDownRig`. The `...Input` types are the slice of `Input` each controller reads, so a test double can stand in.',
            'Tipos exportados: `ControlsHost`, `FirstPersonController`, `FirstPersonInput`, `FirstPersonOptions`, `FollowOptions`, `FollowRig`, `OrbitOptions`, `OrbitRig`, `PlatformerAxis`, `PlatformerController`, `PlatformerInput`, `PlatformerOptions`, `PointerInput`, `SideOptions`, `SideRig`, `ThirdPersonController`, `ThirdPersonInput`, `ThirdPersonOptions`, `TopDownBounds`, `TopDownOptions` e `TopDownRig`. Os tipos `...Input` são a fatia de `Input` que cada controlador lê, para um dublê de teste poder ocupar o lugar.',
          ),
        },
      ],
    },
  ],
}

export default page
