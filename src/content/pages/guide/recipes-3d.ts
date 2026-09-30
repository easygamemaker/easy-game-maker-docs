import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/guide/recipes-3d',
  title: t('3D Recipes', 'Receitas 3D'),
  description: t(
    'Complete patterns for the 3D engine: a controllable character, pickups, hit feedback, game flow, a neon look and pooled projectiles.',
    'Padrões completos para a engine 3D: um personagem controlável, coletáveis, retorno visual de impacto, fluxo de jogo, um visual neon e projéteis reciclados.',
  ),
  source: 'dist/engine3d/ENGINE.md',
  related: ['/3d/quickstart', '/3d/controls', '/3d/physics', '/3d/effects', '/3d/hud'],
  sections: [
    {
      id: 'character',
      title: t('A character you can walk around', 'Um personagem que anda pelo cenário'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`thirdPerson` moves an object in camera space and turns it to face where it travels. Give it a physics `body` so jumping and gravity work. `followCamera` then chases the object in the late update, which is where cameras belong. Step the physics world once per frame from `onUpdate`.',
            '`thirdPerson` move um objeto no espaço da câmera e o vira para onde ele anda. Dê a ele um `body` de física para que pulo e gravidade funcionem. Em seguida o `followCamera` persegue o objeto no late update, que é o lugar das câmeras. Avance o mundo de física uma vez por quadro em `onUpdate`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { createGame, createPhysics, followCamera, lights, models, thirdPerson } from 'easy-game-maker/3d'

const game = createGame({ background: '#0b1020', cameraPosition: [0, 6, 12] })
lights.daylight(game.scene)
game.add(models.ground(80))

const world = createPhysics()
world.addGround(0)

const hero = game.add(models.character())
// the body is a sphere: its centre is one radius above the ground
const body = world.addBody({ object: hero, radius: 0.5, height: 1.8, position: [0, 0.5, 0] })

const walker = thirdPerson(game, game.input, hero, { body, speed: 6, jump: 10 })
followCamera(game, hero, { distance: 9, height: 5 })

game.onUpdate((dt, elapsed) => {
  world.step(dt)
  hero.userData.animate?.(elapsed, walker.travel * 2)
})`,
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'The physics here is arcade collision, not a rigid-body simulation: bodies do not tumble or stack. Set `velocity.x` and `velocity.z` for walking and `velocity.y` once for a jump. `thirdPerson` and `platformer` do that for you.',
            'A física aqui é colisão arcade, não uma simulação de corpos rígidos: os corpos não tombam nem empilham. Defina `velocity.x` e `velocity.z` para andar e `velocity.y` uma única vez para pular. O `thirdPerson` e o `platformer` fazem isso por você.',
          ),
        },
      ],
    },
    {
      id: 'pickups',
      title: t('Pickups with triggers and a HUD score', 'Coletáveis com gatilhos e placar no HUD'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A body created with `trigger: true` detects overlap without blocking. Assign `onEnter` on it. Disable the trigger and hide the model instead of removing them inside the callback. `hud.stat` is a labelled number that pulses when it changes.',
            'Um corpo criado com `trigger: true` detecta sobreposição sem bloquear. Atribua `onEnter` nele. Desative o gatilho e esconda o modelo em vez de removê-los dentro do callback. `hud.stat` é um número com rótulo que pulsa quando muda.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { createGame, createPhysics, followCamera, lights, models, thirdPerson } from 'easy-game-maker/3d'

const game = createGame({ background: '#0b1020', cameraPosition: [0, 6, 12] })
lights.daylight(game.scene)
game.add(models.ground(80))

const world = createPhysics()
world.addGround(0)

const hero = game.add(models.character())
const body = world.addBody({ object: hero, radius: 0.5, height: 1.8, position: [0, 0.5, 0] })
thirdPerson(game, game.input, hero, { body })
followCamera(game, hero)

const coins = game.hud.stat('Coins', 0)
const spinners: Array<(dt: number, elapsed: number) => void> = []

for (let i = 0; i < 8; i++) {
  const coin = models.coin()
  coin.position.set(Math.cos(i * 0.8) * 8, 0, Math.sin(i * 0.8) * 8 - 6)
  game.add(coin)

  const pickup = world.addBody({ trigger: true, radius: 1, object: coin })
  pickup.onEnter = () => {
    coin.visible = false
    pickup.enabled = false
    coins.add(1)
    game.audio.play('coin', { vary: 0.1 })
  }
  spinners.push((dt, elapsed) => coin.userData.update(dt, elapsed))
}

game.onUpdate((dt, elapsed) => {
  world.step(dt)
  for (const spin of spinners) spin(dt, elapsed)
})`,
        },
      ],
    },
    {
      id: 'feedback',
      title: t('Make hits feel like hits', 'Faça os impactos parecerem impactos'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Damage that only changes a number is invisible. Layer four cheap effects: a particle burst, an emissive `flash` on the target, a `hud.flash` over the screen and camera shake. `createShake` adds a transient offset to the current position, so update it in the late update, after the camera rig has positioned the camera.',
            'Dano que só muda um número é invisível. Empilhe quatro efeitos baratos: uma explosão de partículas, um `flash` emissivo no alvo, um `hud.flash` sobre a tela e o tremor de câmera. O `createShake` soma um deslocamento transitório à posição atual, então atualize-o no late update, depois que o rig da câmera posicionou a câmera.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import type { Object3D } from 'three'
import { createGame, createParticles, createShake, flash, followCamera, lights, models, shockwave } from 'easy-game-maker/3d'

const game = createGame({ background: '#0b1020', cameraPosition: [0, 6, 12] })
lights.sunset(game.scene)
game.add(models.ground(60))

const target = game.add(models.crate(1.4, { color: '#a16207' }))
target.position.set(0, 0.7, -4)
followCamera(game, target, { distance: 10, height: 5 })

const fx = createParticles(game.engine, { max: 600 })
const shake = createShake(game.camera, { decay: 12 })
game.onLateUpdate((dt) => shake.update(dt)) // after the camera rig

function hit(what: Object3D): void {
  fx.burst(what.position, { color: '#f97316', count: 28, speed: 5 })
  shockwave(game.engine, what.position, { color: '#f97316' })
  flash(what)
  game.hud.flash('#ef4444')
  shake.add(0.4)
  game.audio.play('hit', { vary: 0.1 })
}

game.onUpdate(() => {
  if (game.input.pressed('fire')) hit(target)
})`,
        },
        {
          type: 'callout',
          kind: 'tip',
          text: t(
            'Pass `vary: 0.1` to sounds that repeat. A few percent of random pitch stops an effect from grating.',
            'Passe `vary: 0.1` aos sons que se repetem. Alguns por cento de variação aleatória de tom impedem que um efeito enjoe.',
          ),
        },
      ],
    },
    {
      id: 'tweens',
      title: t('Animate with tweens and awaits', 'Animar com tweens e awaits'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`game.tweens.to` animates numbers, vectors and colors over seconds and returns a promise, so a sequence reads top to bottom. `tweens.wait` respects `timeScale` and stops while the game is paused, which `setTimeout` does not. `outBack` and `outElastic` overshoot, which is what makes something pop instead of merely arrive.',
            '`game.tweens.to` anima números, vetores e cores ao longo de segundos e devolve uma promessa, então uma sequência se lê de cima para baixo. `tweens.wait` respeita o `timeScale` e para enquanto o jogo está pausado, o que o `setTimeout` não faz. `outBack` e `outElastic` ultrapassam o alvo, e é isso que faz algo saltar em vez de apenas chegar.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { createGame, ease, lights, models, pop } from 'easy-game-maker/3d'

const game = createGame({ background: '#0b1020', cameraPosition: [0, 4, 9] })
lights.studio(game.scene)

const chest = game.add(models.crate(1.2, { color: '#a16207' }))
chest.position.set(0, -2, 0)

async function reveal(): Promise<void> {
  await game.tweens.to(chest.position, { y: 0.6 }, { duration: 0.5, ease: ease.outBack })
  await pop(chest, game.tweens)
  await game.tweens.wait(0.4)
  await game.tweens.to(chest.rotation, { y: Math.PI * 2 }, { duration: 1.2, ease: ease.inOutCubic })
  game.hud.banner('Unlocked!')
}

void reveal()`,
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'Only numbers, `Vector2`, `Vector3` and `Color` can be tweened. To turn an object, tween the numeric fields of its `Euler` (`mesh.rotation`), not a quaternion.',
            'Só números, `Vector2`, `Vector3` e `Color` podem ser animados. Para girar um objeto, anime os campos numéricos do seu `Euler` (`mesh.rotation`), não um quaternion.',
          ),
        },
      ],
    },
    {
      id: 'flow',
      title: t('Game flow, best score and a game-over screen', 'Fluxo do jogo, recorde e tela de fim de jogo'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`createStateMachine` names what the game is doing instead of a set of booleans that can disagree. Pass it the engine and it updates itself. `createScore` keeps a best score in `localStorage`, so give each game its own `key`. `hud.overlay` builds the modal.',
            '`createStateMachine` dá nome ao que o jogo está fazendo, no lugar de um conjunto de booleanos que podem se contradizer. Passe a engine a ele e ele se atualiza sozinho. `createScore` guarda o recorde no `localStorage`, então dê a cada jogo a própria `key`. `hud.overlay` monta o modal.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { createGame, createScore, createStateMachine, createTimer, lights, models } from 'easy-game-maker/3d'

const game = createGame({ background: '#0b1020', cameraPosition: [0, 6, 10] })
lights.daylight(game.scene)
game.add(models.ground(40))

const score = createScore({ key: 'sky-run-best', hud: game.hud })
const clock = createTimer({ duration: 30, hud: game.hud, label: 'Time', onEnd: () => flow.go('over') })

const flow = createStateMachine(
  {
    playing: {
      enter: () => {
        score.reset()
        clock.reset(30)
        clock.start()
      },
      update: (dt) => {
        clock.update(dt)
        if (game.input.pressed('fire')) score.add(1)
      },
    },
    over: {
      enter: () => {
        game.hud.overlay({
          title: 'Time is up',
          body: \`Score \${score.value}, best \${score.best}\`,
          buttons: [{ label: 'Play again', onClick: () => flow.go('playing') }],
        })
      },
    },
  },
  'playing',
  game.engine,
)`,
        },
      ],
    },
    {
      id: 'neon-and-pool',
      title: t('A neon look and pooled projectiles', 'Um visual neon e projéteis reciclados'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Bloom is what makes an emissive material read as light. Pair `materials.glow` with `createPostFX` and keep the threshold high (around 0.9) or the whole image turns to fog. `createPostFX` needs `game.engine`, not `game`. For anything spawned often, take from `models.createPool` instead of creating meshes, and drive spawning with `createTicker`, which fires the right number of times whatever the frame rate.',
            'O bloom é o que faz um material emissivo parecer luz. Combine `materials.glow` com `createPostFX` e mantenha o limiar alto (perto de 0,9), ou a imagem inteira vira névoa. O `createPostFX` precisa de `game.engine`, não de `game`. Para tudo que nasce com frequência, pegue de `models.createPool` em vez de criar malhas, e conduza o spawn com `createTicker`, que dispara o número certo de vezes seja qual for a taxa de quadros.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { createGame, createPostFX, createTicker, lights, materials, models } from 'easy-game-maker/3d'

const game = createGame({ background: '#05060f', cameraPosition: [0, 5, 12] })
lights.night(game.scene)
materials.skyGradient(game.scene, '#05060f', '#3b0764')

const floor = models.ground(60, { color: '#0a0a1a', accent: '#111133' })
game.add(floor)

const fx = createPostFX(game.engine, { bloom: { strength: 0.8, threshold: 0.9 }, vignette: true })

const turret = game.add(models.box(1, { material: materials.glow('#22d3ee') }))
turret.position.set(0, 0.5, 0)

const bullets = models.createPool(() => models.sphere(0.15, { material: materials.glow('#facc15') }), {
  size: 32,
  parent: game.scene,
})

const spawner = createTicker(0.2, () => {
  const bullet = bullets.take()
  bullet.position.copy(turret.position)
  bullet.position.y += 0.6
})

game.onUpdate((dt) => {
  spawner.update(dt)
  bullets.each((bullet) => {
    bullet.position.z -= 18 * dt
    return bullet.position.z < -40 // true retires the bullet back into the pool
  })
})

// when the game ends: fx.dispose() first, then game.engine.dispose()
export function shutdown(): void {
  fx.dispose()
  game.engine.dispose()
}`,
        },
      ],
    },
  ],
}

export default page
