import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/physics/world',
  title: t('PhysicsWorld', 'PhysicsWorld'),
  description: t(
    "The planck.js physics world: gravity, pixel-to-meter scale, adding bodies, stepping the simulation, contact events, joints and debug drawing.",
    "O mundo de física do planck.js: gravidade, escala de pixels para metros, adição de corpos, avanço da simulação, eventos de contato, juntas e desenho de depuração.",
  ),
  source: 'src/engine/physics/PhysicsWorld.ts',
  related: ['/physics/body', '/core/fixed-step', '/camera'],
  sections: [
    {
      id: 'overview',
      title: t('Meters inside, pixels outside', 'Metros por dentro, pixels por fora'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`PhysicsWorld` wraps a planck.js `World`. You describe everything in **pixels** (display object position, size, `setPosition`) and the world divides by `pixelsPerMeter` (default 50) before handing values to planck. Velocities, forces and impulses are in **planck units (meters)**, not pixels.",
            "`PhysicsWorld` envolve um `World` do planck.js. Você descreve tudo em **pixels** (posição e tamanho do objeto de exibição, `setPosition`) e o mundo divide por `pixelsPerMeter` (padrão 50) antes de passar os valores ao planck. Velocidades, forças e impulsos ficam em **unidades do planck (metros)**, não em pixels.",
          ),
        },
        {
          type: 'p',
          text: t(
            "Y grows downward like the screen, and the default gravity is `{ x: 0, y: 9.8 }`. The world is created with `new PhysicsWorld({ gravity?, pixelsPerMeter? })`. `app.physics` is one too, but the `App` only steps it when you create the app with `physics: true`. Otherwise create and step your own world in the scene.",
            "O Y cresce para baixo como na tela, e a gravidade padrão é `{ x: 0, y: 9.8 }`. O mundo é criado com `new PhysicsWorld({ gravity?, pixelsPerMeter? })`. `app.physics` também é um, mas a `App` só o avança quando você cria o app com `physics: true`. Caso contrário, crie e avance o seu próprio mundo na cena.",
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('Members', 'Membros'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'gravity', type: '{ x: number; y: number }', description: t("Get or set the gravity vector.", "Lê ou define o vetor de gravidade.") },
            { name: 'bodyCount', type: 'number', readonly: true, description: t("Number of bodies added through `addBody`.", "Número de corpos adicionados via `addBody`.") },
            { name: 'addBody(displayObject, options)', type: 'PhysicsBody', description: t("Creates a body at the display object position and rotation. See [PhysicsBody](/physics/body) for the options.", "Cria um corpo na posição e rotação do objeto de exibição. Veja [PhysicsBody](/physics/body) para as opções.") },
            { name: 'removeBody(pb)', type: 'void', description: t("Destroys the planck body and forgets it.", "Destrói o corpo do planck e o esquece.") },
            { name: 'step(dt)', type: 'void', description: t("Advances the simulation by `dt` seconds (8 velocity and 3 position iterations) and copies every non-static body to its display object. With `physics: true` the App calls it every frame with the real frame time (capped at 0.1 s), so the step is variable. For a deterministic simulation leave `physics` off and step by hand with a constant value, such as `app.physics.step(1 / 60)` inside a fixed step (see [Fixed Step](/core/fixed-step)).", "Avança a simulação `dt` segundos (8 iterações de velocidade e 3 de posição) e copia cada corpo não estático para o seu objeto de exibição. Com `physics: true` o App o chama a cada quadro com o tempo real do quadro (limitado a 0,1 s), então o passo é variável. Para uma simulação determinística deixe `physics` desligado e avance à mão com um valor constante, como `app.physics.step(1 / 60)` em um passo fixo (veja [Passo Fixo](/core/fixed-step)).") },
            { name: 'createDistanceJoint(a, b, frequencyHz?, dampingRatio?)', type: 'planck.Joint', description: t("Rope-like joint between the world centers of two bodies. Both parameters default to 0 (rigid). Throws if planck fails to create it.", "Junta tipo corda entre os centros de dois corpos. Os dois parâmetros valem 0 por padrão (rígida). Lança erro se o planck não conseguir criá-la.") },
            { name: 'removeJoint(joint)', type: 'void', description: t("Destroys a joint.", "Destrói uma junta.") },
            { name: 'planckWorld', type: 'planck.World', readonly: true, description: t("The raw planck world, for joint types the engine does not wrap. Use it for what `PhysicsWorld` does not wrap: `rayCast`, `queryAABB` (AABB, Axis-Aligned Bounding Box), filters and joints. Units are planck's: meters, with `pixelsPerMeter` (default 50) between them and the display pixels. A body you create directly has no display object, so `step` does not sync it.", "O mundo bruto do planck, para tipos de junta que a engine não envolve. Use-o para o que o `PhysicsWorld` não envolve: `rayCast`, `queryAABB` (AABB, Axis-Aligned Bounding Box, caixa delimitadora alinhada aos eixos), filtros e juntas. As unidades são as do planck: metros, com `pixelsPerMeter` (padrão 50) entre elas e os pixels da tela. Um corpo criado direto não tem objeto de exibição, então o `step` não o sincroniza.") },
            { name: 'debugDraw(group)', type: 'void', description: t("Clears the group and redraws body outlines (green dynamic, gray static, cyan kinematic, yellow sensor). Call every frame while debugging.", "Limpa o group e redesenha os contornos dos corpos (verde dinâmico, cinza estático, ciano cinemático, amarelo sensor). Chame a cada quadro ao depurar.") },
            { name: 'destroy()', type: 'void', description: t("Removes listeners and forgets bodies.", "Remove os listeners e esquece os corpos.") },
          ],
        },
      ],
    },
    {
      id: 'contacts',
      title: t('Contact events', 'Eventos de contato'),
      blocks: [
        {
          type: 'p',
          text: t(
            "The world is an `EventEmitter`. It emits `beginContact` and `endContact` with a `ContactEvent` payload: `bodyA`, `bodyB` (PhysicsBody) and `displayA`, `displayB` (the display objects). Sensors also report contacts, without physical collision response.",
            "O mundo é um `EventEmitter`. Ele emite `beginContact` e `endContact` com um payload `ContactEvent`: `bodyA`, `bodyB` (PhysicsBody) e `displayA`, `displayB` (os objetos de exibição). Sensores também reportam contatos, sem resposta física de colisão.",
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            "`ContactEvent` is exported from the package (`import type { ContactEvent } from 'easy-game-maker'`), so you can type the listener with it. Events fire inside `step`, so avoid removing bodies from within the handler.",
            "`ContactEvent` é exportado pelo pacote (`import type { ContactEvent } from 'easy-game-maker'`), então você pode tipar o listener com ele. Os eventos disparam dentro de `step`, então evite remover corpos dentro do handler.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: a falling ball on a floor', 'Exemplo: bola caindo no chão'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          filename: 'physics-world-demo.ts',
          code: `import { App, Scene, Group, RectShape, CircleShape, PhysicsWorld, type PhysicsBody } from 'easy-game-maker';

class PhysicsScene extends Scene {
  private physics = new PhysicsWorld({ gravity: { x: 0, y: 9.8 }, pixelsPerMeter: 50 });
  private debug = new Group();

  override onCreate(): void {
    const floor = new RectShape({ x: 320, y: 340, width: 600, height: 20, fill: '#374151' });
    const ball = new CircleShape({ x: 320, y: 40, radius: 20, fill: '#facc15' });
    this.add(floor, ball, this.debug);

    this.physics.addBody(floor, { type: 'static', shape: 'rect' });
    this.physics.addBody(ball, { type: 'dynamic', shape: 'circle', restitution: 0.6 });

    this.physics.on('beginContact', (e: { bodyA: PhysicsBody; bodyB: PhysicsBody }) => {
      console.log('contact', e.bodyA.body.getType(), e.bodyB.body.getType());
    });
  }

  override onUpdate(dt: number): void {
    this.physics.step(dt);
    this.physics.debugDraw(this.debug);
  }

  override onDestroy(): void {
    this.physics.destroy();
  }
}

const app = new App({ width: 640, height: 360 });
app.init();
app.scenes.add('physics', PhysicsScene);
void app.scenes.go('physics');
app.run();
`,
        },
      ],
    },
  ],
}

export default page
