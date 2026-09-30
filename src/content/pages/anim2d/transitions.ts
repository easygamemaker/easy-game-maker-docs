import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/animation/transitions',
  title: t('TransitionManager', 'TransitionManager'),
  description: t(
    "app.transitions runs tweens for you: animate any numeric properties with one call, chain steps in sequence, and cancel everything at once.",
    "app.transitions executa tweens por você: anime propriedades numéricas com uma chamada, encadeie passos em sequência e cancele tudo de uma vez.",
  ),
  source: 'src/engine/animation/TransitionManager.ts',
  related: ['/animation/tween', '/animation/easing', '/camera'],
  sections: [
    {
      id: 'overview',
      title: t('The App-owned tween runner', 'O executor de tweens da App'),
      blocks: [
        {
          type: 'p',
          text: t(
            "Every `App` has a `transitions` instance (`app.transitions`). The game loop calls `transitions.update(dt)` each frame with `dt` in seconds, so tweens created through it advance without any code in your scene. `app.destroy()` calls `cancelAll()`.",
            "Toda `App` tem uma instância `transitions` (`app.transitions`). O laço do jogo chama `transitions.update(dt)` a cada quadro com `dt` em segundos, então os tweens criados por ela avançam sem código na sua cena. `app.destroy()` chama `cancelAll()`.",
          ),
        },
      ],
    },
    {
      id: 'to',
      title: t('to(target, options)', 'to(target, options)'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`to` creates a [Tween](/animation/tween), registers it and returns it. Every numeric option other than the reserved ones below is treated as a target value for the property of the same name. Non-numeric extras are ignored.",
            "`to` cria um [Tween](/animation/tween), registra e devolve. Toda opção numérica além das reservadas abaixo é tratada como valor final da propriedade de mesmo nome. Extras não numéricos são ignorados.",
          ),
        },
        {
          type: 'props',
          title: t('TransitionOptions', 'TransitionOptions'),
          rows: [
            { name: 'duration', type: 'number', required: true, description: t("Milliseconds.", "Milissegundos.") },
            { name: 'easing', type: 'EasingFn', default: 'Easing.linear', description: t("Curve, see [Easing](/animation/easing).", "Curva, veja [Easing](/animation/easing).") },
            { name: 'onStart', type: '() => void', description: t("Called immediately when `to` runs, not when the tween first advances.", "Chamado imediatamente quando `to` executa, não quando o tween avança pela primeira vez.") },
            { name: 'onComplete', type: '() => void', description: t("Called when the tween finishes.", "Chamado quando o tween termina.") },
            { name: '[property]', type: 'number', description: t("Any other numeric key is a target value, for example `x: 300` or `alpha: 0`.", "Qualquer outra chave numérica é um valor final, por exemplo `x: 300` ou `alpha: 0`.") },
          ],
        },
      ],
    },
    {
      id: 'sequence',
      title: t('Sequences and cancelling', 'Sequências e cancelamento'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`sequence(steps)` takes an array of `{ target, ...TransitionOptions }` and runs them one after another: each step starts when the previous one completes, right after its `onComplete` runs. It returns nothing, so you cannot cancel a single sequence handle. `cancelAll()` cancels every running tween and clears the list.",
            "`sequence(steps)` recebe um array de `{ target, ...TransitionOptions }` e executa um após o outro: cada passo começa quando o anterior termina, depois do `onComplete` desse passo. Não devolve nada, então não há um handle para cancelar só uma sequência. `cancelAll()` cancela todos os tweens ativos e limpa a lista.",
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Cancelled tweens do not chain', 'Tweens cancelados não encadeiam'),
          text: t(
            "A cancelled tween never calls `onComplete`, so the rest of a running `sequence` stops silently after `cancelAll()`.",
            "Um tween cancelado nunca chama `onComplete`, então o resto de uma `sequence` em andamento para em silêncio depois de `cancelAll()`.",
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
          check: 'compile',
          filename: 'transitions-demo.ts',
          code: `import { App, Scene, RectShape, Easing } from 'easy-game-maker';

class TransitionScene extends Scene {
  private readonly app: App;
  private box = new RectShape({ x: 60, y: 180, width: 50, height: 50, fill: '#38bdf8' });

  constructor(app: App) {
    super();
    this.app = app;
  }

  override onCreate(): void {
    this.add(this.box);
    const target = this.box as unknown as Record<string, number>;

    // One tween, updated by the app loop
    this.app.transitions.to(target, {
      x: 500,
      duration: 900,
      easing: Easing.inOutQuad,
    });

    // Steps one after another
    this.app.transitions.sequence([
      { target, y: 60, duration: 400, easing: Easing.outBack },
      { target, alpha: 0.3, duration: 300 },
      { target, alpha: 1, y: 300, duration: 500, onComplete: () => console.log('done') },
    ]);
  }
}

const app = new App({ width: 640, height: 360 });
app.init();
app.scenes.add('transitions', class extends TransitionScene {
  constructor() {
    super(app);
  }
});
void app.scenes.go('transitions');
app.run();
`,
        },
        {
          type: 'p',
          text: t(
            "The `to` call animates only `x` while the sequence animates `y` and `alpha`, so they do not fight over a property. Two tweens writing the same property at once would: the later write wins each frame.",
            "O `to` anima só `x` enquanto a sequência anima `y` e `alpha`, então não disputam a mesma propriedade. Dois tweens escrevendo a mesma propriedade ao mesmo tempo disputariam: a escrita mais recente vence a cada quadro.",
          ),
        },
      ],
    },
  ],
}

export default page
