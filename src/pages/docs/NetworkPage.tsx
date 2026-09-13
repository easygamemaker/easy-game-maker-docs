import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'

const CONNECT = `// Configure the native WebSocket server URL once.
app.network.setServer('ws://localhost:2567')

// The server must reply with a room:joined message.
const room = await app.network.joinRoom<GameState>('game-room', {
  playerName: 'Ada',
  mapId: 'forest',
})

console.log(room.sessionId, room.initialState)
room.leave()`

const ROOM = `// Send a message to the server
room.send('move', { x: player.x, y: player.y })

// Receive typed messages from the server.
room.onMessage<{ id: string; x: number; y: number }>('player:moved', (data) => {
  updateRemotePlayer(data.id, data.x, data.y)
})

// Connection events
room.on('leave', (code) => console.log('disconnected', code))
room.on('error', (code, msg) => console.error(code, msg))`

export function NetworkPage() {
  const { lang } = useLang()
  return (
    <DocLayout>
      <PageHeader title="Network" badge="Network"
        description={lang === 'en'
          ? 'Real-time multiplayer over the browser WebSocket API. Join rooms and exchange typed JSON messages.'
          : 'Multiplayer em tempo real pela API WebSocket do navegador. Entre em salas e troque mensagens JSON tipadas.'}
      />
      <div className="space-y-10">
        <ApiSection title={lang === 'en' ? 'Connect & join rooms' : 'Conectar & entrar em salas'}><CodeBlock code={CONNECT} /></ApiSection>
        <ApiSection title={lang === 'en' ? 'Room messages & state' : 'Mensagens & estado da sala'}><CodeBlock code={ROOM} /></ApiSection>
        <Callout type="warning">{lang === 'en'
          ? 'EGM provides only the client. Your server must accept a join_room message and reply with room:joined or room:error.'
          : 'O EGM fornece apenas o cliente. Seu servidor deve aceitar a mensagem join_room e responder com room:joined ou room:error.'}
        </Callout>
      </div>
    </DocLayout>
  )
}
