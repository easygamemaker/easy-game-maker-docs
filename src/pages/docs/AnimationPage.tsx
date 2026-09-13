import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'

const TWEEN = `import { Tween, Easing } from 'easy-game-maker'

// Tween any numeric properties on any object
const tween = new Tween(
  sprite as unknown as Record<string, number>,
  { x: 400, y: 200, alpha: 0 },  // target values
  800,                              // duration in ms
  Easing.outCubic,                 // easing function
  () => console.log('done'),        // optional onComplete
)

// Update manually in onUpdate
override onUpdate(dt: number) {
  tween.update(dt * 1000)
  if (tween.isDone) this.remove(sprite)
}`

const TRANSITION = `// TransitionManager animates values through app.transitions.
app.transitions.to(sprite as unknown as Record<string, number>, {
  alpha: 0,
  duration: 500,
  easing: Easing.outCubic,
  onComplete: () => this.remove(sprite),
})

// Transition multiple properties at once.
app.transitions.to(panel as unknown as Record<string, number>, {
  x: 0,
  alpha: 1,
  duration: 300,
  easing: Easing.outBack,
})

// Cancel all running transitions.
app.transitions.cancelAll()`

const EASINGS = `// Available easing functions
Easing.linear
Easing.inQuad    Easing.outQuad    Easing.inOutQuad
Easing.inCubic   Easing.outCubic   Easing.inOutCubic
Easing.inQuart   Easing.outQuart   Easing.inOutQuart
Easing.inSine    Easing.outSine    Easing.inOutSine
Easing.inExpo    Easing.outExpo
Easing.inBack    Easing.outBack    Easing.inOutBack
Easing.inBounce  Easing.outBounce  Easing.inOutBounce
Easing.inElastic Easing.outElastic

// Custom easing function
const myEase: EasingFn = (t) => t * t * (3 - 2 * t) // smoothstep`

export function AnimationPage() {
  const { lang } = useLang()
  return (
    <DocLayout>
      <PageHeader
        title="Animation"
        badge={lang === 'en' ? 'Animation' : 'Animação'}
        description={lang === 'en'
          ? 'Tween any numeric property on any object. 20+ built-in easing functions.'
          : 'Faça tween de qualquer propriedade numérica em qualquer objeto. 20+ funções de easing nativas.'}
      />
      <div className="space-y-10">
        <ApiSection title="Tween"><CodeBlock code={TWEEN} /></ApiSection>
        <ApiSection title="TransitionManager">
          <CodeBlock code={TRANSITION} />
          <Callout type="info">{lang === 'en' ? 'TransitionManager is accessed via app.transitions. It automatically updates each frame.' : 'TransitionManager é acessado via app.transitions. Ele atualiza automaticamente a cada frame.'}</Callout>
        </ApiSection>
        <ApiSection title={lang === 'en' ? 'Easing functions' : 'Funções de easing'}><CodeBlock code={EASINGS} /></ApiSection>
      </div>
    </DocLayout>
  )
}
