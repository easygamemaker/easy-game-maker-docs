import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/introduction',
  title: t('Introduction', 'Introdução'),
  description: t(
    'What Easy Game Maker is, what it ships today and how a game goes from TypeScript to a desktop app.',
    'O que é o Easy Game Maker, o que ele entrega hoje e como um jogo sai do TypeScript e vira um aplicativo desktop.',
  ),
  source: 'README.md',
  related: ['/installation', '/first-game', '/guide/2d-or-3d', '/guide/concepts'],
  sections: [
    {
      id: 'what-is-egm',
      title: t('What is Easy Game Maker', 'O que é o Easy Game Maker'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Easy Game Maker (EGM) is a TypeScript-first game engine for the browser. One package, `easy-game-maker`, gives you a 2D engine on WebGL2 and a 3D engine on three.js, plus a command-line tool called `egm` that scaffolds, runs and packages your game.',
            'O Easy Game Maker (EGM) é uma engine de jogos para o navegador, pensada para TypeScript. Um único pacote, `easy-game-maker`, entrega uma engine 2D sobre WebGL2, uma engine 3D sobre o three.js e uma ferramenta de linha de comando (CLI, Command-Line Interface) chamada `egm`, que cria, executa e empacota o seu jogo.',
          ),
        },
        {
          type: 'p',
          text: t(
            'Your game is plain TypeScript running in a canvas. There is no proprietary project format to learn: an EGM project is a Vite project with an `egm.config.ts` next to it.',
            'O seu jogo é TypeScript comum rodando em um canvas. Não existe formato de projeto proprietário para aprender: um projeto EGM é um projeto Vite com um `egm.config.ts` ao lado.',
          ),
        },
        {
          type: 'table',
          head: [t('Piece', 'Peça'), t('Import', 'Importação'), t('What it is', 'O que é')],
          rows: [
            [t('2D engine', 'Engine 2D'), t('`easy-game-maker`', '`easy-game-maker`'), t('`App`, scenes, sprites, shapes, physics (planck.js), tweens, audio, input, network.', '`App`, cenas, sprites, formas, física (planck.js), tweens, áudio, entrada e rede.')],
            [t('3D engine', 'Engine 3D'), t('`easy-game-maker/3d`', '`easy-game-maker/3d`'), t('`createGame`, models, lights, materials, HUD, sound, particles, post-processing.', '`createGame`, modelos, luzes, materiais, HUD (Heads-Up Display, a interface sobreposta ao jogo), som, partículas e pós-processamento.')],
            [t('CLI', 'CLI'), t('`egm`', '`egm`'), t('`new`, `simulate`, `build`, `test`, `e2e`, `editor`, `go`.', '`new`, `simulate`, `build`, `test`, `e2e`, `editor` e `go`.')],
          ],
        },
      ],
    },
    {
      id: 'status',
      title: t('Where it stands today', 'Onde o projeto está hoje'),
      blocks: [
        {
          type: 'p',
          text: t(
            'This documentation describes version 0.2.0. The engine, the simulator and the visual editor work. Packaging is the part that is still narrow.',
            'Esta documentação descreve a versão 0.2.0. A engine, o simulador e o editor visual funcionam. O empacotamento é a parte que ainda é restrita.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Only desktop builds run', 'Só o build desktop funciona'),
          text: t(
            '`egm build desktop` is the only build target available. `web`, `ios`, `android`, `tizen`, `webos`, `androidtv`, `tvos`, `xbox` and `playstation` print "not available yet" and exit with code 1. The builders exist in the code and will be opened one target at a time. An EGM Marketplace for publishing is planned, not shipped.',
            '`egm build desktop` é o único alvo de build disponível. `web`, `ios`, `android`, `tizen`, `webos`, `androidtv`, `tvos`, `xbox` e `playstation` imprimem "not available yet" e encerram com código 1. Os builders existem no código e serão abertos um alvo por vez. Um EGM Marketplace para publicação está planejado, mas ainda não existe.',
          ),
        },
        {
          type: 'p',
          text: t(
            'While the other targets are closed, the browser is your main runtime: `egm simulate` serves the game with live reload and device previews, and you can open it on a real phone with the EgmGO companion app.',
            'Enquanto os outros alvos estão fechados, o navegador é o seu runtime principal: `egm simulate` serve o jogo com recarga automática e prévias de dispositivos, e você pode abri-lo em um celular de verdade com o app companheiro EgmGO.',
          ),
        },
      ],
    },
    {
      id: 'shape-of-a-game',
      title: t('The shape of a game', 'A forma de um jogo'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A 2D game creates an `App`, registers scenes and starts the loop. Each scene builds its display objects in `onCreate` and moves them in `onUpdate(dt)`, where `dt` is the time since the last frame in seconds.',
            'Um jogo 2D cria um `App`, registra cenas e inicia o laço. Cada cena monta os objetos de exibição em `onCreate` e os move em `onUpdate(dt)`, onde `dt` é o tempo desde o último quadro, em segundos.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          code: `import { App, Scene, RectShape } from 'easy-game-maker'

class GameScene extends Scene {
  private readonly box = new RectShape({ x: 100, y: 250, width: 80, height: 80, fill: '#6c63ff' })

  override onCreate(): void {
    this.add(this.box)
  }

  override onUpdate(dt: number): void {
    this.box.x = (this.box.x + 120 * dt) % 800
  }
}

const app = new App({ width: 800, height: 500, backgroundColor: '#0a0a1a' })
app.init()
app.scenes.add('game', GameScene)
void app.scenes.go('game')
app.run()`,
        },
        {
          type: 'p',
          text: t(
            'A 3D game is even shorter, because `createGame` builds the renderer, the loop, input, HUD and sound for you. See [Your First 3D Game](/3d/quickstart).',
            'Um jogo 3D é ainda mais curto, porque `createGame` monta o renderizador, o laço, a entrada, o HUD e o som para você. Veja [Seu Primeiro Jogo 3D](/3d/quickstart).',
          ),
        },
      ],
    },
    {
      id: 'where-next',
      title: t('Where to go next', 'Para onde ir agora'),
      blocks: [
        {
          type: 'list',
          items: [
            t('[Installation](/installation): install the CLI and check your machine.', '[Instalação](/installation): instale a CLI e confira a sua máquina.'),
            t('[Your First 2D Game](/first-game): a complete small game, step by step.', '[Seu Primeiro Jogo 2D](/first-game): um jogo pequeno e completo, passo a passo.'),
            t('[2D or 3D?](/guide/2d-or-3d): pick the engine before you scaffold.', '[2D ou 3D?](/guide/2d-or-3d): escolha a engine antes de criar o projeto.'),
            t('[Core Concepts](/guide/concepts): the mental model shared by both engines.', '[Conceitos Fundamentais](/guide/concepts): o modelo mental comum às duas engines.'),
            t('[Building with AI](/guide/ai): generate a 3D game from a chat.', '[Criando com IA](/guide/ai): gere um jogo 3D a partir de uma conversa.'),
          ],
        },
      ],
    },
  ],
}

export default page
