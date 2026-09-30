import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/guide/troubleshooting',
  title: t('Troubleshooting', 'Solução de Problemas'),
  description: t(
    'The errors and surprises people actually hit with the CLI, the 2D engine, the 3D engine and desktop builds, with the cause and the fix.',
    'Os erros e surpresas que as pessoas realmente encontram com a CLI (Command-Line Interface), a engine 2D, a engine 3D e os builds desktop, com a causa e a correção.',
  ),
  source: 'src/cli/commands',
  related: ['/guide/faq', '/installation', '/cli/simulate', '/cli/build', '/build/desktop'],
  sections: [
    {
      id: 'cli',
      title: t('CLI and simulator', 'CLI e simulador'),
      blocks: [
        {
          type: 'table',
          head: [t('Message or symptom', 'Mensagem ou sintoma'), t('Cause', 'Causa'), t('Fix', 'Correção')],
          rows: [
            [t('`egm: command not found`', '`egm: command not found`'), t('The global npm bin folder is not on `PATH`.', 'A pasta global de binários do npm não está no `PATH`.'), t('Add it to `PATH`, or reinstall with `npm install -g easy-game-maker`.', 'Adicione-a ao `PATH` ou reinstale com `npm install -g easy-game-maker`.')],
            [t('`egm.config.ts not found. Run inside a game project.`', '`egm.config.ts not found. Run inside a game project.`'), t('You are not in the project folder.', 'Você não está na pasta do projeto.'), t('`cd` into the folder that contains `egm.config.ts`.', 'Entre com `cd` na pasta que contém o `egm.config.ts`.')],
            [t('`node_modules not found. Run npm install first.` or `Vite not found`', '`node_modules not found. Run npm install first.` ou `Vite not found`'), t('Dependencies are not installed. The CLI starts the project\'s own Vite.', 'As dependências não estão instaladas. A CLI inicia o Vite do próprio projeto.'), t('Run `npm install` inside the game project.', 'Rode `npm install` dentro do projeto do jogo.')],
            [t('`Error: directory "x" already exists.`', '`Error: directory "x" already exists.`'), t('`egm new` never writes into an existing folder.', 'O `egm new` nunca escreve em uma pasta existente.'), t('Pick another name or remove the folder.', 'Escolha outro nome ou remova a pasta.')],
            [t('`--visual and --3d cannot be combined.`', '`--visual and --3d cannot be combined.`'), t('They are different project shapes.', 'São formatos de projeto diferentes.'), t('Use one flag.', 'Use apenas uma das opções.')],
            [t('`egm test` prints a Vitest error', '`egm test` imprime um erro do Vitest'), t('The project predates the scaffold that installs Vitest, so `vitest` is not in `node_modules`.', 'O projeto é anterior ao esqueleto que instala o Vitest, então o `vitest` não está em `node_modules`.'), t('Run `npm install -D vitest happy-dom` and add a `vitest.config.ts` (`egm test` prints this hint). See [Testing](/tools/testing).', 'Rode `npm install -D vitest happy-dom` e adicione um `vitest.config.ts` (o `egm test` imprime essa dica). Veja [Testes](/tools/testing).')],
            [t('`egm e2e` says "No E2E test files found"', '`egm e2e` diz "No E2E test files found"'), t('It only looks in `src/e2e/` for `*.e2e.ts` and `*.e2e.js`.', 'Ele só procura em `src/e2e/` por `*.e2e.ts` e `*.e2e.js`.'), t('Create `src/e2e/my-scenario.e2e.ts`.', 'Crie `src/e2e/my-scenario.e2e.ts`.')],
          ],
        },
      ],
    },
    {
      id: 'runtime-2d',
      title: t('2D engine', 'Engine 2D'),
      blocks: [
        {
          type: 'list',
          items: [
            t('**Empty canvas.** The scene was never made current: call `app.scenes.go(name)` after `app.scenes.add`, and `app.run()` last. Objects only draw once you `this.add(...)` them to the scene or to a group inside it.', '**Canvas vazio.** A cena nunca foi tornada atual: chame `app.scenes.go(name)` depois de `app.scenes.add`, e `app.run()` por último. Os objetos só aparecem depois de `this.add(...)` na cena ou em um grupo dentro dela.'),
            t('**`params` is `undefined`, or state is stale after going back to a scene.** Scenes are cached. `onCreate` runs once; later visits run `onResume` and ignore the new `params`. Reset in `onResume`, or call `app.scenes.destroyScene(name)`.', '**`params` é `undefined`, ou o estado está velho ao voltar a uma cena.** As cenas ficam em cache. O `onCreate` roda uma vez; as visitas seguintes rodam `onResume` e ignoram os novos `params`. Reinicie em `onResume` ou chame `app.scenes.destroyScene(name)`.'),
            t('**Things move at a different speed on another screen.** A per-frame step is missing `dt`. Use `x += speed * dt`.', '**As coisas andam em velocidade diferente em outra tela.** Falta o `dt` em um passo por quadro. Use `x += velocidade * dt`.'),
            t('**A tween is 1000 times too fast or slow.** `app.transitions` and the scene `duration` are in milliseconds, while `Camera` durations are in seconds.', '**Um tween está 1000 vezes rápido ou lento demais.** `app.transitions` e o `duration` da troca de cena são em milissegundos, enquanto as durações da `Camera` são em segundos.'),
            t('**Bodies never move.** A `PhysicsWorld` you create yourself must be stepped in `onUpdate`. Only `app.physics` is stepped automatically, and only with `new App({ physics: true })`.', '**Os corpos nunca se movem.** Um `PhysicsWorld` criado por você precisa ser avançado em `onUpdate`. Só o `app.physics` é avançado automaticamente, e apenas com `new App({ physics: true })`.'),
            t('**No collision callback fires.** The world emits `beginContact` and `endContact`, not `collision`.', '**Nenhum callback de colisão dispara.** O mundo emite `beginContact` e `endContact`, não `collision`.'),
            t('**The game does not react to keys.** Key events reach the game while the page has focus. The engine focuses the canvas on start and on every pointer press, so click the game once if focus went to another element.', '**O jogo não reage às teclas.** Os eventos de tecla chegam ao jogo enquanto a página tem foco. A engine dá foco ao canvas ao iniciar e a cada toque do ponteiro, então clique no jogo uma vez se o foco foi para outro elemento.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'The stale-state problem is the most common one. This scene resets in `onResume`, so it starts clean every time it is shown:',
            'O problema do estado velho é o mais comum. Esta cena reinicia em `onResume`, então começa limpa toda vez que é exibida:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { Scene, Text } from 'easy-game-maker'
import type { SceneParams } from 'easy-game-maker'

export class ResultScene extends Scene {
  private readonly label = new Text({ text: '', x: 240, y: 160, fontSize: 28, color: '#ffffff', align: 'center' })
  private score = 0

  override onCreate(params?: SceneParams): void {
    this.add(this.label)
    this.score = Number(params?.['score'] ?? 0) // first visit only
  }

  override onResume(): void {
    // runs on every visit: rebuild what depends on state
    this.label.text = \`Score: \${this.score}\`
  }
}`,
        },
      ],
    },
    {
      id: 'runtime-3d',
      title: t('3D engine', 'Engine 3D'),
      blocks: [
        {
          type: 'list',
          items: [
            t('**The jump flies, or fires twice.** It is wired to `input.down` instead of `input.pressed`.', '**O pulo voa ou dispara duas vezes.** Ele está ligado a `input.down` em vez de `input.pressed`.'),
            t('**`input.pressed(...)` is always false.** It is being read in `onLateUpdate`. One-frame input is cleared before late updates, so read it in `onUpdate`.', '**`input.pressed(...)` é sempre falso.** Ele está sendo lido em `onLateUpdate`. A entrada de um quadro é limpa antes dos late updates, então leia em `onUpdate`.'),
            t('**A type error passing `game` to `orbitCamera`, `firstPerson`, `createPostFX` or `debug.showStats`.** These four read fields that `game` does not have. Pass `game.engine`.', '**Erro de tipo ao passar `game` a `orbitCamera`, `firstPerson`, `createPostFX` ou `debug.showStats`.** Essas quatro leem campos que o `game` não tem. Passe `game.engine`.'),
            t('**The character floats above the ground with `platformer` and a body.** `platformer` copies the body position with no offset, so a model whose origin is at its feet sits one `radius` high. Parent the model to a group and lower it by the radius.', '**O personagem flutua acima do chão com `platformer` e um corpo.** O `platformer` copia a posição do corpo sem deslocamento, então um modelo com origem nos pés fica um `radius` mais alto. Coloque o modelo em um grupo e abaixe-o pelo raio.'),
            t('**Post-processing looks washed out or foggy.** Keep the bloom `threshold` high (around 0.9). On touch devices `quality: "auto"` skips post-processing on purpose.', '**O pós-processamento fica lavado ou enevoado.** Mantenha o `threshold` do bloom alto (perto de 0,9). Em dispositivos de toque, `quality: "auto"` pula o pós-processamento de propósito.'),
            t('**No sound at first.** Browsers block audio until a gesture. The engine unlocks it on the first click, tap or key press, so it is not a bug.', '**Sem som no começo.** Os navegadores bloqueiam áudio até um gesto. A engine o libera no primeiro clique, toque ou tecla, então não é um bug.'),
            t('**Two copies of three.js.** The engine expects `three` 0.185.x as a peer. A different version installed next to it can duplicate the library. Keep the version `egm new --3d` pinned.', '**Duas cópias do three.js.** A engine espera o `three` 0.185.x como peer. Outra versão instalada ao lado pode duplicar a biblioteca. Mantenha a versão que o `egm new --3d` fixou.'),
            t('**The tab freezes the game.** By design: `pauseWhenHidden` is on, so a background tab stops instead of returning with a spent power-up.', '**A aba congela o jogo.** É de propósito: `pauseWhenHidden` está ligado, então uma aba em segundo plano para, em vez de voltar com um power-up já gasto.'),
          ],
        },
      ],
    },
    {
      id: 'builds',
      title: t('Builds', 'Builds'),
      blocks: [
        {
          type: 'list',
          items: [
            t('**`The "ios" build target is not available yet.`** Expected. Only `egm build desktop` runs, and every other target exits with code 1. See [egm build](/cli/build).', '**`The "ios" build target is not available yet.`** É o esperado. Só o `egm build desktop` funciona, e todos os outros alvos encerram com código 1. Veja [egm build](/cli/build).'),
            t('**`Unknown platform "x". Valid: ...`** The name is not one of the known targets. **`Unknown OS "x" for desktop`**: use `macos`, `windows` or `linux`.', '**`Unknown platform "x". Valid: ...`** O nome não é um dos alvos conhecidos. **`Unknown OS "x" for desktop`**: use `macos`, `windows` ou `linux`.'),
            t('**`Config validation errors`.** `app.name`, `app.bundleId`, `display.width` and `display.height` are required.', '**`Config validation errors`.** `app.name`, `app.bundleId`, `display.width` e `display.height` são obrigatórios.'),
            t('**`swiftc failed` on macOS.** Install the command-line tools with `xcode-select --install`.', '**`swiftc failed` no macOS.** Instale as ferramentas de linha de comando com `xcode-select --install`.'),
            t('**"Rust not found" on Windows or Linux.** The Tauri project is generated in `dist/desktop/src-tauri`, but building needs Rust and `cargo install tauri-cli --version "^2"`. Run `cargo tauri build` there once they are installed.', '**"Rust not found" no Windows ou no Linux.** O projeto Tauri é gerado em `dist/desktop/src-tauri`, mas compilar exige Rust e `cargo install tauri-cli --version "^2"`. Rode `cargo tauri build` ali depois de instalá-los.'),
            t('**A type error on `build.desktop.targets`.** The type accepts `"mac"`, `"windows"` and `"linux"`, but scaffolds and examples from before 0.2.1 wrote `"dmg"`, `"msi"`, `"appimage"`. Replace them. The field is reserved and the builder does not read it yet: choose the OS with `egm build desktop <os>`.', '**Erro de tipo em `build.desktop.targets`.** O tipo aceita `"mac"`, `"windows"` e `"linux"`, mas esqueletos e exemplos anteriores à 0.2.1 escreviam `"dmg"`, `"msi"`, `"appimage"`. Troque os valores. O campo é reservado e o builder ainda não o lê: escolha o sistema com `egm build desktop <os>`.'),
          ],
        },
      ],
    },
    {
      id: 'devices',
      title: t('Phones and tunnels', 'Celulares e túneis'),
      blocks: [
        {
          type: 'list',
          items: [
            t('**EgmGO cannot reach the game.** The phone and the computer must be on the same network. The simulator serves on all interfaces and prints the network address next to `EgmGO:`. A firewall on the computer can block it.', '**O EgmGO não alcança o jogo.** O celular e o computador precisam estar na mesma rede. O simulador serve em todas as interfaces e imprime o endereço de rede ao lado de `EgmGO:`. Um firewall no computador pode bloqueá-lo.'),
            t('**Different networks, or a school or office network that isolates devices.** Use `egm simulate --tunnel`. See [ngrok Tunnel](/simulator/tunnel).', '**Redes diferentes, ou uma rede de escola ou escritório que isola dispositivos.** Use `egm simulate --tunnel`. Veja [Túnel ngrok](/simulator/tunnel).'),
            t('**`Tunnel failed`.** The simulator keeps running locally. Check that the ngrok download and auth token succeeded, and that nothing else uses ngrok\'s local port 4040.', '**`Tunnel failed`.** O simulador continua rodando localmente. Confira se o download e o token do ngrok deram certo, e se nada mais usa a porta local 4040 do ngrok.'),
          ],
        },
      ],
    },
  ],
}

export default page
