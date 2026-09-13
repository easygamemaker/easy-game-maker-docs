import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropTable } from '@/components/docs/PropTable'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'
import type { PropDef } from '@/components/docs/PropTable'

const BASE_PROPS: PropDef[] = [
  { name: 'x', type: 'number', default: '0', description: 'Horizontal position in parent space' },
  { name: 'y', type: 'number', default: '0', description: 'Vertical position in parent space' },
  { name: 'width', type: 'number', default: '0', description: 'Width in pixels' },
  { name: 'height', type: 'number', default: '0', description: 'Height in pixels' },
  { name: 'scaleX', type: 'number', default: '1', description: 'Horizontal scale factor' },
  { name: 'scaleY', type: 'number', default: '1', description: 'Vertical scale factor' },
  { name: 'rotation', type: 'number', default: '0', description: 'Rotation in radians' },
  { name: 'alpha', type: 'number', default: '1', description: 'Opacity 0 (transparent) to 1 (opaque)' },
  { name: 'visible', type: 'boolean', default: 'true', description: 'Whether the object is rendered' },
  { name: 'anchorX', type: 'number', default: '0.5', description: 'Horizontal pivot point 0=left, 0.5=center, 1=right' },
  { name: 'anchorY', type: 'number', default: '0.5', description: 'Vertical pivot point 0=top, 0.5=center, 1=bottom' },
  { name: 'zIndex', type: 'number', default: '0', description: 'Draw order within parent — higher values render on top' },
  { name: 'name', type: 'string', default: '""', description: 'Identifier for use with scene.getById()' },
]

const SHAPES_CODE = `import { RectShape, CircleShape, LineShape, PolygonShape } from 'easy-game-maker'

// Rectangle
const rect = new RectShape({ width: 100, height: 60, fill: '#6c63ff' })
rect.cornerRadius = 8  // rounded corners

// Circle
const circle = new CircleShape({ radius: 30, fill: '#34d399' })
circle.strokeColor = [1, 1, 1, 0.4]
circle.strokeWidth = 2

// Line
const line = new LineShape({ x1: 0, y1: 0, x2: 200, y2: 100, stroke: '#fbbf24', strokeWidth: 2 })

// Convex polygon (vertices relative to anchor)
const star = new PolygonShape({
  points: [[0,-50],[14,-20],[47,-15],[25,10],[30,44],[0,28],[-30,44],[-25,10],[-47,-15],[-14,-20]],
  fill: '#fbbf24',
})`

const SPRITE_CODE = `import { Sprite, AnimatedSprite } from 'easy-game-maker'

// Load a texture directly, then create a sprite.
const hero = await Sprite.fromUrl('assets/hero.png', app, { x: 400, y: 300 })

// AnimatedSprite receives an array of already-loaded Texture objects.
const frames = await Promise.all([
  app.assets.loadImageFromUrl('assets/run-0.png'),
  app.assets.loadImageFromUrl('assets/run-1.png'),
])
const run = new AnimatedSprite({ frames, fps: 12, x: 200, y: 300 })
run.play()
// run.stop()
// run.gotoAndStop(0)`

const TEXT_CODE = `import { Text } from 'easy-game-maker'

const label = new Text({
  text: 'Score: 0',
  fontSize: 24,
  fill: '#f0f0f8',
  fontFamily: 'Inter',
  align: 'center',
})
label.x = 400
label.y = 30

// Update text
label.text = \`Score: \${score}\``

const PARTICLES_CODE = `import { ParticleEmitter } from 'easy-game-maker'

const emitter = new ParticleEmitter({
  rate: 20,            // particles per second
  lifetime: 1.2,       // seconds
  speed: [80, 160],    // min/max px/s
  angle: [-0.3, 0.3],  // spread in radians
  scale: [0.5, 1.5],
  alpha: [1, 0],       // fade out
  tint: '#ff6b6b',
})
emitter.x = player.x
emitter.y = player.y
this.add(emitter)

// Burst mode
emitter.burst(30)      // emit 30 particles immediately

// Stop new emissions (existing particles finish naturally)
emitter.stop()`

export function DisplayPage() {
  const { lang } = useLang()

  return (
    <DocLayout>
      <PageHeader
        title="Display Objects"
        badge="Display"
        description={
          lang === 'en'
            ? 'All visible game objects extend DisplayObject. Shapes, sprites, text, and particles share the same base transform API.'
            : 'Todos os objetos visíveis do jogo estendem DisplayObject. Formas, sprites, texto e partículas compartilham a mesma API de transform base.'
        }
      />

      <div className="space-y-10">
        <ApiSection title={lang === 'en' ? 'Base properties (all display objects)' : 'Propriedades base (todos os objetos)'}>
          <PropTable props={BASE_PROPS} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Shapes' : 'Formas'}>
          <CodeBlock code={SHAPES_CODE} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {[
              { name: 'RectShape', color: '#6c63ff', desc_en: 'Rectangle with optional rounded corners', desc_pt: 'Retângulo com cantos opcionalmente arredondados' },
              { name: 'CircleShape', color: '#34d399', desc_en: 'Circle or ellipse', desc_pt: 'Círculo ou elipse' },
              { name: 'LineShape', color: '#fbbf24', desc_en: 'Line segment between two points', desc_pt: 'Segmento de linha entre dois pontos' },
              { name: 'PolygonShape', color: '#f87171', desc_en: 'Arbitrary convex polygon', desc_pt: 'Polígono convexo arbitrário' },
            ].map(s => (
              <div key={s.name} className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-3">
                <div className="w-8 h-8 rounded-lg mb-2" style={{ background: `${s.color}22`, border: `1px solid ${s.color}44` }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-4 h-4 rounded-sm" style={{ background: s.color }} />
                  </div>
                </div>
                <p className="text-[#f0f0f8] text-xs font-semibold">{s.name}</p>
                <p className="text-[#55556a] text-xs mt-0.5">{lang === 'en' ? s.desc_en : s.desc_pt}</p>
              </div>
            ))}
          </div>
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Sprites & AnimatedSprite' : 'Sprites & AnimatedSprite'}>
          <CodeBlock code={SPRITE_CODE} />
        </ApiSection>

        <ApiSection title="Text">
          <CodeBlock code={TEXT_CODE} />
        </ApiSection>

        <ApiSection title="ParticleEmitter">
          <CodeBlock code={PARTICLES_CODE} />
          <Callout type="tip">
            {lang === 'en'
              ? 'ParticleEmitter inherits from DisplayObject so it can be positioned, rotated, and added to any Group. Attach it to a moving character to have particles follow them.'
              : 'ParticleEmitter herda de DisplayObject, podendo ser posicionado, rotacionado e adicionado a qualquer Group. Anexe-o a um personagem em movimento para que as partículas o sigam.'}
          </Callout>
        </ApiSection>
      </div>
    </DocLayout>
  )
}
