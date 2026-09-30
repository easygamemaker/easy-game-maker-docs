import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/tools/testing',
  title: t('Testing', 'Testes'),
  description: t(
    'How to test an EGM game: unit tests with Vitest, scenes stepped by hand, end-to-end tests in the browser, and 3D games with a renderer double.',
    'Como testar um jogo EGM: testes unitários com Vitest, cenas avançadas à mão, testes end-to-end no navegador e jogos 3D com um renderizador falso.',
  ),
  source: 'src/testing',
  related: ['/cli/test', '/cli/e2e', '/simulator/devtools', '/3d/probe', '/workflow'],
  sections: [
    {
      id: 'layers',
      title: t('Three layers', 'Três camadas'),
      blocks: [
        {
          type: 'table',
          head: [t('Layer', 'Camada'), t('Tool', 'Ferramenta'), t('Good for', 'Bom para')],
          rows: [
            [t('Unit and integration', 'Unitário e integração'), t('Vitest through [egm test](/cli/test)', 'Vitest pelo [egm test](/cli/test)'), t('Game rules, math, a scene stepped for a few frames. Fast, no browser.', 'Regras do jogo, matemática, uma cena avançada por alguns quadros. Rápido, sem navegador.')],
            [t('End to end', 'Ponta a ponta'), t('The runner behind [egm e2e](/cli/e2e)', 'O executor por trás do [egm e2e](/cli/e2e)'), t('Real taps, drags and keys in the real game: menus, flows, "can I reach level 2".', 'Toques, arrastos e teclas de verdade no jogo real: menus, fluxos, "consigo chegar à fase 2".')],
            [t('Manual and visual', 'Manual e visual'), t('The [simulator](/simulator/overview) with X-Ray', 'O [simulador](/simulator/overview) com X-Ray'), t('Layout on device presets, bounds, physics bodies.', 'Layout nos presets de dispositivo, limites, corpos de física.')],
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('The SDK test helpers are not published', 'Os auxiliares de teste do SDK não são publicados'),
          text: t(
            'The SDK repository has `src/testing` (`createMockApp`, `runScene`, `stepScene`) and `src/testing/e2e`, and the example games alias them in their Vite and Vitest configs. The npm package only exports `easy-game-maker` and `easy-game-maker/3d`, so in your own project write the small doubles you need. The examples below are self-contained.',
            'O repositório do SDK (Software Development Kit) tem `src/testing` (`createMockApp`, `runScene`, `stepScene`) e `src/testing/e2e`, e os jogos de exemplo os apontam por alias nas configurações do Vite e do Vitest. O pacote npm só exporta `easy-game-maker` e `easy-game-maker/3d`, então no seu projeto escreva os pequenos dublês de que precisar. Os exemplos abaixo são autossuficientes.',
          ),
        },
      ],
    },
    {
      id: 'setup',
      title: t('Setting up Vitest', 'Configurando o Vitest'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`egm new` already adds Vitest, `happy-dom` (which provides `window`, `document` and a fake canvas for scenes that touch the DOM) and a minimal `vitest.config.ts`. In an older project, add them yourself:',
            'O `egm new` já adiciona o Vitest, o `happy-dom` (que fornece `window`, `document` e um canvas falso para cenas que tocam o DOM, Document Object Model) e um `vitest.config.ts` mínimo. Em um projeto mais antigo, adicione-os você mesmo:',
          ),
        },
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `npm install -D vitest happy-dom`,
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'vitest.config.ts',
          check: 'skip',
          code: `import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['src/__tests__/setup.ts'],
    include: ['src/__tests__/**/*.test.ts'],
  },
})`,
        },
        {
          type: 'p',
          text: t(
            'Scenes that load assets or play sound reach for `fetch` and `AudioContext`, which happy-dom does not fully provide. The example games stub both in a setup file so nothing touches the network or the audio hardware:',
            'Cenas que carregam assets ou tocam som recorrem a `fetch` e `AudioContext`, que o happy-dom não fornece por completo. Os jogos de exemplo simulam os dois em um arquivo de setup, para que nada toque a rede nem o hardware de áudio:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/__tests__/setup.ts',
          check: 'skip',
          code: `import { vi } from 'vitest'

vi.stubGlobal(
  'fetch',
  vi.fn().mockResolvedValue({
    ok: false,
    status: 404,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    json: () => Promise.resolve({}),
  }),
)

vi.stubGlobal(
  'AudioContext',
  vi.fn().mockImplementation(() => ({
    state: 'running',
    resume: vi.fn().mockResolvedValue(undefined),
    destination: {},
    createGain: vi.fn(() => ({ gain: { value: 1 }, connect: vi.fn() })),
    decodeAudioData: vi.fn().mockResolvedValue({}),
    close: vi.fn(),
  })),
)`,
        },
      ],
    },
    {
      id: 'scenes',
      title: t('Test rules, then scenes', 'Teste as regras, depois as cenas'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Pull game rules out of scenes into plain functions and test them without any engine. Then test a scene by building it and stepping `onUpdate` with a fixed `dt`. Because `dt` is an argument, the test is deterministic:',
            'Tire as regras do jogo de dentro das cenas para funções simples e teste-as sem engine alguma. Depois teste uma cena construindo-a e avançando `onUpdate` com um `dt` fixo. Como `dt` é um argumento, o teste é determinístico:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/game/rules.ts',
          code: `export interface Ball {
  x: number
  y: number
  vx: number
  vy: number
}

/** Advance a ball and bounce it off the top and bottom of the field. */
export function stepBall(ball: Readonly<Ball>, dt: number, height: number): Ball {
  let { y, vy } = ball
  y += vy * dt
  if (y < 0 || y > height) {
    vy = -vy
    y = Math.min(height, Math.max(0, y))
  }
  return { x: ball.x + ball.vx * dt, y, vx: ball.vx, vy }
}`,
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/__tests__/rules.test.ts',
          check: 'skip',
          code: `import { describe, expect, it } from 'vitest'
import { stepBall } from '../game/rules'

describe('stepBall', () => {
  it('bounces off the bottom edge', () => {
    const next = stepBall({ x: 10, y: 499, vx: 0, vy: 120 }, 1 / 60, 500)
    expect(next.vy).toBe(-120)
    expect(next.y).toBeLessThanOrEqual(500)
  })
})`,
        },
        {
          type: 'p',
          text: t(
            'A scene test builds the scene with the stubs above and runs it for a second of frames. `runScene` in [egm test](/cli/test) shows a helper for that.',
            'Um teste de cena constrói a cena com os simulados acima e a executa por um segundo de quadros. O `runScene` do [egm test](/cli/test) mostra um auxiliar para isso.',
          ),
        },
      ],
    },
    {
      id: 'e2e',
      title: t('End-to-end tests', 'Testes end-to-end'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Record a session in the simulator, save it under `src/e2e/`, add assertions and run [egm e2e](/cli/e2e). Assert on something the game exposes, such as the current scene, instead of on timing alone:',
            'Grave uma sessão no simulador, salve em `src/e2e/`, acrescente asserções e rode o [egm e2e](/cli/e2e). Confira algo que o jogo expõe, como a cena atual, em vez de confiar só no tempo:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/e2e/flow.e2e.ts',
          check: 'skip',
          code: `import { test } from 'easy-game-maker/e2e'

test('Play leads to the game scene', async ({ game }) => {
  await game.wait(1500)
  await game.tap(180, 330)
  await game.expect.scene('game')
  await game.expect.state((win) => (win as unknown as { __EGM_APP__?: unknown }).__EGM_APP__ !== undefined, 'app is exposed')
})`,
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'The visual runner is the only mode that executes tests. `egm e2e --headless` does not run them (it says so and exits with code 1), so it cannot gate a CI (Continuous Integration) pipeline. Use Vitest for that, and keep end-to-end tests for local runs.',
            'O executor visual é o único modo que executa os testes. O `egm e2e --headless` não os executa (ele avisa isso e encerra com código 1), então não pode servir de critério em um pipeline de CI (Continuous Integration, integração contínua). Use o Vitest para isso e mantenha os testes end-to-end para execuções locais.',
          ),
        },
      ],
    },
    {
      id: 'three-d',
      title: t('Testing a 3D game', 'Testando um jogo 3D'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`createGame` accepts a `rendererFactory`, so the loop can run without WebGL, which happy-dom does not have. Give it a double that satisfies `RendererLike` and drive the captured animation loop yourself. Register what matters with `game.probe.register` and read it back with `game.probe.snapshot()`:',
            '`createGame` aceita um `rendererFactory`, então o laço pode rodar sem WebGL, que o happy-dom não tem. Dê a ele um dublê que satisfaça `RendererLike` e conduza você mesmo o laço de animação capturado. Registre o que importa com `game.probe.register` e leia de volta com `game.probe.snapshot()`:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/__tests__/fakeRenderer.ts',
          code: `import * as THREE from 'three'
import { createGame } from 'easy-game-maker/3d'
import type { RendererLike } from 'easy-game-maker/3d'

export interface FakeRenderer extends RendererLike {
  /** Run one frame of the captured loop at \`timeMs\`. */
  frame(timeMs: number): void
}

export function createFakeRenderer(): FakeRenderer {
  let loop: ((time: number) => void) | null = null
  return {
    domElement: document.createElement('canvas'),
    shadowMap: { enabled: false, type: THREE.BasicShadowMap },
    outputColorSpace: THREE.LinearSRGBColorSpace,
    toneMapping: THREE.NoToneMapping,
    toneMappingExposure: 1,
    info: { render: { calls: 0, triangles: 0 }, memory: { geometries: 0, textures: 0 } },
    setPixelRatio: () => {},
    getPixelRatio: () => 1,
    setSize: () => {},
    render: () => {},
    setAnimationLoop: (callback) => {
      loop = callback
    },
    dispose: () => {},
    frame: (timeMs) => loop?.(timeMs),
  }
}

export function startTestGame() {
  const renderer = createFakeRenderer()
  const game = createGame({ rendererFactory: () => renderer })
  let score = 0
  game.probe.register('score', () => score)
  game.onUpdate(() => {
    score += 1
  })
  return { game, renderer, snapshot: () => game.probe.snapshot() }
}`,
        },
        {
          type: 'p',
          text: t(
            'In a browser test, or in the devtools console, the same probe is published as `window.__EGM_GAME__.probe()`. See [probe](/3d/probe).',
            'Em um teste no navegador, ou no console do devtools, a mesma sonda é publicada como `window.__EGM_GAME__.probe()`. Veja [probe](/3d/probe).',
          ),
        },
      ],
    },
  ],
}

export default page
