import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropTable } from '@/components/docs/PropTable'
import { ApiSection } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'

const KEYBOARD = `// Check if key is held (polling — use in onUpdate)
if (app.input.isKeyDown('ArrowLeft')) {
  player.x -= speed * dt
}
if (app.input.isKeyDown(' ')) {
  player.jump()
}

// Key events (event-driven — use in onCreate)
app.input.on('keydown', ({ key, code }) => {
  if (code === 'Space') startGame()
})

app.input.on('keyup', ({ key }) => {
  console.log('released', key)
})`

const POINTER = `// Polling
const { isDown, x, y } = app.input.pointer
if (isDown) {
  bullet.x = x
  bullet.y = y
}

// Events
app.input.on('pointerdown', ({ x, y, pointerId }) => {
  spawnEffect(x, y)
})
app.input.on('pointermove', ({ x, y }) => { ... })
app.input.on('pointerup',   ({ x, y }) => { ... })`

const GAMEPAD = `import { GButton, GAxis } from 'easy-game-maker'

// In onUpdate — check button state
if (app.gamepad.isDown(GButton.A)) player.jump()
if (app.gamepad.isDown(GButton.B)) player.attack()

// Analog sticks
const lx = app.gamepad.axis(GAxis.LeftStickX)   // -1 to 1
const ly = app.gamepad.axis(GAxis.LeftStickY)
player.x += lx * speed * dt
player.y += ly * speed * dt

// Triggers
const trigger = app.gamepad.rightTrigger          // 0 to 1

// D-Pad
if (app.gamepad.isDown(GButton.DPadUp)) { ... }

// Connection events
app.gamepad.on('connected', (index) => console.log('Gamepad', index, 'connected'))
app.gamepad.on('disconnected', (index) => { ... })`

const GBUTTONS = [
  { name: 'GButton.A', type: 'number', description: 'Bottom face button (Xbox: A, PS: Cross)' },
  { name: 'GButton.B', type: 'number', description: 'Right face button (Xbox: B, PS: Circle)' },
  { name: 'GButton.X', type: 'number', description: 'Left face button (Xbox: X, PS: Square)' },
  { name: 'GButton.Y', type: 'number', description: 'Top face button (Xbox: Y, PS: Triangle)' },
  { name: 'GButton.LB / RB', type: 'number', description: 'Left / Right shoulder buttons' },
  { name: 'GButton.LT / RT', type: 'number', description: 'Left / Right trigger buttons (digital)' },
  { name: 'GButton.Select / Start', type: 'number', description: 'Menu buttons' },
  { name: 'GButton.DPadUp/Down/Left/Right', type: 'number', description: 'D-Pad directions' },
  { name: 'GAxis.LeftStickX/Y', type: 'number', description: 'Left analog stick axes (-1 to 1)' },
  { name: 'GAxis.RightStickX/Y', type: 'number', description: 'Right analog stick axes (-1 to 1)' },
]

export function InputPage() {
  const { lang } = useLang()

  return (
    <DocLayout>
      <PageHeader
        title="Input"
        badge="Input"
        description={
          lang === 'en'
            ? 'Keyboard, mouse, touch pointer, and gamepad input — polling and event-driven APIs.'
            : 'Input de teclado, mouse, ponteiro touch e gamepad — APIs de polling e event-driven.'
        }
      />

      <div className="space-y-10">
        <ApiSection title={lang === 'en' ? 'Keyboard' : 'Teclado'}>
          <CodeBlock code={KEYBOARD} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Pointer (mouse/touch)' : 'Ponteiro (mouse/touch)'}>
          <CodeBlock code={POINTER} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Gamepad' : 'Gamepad'}>
          <CodeBlock code={GAMEPAD} />
          <PropTable props={GBUTTONS} />
        </ApiSection>
      </div>
    </DocLayout>
  )
}
