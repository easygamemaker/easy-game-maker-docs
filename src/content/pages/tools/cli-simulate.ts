import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/cli/simulate',
  title: t('egm simulate', 'egm simulate'),
  description: t(
    'Run the game with live reload inside the simulator, and expose it to a phone on your network or through a tunnel.',
    'Execute o jogo com recarga automática dentro do simulador e exponha-o a um celular na sua rede ou por um túnel.',
  ),
  source: 'src/cli/commands/simulate.ts',
  related: ['/simulator/overview', '/simulator/devtools', '/simulator/tunnel', '/simulator/egmgo', '/cli/e2e'],
  sections: [
    {
      id: 'usage',
      title: t('Usage', 'Uso'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm simulate                # http://localhost:5173/__simulator.html
egm sim -p 3000             # alias, custom port
egm simulate --tunnel       # also open an ngrok tunnel`,
        },
        {
          type: 'props',
          rows: [
            { name: '-p, --port <number>', type: 'number', default: '5173', description: t('Port for the Vite dev server. If it is busy, Vite chooses the next free one and the simulator follows the port Vite reports.', 'Porta do servidor de desenvolvimento do Vite. Se estiver ocupada, o Vite escolhe a próxima livre e o simulador segue a porta que o Vite informar.') },
            { name: '-t, --tunnel', type: 'boolean', default: 'false', description: t('Expose the game through an ngrok tunnel so a phone on any network can open it. See [ngrok Tunnel](/simulator/tunnel).', 'Expõe o jogo por um túnel ngrok, para que um celular em qualquer rede o abra. Veja [Túnel ngrok](/simulator/tunnel).') },
          ],
        },
        {
          type: 'p',
          text: t(
            '`sim` is an alias of `simulate`. Run the command inside a game project.',
            '`sim` é um apelido de `simulate`. Rode o comando dentro de um projeto de jogo.',
          ),
        },
      ],
    },
    {
      id: 'what-it-does',
      title: t('What it does', 'O que ele faz'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('Checks that `egm.config.ts` (or `egm.config.js`) and `node_modules` exist, and that the project has its own Vite in `node_modules/.bin`. Otherwise it stops with a message.', 'Confere se `egm.config.ts` (ou `egm.config.js`) e `node_modules` existem, e se o projeto tem o próprio Vite em `node_modules/.bin`. Caso contrário, encerra com uma mensagem.'),
            t('Reads the name, canvas size, scaling, background and `mode` from `egm.config.ts`.', 'Lê o nome, o tamanho do canvas, a escala, o fundo e o `mode` do `egm.config.ts`.'),
            t('Writes `public/__simulator.html` and, when it finds a local network address, `public/__go.html`, the page EgmGO scans.', 'Escreve `public/__simulator.html` e, quando encontra um endereço de rede local, `public/__go.html`, a página que o EgmGO lê.'),
            t('Starts the project\'s Vite with `--port <n> --host`, so the game is reachable from other devices, and prints a compact status panel instead of Vite\'s banner.', 'Inicia o Vite do projeto com `--port <n> --host`, para que o jogo seja alcançável por outros dispositivos, e imprime um painel de status compacto no lugar do banner do Vite.'),
            t('Opens the simulator page in your browser (falling back after 5 seconds if Vite never reports its address).', 'Abre a página do simulador no navegador (com um plano B após 5 segundos, se o Vite nunca informar o endereço).'),
            t('On Ctrl+C or when Vite exits, deletes both temporary pages and stops the tunnel.', 'Ao Ctrl+C ou quando o Vite encerra, apaga as duas páginas temporárias e para o túnel.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'While it runs, file saves trigger Vite\'s hot module replacement (HMR) or a page reload, and the terminal prints one line per event. The header line of the panel shows the project name and the canvas size.',
            'Enquanto roda, salvar arquivos aciona o hot module replacement (HMR, a troca de módulos sem recarregar tudo) do Vite ou uma recarga da página, e o terminal imprime uma linha por evento. A linha de cabeçalho do painel mostra o nome do projeto e o tamanho do canvas.',
          ),
        },
      ],
    },
    {
      id: 'shortcuts',
      title: t('Device shortcuts', 'Atalhos de dispositivo'),
      blocks: [
        {
          type: 'p',
          text: t(
            'In the simulator page, number keys switch the device preview: `1` Default, `2` iPhone portrait, `3` iPhone landscape, `4` Android portrait, `5` Android landscape, `6` iPad portrait, `7` iPad landscape, `8` Desktop HD and `9` Desktop Full HD. More in [Simulator Overview](/simulator/overview).',
            'Na página do simulador, as teclas numéricas trocam a prévia do dispositivo: `1` Padrão, `2` iPhone em retrato, `3` iPhone em paisagem, `4` Android em retrato, `5` Android em paisagem, `6` iPad em retrato, `7` iPad em paisagem, `8` Desktop HD e `9` Desktop Full HD. Há mais em [Visão Geral do Simulador](/simulator/overview).',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'The simulator loads your `index.html` in a frame, so the game runs exactly as it would in the browser. Games from `egm new` start on their own: their `main.ts` calls `createApp()` at the end of the module. The simulator does not set any flag on the page.',
            'O simulador carrega o seu `index.html` em um frame, então o jogo roda exatamente como rodaria no navegador. Jogos criados com `egm new` iniciam sozinhos: o `main.ts` deles chama `createApp()` no fim do módulo. O simulador não define nenhuma flag na página.',
          ),
        },
      ],
    },
    {
      id: 'entry',
      title: t('An entry point that plays well with tools', 'Um ponto de entrada que convive bem com as ferramentas'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Export a `createApp` function and start it from the module. Your own tests or a host page can import the same function and build the app with their own canvas:',
            'Exporte uma função `createApp` e inicie-a a partir do módulo. Os seus próprios testes ou uma página hospedeira podem importar a mesma função e montar o app com o próprio canvas:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          code: `import { App, Scene, Text } from 'easy-game-maker'

class HelloScene extends Scene {
  override onCreate(): void {
    this.add(new Text({ text: 'Hello, simulator', x: 180, y: 300, fontSize: 24, color: '#ffffff', align: 'center' }))
  }
}

export default function createApp(canvas?: HTMLCanvasElement): App {
  const app = new App({ width: 360, height: 640, backgroundColor: '#1a1a2e' })
  app.init(canvas)
  app.scenes.add('hello', HelloScene)
  void app.scenes.go('hello')
  app.run()
  return app
}

createApp()`,
        },
      ],
    },
  ],
}

export default page
