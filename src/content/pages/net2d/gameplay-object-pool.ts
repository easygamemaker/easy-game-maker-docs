import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/gameplay/object-pool',
  title: t('ObjectPool', 'ObjectPool'),
  description: t(
    'Reuse bullets, particles and enemies instead of allocating and garbage-collecting them every time.',
    'Reaproveite tiros, partículas e inimigos em vez de alocá-los e descartá-los toda vez.',
  ),
  source: 'src/engine/gameplay/ObjectPool.ts',
  related: ['/gameplay/state-machine', '/core/scene', '/display/rect-shape'],
  sections: [
    {
      id: 'why',
      title: t('Why a pool', 'Por que um pool'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Creating a new object for every bullet makes the garbage collector run in the middle of gameplay, which shows up as stutter. `ObjectPool<T>` keeps finished objects in a free list and hands them out again. It does not know what `T` is: you provide a factory and, optionally, a reset function.',
            'Criar um objeto novo para cada tiro faz o coletor de lixo rodar no meio da partida, e isso aparece como engasgo. O `ObjectPool<T>` guarda os objetos já usados numa lista livre e os entrega de novo. Ele não sabe o que é `T`: você fornece uma fábrica e, se quiser, uma função de reset.',
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('Constructor and methods', 'Construtor e métodos'),
      blocks: [
        {
          type: 'props',
          title: t('new ObjectPool<T>(factory, reset?, prewarm?, maxSize?)', 'new ObjectPool<T>(factory, reset?, prewarm?, maxSize?)'),
          rows: [
            { name: 'factory', type: '() => T', required: true, description: t('Creates a brand-new object when the free list is empty.', 'Cria um objeto novo quando a lista livre está vazia.') },
            { name: 'reset', type: '(obj: T) => void', default: '() => {}', description: t('Puts an object in its idle state. Called when an object is released, and once on each prewarmed object.', 'Coloca um objeto no estado ocioso. Chamada quando um objeto é devolvido, e uma vez em cada objeto pré-aquecido.') },
            { name: 'prewarm', type: 'number', default: '0', description: t('How many objects to create up front with `factory`.', 'Quantos objetos criar de antemão com `factory`.') },
            { name: 'maxSize', type: 'number', default: '0', description: t('Cap on simultaneously active objects. `0` means unlimited.', 'Limite de objetos ativos ao mesmo tempo. `0` significa sem limite.') },
          ],
        },
        {
          type: 'props',
          title: t('Methods', 'Métodos'),
          rows: [
            { name: 'acquire(): T | null', type: 'method', description: t('Takes an object from the free list, or creates one. Returns `null` when `maxSize` active objects already exist.', 'Pega um objeto da lista livre, ou cria um. Retorna `null` quando já existem `maxSize` objetos ativos.') },
            { name: 'release(obj: T): void', type: 'method', description: t('Runs `reset` and returns the object to the free list. Ignored if the object is not currently active, so a double release is safe.', 'Executa `reset` e devolve o objeto à lista livre. Ignorado se o objeto não está ativo, então soltar duas vezes é seguro.') },
            { name: 'releaseAll(): void', type: 'method', description: t('Releases every active object at once, for example on level reset.', 'Devolve todos os objetos ativos de uma vez, por exemplo ao reiniciar a fase.') },
            { name: 'forEach(fn: (obj: T) => void): void', type: 'method', description: t('Visits every active object.', 'Percorre todos os objetos ativos.') },
            { name: 'forEachRelease(fn: (obj: T) => boolean): void', type: 'method', description: t('Visits every active object and releases those for which `fn` returns `true`. Safe to use while updating.', 'Percorre os objetos ativos e devolve aqueles para os quais `fn` retorna `true`. Seguro para usar durante o update.') },
            { name: 'activeCount / availableCount / totalCount', type: 'number', readonly: true, description: t('Objects in use, idle, and both together.', 'Objetos em uso, ociosos, e os dois somados.') },
          ],
        },
      ],
    },
    {
      id: 'gotchas',
      title: t('Things to know', 'O que vale saber'),
      blocks: [
        {
          type: 'callout',
          kind: 'warning',
          title: t('Reset runs on release and prewarm, not on acquire', 'O reset roda na devolução e no pré-aquecimento, não na retirada'),
          text: t(
            'Prewarmed objects go through `reset` once, so they start idle like released ones, but `acquire` does not call it. Always set position and state right after `acquire`, and use `reset` to hide or stop the object while it sits idle.',
            'Objetos pré-aquecidos passam pelo `reset` uma vez, então começam ociosos como os devolvidos, mas `acquire` não o chama. Sempre defina posição e estado logo após `acquire`, e use o `reset` para esconder ou parar o objeto enquanto ele está ocioso.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('maxSize counts active objects', 'maxSize conta os objetos ativos'),
          text: t(
            'The cap applies to objects in use at the same time. Idle objects in the free list do not consume the budget.',
            'O limite vale para os objetos em uso ao mesmo tempo. Objetos ociosos na lista livre não gastam o orçamento.',
          ),
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('The pool does not touch the scene', 'O pool não mexe na cena'),
          text: t(
            'It only tracks objects. Adding a bullet to a scene and removing it on release is your job, as in the example below.',
            'Ele só rastreia objetos. Adicionar o tiro à cena e removê-lo ao devolver é com você, como no exemplo abaixo.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Bullet pool in a scene', 'Pool de tiros numa cena'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { App, ObjectPool, RectShape, Scene } from 'easy-game-maker'

class GameScene extends Scene {
  private readonly bullets = new ObjectPool<RectShape>(
    () => new RectShape({ width: 4, height: 12, fill: '#ffd166' }),
    (b) => {
      b.visible = false
    },
    20,
    50,
  )
  private cooldown = 0

  onUpdate(dt: number): void {
    this.cooldown -= dt
    if (this.cooldown <= 0) {
      this.cooldown = 0.2
      const b = this.bullets.acquire()
      if (b) {
        b.x = 180
        b.y = 600
        b.visible = true
        this.add(b)
      }
    }

    this.bullets.forEachRelease((b) => {
      b.y -= 400 * dt
      if (b.y < -20) {
        this.remove(b)
        return true
      }
      return false
    })
  }
}

async function main(): Promise<void> {
  const app = new App({ width: 360, height: 640 })
  await app.init()
  app.scenes.add('game', GameScene)
  await app.goto('game')
  app.run()
}

void main()`,
        },
      ],
    },
  ],
}

export default page
