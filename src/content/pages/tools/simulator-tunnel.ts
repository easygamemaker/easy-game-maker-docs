import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/simulator/tunnel',
  title: t('ngrok Tunnel', 'Túnel ngrok'),
  description: t(
    'egm simulate --tunnel gives your local game a public HTTPS address, so a phone on any network can open it.',
    'egm simulate --tunnel dá ao seu jogo local um endereço HTTPS (HyperText Transfer Protocol Secure) público, para que um celular em qualquer rede possa abri-lo.',
  ),
  source: 'src/cli/simulator/tunnel.ts',
  related: ['/cli/simulate', '/simulator/egmgo', '/network/manager', '/guide/troubleshooting'],
  sections: [
    {
      id: 'why',
      title: t('Why a tunnel', 'Por que um túnel'),
      blocks: [
        {
          type: 'p',
          text: t(
            'By default `egm simulate` serves the game on your local network, so a phone must be on the same Wi-Fi. That fails on networks that isolate devices, when the phone is on mobile data, or when you want to show the game to someone elsewhere. `--tunnel` starts an ngrok tunnel to the dev server and points the QR code at the public address.',
            'Por padrão o `egm simulate` serve o jogo na sua rede local, então o celular precisa estar no mesmo Wi-Fi. Isso falha em redes que isolam dispositivos, quando o celular está nos dados móveis ou quando você quer mostrar o jogo a alguém em outro lugar. O `--tunnel` inicia um túnel ngrok até o servidor de desenvolvimento e aponta o QR code (Quick Response code) para o endereço público.',
          ),
        },
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm simulate --tunnel
egm simulate -t -p 3000`,
        },
      ],
    },
    {
      id: 'first-run',
      title: t('What happens on the first run', 'O que acontece na primeira execução'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('The CLI looks for `ngrok` on your `PATH`, then in `~/.egm/`. If it finds neither, it downloads the ngrok v3 binary for your operating system and CPU into `~/.egm/`.', 'A CLI procura o `ngrok` no seu `PATH`, depois em `~/.egm/`. Se não encontrar em nenhum, baixa o binário do ngrok v3 para o seu sistema operacional e processador em `~/.egm/`.'),
            t('It asks for an ngrok auth token once. Tokens are free at https://dashboard.ngrok.com/signup. The token is saved to `~/.egm/.ngrok-token` with owner-only permissions and registered with `ngrok config add-authtoken`.', 'Ela pede um auth token do ngrok uma vez. Os tokens são gratuitos em https://dashboard.ngrok.com/signup. O token é salvo em `~/.egm/.ngrok-token` com permissão só para o dono e registrado com `ngrok config add-authtoken`.'),
            t('It runs `ngrok http <port>` in the background and polls ngrok\'s local API at `127.0.0.1:4040` for up to 15 seconds until a public URL appears.', 'Ela executa `ngrok http <port>` em segundo plano e consulta a API (Application Programming Interface) local do ngrok em `127.0.0.1:4040` por até 15 segundos, até aparecer uma URL (Uniform Resource Locator) pública.'),
            t('It prints `Tunnel: https://...`, rewrites `public/__go.html` and the simulator\'s QR code to that address, and marks the panel as TUNNEL.', 'Ela imprime `Tunnel: https://...`, reescreve o `public/__go.html` e o QR code do simulador para esse endereço e marca o painel como TUNNEL.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'Later runs reuse the binary and the saved token. When you stop the simulator, the tunnel process is stopped with it.',
            'As execuções seguintes reaproveitam o binário e o token salvo. Quando você encerra o simulador, o processo do túnel é encerrado junto.',
          ),
        },
      ],
    },
    {
      id: 'safety',
      title: t('What it exposes', 'O que ele expõe'),
      blocks: [
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'The tunnel publishes your Vite dev server, not just the built game. Anyone who has the address can load the game and its source files for as long as the tunnel runs. Share the address only with people you trust and stop the simulator when the session ends.',
            'O túnel publica o seu servidor de desenvolvimento do Vite, e não apenas o jogo compilado. Quem tiver o endereço pode carregar o jogo e seus arquivos-fonte enquanto o túnel estiver ativo. Compartilhe o endereço só com quem você confia e encerre o simulador ao fim da sessão.',
          ),
        },
        {
          type: 'p',
          text: t(
            'If the tunnel cannot start (download failed, wrong token, ngrok not reachable), the CLI prints `Tunnel failed:` with the reason and keeps the simulator running locally, so you lose nothing but the public address.',
            'Se o túnel não conseguir iniciar (download falhou, token errado, ngrok inalcançável), a CLI (Command-Line Interface) imprime `Tunnel failed:` com o motivo e mantém o simulador rodando localmente, então você só perde o endereço público.',
          ),
        },
      ],
    },
    {
      id: 'https-and-multiplayer',
      title: t('HTTPS and multiplayer', 'HTTPS e multiplayer'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The tunnel address is HTTPS, and a secure page may not open an insecure `ws://` WebSocket. If your game connects to a multiplayer server, choose `wss://` when the page is served over HTTPS, and note that your server has to be reachable from the phone, which a tunnel to the dev server alone does not provide.',
            'O endereço do túnel é HTTPS, e uma página segura não pode abrir um WebSocket `ws://` inseguro. Se o seu jogo conecta a um servidor multiplayer, escolha `wss://` quando a página for servida por HTTPS, e lembre que o seu servidor precisa ser alcançável a partir do celular, o que um túnel só para o servidor de desenvolvimento não oferece.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import type { App } from 'easy-game-maker'

/** ws:// on http pages, wss:// on https pages (such as a tunnel). */
export function configureNetwork(app: App, host: string, port: number): void {
  const scheme = location.protocol === 'https:' ? 'wss' : 'ws'
  app.network.setServer(\`\${scheme}://\${host}:\${port}\`)
}`,
        },
      ],
    },
  ],
}

export default page
