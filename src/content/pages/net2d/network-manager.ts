import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/network/manager',
  title: t('NetworkManager', 'NetworkManager'),
  description: t(
    'Raw WebSocket multiplayer built into the App: set a server URL, join a room and exchange JSON messages.',
    'Multiplayer por WebSocket puro embutido no App: defina a URL (Uniform Resource Locator) do servidor, entre numa sala e troque mensagens JSON (JavaScript Object Notation).',
  ),
  source: 'src/engine/network/NetworkManager.ts',
  related: ['/network/room', '/core/events', '/core/app'],
  sections: [
    {
      id: 'overview',
      title: t('What it is', 'O que é'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`app.network` is a `NetworkManager`. It uses the browser's native `WebSocket`, with no third-party client library, and it hands you a [NetworkRoom](/network/room) once the server confirms that you joined.",
            "`app.network` é um `NetworkManager`. Ele usa o `WebSocket` nativo do navegador, sem biblioteca de cliente de terceiros, e entrega um [NetworkRoom](/network/room) quando o servidor confirma a entrada.",
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('You bring the server', 'O servidor é por sua conta'),
          text: t(
            'The SDK ships only the client. You need a WebSocket server that speaks the small protocol described below (the `join_room` request and the `room:joined` answer).',
            'O SDK (Software Development Kit) traz apenas o cliente. Você precisa de um servidor WebSocket que fale o protocolo descrito abaixo (o pedido `join_room` e a resposta `room:joined`).',
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('Reference', 'Referência'),
      blocks: [
        {
          type: 'props',
          title: t('Members', 'Membros'),
          rows: [
            {
              name: 'setServer(url: string): void',
              type: 'method',
              description: t(
                'Stores the WebSocket URL (for example `ws://localhost:2567`). Call it once, before `joinRoom`.',
                'Guarda a URL do WebSocket (por exemplo `ws://localhost:2567`). Chame uma vez, antes de `joinRoom`.',
              ),
            },
            {
              name: 'serverUrl',
              type: 'string',
              readonly: true,
              description: t('The URL set by `setServer`. Empty string until then.', 'A URL definida por `setServer`. String vazia até lá.'),
            },
            {
              name: 'joinRoom<TState>(roomType: string, options?: RoomOptions): Promise<NetworkRoom<TState>>',
              type: 'method',
              description: t(
                'Opens a socket, asks to join a room of the given type and resolves when the server confirms. `RoomOptions` is `Record<string, unknown>`. Rejects if no server URL was set.',
                'Abre um socket, pede para entrar numa sala do tipo informado e resolve quando o servidor confirma. `RoomOptions` é `Record<string, unknown>`. Rejeita se nenhuma URL foi definida.',
              ),
            },
            {
              name: 'leaveAll(): void',
              type: 'method',
              description: t('Leaves every room joined through this manager.', 'Sai de todas as salas abertas por este manager.'),
            },
            {
              name: 'roomCount',
              type: 'number',
              readonly: true,
              description: t('How many rooms are currently tracked.', 'Quantas salas estão sendo acompanhadas agora.'),
            },
          ],
        },
        {
          type: 'p',
          text: t(
            'Because `NetworkManager` extends [EventEmitter](/core/events), it emits `room:joined` with the new room every time a join succeeds.',
            'Como `NetworkManager` estende [EventEmitter](/core/events), ele emite `room:joined` com a nova sala a cada entrada bem-sucedida.',
          ),
        },
      ],
    },
    {
      id: 'protocol',
      title: t('The wire protocol', 'O protocolo na rede'),
      description: t(
        'Every frame is a JSON object shaped as { type, data }.',
        'Todo quadro é um objeto JSON no formato { type, data }.',
      ),
      blocks: [
        {
          type: 'list',
          items: [
            t(
              'Client to server, right after connecting: `{ type: "join_room", data: { roomType, playerName, options } }`. `playerName` is read from `options.playerName`.',
              'Cliente para servidor, logo após conectar: `{ type: "join_room", data: { roomType, playerName, options } }`. `playerName` vem de `options.playerName`.',
            ),
            t(
              'Server to client on success: `{ type: "room:joined", data: { sessionId, roomState } }`.',
              'Servidor para cliente em caso de sucesso: `{ type: "room:joined", data: { sessionId, roomState } }`.',
            ),
            t(
              'Server to client on refusal: `{ type: "room:error", data: { message } }`. The promise rejects with that message.',
              'Servidor para cliente em caso de recusa: `{ type: "room:error", data: { message } }`. A promise é rejeitada com essa mensagem.',
            ),
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Timeouts', 'Tempos limite'),
          text: t(
            'Opening the socket and waiting for `room:joined` each time out after 10 seconds. The promise then rejects with `Connection timeout` or `Join timeout`.',
            'Abrir o socket e esperar o `room:joined` têm, cada um, tempo limite de 10 segundos. A promise então é rejeitada com `Connection timeout` ou `Join timeout`.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Joining a room', 'Entrando numa sala'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { App } from 'easy-game-maker'

interface RaceState {
  players: string[]
}

async function main(): Promise<void> {
  const app = new App({ width: 360, height: 640 })
  await app.init()

  app.network.setServer('ws://localhost:2567')

  app.network.on('room:joined', () => {
    console.log('rooms open:', app.network.roomCount)
  })

  try {
    const room = await app.network.joinRoom<RaceState>('race', { playerName: 'Mario' })
    console.log('session', room.sessionId, 'players', room.initialState?.players)

    room.onMessage<{ x: number; y: number }>('kart:update', (pos) => {
      console.log('remote kart at', pos.x, pos.y)
    })
    room.send('kart:update', { x: 10, y: 20 })
  } catch (err) {
    console.error('could not join', err)
  }

  app.run()
}

void main()`,
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Clean up', 'Limpeza'),
          text: t(
            'Call `app.network.leaveAll()` when the player quits to the menu, so sockets do not stay open.',
            'Chame `app.network.leaveAll()` quando o jogador voltar ao menu, para não deixar sockets abertos.',
          ),
        },
      ],
    },
  ],
}

export default page
