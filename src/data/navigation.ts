export interface NavItem {
  id: string
  slug: string
  en: string
  pt: string
  badge?: string
  icon?: string
}

export interface NavSection {
  id: string
  en: string
  pt: string
  icon: string
  items: NavItem[]
}

export const NAVIGATION: NavSection[] = [
  {
    id: 'getting-started',
    en: 'Getting Started',
    pt: 'Primeiros Passos',
    icon: '🚀',
    items: [
      { id: 'introduction', slug: '/introduction', en: 'Introduction', pt: 'Introdução' },
      { id: 'installation', slug: '/installation', en: 'Installation', pt: 'Instalação' },
      { id: 'first-game', slug: '/first-game', en: 'Your First Game', pt: 'Seu Primeiro Jogo' },
      { id: 'project-structure', slug: '/project-structure', en: 'Project Structure', pt: 'Estrutura do Projeto' },
      { id: 'workflow', slug: '/workflow', en: 'TypeScript → EGM → Build', pt: 'TypeScript → EGM → Build' },
    ],
  },
  {
    id: 'visual-editor',
    en: 'Visual Editor',
    pt: 'Editor Visual',
    icon: '🎨',
    items: [
      { id: 'visual-editor-overview', slug: '/visual-editor', en: 'Visual Editor Workflow', pt: 'Workflow do Editor Visual', badge: 'NEW' },
      { id: 'visual-scene', slug: '/core/visual-scene', en: 'VisualScene & ViewLoader', pt: 'VisualScene & ViewLoader', badge: 'NEW' },
    ],
  },
  {
    id: 'core',
    en: 'Core',
    pt: 'Core',
    icon: '⚙️',
    items: [
      { id: 'app', slug: '/core/app', en: 'App', pt: 'App' },
      { id: 'scene', slug: '/core/scene', en: 'Scene & SceneManager', pt: 'Scene & SceneManager' },
      { id: 'asset-manager', slug: '/core/assets', en: 'AssetManager', pt: 'AssetManager' },
      { id: 'event-emitter', slug: '/core/events', en: 'EventEmitter', pt: 'EventEmitter' },
      { id: 'timer', slug: '/core/timer', en: 'TimerManager', pt: 'TimerManager' },
      { id: 'platform', slug: '/core/platform', en: 'PlatformDetector', pt: 'PlatformDetector' },
    ],
  },
  {
    id: 'display',
    en: 'Display',
    pt: 'Display',
    icon: '🎨',
    items: [
      { id: 'display-object', slug: '/display/display-object', en: 'DisplayObject', pt: 'DisplayObject' },
      { id: 'group', slug: '/display/group', en: 'Group', pt: 'Group' },
      { id: 'sprite', slug: '/display/sprite', en: 'Sprite', pt: 'Sprite' },
      { id: 'animated-sprite', slug: '/display/animated-sprite', en: 'AnimatedSprite', pt: 'AnimatedSprite' },
      { id: 'rect-shape', slug: '/display/rect-shape', en: 'RectShape', pt: 'RectShape' },
      { id: 'circle-shape', slug: '/display/circle-shape', en: 'CircleShape', pt: 'CircleShape' },
      { id: 'line-shape', slug: '/display/line-shape', en: 'LineShape', pt: 'LineShape' },
      { id: 'text', slug: '/display/text', en: 'Text', pt: 'Text' },
      { id: 'polygon-shape', slug: '/display/polygon-shape', en: 'PolygonShape', pt: 'PolygonShape' },
      { id: 'particle-emitter', slug: '/display/particles', en: 'ParticleEmitter', pt: 'ParticleEmitter' },
    ],
  },
  {
    id: 'math',
    en: 'Math',
    pt: 'Matemática',
    icon: '📐',
    items: [
      { id: 'vec2', slug: '/math/vec2', en: 'Vec2', pt: 'Vec2' },
      { id: 'mat3', slug: '/math/mat3', en: 'Mat3', pt: 'Mat3' },
      { id: 'bounds-rect', slug: '/math/bounds-rect', en: 'BoundsRect', pt: 'BoundsRect' },
    ],
  },
  {
    id: 'animation',
    en: 'Animation',
    pt: 'Animação',
    icon: '✨',
    items: [
      { id: 'tween', slug: '/animation/tween', en: 'Tween', pt: 'Tween' },
      { id: 'easing', slug: '/animation/easing', en: 'Easing', pt: 'Easing' },
      { id: 'transitions', slug: '/animation/transitions', en: 'TransitionManager', pt: 'TransitionManager' },
    ],
  },
  {
    id: 'camera',
    en: 'Camera',
    pt: 'Câmera',
    icon: '🎥',
    items: [
      { id: 'camera', slug: '/camera', en: 'Camera', pt: 'Câmera' },
    ],
  },
  {
    id: 'physics',
    en: 'Physics',
    pt: 'Física',
    icon: '🧲',
    items: [
      { id: 'physics-world', slug: '/physics/world', en: 'PhysicsWorld', pt: 'PhysicsWorld' },
      { id: 'physics-body', slug: '/physics/body', en: 'PhysicsBody', pt: 'PhysicsBody' },
    ],
  },
  {
    id: 'input',
    en: 'Input',
    pt: 'Input',
    icon: '🎮',
    items: [
      { id: 'input-manager', slug: '/input/keyboard-mouse', en: 'Keyboard & Mouse', pt: 'Teclado & Mouse' },
      { id: 'gamepad', slug: '/input/gamepad', en: 'GamepadManager', pt: 'GamepadManager' },
    ],
  },
  {
    id: 'audio',
    en: 'Audio',
    pt: 'Áudio',
    icon: '🔊',
    items: [
      { id: 'audio-manager', slug: '/audio/manager', en: 'AudioManager', pt: 'AudioManager' },
      { id: 'audio-channel', slug: '/audio/channel', en: 'AudioChannel', pt: 'AudioChannel' },
    ],
  },
  {
    id: 'network',
    en: 'Network',
    pt: 'Rede',
    icon: '🌐',
    items: [
      { id: 'network-manager', slug: '/network/manager', en: 'NetworkManager', pt: 'NetworkManager' },
      { id: 'network-room', slug: '/network/room', en: 'NetworkRoom', pt: 'NetworkRoom' },
    ],
  },
  {
    id: 'gameplay',
    en: 'Gameplay',
    pt: 'Gameplay',
    icon: '🕹️',
    items: [
      { id: 'object-pool', slug: '/gameplay/object-pool', en: 'ObjectPool', pt: 'ObjectPool' },
      { id: 'state-machine', slug: '/gameplay/state-machine', en: 'StateMachine', pt: 'StateMachine' },
      { id: 'tilemap', slug: '/gameplay/tilemap', en: 'Tilemap', pt: 'Tilemap' },
    ],
  },
  {
    id: 'shaders',
    en: 'Shaders',
    pt: 'Shaders',
    icon: '🌈',
    items: [
      { id: 'shader-system', slug: '/shaders/system', en: 'ShaderSystem', pt: 'ShaderSystem' },
      { id: 'builtin-shaders', slug: '/shaders/builtins', en: 'Built-in Shaders', pt: 'Shaders Nativos' },
    ],
  },
  {
    id: 'monetization',
    en: 'Monetization',
    pt: 'Monetização',
    icon: '💰',
    items: [
      { id: 'ads', slug: '/monetization/ads', en: 'AdManager', pt: 'AdManager' },
      { id: 'iap', slug: '/monetization/iap', en: 'IAPManager', pt: 'IAPManager' },
    ],
  },
  {
    id: 'debug',
    en: 'Debug & Save',
    pt: 'Debug & Save',
    icon: '🔍',
    items: [
      { id: 'debug-hud', slug: '/debug/hud', en: 'DebugHUD', pt: 'DebugHUD' },
      { id: 'save-manager', slug: '/debug/save', en: 'SaveManager', pt: 'SaveManager' },
    ],
  },
  {
    id: 'cli',
    en: 'CLI',
    pt: 'CLI',
    icon: '💻',
    items: [
      { id: 'egm-new', slug: '/cli/new', en: 'egm new', pt: 'egm new' },
      { id: 'egm-simulate', slug: '/cli/simulate', en: 'egm simulate', pt: 'egm simulate' },
      { id: 'egm-build', slug: '/cli/build', en: 'egm build', pt: 'egm build' },
      { id: 'egm-test', slug: '/cli/test', en: 'egm test', pt: 'egm test' },
      { id: 'egm-e2e', slug: '/cli/e2e', en: 'egm e2e', pt: 'egm e2e' },
      { id: 'egm-editor', slug: '/cli/editor', en: 'egm editor', pt: 'egm editor', badge: 'BETA' },
      { id: 'egm-go', slug: '/cli/go', en: 'egm go', pt: 'egm go' },
    ],
  },
  {
    id: 'simulator',
    en: 'Simulator',
    pt: 'Simulador',
    icon: '📱',
    items: [
      { id: 'simulator-overview', slug: '/simulator/overview', en: 'Overview', pt: 'Visão Geral' },
      { id: 'devtools', slug: '/simulator/devtools', en: 'DevTools', pt: 'DevTools' },
      { id: 'tunnel', slug: '/simulator/tunnel', en: 'ngrok Tunnel', pt: 'Túnel ngrok' },
      { id: 'egmgo', slug: '/simulator/egmgo', en: 'EgmGO App', pt: 'App EgmGO' },
    ],
  },
  {
    id: 'build-targets',
    en: 'Build Targets',
    pt: 'Plataformas',
    icon: '📦',
    items: [
      { id: 'build-web', slug: '/build/web', en: 'Web', pt: 'Web' },
      { id: 'build-mobile', slug: '/build/mobile', en: 'iOS & Android', pt: 'iOS & Android' },
      { id: 'build-desktop', slug: '/build/desktop', en: 'Desktop', pt: 'Desktop' },
      { id: 'build-tv', slug: '/build/tv', en: 'Smart TV', pt: 'Smart TV', badge: 'NEW' },
      { id: 'build-console', slug: '/build/consoles', en: 'Consoles', pt: 'Consoles', badge: 'NEW' },
    ],
  },
]

export function findNavItem(slug: string): NavItem | undefined {
  for (const section of NAVIGATION) {
    const item = section.items.find(i => i.slug === slug)
    if (item) return item
  }
  return undefined
}
