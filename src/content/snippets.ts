/**
 * Snippets shown outside content pages (the home page hero). They live here so the content verification script
 * compiles them against the published SDK like every other snippet.
 */
export interface Snippet {
  filename: string
  code: string
  lang: 'ts'
}

export const HERO_2D: Snippet = {
  filename: 'src/main.ts',
  lang: 'ts',
  code: `import { App, Scene, RectShape } from 'easy-game-maker'

class GameScene extends Scene {
  onCreate() {
    this.add(new RectShape({ x: 400, y: 250, width: 80, height: 80, fill: '#6c63ff' }))
  }
}

const app = new App({ width: 800, height: 500, backgroundColor: '#0a0a1a' })
app.init()
app.scenes.add('game', GameScene)
void app.scenes.go('game')
app.run()`,
}

export const HERO_3D: Snippet = {
  filename: 'src/main.ts',
  lang: 'ts',
  code: `import { createGame, models, lights } from 'easy-game-maker/3d'

const game = createGame({
  background: '#0b1020',
  cameraPosition: [0, 6, 12],
})

lights.sunset(game.scene)
game.add(models.ground(80))

const player = models.character()
game.add(player)

game.onUpdate((dt) => {
  player.position.x += game.input.move.x * 6 * dt
  if (game.input.pressed('jump')) game.audio.play('jump')
})`,
}
