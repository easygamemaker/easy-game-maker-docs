import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/postfx',
  title: t('postfx', 'postfx'),
  description: t(
    'Bloom, vignette and FXAA through createPostFX, with automatic fallback on phones and in environments without WebGL.',
    'Bloom, vinheta e FXAA com createPostFX, com queda automática em celulares e em ambientes sem WebGL.',
  ),
  source: 'src/engine3d/postfx.ts',
  related: ['/3d/materials', '/3d/lights', '/3d/engine', '/3d/probe'],
  sections: [
    {
      id: 'overview',
      title: t('The pass that makes it look like a game', 'O passe que faz parecer um jogo'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`createPostFX(engine, { bloom, vignette, fxaa, quality })` builds an effect chain. Bloom is the one that matters: it makes an emissive material read as something glowing rather than something painted bright, and it is why neon, lasers and power-ups look like themselves. Pair it with `materials.glow()`.',
            '`createPostFX(engine, { bloom, vignette, fxaa, quality })` monta uma cadeia de efeitos. O bloom é o que importa: ele faz um material emissivo parecer algo que brilha, e não algo pintado de claro, e é por causa dele que neon, lasers e power-ups parecem eles mesmos. Combine com `materials.glow()`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Bloom on a glowing orb', 'Bloom numa esfera brilhante'),
          code: `import { createGame, models, lights, materials, createPostFX } from 'easy-game-maker/3d'

const game = createGame({ background: '#05060d', cameraPosition: [0, 2, 6] })
lights.night(game.scene)
game.add(models.sphere(0.8, { material: materials.glow('#22d3ee', { intensity: 2 }), position: [0, 1, 0] }))

// Pass game.engine, not game: the chain reads size and setRenderTarget.
const fx = createPostFX(game.engine, {
  bloom: { strength: 0.8, threshold: 0.9 },
  vignette: true,
  fxaa: true,
})

if (fx.enabled) {
  fx.passes.bloom!.strength = 1.1
}`,
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Pass game.engine', 'Passe game.engine'),
          text: t(
            '`createPostFX` reads `size` and `setRenderTarget`, which `game` does not have. It is one of four functions that need `game.engine` (with `orbitCamera`, `firstPerson` and `debug.showStats`).',
            '`createPostFX` lê `size` e `setRenderTarget`, que o `game` não tem. Ela é uma das quatro funções que exigem `game.engine` (junto com `orbitCamera`, `firstPerson` e `debug.showStats`).',
          ),
        },
      ],
    },
    {
      id: 'options',
      title: t('Options', 'Opções'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'bloom', type: 'boolean | { strength, radius, threshold }', default: 'true', description: t('`true` for the defaults, or `{ strength = 0.55, radius = 0.5, threshold = 0.85 }`. Restrained on purpose: strong bloom washes out the scene. Keep the threshold high (around 0.9); a low one blooms the whole image into fog.', '`true` para os padrões, ou `{ strength = 0.55, radius = 0.5, threshold = 0.85 }`. Contido de propósito: bloom forte lava a cena. Mantenha o threshold alto (perto de 0,9); um baixo transforma a imagem toda em névoa.') },
            { name: 'vignette', type: 'boolean | { offset, darkness }', default: 'false', description: t('`true` or `{ offset = 1.1, darkness = 1.1 }`: darkened edges.', '`true` ou `{ offset = 1.1, darkness = 1.1 }`: bordas escurecidas.') },
            { name: 'fxaa', type: 'boolean', default: 'false', description: t('FXAA (Fast Approximate Anti-Aliasing), needed because the composer disables the renderer\'s own antialiasing.', 'FXAA (Fast Approximate Anti-Aliasing, suavização rápida de serrilhado), necessário porque o composer desliga o antialiasing do próprio renderer.') },
            { name: 'quality', type: "'auto' | 'on' | 'off'", default: "'auto'", description: t('`auto` skips the effects on touch devices, `off` always skips them, `on` never does. Each effect costs a full-screen pass and disables MSAA (Multisample Anti-Aliasing), so a low-end device gets a scene that is both slower and jaggier.', '`auto` pula os efeitos em dispositivos de toque, `off` sempre pula, `on` nunca pula. Cada efeito custa um passe de tela cheia e desliga o MSAA (Multisample Anti-Aliasing), então um aparelho fraco fica mais lento e mais serrilhado.') },
          ],
        },
      ],
    },
    {
      id: 'result',
      title: t('What it returns', 'O que ela devolve'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The result is a union. When post-processing is skipped (a phone, `quality: \'off\'`, or a renderer that is not a real `THREE.WebGLRenderer`) you get a disabled stub: `enabled` is `false`, `composer` is `null`, `passes` is empty and `dispose()` does nothing, so calling code never has to branch.',
            'O resultado é uma união. Quando o pós-processamento é pulado (um celular, `quality: \'off\'` ou um renderer que não é um `THREE.WebGLRenderer` de verdade), você recebe um stub desativado: `enabled` é `false`, `composer` é `null`, `passes` é vazio e `dispose()` não faz nada, então o código chamador nunca precisa ramificar.',
          ),
        },
        {
          type: 'props',
          title: t('When enabled', 'Quando ativo'),
          rows: [
            { name: 'enabled', type: 'true', readonly: true, description: t('Whether post-processing was built.', 'Se o pós-processamento foi montado.') },
            { name: 'composer', type: 'EffectComposer', readonly: true, description: t('The three.js composer that takes over rendering through `engine.setRenderTarget`.', 'O composer do three.js que assume a renderização via `engine.setRenderTarget`.') },
            { name: 'passes', type: '{ bloom?, vignette?, fxaa? }', description: t('Whichever were requested, for tweaking at runtime.', 'Os que foram pedidos, para ajustar em tempo de execução.') },
            { name: 'setEnabled', type: '(value: boolean) => void', description: t('Turns the whole chain off (a quality setting, a performance panic) and back on. Exists only on the enabled result.', 'Desliga a cadeia inteira (uma opção de qualidade, um pânico de desempenho) e liga de novo. Só existe no resultado ativo.') },
            { name: 'dispose', type: '() => void', description: t('Hands rendering back to the plain renderer and disposes the composer.', 'Devolve a renderização ao renderer simples e descarta o composer.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('enabled does not mean running', 'enabled não significa ligado'),
          text: t(
            '`setEnabled(false)` only swaps the render target back to the plain renderer: `enabled` stays `true` and `composer` stays set. `enabled` says post-processing exists, not that it is running now. If a settings menu needs to know, keep your own boolean next to the `setEnabled` call.',
            '`setEnabled(false)` apenas troca o render target de volta para o renderer simples: `enabled` continua `true` e `composer` continua definido. `enabled` diz que o pós-processamento existe, não que está rodando agora. Se um menu de opções precisa saber, guarde o seu próprio boolean ao lado da chamada de `setEnabled`.',
          ),
        },
        {
          type: 'p',
          text: t(
            'The composer applies tone mapping and sRGB conversion in its own output pass; without that pass the image comes out washed out and pale.',
            'O composer aplica tone mapping e conversão sRGB no seu próprio passe de saída; sem esse passe a imagem sai desbotada e pálida.',
          ),
        },
      ],
    },
    {
      id: 'testing',
      title: t('Testing and disposal', 'Testes e descarte'),
      blocks: [
        {
          type: 'callout',
          kind: 'info',
          title: t('Browser with WebGL only', 'Só no navegador com WebGL'),
          text: t(
            'The chain runs only in a browser with WebGL (Web Graphics Library). It needs a real `THREE.WebGLRenderer`: with any other renderer (a test double supplied through `rendererFactory`, for example) `createPostFX` returns the disabled stub, exactly as on a phone. So a headless unit test never exercises bloom itself, and the same code path runs safely. Test the look in a real browser, and test your own logic through `fx.enabled` and `fx.passes`.',
            'A cadeia só roda num navegador com WebGL (Web Graphics Library). Ela precisa de um `THREE.WebGLRenderer` de verdade: com qualquer outro renderer (um dublê de teste entregue por `rendererFactory`, por exemplo) `createPostFX` devolve o stub desativado, exatamente como num celular. Assim, um teste unitário sem navegador nunca exercita o bloom em si, e o mesmo caminho de código roda com segurança. Teste o visual num navegador real e teste a sua própria lógica por meio de `fx.enabled` e `fx.passes`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Safe teardown order', 'Ordem segura de descarte'),
          code: `import { createGame, createPostFX } from 'easy-game-maker/3d'

const game = createGame()
const fx = createPostFX(game.engine, { bloom: true, quality: 'auto' })

function endGame() {
  // engine.dispose() does not know the composer exists: dispose the chain first.
  fx.dispose()
  game.engine.dispose()
}
window.addEventListener('pagehide', endGame)`,
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            '`engine.dispose()` does not dispose the composer or its render targets. Call `fx.dispose()` first, or the render targets leak until the page unloads.',
            '`engine.dispose()` não descarta o composer nem seus render targets. Chame `fx.dispose()` antes, senão os render targets vazam até a página ser descarregada.',
          ),
        },
      ],
    },
  ],
}

export default page
