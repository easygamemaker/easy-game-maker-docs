import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/core/platform',
  title: t('PlatformDetector', 'PlatformDetector'),
  description: t(
    'Static helpers that report the runtime platform, pixel density and orientation, with simulator overrides.',
    'Auxiliares estáticos que informam a plataforma de execução, a densidade de pixels e a orientação, com sobrescritas do simulador.',
  ),
  source: 'src/engine/core/PlatformDetector.ts',
  related: ['/core/assets', '/simulator/overview', '/core/app'],
  sections: [
    {
      id: 'api',
      title: t('Methods', 'Métodos'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`PlatformDetector` is a class of static methods. Each result is computed on first call and cached until `reset()`.',
            '`PlatformDetector` é uma classe de métodos estáticos. Cada resultado é calculado na primeira chamada e fica em cache até `reset()`.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'detect()', type: "'web' | 'ios' | 'android' | 'desktop'", description: t('Current platform. Outside a browser it returns `web`.', 'Plataforma atual. Fora de um navegador retorna `web`.') },
            { name: 'isHighDPI()', type: 'boolean', description: t('True when `devicePixelRatio >= 2`. DPI (Dots Per Inch) here just means pixel density.', 'True quando `devicePixelRatio >= 2`. DPI (Dots Per Inch) aqui significa apenas densidade de pixels.') },
            { name: 'resolution()', type: "'1x' | '2x'", description: t("`'2x'` on high-density screens, `'1x'` otherwise.", "`'2x'` em telas de alta densidade, `'1x'` nas demais.") },
            { name: 'orientation()', type: "'portrait' | 'landscape'", description: t('Compares `innerWidth` and `innerHeight`. Outside a browser it returns `landscape`. Cached, so it does not follow a later rotation until `reset()`.', 'Compara `innerWidth` e `innerHeight`. Fora de um navegador retorna `landscape`. Fica em cache, então não acompanha uma rotação posterior até `reset()`.') },
            { name: 'reset()', type: 'void', description: t('Clears the cached platform, density and orientation.', 'Limpa a plataforma, a densidade e a orientação em cache.') },
          ],
        },
      ],
    },
    {
      id: 'detection',
      title: t('How the platform is chosen', 'Como a plataforma é escolhida'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('A URL query parameter `egm_platform` (`web`, `ios`, `android` or `desktop`), which the simulator injects.', 'O parâmetro de URL (Uniform Resource Locator) `egm_platform` (`web`, `ios`, `android` ou `desktop`), que o simulador injeta.'),
            t('The user agent: iPhone, iPad or iPod means `ios`; Android means `android`.', 'O user agent: iPhone, iPad ou iPod significa `ios`; Android significa `android`.'),
            t('`desktop` for an installed standalone app (`display-mode: standalone`) or a screen wider than 1440 px.', '`desktop` para um app instalado em modo standalone (`display-mode: standalone`) ou tela com mais de 1440 px de largura.'),
            t('Otherwise `web`.', 'Caso contrário, `web`.'),
          ],
        },
        {
          type: 'p',
          text: t(
            'Density and orientation have the same override style: `egm_dpi=2x` and `egm_orientation=portrait|landscape`. This is what lets the [simulator](/simulator/overview) test another device in a desktop browser.',
            'Densidade e orientação têm a mesma sobrescrita: `egm_dpi=2x` e `egm_orientation=portrait|landscape`. É isso que permite ao [simulador](/simulator/overview) testar outro dispositivo em um navegador desktop.',
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Detection is not a build target', 'Detecção não é alvo de build'),
          text: t(
            'Reporting `ios` or `android` only describes where the page runs or what the simulator forces. `egm build` currently supports desktop only; other platforms are not available yet.',
            'Reportar `ios` ou `android` apenas descreve onde a página roda ou o que o simulador força. O `egm build` hoje só suporta desktop; as outras plataformas ainda não estão disponíveis.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example', 'Exemplo'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/platform.ts',
          check: 'compile',
          code: `import { PlatformDetector } from 'easy-game-maker'

export function pickButtonSize(): number {
  const isTouch = PlatformDetector.detect() === 'ios' || PlatformDetector.detect() === 'android'
  const base = isTouch ? 72 : 40
  return PlatformDetector.isHighDPI() ? base * 2 : base
}

export function isPortrait(): boolean {
  PlatformDetector.reset() // orientation is cached, so refresh it first
  return PlatformDetector.orientation() === 'portrait'
}`,
        },
      ],
    },
  ],
}

export default page
