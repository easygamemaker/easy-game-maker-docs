import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropTable } from '@/components/docs/PropTable'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'

const SETUP = `import { Scene, Camera, Group, Sprite } from 'easy-game-maker'

export class PlatformerScene extends Scene {
  private _camera!: Camera
  private _world!: Group
  private _hud!: Group
  private _player!: Sprite

  override onCreate() {
    this._world = new Group()
    this._hud = new Group()
    this.add(this._world)
    this.add(this._hud)

    this._player = new Sprite({ x: 400, y: 300 })
    this._world.add(this._player)

    this._camera = new Camera(800, 600)
    this._camera
      .setWorld(this._world)
      .setOverlay(this._hud)
      .follow(this._player, { lerp: 0.08, offsetY: -40 })
      .setBounds(0, 0, 5000, 800)
  }

  override onUpdate(dt: number) {
    this._camera.update(dt)
  }
}`

const EFFECTS = `// Screen shake on hit
camera.shake(12, 0.3)

// Flash on pickup
await camera.flash(0.2, '#ffffff')

// Red flash on damage
await camera.flash(0.3, '#ff0000')

// Fade out then in (scene transition)
await camera.fadeOut(0.5)
app.scenes.go('next-level')
await camera.fadeIn(0.5)`

const PAN_ZOOM = `// Pan to a world position over 1.5 seconds
camera.unfollow()
await camera.pan(500, 200, 1.5, Easing.outCubic)
camera.follow(player)

// Smooth zoom in
await camera.zoomTo(2.0, 0.5)
// Zoom back out
await camera.zoomTo(1.0, 0.8)`

const DEAD_ZONE = `camera.follow(player, {
  lerp: 0.1,
  offsetX: 0,
  offsetY: -30,
  deadZoneX: 60,  // camera only moves if player leaves ±60px horizontal zone
  deadZoneY: 40,
})`

export function CameraPage() {
  const { lang } = useLang()

  return (
    <DocLayout>
      <PageHeader
        title="Camera"
        badge={lang === 'en' ? 'Camera' : 'Câmera'}
        description={
          lang === 'en'
            ? 'A 2D camera that scrolls, zooms, follows targets, shakes, and fades the viewport.'
            : 'Uma câmera 2D que rola, dá zoom, segue alvos, treme e realiza fade no viewport.'
        }
      />

      <div className="space-y-10">
        <ApiSection title={lang === 'en' ? 'Setup & follow' : 'Configuração & seguir'}>
          <CodeBlock code={SETUP} filename="src/scenes/PlatformerScene.ts" />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Properties' : 'Propriedades'}>
          <PropTable props={[
            { name: 'x', type: 'number', default: '0', description: lang === 'en' ? 'World-space X the camera centers on' : 'X no espaço mundo que a câmera centraliza' },
            { name: 'y', type: 'number', default: '0', description: lang === 'en' ? 'World-space Y the camera centers on' : 'Y no espaço mundo que a câmera centraliza' },
            { name: 'zoom', type: 'number', default: '1', description: lang === 'en' ? 'Zoom factor — 1=normal, 2=2× magnified' : 'Fator de zoom — 1=normal, 2=2× ampliado' },
            { name: 'scrollX', type: 'number', readonly: true, description: lang === 'en' ? 'Left edge of the visible world area' : 'Borda esquerda da área visível' },
            { name: 'scrollY', type: 'number', readonly: true, description: lang === 'en' ? 'Top edge of the visible world area' : 'Borda superior da área visível' },
          ]} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'follow() options' : 'Opções do follow()'}>
          <CodeBlock code={DEAD_ZONE} />
          <PropTable props={[
            { name: 'lerp', type: 'number', default: '0.1', description: lang === 'en' ? 'Smoothing factor — 0=instant, 0.1=smooth, 1=never catches' : 'Fator de suavização — 0=instantâneo, 1=nunca alcança' },
            { name: 'offsetX', type: 'number', default: '0', description: lang === 'en' ? 'Horizontal offset from target' : 'Deslocamento horizontal do alvo' },
            { name: 'offsetY', type: 'number', default: '0', description: lang === 'en' ? 'Vertical offset from target' : 'Deslocamento vertical do alvo' },
            { name: 'deadZoneX', type: 'number', default: '0', description: lang === 'en' ? 'Horizontal dead-zone half-width in pixels' : 'Metade da largura da zona morta horizontal' },
            { name: 'deadZoneY', type: 'number', default: '0', description: lang === 'en' ? 'Vertical dead-zone half-height in pixels' : 'Metade da altura da zona morta vertical' },
          ]} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Screen effects' : 'Efeitos de tela'}>
          <CodeBlock code={EFFECTS} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Pan & zoom' : 'Pan & zoom'}>
          <CodeBlock code={PAN_ZOOM} />
          <Callout type="tip">
            {lang === 'en'
              ? 'pan() and zoomTo() return Promises — use await to chain cinematic sequences.'
              : 'pan() e zoomTo() retornam Promises — use await para encadear sequências cinemáticas.'}
          </Callout>
        </ApiSection>
      </div>
    </DocLayout>
  )
}
