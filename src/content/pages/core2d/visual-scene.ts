import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/visual-scene',
  title: t('VisualScene and view.json', 'VisualScene e view.json'),
  description: t(
    'Scenes authored in the visual editor: the display tree comes from a JSON file, the logic from an events module.',
    'Cenas criadas no editor visual: a árvore de exibição vem de um arquivo JSON (JavaScript Object Notation) e a lógica de um módulo de eventos.',
  ),
  source: 'src/engine/scene/VisualScene.ts',
  related: ['/visual-editor', '/core/scene', '/cli/editor', '/display/group'],
  sections: [
    {
      id: 'idea',
      title: t('How it works', 'Como funciona'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A `VisualScene` is a `Scene` that builds itself from `/views/{name}.view.json` (served from `public/views/`) and forwards its lifecycle to a paired module, by convention `src/events/{name}.events.ts`. You register it with `app.scenes.addVisual(name, eventsLoader?)`.',
            'Uma `VisualScene` é uma `Scene` que se monta a partir de `/views/{name}.view.json` (servido de `public/views/`) e repassa seu ciclo de vida a um módulo pareado, por convenção `src/events/{name}.events.ts`. Você a registra com `app.scenes.addVisual(name, eventsLoader?)`.',
          ),
        },
        {
          type: 'list',
          ordered: true,
          items: [
            t('`onCreate` fetches the JSON. If the request fails it logs a warning and continues with an empty 360x640 view.', '`onCreate` busca o JSON. Se a requisição falhar, registra um aviso e continua com uma view vazia de 360x640.'),
            t('`ViewLoader.build` creates the objects, sets each `name` to the object `id`, links parents and children, then adds physics bodies for objects that declare `physics`.', '`ViewLoader.build` cria os objetos, define cada `name` como o `id` do objeto, liga pais e filhos, e depois adiciona corpos de física aos objetos que declaram `physics`.'),
            t('The events module is loaded and `onInit(scene, app)` runs. Errors in `onInit` are logged and do not stop the scene from becoming current.', 'O módulo de eventos é carregado e `onInit(scene, app)` executa. Erros em `onInit` são registrados e não impedem a cena de se tornar a atual.'),
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('The scene needs the app', 'A cena precisa do app'),
          text: t(
            '`VisualScene` reads the `App` from `params.app`. The `SceneManager` does not add it for you, so pass it: `app.goto(name, { params: { app } })`.',
            'A `VisualScene` lê o `App` de `params.app`. O `SceneManager` não o adiciona por você, então passe-o: `app.goto(name, { params: { app } })`.',
          ),
        },
      ],
    },
    {
      id: 'events',
      title: t('SceneEvents', 'SceneEvents'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The events module default-exports an object with any of these optional hooks. Use `satisfies SceneEvents` for type checking.',
            'O módulo de eventos exporta por padrão um objeto com qualquer um destes hooks opcionais. Use `satisfies SceneEvents` para checagem de tipos.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'onInit(scene, app)', type: 'void | Promise<void>', description: t('After the view is built. The place to look up objects with `scene.getById`.', 'Depois que a view é montada. O lugar para buscar objetos com `scene.getById`.') },
            { name: 'onUpdate(scene, app, dt)', type: 'void', description: t('Every frame, `dt` in seconds.', 'A cada quadro, `dt` em segundos.') },
            { name: 'onResume(scene, app)', type: 'void', description: t('Each time the scene becomes current.', 'Toda vez que a cena se torna a atual.') },
            { name: 'onDestroy(scene, app)', type: 'void', description: t('When the scene is destroyed.', 'Quando a cena é destruída.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'Extra members on the scene: `sceneName`, `viewJson` (the parsed file or `null`) and `viewObjects` (a read-only `Map` from id to object).',
            'Membros extras da cena: `sceneName`, `viewJson` (o arquivo lido ou `null`) e `viewObjects` (um `Map` somente leitura de id para objeto).',
          ),
        },
      ],
    },
    {
      id: 'format',
      title: t('The view.json format', 'O formato do view.json'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A `ViewJson` has `name`, `version`, `width`, `height` and an `objects` array. Each `ViewObject` has an `id` and a `type`, and optional `parent` (the id of a `Group`).',
            'Um `ViewJson` tem `name`, `version`, `width`, `height` e um array `objects`. Cada `ViewObject` tem um `id` e um `type`, e um `parent` opcional (o id de um `Group`).',
          ),
        },
        {
          type: 'table',
          head: [t('type', 'type'), t('Fields read by the loader', 'Campos lidos pelo loader')],
          rows: [
            [t('`RectShape`', '`RectShape`'), t('`width`, `height`, `fill`, `stroke`, `strokeWidth`, `cornerRadius`', '`width`, `height`, `fill`, `stroke`, `strokeWidth`, `cornerRadius`')],
            [t('`CircleShape`', '`CircleShape`'), t('`radius`, `fill`, `strokeWidth`', '`radius`, `fill`, `strokeWidth`')],
            [t('`Text`', '`Text`'), t('`text`, `fontSize`, `color`, `fontFamily`', '`text`, `fontSize`, `color`, `fontFamily`')],
            [t('`Sprite`', '`Sprite`'), t('`texture` (a URL fetched at runtime), `width`, `height`', '`texture` (uma URL (Uniform Resource Locator) buscada em tempo de execução), `width`, `height`')],
            [t('`AnimatedSprite`', '`AnimatedSprite`'), t('`frames` (URLs), `fps`, `loop`, `autoPlay`. Without `frames` an empty `Group` is created instead.', '`frames` (URLs), `fps`, `loop`, `autoPlay`. Sem `frames`, um `Group` vazio é criado no lugar.')],
            [t('`LineShape`', '`LineShape`'), t('`x2`, `y2`, `stroke`, `strokeWidth`', '`x2`, `y2`, `stroke`, `strokeWidth`')],
            [t('`ParticleEmitter`', '`ParticleEmitter`'), t('the [ParticleConfig](/display/particles) numeric fields, colors and `loop`, `duration`', 'os campos numéricos do [ParticleConfig](/display/particles), cores, `loop` e `duration`')],
            [t('`Group`', '`Group`'), t('no extra fields; use `parent` on other objects to nest them.', 'sem campos extras; use `parent` em outros objetos para aninhá-los.')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Every type also accepts the common transform fields `x`, `y`, `width`, `height`, `rotation`, `scaleX`, `scaleY`, `anchorX`, `anchorY`, `alpha`, `visible`, `zIndex`, applied after creation. An unknown `type` logs a warning and is skipped. Physics is opt-in per object: `physics: { type, shape, density, friction, restitution, isSensor, fixedRotation }` (`type` defaults to `static`, `shape` to `rect`).',
            'Todo tipo também aceita os campos de transformação comuns `x`, `y`, `width`, `height`, `rotation`, `scaleX`, `scaleY`, `anchorX`, `anchorY`, `alpha`, `visible`, `zIndex`, aplicados após a criação. Um `type` desconhecido registra um aviso e é ignorado. A física é opcional por objeto: `physics: { type, shape, density, friction, restitution, isSensor, fixedRotation }` (`type` padrão `static`, `shape` padrão `rect`).',
          ),
        },
        {
          type: 'code',
          lang: 'json',
          filename: 'public/views/game.view.json',
          check: 'skip',
          code: `{
  "name": "game",
  "version": 1,
  "width": 360,
  "height": 640,
  "objects": [
    { "id": "player", "type": "RectShape", "x": 180, "y": 500, "width": 40, "height": 40, "fill": "#ffd166" },
    { "id": "score", "type": "Text", "x": 16, "y": 16, "text": "0", "fontSize": 24, "color": "#ffffff" }
  ]
}`,
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Not everything round-trips', 'Nem tudo é aplicado'),
          text: t(
            '`VIEW_DEFAULTS` lists the editor defaults per type.',
            '`VIEW_DEFAULTS` lista os padrões do editor por tipo.',
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
          filename: 'src/events/game.events.ts',
          check: 'compile',
          code: `import type { RectShape, SceneEvents, Text } from 'easy-game-maker'

let score = 0

export default {
  onInit(scene) {
    scene.getById<Text>('score')!.text = 'Score: 0'
  },
  onUpdate(scene, app, dt) {
    const player = scene.getById<RectShape>('player')!
    if (app.input.isKeyDown('ArrowRight')) player.x += 160 * dt
    if (app.input.isKeyDown('ArrowLeft')) player.x -= 160 * dt
    if (app.input.isKeyDown(' ')) {
      score += 1
      scene.getById<Text>('score')!.text = 'Score: ' + score
    }
  },
} satisfies SceneEvents`,
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'skip',
          code: `import { App } from 'easy-game-maker'
import type { SceneEvents } from 'easy-game-maker'

async function main(): Promise<void> {
  const app = new App({ width: 360, height: 640 })
  await app.init()

  const modules = import.meta.glob<{ default: SceneEvents }>('./events/*.events.ts')
  for (const path in modules) {
    const name = path.replace('./events/', '').replace('.events.ts', '')
    app.scenes.addVisual(name, modules[path])
  }

  await app.goto('game', { params: { app } })
  app.run()
}

void main()`,
        },
      ],
    },
  ],
}

export default page
