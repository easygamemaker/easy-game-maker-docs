import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/guide/whats-new-0-3',
  title: t('What is new in 0.3 (2D)', 'Novidades da 0.3 (2D)'),
  description: t(
    'The 2D engine of Easy Game Maker 0.3 gets a fixed step, a seeded Rng, an ActionMap, atlases, animation clips and an audio layer. A map of the new pages and what changed for existing code.',
    'A engine 2D do Easy Game Maker 0.3 ganha passo fixo, um Rng com semente, um ActionMap, atlas, clipes de animação e uma camada de áudio. Um mapa das páginas novas e do que mudou para o código existente.',
  ),
  badge: 'NEW',
  related: ['/core/fixed-step', '/input/action-map', '/core/texture-atlas', '/animation/clips', '/audio/bus', '/guide/recipes-2d'],
  sections: [
    {
      id: 'summary',
      title: t('The release in one page', 'A versão em uma página'),
      blocks: [
        {
          type: 'p',
          text: t(
            "Version 0.3 makes the 2D engine exact frame by frame: a game can run its rules at a fixed rate, repeat a match from a seed, read input per action for several players, cut sprites from atlases and play clips with per-frame durations. Everything is **additive**: a game that uses none of it behaves exactly as before. The few changes of behavior are listed below.",
            "A versão 0.3 deixa a engine 2D exata quadro a quadro: um jogo pode rodar as regras em taxa fixa, repetir uma partida a partir de uma semente, ler a entrada por ação para vários jogadores, recortar sprites de atlas e tocar clipes com durações por quadro. Tudo é **aditivo**: um jogo que não usa nada disso se comporta exatamente como antes. As poucas mudanças de comportamento estão listadas abaixo.",
          ),
        },
        {
          type: 'table',
          head: [t('Area', 'Área'), t('What is new', 'O que há de novo'), t('Read', 'Leia')],
          rows: [
            [t('Time', 'Tempo'), t('`app.fixedUpdate`, `timeScale`, `paused`, `advance`, `Scene.onFixedUpdate` and `onRender`, `FixedStepLoop`, `HitStop`', '`app.fixedUpdate`, `timeScale`, `paused`, `advance`, `Scene.onFixedUpdate` e `onRender`, `FixedStepLoop`, `HitStop`'), t('[Fixed Step](/core/fixed-step)', '[Passo Fixo](/core/fixed-step)')],
            [t('Randomness', 'Aleatoriedade'), t('`Rng` (mulberry32) with `fork` and `state`; `ParticleEmitter` accepts an `rng`', '`Rng` (mulberry32) com `fork` e `state`; o `ParticleEmitter` aceita um `rng`'), t('[Rng](/core/rng)', '[Rng](/core/rng)')],
            [t('Input', 'Entrada'), t('`ActionMap`: actions, edges, latched taps, N players, rebinding, saving, synthetic input', '`ActionMap`: ações, bordas, toques travados, N jogadores, remapeamento, persistência, entrada sintética'), t('[ActionMap](/input/action-map)', '[ActionMap](/input/action-map)')],
            [t('Images', 'Imagens'), t('`Texture.region`, `TextureAtlas`, `Sprite.setFrame`, `TextureFilter` (`nearest` for pixel art)', '`Texture.region`, `TextureAtlas`, `Sprite.setFrame`, `TextureFilter` (`nearest` para pixel art)'), t('[TextureAtlas](/core/texture-atlas), [Textures](/core/textures)', '[TextureAtlas](/core/texture-atlas), [Textures](/core/textures)')],
            [t('Animation', 'Animação'), t('`Clip`, `clipIndex`, `AnimatedSprite.play(clip)`, `stepClip`, `seek`, `clipEvent`, `Tween.updateSeconds`', '`Clip`, `clipIndex`, `AnimatedSprite.play(clip)`, `stepClip`, `seek`, `clipEvent`, `Tween.updateSeconds`'), t('[Clips](/animation/clips), [Tween](/animation/tween)', '[Clipes](/animation/clips), [Tween](/animation/tween)')],
            [t('Audio', 'Áudio'), t('Autoplay unlock with a queue, buses and ducking, `sfx`, `music`, saved volumes, `pauseWhenHidden`', 'Desbloqueio do autoplay com fila, barramentos e ducking, `sfx`, `music`, volumes salvos, `pauseWhenHidden`'), t('[AudioManager](/audio/manager), [AudioBus](/audio/bus), [SfxPlayer](/audio/sfx), [MusicPlayer](/audio/music)', '[AudioManager](/audio/manager), [AudioBus](/audio/bus), [SfxPlayer](/audio/sfx), [MusicPlayer](/audio/music)')],
            [t('Scenes', 'Cenas'), t('`onResume(params)`, `SceneManager.restart`', '`onResume(params)`, `SceneManager.restart`'), t('[Scene](/core/scene)', '[Scene](/core/scene)')],
            [t('Tests', 'Testes'), t('`createMockApp` covers the whole `App`, typed against the real classes', '`createMockApp` cobre o `App` inteiro, tipado contra as classes reais'), t('[Testing](/tools/testing)', '[Testes](/tools/testing)')],
          ],
        },
        {
          type: 'p',
          text: t(
            "Two recipes tie it together: [a deterministic simulation with an interpolated view, and slicing a sprite sheet](/guide/recipes-2d).",
            "Duas receitas amarram tudo: [uma simulação determinística com visual interpolado, e o fatiamento de uma folha de sprites](/guide/recipes-2d).",
          ),
        },
      ],
    },
    {
      id: 'changes',
      title: t('What changed for existing code', 'O que mudou para o código existente'),
      blocks: [
        {
          type: 'list',
          items: [
            t('**Audio before the first gesture.** `AudioManager.play` and `playOnChannel` used to start sounds on a context the browser had not allowed to run, and nothing was heard after the click. They now queue the request (up to 32, dropped after 2 seconds) and play it at the unlock. With the context already running, nothing changed. See [AudioManager](/audio/manager).', '**Áudio antes do primeiro gesto.** O `AudioManager.play` e o `playOnChannel` iniciavam sons em um contexto que o navegador ainda não deixava rodar, e nada era ouvido depois do clique. Agora eles enfileiram o pedido (até 32, descartado após 2 segundos) e o tocam no desbloqueio. Com o contexto já rodando, nada mudou. Veja [AudioManager](/audio/manager).'),
            t('**Cached scenes.** `Scene.onResume` now receives the `params` of the `go` call. Overrides without the argument keep working. `SceneManager.restart(name, params)` rebuilds a scene from scratch. See [Scene](/core/scene).', '**Cenas em cache.** O `Scene.onResume` agora recebe os `params` da chamada de `go`. Sobrescritas sem o argumento continuam funcionando. O `SceneManager.restart(name, params)` reconstrói uma cena do zero. Veja [Scene](/core/scene).'),
            t('**`AnimatedSprite.playRange(0, 0, ...)`** and any range ending at frame 0 used to play the whole clip, because frame 0 was read as "no range". A single-frame range now works.', '**`AnimatedSprite.playRange(0, 0, ...)`** e qualquer intervalo que termine no quadro 0 tocavam o clipe inteiro, porque o quadro 0 era lido como "sem intervalo". Agora um intervalo de um só quadro funciona.'),
            t('**`createMockApp`** had a `timers` stub with `schedule` and `cancel` instead of the real `after` and `every`, and lacked `gamepad` and the texture helpers. Fixed. See [Testing](/tools/testing).', 'O **`createMockApp`** tinha um stub de `timers` com `schedule` e `cancel` no lugar de `after` e `every`, e não tinha `gamepad` nem os auxiliares de textura. Corrigido. Veja [Testes](/tools/testing).'),
            t('**New documentation of old behavior:** `Tween.update` takes milliseconds (use `updateSeconds`), `App.init` runs synchronously, `renderer.uploadTexture` is idempotent per key, `PhysicsWorld.planckWorld` is the escape hatch to planck and `PhysicsWorld.step` takes a variable `dt` with `physics: true`, and a camera shake follows the `dt` you give it.', '**Documentação nova de comportamento antigo:** `Tween.update` recebe milissegundos (use `updateSeconds`), `App.init` roda de forma síncrona, `renderer.uploadTexture` é idempotente por chave, `PhysicsWorld.planckWorld` é a saída para o planck e `PhysicsWorld.step` recebe um `dt` variável com `physics: true`, e o tremor da câmera segue o `dt` que você entrega a ele.'),
          ],
        },
      ],
    },
    {
      id: 'next',
      title: t("What is coming", 'O que vem a seguir'),
      blocks: [
        {
          type: 'p',
          text: t(
            "The SDK repository keeps a [2D roadmap](https://github.com/easygamemaker/easy-game-maker/blob/main/docs/roadmap-2d.md) with the planned work by milestone: the rest of the `ActionMap` (touch, command buffer), a juice kit and a tween manager, a camera rig, a testing and automation kit, hitboxes and a first interface kit for 0.4, then asset packing, a frame state machine, deterministic arcade physics and round flow for 0.5. The roadmap is written in Portuguese and may change; treat it as a plan, not a promise.",
            "O repositório do SDK (Software Development Kit) mantém um [roadmap 2D](https://github.com/easygamemaker/easy-game-maker/blob/main/docs/roadmap-2d.md) com o trabalho planejado por marco: o restante do `ActionMap` (toque, buffer de comandos), um kit de efeitos (juice) e um gerenciador de tweens, um rig de câmera, um kit de testes e automação, hitboxes e uma primeira parte do kit de interface na 0.4, e depois empacotamento de assets, uma máquina de estados por quadro, física arcade determinística e fluxo de rounds na 0.5. O roadmap pode mudar; trate-o como um plano, não como uma promessa.",
          ),
        },
      ],
    },
  ],
}

export default page
