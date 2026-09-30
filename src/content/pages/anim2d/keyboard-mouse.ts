import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/input/keyboard-mouse',
  title: t('Keyboard and pointer input', 'Entrada de teclado e ponteiro'),
  description: t(
    "app.input: polling held keys, reading the pointer in canvas coordinates, and subscribing to keydown, keyup and pointer events.",
    "app.input: consulta de teclas pressionadas, leitura do ponteiro em coordenadas do canvas e inscrição em eventos de teclado e ponteiro.",
  ),
  source: 'src/engine/input/InputManager.ts',
  related: ['/input/gamepad', '/physics/body', '/camera'],
  sections: [
    {
      id: 'overview',
      title: t('InputManager', 'InputManager'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`app.input` is an `InputManager`, and `App.init()` wires it to the canvas for you. It listens to keyboard events on `window` (capture phase) and to Pointer Events on the canvas, so mouse, touch and pen share one code path. It is also an `EventEmitter`.",
            "`app.input` é um `InputManager`, e `App.init()` o liga ao canvas para você. Ele escuta eventos de teclado em `window` (fase de captura) e Pointer Events no canvas, então mouse, toque e caneta usam o mesmo caminho de código. Ele também é um `EventEmitter`.",
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'isKeyDown(key)', type: '(key: string) => boolean', description: t("True while the key is held. Both `KeyboardEvent.key` (`\"ArrowLeft\"`, `\"a\"`) and `KeyboardEvent.code` (`\"KeyA\"`, `\"Space\"`) work as the argument. Letters in `key` are case-sensitive.", "Verdadeiro enquanto a tecla está pressionada. Tanto `KeyboardEvent.key` (`\"ArrowLeft\"`, `\"a\"`) quanto `KeyboardEvent.code` (`\"KeyA\"`, `\"Space\"`) funcionam como argumento. As letras em `key` diferenciam maiúsculas de minúsculas.") },
            { name: 'pointer', type: '{ isDown, x, y }', readonly: true, description: t("Current pointer state. `x` and `y` are in canvas pixels, already corrected for CSS scaling. A getter returns a fresh object each read.", "Estado atual do ponteiro. `x` e `y` estão em pixels do canvas, já corrigidos pela escala do CSS. O getter devolve um objeto novo a cada leitura.") },
            { name: 'init(canvas)', type: 'void', description: t("Called by `App.init()`. Makes the canvas focusable and attaches listeners.", "Chamado por `App.init()`. Torna o canvas focável e registra os listeners.") },
            { name: 'destroy()', type: 'void', description: t("Removes listeners. Called by `App.destroy()`.", "Remove os listeners. Chamado por `App.destroy()`.") },
          ],
        },
      ],
    },
    {
      id: 'events',
      title: t('Events', 'Eventos'),
      blocks: [
        {
          type: 'table',
          head: [t('Event', 'Evento'), t('Payload', 'Payload'), t('When', 'Quando')],
          rows: [
            [t('`keydown`', '`keydown`'), t('`KeyEvent2D { key, code, repeat }`', '`KeyEvent2D { key, code, repeat }`'), t("Every key down, including auto-repeat (`repeat: true`).", "A cada tecla pressionada, incluindo repetição automática (`repeat: true`).")],
            [t('`keyup`', '`keyup`'), t('`KeyEvent2D`', '`KeyEvent2D`'), t("Key released (`repeat` is always false).", "Tecla solta (`repeat` é sempre false).")],
            [t('`pointerdown`', '`pointerdown`'), t('`PointerEvent2D { x, y, pointerId }`', '`PointerEvent2D { x, y, pointerId }`'), t("Press on the canvas. The pointer is captured, so moves and release still arrive outside it.", "Toque no canvas. O ponteiro é capturado, então movimento e soltura chegam mesmo fora dele.")],
            [t('`pointermove`', '`pointermove`'), t('`PointerEvent2D`', '`PointerEvent2D`'), t("Pointer moved, pressed or not.", "Ponteiro movido, pressionado ou não.")],
            [t('`pointerup`', '`pointerup`'), t('`PointerEvent2D`', '`PointerEvent2D`'), t("Release or cancel.", "Soltura ou cancelamento.")],
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('What is not there', 'O que não existe'),
          text: t(
            "There is no `justPressed` for keys, no mouse button identification, no wheel and no multi-touch state: `pointer` tracks the last pointer only. For one-shot actions listen to `keydown` (ignoring `repeat`) or track the previous frame yourself. Listeners are called with the payload only.",
            "Não há `justPressed` para teclas, identificação do botão do mouse, roda nem estado multitoque: `pointer` acompanha apenas o último ponteiro. Para ações de disparo único, escute `keydown` (ignorando `repeat`) ou guarde o quadro anterior você mesmo. Os listeners recebem só o payload.",
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Keys are consumed', 'As teclas são consumidas'),
          text: t(
            "For keys without Ctrl, Cmd or Alt, the manager calls `preventDefault` and `stopImmediatePropagation`, so browser shortcuts and page scrolling by keyboard do not fire. When the focused element is an `INPUT`, `TEXTAREA` or `SELECT`, typing is left alone. `PointerEvent2D` and `KeyEvent2D` are exported types.",
            "Para teclas sem Ctrl, Cmd ou Alt, o manager chama `preventDefault` e `stopImmediatePropagation`, então atalhos do navegador e rolagem da página pelo teclado não disparam. Quando o elemento focado é um `INPUT`, `TEXTAREA` ou `SELECT`, a digitação é deixada em paz. `PointerEvent2D` e `KeyEvent2D` são tipos exportados.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: move with keys, drop on click', 'Exemplo: mover com teclas, largar no clique'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          filename: 'input-demo.ts',
          code: `import { App, Scene, RectShape, type KeyEvent2D, type PointerEvent2D } from 'easy-game-maker';

class InputScene extends Scene {
  private readonly app: App;
  private player = new RectShape({ x: 320, y: 180, width: 30, height: 30, fill: '#22d3ee' });
  private marker = new RectShape({ x: -100, y: -100, width: 10, height: 10, fill: '#f43f5e' });
  private readonly speed = 200;

  constructor(app: App) {
    super();
    this.app = app;
  }

  override onCreate(): void {
    this.add(this.player, this.marker);

    this.app.input.on<PointerEvent2D>('pointerdown', (e) => {
      this.marker.x = e.x;
      this.marker.y = e.y;
    });

    this.app.input.on<KeyEvent2D>('keydown', (e) => {
      if (e.code === 'KeyR' && !e.repeat) {
        this.player.x = 320;
        this.player.y = 180;
      }
    });
  }

  override onUpdate(dt: number): void {
    const input = this.app.input;
    const dx = (input.isKeyDown('ArrowRight') || input.isKeyDown('KeyD') ? 1 : 0)
      - (input.isKeyDown('ArrowLeft') || input.isKeyDown('KeyA') ? 1 : 0);
    const dy = (input.isKeyDown('ArrowDown') || input.isKeyDown('KeyS') ? 1 : 0)
      - (input.isKeyDown('ArrowUp') || input.isKeyDown('KeyW') ? 1 : 0);
    this.player.x += dx * this.speed * dt;
    this.player.y += dy * this.speed * dt;

    if (input.pointer.isDown) {
      this.marker.alpha = 1;
    } else {
      this.marker.alpha = 0.5;
    }
  }
}

const app = new App({ width: 640, height: 360 });
app.init();
app.scenes.add('input', class extends InputScene {
  constructor() {
    super(app);
  }
});
void app.scenes.go('input');
app.run();
`,
        },
      ],
    },
  ],
}

export default page
