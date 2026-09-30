import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/math',
  title: t('math', 'math'),
  description: t(
    'Framerate-independent smoothing, ranges, angles, random helpers and easing curves.',
    'Suavização independente da taxa de quadros, intervalos, ângulos, helpers de aleatoriedade e curvas de easing.',
  ),
  source: 'src/engine3d/math.ts',
  related: ['/3d/animation', '/3d/controls', '/3d/physics', '/3d/state'],
  sections: [
    {
      id: 'overview',
      title: t('The numbers a game needs first', 'Os números de que um jogo precisa primeiro'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Import the `math` namespace (`math.clamp`, `math.damp`). Everything is framerate-independent where that is possible: a game at 144 Hz and the same game at 30 Hz should feel the same, which means no `x += 0.1` per frame anywhere. Pass the frame\'s `dt` and let these functions do the rest.',
            'Importe o namespace `math` (`math.clamp`, `math.damp`). Tudo é independente da taxa de quadros sempre que possível: um jogo a 144 Hz e o mesmo jogo a 30 Hz devem ter a mesma sensação, o que significa nenhum `x += 0.1` por quadro em lugar nenhum. Passe o `dt` do quadro e deixe estas funções fazerem o resto.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Smooth follow, wrapped angles and seeded scatter', 'Seguir suave, ângulos com wrap e dispersão com semente'),
          code: `import { createGame, models, lights, math } from 'easy-game-maker/3d'

const game = createGame()
lights.daylight(game.scene)
game.add(models.ground(60))

// The same layout every run, thanks to the seed.
const rng = math.createRandom(42)
for (let i = 0; i < 20; i++) {
  game.add(models.rock({ radius: rng.range(0.4, 1) })).position.set(rng.spread(20), 0.4, rng.spread(20))
}

const marker = game.add(models.cone(0.4, 1.2, { color: '#f97316' }))
let heading = 0

game.onUpdate((dt, elapsed) => {
  const targetX = Math.sin(elapsed) * 8
  marker.position.x = math.damp(marker.position.x, targetX, 8, dt)
  heading = math.dampAngle(heading, Math.atan2(targetX - marker.position.x, 1), 12, dt)
  marker.rotation.y = math.wrap(heading, -Math.PI, Math.PI)
})`,
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Why damp', 'Por que damp'),
          text: t(
            'The naive `x += (target - x) * 0.1` moves ten times further per second at 120 fps than at 12, so a game tuned on one machine feels wrong on another. Route anything smoothed through `math.damp(current, target, lambda, dt)`. Roughly: `lambda` 1 is lazy, 8 is snappy, 20 is nearly instant.',
            'O ingênuo `x += (target - x) * 0.1` anda dez vezes mais por segundo a 120 fps do que a 12, então um jogo ajustado numa máquina fica errado em outra. Passe tudo que é suavizado por `math.damp(current, target, lambda, dt)`. Em linhas gerais: `lambda` 1 é preguiçoso, 8 é ágil, 20 é quase instantâneo.',
          ),
        },
      ],
    },
    {
      id: 'numbers',
      title: t('Numbers and ranges', 'Números e intervalos'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`math.TAU`, `math.DEG`', '`math.TAU`, `math.DEG`'), t('numbers', 'números'), t('`Math.PI * 2` and `Math.PI / 180` (multiply degrees by `DEG` to get radians).', '`Math.PI * 2` e `Math.PI / 180` (multiplique graus por `DEG` para obter radianos).')],
            [t('`math.clamp`, `math.clamp01`', '`math.clamp`, `math.clamp01`'), t('`clamp(value, min, max)`, `clamp01(value)`', '`clamp(value, min, max)`, `clamp01(value)`'), t('`clamp01` clamps to 0..1.', '`clamp01` limita a 0..1.')],
            [t('`math.lerp`', '`math.lerp`'), t('`lerp(a, b, t)`', '`lerp(a, b, t)`'), t('Linear interpolation.', 'Interpolação linear.')],
            [t('`math.inverseLerp`', '`math.inverseLerp`'), t('`inverseLerp(a, b, value)`', '`inverseLerp(a, b, value)`'), t('Where `value` sits between `a` and `b`, as 0..1 (clamped); 0 when `a` equals `b`.', 'Onde `value` fica entre `a` e `b`, de 0 a 1 (com clamp); 0 quando `a` é igual a `b`.')],
            [t('`math.remap`', '`math.remap`'), t('`remap(value, inMin, inMax, outMin, outMax)`', '`remap(value, inMin, inMax, outMin, outMax)`'), t('Maps a value between ranges (clamped to the input range).', 'Mapeia um valor entre intervalos (com clamp no intervalo de entrada).')],
            [t('`math.smoothstep`', '`math.smoothstep`'), t('`smoothstep(t)`', '`smoothstep(t)`'), t('Smooth 0..1 ease in and out (input clamped).', 'Entrada e saída suaves de 0 a 1 (entrada com clamp).')],
            [t('`math.moveTowards`', '`math.moveTowards`'), t('`moveTowards(current, target, maxDelta)`', '`moveTowards(current, target, maxDelta)`'), t('Walks toward a target at a fixed speed, never overshooting.', 'Anda em direção a um alvo a velocidade fixa, sem nunca passar.')],
            [t('`math.wrap`', '`math.wrap`'), t('`wrap(value, min, max)`', '`wrap(value, min, max)`'), t('Keeps a value inside `[min, max)`: angles, tiling, looping.', 'Mantém um valor dentro de `[min, max)`: ângulos, tiling, loops.')],
            [t('`math.pingPong`', '`math.pingPong`'), t('`pingPong(t, length = 1)`', '`pingPong(t, length = 1)`'), t('Bounces `t` back and forth between 0 and `length`.', 'Faz `t` ir e voltar entre 0 e `length`.')],
            [t('`math.deadzone`', '`math.deadzone`'), t('`deadzone(value, threshold = 0.15)`', '`deadzone(value, threshold = 0.15)`'), t('Kills tiny stick noise so a resting control reads exactly zero, and rescales the rest to reach 1.', 'Elimina o ruído pequeno do analógico para que um controle em repouso leia exatamente zero, e reescala o resto para chegar a 1.')],
          ],
        },
      ],
    },
    {
      id: 'smoothing',
      title: t('Smoothing and angles', 'Suavização e ângulos'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`math.damp`', '`math.damp`'), t('`damp(current, target, lambda, dt) => number`', '`damp(current, target, lambda, dt) => number`'), t('Exponential smoothing as a decay per second.', 'Suavização exponencial como decaimento por segundo.')],
            [t('`math.dampVec`', '`math.dampVec`'), t('`dampVec(current, target, lambda, dt)`', '`dampVec(current, target, lambda, dt)`'), t('`damp` for anything with `.lerp` (`Vector2`, `Vector3`, `Color`). Mutates and returns `current`.', '`damp` para qualquer coisa com `.lerp` (`Vector2`, `Vector3`, `Color`). Altera e devolve `current`.')],
            [t('`math.dampQuat`', '`math.dampQuat`'), t('`dampQuat(current, target, lambda, dt)`', '`dampQuat(current, target, lambda, dt)`'), t('`damp` for a quaternion, via slerp. Mutates and returns `current`.', '`damp` para um quaternion, via slerp. Altera e devolve `current`.')],
            [t('`math.angleDelta`', '`math.angleDelta`'), t('`angleDelta(a, b)`', '`angleDelta(a, b)`'), t('The shortest way round from angle `a` to angle `b`, in radians (-PI..PI).', 'O caminho mais curto do ângulo `a` ao ângulo `b`, em radianos (-PI..PI).')],
            [t('`math.lerpAngle`', '`math.lerpAngle`'), t('`lerpAngle(a, b, t)`', '`lerpAngle(a, b, t)`'), t('`lerp` along the shortest way round.', '`lerp` pelo caminho mais curto.')],
            [t('`math.dampAngle`', '`math.dampAngle`'), t('`dampAngle(current, target, lambda, dt)`', '`dampAngle(current, target, lambda, dt)`'), t('`damp` along the shortest way round: a character reversing turns through 180 degrees, not the long way.', '`damp` pelo caminho mais curto: um personagem que inverte gira 180 graus, e não pelo lado longo.')],
          ],
        },
      ],
    },
    {
      id: 'random',
      title: t('Random', 'Aleatoriedade'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`math.randRange`', '`math.randRange`'), t('`randRange(min, max)`', '`randRange(min, max)`'), t('Random float.', 'Float aleatório.')],
            [t('`math.randInt`', '`math.randInt`'), t('`randInt(min, max)`', '`randInt(min, max)`'), t('Random integer, both ends included.', 'Inteiro aleatório, com as duas pontas incluídas.')],
            [t('`math.randSpread`', '`math.randSpread`'), t('`randSpread(magnitude = 1)`', '`randSpread(magnitude = 1)`'), t('Symmetric spread around zero: the shape most jitter and scatter wants.', 'Dispersão simétrica em torno de zero: o formato que quase todo jitter e espalhamento quer.')],
            [t('`math.chance`', '`math.chance`'), t('`chance(probability)`', '`chance(probability)`'), t('True with that probability (0..1).', 'Verdadeiro com essa probabilidade (0..1).')],
            [t('`math.pick`', '`math.pick`'), t('`pick(list)`', '`pick(list)`'), t('A random item, or `undefined` for an empty list.', 'Um item aleatório, ou `undefined` para uma lista vazia.')],
            [t('`math.shuffle`', '`math.shuffle`'), t('`shuffle(list)`', '`shuffle(list)`'), t('A new list in random order; the input is left alone.', 'Uma nova lista em ordem aleatória; a entrada não é alterada.')],
            [t('`math.createRandom`', '`math.createRandom`'), t('`createRandom(seed = 1) => { next, range, int, spread, chance, pick }`', '`createRandom(seed = 1) => { next, range, int, spread, chance, pick }`'), t('A seeded source (mulberry32) for levels that differ every run but replay identically.', 'Uma fonte com semente (mulberry32) para fases que mudam a cada execução mas se repetem de forma idêntica.')],
          ],
        },
      ],
    },
    {
      id: 'ease',
      title: t('Easing curves', 'Curvas de easing'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`math.ease` is the same object as the flat `ease` and `anim.ease`. Each curve takes a 0..1 progress. The full set: `linear`, `inQuad`, `outQuad`, `inOutQuad`, `inCubic`, `outCubic`, `inOutCubic`, `inQuart`, `outQuart`, `inExpo`, `outExpo`, `inSine`, `outSine`, `inOutSine`, `outBack`, `inBack`, `outElastic`, `outBounce`. `outBack` and `outElastic` overshoot past 1, which is what makes a UI pop land instead of arrive.',
            '`math.ease` é o mesmo objeto do `ease` direto e do `anim.ease`. Cada curva recebe um progresso de 0 a 1. O conjunto completo: `linear`, `inQuad`, `outQuad`, `inOutQuad`, `inCubic`, `outCubic`, `inOutCubic`, `inQuart`, `outQuart`, `inExpo`, `outExpo`, `inSine`, `outSine`, `inOutSine`, `outBack`, `inBack`, `outElastic`, `outBounce`. `outBack` e `outElastic` passam de 1, e é isso que faz um pop de interface "aterrissar" em vez de só chegar.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Using a curve by hand', 'Usando uma curva na mão'),
          code: `import { math } from 'easy-game-maker/3d'

const progress = math.clamp01(0.4)
const eased = math.ease.outBack(progress)
const scale = math.lerp(1, 1.5, eased)
console.log(scale)`,
        },
        {
          type: 'p',
          text: t(
            'Exported types: `EaseName` (the union of the curve names), `Lerpable` and `Slerpable` (what `dampVec` and `dampQuat` accept) and `SeededRandom` (what `createRandom` returns).',
            'Tipos exportados: `EaseName` (a união dos nomes das curvas), `Lerpable` e `Slerpable` (o que `dampVec` e `dampQuat` aceitam) e `SeededRandom` (o que `createRandom` devolve).',
          ),
        },
      ],
    },
  ],
}

export default page
