import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/guide/recipes-2d',
  title: t('2D Recipes', 'Receitas 2D'),
  description: t(
    'Short, complete patterns for the things almost every 2D game needs: movement, physics, tweens, a camera, saves and pooling.',
    'Padrões curtos e completos para o que quase todo jogo 2D precisa: movimento, física, tweens, câmera, saves e pooling.',
  ),
  source: 'src/engine/index.ts',
  related: ['/first-game', '/guide/concepts', '/physics/world', '/camera', '/debug/save'],
  sections: [
    {
      id: 'movement',
      title: t('Move with keyboard, touch and mouse', 'Mover com teclado, toque e mouse'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Poll the input every frame and multiply by `dt`. `app.input.pointer` gives `x`, `y` and `isDown` in game coordinates, already corrected for CSS scaling, so the same code handles a finger and a mouse.',
            'Consulte a entrada a cada quadro e multiplique por `dt`. `app.input.pointer` entrega `x`, `y` e `isDown` em coordenadas do jogo, já corrigidas pela escala do CSS, então o mesmo código atende dedo e mouse.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { App, Scene, CircleShape } from 'easy-game-maker'
import type { SceneParams } from 'easy-game-maker'

const SPEED = 260
const W = 480
const H = 320

class MoveScene extends Scene {
  private app!: App
  private readonly hero = new CircleShape({ x: W / 2, y: H / 2, radius: 18, fill: '#69db7c' })

  override onCreate(params?: SceneParams): void {
    this.app = params?.['app'] as App
    this.add(this.hero)
  }

  override onUpdate(dt: number): void {
    const { input } = this.app
    let dx = 0
    let dy = 0
    if (input.isKeyDown('ArrowLeft') || input.isKeyDown('KeyA')) dx -= 1
    if (input.isKeyDown('ArrowRight') || input.isKeyDown('KeyD')) dx += 1
    if (input.isKeyDown('ArrowUp') || input.isKeyDown('KeyW')) dy -= 1
    if (input.isKeyDown('ArrowDown') || input.isKeyDown('KeyS')) dy += 1

    const length = Math.hypot(dx, dy) || 1 // diagonals are not faster
    this.hero.x += (dx / length) * SPEED * dt
    this.hero.y += (dy / length) * SPEED * dt

    if (input.pointer.isDown) {
      // ease toward the finger instead of teleporting
      this.hero.x += (input.pointer.x - this.hero.x) * Math.min(1, 10 * dt)
      this.hero.y += (input.pointer.y - this.hero.y) * Math.min(1, 10 * dt)
    }

    this.hero.x = Math.min(W - 18, Math.max(18, this.hero.x))
    this.hero.y = Math.min(H - 18, Math.max(18, this.hero.y))
  }
}

const app = new App({ width: W, height: H, backgroundColor: '#101827' })
app.init()
app.scenes.add('move', MoveScene)
void app.scenes.go('move', { params: { app } })
app.run()`,
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            '`isKeyDown` accepts both the `KeyboardEvent.key` and the `KeyboardEvent.code` of a pressed key, so `"a"` and `"KeyA"` both work. Prefer `code` (`"KeyA"`, `"Space"`, `"ArrowLeft"`): it does not change with the keyboard layout.',
            '`isKeyDown` aceita tanto o `KeyboardEvent.key` quanto o `KeyboardEvent.code` da tecla pressionada, então `"a"` e `"KeyA"` funcionam. Prefira o `code` (`"KeyA"`, `"Space"`, `"ArrowLeft"`): ele não muda com o layout do teclado.',
          ),
        },
      ],
    },
    {
      id: 'physics',
      title: t('Bouncing bodies with PhysicsWorld', 'Corpos que quicam com PhysicsWorld'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Create a `PhysicsWorld`, attach bodies to display objects and step it yourself with a fixed timestep so behaviour does not depend on the frame rate. The world converts pixels to meters (50 pixels per meter by default) and writes positions back to your objects after each step. Contacts arrive as `beginContact` and `endContact` events.',
            'Crie um `PhysicsWorld`, associe corpos a objetos de exibição e avance a simulação você mesmo com passo fixo, para que o comportamento não dependa da taxa de quadros. O mundo converte pixels em metros (50 pixels por metro por padrão) e grava as posições de volta nos seus objetos após cada passo. Os contatos chegam como eventos `beginContact` e `endContact`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { App, Scene, CircleShape, RectShape, PhysicsWorld } from 'easy-game-maker'
import type { DisplayObject, SceneParams } from 'easy-game-maker'

const W = 480
const H = 640
const STEP = 1 / 60

class BallsScene extends Scene {
  private readonly world = new PhysicsWorld({ gravity: { x: 0, y: 9.8 } })
  private accumulator = 0

  override onCreate(_params?: SceneParams): void {
    this.addWall(W / 2, H + 10, W, 20) // floor
    this.addWall(-10, H / 2, 20, H) // left
    this.addWall(W + 10, H / 2, 20, H) // right

    for (let i = 0; i < 8; i++) {
      const ball = new CircleShape({ x: 60 + i * 50, y: 60 + i * 20, radius: 16, fill: '#ffa94d' })
      this.add(ball)
      this.world.addBody(ball, { type: 'dynamic', shape: 'circle', restitution: 0.7, friction: 0.2 })
    }

    this.world.on<{ displayA: DisplayObject; displayB: DisplayObject }>('beginContact', ({ displayA, displayB }) => {
      displayA.alpha = 0.6
      displayB.alpha = 0.6
    })
  }

  override onUpdate(dt: number): void {
    this.accumulator += dt
    while (this.accumulator >= STEP) {
      this.world.step(STEP)
      this.accumulator -= STEP
    }
  }

  override onDestroy(): void {
    this.world.destroy()
  }

  private addWall(x: number, y: number, width: number, height: number): void {
    const wall = new RectShape({ x, y, width, height, fill: '#495057' })
    this.add(wall)
    this.world.addBody(wall, { type: 'static', shape: 'rect' })
  }
}

const app = new App({ width: W, height: H, backgroundColor: '#101827' })
app.init()
app.scenes.add('balls', BallsScene)
void app.scenes.go('balls')
app.run()`,
        },
        {
          type: 'callout',
          kind: 'tip',
          text: t(
            'If you only need one world for the whole game, pass `physics: true` to `new App(...)`. The app then steps `app.physics` for you every frame, without the fixed timestep above.',
            'Se você precisa de um único mundo para o jogo inteiro, passe `physics: true` a `new App(...)`. O app passa a avançar `app.physics` a cada quadro, sem o passo fixo acima.',
          ),
        },
      ],
    },
    {
      id: 'tweens',
      title: t('Animate with tweens and change scenes', 'Animar com tweens e trocar de cena'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`app.transitions.to(target, { prop: value, duration })` animates numeric properties. Here `duration` is in **milliseconds**, and the target must be typed as a record of numbers, which for a display object means a cast. `onComplete` lets you chain the next step. Scene changes take the same unit: `duration: 400` is 400 ms.',
            '`app.transitions.to(alvo, { prop: valor, duration })` anima propriedades numéricas. Aqui `duration` é em **milissegundos**, e o alvo precisa ser tipado como um registro de números, o que para um objeto de exibição significa um cast. `onComplete` permite encadear a próxima etapa. As trocas de cena usam a mesma unidade: `duration: 400` são 400 ms.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { App, Scene, RectShape, Text, Easing } from 'easy-game-maker'
import type { SceneParams } from 'easy-game-maker'

type Numeric = Record<string, number>

class MenuScene extends Scene {
  override onCreate(params?: SceneParams): void {
    const app = params?.['app'] as App
    const button = new RectShape({ x: 240, y: -60, width: 200, height: 56, cornerRadius: 12, fill: '#4dabf7' })
    const label = new Text({ text: 'Play', x: 240, y: -60, fontSize: 24, color: '#ffffff', align: 'center' })
    this.add(button, label)

    // slide in, then pulse once it lands
    app.transitions.to(button as unknown as Numeric, {
      y: 200,
      duration: 600,
      easing: Easing.outCubic,
      onComplete: () => {
        app.transitions.to(button as unknown as Numeric, { scaleX: 1.1, scaleY: 1.1, duration: 250, easing: Easing.outQuad })
      },
    })
    app.transitions.to(label as unknown as Numeric, { y: 200, duration: 600, easing: Easing.outCubic })

    app.input.on('pointerdown', () => {
      void app.scenes.go('game', { transition: 'fade', duration: 400, params: { app } })
    })
  }
}

class GameScene extends Scene {
  override onCreate(): void {
    this.add(new Text({ text: 'Game on', x: 240, y: 160, fontSize: 32, color: '#ffffff', align: 'center' }))
  }
}

const app = new App({ width: 480, height: 320, backgroundColor: '#101827' })
app.init()
app.scenes.add('menu', MenuScene)
app.scenes.add('game', GameScene)
void app.scenes.go('menu', { params: { app } })
app.run()`,
        },
      ],
    },
    {
      id: 'camera',
      title: t('A following camera with bounds and shake', 'Uma câmera que segue, com limites e tremor'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A `Camera` scrolls and zooms one `Group`, so put everything that lives in the world inside that group and keep the HUD outside it. Call `camera.update(dt)` every frame. Camera durations are in **seconds**, unlike `app.transitions`.',
            'Uma `Camera` rola e amplia um único `Group`, então coloque tudo o que vive no mundo dentro desse grupo e mantenha o HUD (Heads-Up Display) fora dele. Chame `camera.update(dt)` a cada quadro. As durações da câmera são em **segundos**, diferente de `app.transitions`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { App, Scene, Group, RectShape, Camera } from 'easy-game-maker'
import type { KeyEvent2D, SceneParams } from 'easy-game-maker'

const VIEW_W = 480
const VIEW_H = 320
const LEVEL_W = 2400

class RunScene extends Scene {
  private app!: App
  private readonly world = new Group()
  private readonly camera = new Camera(VIEW_W, VIEW_H)
  private readonly player = new RectShape({ x: 100, y: 240, width: 32, height: 48, fill: '#ff6b6b' })

  override onCreate(params?: SceneParams): void {
    this.app = params?.['app'] as App
    this.add(this.world)

    for (let x = 0; x < LEVEL_W; x += 160) {
      this.world.add(new RectShape({ x: x + 80, y: 290, width: 150, height: 40, fill: x % 320 === 0 ? '#495057' : '#343a40' }))
    }
    this.world.add(this.player)

    this.camera
      .setWorld(this.world)
      .setOverlay(this)
      .follow(this.player, { lerp: 0.1, offsetY: -40 })
      .setBounds(0, 0, LEVEL_W, VIEW_H)

    this.app.input.on<KeyEvent2D>('keydown', (e) => {
      if (e.code === 'Space') this.camera.shake(10, 0.3)
    })
  }

  override onUpdate(dt: number): void {
    const { input } = this.app
    if (input.isKeyDown('ArrowRight')) this.player.x += 320 * dt
    if (input.isKeyDown('ArrowLeft')) this.player.x -= 320 * dt
    this.player.x = Math.min(LEVEL_W - 16, Math.max(16, this.player.x))
    this.camera.update(dt)
  }
}

const app = new App({ width: VIEW_W, height: VIEW_H, backgroundColor: '#101827' })
app.init()
app.scenes.add('run', RunScene)
void app.scenes.go('run', { params: { app } })
app.run()`,
        },
      ],
    },
    {
      id: 'save',
      title: t('Save a best score', 'Salvar a melhor pontuação'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`SaveManager` wraps `localStorage` with a namespace, JSON encoding and safe failure: `save` returns `false` instead of throwing when storage is full or blocked. Use the number helpers for simple counters.',
            '`SaveManager` envolve o `localStorage` com um namespace, codificação JSON e falha segura: `save` retorna `false` em vez de lançar erro quando o armazenamento está cheio ou bloqueado. Use os auxiliares numéricos para contadores simples.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { SaveManager } from 'easy-game-maker'

interface Progress {
  level: number
  coins: number
}

const save = new SaveManager('star-catch') // keys become "star-catch:<slot>"

// simple values
const best = save.loadNumber('best', 0)
export function recordScore(score: number): number {
  if (score > best) save.saveNumber('best', score)
  return Math.max(score, best)
}

// structured values
save.save<Progress>('progress', { level: 3, coins: 120 })
const progress = save.load<Progress>('progress') // null when missing or corrupted
if (progress) console.log(progress.level)`,
        },
      ],
    },
    {
      id: 'pooling',
      title: t('Pool bullets and drive them with a state machine', 'Reciclar projéteis e conduzi-los com uma máquina de estados'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`ObjectPool` reuses objects instead of allocating a new one per shot: `acquire()` gives a free one (or `null` at `maxSize`) and `release()` returns it. `forEachRelease` walks the active ones and releases those for which your callback returns `true`. `StateMachine` names what an entity is doing instead of juggling booleans.',
            '`ObjectPool` reaproveita objetos em vez de alocar um novo a cada tiro: `acquire()` entrega um livre (ou `null` ao atingir `maxSize`) e `release()` o devolve. `forEachRelease` percorre os ativos e libera aqueles para os quais o seu callback retorna `true`. `StateMachine` dá nome ao que uma entidade está fazendo, no lugar de malabarismo com booleanos.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { App, Scene, CircleShape, RectShape, ObjectPool, StateMachine } from 'easy-game-maker'
import type { SceneParams } from 'easy-game-maker'

interface Turret {
  cooldown: number
}

class TurretScene extends Scene {
  private app!: App
  private readonly turret = new RectShape({ x: 240, y: 300, width: 40, height: 40, fill: '#845ef7' })
  private readonly bullets = new ObjectPool<CircleShape>(
    () => new CircleShape({ radius: 5, fill: '#ffe066' }),
    (bullet) => {
      bullet.visible = false
    },
    16, // prewarm
    64, // maxSize
  )
  private readonly brain = new StateMachine<Turret>({ cooldown: 0 }, 'idle')

  override onCreate(params?: SceneParams): void {
    this.app = params?.['app'] as App
    this.add(this.turret)

    this.brain
      .addState('idle', { transitions: [{ to: 'firing', when: () => this.app.input.pointer.isDown }] })
      .addState('firing', {
        onUpdate: (turret, dt) => {
          turret.cooldown -= dt
          if (turret.cooldown <= 0) {
            turret.cooldown = 0.15
            this.shoot()
          }
        },
        transitions: [{ to: 'idle', when: () => !this.app.input.pointer.isDown }],
      })
  }

  override onUpdate(dt: number): void {
    this.brain.update(dt)
    this.bullets.forEachRelease((bullet) => {
      bullet.y -= 420 * dt
      return bullet.y < -10
    })
  }

  private shoot(): void {
    const bullet = this.bullets.acquire()
    if (!bullet) return
    bullet.visible = true
    bullet.x = this.turret.x
    bullet.y = this.turret.y
    if (bullet.parent !== this) this.add(bullet)
  }
}

const app = new App({ width: 480, height: 320, backgroundColor: '#101827' })
app.init()
app.scenes.add('turret', TurretScene)
void app.scenes.go('turret', { params: { app } })
app.run()`,
        },
      ],
    },
  ],
}

export default page
