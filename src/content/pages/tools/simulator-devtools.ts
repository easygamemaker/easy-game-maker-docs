import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/simulator/devtools',
  title: t('DevTools', 'DevTools'),
  description: t(
    'Two tools in the simulator header: X-Ray, which draws bounds and physics bodies over the game, and Record E2E, which turns your play session into a test file.',
    'Duas ferramentas no cabeçalho do simulador: o X-Ray, que desenha limites e corpos de física sobre o jogo, e o Record E2E, que transforma a sua sessão de jogo em um arquivo de teste.',
  ),
  source: 'src/cli/simulator/template.ts',
  related: ['/simulator/overview', '/cli/e2e', '/tools/testing', '/physics/world', '/debug/hud'],
  sections: [
    {
      id: 'xray',
      title: t('X-Ray overlay', 'Overlay X-Ray'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The **X-Ray** button in the simulator header toggles a transparent canvas laid over the game. Every frame it walks the scene graph and draws a wireframe for each display object, plus every physics body of `app.physics`. It reads the running app from `window.__EGM_APP__`, which `App.init()` sets, so it is a tool for 2D games. If the app is not there yet, it shows "waiting for __EGM_APP__".',
            'O botão **X-Ray** no cabeçalho do simulador liga uma camada de canvas transparente sobre o jogo. A cada quadro ele percorre o grafo de cena e desenha um contorno para cada objeto de exibição, mais todos os corpos de física de `app.physics`. Ele lê o app em execução de `window.__EGM_APP__`, que o `App.init()` define, então é uma ferramenta para jogos 2D. Se o app ainda não existir, mostra "waiting for __EGM_APP__".',
          ),
        },
        {
          type: 'table',
          head: [t('Object', 'Objeto'), t('Drawn as', 'Desenhado como')],
          rows: [
            [t('`RectShape`', '`RectShape`'), t('Yellow rectangle with a size label', 'Retângulo amarelo com rótulo de tamanho')],
            [t('`CircleShape`', '`CircleShape`'), t('Cyan circle with the radius', 'Círculo ciano com o raio')],
            [t('`Sprite`, `AnimatedSprite`', '`Sprite`, `AnimatedSprite`'), t('Blue rectangle with the size', 'Retângulo azul com o tamanho')],
            [t('`Text`', '`Text`'), t('Purple rectangle', 'Retângulo roxo')],
            [t('`LineShape`', '`LineShape`'), t('Dashed rose line', 'Linha rosa tracejada')],
            [t('`Group`, `Scene`', '`Group`, `Scene`'), t('Green cross at the origin', 'Cruz verde na origem')],
            [t('Physics body', 'Corpo de física'), t('Red (dynamic), orange (kinematic), dark blue (static); sensors are dashed yellow', 'Vermelho (dinâmico), laranja (cinemático), azul escuro (estático); sensores em amarelo tracejado')],
          ],
        },
        {
          type: 'p',
          text: t(
            'A badge in the header shows ON or OFF. Use it to see why a click misses (the bounds are not where the art is), why two bodies do not collide (a sensor is drawn dashed) and how many objects a scene really holds.',
            'Um selo no cabeçalho mostra ON ou OFF. Use-o para ver por que um clique erra (os limites não estão onde a arte está), por que dois corpos não colidem (um sensor é desenhado tracejado) e quantos objetos uma cena realmente tem.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'X-Ray only sees what `app.physics` owns. A `PhysicsWorld` you create yourself inside a scene is not listed there, so its bodies are not drawn. For those, call `world.debugDraw(group)` each frame, as described in [PhysicsWorld](/physics/world).',
            'O X-Ray só enxerga o que o `app.physics` possui. Um `PhysicsWorld` que você cria dentro de uma cena não está listado ali, então seus corpos não são desenhados. Para esses, chame `world.debugDraw(group)` a cada quadro, como descrito em [PhysicsWorld](/physics/world).',
          ),
        },
      ],
    },
    {
      id: 'record',
      title: t('Record E2E', 'Record E2E'),
      blocks: [
        {
          type: 'p',
          text: t(
            '**Record E2E** captures what you do in the game and generates a test for [egm e2e](/cli/e2e).',
            'O **Record E2E** captura o que você faz no jogo e gera um teste para o [egm e2e](/cli/e2e).',
          ),
        },
        {
          type: 'list',
          ordered: true,
          items: [
            t('Click **Record E2E**. A dialog warns that the game will restart, to begin from a clean state.', 'Clique em **Record E2E**. Um diálogo avisa que o jogo vai reiniciar, para começar de um estado limpo.'),
            t('Play. Pointer clicks, taps, drags and swipes, keyboard input and the timing between them are recorded.', 'Jogue. Cliques, toques, arrastos e gestos de deslizar do ponteiro, a entrada de teclado e o tempo entre eles são gravados.'),
            t('Click the button again (it reads REC while active). A dialog shows the generated TypeScript.', 'Clique no botão de novo (ele mostra REC enquanto está ativo). Um diálogo mostra o TypeScript gerado.'),
            t('Copy it and save it as `src/e2e/my-scenario.e2e.ts` in your project.', 'Copie e salve como `src/e2e/my-scenario.e2e.ts` no seu projeto.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'Coordinates are converted to game space, so the script is independent of the device preset and of how the frame was scaled. Expect output shaped like this, then add assertions:',
            'As coordenadas são convertidas para o espaço do jogo, então o script independe do preset de dispositivo e da escala da moldura. Espere uma saída neste formato e depois acrescente as asserções:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/e2e/my-scenario.e2e.ts',
          check: 'skip',
          code: `import { test } from 'easy-game-maker/e2e'

test('recorded 2026-09-30 10:15', async ({ game }) => {
  await game.wait(2200)
  await game.tap(284, 240)
  await game.wait(1500)
  await game.drag(185, 192, 24, 231, { duration: 900 })
  await game.key('ArrowRight', { hold: 300 })
})`,
        },
      ],
    },
    {
      id: 'assertions',
      title: t('Make a recording fail when it should', 'Faça uma gravação falhar quando deve'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A recorded script only replays inputs. Add checks with `game.expect.scene` and `game.expect.state` so the test can fail. This helper shows a state check on the page that the runner evaluates, written so it type-checks on its own:',
            'Um script gravado só reproduz entradas. Acrescente verificações com `game.expect.scene` e `game.expect.state` para que o teste possa falhar. Este auxiliar mostra uma checagem de estado sobre a página que o executor avalia, escrita para passar na checagem de tipos sozinha:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import type { App } from 'easy-game-maker'

// the same condition you would pass to game.expect.state((win) => ...)
export function isOnScene(win: Window, name: string): boolean {
  const app = (win as unknown as { __EGM_APP__?: App }).__EGM_APP__
  return app?.scenes.currentName === name
}`,
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'Recording starts from a game restart and injects listeners into the game frame after about 800 ms. If your game takes longer than that to create its canvas, the recorder retries until it finds one, but the first moments can be missed.',
            'A gravação começa de um reinício do jogo e injeta os ouvintes no frame do jogo após cerca de 800 ms. Se o seu jogo demora mais que isso para criar o canvas, o gravador tenta de novo até encontrá-lo, mas os primeiros instantes podem ser perdidos.',
          ),
        },
      ],
    },
  ],
}

export default page
