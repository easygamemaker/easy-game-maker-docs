import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/guide/faq',
  title: t('FAQ', 'Perguntas Frequentes'),
  description: t(
    'Short answers about platforms, 2D versus 3D, assets, multiplayer, licensing and what is not available yet.',
    'Respostas curtas sobre plataformas, 2D contra 3D, assets, multiplayer, licença e o que ainda não está disponível.',
  ),
  source: 'CHANGELOG.md',
  related: ['/guide/troubleshooting', '/introduction', '/guide/2d-or-3d', '/build/desktop'],
  sections: [
    {
      id: 'platforms',
      title: t('Platforms and status', 'Plataformas e situação'),
      blocks: [
        {
          type: 'p',
          text: t('**Where can I publish my game today?** As a desktop app: `egm build desktop` produces a `.app` and `.dmg` on macOS, `.msi` and `.exe` on Windows, and `.AppImage` and `.deb` on Linux.', '**Onde posso publicar o meu jogo hoje?** Como aplicativo desktop: `egm build desktop` gera `.app` e `.dmg` no macOS, `.msi` e `.exe` no Windows, e `.AppImage` e `.deb` no Linux.'),
        },
        {
          type: 'p',
          text: t('**What about web, iOS, Android, TV and consoles?** Not available in 0.2.0. Those builders exist in the code but are switched off, and the commands print "not available yet" and exit with code 1. They will open one target at a time. An EGM Marketplace for publishing is planned, not shipped. See [Web](/build/web), [iOS & Android](/build/mobile), [Smart TV](/build/tv) and [Consoles](/build/consoles).', '**E web, iOS, Android, TV e consoles?** Não estão disponíveis na 0.2.0. Esses builders existem no código, mas estão desligados, e os comandos imprimem "not available yet" e encerram com código 1. Eles serão abertos um alvo por vez. Um EGM Marketplace para publicação está planejado, mas ainda não existe. Veja [Web](/build/web), [iOS & Android](/build/mobile), [Smart TV](/build/tv) e [Consoles](/build/consoles).'),
        },
        {
          type: 'p',
          text: t('**Can I still test on a phone?** Yes. `egm simulate` serves the game on your network and shows a QR code that the EgmGO companion app scans. With `--tunnel` it works across networks. See [EgmGO App](/simulator/egmgo).', '**Ainda consigo testar em um celular?** Sim. O `egm simulate` serve o jogo na sua rede e mostra um QR code (Quick Response code) que o app companheiro EgmGO lê. Com `--tunnel` funciona entre redes diferentes. Veja [App EgmGO](/simulator/egmgo).'),
        },
        {
          type: 'p',
          text: t('**Are ads and in-app purchases available?** The engine has `AdManager` and `IAPManager`, and the mobile builders can generate native bridges for them, but those builders are disabled. Treat monetization as not reachable yet.', '**Anúncios e compras dentro do app estão disponíveis?** A engine tem `AdManager` e `IAPManager`, e os builders mobile conseguem gerar as pontes nativas para eles, mas esses builders estão desativados. Trate a monetização como ainda inalcançável.'),
        },
      ],
    },
    {
      id: 'choosing',
      title: t('2D, 3D and AI', '2D, 3D e IA'),
      blocks: [
        {
          type: 'p',
          text: t('**Can one game mix 2D and 3D?** No. They are separate engines with separate entry points (`easy-game-maker` and `easy-game-maker/3d`), and you choose one when you run `egm new`. See [2D or 3D?](/guide/2d-or-3d).', '**Um jogo pode misturar 2D e 3D?** Não. São engines separadas, com pontos de entrada separados (`easy-game-maker` e `easy-game-maker/3d`), e você escolhe uma ao rodar `egm new`. Veja [2D ou 3D?](/guide/2d-or-3d).'),
        },
        {
          type: 'p',
          text: t('**Do I need to bring art?** Not in 3D: models come from primitives and prefabs, textures are drawn in code and sound is synthesised, though `.glb` models and textures can be loaded from a URL. In 2D you use your own images and sounds.', '**Preciso levar arte?** No 3D não: os modelos vêm de primitivas e prefabs, as texturas são desenhadas em código e o som é sintetizado, embora modelos `.glb` e texturas possam ser carregados de uma URL (Uniform Resource Locator, o endereço). No 2D você usa as suas imagens e sons.'),
        },
        {
          type: 'p',
          text: t('**Can AI make a 2D game?** EGM AI generates 3D games only. See [Building with AI](/guide/ai).', '**A IA consegue fazer um jogo 2D?** O EGM AI só gera jogos 3D. Veja [Criando com IA](/guide/ai).'),
        },
        {
          type: 'p',
          text: t('**Which browsers run the games?** Any modern browser with WebGL2, since both engines render with WebGL.', '**Quais navegadores executam os jogos?** Qualquer navegador moderno com WebGL2, já que as duas engines renderizam com WebGL.'),
        },
      ],
    },
    {
      id: 'building',
      title: t('Building a game', 'Construindo um jogo'),
      blocks: [
        {
          type: 'p',
          text: t('**Do I have to write TypeScript?** The engine is TypeScript-first and all examples are TypeScript, so that is the supported path. The projects `egm new` creates are strict TypeScript.', '**Preciso escrever TypeScript?** A engine é pensada para TypeScript e todos os exemplos estão em TypeScript, então esse é o caminho suportado. Os projetos que o `egm new` cria são TypeScript estrito.'),
        },
        {
          type: 'p',
          text: t('**How do I load an image in 2D?** Put it under `public/` and load it through the `AssetManager`. `Sprite.setUrl` loads and assigns the texture in one call:', '**Como carrego uma imagem no 2D?** Coloque-a em `public/` e carregue pelo `AssetManager`. `Sprite.setUrl` carrega e atribui a textura em uma chamada:'),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { App, Scene, Sprite } from 'easy-game-maker'
import type { SceneParams } from 'easy-game-maker'

class HeroScene extends Scene {
  override async onCreate(params?: SceneParams): Promise<void> {
    const app = params?.['app'] as App
    const hero = new Sprite({ x: 240, y: 160, width: 64, height: 64 })
    await hero.setUrl('assets/hero.png', app) // public/assets/hero.png
    this.add(hero)
  }
}

const app = new App({ width: 480, height: 320, backgroundColor: '#101827' })
app.init()
app.scenes.add('hero', HeroScene)
void app.scenes.go('hero', { params: { app } })
app.run()`,
        },
        {
          type: 'p',
          text: t('**Is multiplayer supported?** In 2D, `app.network` connects to a WebSocket server and joins rooms. The engine is only the client: you provide a server that implements the room protocol. There is no networking module in the 3D engine.', '**Multiplayer é suportado?** No 2D, `app.network` conecta a um servidor WebSocket e entra em salas. A engine é só o cliente: você fornece um servidor que implemente o protocolo de salas. Não há módulo de rede na engine 3D.'),
        },
        {
          type: 'p',
          text: t('**Where can I see complete games?** In the [Examples](/examples) gallery, for instance Pong, Tetris and Chess.', '**Onde vejo jogos completos?** Na galeria de [Exemplos](/examples), como Pong, Tetris e Xadrez.'),
        },
      ],
    },
    {
      id: 'project',
      title: t('The project itself', 'O projeto em si'),
      blocks: [
        {
          type: 'p',
          text: t('**What license is it under?** MIT. The package is published as `easy-game-maker`, version 0.2.0, requiring Node.js 18 or newer.', '**Qual é a licença?** MIT. O pacote é publicado como `easy-game-maker`, versão 0.2.0, e exige Node.js 18 ou mais novo.'),
        },
        {
          type: 'p',
          text: t('**Does the CLI work on Windows and Linux?** The simulator, editor, tests and E2E runner are Node.js tools and pick the right launcher per operating system. A desktop package for an operating system is best built on that operating system, because each target needs its own toolchain.', '**A CLI funciona no Windows e no Linux?** O simulador, o editor, os testes e o executor E2E são ferramentas Node.js e escolhem o lançador certo para cada sistema operacional. Um pacote desktop para um sistema operacional é melhor construído nesse mesmo sistema, porque cada alvo tem a própria cadeia de ferramentas.'),
        },
        {
          type: 'p',
          text: t('**Where do I report a bug?** In the issue tracker of the SDK repository: https://github.com/easygamemaker/easy-game-maker/issues. Include the output of `egm --version`, which reads the version from the package.', '**Onde reporto um bug?** No rastreador de issues do repositório do SDK (Software Development Kit): https://github.com/easygamemaker/easy-game-maker/issues. Inclua a saída de `egm --version`, que lê a versão do pacote.'),
        },
      ],
    },
  ],
}

export default page
