import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/overview',
  title: t('3D Engine Overview', 'Visão Geral da Engine 3D'),
  description: t(
    'A map of the whole 3D engine: how to import it, what each module does and which page documents it.',
    'Um mapa de toda a engine 3D: como importar, o que cada módulo faz e qual página documenta cada um.',
  ),
  badge: 'NEW',
  source: 'easy-game-maker/src/engine3d/index.ts',
  related: ['/3d/quickstart', '/3d/game-shape', '/3d/engine'],
  sections: [
    {
      id: 'what-it-is',
      title: t('What it is', 'O que é'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`easy-game-maker/3d` is a 3D game engine built on three.js. It exists because every browser game needs the same hundred lines before it needs anything of its own: colour space, pixel ratio, a resize handler, a delta-timed loop, and input that can tell "held" from "just pressed". The engine ships those pieces so you write the game instead of the renderer.',
            '`easy-game-maker/3d` é uma engine de jogos 3D construída sobre o three.js. Ela existe porque todo jogo de navegador precisa das mesmas cem linhas antes de precisar de qualquer coisa própria: espaço de cor, pixel ratio, tratamento de resize, um loop com delta de tempo e uma entrada que distingue "segurando" de "acabou de apertar". A engine já traz essas peças, e você escreve o jogo em vez do renderizador.',
          ),
        },
        {
          type: 'p',
          text: t(
            '`three` is a peer dependency (0.185.x): the engine imports it and never bundles it. The engine version is exported as the string `ENGINE3D_VERSION` (currently `"0.2.0"`).',
            '`three` é uma dependência peer (0.185.x): a engine importa o three e nunca o embute. A versão da engine é exportada como a string `ENGINE3D_VERSION` (hoje `"0.2.0"`).',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Build status', 'Situação do build'),
          text: t(
            'Today `egm build` only works for desktop. The other platforms are not available yet, and the EGM Marketplace is planned.',
            'Hoje o `egm build` só funciona para desktop. As outras plataformas ainda não estão disponíveis, e o EGM Marketplace está planejado.',
          ),
        },
      ],
    },
    {
      id: 'import',
      title: t('One import, seven namespaces', 'Um import, sete namespaces'),
      description: t(
        'Modules are grouped as namespaces so names stay short without colliding.',
        'Os módulos são agrupados em namespaces para os nomes ficarem curtos sem colidir.',
      ),
      blocks: [
        {
          type: 'table',
          head: [t('Namespace', 'Namespace'), t('What is inside', 'O que contém'), t('Page', 'Página')],
          rows: [
            [t('`math`', '`math`'), t('numbers, smoothing, random, easing', 'números, suavização, aleatório, easing'), t('[math](/3d/math)', '[math](/3d/math)')],
            [t('`models`', '`models`'), t('primitives, prefabs, instancing, pools, loaders', 'primitivos, prefabs, instâncias, pools, loaders'), t('[models](/3d/models)', '[models](/3d/models)')],
            [t('`materials`', '`materials`'), t('colours, surfaces, textures drawn in code', 'cores, superfícies, texturas desenhadas no código'), t('[materials](/3d/materials)', '[materials](/3d/materials)')],
            [t('`lights`', '`lights`'), t('light rigs, attached lights, blob shadows', 'kits de luz, luzes anexadas, sombras blob'), t('[lights](/3d/lights)', '[lights](/3d/lights)')],
            [t('`effects`', '`effects`'), t('particles, shockwaves, trails, ambience', 'partículas, ondas de choque, rastros, ambiente'), t('[effects](/3d/effects)', '[effects](/3d/effects)')],
            [t('`anim`', '`anim`'), t('tweens, springs, shake, flash, mixer', 'tweens, molas, tremor, flash, mixer'), t('[animation](/3d/animation)', '[animation](/3d/animation)')],
            [t('`debug`', '`debug`'), t('stats, helpers, collider view, throttled log', 'estatísticas, helpers, visão de colisores, log limitado'), t('[debug](/3d/debug)', '[debug](/3d/debug)')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Where a name exists both flat and in a namespace it is the same value: `ease` is `math.ease` and `anim.ease`, `createParticles` is `effects.createParticles`, `palette` is `materials.palette`.',
            'Quando um nome existe solto e dentro de um namespace, é o mesmo valor: `ease` é `math.ease` e `anim.ease`, `createParticles` é `effects.createParticles`, `palette` é `materials.palette`.',
          ),
        },
      ],
    },
    {
      id: 'map',
      title: t('The reference map', 'O mapa da referência'),
      description: t(
        'Everything the engine exports as a flat name, grouped by the page that documents it.',
        'Tudo o que a engine exporta como nome solto, agrupado pela página que o documenta.',
      ),
      blocks: [
        {
          type: 'table',
          head: [t('Page', 'Página'), t('Flat exports', 'Exports soltos')],
          rows: [
            [t('[engine & createGame](/3d/engine)', '[engine & createGame](/3d/engine)'), t('`createGame`, `createEngine`, `disposeObject`', '`createGame`, `createEngine`, `disposeObject`')],
            [t('[input](/3d/input)', '[input](/3d/input)'), t('`createInput`', '`createInput`')],
            [t('[controls](/3d/controls)', '[controls](/3d/controls)'), t('`orbitCamera`, `followCamera`, `topDownCamera`, `sideCamera`, `firstPerson`, `thirdPerson`, `platformer`, `pointerOnGround`, `pointerPicker`', '`orbitCamera`, `followCamera`, `topDownCamera`, `sideCamera`, `firstPerson`, `thirdPerson`, `platformer`, `pointerOnGround`, `pointerPicker`')],
            [t('[physics](/3d/physics)', '[physics](/3d/physics)'), t('`createPhysics`, `hits`, `inside`', '`createPhysics`, `hits`, `inside`')],
            [t('[state](/3d/state)', '[state](/3d/state)'), t('`createStateMachine`, `createScore`, `createStorage`, `createTimer`, `createTicker`, `createCooldown`, `createDifficulty`, `createEvents`, `formatTime`', '`createStateMachine`, `createScore`, `createStorage`, `createTimer`, `createTicker`, `createCooldown`, `createDifficulty`, `createEvents`, `formatTime`')],
            [t('[models](/3d/models), [materials](/3d/materials), [lights](/3d/lights)', '[models](/3d/models), [materials](/3d/materials), [lights](/3d/lights)'), t('`palette`, `brand` (plus the namespaces)', '`palette`, `brand` (mais os namespaces)')],
            [t('[postfx](/3d/postfx), [effects](/3d/effects)', '[postfx](/3d/postfx), [effects](/3d/effects)'), t('`createPostFX`, `createParticles`, `createTrail`, `createAmbience`, `shockwave`', '`createPostFX`, `createParticles`, `createTrail`, `createAmbience`, `shockwave`')],
            [t('[animation](/3d/animation)', '[animation](/3d/animation)'), t('`createTweens`, `createMixer`, `createShake`, `Spring`, `SpringVec3`, `flash`, `pop`, `hover`, `ease`', '`createTweens`, `createMixer`, `createShake`, `Spring`, `SpringVec3`, `flash`, `pop`, `hover`, `ease`')],
            [t('[sound](/3d/sound), [hud](/3d/hud)', '[sound](/3d/sound), [hud](/3d/hud)'), t('`createAudio`, `createHud`', '`createAudio`, `createHud`')],
            [t('[probe](/3d/probe)', '[probe](/3d/probe)'), t('`createProbe`', '`createProbe`')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Two more pages cover the shape of what you get back: [The Shape of a Game](/3d/game-shape) for the `createGame` result and the `window` markers, and [math](/3d/math) and [debug](/3d/debug) for the tooling namespaces. [postfx](/3d/postfx) is the bloom, vignette and antialiasing pass.',
            'Duas páginas cobrem o formato do que você recebe de volta: [A Forma de um Jogo](/3d/game-shape) para o resultado do `createGame` e os marcadores em `window`, e [math](/3d/math) e [debug](/3d/debug) para os namespaces de ferramental. O [postfx](/3d/postfx) é a passada de bloom, vinheta e antialiasing.',
          ),
        },
      ],
    },
    {
      id: 'conventions',
      title: t('Conventions and rules', 'Convenções e regras'),
      blocks: [
        {
          type: 'list',
          items: [
            t('y is up and `-Z` is forward (three.js). Distances are world units, angles are radians and time is in seconds.', 'O eixo y aponta para cima e `-Z` é a frente (three.js). Distâncias são em unidades do mundo, ângulos em radianos e tempo em segundos.'),
            t('Anything moved per frame is multiplied by `dt`. Anything smoothed goes through `math.damp` or a spring.', 'Tudo o que se move por quadro é multiplicado por `dt`. Tudo o que é suavizado passa por `math.damp` ou por uma mola.'),
            t('Import from `easy-game-maker/3d`. Do not copy or patch the engine: wrap it, or write your own version in your own file.', 'Importe de `easy-game-maker/3d`. Não copie nem altere a engine: envolva-a, ou escreva a sua própria versão no seu arquivo.'),
            t('Tear down what you build. `disposeObject` frees GPU (Graphics Processing Unit) memory for objects taken out of the scene, and every module with `dispose` or `stop` expects it to be called when the game or the level ends.', 'Desmonte o que você constrói. `disposeObject` libera a memória da GPU (Graphics Processing Unit, a placa de vídeo) dos objetos retirados da cena, e todo módulo com `dispose` ou `stop` espera que ele seja chamado quando o jogo ou a fase termina.'),
            t('Take debug helpers (`debug.showStats`, `debug.showHelpers`, `debug.showColliders`, `debug.log`) out before you ship.', 'Tire os helpers de debug (`debug.showStats`, `debug.showHelpers`, `debug.showColliders`, `debug.log`) antes de publicar.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'The TypeScript types ship with the package and are exported by name from the same import, for example `import type { Game, Engine, Physics } from "easy-game-maker/3d"`.',
            'Os tipos TypeScript vêm no pacote e são exportados por nome do mesmo import, por exemplo `import type { Game, Engine, Physics } from "easy-game-maker/3d"`.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('A first look', 'Uma primeira olhada'),
      blocks: [
        {
          type: 'p',
          text: t(
            'This is a running, lit, input-driven scene. `createGame` starts the loop itself, so there is nothing to call afterwards.',
            'Esta é uma cena rodando, iluminada e ligada à entrada. O `createGame` inicia o loop sozinho, então não há nada para chamar depois.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { createGame, lights, models } from 'easy-game-maker/3d';

const game = createGame({ background: '#0b1020', cameraPosition: [0, 6, 12] });

lights.sunset(game.scene);
game.add(models.ground(80));

const player = models.character();
game.add(player);

game.onUpdate((dt) => {
  player.position.x += game.input.move.x * 6 * dt;
  if (game.input.pressed('jump')) game.audio.play('jump');
});
`,
        },
        {
          type: 'p',
          text: t(
            'Ready to build one from scratch? Follow [Your First 3D Game](/3d/quickstart).',
            'Quer montar um do zero? Siga [Seu Primeiro Jogo 3D](/3d/quickstart).',
          ),
        },
      ],
    },
  ],
}

export default page
