import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/animation',
  title: t('animation', 'animation'),
  description: t(
    'Tweens, springs, screen shake, hit flashes, idle motion and a clip mixer, all timed in seconds and eased.',
    'Tweens, molas, tremor de tela, flashes de impacto, movimento ocioso e um mixer de clipes, tudo medido em segundos e suavizado.',
  ),
  source: 'src/engine3d/animation.ts',
  related: ['/3d/math', '/3d/models', '/3d/engine', '/3d/effects'],
  sections: [
    {
      id: 'overview',
      title: t('Seconds and easing', 'Segundos e suavização'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Import the module as the `anim` namespace (`anim.createTweens`) or use the flat exports: `createTweens`, `createMixer`, `createShake`, `Spring`, `SpringVec3`, `flash`, `pop`, `hover` and `ease`. Everything is expressed in seconds and eased. A pickup that pops over 0.3 s with `outBack` reads as designed; the same pickup moved a fixed amount per frame reads as a bug on a 144 Hz monitor.',
            'Importe o módulo como o namespace `anim` (`anim.createTweens`) ou use os exports diretos: `createTweens`, `createMixer`, `createShake`, `Spring`, `SpringVec3`, `flash`, `pop`, `hover` e `ease`. Tudo é expresso em segundos e suavizado. Um item que "pula" em 0,3 s com `outBack` parece projetado; o mesmo item movido uma quantidade fixa por quadro parece um bug num monitor de 144 Hz.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Pickup pop, hit flash and camera shake', 'Pop de item, flash de impacto e tremor de câmera'),
          code: `import { createGame, models, lights, ease, pop, flash, hover, createShake } from 'easy-game-maker/3d'

const game = createGame({ cameraPosition: [0, 3, 8] })
lights.daylight(game.scene)
game.add(models.ground(40))

const crate = game.add(models.crate(1.2))
crate.position.set(0, 0.6, 0)
const bob = hover(crate, { amplitude: 0.1 })
game.onUpdate(bob)

const shake = createShake(game.camera, { decay: 8 })
// Shake runs after whatever positions the camera.
game.onLateUpdate((dt) => shake.update(dt))

async function onHit() {
  flash(crate, { color: '#ef4444' })
  shake.add(0.3)
  await pop(crate, game.tweens, { scale: 1.3 })
  await game.tweens.to(crate.position, { x: 3 }, { duration: 0.4, ease: ease.outBack })
}
window.addEventListener('pointerdown', () => void onHit())`,
        },
      ],
    },
    {
      id: 'tweens',
      title: t('Tweens', 'Tweens'),
      description: t(
        '`createTweens(engine)`, or `game.tweens`. One manager per game, hooked to the engine loop.',
        '`createTweens(engine)`, ou `game.tweens`. Um gerenciador por jogo, ligado ao loop da engine.',
      ),
      blocks: [
        {
          type: 'p',
          text: t(
            'Tweens land on exactly the value asked for (the last frame assigns the destination outright) and resolve a promise, so sequences read as `await` instead of nested callbacks. `outBack` and `outElastic` overshoot, which is what makes a pickup or a menu pop land instead of merely arrive.',
            'Os tweens chegam exatamente ao valor pedido (o último quadro atribui o destino direto) e resolvem uma promise, então sequências se leem como `await` e não como callbacks aninhados. `outBack` e `outElastic` ultrapassam o alvo, e é isso que faz um item ou um menu "aterrissar" em vez de só chegar.',
          ),
        },
        {
          type: 'table',
          head: [t('Method', 'Método'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`tweens.to`', '`tweens.to`'), t('`to(target, props, { duration = 0.3, delay = 0, ease = ease.outCubic, onUpdate, onComplete })`', '`to(target, props, { duration = 0.3, delay = 0, ease = ease.outCubic, onUpdate, onComplete })`'), t('Animates numbers, `Vector2`, `Vector3` and `Color` properties. The promise resolves with the target and has `stop()`.', 'Anima propriedades numéricas, `Vector2`, `Vector3` e `Color`. A promise resolve com o alvo e tem `stop()`.')],
            [t('`tweens.from`', '`tweens.from`'), t('`from(target, props, options)`', '`from(target, props, options)`'), t('Starts at `props` and animates to where the target already is.', 'Começa em `props` e anima até onde o alvo já está.')],
            [t('`tweens.value`', '`tweens.value`'), t('`value(from, to, options)`', '`value(from, to, options)`'), t('A tween of a bare number. The interpolated number is `holder.v`, the second argument of `onUpdate(eased, holder)` (`eased` is the 0..1 eased progress, not the value).', 'Um tween de um número solto. O número interpolado é `holder.v`, o segundo argumento de `onUpdate(eased, holder)` (`eased` é o progresso suavizado de 0 a 1, não o valor).')],
            [t('`tweens.wait`', '`tweens.wait`'), t('`wait(seconds)`', '`wait(seconds)`'), t('A pause that respects `timeScale` and stops while the game is paused, which `setTimeout` does not.', 'Uma pausa que respeita o `timeScale` e para com o jogo pausado, o que `setTimeout` não faz.')],
            [t('`tweens.stopAll`', '`tweens.stopAll`'), t('`stopAll()`', '`stopAll()`'), t('Cancels everything in flight.', 'Cancela tudo o que está em andamento.')],
            [t('`tweens.step`', '`tweens.step`'), t('`step(dt)`', '`step(dt)`'), t('Advances by hand, for a manager created without an engine.', 'Avança na mão, para um gerenciador criado sem engine.')],
            [t('`tweens.dispose`', '`tweens.dispose`'), t('`dispose()`', '`dispose()`'), t('Detaches from the engine loop and cancels everything.', 'Solta-se do loop da engine e cancela tudo.')],
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Not everything can be tweened', 'Nem tudo pode ser animado'),
          text: t(
            'Tweening a property that is not a number, `Vector2`, `Vector3` or `Color` (an `Euler` or a `Quaternion`, for example) throws a `TypeError`. Tween the numeric fields instead: `tweens.to(mesh.rotation, { y: 1.5 })`. Also, `tweens.from` does not check that the start values were assigned, so a read-only property fails silently.',
            'Animar uma propriedade que não é número, `Vector2`, `Vector3` ou `Color` (um `Euler` ou um `Quaternion`, por exemplo) lança um `TypeError`. Anime os campos numéricos: `tweens.to(mesh.rotation, { y: 1.5 })`. Além disso, `tweens.from` não confere se os valores iniciais foram atribuídos, então uma propriedade somente leitura falha em silêncio.',
          ),
        },
      ],
    },
    {
      id: 'springs',
      title: t('Springs', 'Molas'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`Spring` and `SpringVec3` are classes for a target that keeps moving: a camera zoom that follows speed, a UI element tracking a value, a weapon that kicks. A tween has to be restarted when the target moves; a spring just keeps going.',
            '`Spring` e `SpringVec3` são classes para um alvo que não para de se mover: um zoom de câmera que acompanha a velocidade, um elemento de UI (User Interface, interface do usuário) que segue um valor, uma arma que dá coice. Um tween precisa ser reiniciado quando o alvo muda; a mola simplesmente continua.',
          ),
        },
        {
          type: 'list',
          items: [
            t(
              '`new Spring({ stiffness = 180, damping = 18, value = 0 })` has `value`, `target`, `velocity`, `impulse(amount)` (kicks it without moving the target) and `update(dt) => value`. It sub-steps, so a stiff spring cannot explode on a slow frame.',
              '`new Spring({ stiffness = 180, damping = 18, value = 0 })` tem `value`, `target`, `velocity`, `impulse(amount)` (dá um chute sem mover o alvo) e `update(dt) => value`. Ele divide o passo em partes menores, então uma mola dura não explode num quadro lento.',
            ),
            t(
              '`SpringVec3` is three springs: `setTarget({ x, y, z })` and `update(dt, out?) => Vector3`.',
              '`SpringVec3` são três molas: `setTarget({ x, y, z })` e `update(dt, out?) => Vector3`.',
            ),
          ],
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('A recoil spring', 'Uma mola de recuo'),
          code: `import { createGame, models, lights, Spring } from 'easy-game-maker/3d'

const game = createGame()
lights.studio(game.scene)
const gun = game.add(models.box([0.3, 0.3, 1.2], { color: '#64748b' }))

const recoil = new Spring({ stiffness: 220, damping: 14 })
game.onUpdate((dt) => {
  gun.position.z = recoil.update(dt)
})
window.addEventListener('pointerdown', () => recoil.impulse(6))`,
        },
      ],
    },
    {
      id: 'feedback',
      title: t('Feedback helpers', 'Auxiliares de feedback'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`createShake`', '`createShake`'), t('`createShake(object, { decay = 5, frequency = 30 }) => { add, update, reset }`', '`createShake(object, { decay = 5, frequency = 30 }) => { add, update, reset }`'), t('Screen shake as a decaying offset on any object with a `position`. `add(strength = 0.3)` starts or strengthens it (keeps the larger); 0.15 suits a footstep, 0.5 an explosion. `reset()` restores the position from when `createShake` was called.', 'Tremor de tela como um deslocamento decrescente em qualquer objeto com `position`. `add(strength = 0.3)` inicia ou reforça (mantém o maior); 0,15 serve para um passo, 0,5 para uma explosão. `reset()` restaura a posição de quando `createShake` foi chamado.')],
            [t('`flash`', '`flash`'), t('`flash(object, { color = \'#ffffff\', duration = 0.12, intensity = 1 })`', '`flash(object, { color = \'#ffffff\', duration = 0.12, intensity = 1 })`'), t('Blinks the emissive colour of every mesh under `object` whose material has one (standard materials do; `materials.flat` does not). The universal "that hit". It restores with `setTimeout`, so it ignores `timeScale`.', 'Pisca a cor emissiva de todo mesh sob `object` cujo material tenha uma (materiais standard têm; `materials.flat` não). O clássico "isso acertou". Restaura com `setTimeout`, então ignora o `timeScale`.')],
            [t('`pop`', '`pop`'), t('`pop(object, tweens, { scale = 1.25, duration = 0.24 })`', '`pop(object, tweens, { scale = 1.25, duration = 0.24 })`'), t('Squash and stretch back to the current scale (`outElastic`). Returns the tween promise.', 'Achata e estica de volta à escala atual (`outElastic`). Devolve a promise do tween.')],
            [t('`hover`', '`hover`'), t('`hover(object, { amplitude = 0.15, speed = 2, spin = 0.6, phase = random })`', '`hover(object, { amplitude = 0.15, speed = 2, spin = 0.6, phase = random })`'), t('Idle bob and spin. Returns an update function: `game.onUpdate(hover(mesh))`.', 'Balanço e giro ocioso. Devolve uma função de update: `game.onUpdate(hover(mesh))`.')],
            [t('`ease`', '`ease`'), t('`(t: 0..1) => number` curves', 'curvas `(t: 0..1) => number`'), t('`linear`, `inQuad`, `outQuad`, `inOutQuad`, `inCubic`, `outCubic`, `inOutCubic`, `inQuart`, `outQuart`, `inExpo`, `outExpo`, `inSine`, `outSine`, `inOutSine`, `outBack`, `inBack`, `outElastic`, `outBounce`. Same object as `anim.ease` and `math.ease`.', '`linear`, `inQuad`, `outQuad`, `inOutQuad`, `inCubic`, `outCubic`, `inOutCubic`, `inQuart`, `outQuart`, `inExpo`, `outExpo`, `inSine`, `outSine`, `inOutSine`, `outBack`, `inBack`, `outElastic`, `outBounce`. É o mesmo objeto de `anim.ease` e `math.ease`.')],
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Shake ordering and duration', 'Ordem e duração do shake'),
          text: t(
            '`createShake.update` adds a transient offset to the object\'s current position and keeps no memory of the previous frame\'s offset. Call it after the system that moves the object (a camera rig rewrites the position every frame); on a static object the offsets accumulate. The duration is set by `decay`: the shake stops once strength falls under 0.0001, so with the default `decay` of 5 a strength of 0.3 takes about 1.6 s. Raise `decay` for a shorter shake.',
            '`createShake.update` soma um deslocamento transitório à posição atual do objeto e não guarda memória do deslocamento do quadro anterior. Chame depois do sistema que move o objeto (um rig de câmera reescreve a posição a cada quadro); num objeto estático os deslocamentos se acumulam. A duração vem do `decay`: o tremor para quando a força cai abaixo de 0,0001, então com o `decay` padrão de 5 uma força de 0,3 dura cerca de 1,6 s. Aumente o `decay` para um tremor mais curto.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'Calling `flash` twice on the same object within `duration` leaves its emissive colour lit: the second call captures the already flashed values as the ones to restore.',
            'Chamar `flash` duas vezes no mesmo objeto dentro de `duration` deixa a cor emissiva acesa: a segunda chamada captura os valores já piscados como os que deve restaurar.',
          ),
        },
      ],
    },
    {
      id: 'mixer',
      title: t('Mixer', 'Mixer'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`createMixer(model, clips, engine?)` plays clips (typically `models.loadModel(url).animations`) by name with crossfades. Switching with `.stop()` then `.play()` snaps between poses; a crossfade is what makes idle-to-run look like the same character. With an engine it updates itself; without one, call `mixer.update(dt)`.',
            '`createMixer(model, clips, engine?)` toca clipes (em geral `models.loadModel(url).animations`) por nome, com crossfade. Trocar com `.stop()` e depois `.play()` estala entre poses; o crossfade é o que faz o idle-para-corrida parecer o mesmo personagem. Com uma engine ele se atualiza sozinho; sem uma, chame `mixer.update(dt)`.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'mixer', type: 'THREE.AnimationMixer', readonly: true, description: t('The underlying three.js mixer.', 'O mixer do three.js por baixo.') },
            { name: 'actions', type: 'Map', readonly: true, description: t('The actions by clip name.', 'As ações por nome de clipe.') },
            { name: 'playing', type: 'string | null', readonly: true, description: t('Name of the clip playing, or `null`.', 'Nome do clipe tocando, ou `null`.') },
            { name: 'names()', type: '() => string[]', description: t('The clip names.', 'Os nomes dos clipes.') },
            { name: 'play(name, { fade = 0.25, loop = true, speed = 1 })', type: 'void', description: t('Unknown names and the clip already playing are ignored. `loop: false` plays once and holds the last pose.', 'Nomes desconhecidos e o clipe que já está tocando são ignorados. `loop: false` toca uma vez e segura a última pose.') },
            { name: 'stop(name?)', type: 'void', description: t('Stops a clip (or all).', 'Para um clipe (ou todos).') },
            { name: 'update(dt)', type: 'void', description: t('Only needed without an engine.', 'Só é necessário sem engine.') },
            { name: 'dispose()', type: 'void', description: t('Releases the mixer.', 'Libera o mixer.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            '`mixer.play(name, { fade: 0 })` does not stop the previous clip: it is only faded out when `fade` is above 0.',
            '`mixer.play(name, { fade: 0 })` não para o clipe anterior: ele só some gradualmente quando `fade` é maior que 0.',
          ),
        },
      ],
    },
  ],
}

export default page
