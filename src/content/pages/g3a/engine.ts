import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/engine',
  title: t('engine & createGame', 'engine & createGame'),
  description: t(
    'The loop, the renderer and createGame: options, the engine object, pausing, time scale and disposal.',
    'O loop, o renderizador e o createGame: opções, o objeto engine, pausa, escala de tempo e descarte.',
  ),
  source: 'easy-game-maker/src/engine3d/engine.ts',
  related: ['/3d/game-shape', '/3d/input', '/3d/controls', '/3d/postfx'],
  sections: [
    {
      id: 'create',
      title: t('createGame and createEngine', 'createGame e createEngine'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`createGame(options)` is the one call most games start with. It builds an engine, input, a HUD (Heads-Up Display, the interface over the canvas), audio, tweens and a probe, starts the loop and returns them in one flat object (see [The Shape of a Game](/3d/game-shape)). `createEngine(options)` is the renderer, scene, camera and loop on their own: you call `engine.start()` yourself.',
            'O `createGame(options)` é a chamada com que a maioria dos jogos começa. Ele monta uma engine, a entrada, um HUD (Heads-Up Display, a interface sobre o canvas), o áudio, os tweens e um probe, inicia o loop e devolve tudo em um objeto plano (veja [A Forma de um Jogo](/3d/game-shape)). O `createEngine(options)` é só o renderizador, a cena, a câmera e o loop: você chama o `engine.start()` por conta própria.',
          ),
        },
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`createGame`', '`createGame`'), t('`createGame(options?) => Game`', '`createGame(options?) => Game`'), t('Starts the loop before returning. Accepts every `createEngine` option plus `actions` and `hud`.', 'Inicia o loop antes de retornar. Aceita toda opção do `createEngine` mais `actions` e `hud`.')],
            [t('`createEngine`', '`createEngine`'), t('`createEngine(options?) => Engine`', '`createEngine(options?) => Engine`'), t('The renderer, scene, camera and loop on their own.', 'O renderizador, a cena, a câmera e o loop, sozinhos.')],
            [t('`disposeObject`', '`disposeObject`'), t('`disposeObject(root)`', '`disposeObject(root)`'), t('Frees the GPU (Graphics Processing Unit) memory behind an object and everything under it, then removes it from its parent.', 'Libera a memória da GPU (Graphics Processing Unit, a placa de vídeo) de um objeto e de tudo abaixo dele, e o remove do pai.')],
          ],
        },
      ],
    },
    {
      id: 'options',
      title: t('Options', 'Opções'),
      description: t('Shared by `createEngine` and `createGame`. All are optional.', 'Compartilhadas por `createEngine` e `createGame`. Todas são opcionais.'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'container', type: 'HTMLElement', default: 'document.body', description: t('Where the canvas goes.', 'Onde o canvas é colocado.') },
            { name: 'background', type: 'ColorRepresentation | null', default: '"#0a0a0a"', description: t('Scene background colour, or `null` for none.', 'Cor de fundo da cena, ou `null` para nenhuma.') },
            { name: 'fog', type: 'number | { color?, near?, far? } | null', default: 'none', description: t('A number is the density of exponential fog. An object is linear fog (`near` 10, `far` 80).', 'Um número é a densidade de névoa exponencial. Um objeto é névoa linear (`near` 10, `far` 80).') },
            { name: 'fov', type: 'number', default: '60', description: t('Camera field of view.', 'Campo de visão da câmera.') },
            { name: 'near', type: 'number', default: '0.1', description: t('Camera near plane.', 'Plano próximo da câmera.') },
            { name: 'far', type: 'number', default: '500', description: t('Camera far plane.', 'Plano distante da câmera.') },
            { name: 'cameraPosition', type: '[number, number, number]', default: '[0, 4, 10]', description: t('Initial camera position.', 'Posição inicial da câmera.') },
            { name: 'lookAt', type: '[number, number, number]', default: '[0, 0, 0]', description: t('Initial camera target.', 'Alvo inicial da câmera.') },
            { name: 'antialias', type: 'boolean', default: 'true', description: t('Renderer flag.', 'Flag do renderizador.') },
            { name: 'alpha', type: 'boolean', default: 'false', description: t('Renderer flag.', 'Flag do renderizador.') },
            { name: 'shadows', type: 'boolean', default: 'true', description: t('Enables the shadow map (soft PCF).', 'Ativa o shadow map (com PCF, Percentage-Closer Filtering, para sombras suaves).') },
            { name: 'maxPixelRatio', type: 'number', default: '2', description: t('Beyond 2 the extra pixels cost framerate and nobody can see them.', 'Acima de 2, os pixels extras custam framerate e ninguém os enxerga.') },
            { name: 'toneMapping', type: 'THREE.ToneMapping', default: 'ACES filmic', description: t('Output tone mapping.', 'Tone mapping da saída.') },
            { name: 'exposure', type: 'number', default: '1', description: t('Output exposure.', 'Exposição da saída.') },
            { name: 'pauseWhenHidden', type: 'boolean', default: 'true', description: t('A tab that loses focus stops, so the player does not come back to a spent power-up.', 'Uma aba que perde o foco pausa, para o jogador não voltar a um power-up já gasto.') },
            { name: 'rendererFactory', type: '() => Renderer', default: 'real THREE.WebGLRenderer', description: t('Supplies the renderer instead. Mostly for tests, so the loop runs without WebGL.', 'Fornece o renderizador no lugar do padrão. Serve sobretudo para testes, para o loop rodar sem WebGL.') },
          ],
        },
        {
          type: 'p',
          text: t(
            '`createGame` adds `actions` (extra or replacement key bindings, see [input](/3d/input)) and `hud` (options for the HUD, see [hud](/3d/hud)).',
            'O `createGame` acrescenta `actions` (atalhos de teclado extras ou substitutos, veja [input](/3d/input)) e `hud` (opções do HUD, veja [hud](/3d/hud)).',
          ),
        },
      ],
    },
    {
      id: 'engine-object',
      title: t('The engine object', 'O objeto engine'),
      blocks: [
        {
          type: 'props',
          title: t('Fields', 'Campos'),
          rows: [
            { name: 'renderer, scene, camera', type: 'THREE objects', description: t('The renderer, the scene and the `PerspectiveCamera`.', 'O renderizador, a cena e a `PerspectiveCamera`.') },
            { name: 'canvas, container', type: 'HTMLElement', description: t('The canvas and where it lives.', 'O canvas e onde ele mora.') },
            { name: 'clock', type: 'THREE.Clock', description: t('three.js has deprecated `Clock` since r183, so constructing it logs a console warning with three 0.185.1.', 'O three.js descontinuou o `Clock` desde a r183, então construí-lo registra um aviso no console com o three 0.185.1.') },
            { name: 'size', type: '{ width, height }', description: t('Size in CSS pixels.', 'Tamanho em pixels CSS (Cascading Style Sheets).') },
            { name: 'dt, elapsed, frame, fps', type: 'number', description: t('Per-frame values. `fps` is smoothed.', 'Valores por quadro. O `fps` é suavizado.') },
            { name: 'timeScale', type: 'number', default: '1', description: t('1 is normal speed. 0.3 is slow motion, 0 freezes while still rendering.', '1 é a velocidade normal. 0.3 é câmera lenta, 0 congela mas continua renderizando.') },
            { name: 'running, paused', type: 'boolean', readonly: true, description: t('Loop state.', 'Estado do loop.') },
          ],
        },
        {
          type: 'props',
          title: t('Methods', 'Métodos'),
          rows: [
            { name: 'onUpdate(fn)', type: '(dt, elapsed) => void', description: t('Runs every frame. Returns an unsubscribe.', 'Roda a cada quadro. Retorna uma função para cancelar.') },
            { name: 'onLateUpdate(fn)', type: '(dt, elapsed) => void', description: t('Runs after every `onUpdate`. Cameras belong here. Input\'s one-frame state is already cleared by then, so read it in `onUpdate`. Returns an unsubscribe.', 'Roda depois de todos os `onUpdate`. As câmeras ficam aqui. O estado de um quadro da entrada já foi limpo nesse ponto, então leia-o no `onUpdate`. Retorna uma função para cancelar.') },
            { name: 'onResize(fn)', type: '(width, height) => void', description: t('Runs now with the current size, then on every resize. Returns an unsubscribe.', 'Roda agora com o tamanho atual e depois a cada resize. Retorna uma função para cancelar.') },
            { name: 'add(first, ...rest)', type: 'Object3D', description: t('Adds objects to the scene and returns the first: `const p = game.add(models.character())`.', 'Adiciona objetos à cena e devolve o primeiro: `const p = game.add(models.character())`.') },
            { name: 'remove(...objects)', type: 'void', description: t('Removes objects from the scene. It does not free GPU memory: use `disposeObject`.', 'Remove objetos da cena. Não libera a memória da GPU: use `disposeObject`.') },
            { name: 'start(), stop()', type: 'void', description: t('Start or stop the loop. `start` returns the engine.', 'Inicia ou para o loop. O `start` devolve a engine.') },
            { name: 'pause(), resume()', type: 'void', description: t('While paused the scene still renders but no update runs and `frame` stands still. `resume` drains the delta accumulated while paused.', 'Enquanto pausado, a cena continua renderizando, mas nenhum update roda e o `frame` fica parado. O `resume` descarta o delta acumulado durante a pausa.') },
            { name: 'setRenderTarget(target)', type: 'RenderTarget | null', description: t('Hands rendering to something else that has `render()` (and optionally `setSize`). This is how [postfx](/3d/postfx) plugs in. `null` goes back to the plain renderer.', 'Passa a renderização a outra coisa que tenha `render()` (e opcionalmente `setSize`). É assim que o [postfx](/3d/postfx) se conecta. `null` volta ao renderizador simples.') },
            { name: 'dispose()', type: 'void', description: t('Stops the loop, removes its listeners, disposes the scene\'s objects and the renderer, removes the canvas.', 'Para o loop, remove seus listeners, descarta os objetos da cena e o renderizador, e remove o canvas.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Never write your own requestAnimationFrame loop', 'Nunca escreva seu próprio loop de requestAnimationFrame'),
          text: t(
            '`dt` is already clamped to at most 1/15 of a second (then multiplied by `timeScale`), so a backgrounded tab does not return with a two-second frame that throws everything through the floor.',
            'O `dt` já é limitado a no máximo 1/15 de segundo (e depois multiplicado pelo `timeScale`), então uma aba em segundo plano não volta com um quadro de dois segundos que joga tudo através do chão.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: pause and slow motion', 'Exemplo: pausa e câmera lenta'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { createGame, disposeObject, lights, models } from 'easy-game-maker/3d';

const game = createGame({
  background: '#0b1020',
  fog: { color: '#0b1020', near: 15, far: 60 },
  cameraPosition: [0, 5, 12],
});

lights.daylight(game.scene);
game.add(models.ground(60));

const crate = models.box(2, { color: '#a16207', position: [0, 1, 0] });
game.add(crate);

const offResize = game.onResize((width, height) => {
  console.log('canvas is now', width, 'x', height);
});

game.onUpdate((dt) => {
  crate.rotation.y += dt;
  // pressed() is true for exactly one frame, so read it in onUpdate.
  if (game.input.pressed('pause')) {
    if (game.engine.paused) game.engine.resume();
    else game.engine.pause();
  }
  // Hold sprint for slow motion.
  game.engine.timeScale = game.input.down('sprint') ? 0.3 : 1;
});

// When the level ends: unsubscribe, free GPU memory, then tear the game down.
export function endLevel(): void {
  offResize();
  game.remove(crate);
  disposeObject(crate);
  game.engine.dispose();
}
`,
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Behavior notes', 'Notas de comportamento'),
          text: t(
            'Each frame runs every `onUpdate` listener, then every `onLateUpdate` listener, in registration order. `engine.dispose()` does not dispose a post-processing composer: call `fx.dispose()` first, then `engine.dispose()`. `game.engine.dispose()` also tears down input, audio, the HUD, tweens and the `window.__EGM_GAME__` entry.',
            'Cada quadro roda todos os listeners de `onUpdate` e depois todos os de `onLateUpdate`, na ordem de registro. O `engine.dispose()` não descarta um composer de pós-processamento: chame `fx.dispose()` primeiro e depois `engine.dispose()`. O `game.engine.dispose()` também desmonta a entrada, o áudio, o HUD, os tweens e a entrada em `window.__EGM_GAME__`.',
          ),
        },
      ],
    },
    {
      id: 'types',
      title: t('Exported types', 'Tipos exportados'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`Game`, `GameOptions`, `GameProbeHandle` (the shape of `window.__EGM_GAME__`), `Engine`, `EngineOptions`, `FogOption`, `RenderTarget`, `RendererLike`, `UpdateFn` (`(dt, elapsed) => void`) and `ResizeFn`. `RendererLike` is the slice of `THREE.WebGLRenderer` the engine touches, which is what a `rendererFactory` must satisfy.',
            '`Game`, `GameOptions`, `GameProbeHandle` (o formato de `window.__EGM_GAME__`), `Engine`, `EngineOptions`, `FogOption`, `RenderTarget`, `RendererLike`, `UpdateFn` (`(dt, elapsed) => void`) e `ResizeFn`. O `RendererLike` é a fatia do `THREE.WebGLRenderer` que a engine toca, e é o que um `rendererFactory` precisa satisfazer.',
          ),
        },
      ],
    },
  ],
}

export default page
