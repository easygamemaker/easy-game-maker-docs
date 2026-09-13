import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropTable } from '@/components/docs/PropTable'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'

const SCENE_BASIC = `import { Scene, Sprite, type SceneParams } from 'easy-game-maker'

export class GameScene extends Scene {
  private _player!: Sprite

  // Called once when the scene is loaded
  override onCreate(params?: SceneParams): void {
    this._player = new Sprite()
    this._player.x = 400
    this._player.y = 300
    this.add(this._player)
  }

  // Called every frame — dt is elapsed seconds
  override onUpdate(dt: number): void {
    this._player.x += 100 * dt
  }

  // Called when scene is suspended (another scene pushed on top)
  override onPause(): void {}

  // Called when scene resumes
  override onResume(): void {}

  // Called before scene is removed from memory
  override onDestroy(): void {}
}`

const SCENE_MANAGER = `// Register scenes
app.scenes.add('menu', MenuScene)
app.scenes.add('game', GameScene)
app.scenes.add('gameover', GameOverScene)

// Transition to a scene
await app.scenes.go('game', {
  params: { level: 3, score: 0 },
})

// Current scene
const current = app.scenes.current

// All registered names
const names = app.scenes.sceneNames  // ['menu', 'game', 'gameover']`

const PARAMS = `// Passing data to a scene via params
await app.scenes.go('level', { params: { levelId: 5 } })

// Receiving in the scene
override onCreate(params?: SceneParams): void {
  const levelId = params?.['levelId'] as number ?? 1
}`

const GET_BY_ID = `// Find an object in the scene graph by its name
const boss = this.getById<Sprite>('boss')
if (boss) boss.visible = false`

export function ScenePage() {
  const { lang } = useLang()

  return (
    <DocLayout>
      <PageHeader
        title="Scene & SceneManager"
        badge="Core"
        description={
          lang === 'en'
            ? 'Scenes are self-contained game states. SceneManager handles registration, transitions, and lifecycle.'
            : 'Cenas são estados de jogo autocontidos. SceneManager gerencia registro, transições e ciclo de vida.'
        }
      />

      <div className="space-y-10">
        <ApiSection
          title={lang === 'en' ? 'Creating a Scene' : 'Criando uma Scene'}
          description={lang === 'en' ? 'Extend Scene and override the lifecycle hooks you need.' : 'Estenda Scene e sobrescreva os hooks de ciclo de vida necessários.'}
        >
          <CodeBlock code={SCENE_BASIC} filename="src/scenes/GameScene.ts" />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Scene lifecycle' : 'Ciclo de vida da Scene'}>
          <PropTable props={[
            { name: 'onCreate(params?)', type: 'void', description: lang === 'en' ? 'Called once when the scene is created. Build your scene graph here.' : 'Chamada uma vez ao criar a cena. Monte o grafo de cena aqui.' },
            { name: 'onUpdate(dt)', type: 'void', description: lang === 'en' ? 'Called every frame. dt = elapsed seconds since last frame.' : 'Chamada a cada frame. dt = segundos desde o último frame.' },
            { name: 'onPause()', type: 'void', description: lang === 'en' ? 'Called when another scene is pushed on top.' : 'Chamada quando outra cena é empilhada por cima.' },
            { name: 'onResume()', type: 'void', description: lang === 'en' ? 'Called when this scene comes back to the front.' : 'Chamada quando esta cena volta ao primeiro plano.' },
            { name: 'onDestroy()', type: 'void', description: lang === 'en' ? 'Called before the scene is removed from memory. Clean up timers, listeners, etc.' : 'Chamada antes da cena ser removida da memória. Limpe timers, listeners, etc.' },
          ]} />
        </ApiSection>

        <ApiSection title="SceneManager">
          <CodeBlock code={SCENE_MANAGER} />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'Passing params to scenes' : 'Passando parâmetros para cenas'}>
          <CodeBlock code={PARAMS} />
        </ApiSection>

        <ApiSection title="getById<T>">
          <CodeBlock code={GET_BY_ID} />
          <Callout type="tip">
            {lang === 'en'
              ? 'Use getById to find objects by their .name property. Useful when loading scenes from JSON or the Visual Editor.'
              : 'Use getById para encontrar objetos pela propriedade .name. Útil ao carregar cenas de JSON ou do Editor Visual.'}
          </Callout>
        </ApiSection>

        <div className="rounded-xl overflow-hidden border border-[#1e1e2a]">
          <img src="/images/scene-graph.webp" alt="Scene Graph" className="w-full object-cover opacity-80"
            onError={e => { (e.target as HTMLImageElement).style.display='none' }} />
        </div>
      </div>
    </DocLayout>
  )
}
