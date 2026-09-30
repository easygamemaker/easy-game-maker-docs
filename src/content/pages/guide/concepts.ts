import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/guide/concepts',
  title: t('Core Concepts', 'Conceitos Fundamentais'),
  description: t(
    'The mental model behind both engines: the loop, scenes, the scene graph, time, coordinates and input.',
    'O modelo mental por trás das duas engines: o laço, as cenas, o grafo de cena, o tempo, as coordenadas e a entrada.',
  ),
  source: 'src/engine/index.ts',
  related: ['/guide/2d-or-3d', '/core/app', '/core/scene', '/3d/game-shape', '/guide/recipes-2d'],
  sections: [
    {
      id: 'loop',
      title: t('The loop and delta time', 'O laço e o delta time'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Every game is one loop: read input, update the world, draw. EGM owns that loop. You never write your own `requestAnimationFrame`. You get `dt`, the seconds since the previous frame, capped so a background tab does not return with one enormous step (0.1 s in 2D, 1/15 s in 3D).',
            'Todo jogo é um laço: ler a entrada, atualizar o mundo, desenhar. O EGM é dono desse laço. Você nunca escreve o seu próprio `requestAnimationFrame`. Você recebe o `dt`, os segundos desde o quadro anterior, limitado para que uma aba em segundo plano não volte com um passo gigante (0,1 s no 2D, 1/15 s no 3D).',
          ),
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('The one rule', 'A regra de ouro'),
          text: t(
            'Anything that moves per frame is multiplied by `dt`. `x += 5` is a bug that only shows up on another monitor; `x += 300 * dt` is 300 units per second everywhere.',
            'Tudo que se move por quadro é multiplicado por `dt`. `x += 5` é um bug que só aparece em outro monitor; `x += 300 * dt` são 300 unidades por segundo em qualquer lugar.',
          ),
        },
      ],
    },
    {
      id: 'scenes',
      title: t('Scenes (2D)', 'Cenas (2D)'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A 2D game is a set of named scenes registered on `app.scenes`. `app.scenes.go(name)` makes one current. A scene is a `Group`, so it is also the root of that screen\'s display tree.',
            'Um jogo 2D é um conjunto de cenas nomeadas registradas em `app.scenes`. `app.scenes.go(name)` torna uma delas a atual. Uma cena é um `Group`, então também é a raiz da árvore de exibição daquela tela.',
          ),
        },
        {
          type: 'table',
          head: [t('Hook', 'Gancho'), t('Runs', 'Quando roda')],
          rows: [
            [t('`onCreate(params)`', '`onCreate(params)`'), t('Once, the first time the scene is visited. Await asset loading here.', 'Uma vez, na primeira visita à cena. Aguarde o carregamento de assets aqui.')],
            [t('`onResume()`', '`onResume()`'), t('Every time the scene becomes current.', 'Toda vez que a cena se torna a atual.')],
            [t('`onUpdate(dt)`', '`onUpdate(dt)`'), t('Every frame while current.', 'A cada quadro enquanto for a atual.')],
            [t('`onPause()`', '`onPause()`'), t('When another scene takes over.', 'Quando outra cena assume.')],
            [t('`onDestroy()`', '`onDestroy()`'), t('When the scene is destroyed.', 'Quando a cena é destruída.')],
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'Scene instances are cached. Going back to a scene runs `onResume`, not `onCreate`, and the `params` of the second `go` are ignored. Reset your state in `onResume`, or call `app.scenes.destroyScene(name)` to force a fresh instance.',
            'As instâncias de cena ficam em cache. Voltar a uma cena executa `onResume`, não `onCreate`, e os `params` do segundo `go` são ignorados. Reinicie o estado em `onResume`, ou chame `app.scenes.destroyScene(name)` para forçar uma instância nova.',
          ),
        },
      ],
    },
    {
      id: 'scene-graph',
      title: t('The scene graph and coordinates', 'O grafo de cena e as coordenadas'),
      blocks: [
        {
          type: 'p',
          text: t(
            '2D objects (`Sprite`, `RectShape`, `CircleShape`, `Text`, `Group` and others) extend `DisplayObject`. Children inherit their parent\'s position, rotation, scale and alpha, so moving a `Group` moves everything inside it.',
            'Os objetos 2D (`Sprite`, `RectShape`, `CircleShape`, `Text`, `Group` e outros) estendem `DisplayObject`. Os filhos herdam posição, rotação, escala e alpha do pai, então mover um `Group` move tudo o que está dentro.',
          ),
        },
        {
          type: 'table',
          head: [t('Aspect', 'Aspecto'), t('2D', '2D'), t('3D', '3D')],
          rows: [
            [t('Origin', 'Origem'), t('Top-left of the canvas', 'Canto superior esquerdo do canvas'), t('World origin `(0, 0, 0)`', 'Origem do mundo `(0, 0, 0)`')],
            [t('Y axis', 'Eixo Y'), t('Grows downward', 'Cresce para baixo'), t('Up', 'Para cima')],
            [t('Forward', 'Frente'), t('Not applicable', 'Não se aplica'), t('`-Z`', '`-Z`')],
            [t('Units', 'Unidades'), t('Pixels of the game canvas', 'Pixels do canvas do jogo'), t('World units (meters by convention)', 'Unidades de mundo (metros, por convenção)')],
            [t('Angles', 'Ângulos'), t('Radians', 'Radianos'), t('Radians', 'Radianos')],
            [t('Anchor', 'Âncora'), t('`anchorX`/`anchorY`, default `0.5` (center)', '`anchorX`/`anchorY`, padrão `0.5` (centro)'), t('Object origin', 'Origem do objeto')],
          ],
        },
      ],
    },
    {
      id: 'example-2d',
      title: t('A scene that uses the concepts', 'Uma cena que usa os conceitos'),
      blocks: [
        {
          type: 'p',
          text: t(
            'This scene moves a box with `dt`, animates it with the transition manager and schedules a repeating timer. Note that `app.transitions` takes `duration` in milliseconds.',
            'Esta cena move uma caixa com `dt`, a anima com o gerenciador de transições e agenda um timer repetido. Repare que `app.transitions` recebe `duration` em milissegundos.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { App, Scene, RectShape, Easing } from 'easy-game-maker'
import type { SceneParams, TimerHandle } from 'easy-game-maker'

class DemoScene extends Scene {
  private app!: App
  private tick: TimerHandle | null = null
  private readonly box = new RectShape({ x: 80, y: 120, width: 60, height: 60, fill: '#4dabf7' })

  override onCreate(params?: SceneParams): void {
    this.app = params?.['app'] as App
    this.add(this.box)

    // duration is in milliseconds here
    this.app.transitions.to(this.box as unknown as Record<string, number>, {
      y: 320,
      duration: 800,
      easing: Easing.outQuad,
    })

    this.tick = this.app.timers.every(1, () => {
      this.box.rotation += Math.PI / 4
    })
  }

  override onUpdate(dt: number): void {
    this.box.x = (this.box.x + 90 * dt) % 480
  }

  override onDestroy(): void {
    this.tick?.cancel()
  }
}

const app = new App({ width: 480, height: 480, backgroundColor: '#101827' })
app.init()
app.scenes.add('demo', DemoScene)
void app.scenes.go('demo', { params: { app } })
app.run()`,
        },
      ],
    },
    {
      id: 'input-3d',
      title: t('Input and the 3D shape', 'Entrada e a forma do 3D'),
      blocks: [
        {
          type: 'p',
          text: t(
            'In 2D you listen to events (`app.input.on("pointerdown", ...)`) or poll (`app.input.isKeyDown("ArrowLeft")`). In 3D, `game.input` is a per-frame snapshot: `down(action)` is true while held, `pressed(action)` is true for exactly one frame, and `move` is a normalised vector from WASD, arrows, a gamepad stick or a touch drag. Read `pressed` inside `onUpdate`, not `onLateUpdate`.',
            'No 2D você escuta eventos (`app.input.on("pointerdown", ...)`) ou consulta o estado (`app.input.isKeyDown("ArrowLeft")`). No 3D, `game.input` é um retrato por quadro: `down(action)` é verdadeiro enquanto a tecla está pressionada, `pressed(action)` é verdadeiro por exatamente um quadro e `move` é um vetor normalizado vindo de WASD, setas, analógico de controle ou arrasto de toque. Leia `pressed` dentro de `onUpdate`, não de `onLateUpdate`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { createGame, lights, models } from 'easy-game-maker/3d'

const game = createGame({ background: '#0b1020', cameraPosition: [0, 6, 12] })
lights.sunset(game.scene)
game.add(models.ground(60))

const player = game.add(models.character())

game.onUpdate((dt) => {
  // held: movement. move.y is -1 for "forward", and forward is -Z
  player.position.x += game.input.move.x * 6 * dt
  player.position.z += game.input.move.y * 6 * dt

  // one frame: actions
  if (game.input.pressed('jump')) game.audio.play('jump')
})`,
        },
        {
          type: 'p',
          text: t(
            'The 3D engine never starts a loop for you to call: `createGame` starts it before returning. See [The Shape of a Game](/3d/game-shape).',
            'A engine 3D nunca deixa um laço para você iniciar: `createGame` o inicia antes de retornar. Veja [A Forma de um Jogo](/3d/game-shape).',
          ),
        },
      ],
    },
  ],
}

export default page
