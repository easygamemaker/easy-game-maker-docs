import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/scene',
  title: t('Scene and SceneManager', 'Scene e SceneManager'),
  description: t(
    'A scene is the root display group of a screen; the SceneManager registers, creates and switches between them.',
    'Uma cena é o grupo de exibição raiz de uma tela; o SceneManager registra, cria e alterna entre elas.',
  ),
  source: 'src/engine/scene/Scene.ts',
  related: ['/core/app', '/display/group', '/core/visual-scene', '/animation/transitions'],
  sections: [
    {
      id: 'scene',
      title: t('Scene', 'Scene'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`Scene` is an abstract class that extends `Group`, so a scene is itself the root of a display tree: you `add()` sprites, shapes and text straight to `this`. Override the lifecycle hooks you need; all have empty defaults.',
            '`Scene` é uma classe abstrata que estende `Group`, então a cena é ela mesma a raiz de uma árvore de exibição: você faz `add()` de sprites, formas e texto direto em `this`. Sobrescreva os hooks de ciclo de vida que precisar; todos têm implementação vazia por padrão.',
          ),
        },
        {
          type: 'props',
          title: t('Lifecycle hooks', 'Hooks de ciclo de vida'),
          rows: [
            { name: 'onCreate(params?)', type: 'void | Promise<void>', description: t('Runs once, the first time the scene is entered. The manager awaits it, so async texture loading finishes before the first render. `params` comes from `go(name, { params })`.', 'Roda uma vez, na primeira vez que a cena é acessada. O manager aguarda o resultado, então o carregamento assíncrono de texturas termina antes do primeiro desenho. `params` vem de `go(name, { params })`.') },
            { name: 'onUpdate(dt)', type: 'void', description: t('Every frame while the scene is current. `dt` is in seconds.', 'A cada quadro enquanto a cena é a atual. `dt` está em segundos.') },
            { name: 'onResume(params?)', type: 'void', description: t('Called each time the scene becomes current through `go`, including the first time and when the scene was already created and cached (then `onCreate` does not run again). `params` are the `params` of that `go` call, so a cached scene can receive new data. Overrides without the argument keep working.', 'Chamado toda vez que a cena se torna a atual por `go`, inclusive na primeira vez e quando a cena já estava criada e em cache (nesse caso o `onCreate` não roda de novo). Os `params` são os `params` daquela chamada de `go`, então uma cena em cache pode receber dados novos. Sobrescritas sem o argumento continuam funcionando.') },
            { name: 'onFixedUpdate?(step, dt)', type: 'void', description: t('Optional fixed step hook at the App `fixedHz`, before `onUpdate`. See [Fixed Step](/core/fixed-step).', 'Hook opcional de passo fixo, na taxa `fixedHz` do App, antes do `onUpdate`. Veja [Passo Fixo](/core/fixed-step).') },
            { name: 'onRender?(alpha)', type: 'void', description: t('Optional, once per frame after `onUpdate` and right before the draw; `alpha` in [0, 1) is for interpolation. See [Fixed Step](/core/fixed-step).', 'Opcional, uma vez por quadro depois do `onUpdate` e logo antes do desenho; o `alpha` em [0, 1) serve para interpolação. Veja [Passo Fixo](/core/fixed-step).') },
            { name: 'onPause()', type: 'void', description: t('Called when another scene replaces this one.', 'Chamado quando outra cena substitui esta.') },
            { name: 'onDestroy()', type: 'void', description: t('Called by `destroy()`, which then destroys the children.', 'Chamado por `destroy()`, que em seguida destrói os filhos.') },
          ],
        },
        {
          type: 'p',
          text: t(
            '`getById<T>(id)` walks the tree depth first and returns the first object whose `name` equals `id`, or `null`. It is mostly useful with [visual scenes](/core/visual-scene).',
            '`getById<T>(id)` percorre a árvore em profundidade e retorna o primeiro objeto cujo `name` é igual a `id`, ou `null`. É mais útil com [cenas visuais](/core/visual-scene).',
          ),
        },
      ],
    },
    {
      id: 'manager',
      title: t('SceneManager (app.scenes)', 'SceneManager (app.scenes)'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'add(name, SceneClass)', type: 'void', description: t('Registers a class (a constructor with no arguments) under a name.', 'Registra uma classe (um construtor sem argumentos) sob um nome.') },
            { name: 'addVisual(name, eventsLoader?)', type: 'void', description: t('Registers an editor-authored scene. See [VisualScene](/core/visual-scene).', 'Registra uma cena criada no editor. Veja [VisualScene](/core/visual-scene).') },
            { name: 'go(name, options?)', type: 'Promise<void>', description: t('Switches to a scene. Throws if the name is not registered.', 'Troca para uma cena. Lança erro se o nome não estiver registrado.') },
            { name: 'current', type: 'Scene | null', readonly: true, description: t('The scene being updated and rendered.', 'A cena que está sendo atualizada e desenhada.') },
            { name: 'renderRoot', type: 'Group | null', readonly: true, description: t('What the renderer draws: the current scene, or a wrapper holding both scenes while a `slide` or `flip` runs.', 'O que o renderer desenha: a cena atual, ou um invólucro com as duas cenas enquanto um `slide` ou `flip` roda.') },
            { name: 'viewWidth', type: 'number', description: t('Distance in pixels a `slide` travels. `App` sets it from its `width`.', 'Distância em pixels percorrida por um `slide`. O `App` a define a partir de `width`.') },
            { name: 'currentName', type: 'string', readonly: true, description: t('Name of the current scene, or an empty string.', 'Nome da cena atual, ou string vazia.') },
            { name: 'sceneNames', type: 'string[]', readonly: true, description: t('All registered names.', 'Todos os nomes registrados.') },
            { name: 'restart(name, params?)', type: 'Promise<void>', description: t('Destroys the cached instance and goes to the scene again, so `onCreate(params)` runs on a fresh instance. Shortcut for `destroyScene(name)` followed by `go(name, { params })`.', 'Destrói a instância em cache e vai à cena de novo, então o `onCreate(params)` roda em uma instância nova. Atalho para `destroyScene(name)` seguido de `go(name, { params })`.') },
            { name: 'destroyScene(name)', type: 'void', description: t('Destroys the cached instance so the next `go` builds it again.', 'Destrói a instância em cache para que o próximo `go` a construa de novo.') },
          ],
        },
        {
          type: 'props',
          title: t('SceneTransitionOptions', 'SceneTransitionOptions'),
          rows: [
            { name: 'transition', type: "'none' | 'fade' | 'slide' | 'flip'", default: "'none'", description: t('`none` switches at once. `fade` fades the old scene out and the new one in. `slide` pushes the old scene out to the left while the new one enters from the right. `flip` squeezes the old scene to zero width, then grows the new one, like turning a card. A new `go()` during a slide or flip finishes it first.', '`none` troca na hora. `fade` esmaece a cena antiga e faz a nova aparecer. `slide` empurra a cena antiga para a esquerda enquanto a nova entra pela direita. `flip` comprime a cena antiga até largura zero e depois expande a nova, como virar uma carta. Um novo `go()` durante um slide ou flip conclui o anterior primeiro.') },
            { name: 'duration', type: 'number', default: '300', description: t('Total transition time in milliseconds. For `fade` the two halves (out and in) take half each.', 'Tempo total da transição em milissegundos. No `fade`, as duas metades (saída e entrada) levam metade cada.') },
            { name: 'params', type: 'SceneParams', description: t('Object passed to `onCreate` and to `onResume`.', 'Objeto passado a `onCreate` e a `onResume`.') },
          ],
        },
      ],
    },
    {
      id: 'behavior',
      title: t('Things worth knowing', 'O que vale saber'),
      blocks: [
        {
          type: 'callout',
          kind: 'info',
          title: t('Animated objects update by themselves', 'Objetos animados se atualizam sozinhos'),
          text: t(
            'Every frame the manager walks the current scene graph and calls `update(dt)` on each `AnimatedSprite` and `ParticleEmitter`, including nested ones and those built from a view.json. If you already call `update(dt)` on one by hand in `onUpdate`, it is not advanced a second time. Your own classes, `Camera` and `StateMachine` still need your call.',
            'A cada quadro o manager percorre o grafo da cena atual e chama `update(dt)` em cada `AnimatedSprite` e `ParticleEmitter`, inclusive os aninhados e os criados a partir de um view.json. Se você já chama `update(dt)` num deles à mão em `onUpdate`, ele não avança uma segunda vez. Suas próprias classes, a `Camera` e a `StateMachine` ainda precisam da sua chamada.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Instances are cached', 'Instâncias ficam em cache'),
          text: t(
            'A scene is constructed and `onCreate` runs only once per name. Going back to it later reuses the same instance and only calls `onResume(params)`, with the `params` of the new `go`. Reset state in `onResume`, or call `restart(name, params)` (or `destroyScene(name)`) to force a fresh build.',
            'Uma cena é construída e o `onCreate` roda apenas uma vez por nome. Voltar a ela depois reutiliza a mesma instância e só chama `onResume(params)`, com os `params` do novo `go`. Reinicie o estado em `onResume`, ou chame `restart(name, params)` (ou `destroyScene(name)`) para forçar uma construção nova.',
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
          filename: 'src/scenes.ts',
          check: 'compile',
          code: `import { App, Scene, RectShape, Text } from 'easy-game-maker'
import type { SceneParams } from 'easy-game-maker'

class Menu extends Scene {
  onCreate(): void {
    // Text is centered on x, y by default (anchor 0.5).
    this.add(new Text({ text: 'Tap to play', x: 200, y: 160, fontSize: 28 }))
  }
}

class Level extends Scene {
  private hero!: RectShape
  private level = 1

  onCreate(params?: SceneParams): void {
    this.level = typeof params?.level === 'number' ? params.level : 1
    this.hero = new RectShape({ x: 60, y: 200, width: 40, height: 40, fill: '#ffd166', name: 'hero' })
    this.add(this.hero)
  }

  onResume(): void {
    this.hero.x = 60
  }

  onUpdate(dt: number): void {
    this.hero.x += 40 * this.level * dt
  }
}

export async function start(app: App): Promise<void> {
  app.scenes.add('menu', Menu)
  app.scenes.add('level', Level)
  await app.goto('menu')
  await app.goto('level', { transition: 'fade', duration: 400, params: { level: 2 } })
}`,
        },
      ],
    },
  ],
}

export default page
