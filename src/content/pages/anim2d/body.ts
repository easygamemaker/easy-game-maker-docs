import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/physics/body',
  title: t('PhysicsBody', 'PhysicsBody'),
  description: t(
    "The handle returned by PhysicsWorld.addBody: body options, applying forces and impulses, velocity, damping and how it syncs back to its display object.",
    "O handle devolvido por PhysicsWorld.addBody: opções do corpo, forças e impulsos, velocidade, amortecimento e como ele sincroniza com o objeto de exibição.",
  ),
  source: 'src/engine/physics/PhysicsBody.ts',
  related: ['/physics/world', '/input/keyboard-mouse'],
  sections: [
    {
      id: 'options',
      title: t('BodyOptions', 'BodyOptions'),
      blocks: [
        {
          type: 'p',
          text: t(
            "You never construct a `PhysicsBody` yourself: [PhysicsWorld](/physics/world)`.addBody(displayObject, options)` builds the planck body and one fixture from the display object `x`, `y`, `rotation`, `width` and `height`, then returns the handle. Set the size of the display object **before** calling `addBody`.",
            "Você nunca constrói um `PhysicsBody` diretamente: [PhysicsWorld](/physics/world)`.addBody(displayObject, options)` monta o corpo do planck e uma fixture a partir de `x`, `y`, `rotation`, `width` e `height` do objeto de exibição, e devolve o handle. Defina o tamanho do objeto de exibição **antes** de chamar `addBody`.",
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'type', type: "'dynamic' | 'static' | 'kinematic'", required: true, description: t("Dynamic bodies are simulated, static ones never move, kinematic ones move by velocity and ignore forces.", "Corpos dynamic são simulados, static nunca se movem, kinematic se movem por velocidade e ignoram forças.") },
            { name: 'shape', type: "'rect' | 'circle' | 'polygon'", required: true, description: t("`rect` uses width and height. `circle` uses `width / 2` as radius. `polygon` uses `vertices`; without them it falls back to a rect.", "`rect` usa largura e altura. `circle` usa `width / 2` como raio. `polygon` usa `vertices`; sem elas cai para um retângulo.") },
            { name: 'density', type: 'number', default: '1', description: t("Mass per area.", "Massa por área.") },
            { name: 'friction', type: 'number', default: '0.3', description: t("Surface friction.", "Atrito da superfície.") },
            { name: 'restitution', type: 'number', default: '0', description: t("Bounciness, 0 to 1.", "Elasticidade, de 0 a 1.") },
            { name: 'isSensor', type: 'boolean', default: 'false', description: t("Detects overlaps (contact events) without colliding.", "Detecta sobreposição (eventos de contato) sem colidir.") },
            { name: 'fixedRotation', type: 'boolean', default: 'false', description: t("Locks rotation from the moment the body is created. It can still be toggled later on the `PhysicsBody`.", "Trava a rotação desde a criação do corpo. Ainda dá para alternar depois no `PhysicsBody`.") },
            { name: 'vertices', type: '{ x: number; y: number }[]', description: t("Polygon points in pixels, relative to the body center.", "Pontos do polígono em pixels, relativos ao centro do corpo.") },
          ],
        },
      ],
    },
    {
      id: 'members',
      title: t('Members', 'Membros'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'body', type: 'planck.Body', readonly: true, description: t("The raw planck body, for anything not wrapped.", "O corpo bruto do planck, para tudo que não é envolvido.") },
            { name: 'fixture', type: 'planck.Fixture', readonly: true, description: t("The single fixture created by `addBody`.", "A única fixture criada por `addBody`.") },
            { name: 'displayObject', type: 'DisplayObject', readonly: true, description: t("The object kept in sync.", "O objeto mantido em sincronia.") },
            { name: 'syncToDisplay()', type: 'void', description: t("Copies body position (times pixels per meter) and angle to the display object. `PhysicsWorld.step` calls it for non-static bodies.", "Copia a posição do corpo (vezes pixels por metro) e o ângulo para o objeto de exibição. `PhysicsWorld.step` chama para corpos não estáticos.") },
            { name: 'applyForce(fx, fy)', type: 'void', description: t("Continuous force at the center of mass. Call every frame.", "Força contínua no centro de massa. Chame a cada quadro.") },
            { name: 'applyForceAtPoint(fx, fy, px, py)', type: 'void', description: t("Force at a point given in world **pixels**.", "Força em um ponto dado em **pixels** do mundo.") },
            { name: 'applyImpulse(ix, iy)', type: 'void', description: t("Instant change of momentum at the center. Good for jumps.", "Mudança instantânea de momento no centro. Boa para pulos.") },
            { name: 'setVelocity(vx, vy)', type: 'void', description: t("Sets linear velocity in meters per second.", "Define a velocidade linear em metros por segundo.") },
            { name: 'getVelocity()', type: '{ x, y }', description: t("Linear velocity in meters per second.", "Velocidade linear em metros por segundo.") },
            { name: 'setPosition(x, y)', type: 'void', description: t("Teleports the body to a position in pixels. The display object updates on the next `step`.", "Teleporta o corpo para uma posição em pixels. O objeto de exibição atualiza no próximo `step`.") },
            { name: 'setType(type)', type: 'void', description: t("Changes between dynamic, static and kinematic.", "Alterna entre dynamic, static e kinematic.") },
            { name: 'linearDamping / angularDamping', type: 'number', description: t("Get and set drag on movement and on rotation.", "Lê e define o arrasto no movimento e na rotação.") },
            { name: 'fixedRotation', type: 'boolean', description: t("Get and set whether rotation is locked.", "Lê e define se a rotação está travada.") },
            { name: 'isBullet', type: 'boolean', description: t("Get and set continuous collision for fast bodies.", "Lê e define colisão contínua para corpos rápidos.") },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Sync is one way', 'A sincronização é de mão única'),
          text: t(
            "Physics drives the display object, not the reverse. Moving `displayObject.x` directly does not move the body; use `setPosition`. Static bodies are skipped by `step`, so their display object is never overwritten. Rotation is written in radians.",
            "A física dirige o objeto de exibição, e não o contrário. Mudar `displayObject.x` diretamente não move o corpo; use `setPosition`. Corpos estáticos são ignorados pelo `step`, então o objeto de exibição deles nunca é sobrescrito. A rotação é escrita em radianos.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: a jumping box', 'Exemplo: uma caixa que pula'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          filename: 'physics-body-demo.ts',
          code: `import { App, Scene, RectShape, PhysicsWorld } from 'easy-game-maker';

class JumpScene extends Scene {
  private physics = new PhysicsWorld();
  private hero = new RectShape({ x: 320, y: 100, width: 40, height: 40, fill: '#a78bfa' });
  private heroBody!: ReturnType<PhysicsWorld['addBody']>;
  private app: App;

  constructor(app: App) {
    super();
    this.app = app;
  }

  override onCreate(): void {
    const floor = new RectShape({ x: 320, y: 340, width: 640, height: 20, fill: '#374151' });
    this.add(floor, this.hero);

    this.physics.addBody(floor, { type: 'static', shape: 'rect' });
    this.heroBody = this.physics.addBody(this.hero, {
      type: 'dynamic',
      shape: 'rect',
      density: 1,
      friction: 0.4,
      fixedRotation: true,
    });
    this.heroBody.linearDamping = 0.2;
  }

  override onUpdate(dt: number): void {
    const input = this.app.input;
    const v = this.heroBody.getVelocity();

    // Horizontal control in meters per second
    const dir = (input.isKeyDown('ArrowRight') ? 1 : 0) - (input.isKeyDown('ArrowLeft') ? 1 : 0);
    this.heroBody.setVelocity(dir * 4, v.y);

    // Jump only when nearly still vertically
    if (input.isKeyDown('Space') && Math.abs(v.y) < 0.01) {
      this.heroBody.applyImpulse(0, -3);
    }

    this.physics.step(dt);
  }
}

const app = new App({ width: 640, height: 360 });
app.init();
app.scenes.add('jump', class extends JumpScene {
  constructor() {
    super(app);
  }
});
void app.scenes.go('jump');
app.run();
`,
        },
      ],
    },
  ],
}

export default page
