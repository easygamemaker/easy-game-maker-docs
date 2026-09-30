import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/build/consoles',
  title: t('Consoles', 'Consoles'),
  description: t(
    'The Xbox and PlayStation targets are not available in 0.2.0. What is planned, what each platform holder requires and how to prepare a game for a gamepad.',
    'Os alvos Xbox e PlayStation não estão disponíveis na 0.2.0. O que está planejado, o que cada dona de plataforma exige e como preparar um jogo para gamepad.',
  ),
  source: 'src/cli/builders/XboxBuilder.ts',
  related: ['/cli/build', '/input/gamepad', '/build/tv', '/build/desktop'],
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
            '`egm build xbox` and `egm build playstation` print "not available yet" and exit with code 1. The builders exist in the code base and will be opened one target at a time. An EGM Marketplace for publishing is planned, not shipped.',
            '`egm build xbox` e `egm build playstation` imprimem "not available yet" e encerram com código 1. Os builders existem no código e serão abertos um alvo por vez. Um EGM Marketplace para publicação está planejado, mas ainda não existe.',
          ),
        },
        {
          type: 'p',
          text: t(
            'Console publishing depends on programs run by the platform holders, not only on tooling. Even when a target opens, the CLI can generate the project, but you still need an approved developer account and each holder\'s own packaging tools.',
            'A publicação em consoles depende de programas mantidos pelas donas das plataformas, e não só de ferramentas. Mesmo quando um alvo abrir, a CLI (Command-Line Interface) consegue gerar o projeto, mas você ainda precisa de uma conta de desenvolvedor aprovada e das ferramentas de empacotamento de cada dona.',
          ),
        },
      ],
    },
    {
      id: 'planned',
      title: t('What is planned', 'O que está planejado'),
      blocks: [
        {
          type: 'table',
          head: [t('Target', 'Alvo'), t('The builder produces', 'O builder produz'), t('You still need', 'Você ainda precisa de')],
          rows: [
            [t('Xbox', 'Xbox'), t('A PWA (Progressive Web App) project with a UWP (Universal Windows Platform) manifest and the required tile images (44, 50, 150 and 310 pixels).', 'Um projeto PWA (Progressive Web App) com um manifesto UWP (Universal Windows Platform) e as imagens de bloco exigidas (44, 50, 150 e 310 pixels).'), t('A Microsoft Partner Center account, and the Windows SDK to produce the `.msix` package.', 'Uma conta no Microsoft Partner Center e o Windows SDK para gerar o pacote `.msix`.')],
            [t('PlayStation 5', 'PlayStation 5'), t('A PS5 project with title parameters (`param.sfo.json`), store images and a `project.gp4` package description.', 'Um projeto PS5 com parâmetros do título (`param.sfo.json`), imagens de loja e uma descrição de pacote `project.gp4`.'), t('Approval in the PlayStation partner program and Sony\'s tools, for example `orbis-pub-cmd`, to create the final package.', 'Aprovação no programa de parceiros da PlayStation e as ferramentas da Sony, por exemplo o `orbis-pub-cmd`, para criar o pacote final.')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Sony\'s packaging steps are manual by design: the generated project is a starting point that you take into Sony\'s SDK.',
            'As etapas de empacotamento da Sony são manuais por definição: o projeto gerado é um ponto de partida que você leva para o SDK da Sony.',
          ),
        },
      ],
    },
    {
      id: 'gamepad',
      title: t('Prepare the game for a gamepad', 'Prepare o jogo para gamepad'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`app.gamepad` wraps the browser Gamepad API for Xbox, PlayStation, Switch Pro and generic controllers. The app loop polls it every frame, so you only read `isButtonDown`, `isButtonJustPressed` and the stick vectors. Buttons use the standard layout: `GButton.A` is the Xbox A and the PlayStation Cross, `GButton.START` is Menu and Options. Sticks have a dead zone already applied.',
            '`app.gamepad` envolve a API (Application Programming Interface) de Gamepad do navegador para controles Xbox, PlayStation, Switch Pro e genéricos. O laço do app o consulta a cada quadro, então você só lê `isButtonDown`, `isButtonJustPressed` e os vetores dos analógicos. Os botões usam o layout padrão: `GButton.A` é o A do Xbox e o Xis do PlayStation, `GButton.START` é Menu e Options. Os analógicos já têm zona morta aplicada.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { App, Scene, CircleShape, GButton } from 'easy-game-maker'
import type { SceneParams } from 'easy-game-maker'

class PadScene extends Scene {
  private app!: App
  private paused = false
  private readonly ship = new CircleShape({ x: 320, y: 240, radius: 16, fill: '#ffd43b' })

  override onCreate(params?: SceneParams): void {
    this.app = params?.['app'] as App
    this.add(this.ship)
  }

  override onUpdate(dt: number): void {
    const pad = this.app.gamepad
    if (pad.isButtonJustPressed(GButton.START)) this.paused = !this.paused
    if (this.paused) return

    const { x, y } = pad.leftStick() // -1..1, dead zone applied
    this.ship.x += x * 300 * dt
    this.ship.y += y * 300 * dt
    if (pad.isButtonJustPressed(GButton.A)) this.ship.scaleX = this.ship.scaleY = 1.4
    else this.ship.scaleX = this.ship.scaleY = Math.max(1, this.ship.scaleX - 2 * dt)
  }
}

const app = new App({ width: 640, height: 480, backgroundColor: '#101827' })
app.init()
app.scenes.add('pad', PadScene)
void app.scenes.go('pad', { params: { app } })
app.run()`,
        },
      ],
    },
    {
      id: 'today',
      title: t('What you can do today', 'O que você pode fazer hoje'),
      blocks: [
        {
          type: 'list',
          items: [
            t('Develop and test with a real controller in the browser through [egm simulate](/cli/simulate): the Gamepad API works there.', 'Desenvolva e teste com um controle de verdade no navegador pelo [egm simulate](/cli/simulate): a API de Gamepad funciona ali.'),
            t('Ship a desktop build with [Desktop](/build/desktop): a controller-ready game plays well on a PC connected to a TV.', 'Entregue um build desktop com o [Desktop](/build/desktop): um jogo pronto para controle roda bem em um PC ligado a uma TV.'),
            t('Follow the [3D Recipes](/guide/recipes-3d) or [2D Recipes](/guide/recipes-2d) and keep input behind a small layer, so adding a gamepad later is a one-file change.', 'Siga as [Receitas 3D](/guide/recipes-3d) ou as [Receitas 2D](/guide/recipes-2d) e mantenha a entrada atrás de uma camada pequena, para que acrescentar um gamepad depois seja uma mudança em um arquivo só.'),
          ],
        },
      ],
    },
  ],
}

export default page
