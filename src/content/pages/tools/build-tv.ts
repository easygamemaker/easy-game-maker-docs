import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/build/tv',
  title: t('Smart TV', 'Smart TV'),
  description: t(
    'The Tizen, webOS, Android TV and tvOS targets are not available in 0.2.0. What they will produce and how to make a game that works with a remote today.',
    'Os alvos Tizen, webOS, Android TV e tvOS não estão disponíveis na 0.2.0. O que vão gerar e como fazer hoje um jogo que funcione com controle remoto.',
  ),
  source: 'src/cli/builders/AndroidTvBuilder.ts',
  related: ['/cli/build', '/input/gamepad', '/build/consoles', '/build/desktop'],
  sections: [
    {
      id: 'status',
      title: t('Status', 'Situação'),
      blocks: [
        {
          type: 'callout',
          kind: 'warning',
          title: t('Not available yet', 'Ainda não disponíveis'),
          text: t(
            '`egm build tizen`, `webos`, `androidtv` and `tvos` print "not available yet" and exit with code 1. The builders are in the code base and will be opened one target at a time. An EGM Marketplace for publishing is planned, not shipped.',
            '`egm build tizen`, `webos`, `androidtv` e `tvos` imprimem "not available yet" e encerram com código 1. Os builders estão no código e serão abertos um alvo por vez. Um EGM Marketplace para publicação está planejado, mas ainda não existe.',
          ),
        },
      ],
    },
    {
      id: 'planned',
      title: t('What each target will produce', 'O que cada alvo vai gerar'),
      blocks: [
        {
          type: 'table',
          head: [t('Command', 'Comando'), t('Output', 'Saída'), t('Notes', 'Observações')],
          rows: [
            [t('`egm build tizen`', '`egm build tizen`'), t('A Tizen project, packaged as `.wgt` with Tizen Studio', 'Um projeto Tizen, empacotado como `.wgt` com o Tizen Studio'), t('Samsung TV. A plain zip is enough for unsigned testing.', 'TV Samsung. Um zip simples basta para testes sem assinatura.')],
            [t('`egm build webos`', '`egm build webos`'), t('An `.ipk` for LG Smart TV', 'Um `.ipk` para LG Smart TV'), t('Needs `npm install -g @webos-tools/cli`.', 'Exige `npm install -g @webos-tools/cli`.')],
            [t('`egm build androidtv`', '`egm build androidtv`'), t('A Gradle project with the Leanback launcher', 'Um projeto Gradle com o launcher Leanback'), t('Manifest declares a television device, a 320 by 180 launcher banner, minimum SDK 21, D-pad input turned into pointer events.', 'O manifesto declara um dispositivo de televisão, um banner de launcher de 320 por 180, SDK mínimo 21 e entrada de D-pad convertida em eventos de ponteiro.')],
            [t('`egm build tvos`', '`egm build tvos`'), t('An Xcode project for Apple TV', 'Um projeto Xcode para Apple TV'), t('Same `WKWebView` pattern as the macOS build. The Siri Remote Select press becomes a tap at the center of the canvas.', 'Mesmo padrão de `WKWebView` do build macOS. O toque em Select do Siri Remote vira um toque no centro do canvas.')],
          ],
        },
      ],
    },
    {
      id: 'remote-first',
      title: t('Designing for a remote', 'Projetando para um controle remoto'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A TV has no pointer. Whatever the target, plan for focus-based navigation: move a highlight with the D-pad and confirm with a button. The engine already gives you both inputs. `app.input` reports keyboard keys such as `ArrowDown` and `Enter`, and `app.gamepad` reports the standard gamepad buttons, including the D-pad, which is also how many TV remotes appear. The gamepad state is polled by the app loop each frame, so you only read it.',
            'Uma TV não tem ponteiro. Seja qual for o alvo, planeje uma navegação baseada em foco: mova um destaque com o D-pad e confirme com um botão. A engine já entrega as duas entradas. `app.input` informa teclas do teclado como `ArrowDown` e `Enter`, e `app.gamepad` informa os botões padrão de controle, incluindo o D-pad, que também é a forma como muitos controles remotos de TV aparecem. O estado do gamepad é consultado pelo laço do app a cada quadro, então você só o lê.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { App, Scene, RectShape, Text, GButton } from 'easy-game-maker'
import type { KeyEvent2D, SceneParams } from 'easy-game-maker'

const LABELS = ['Play', 'Options', 'Quit']

class TvMenuScene extends Scene {
  private app!: App
  private selected = 0
  private readonly rows: RectShape[] = []

  override onCreate(params?: SceneParams): void {
    this.app = params?.['app'] as App
    LABELS.forEach((label, i) => {
      const row = new RectShape({ x: 320, y: 140 + i * 70, width: 300, height: 52, cornerRadius: 10, fill: '#343a40' })
      this.rows.push(row)
      this.add(row, new Text({ text: label, x: 320, y: 140 + i * 70, fontSize: 24, color: '#ffffff', align: 'center' }))
    })
    this.app.input.on<KeyEvent2D>('keydown', (e) => {
      if (e.code === 'ArrowDown') this.move(1)
      if (e.code === 'ArrowUp') this.move(-1)
      if (e.code === 'Enter') this.confirm()
    })
    this.highlight()
  }

  override onUpdate(): void {
    const pad = this.app.gamepad
    if (pad.isButtonJustPressed(GButton.DPAD_DOWN)) this.move(1)
    if (pad.isButtonJustPressed(GButton.DPAD_UP)) this.move(-1)
    if (pad.isButtonJustPressed(GButton.A)) this.confirm()
  }

  private move(step: number): void {
    this.selected = (this.selected + step + LABELS.length) % LABELS.length
    this.highlight()
  }

  private highlight(): void {
    this.rows.forEach((row, i) => {
      row.fillColor = RectShape.parseColor(i === this.selected ? '#4dabf7' : '#343a40')
    })
  }

  private confirm(): void {
    console.log('chosen:', LABELS[this.selected])
  }
}

const app = new App({ width: 640, height: 480, backgroundColor: '#101827' })
app.init()
app.scenes.add('menu', TvMenuScene)
void app.scenes.go('menu', { params: { app } })
app.run()`,
        },
      ],
    },
    {
      id: 'until-then',
      title: t('Until the TV targets open', 'Até os alvos de TV abrirem'),
      blocks: [
        {
          type: 'list',
          items: [
            t('Test the navigation in the simulator with a keyboard and, if you have one, a gamepad.', 'Teste a navegação no simulador com um teclado e, se tiver um, um gamepad.'),
            t('Keep interface text large and inside a safe margin: TVs crop edges. Use `display.scaling` set to `fit` so nothing is cut off.', 'Mantenha o texto da interface grande e dentro de uma margem segura: TVs cortam as bordas. Use `display.scaling` como `fit` para que nada seja cortado.'),
            t('For a build you can hand out today, use [Desktop](/build/desktop).', 'Para um build que você pode entregar hoje, use [Desktop](/build/desktop).'),
          ],
        },
      ],
    },
  ],
}

export default page
