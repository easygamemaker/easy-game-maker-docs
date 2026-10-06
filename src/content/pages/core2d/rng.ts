import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/rng',
  title: t('Rng', 'Rng'),
  description: t(
    'A seedable, deterministic random number generator (mulberry32) with a stable sequence per seed, independent streams through fork, and a state you can save and restore.',
    'Um gerador de números aleatórios com semente e determinístico (mulberry32), com sequência estável por semente, fluxos independentes por fork e um estado que você pode salvar e restaurar.',
  ),
  badge: 'NEW',
  source: 'src/engine/core/Rng.ts',
  related: ['/core/fixed-step', '/display/particles', '/gameplay/object-pool'],
  sections: [
    {
      id: 'overview',
      title: t('Why not Math.random', 'Por que não Math.random'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`Math.random()` cannot be seeded, so a run can never be repeated. `Rng` is a small generator you create with a seed: the same seed always produces the same numbers. That is what replays, golden tests, lockstep multiplayer and a seeded enemy AI need.",
            "O `Math.random()` não aceita semente, então uma partida nunca pode ser repetida. O `Rng` é um gerador pequeno que você cria com uma semente: a mesma semente sempre produz os mesmos números. É disso que replays, testes de referência, multiplayer em lockstep e uma IA de inimigos com semente precisam.",
          ),
        },
        {
          type: 'p',
          text: t(
            "The algorithm is **mulberry32**: a 32 bit state that advances by a constant on every draw, followed by an integer mixing step. It is small, fast and good enough for games. It is **not** cryptographically secure, so never use it for tokens or anything secret.",
            "O algoritmo é o **mulberry32**: um estado de 32 bits que avança por uma constante a cada sorteio, seguido de uma etapa de mistura de inteiros. É pequeno, rápido e bom o bastante para jogos. Ele **não** é seguro do ponto de vista criptográfico, então nunca o use para tokens ou qualquer coisa secreta.",
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Stability contract', 'Contrato de estabilidade'),
          text: t(
            "For a given seed, the sequence of `next()` values is part of the public API and will not change in a minor release. The helpers (`int`, `range`, `chance`, `pick`, `shuffle`, `fork`) are also stable, and each one documents how many draws it consumes (below). A saved replay or a golden test keeps working across minor releases.",
            "Para uma dada semente, a sequência de valores de `next()` faz parte da API (Application Programming Interface) pública e não muda em uma versão menor. Os auxiliares (`int`, `range`, `chance`, `pick`, `shuffle`, `fork`) também são estáveis, e cada um documenta quantos sorteios consome (abaixo). Um replay salvo ou um teste de referência continua valendo entre versões menores do SDK (Software Development Kit).",
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('It mutates itself', 'Ele muda a si mesmo'),
          text: t(
            "Every draw changes the generator state in place (a hot path, on purpose). If you need to keep a point in the sequence, take `state()` or `clone()` before drawing. If your own simulation is written with immutable values, keep the `Rng` outside it or store the `state()` number in your state and rebuild with `Rng.fromState`.",
            "Cada sorteio altera o estado do gerador no lugar (caminho quente, de propósito). Se você precisa guardar um ponto da sequência, use `state()` ou `clone()` antes de sortear. Se a sua simulação é escrita com valores imutáveis, mantenha o `Rng` fora dela, ou guarde o número de `state()` no seu estado e reconstrua com `Rng.fromState`.",
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('API', 'API'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'new Rng(seed?)', type: 'Rng', description: t('Any finite number. It is truncated to an integer and wrapped to an unsigned 32 bit value, so `1`, `1.9` and `2 ** 32 + 1` are the same seed. `NaN` and infinities become seed 0. Default 0.', 'Qualquer número finito. É truncado para inteiro e reduzido a um valor de 32 bits sem sinal, então `1`, `1.9` e `2 ** 32 + 1` são a mesma semente. `NaN` e infinitos viram a semente 0. Padrão 0.') },
            { name: 'next()', type: 'number', description: t('A float in [0, 1). One draw.', 'Um número decimal em [0, 1). Um sorteio.') },
            { name: 'int(n)', type: 'number', description: t('An integer in [0, n). `n` is floored and must be at least 1 and finite, otherwise `RangeError`. One draw.', 'Um inteiro em [0, n). O `n` é arredondado para baixo e precisa ser no mínimo 1 e finito, senão `RangeError`. Um sorteio.') },
            { name: 'range(a, b)', type: 'number', description: t('A float in [a, b). `a` and `b` may come in either order. One draw.', 'Um decimal em [a, b). O `a` e o `b` podem vir em qualquer ordem. Um sorteio.') },
            { name: 'chance(p)', type: 'boolean', description: t('True with probability `p`. One draw, even for 0 and 1, so the sequence stays aligned.', 'True com probabilidade `p`. Um sorteio, mesmo para 0 e 1, para a sequência continuar alinhada.') },
            { name: 'pick(items)', type: 'T', description: t('A uniformly chosen element. Throws `RangeError` on an empty array. One draw.', 'Um elemento escolhido de modo uniforme. Lança `RangeError` em array vazio. Um sorteio.') },
            { name: 'shuffle(items)', type: 'T[]', description: t('A new array in random order (Fisher-Yates, from the last index down). The input is not modified. Consumes `length - 1` draws.', 'Um array novo em ordem aleatória (Fisher-Yates, do último índice para baixo). A entrada não é modificada. Consome `length - 1` sorteios.') },
            { name: 'state()', type: 'number', description: t('The current 32 bit state as an unsigned integer.', 'O estado atual de 32 bits como inteiro sem sinal.') },
            { name: 'Rng.fromState(state)', type: 'Rng', description: t('Rebuilds a generator that continues exactly where `state()` was taken.', 'Reconstrói um gerador que continua exatamente de onde o `state()` foi tirado.') },
            { name: 'clone()', type: 'Rng', description: t('An independent generator at the same point of the sequence.', 'Um gerador independente no mesmo ponto da sequência.') },
            { name: 'fork(label)', type: 'Rng', description: t('Derives an independent stream from a string label. The label is hashed (FNV-1a, 32 bit) and mixed with the current state. The parent is **not** advanced.', 'Deriva um fluxo independente a partir de um rótulo em texto. O rótulo passa por um hash (FNV-1a, 32 bits) e é misturado ao estado atual. O pai **não** avança.') },
          ],
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Use fork so visuals never shift the game', 'Use fork para que o visual nunca desloque o jogo'),
          text: t(
            "Particles, screen shake and other visual randomness must not consume draws from the simulation stream, or adding one effect would change every later result of the match. `const fx = sim.fork('fx')` gives the visuals their own stream and leaves the simulation sequence exactly as it was. The same state and label always give the same child.",
            "Partículas, tremor de tela e outra aleatoriedade visual não podem consumir sorteios do fluxo da simulação, ou adicionar um efeito mudaria todos os resultados seguintes da partida. `const fx = sim.fork('fx')` dá ao visual um fluxo próprio e deixa a sequência da simulação exatamente como estava. O mesmo estado e o mesmo rótulo sempre dão o mesmo filho.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example', 'Exemplo'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'rng-demo.ts',
          check: 'compile',
          code: `import { ParticleEmitter, Rng } from 'easy-game-maker'

const sim = new Rng(1234)

const damage = sim.int(10) + 5 // 5..14
if (sim.chance(0.25)) console.log('critical hit')
const deck = sim.shuffle(['a', 'b', 'c']) // a copy, the input is untouched
const loot = sim.pick(['sword', 'shield', 'potion'])

// Visual effects get their own stream: the simulation sequence does not shift
const fx = sim.fork('fx')
const sparks = new ParticleEmitter({ rng: fx, emitRate: 60 })

// Save a point of the sequence and continue from it later (a replay, a rollback)
const saved = sim.state()
const again = Rng.fromState(saved)
console.log(damage, deck, loot, sparks.x, again.next() === sim.next())`,
        },
        {
          type: 'p',
          text: t(
            "A seed always gives the same stream. With `new Rng(1234)` the first three `next()` values are 0.0733, 0.7034 and 0.9029 (rounded), on every machine.",
            "Uma semente sempre dá o mesmo fluxo. Com `new Rng(1234)` os três primeiros valores de `next()` são 0,0733, 0,7034 e 0,9029 (arredondados), em qualquer máquina.",
          ),
        },
      ],
    },
  ],
}

export default page
