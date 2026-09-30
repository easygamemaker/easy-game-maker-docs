import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/camera',
  title: t('Camera', 'Camera'),
  description: t(
    "A 2D camera that scrolls and zooms a world Group, follows a target, shakes, pans, and fades or flashes the screen.",
    "Uma câmera 2D que rola e dá zoom em um Group de mundo, segue um alvo, treme, faz pan e escurece ou pisca a tela.",
  ),
  source: 'src/engine/camera/Camera.ts',
  related: ['/animation/easing', '/animation/tween', '/animation/transitions'],
  sections: [
    {
      id: 'setup',
      title: t('How the camera works', 'Como a câmera funciona'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`Camera` does not draw anything. Each `update(dt)` it computes a position and zoom and writes them to the **world group** (`x`, `y`, `scaleX`, `scaleY`), so that the point `(camera.x, camera.y)` sits at the center of the view. Put everything that should scroll inside that group, and keep the HUD (Heads-Up Display, the fixed interface layer) outside it.",
            "`Camera` não desenha nada. A cada `update(dt)` ela calcula posição e zoom e grava no **group do mundo** (`x`, `y`, `scaleX`, `scaleY`), de modo que o ponto `(camera.x, camera.y)` fique no centro da vista. Coloque no group tudo o que deve rolar, e deixe o HUD (Heads-Up Display, a camada fixa de interface) fora dele.",
          ),
        },
        {
          type: 'list',
          items: [
            t("`new Camera(viewW, viewH)`: the viewport size in pixels, usually the `App` width and height.", "`new Camera(viewW, viewH)`: o tamanho da viewport em pixels, normalmente a largura e a altura da `App`."),
            t("`setWorld(group)`: the group to transform.", "`setWorld(group)`: o group a transformar."),
            t("`setOverlay(group)`: the group that receives the full-screen rectangle used by `flash`, `fadeOut` and `fadeIn`. Use a group drawn on top and not scaled by the camera.", "`setOverlay(group)`: o group que recebe o retângulo de tela cheia usado por `flash`, `fadeOut` e `fadeIn`. Use um group desenhado por cima e não escalado pela câmera."),
            t("`resize(viewW, viewH)`: after a canvas resize.", "`resize(viewW, viewH)`: depois de redimensionar o canvas."),
            t("`update(dt)`: call every frame from `Scene.onUpdate`, `dt` in seconds.", "`update(dt)`: chame a cada quadro em `Scene.onUpdate`, com `dt` em segundos."),
          ],
        },
        {
          type: 'p',
          text: t(
            "Setup methods return `this`, so they chain. Public state: `x`, `y`, `zoom` (1 is normal), and read-only `scrollX`, `scrollY` (top-left of the visible world area), `viewWidth`, `viewHeight`.",
            "Os métodos de configuração devolvem `this`, então encadeiam. Estado público: `x`, `y`, `zoom` (1 é normal) e, somente leitura, `scrollX`, `scrollY` (canto superior esquerdo da área visível do mundo), `viewWidth`, `viewHeight`.",
          ),
        },
      ],
    },
    {
      id: 'follow',
      title: t('Follow and bounds', 'Seguir e limites'),
      blocks: [
        {
          type: 'props',
          title: t('follow(target, options)', 'follow(target, options)'),
          rows: [
            { name: 'lerp', type: 'number', default: '0.1', description: t("Smoothing. Each frame the camera covers `min(1, lerp * 60 * dt)` of the remaining distance. 0 or less snaps to the target; larger values catch up faster.", "Suavização. A cada quadro a câmera cobre `min(1, lerp * 60 * dt)` da distância restante. 0 ou menos cola no alvo; valores maiores alcançam mais rápido.") },
            { name: 'offsetX', type: 'number', default: '0', description: t("Horizontal offset from the target (+ is right).", "Deslocamento horizontal do alvo (+ é direita).") },
            { name: 'offsetY', type: 'number', default: '0', description: t("Vertical offset from the target (+ is down).", "Deslocamento vertical do alvo (+ é baixo).") },
            { name: 'deadZoneX', type: 'number', default: '0', description: t("Half-width in world pixels in which the target can move without the camera reacting.", "Meia-largura, em pixels do mundo, em que o alvo pode se mover sem a câmera reagir.") },
            { name: 'deadZoneY', type: 'number', default: '0', description: t("Half-height of the dead zone.", "Meia-altura da zona morta.") },
          ],
        },
        {
          type: 'p',
          text: t(
            "`unfollow()` stops tracking and keeps the current position. `setBounds(minX, minY, maxX, maxY)` clamps the camera so the visible area (which shrinks as `zoom` grows) never leaves that world rectangle; `clearBounds()` removes it.",
            "`unfollow()` para de seguir e mantém a posição atual. `setBounds(minX, minY, maxX, maxY)` prende a câmera para que a área visível (que encolhe quando o `zoom` cresce) nunca saia desse retângulo do mundo; `clearBounds()` remove.",
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Bounds smaller than the view', 'Limites menores que a vista'),
          text: t(
            "The clamp does not special-case a world smaller than the viewport. Keep the bounds at least as large as the visible area, or the result is not centered.",
            "O clamp não trata o caso de um mundo menor que a viewport. Mantenha os limites pelo menos do tamanho da área visível, ou o resultado não fica centralizado.",
          ),
        },
      ],
    },
    {
      id: 'effects',
      title: t('Shake, pan, zoom, fade and flash', 'Shake, pan, zoom, fade e flash'),
      blocks: [
        {
          type: 'table',
          head: [t('Method', 'Método'), t('Defaults', 'Padrões'), t('Behavior', 'Comportamento')],
          rows: [
            [t('`shake(intensity, duration)`', '`shake(intensity, duration)`'), t('8 px, 0.4 s', '8 px, 0,4 s'), t("Random offset with linear decay, applied to the world group only (the camera position is untouched). Returns `this`. A new call restarts it.", "Deslocamento aleatório com decaimento linear, aplicado só ao group do mundo (a posição da câmera não muda). Devolve `this`. Uma nova chamada reinicia.")],
            [t('`pan(x, y, duration, easing)`', '`pan(x, y, duration, easing)`'), t('`Easing.outCubic`', '`Easing.outCubic`'), t("Tweens `x`/`y`. Returns a `Promise<void>`. Does not disable `follow`, call `unfollow()` first.", "Anima `x`/`y`. Devolve `Promise<void>`. Não desativa o `follow`, chame `unfollow()` antes.")],
            [t('`zoomTo(zoom, duration, easing)`', '`zoomTo(zoom, duration, easing)`'), t('`Easing.outCubic`', '`Easing.outCubic`'), t("Tweens `zoom`. Returns a `Promise<void>`.", "Anima `zoom`. Devolve `Promise<void>`.")],
            [t('`flash(duration, color)`', '`flash(duration, color)`'), t('0.25 s, `#ffffff`', '0,25 s, `#ffffff`'), t("Overlay starts opaque and fades to transparent. Promise.", "O overlay começa opaco e some. Promise.")],
            [t('`fadeOut(duration, color)`', '`fadeOut(duration, color)`'), t('0.5 s, `#000000`', '0,5 s, `#000000`'), t("Overlay goes from transparent to opaque. Promise.", "O overlay vai de transparente a opaco. Promise.")],
            [t('`fadeIn(duration, color)`', '`fadeIn(duration, color)`'), t('0.5 s, `#000000`', '0,5 s, `#000000`'), t("Overlay goes from opaque to transparent. Promise.", "O overlay vai de opaco a transparente. Promise.")],
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Things to know', 'Pontos de atenção'),
          text: t(
            "Durations here are in **seconds** (unlike a raw `Tween`). The promises only resolve while you keep calling `camera.update(dt)`. Colors must be full hex like `#rrggbb` (or `#rrggbbaa`); short `#fff` is not parsed. A new `pan` cancels the one in progress, and the canceled promise resolves right away.",
            "As durações aqui são em **segundos** (diferente de um `Tween` puro). As promises só resolvem enquanto você continuar chamando `camera.update(dt)`. As cores precisam ser hex completo, como `#rrggbb` (ou `#rrggbbaa`); o curto `#fff` não é interpretado. Um novo `pan` cancela o que está em andamento, e a promise cancelada resolve na hora.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: side scroller camera', 'Exemplo: câmera de side scroller'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          filename: 'camera-demo.ts',
          code: `import { App, Scene, Group, RectShape, Camera, Easing } from 'easy-game-maker';

const VIEW_W = 640;
const VIEW_H = 360;

class LevelScene extends Scene {
  private world = new Group();
  private hud = new Group();
  private player = new RectShape({ x: 200, y: 250, width: 30, height: 40, fill: '#f97316' });
  private camera = new Camera(VIEW_W, VIEW_H);
  private time = 0;

  override onCreate(): void {
    const ground = new RectShape({ x: 1500, y: 325, width: 3000, height: 70, fill: '#374151' });
    this.world.add(ground, this.player);
    this.add(this.world, this.hud);

    this.camera
      .setWorld(this.world)
      .setOverlay(this.hud)
      .follow(this.player, { lerp: 0.08, offsetY: -40, deadZoneX: 30 })
      .setBounds(0, 0, 3000, VIEW_H);

    void this.camera.fadeIn(0.6);
  }

  override onUpdate(dt: number): void {
    this.time += dt;
    this.player.x += 120 * dt; // auto-run to the right

    if (this.time > 2 && this.time - dt <= 2) {
      this.camera.shake(10, 0.35);
      void this.camera.flash(0.2, '#ff0000');
    }
    if (this.time > 3 && this.time - dt <= 3) {
      void this.camera.zoomTo(1.5, 0.8, Easing.inOutQuad);
    }

    this.camera.update(dt);
  }
}

const app = new App({ width: VIEW_W, height: VIEW_H, backgroundColor: '#0b1020' });
app.init();
app.scenes.add('level', LevelScene);
void app.scenes.go('level');
app.run();
`,
        },
      ],
    },
  ],
}

export default page
