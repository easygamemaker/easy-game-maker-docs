import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/animation/easing',
  title: t('Easing', 'Easing'),
  description: t(
    "Ready-made easing curves and the EasingFn type that shape how a tween accelerates and settles.",
    "Curvas de easing prontas e o tipo EasingFn que definem como um tween acelera e assenta.",
  ),
  source: 'src/engine/animation/Easing.ts',
  related: ['/animation/tween', '/animation/transitions', '/camera'],
  sections: [
    {
      id: 'overview',
      title: t('Curves as plain functions', 'Curvas como funções simples'),
      blocks: [
        {
          type: 'p',
          text: t(
            "An easing is a function `(t: number) => number` (the exported type `EasingFn`). It receives linear progress from 0 to 1 and returns eased progress. The `Easing` object collects the built-in curves, so you pass `Easing.outCubic` wherever an `EasingFn` is expected.",
            "Um easing é uma função `(t: number) => number` (o tipo exportado `EasingFn`). Ela recebe o progresso linear de 0 a 1 e devolve o progresso suavizado. O objeto `Easing` reúne as curvas prontas, então você passa `Easing.outCubic` onde um `EasingFn` é esperado.",
          ),
        },
        {
          type: 'p',
          text: t(
            "The naming is `in` (slow start), `out` (slow end) and `inOut` (both), followed by the family.",
            "A nomenclatura é `in` (começo lento), `out` (fim lento) e `inOut` (ambos), seguida da família.",
          ),
        },
      ],
    },
    {
      id: 'catalog',
      title: t('Built-in curves', 'Curvas embutidas'),
      blocks: [
        {
          type: 'table',
          head: [t('Family', 'Família'), t('Members', 'Membros'), t('Character', 'Caráter')],
          rows: [
            [t('linear', 'linear'), t('`linear`', '`linear`'), t('Constant speed.', 'Velocidade constante.')],
            [t('Quad, Cubic, Quart', 'Quad, Cubic, Quart'), t('`inQuad` `outQuad` `inOutQuad`, `inCubic` `outCubic` `inOutCubic`, `inQuart` `outQuart` `inOutQuart`', '`inQuad` `outQuad` `inOutQuad`, `inCubic` `outCubic` `inOutCubic`, `inQuart` `outQuart` `inOutQuart`'), t('Polynomial curves, increasingly sharp.', 'Curvas polinomiais, cada vez mais acentuadas.')],
            [t('Sine', 'Sine'), t('`inSine` `outSine` `inOutSine`', '`inSine` `outSine` `inOutSine`'), t('Gentle, sinusoidal.', 'Suave, senoidal.')],
            [t('Expo', 'Expo'), t('`inExpo` `outExpo`', '`inExpo` `outExpo`'), t('Exponential. No `inOutExpo`.', 'Exponencial. Não existe `inOutExpo`.')],
            [t('Back', 'Back'), t('`inBack` `outBack` `inOutBack`', '`inBack` `outBack` `inOutBack`'), t('Overshoots the target slightly.', 'Ultrapassa levemente o alvo.')],
            [t('Bounce', 'Bounce'), t('`inBounce` `outBounce` `inOutBounce`', '`inBounce` `outBounce` `inOutBounce`'), t('Bounces like a dropped ball.', 'Quica como uma bola largada.')],
            [t('Elastic', 'Elastic'), t('`inElastic` `outElastic`', '`inElastic` `outElastic`'), t('Springy oscillation. No `inOutElastic`.', 'Oscilação de mola. Não existe `inOutElastic`.')],
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            "`Back` and `Elastic` leave the 0..1 range on purpose, so animated values can briefly go past the target or before the start.",
            "`Back` e `Elastic` saem da faixa 0..1 de propósito, então os valores animados podem passar do alvo ou ficar antes do início por um instante.",
          ),
        },
      ],
    },
    {
      id: 'custom',
      title: t('Writing your own', 'Escrevendo a sua'),
      blocks: [
        {
          type: 'p',
          text: t(
            "Any function with the `EasingFn` signature works. It should return 0 at 0 and 1 at 1 so the animation starts and ends exactly on the given values.",
            "Qualquer função com a assinatura `EasingFn` serve. Ela deve devolver 0 em 0 e 1 em 1, para a animação começar e terminar exatamente nos valores dados.",
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          filename: 'easing-demo.ts',
          code: `import { Easing, Tween, type EasingFn } from 'easy-game-maker';

// Custom curve: fast start, hard stop
const outQuint: EasingFn = (t) => 1 - Math.pow(1 - t, 5);

const ball = { y: 0, scale: 1 };

const drop = new Tween(ball, { y: 300 }, 800, Easing.outBounce);
const pop = new Tween(ball, { scale: 1.5 }, 300, outQuint);

// Evaluate a curve directly
console.log(Easing.inOutQuad(0.5)); // 0.5

// Drive both by hand (16 ms per step)
for (let i = 0; i < 60; i++) {
  drop.update(16);
  pop.update(16);
}
`,
        },
      ],
    },
  ],
}

export default page
