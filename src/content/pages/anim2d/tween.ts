import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/animation/tween',
  title: t('Tween', 'Tween'),
  description: t(
    "A Tween interpolates numeric properties of any object from their current values to target values over a duration, one manual update at a time.",
    "Um Tween interpola propriedades numéricas de qualquer objeto, dos valores atuais até os valores finais, ao longo de uma duração, avançando a cada update manual.",
  ),
  source: 'src/engine/animation/Tween.ts',
  related: ['/animation/easing', '/animation/transitions', '/camera'],
  sections: [
    {
      id: 'overview',
      title: t('What a Tween does', 'O que um Tween faz'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`Tween` is the smallest animation primitive in the engine. At construction it reads the current value of every key you want to animate (a missing property counts as 0), and each `update` moves those values along the easing curve until they reach the targets.",
            "`Tween` é a menor peça de animação da engine. Na construção ele lê o valor atual de cada chave que você quer animar (propriedade ausente conta como 0), e cada `update` move esses valores pela curva de easing até chegarem ao destino.",
          ),
        },
        {
          type: 'p',
          text: t(
            "A Tween does not schedule itself. Nothing in the engine calls its `update` for you, so you either drive it from `Scene.onUpdate` or hand the work to [TransitionManager](/animation/transitions), which owns and updates tweens for you.",
            "Um Tween não se agenda sozinho. Nada na engine chama o `update` dele por você: ou você o avança em `Scene.onUpdate`, ou entrega o trabalho ao [TransitionManager](/animation/transitions), que guarda e atualiza os tweens.",
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('Constructor and members', 'Construtor e membros'),
      blocks: [
        {
          type: 'props',
          title: t('Constructor arguments, in order', 'Argumentos do construtor, em ordem'),
          rows: [
            { name: 'target', type: 'Record<string, number>', required: true, description: t("The object whose numeric properties are animated.", "O objeto cujas propriedades numéricas são animadas.") },
            { name: 'endValues', type: 'Record<string, number>', required: true, description: t("Final value per property. Only these keys are touched.", "Valor final de cada propriedade. Só essas chaves são alteradas.") },
            { name: 'duration', type: 'number', required: true, description: t("Duration in **milliseconds**.", "Duração em **milissegundos**.") },
            { name: 'easingFn', type: 'EasingFn', required: true, description: t("Curve mapping progress 0..1 to eased progress. See [Easing](/animation/easing).", "Curva que mapeia o progresso 0..1 para o progresso suavizado. Veja [Easing](/animation/easing).") },
            { name: 'onComplete', type: '() => void', description: t("Called once, in the update that reaches the end.", "Chamado uma vez, no update que chega ao fim.") },
          ],
        },
        {
          type: 'props',
          title: t('Members', 'Membros'),
          rows: [
            { name: 'isDone', type: 'boolean', readonly: true, description: t("True after completion or after `cancel()`.", "Verdadeiro depois de concluir ou de `cancel()`.") },
            { name: 'update(dtMs)', type: '(dtMs: number) => void', description: t("Advance by `dtMs` milliseconds. Does nothing once done or cancelled.", "Avança `dtMs` milissegundos. Não faz nada depois de concluído ou cancelado.") },
            { name: 'updateSeconds(dtSeconds)', type: '(dtSeconds: number) => void', description: t("Advance by `dtSeconds` **seconds**, the unit of `Scene.onUpdate(dt)`. Equivalent to `update(dtSeconds * 1000)`; `duration` is still in milliseconds.", "Avança `dtSeconds` **segundos**, a unidade de `Scene.onUpdate(dt)`. Equivale a `update(dtSeconds * 1000)`; a `duration` continua em milissegundos.") },
            { name: 'cancel()', type: '() => void', description: t("Stops the tween where it is. `onComplete` is not called and values are left as they were.", "Para o tween onde está. `onComplete` não é chamado e os valores ficam como estavam.") },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Units differ from the scene loop', 'Unidades diferentes do laço da cena'),
          text: t(
            "`Tween.update` takes **milliseconds**, but `Scene.onUpdate(dt)` gives you **seconds**. Passing that `dt` straight to `update` moves the tween 1000 times too slowly: call `updateSeconds(dt)` instead, or multiply by 1000 yourself. `TransitionManager.update` and `Camera.update` take seconds and convert internally.",
            "`Tween.update` recebe **milissegundos**, mas `Scene.onUpdate(dt)` entrega **segundos**. Passar esse `dt` direto ao `update` move o tween 1000 vezes devagar demais: chame `updateSeconds(dt)`, ou multiplique por 1000 você mesmo. `TransitionManager.update` e `Camera.update` recebem segundos e convertem por dentro.",
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Edge cases', 'Casos de borda'),
          text: t(
            "Start values are captured once, at construction. A `duration` of 0 divides by zero on the first update, so use a positive duration.",
            "Os valores iniciais são capturados uma única vez, na construção. Uma `duration` igual a 0 gera divisão por zero no primeiro update, então use uma duração positiva.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: sliding a rectangle', 'Exemplo: deslizando um retângulo'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          filename: 'tween-demo.ts',
          code: `import { App, Scene, RectShape, Tween, Easing } from 'easy-game-maker';

class TweenScene extends Scene {
  private box = new RectShape({ x: 40, y: 180, width: 60, height: 60, fill: '#4ade80' });
  private slide?: Tween;

  override onCreate(): void {
    this.add(this.box);
    this.slide = new Tween(
      this.box as unknown as Record<string, number>,
      { x: 560, y: 120 },
      1200, // milliseconds
      Easing.outCubic,
      () => console.log('arrived'),
    );
  }

  override onUpdate(dt: number): void {
    // dt is in seconds, Tween wants milliseconds
    this.slide?.update(dt * 1000);
  }
}

const app = new App({ width: 640, height: 360, backgroundColor: '#111827' });
app.init();
app.scenes.add('tween', TweenScene);
void app.scenes.go('tween');
app.run();
`,
        },
        {
          type: 'p',
          text: t(
            "The cast to `Record<string, number>` is needed because a display object is not typed as an index signature. Only `x` and `y` are read and written.",
            "O cast para `Record<string, number>` é necessário porque um objeto de exibição não é tipado como assinatura de índice. Só `x` e `y` são lidos e escritos.",
          ),
        },
      ],
    },
  ],
}

export default page
