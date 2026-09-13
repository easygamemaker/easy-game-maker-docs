import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropTable } from '@/components/docs/PropTable'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'

const SETUP = `const app = new App({ width: 800, height: 600, physics: true, pixelsPerMeter: 50 })
app.init()`

const BODY = `import { PhysicsBody } from 'easy-game-maker'

// Add a dynamic (falling) box
const body = app.physics.addBody(player, {
  type: 'dynamic',
  shape: 'rect',
  density: 1,
  friction: 0.3,
  restitution: 0.2,   // bounciness 0–1
})

// Add a static floor
const floor = app.physics.addBody(floorRect, {
  type: 'static',
  shape: 'rect',
})

// Remove when no longer needed
app.physics.removeBody(body)`

const IMPULSE = `// Apply forces
body.applyForce(0, -200)         // push up
body.applyImpulse(50, 0)         // instant rightward push
body.setVelocity(0, -5)
body.setPosition(100, 200)

// Read state
const velocity = body.getVelocity() // { x, y }
body.linearDamping = 0.2
body.fixedRotation = true`

const CONTACT = `app.physics.on('beginContact', ({ displayA, displayB }) => {
  if (displayA.name === 'bullet' || displayB.name === 'bullet') {
    // handle hit
  }
})

app.physics.on('endContact', ({ displayA, displayB }) => {
  // objects separated
})`

const DEBUG = `// In Scene.onCreate:
this._debugGroup = new Group()
this._debugGroup.zIndex = 999
this.add(this._debugGroup)

// In Scene.onUpdate(dt):
app.physics.debugDraw(this._debugGroup)`

export function PhysicsPage() {
  const { lang } = useLang()

  return (
    <DocLayout>
      <PageHeader
        title="Physics"
        badge={lang === 'en' ? 'Physics' : 'Física'}
        description={
          lang === 'en'
            ? 'Box2D-compatible 2D physics via planck.js. Rigid bodies, joints, sensors, and debug visualization.'
            : 'Física 2D compatível com Box2D via planck.js. Corpos rígidos, juntas, sensores e visualização de debug.'
        }
      />

      <div className="space-y-10">
        <ApiSection title={lang === 'en' ? 'Enable physics' : 'Habilitar física'}>
          <CodeBlock code={SETUP} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Adding bodies' : 'Adicionando corpos'}>
          <CodeBlock code={BODY} />
          <PropTable props={[
            { name: 'type', type: "'dynamic' | 'static' | 'kinematic'", required: true, description: lang === 'en' ? 'dynamic = affected by forces, static = immovable, kinematic = moved by code only' : 'dynamic = afetado por forças, static = imóvel, kinematic = movido apenas por código' },
            { name: 'shape', type: "'rect' | 'circle' | 'polygon'", required: true, description: lang === 'en' ? 'Collision shape — auto-sized from the DisplayObject dimensions' : 'Forma de colisão — dimensionada automaticamente pelo DisplayObject' },
            { name: 'density', type: 'number', default: '1', description: lang === 'en' ? 'Mass per unit area' : 'Massa por unidade de área' },
            { name: 'friction', type: 'number', default: '0.3', description: lang === 'en' ? 'Surface friction coefficient 0–1' : 'Coeficiente de atrito superficial 0–1' },
            { name: 'restitution', type: 'number', default: '0', description: lang === 'en' ? 'Bounciness 0 (no bounce) to 1 (perfect bounce)' : 'Elasticidade 0 (sem quique) a 1 (quique perfeito)' },
            { name: 'isSensor', type: 'boolean', default: 'false', description: lang === 'en' ? 'Trigger zone — detects overlaps but does not block movement' : 'Zona de gatilho — detecta sobreposições sem bloquear movimento' },
            { name: 'vertices', type: '[{x,y}]', description: lang === 'en' ? 'Custom polygon vertices when shape = "polygon"' : 'Vértices personalizados quando shape = "polygon"' },
          ]} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Forces & velocity' : 'Forças & velocidade'}>
          <CodeBlock code={IMPULSE} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Collision events' : 'Eventos de colisão'}>
          <CodeBlock code={CONTACT} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Debug draw' : 'Debug draw'}>
          <CodeBlock code={DEBUG} />
          <div className="rounded-xl overflow-hidden border border-[#1e1e2a] mt-3">
            <img src="/images/physics.webp" alt="Physics debug" className="w-full object-cover opacity-80"
              onError={e => { (e.target as HTMLImageElement).style.display='none' }} />
          </div>
          <Callout type="tip">
            {lang === 'en'
              ? 'Color convention: Green = dynamic, Gray = static, Cyan = kinematic, Yellow = sensor.'
              : 'Convenção de cores: Verde = dinâmico, Cinza = estático, Ciano = cinemático, Amarelo = sensor.'}
          </Callout>
        </ApiSection>
      </div>
    </DocLayout>
  )
}
