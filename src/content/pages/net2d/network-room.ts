import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/network/room',
  title: t('NetworkRoom', 'NetworkRoom'),
  description: t(
    'A joined room: send typed messages, subscribe to server messages and detect disconnection.',
    'Uma sala já conectada: envie mensagens tipadas, assine as mensagens do servidor e detecte a desconexão.',
  ),
  source: 'src/engine/network/NetworkRoom.ts',
  related: ['/network/manager', '/core/events'],
  sections: [
    {
      id: 'overview',
      title: t('What it is', 'O que é'),
      blocks: [
        {
          type: 'p',
          text: t(
            'You never construct a `NetworkRoom` yourself: [NetworkManager](/network/manager) creates it when `joinRoom` succeeds. It wraps the socket, parses every incoming JSON frame and re-emits it as an event named after the message `type`.',
            'Você não cria um `NetworkRoom` à mão: o [NetworkManager](/network/manager) o cria quando `joinRoom` dá certo. Ele envolve o socket, lê cada quadro JSON (JavaScript Object Notation) recebido e o reemite como um evento com o nome do `type` da mensagem.',
          ),
        },
      ],
    },
    {
      id: 'members',
      title: t('Members', 'Membros'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'sessionId', type: 'string', readonly: true, description: t('Id assigned to you by the server in `room:joined`.', 'Id atribuído a você pelo servidor no `room:joined`.') },
            { name: 'initialState', type: 'TState | undefined', readonly: true, description: t('The `roomState` sent by the server when you joined.', 'O `roomState` enviado pelo servidor quando você entrou.') },
            { name: 'connected', type: 'boolean', readonly: true, description: t('True while the socket is open and you have not left.', 'Verdadeiro enquanto o socket está aberto e você não saiu.') },
            { name: 'roomId', type: 'string', readonly: true, description: t('Taken from the `roomId` field of the server\'s `room:joined` message. An empty string when the server does not send one.', 'Vem do campo `roomId` da mensagem `room:joined` do servidor. Uma string vazia quando o servidor não envia esse campo.') },
            { name: 'onMessage<T>(type: string, handler: (data: T) => void): this', type: 'method', description: t('Subscribes to server messages of one type. Chainable.', 'Assina as mensagens do servidor de um tipo. Encadeável.') },
            { name: 'send(type: string, data?: unknown): void', type: 'method', description: t('Sends `{ type, data }` as JSON. Silently ignored if you already left or the socket is not open.', 'Envia `{ type, data }` como JSON. Ignorado em silêncio se você já saiu ou o socket não está aberto.') },
            { name: 'leave(): void', type: 'method', description: t('Closes the socket. Safe to call twice.', 'Fecha o socket. Pode ser chamado duas vezes sem problema.') },
          ],
        },
      ],
    },
    {
      id: 'events',
      title: t('Built-in events', 'Eventos embutidos'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Besides your own message types, the room emits two events itself. Use `room.on(...)` (from [EventEmitter](/core/events)) to listen.',
            'Além dos seus tipos de mensagem, a sala emite dois eventos próprios. Use `room.on(...)` (do [EventEmitter](/core/events)) para escutar.',
          ),
        },
        {
          type: 'table',
          head: [t('Event', 'Evento'), t('Payload', 'Dados'), t('When', 'Quando')],
          rows: [
            [t('`leave`', '`leave`'), t('close code (number)', 'código de fechamento (number)'), t('The socket closed, by you or by the server.', 'O socket fechou, por você ou pelo servidor.')],
            [t('`error`', '`error`'), t('`{ code: 0, message: "WebSocket error" }`', '`{ code: 0, message: "WebSocket error" }`'), t('The socket reported an error.', 'O socket reportou um erro.')],
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Reserved names', 'Nomes reservados'),
          text: t(
            'Do not use `leave` or `error` as your own message types: the server frame would fire the same listeners.',
            'Não use `leave` nem `error` como tipos de mensagem seus: o quadro do servidor dispararia os mesmos ouvintes.',
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
          filename: 'src/net.ts',
          check: 'compile',
          code: `import { App, NetworkRoom } from 'easy-game-maker'

interface Snapshot {
  x: number
  y: number
}

export async function connect(app: App): Promise<NetworkRoom> {
  app.network.setServer('ws://localhost:2567')
  const room = await app.network.joinRoom('arena', { playerName: 'Ana' })

  room.onMessage<Snapshot>('player:move', (s) => {
    console.log('player moved to', s.x, s.y)
  })

  room.on<number>('leave', (code) => {
    console.warn('disconnected with code', code)
  })

  room.on('error', () => {
    console.warn('socket error')
  })

  room.send('player:ready')
  return room
}`,
        },
        {
          type: 'p',
          text: t(
            'Send at a modest rate (for example on a timer, not every frame) and keep payloads small: each `send` is one JSON frame.',
            'Envie em ritmo moderado (por exemplo num timer, não a cada quadro) e mantenha os dados pequenos: cada `send` é um quadro JSON.',
          ),
        },
      ],
    },
  ],
}

export default page
