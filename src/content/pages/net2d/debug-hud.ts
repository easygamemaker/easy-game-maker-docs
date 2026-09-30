import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/debug/hud',
  title: t('DebugHUD', 'DebugHUD'),
  description: t(
    'An on-screen overlay with FPS, draw calls, physics body count and the current scene name.',
    'Uma camada na tela com FPS (Frames Per Second, quadros por segundo), chamadas de desenho, número de corpos da física e o nome da cena atual.',
  ),
  source: 'src/engine/debug/DebugHUD.ts',
  related: ['/core/renderer', '/physics/world', '/core/scene', '/simulator/devtools', '/3d/debug'],
  sections: [
    {
      id: 'overview',
      title: t('What it shows', 'O que mostra'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`DebugHUD` is a [Group](/display/group) with a translucent dark panel and a text block. It needs an `App` and shows four lines: FPS (with the minimum and the peak seen so far), the renderer's draw calls, the number of physics bodies and the current scene name.",
            "`DebugHUD` é um [Group](/display/group) com um painel escuro translúcido e um bloco de texto. Ele precisa de um `App` e mostra quatro linhas: FPS (com o mínimo e o pico vistos até agora), as chamadas de desenho do renderer, o número de corpos da física e o nome da cena atual.",
          ),
        },
        {
          type: 'p',
          text: t(
            'The text colour follows the frame rate: green from 50 FPS up, amber from 30 to 50, red below 30. The FPS value is averaged over half a second, so it does not flicker.',
            'A cor do texto acompanha a taxa de quadros: verde a partir de 50 FPS, âmbar de 30 a 50, vermelho abaixo de 30. O valor de FPS é a média de meio segundo, então não pisca.',
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('Reference', 'Referência'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'new DebugHUD(app, options?)', type: 'constructor', description: t('`options` is `{ x?: number; y?: number }` and places the panel. Both default to `8`.', '`options` é `{ x?: number; y?: number }` e posiciona o painel. Ambos valem `8` por padrão.') },
            { name: 'update(dt: number): void', type: 'method', description: t('Refreshes the numbers. Call it every frame from `Scene.onUpdate`. It returns immediately while the HUD is hidden.', 'Atualiza os números. Chame a cada quadro em `Scene.onUpdate`. Retorna de imediato enquanto o HUD está escondido.') },
            { name: 'toggle(): void', type: 'method', description: t('Flips `visible`. Bind it to a key.', 'Alterna `visible`. Ligue a uma tecla.') },
          ],
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Draw it on top', 'Desenhe por cima'),
          text: t(
            'Set a high `zIndex` (for example `9999`) and add the HUD after the rest of the scene, so it is not covered.',
            'Defina um `zIndex` alto (por exemplo `9999`) e adicione o HUD depois do resto da cena, para que não fique coberto.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('2D only', 'Só 2D'),
          text: t(
            'This HUD belongs to the 2D `App`. For 3D games see [3D debug](/3d/debug).',
            'Este HUD pertence ao `App` 2D. Para jogos 3D veja [debug 3D](/3d/debug).',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Toggling with F2', 'Alternando com F2'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { App, DebugHUD, Scene } from 'easy-game-maker'

class GameScene extends Scene {
  private hud!: DebugHUD

  onCreate(): void {
    this.hud = new DebugHUD(app, { x: 8, y: 8 })
    this.hud.zIndex = 9999
    this.add(this.hud)

    app.input.on<{ code: string }>('keydown', (e) => {
      if (e.code === 'F2') this.hud.toggle()
    })
  }

  onUpdate(dt: number): void {
    this.hud.update(dt)
  }
}

const app = new App({ width: 360, height: 640, physics: true })

async function main(): Promise<void> {
  await app.init()
  app.scenes.add('game', GameScene)
  await app.goto('game')
  app.run()
}

void main()`,
        },
      ],
    },
  ],
}

export default page
