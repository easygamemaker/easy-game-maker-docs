import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/events',
  title: t('EventEmitter', 'EventEmitter'),
  description: t(
    'The small publish/subscribe base class shared by display objects, input, physics and networking.',
    'A pequena classe base de publicar/assinar compartilhada por objetos de exibição, entrada, física e rede.',
  ),
  source: 'src/engine/core/EventEmitter.ts',
  related: ['/display/display-object', '/input/keyboard-mouse', '/physics/world', '/display/animated-sprite'],
  sections: [
    {
      id: 'api',
      title: t('Methods', 'Métodos'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`EventEmitter` maps event names (strings) to sets of listeners. Every method that changes state returns `this`, so calls chain. Payloads are typed by a generic: `on<T>(event, listener: (data: T) => void)`.',
            '`EventEmitter` associa nomes de evento (strings) a conjuntos de listeners. Todo método que altera estado retorna `this`, então as chamadas encadeiam. Os payloads são tipados por um genérico: `on<T>(event, listener: (data: T) => void)`.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'on<T>(event, listener)', type: 'this', description: t('Subscribes. Adding the same function twice has no effect (listeners are stored in a `Set`).', 'Assina. Adicionar a mesma função duas vezes não tem efeito (os listeners ficam em um `Set`).') },
            { name: 'off<T>(event, listener)', type: 'this', description: t('Unsubscribes a specific function.', 'Cancela a assinatura de uma função específica.') },
            { name: 'once<T>(event, listener)', type: 'this', description: t('Subscribes for a single call.', 'Assina para uma única chamada.') },
            { name: 'emit<T>(event, data)', type: 'this', description: t('Calls every listener with `data`, synchronously. `data` is required: pass `null` when there is no payload.', 'Chama cada listener com `data`, de forma síncrona. `data` é obrigatório: passe `null` quando não houver payload.') },
            { name: 'removeAllListeners(event?)', type: 'this', description: t('Clears one event, or every event if no name is given.', 'Limpa um evento, ou todos se nenhum nome for dado.') },
            { name: 'listenerCount(event)', type: 'number', description: t('How many listeners an event has.', 'Quantos listeners um evento tem.') },
          ],
        },
      ],
    },
    {
      id: 'who',
      title: t('Who is an emitter', 'Quem é um emitter'),
      blocks: [
        {
          type: 'table',
          head: [t('Class', 'Classe'), t('Events it emits', 'Eventos que emite')],
          rows: [
            [t('`InputManager` (`app.input`)', '`InputManager` (`app.input`)'), t('`pointerdown`, `pointermove`, `pointerup` with `{ x, y, pointerId }`; `keydown`, `keyup` with `{ key, code, repeat }`. It also emits an internal `update` every frame.', '`pointerdown`, `pointermove`, `pointerup` com `{ x, y, pointerId }`; `keydown`, `keyup` com `{ key, code, repeat }`. Também emite um `update` interno a cada quadro.')],
            [t('`PhysicsWorld` (`app.physics`)', '`PhysicsWorld` (`app.physics`)'), t('`beginContact`, `endContact` with the two bodies and display objects.', '`beginContact`, `endContact` com os dois corpos e objetos de exibição.')],
            [t('`AnimatedSprite`', '`AnimatedSprite`'), t('`complete` (payload `null`) when a non-looping animation ends.', '`complete` (payload `null`) quando uma animação sem loop termina.')],
            [t('Every `DisplayObject`', 'Todo `DisplayObject`'), t('It extends `EventEmitter`, so any display object can carry your own custom events. `destroy()` removes all its listeners.', 'Ele estende `EventEmitter`, então qualquer objeto de exibição pode carregar seus próprios eventos. `destroy()` remove todos os seus listeners.')],
          ],
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Clean up listeners', 'Limpe os listeners'),
          text: t(
            'Listeners on `app.input` outlive scenes. Remove them with `off` in `onPause` or `onDestroy`, or a hidden scene will keep reacting.',
            'Listeners em `app.input` sobrevivem às cenas. Remova-os com `off` em `onPause` ou `onDestroy`, senão uma cena oculta continuará reagindo.',
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
          filename: 'src/events.ts',
          check: 'compile',
          code: `import { App, EventEmitter, RectShape, Scene } from 'easy-game-maker'
import type { PointerEvent2D } from 'easy-game-maker'

class Health extends EventEmitter {
  private value = 3
  hit(): void {
    this.value -= 1
    this.emit('changed', this.value)
    if (this.value <= 0) this.emit('dead', null)
  }
}

class Arena extends Scene {
  private readonly health = new Health()
  private marker = new RectShape({ width: 16, height: 16, fill: '#ffd166' })
  private app!: App
  private readonly onDown = (p: PointerEvent2D): void => {
    this.marker.x = p.x
    this.marker.y = p.y
    this.health.hit()
  }

  onCreate(params?: { app?: App }): void {
    this.app = params!.app!
    this.add(this.marker)
    this.health.on<number>('changed', (v) => console.log('hp', v))
    this.health.once('dead', () => console.log('game over'))
    this.app.input.on<PointerEvent2D>('pointerdown', this.onDown)
  }

  onDestroy(): void {
    this.app.input.off('pointerdown', this.onDown)
  }
}

export { Arena }`,
        },
      ],
    },
  ],
}

export default page
