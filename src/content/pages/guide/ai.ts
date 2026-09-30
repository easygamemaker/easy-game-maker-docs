import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/guide/ai',
  title: t('Building with AI', 'Criando com IA'),
  description: t(
    'EGM AI generates 3D browser games from a chat. How a turn works, what the agent can and cannot do, and how to write prompts that work.',
    'O EGM AI gera jogos 3D de navegador a partir de uma conversa. Como um turno funciona, o que o agente pode e não pode fazer e como escrever prompts que funcionam.',
  ),
  source: 'dist/engine3d/ENGINE.md',
  related: ['/guide/2d-or-3d', '/guide/recipes-3d', '/3d/game-shape', '/3d/probe'],
  sections: [
    {
      id: 'what-it-is',
      title: t('What EGM AI is', 'O que é o EGM AI'),
      blocks: [
        {
          type: 'p',
          text: t(
            'EGM AI is a separate product built on the same 3D engine documented in this site. You describe a game in a chat, an agent writes the files, and you play the result in the page. You keep talking to change it: each message is a new turn on the same game.',
            'O EGM AI é um produto separado, construído sobre a mesma engine 3D documentada neste site. Você descreve um jogo em uma conversa, um agente escreve os arquivos e você joga o resultado na própria página. Você continua conversando para alterá-lo: cada mensagem é um novo turno no mesmo jogo.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('3D only', 'Somente 3D'),
          text: t(
            'The product generates 3D games. There is no 2D mode in it. If you want a 2D game, build it with the SDK (Software Development Kit): see [Your First 2D Game](/first-game).',
            'O produto gera jogos 3D. Não existe modo 2D nele. Se você quer um jogo 2D, construa com o SDK (Software Development Kit, o kit de desenvolvimento): veja [Seu Primeiro Jogo 2D](/first-game).',
          ),
        },
      ],
    },
    {
      id: 'a-turn',
      title: t('How a turn works', 'Como um turno funciona'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('You send a message. The app forwards it, with your sign-in token, to the game agent.', 'Você envia uma mensagem. O aplicativo a encaminha, com o seu token de login, ao agente de jogos.'),
            t('The agent works in a private sandbox that is seeded with a small playable starter (a third-person game with coins) and the 3D engine bundle. Nobody else touches that sandbox.', 'O agente trabalha em um sandbox privado, semeado com um pequeno jogo jogável de partida (um jogo em terceira pessoa com moedas) e o bundle da engine 3D. Ninguém mais acessa esse sandbox.'),
            t('It reads and edits files with a fixed set of tools: `read_file`, `write_file`, `replace_text`, `list_files` and `delete_file`. A turn runs for at most 48 steps.', 'Ele lê e edita arquivos com um conjunto fixo de ferramentas: `read_file`, `write_file`, `replace_text`, `list_files` e `delete_file`. Um turno roda por no máximo 48 passos.'),
            t('You see its text and tool calls as they stream, and when the turn ends you play the updated game.', 'Você vê o texto e as chamadas de ferramenta conforme chegam em streaming e, quando o turno termina, joga a versão atualizada do jogo.'),
            t('The turn is charged against your credits.', 'O turno é cobrado dos seus créditos.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'The starter is `index.html`, `game.js` and `style.css`. The agent keeps `game.js` as the entry point and splits the rest into small modules, because one file cannot exceed 128 KiB. It cannot write into the engine folder: that copy of the engine and its manual are read-only.',
            'A base inicial é `index.html`, `game.js` e `style.css`. O agente mantém o `game.js` como ponto de entrada e divide o resto em módulos pequenos, porque um arquivo não pode passar de 128 KiB. Ele não consegue escrever na pasta da engine: essa cópia da engine e o manual dela são somente leitura.',
          ),
        },
      ],
    },
    {
      id: 'questions',
      title: t('When the agent asks you something', 'Quando o agente pergunta algo'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The agent is told to ship a playable first version with sensible defaults, not to interrogate you. It only asks when the answer changes the game materially, for example the genre or a control scheme that rules out the others. It asks one question at a time with up to four options, and the turn really pauses: it resumes from the same conversation once you answer.',
            'O agente é instruído a entregar uma primeira versão jogável com padrões sensatos, e não a interrogar você. Ele só pergunta quando a resposta muda o jogo de forma relevante, por exemplo o gênero ou um esquema de controle que exclui os outros. Ele faz uma pergunta por vez, com até quatro opções, e o turno realmente pausa: retoma a mesma conversa quando você responde.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'A paused question is only recoverable by trying to send another turn: the server answers with the pending question. Reloading the page without sending anything does not show it again.',
            'Uma pergunta pausada só pode ser recuperada tentando enviar outro turno: o servidor responde com a pergunta pendente. Recarregar a página sem enviar nada não a mostra de novo.',
          ),
        },
      ],
    },
    {
      id: 'prompts',
      title: t('Prompts that work', 'Prompts que funcionam'),
      blocks: [
        {
          type: 'list',
          items: [
            t('Name the core loop and the goal: "collect 10 orbs in 60 seconds while avoiding drones".', 'Diga o laço principal e o objetivo: "colete 10 orbes em 60 segundos desviando de drones".'),
            t('Say how it is controlled: WASD, a mouse, touch. The engine supports keyboard, mouse, touch and gamepad.', 'Diga como se controla: WASD, mouse, toque. A engine suporta teclado, mouse, toque e controle.'),
            t('Ask for one change per message after the first version. Small turns are cheaper and easier to undo.', 'Peça uma mudança por mensagem depois da primeira versão. Turnos pequenos custam menos e são mais fáceis de desfazer.'),
            t('Describe feel, not just rules: "a heavy jump with a small camera shake on landing".', 'Descreva a sensação, não só as regras: "um pulo pesado com um pequeno tremor de câmera ao pousar".'),
            t('Stay inside what the engine ships: primitives, generated textures, synthesised sound. There are no art or audio files to upload into the game.', 'Fique dentro do que a engine oferece: primitivas, texturas geradas e som sintetizado. Não há arquivos de arte ou áudio para enviar ao jogo.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'Because the agent works with the same engine you can use by hand, everything in [3D Recipes](/guide/recipes-3d) is also a good vocabulary for asking: "third-person with a follow camera", "coins as triggers with a score in the HUD", "hit feedback with particles and a shake".',
            'Como o agente trabalha com a mesma engine que você pode usar à mão, tudo em [Receitas 3D](/guide/recipes-3d) também é um bom vocabulário para pedir: "terceira pessoa com câmera que segue", "moedas como gatilhos com placar no HUD (Heads-Up Display)", "retorno de impacto com partículas e tremor".',
          ),
        },
      ],
    },
    {
      id: 'probe',
      title: t('Checking a game from the outside', 'Verificando um jogo por fora'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Every game made with `createGame` publishes `window.__EGM_GAME__`, with a frame counter and a `probe()` that returns whatever the game registered with `game.probe.register`. The agent is told to register the state that matters (player position, score, lives), so an outside checker can tell that the game is running and what state it is in. You can use the same hook in your own tests.',
            'Todo jogo feito com `createGame` publica `window.__EGM_GAME__`, com um contador de quadros e um `probe()` que devolve o que o jogo registrou com `game.probe.register`. O agente é instruído a registrar o estado que importa (posição do jogador, pontuação, vidas), para que um verificador externo saiba que o jogo está rodando e em que estado está. Você pode usar o mesmo gancho nos seus testes.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { createGame, lights, models } from 'easy-game-maker/3d'

const game = createGame({ background: '#0b1020', cameraPosition: [0, 5, 10] })
lights.daylight(game.scene)
game.add(models.ground(40))

const player = game.add(models.character())
let score = 0

game.probe.register('player', () => ({ x: player.position.x, z: player.position.z, score }))

game.onUpdate((dt) => {
  player.position.x += game.input.move.x * 6 * dt
  if (game.input.pressed('jump')) score += 1
})

// from a browser test or the devtools console:
//   window.__EGM_GAME__?.probe()  ->  { player: { x: 1.2, z: 0, score: 3 } }
export function readProbe(): Record<string, unknown> | null {
  return window.__EGM_GAME__?.probe() ?? null
}`,
        },
      ],
    },
  ],
}

export default page
