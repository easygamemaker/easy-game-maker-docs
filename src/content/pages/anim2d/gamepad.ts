import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/input/gamepad',
  title: t('Gamepad', 'Gamepad'),
  description: t(
    "app.gamepad polls the browser Gamepad API each frame and exposes buttons, sticks, triggers and the directional pad with dead zone and just-pressed detection.",
    "app.gamepad consulta a Gamepad API do navegador a cada quadro e expõe botões, analógicos, gatilhos e direcional, com zona morta e detecção de acabou-de-pressionar.",
  ),
  source: 'src/engine/input/GamepadManager.ts',
  related: ['/input/action-map', '/input/keyboard-mouse', '/physics/body'],
  sections: [
    {
      id: 'overview',
      title: t('Polling model', 'Modelo de consulta'),
      blocks: [
        {
          type: 'p',
          text: t(
            "The Gamepad API (Application Programming Interface) of the browser has no button events, only a snapshot you read each frame. `GamepadManager` reads that snapshot in `update()`, keeps the previous frame, and derives `justPressed` and `justReleased`. The `App` already owns one as `app.gamepad` and calls `update()` for you every frame, so in a game you only read from it. Create your own `new GamepadManager()` only outside an `App`, and then call `update()` yourself.",
            "A Gamepad API (Application Programming Interface) do navegador não tem eventos de botão, só um retrato que você lê a cada quadro. O `GamepadManager` lê esse retrato em `update()`, guarda o quadro anterior e deriva `justPressed` e `justReleased`. A `App` já tem um como `app.gamepad` e chama `update()` a cada quadro, então num jogo você só lê. Crie o seu `new GamepadManager()` apenas fora de uma `App`, e aí chame `update()` você mesmo.",
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Browsers hide pads until a button is pressed', 'Navegadores escondem o controle até um botão ser pressionado'),
          text: t(
            "Most browsers only report a controller after the player presses a button once. Before that `isConnected` is false; this is browser behavior, not an engine bug.",
            "A maioria dos navegadores só reporta um controle depois que o jogador aperta um botão uma vez. Antes disso `isConnected` é false; isso é comportamento do navegador, não um bug da engine.",
          ),
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Several players, rebinding, one action for keys and pad', 'Vários jogadores, remapeamento, uma ação para teclas e controle'),
          text: t(
            "`GamepadManager` answers per button and controller index, and computes `justPressed` once per rendered frame. When one action should answer to a key **and** a button (and a stick), when two players each have their own controller, or when the player can rebind controls, use an [ActionMap](/input/action-map). It reads `navigator.getGamepads()` by itself, with one controller slot per player, and takes its default deadzone from `app.gamepad.deadzone`.",
            "O `GamepadManager` responde por botão e por índice de controle, e calcula `justPressed` uma vez por quadro desenhado. Quando uma ação deve responder a uma tecla **e** a um botão (e a um analógico), quando dois jogadores têm cada um o seu controle, ou quando o jogador pode remapear os controles, use um [ActionMap](/input/action-map). Ele lê `navigator.getGamepads()` por conta própria, com um slot de controle por jogador, e pega a zona morta padrão de `app.gamepad.deadzone`.",
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('API', 'API'),
      blocks: [
        {
          type: 'p',
          text: t(
            "Every read method takes an optional last argument `gamepad` (index, default 0), so player 2 is `1`.",
            "Todo método de leitura aceita um último argumento opcional `gamepad` (índice, padrão 0), então o jogador 2 é `1`.",
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'deadzone', type: 'number', default: '0.12', description: t("Axis values with an absolute value below this become 0. Applies to every axis, so it affects `getAxis`, sticks, and the axis half of the triggers.", "Valores de eixo com módulo abaixo disso viram 0. Vale para todos os eixos, então afeta `getAxis`, os analógicos e a parte por eixo dos gatilhos.") },
            { name: 'isConnected / count', type: 'boolean / number', readonly: true, description: t("Any controller connected, and how many.", "Se há algum controle conectado, e quantos.") },
            { name: 'isConnectedAt(index)', type: 'boolean', description: t("Whether that index is connected.", "Se aquele índice está conectado.") },
            { name: 'isButtonDown(button)', type: 'boolean', description: t("Held down.", "Pressionado.") },
            { name: 'isButtonJustPressed(button)', type: 'boolean', description: t("True only on the frame the press began.", "Verdadeiro só no quadro em que o pressionar começou.") },
            { name: 'isButtonJustReleased(button)', type: 'boolean', description: t("True only on the frame of release.", "Verdadeiro só no quadro da soltura.") },
            { name: 'getButtonValue(button)', type: 'number', description: t("Analog value 0 to 1, read live from the browser, without dead zone.", "Valor analógico de 0 a 1, lido ao vivo do navegador, sem zona morta.") },
            { name: 'getAxis(axis)', type: 'number', description: t("Axis value from -1 to 1 after dead zone.", "Valor do eixo de -1 a 1 após a zona morta.") },
            { name: 'leftStick() / rightStick()', type: '{ x, y }', description: t("Stick vectors after dead zone. Y is positive when pushed down.", "Vetores dos analógicos após a zona morta. Y é positivo ao empurrar para baixo.") },
            { name: 'leftTrigger() / rightTrigger()', type: 'number', description: t("0 to 1. Takes the larger of the button value and axis 4 or 5 (rescaled from -1..1), to cover controllers that report triggers as axes.", "De 0 a 1. Usa o maior entre o valor do botão e o eixo 4 ou 5 (reescalado de -1..1), para cobrir controles que reportam gatilhos como eixos.") },
            { name: 'dpad()', type: '{ x, y }', description: t("Directional pad as a vector with components -1, 0 or 1 (up is y = -1).", "Direcional como vetor com componentes -1, 0 ou 1 (cima é y = -1).") },
          ],
        },
        {
          type: 'table',
          head: [t('Constant', 'Constante'), t('Index', 'Índice'), t('Constant', 'Constante'), t('Index', 'Índice')],
          rows: [
            [t('`GButton.A`, `B`, `X`, `Y`', '`GButton.A`, `B`, `X`, `Y`'), t('0, 1, 2, 3', '0, 1, 2, 3'), t('`GButton.LB`, `RB`', '`GButton.LB`, `RB`'), t('4, 5', '4, 5')],
            [t('`GButton.LT`, `RT`', '`GButton.LT`, `RT`'), t('6, 7', '6, 7'), t('`GButton.SELECT`, `START`', '`GButton.SELECT`, `START`'), t('8, 9', '8, 9')],
            [t('`GButton.L3`, `R3`', '`GButton.L3`, `R3`'), t('10, 11', '10, 11'), t('`GButton.DPAD_UP/DOWN/LEFT/RIGHT`', '`GButton.DPAD_UP/DOWN/LEFT/RIGHT`'), t('12 to 15', '12 a 15')],
            [t('`GButton.HOME`', '`GButton.HOME`'), t('16', '16'), t('`GAxis.LEFT_X/LEFT_Y/RIGHT_X/RIGHT_Y`', '`GAxis.LEFT_X/LEFT_Y/RIGHT_X/RIGHT_Y`'), t('0, 1, 2, 3', '0, 1, 2, 3')],
          ],
        },
        {
          type: 'p',
          text: t(
            "`GButton` and `GAxis` follow the standard mapping of the Gamepad API. A controller that does not use the standard layout will report different indexes; the methods also accept raw numbers.",
            "`GButton` e `GAxis` seguem o mapeamento padrão da Gamepad API. Um controle fora do layout padrão reporta índices diferentes; os métodos também aceitam números crus.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example', 'Exemplo'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          filename: 'gamepad-demo.ts',
          code: `import { App, Scene, RectShape, GButton } from 'easy-game-maker';

class PadScene extends Scene {
  private readonly app: App;
  private ship = new RectShape({ x: 320, y: 180, width: 30, height: 30, fill: '#84cc16' });
  private paused = false;

  constructor(app: App) {
    super();
    this.app = app;
  }

  override onCreate(): void {
    this.add(this.ship);
  }

  override onUpdate(dt: number): void {
    const pad = this.app.gamepad; // updated by the App each frame
    if (!pad.isConnected) return;

    if (pad.isButtonJustPressed(GButton.START)) this.paused = !this.paused;
    if (this.paused) return;

    const stick = pad.leftStick();
    const dpad = pad.dpad();
    const speed = pad.isButtonDown(GButton.A) ? 400 : 200;

    this.ship.x += (stick.x + dpad.x) * speed * dt;
    this.ship.y += (stick.y + dpad.y) * speed * dt;
    this.ship.alpha = 0.4 + 0.6 * pad.rightTrigger();
  }
}

const app = new App({ width: 640, height: 360 });
app.init();
app.scenes.add('pad', class extends PadScene {
  constructor() {
    super(app);
  }
});
void app.scenes.go('pad');
app.run();
`,
        },
      ],
    },
  ],
}

export default page
