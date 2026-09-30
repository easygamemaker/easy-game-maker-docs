import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/simulator/egmgo',
  title: t('EgmGO App', 'App EgmGO'),
  description: t(
    'EgmGO is the companion app that scans the simulator QR code and runs your game on a real phone, with live reload.',
    'O EgmGO é o app companheiro que lê o QR code do simulador e executa o seu jogo em um celular de verdade, com recarga automática.',
  ),
  source: 'src/cli/simulator/go-page.ts',
  related: ['/cli/go', '/cli/simulate', '/simulator/tunnel', '/simulator/overview'],
  sections: [
    {
      id: 'what',
      title: t('What EgmGO is', 'O que é o EgmGO'),
      blocks: [
        {
          type: 'p',
          text: t(
            'EgmGO is a native shell for iOS (SwiftUI, with a `WKWebView`) and Android (Kotlin, with a `WebView`). It has one job: scan a QR code, learn the size and orientation of your game, and load the game from your dev server. Because the game is served by `egm simulate`, saving a file reloads it on the phone through the same Vite live reload you use in the browser.',
            'O EgmGO é uma casca nativa para iOS (SwiftUI, com um `WKWebView`) e Android (Kotlin, com uma `WebView`). Ele tem uma única função: ler um QR code (Quick Response code), descobrir o tamanho e a orientação do seu jogo e carregá-lo do seu servidor de desenvolvimento. Como o jogo é servido pelo `egm simulate`, salvar um arquivo o recarrega no celular pelo mesmo live reload do Vite que você usa no navegador.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'This release documents no prebuilt store version of EgmGO. You generate its native projects with [egm go](/cli/go) and install them on your own device from Xcode or Android Studio.',
            'Esta versão não documenta uma versão pronta do EgmGO em loja. Você gera os projetos nativos com [egm go](/cli/go) e os instala no seu próprio dispositivo pelo Xcode ou pelo Android Studio.',
          ),
        },
      ],
    },
    {
      id: 'flow',
      title: t('The handshake', 'O handshake'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('`egm simulate` writes `public/__go.html`, a page carrying a JSON manifest in `<script id="egm-manifest">` and `egm-*` meta tags.', 'O `egm simulate` grava `public/__go.html`, uma página que carrega um manifesto JSON (JavaScript Object Notation) em `<script id="egm-manifest">` e metatags `egm-*`.'),
            t('The QR code in the simulator points at `<server>/__go.html`. The address is your local network IP, or the ngrok address with `--tunnel`.', 'O QR code no simulador aponta para `<servidor>/__go.html`. O endereço é o IP (Internet Protocol) da sua rede local, ou o endereço do ngrok com `--tunnel`.'),
            t('EgmGO scans it (only `http` and `https` addresses are accepted), downloads the page and reads the manifest.', 'O EgmGO o lê (só endereços `http` e `https` são aceitos), baixa a página e lê o manifesto.'),
            t('It opens `gameUrl` from the manifest in its web view, using the game\'s background color, and shows the size and orientation on its loading screen.', 'Ele abre o `gameUrl` do manifesto na sua web view, usando a cor de fundo do jogo, e mostra o tamanho e a orientação na tela de carregamento.'),
            t('Once loaded, it marks the page so the game can detect it (see below). The simulator panel changes to "Device connected".', 'Depois de carregado, ele marca a página para que o jogo possa detectá-lo (veja abaixo). O painel do simulador muda para "Device connected".'),
          ],
        },
        {
          type: 'callout',
          kind: 'tip',
          text: t(
            'On iOS, press and hold the game for about a second and a half to go back to the scanner.',
            'No iOS, mantenha o dedo sobre o jogo por cerca de um segundo e meio para voltar ao leitor.',
          ),
        },
        {
          type: 'table',
          head: [t('Manifest field', 'Campo do manifesto'), t('Comes from', 'Vem de')],
          rows: [
            [t('`name`, `version`', '`name`, `version`'), t('`app.name` (the file version is always `1.0.0`)', '`app.name` (a versão do arquivo é sempre `1.0.0`)')],
            [t('`width`, `height`', '`width`, `height`'), t('`display.width`, `display.height`', '`display.width`, `display.height`')],
            [t('`orientation`', '`orientation`'), t('`landscape` when width is at least height, else `portrait`', '`landscape` quando a largura é maior ou igual à altura, senão `portrait`')],
            [t('`background`, `scaling`', '`background`, `scaling`'), t('`display.backgroundColor` (default `#000000`), `display.scaling` (default `fit`)', '`display.backgroundColor` (padrão `#000000`), `display.scaling` (padrão `fit`)')],
            [t('`gameUrl`', '`gameUrl`'), t('The server address the QR code was made for', 'O endereço do servidor para o qual o QR code foi feito')],
          ],
        },
      ],
    },
    {
      id: 'detect',
      title: t('Detecting EgmGO from the game', 'Detectando o EgmGO a partir do jogo'),
      blocks: [
        {
          type: 'p',
          text: t(
            'After the page loads, the app runs a script that sets `window.__EGMGO__ = true` and a `data-egmgo` attribute on the document. Combine that with `PlatformDetector` to tune touch controls or hide desktop-only hints:',
            'Depois que a página carrega, o app executa um script que define `window.__EGMGO__ = true` e um atributo `data-egmgo` no documento. Combine isso com o `PlatformDetector` para ajustar controles de toque ou esconder dicas só de desktop:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { PlatformDetector } from 'easy-game-maker'

declare global {
  interface Window {
    __EGMGO__?: boolean
  }
}

export function shouldShowTouchControls(): boolean {
  const insideEgmGo = window.__EGMGO__ === true || document.documentElement.hasAttribute('data-egmgo')
  const platform = PlatformDetector.detect()
  return insideEgmGo || platform === 'ios' || platform === 'android'
}`,
        },
      ],
    },
    {
      id: 'problems',
      title: t('When it does not connect', 'Quando não conecta'),
      blocks: [
        {
          type: 'list',
          items: [
            t('**"Could not load manifest. Make sure egm simulate is running."** The phone cannot reach the address in the QR code. Check that both devices are on the same network, that the computer\'s firewall allows the port, or use `--tunnel`.', '**"Could not load manifest. Make sure egm simulate is running."** O celular não alcança o endereço do QR code. Confira se os dois dispositivos estão na mesma rede, se o firewall do computador libera a porta ou use `--tunnel`.'),
            t('**No QR code in the simulator.** The CLI found no local network address (no active network interface). Connect to a network or use `--tunnel`.', '**Sem QR code no simulador.** A CLI não achou endereço de rede local (nenhuma interface de rede ativa). Conecte-se a uma rede ou use `--tunnel`.'),
            t('**The page opens in the phone\'s browser instead.** You scanned the code with the camera. It shows a fallback that asks you to scan with EgmGO.', '**A página abre no navegador do celular.** Você leu o código com a câmera. Ela mostra um aviso pedindo para ler com o EgmGO.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'The manifest is plain data, so it is easy to consume from your own tools. This parser reads it out of the handshake page:',
            'O manifesto é dado simples, então é fácil de consumir nas suas próprias ferramentas. Este parser o extrai da página de handshake:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `export interface EgmGoManifest {
  name: string
  version: string
  width: number
  height: number
  orientation: 'landscape' | 'portrait'
  background: string
  scaling: string
  gameUrl: string
  engineVersion: string
}

export async function fetchManifest(goPageUrl: string): Promise<EgmGoManifest | null> {
  const html = await (await fetch(goPageUrl)).text()
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const raw = doc.getElementById('egm-manifest')?.textContent
  return raw ? (JSON.parse(raw) as EgmGoManifest) : null
}`,
        },
      ],
    },
  ],
}

export default page
