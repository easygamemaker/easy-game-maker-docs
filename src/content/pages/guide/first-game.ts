import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/first-game',
  title: t('Your First 2D Game', 'Seu Primeiro Jogo 2D'),
  description: t(
    'Build a small catch-the-stars game with one scene, a timer, keyboard and pointer input and a score.',
    'Construa um jogo pequeno de pegar estrelas, com uma cena, um timer, entrada de teclado e ponteiro e uma pontuação.',
  ),
  source: 'src/engine/index.ts',
  related: ['/project-structure', '/guide/concepts', '/guide/recipes-2d', '/cli/simulate'],
  sections: [
    {
      id: 'scaffold',
      title: t('Create the project', 'Crie o projeto'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm new star-catch
cd star-catch
npm install
egm simulate`,
        },
        {
          type: 'p',
          text: t(
            'The simulator opens in your browser and reloads when you save a file. The scaffold already contains `src/main.ts` and `src/scenes/GameScene.ts`. You will replace both, keeping the same layout.',
            'O simulador abre no navegador e recarrega quando você salva um arquivo. O esqueleto já traz `src/main.ts` e `src/scenes/GameScene.ts`. Você vai substituir os dois, mantendo a mesma organização.',
          ),
        },
      ],
    },
    {
      id: 'scene',
      title: t('The scene', 'A cena'),
      description: t(
        'Stars fall, a basket catches them, three misses end the round.',
        'Estrelas caem, uma cesta as pega, três erros encerram a rodada.',
      ),
      blocks: [
        {
          type: 'p',
          text: t(
            'A scene is a `Group` with lifecycle hooks. `onCreate` receives the params passed to `app.scenes.go`, which is how the scene gets the `App`. `onUpdate(dt)` runs every frame. Movement is always multiplied by `dt`, so the speed is the same on a 60 Hz and a 144 Hz screen.',
            'Uma cena é um `Group` com ganchos de ciclo de vida. `onCreate` recebe os params passados a `app.scenes.go`, e é assim que a cena obtém o `App`. `onUpdate(dt)` roda a cada quadro. O movimento é sempre multiplicado por `dt`, então a velocidade é a mesma em telas de 60 Hz e de 144 Hz.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/scenes/GameScene.ts',
          code: `import { Scene, RectShape, CircleShape, Text } from 'easy-game-maker'
import type { App, SceneParams, TimerHandle } from 'easy-game-maker'

const WIDTH = 480
const HEIGHT = 640
const BASKET_SPEED = 420
const STAR_SPEED = 180
const MAX_MISSES = 3

export class GameScene extends Scene {
  private app!: App
  private spawner: TimerHandle | null = null
  private readonly stars: CircleShape[] = []
  private readonly basket = new RectShape({
    x: WIDTH / 2,
    y: HEIGHT - 50,
    width: 110,
    height: 24,
    cornerRadius: 8,
    fill: '#ffd43b',
  })
  private readonly scoreText = new Text({ text: 'Score: 0', x: 16, y: 14, fontSize: 24, color: '#ffffff' })
  private readonly missText = new Text({ text: '', x: WIDTH - 16, y: 14, fontSize: 24, color: '#ff6b6b', align: 'right' })
  private score = 0
  private misses = 0

  override onCreate(params?: SceneParams): void {
    this.app = params?.['app'] as App
    this.scoreText.anchorX = 0
    this.scoreText.anchorY = 0
    this.missText.anchorX = 1
    this.missText.anchorY = 0
    this.add(this.basket, this.scoreText, this.missText)
    this.spawner = this.app.timers.every(0.8, () => this.spawnStar())
  }

  override onUpdate(dt: number): void {
    if (this.misses >= MAX_MISSES) return
    this.moveBasket(dt)
    this.moveStars(dt)
  }

  override onDestroy(): void {
    this.spawner?.cancel()
  }

  private moveBasket(dt: number): void {
    const { input } = this.app
    if (input.isKeyDown('ArrowLeft')) this.basket.x -= BASKET_SPEED * dt
    if (input.isKeyDown('ArrowRight')) this.basket.x += BASKET_SPEED * dt
    if (input.pointer.isDown) this.basket.x = input.pointer.x
    const half = this.basket.width / 2
    this.basket.x = Math.min(WIDTH - half, Math.max(half, this.basket.x))
  }

  private spawnStar(): void {
    if (this.misses >= MAX_MISSES) return
    const star = new CircleShape({ x: 30 + Math.random() * (WIDTH - 60), y: -20, radius: 14, fill: '#fff3bf' })
    this.stars.push(star)
    this.add(star)
  }

  private moveStars(dt: number): void {
    const catchZone = this.basket.getBounds()
    for (const star of [...this.stars]) {
      star.y += STAR_SPEED * dt
      const caught =
        star.y >= catchZone.y &&
        star.y <= catchZone.y + catchZone.height &&
        star.x >= catchZone.x &&
        star.x <= catchZone.x + catchZone.width
      if (caught) {
        this.score += 1
        this.scoreText.text = \`Score: \${this.score}\`
        this.dropStar(star)
      } else if (star.y > HEIGHT + 20) {
        this.misses += 1
        this.missText.text = \`Misses: \${this.misses}/\${MAX_MISSES}\`
        this.dropStar(star)
      }
    }
  }

  private dropStar(star: CircleShape): void {
    this.stars.splice(this.stars.indexOf(star), 1)
    this.remove(star)
  }
}`,
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Why not use physics here?', 'Por que não usar física aqui?'),
          text: t(
            'A distance check is enough for one basket and a few stars. Reach for `PhysicsWorld` when bodies need to bounce, stack or slide. See [2D Recipes](/guide/recipes-2d).',
            'Uma checagem de distância basta para uma cesta e algumas estrelas. Use o `PhysicsWorld` quando os corpos precisarem quicar, empilhar ou deslizar. Veja [Receitas 2D](/guide/recipes-2d).',
          ),
        },
      ],
    },
    {
      id: 'entry-point',
      title: t('The entry point', 'O ponto de entrada'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`main.ts` creates the `App`, registers the scene and starts the loop. Passing `{ params: { app } }` to `go` is what `onCreate` reads above. The scaffold exports `createApp` and calls it at the end of the module, so the game starts on its own, in the browser, in the simulator and in the desktop window alike.',
            'O `main.ts` cria o `App`, registra a cena e inicia o laço. Passar `{ params: { app } }` para `go` é o que o `onCreate` acima lê. O esqueleto exporta `createApp` e a chama no fim do módulo, então o jogo inicia sozinho, no navegador, no simulador e na janela desktop.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'skip',
          code: `import { App } from 'easy-game-maker'
import { GameScene } from './scenes/GameScene'

export default function createApp(canvas?: HTMLCanvasElement): App {
  const app = new App({ width: 480, height: 640, backgroundColor: '#12132a' })
  app.init(canvas)
  app.scenes.add('game', GameScene)
  void app.scenes.go('game', { params: { app } })
  app.run()
  return app
}

createApp()`,
        },
        {
          type: 'p',
          text: t(
            'Set `display` in `egm.config.ts` to the same 480 by 640 so the simulator and the desktop window use the size your game expects.',
            'Ajuste o `display` no `egm.config.ts` para os mesmos 480 por 640, para que o simulador e a janela desktop usem o tamanho que o seu jogo espera.',
          ),
        },
      ],
    },
    {
      id: 'next',
      title: t('Where to go from here', 'Para onde ir depois'),
      blocks: [
        {
          type: 'list',
          items: [
            t('Add sound with `app.audio` and a scene change with `app.scenes.go(name, { transition: "fade" })`.', 'Adicione som com `app.audio` e uma troca de cena com `app.scenes.go(name, { transition: "fade" })`.'),
            t('Save the best score: see the `SaveManager` recipe in [2D Recipes](/guide/recipes-2d).', 'Salve a melhor pontuação: veja a receita do `SaveManager` em [Receitas 2D](/guide/recipes-2d).'),
            t('Read the real games in [Examples](/examples).', 'Leia os jogos reais em [Exemplos](/examples).'),
            t('Ship it as a desktop app with [egm build](/cli/build).', 'Entregue como aplicativo desktop com [egm build](/cli/build).'),
          ],
        },
      ],
    },
  ],
}

export default page
