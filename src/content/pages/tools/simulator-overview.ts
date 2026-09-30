import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/simulator/overview',
  title: t('Simulator Overview', 'Visão Geral do Simulador'),
  description: t(
    'The simulator shows your game inside device previews, reloads on every save and tells the game which platform it is pretending to be.',
    'O simulador mostra o seu jogo dentro de prévias de dispositivos, recarrega a cada salvamento e informa ao jogo qual plataforma ele está fingindo ser.',
  ),
  source: 'src/cli/simulator/template.ts',
  related: ['/cli/simulate', '/simulator/devtools', '/simulator/tunnel', '/simulator/egmgo', '/core/platform'],
  sections: [
    {
      id: 'what-it-is',
      title: t('What the simulator is', 'O que é o simulador'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The simulator is a page that `egm simulate` writes to `public/__simulator.html` and serves through your project\'s Vite. It wraps your real game, loaded from `/` in a frame, so what you see is the actual code running. It is not an emulator of a phone: it is a browser with device-sized frames, and it tells the game which platform to report.',
            'O simulador é uma página que o `egm simulate` grava em `public/__simulator.html` e serve pelo Vite do seu projeto. Ele envolve o seu jogo de verdade, carregado de `/` em um frame, então o que você vê é o código real rodando. Não é um emulador de celular: é um navegador com molduras do tamanho de dispositivos, que diz ao jogo qual plataforma informar.',
          ),
        },
        {
          type: 'table',
          head: [t('Area', 'Área'), t('What it has', 'O que tem')],
          rows: [
            [t('Sidebar', 'Barra lateral'), t('Device presets, a live info panel (platform, DPI, orientation, canvas size) and the shortcut list.', 'Presets de dispositivos, um painel de informações ao vivo (plataforma, DPI (Dots Per Inch, a densidade de pixels), orientação, tamanho do canvas) e a lista de atalhos.')],
            [t('Header', 'Cabeçalho'), t('The current device, a live-reload indicator, the URL of the server, and the X-Ray and Record E2E buttons.', 'O dispositivo atual, um indicador de recarga ao vivo, a URL do servidor e os botões X-Ray e Record E2E.')],
            [t('Viewport', 'Viewport'), t('The device frame with your game inside, scaled down to fit your window.', 'A moldura do dispositivo com o seu jogo dentro, reduzida para caber na sua janela.')],
            [t('EgmGO panel', 'Painel EgmGO'), t('A QR code to open the game on a phone. See [EgmGO App](/simulator/egmgo).', 'Um QR code (Quick Response code) para abrir o jogo em um celular. Veja [App EgmGO](/simulator/egmgo).')],
          ],
        },
      ],
    },
    {
      id: 'devices',
      title: t('Device presets', 'Presets de dispositivos'),
      blocks: [
        {
          type: 'table',
          head: [t('Key', 'Tecla'), t('Preset', 'Preset'), t('Size', 'Tamanho'), t('Platform reported', 'Plataforma informada')],
          rows: [
            [t('`1`', '`1`'), t('Default', 'Padrão'), t('the canvas size from `egm.config.ts`', 'o tamanho do canvas do `egm.config.ts`'), t('web, 1x', 'web, 1x')],
            [t('`2`', '`2`'), t('iPhone 15 Portrait', 'iPhone 15 em retrato'), t('390 × 844', '390 × 844'), t('ios, 2x', 'ios, 2x')],
            [t('`3`', '`3`'), t('iPhone 15 Landscape', 'iPhone 15 em paisagem'), t('844 × 390', '844 × 390'), t('ios, 2x', 'ios, 2x')],
            [t('`4`', '`4`'), t('Android Portrait', 'Android em retrato'), t('360 × 800', '360 × 800'), t('android, 1x', 'android, 1x')],
            [t('`5`', '`5`'), t('Android Landscape', 'Android em paisagem'), t('800 × 360', '800 × 360'), t('android, 1x', 'android, 1x')],
            [t('`6`', '`6`'), t('iPad Pro Portrait', 'iPad Pro em retrato'), t('768 × 1024', '768 × 1024'), t('ios, 2x', 'ios, 2x')],
            [t('`7`', '`7`'), t('iPad Pro Landscape', 'iPad Pro em paisagem'), t('1024 × 768', '1024 × 768'), t('ios, 2x', 'ios, 2x')],
            [t('`8`', '`8`'), t('Desktop HD', 'Desktop HD'), t('1280 × 720', '1280 × 720'), t('desktop, 1x', 'desktop, 1x')],
            [t('`9`', '`9`'), t('Desktop Full HD', 'Desktop Full HD'), t('1920 × 1080', '1920 × 1080'), t('desktop, 2x', 'desktop, 2x')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Pressing a key or clicking a preset reloads the game in the frame at that size, so a game that decides its layout at startup is exercised properly. Resizing the browser window only rescales the frame and never reloads the game.',
            'Apertar uma tecla ou clicar em um preset recarrega o jogo no frame naquele tamanho, então um jogo que decide o layout na inicialização é testado de verdade. Redimensionar a janela do navegador apenas reescala a moldura e nunca recarrega o jogo.',
          ),
        },
      ],
    },
    {
      id: 'platform-override',
      title: t('How the game knows the device', 'Como o jogo sabe qual é o dispositivo'),
      blocks: [
        {
          type: 'p',
          text: t(
            'For every preset the simulator loads the game with three query parameters: `egm_platform`, `egm_dpi` and `egm_orientation`. `PlatformDetector` gives them priority over real detection, so `PlatformDetector.detect()` returns `"ios"` under the iPhone preset even though your browser is on a desktop. On a real device the parameters are absent and normal detection is used.',
            'Para cada preset, o simulador carrega o jogo com três parâmetros de consulta: `egm_platform`, `egm_dpi` e `egm_orientation`. O `PlatformDetector` dá prioridade a eles sobre a detecção real, então `PlatformDetector.detect()` devolve `"ios"` no preset do iPhone mesmo com o navegador em um desktop. Em um dispositivo real os parâmetros não existem e a detecção normal é usada.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `import { PlatformDetector } from 'easy-game-maker'

export function describeDevice(): string {
  const platform = PlatformDetector.detect() // 'web' | 'ios' | 'android' | 'desktop'
  const dpi = PlatformDetector.resolution() // '1x' | '2x'
  const orientation = PlatformDetector.orientation() // 'portrait' | 'landscape'
  return \`\${platform} \${dpi} \${orientation}\`
}

// pick the right asset for the screen
export function spriteSheetUrl(): string {
  return PlatformDetector.isHighDPI() ? 'assets/hero@2x.png' : 'assets/hero.png'
}`,
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'Results are cached after the first call. If you change the platform at runtime in a test, call `PlatformDetector.reset()`.',
            'Os resultados ficam em cache após a primeira chamada. Se você mudar a plataforma em tempo de execução em um teste, chame `PlatformDetector.reset()`.',
          ),
        },
      ],
    },
    {
      id: 'scaling',
      title: t('Scaling inside the frame', 'Escala dentro do frame'),
      blocks: [
        {
          type: 'p',
          text: t(
            'On every load the simulator injects the same scaling script a build injects, driven by `display.scaling` (`fit`, `fill`, `stretch` or `none`) and `backgroundColor`. Test all four values here before you build. 3D games are left alone: the script does nothing when `window.__EGM_3D__` is set, because the 3D engine sizes its own canvas.',
            'A cada carga, o simulador injeta o mesmo script de escala que um build injeta, conduzido por `display.scaling` (`fit`, `fill`, `stretch` ou `none`) e `backgroundColor`. Teste os quatro valores aqui antes de compilar. Os jogos 3D ficam de fora: o script não faz nada quando `window.__EGM_3D__` está definido, porque a engine 3D dimensiona o próprio canvas.',
          ),
        },
      ],
    },
  ],
}

export default page
