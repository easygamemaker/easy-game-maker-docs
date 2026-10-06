export type GameType = '2d' | '3d'
export type AreaId = 'guide' | 'engine' | 'tools' | 'examples'

export const GAME_TYPES: { id: GameType; en: string; pt: string; tagline: { en: string; pt: string } }[] = [
  {
    id: '2d',
    en: '2D',
    pt: '2D',
    tagline: {
      en: 'Sprites, tilemaps, physics and shaders on a WebGL2 renderer.',
      pt: 'Sprites, tilemaps, física e shaders em um renderizador WebGL2.',
    },
  },
  {
    id: '3d',
    en: '3D',
    pt: '3D',
    tagline: {
      en: 'Models, lights, physics and post-processing on three.js.',
      pt: 'Modelos, luzes, física e pós-processamento sobre o three.js.',
    },
  },
]

export interface Area {
  id: AreaId
  en: string
  pt: string
  /** Where the area tab leads. The engine area leads to the overview of the chosen game type. */
  home: string | Record<GameType, string>
  description: { en: string; pt: string }
}

export interface NavItem {
  id: string
  slug: string
  en: string
  pt: string
  badge?: string
  /** Shown only for this game type. Omitted means the page is useful for both. */
  scope?: GameType
}

export interface NavSection {
  id: string
  area: AreaId
  en: string
  pt: string
  icon: string
  scope?: GameType
  items: NavItem[]
}

export const AREAS: Area[] = [
  {
    id: 'guide',
    en: 'Guide',
    pt: 'Guia',
    home: '/introduction',
    description: {
      en: 'Install, build your first game and learn the concepts.',
      pt: 'Instale, crie seu primeiro jogo e aprenda os conceitos.',
    },
  },
  {
    id: 'engine',
    en: 'Engine',
    pt: 'Engine',
    home: { '2d': '/2d/overview', '3d': '/3d/overview' },
    description: {
      en: 'Every class and module of the engine for your game type.',
      pt: 'Cada classe e módulo da engine para o seu tipo de jogo.',
    },
  },
  {
    id: 'tools',
    en: 'Tools',
    pt: 'Ferramentas',
    home: '/cli/new',
    description: {
      en: 'CLI, simulator, configuration and build targets.',
      pt: 'CLI, simulador, configuração e alvos de build.',
    },
  },
  {
    id: 'examples',
    en: 'Examples',
    pt: 'Exemplos',
    home: '/examples',
    description: {
      en: 'Complete games you can play and read.',
      pt: 'Jogos completos para jogar e ler.',
    },
  },
]

const item = (slug: string, en: string, pt: string, badge?: string, scope?: GameType): NavItem => ({
  id: slug.replace(/^\//, '').replace(/\//g, '-') || 'home',
  slug,
  en,
  pt,
  badge,
  scope,
})

export const NAVIGATION: NavSection[] = [
  // ── Guide ─────────────────────────────────────────────────────────────────
  {
    id: 'getting-started',
    area: 'guide',
    en: 'Getting Started',
    pt: 'Primeiros Passos',
    icon: '🚀',
    items: [
      item('/introduction', 'Introduction', 'Introdução'),
      item('/installation', 'Installation', 'Instalação'),
      item('/first-game', 'Your First 2D Game', 'Seu Primeiro Jogo 2D', undefined, '2d'),
      item('/3d/quickstart', 'Your First 3D Game', 'Seu Primeiro Jogo 3D', 'NEW', '3d'),
      item('/project-structure', 'Project Structure', 'Estrutura do Projeto'),
      item('/workflow', 'TypeScript → EGM → Build', 'TypeScript → EGM → Build'),
      item('/guide/concepts', 'Core Concepts', 'Conceitos Fundamentais'),
      item('/guide/2d-or-3d', '2D or 3D?', '2D ou 3D?'),
    ],
  },
  {
    id: 'guides',
    area: 'guide',
    en: 'Guides',
    pt: 'Guias',
    icon: '📘',
    items: [
      item('/guide/whats-new-0-3', 'What is new in 0.3', 'Novidades da 0.3', 'NEW', '2d'),
      item('/guide/recipes-2d', '2D Recipes', 'Receitas 2D', undefined, '2d'),
      item('/guide/recipes-3d', '3D Recipes', 'Receitas 3D', undefined, '3d'),
      item('/guide/ai', 'Building with AI', 'Criando com IA'),
      item('/guide/troubleshooting', 'Troubleshooting', 'Solução de Problemas'),
      item('/guide/faq', 'FAQ', 'Perguntas Frequentes'),
    ],
  },

  // ── 2D Engine ─────────────────────────────────────────────────────────────
  {
    id: '2d-overview',
    area: 'engine',
    scope: '2d',
    en: 'Overview',
    pt: 'Visão Geral',
    icon: '🧭',
    items: [item('/2d/overview', '2D Engine Overview', 'Visão Geral da Engine 2D')],
  },
  {
    id: 'core',
    area: 'engine',
    scope: '2d',
    en: 'Core',
    pt: 'Núcleo',
    icon: '⚙️',
    items: [
      item('/core/app', 'App', 'App'),
      item('/core/fixed-step', 'Fixed Step & Time', 'Passo Fixo & Tempo', 'NEW'),
      item('/core/rng', 'Rng', 'Rng', 'NEW'),
      item('/core/scene', 'Scene & SceneManager', 'Scene & SceneManager'),
      item('/core/assets', 'AssetManager', 'AssetManager'),
      item('/core/textures', 'Texture & TextureCache', 'Texture & TextureCache'),
      item('/core/texture-atlas', 'TextureAtlas', 'TextureAtlas', 'NEW'),
      item('/core/renderer', 'WebGLRenderer', 'WebGLRenderer'),
      item('/core/events', 'EventEmitter', 'EventEmitter'),
      item('/core/timer', 'TimerManager', 'TimerManager'),
      item('/core/platform', 'PlatformDetector', 'PlatformDetector'),
      item('/core/visual-scene', 'VisualScene & ViewLoader', 'VisualScene & ViewLoader', 'NEW'),
    ],
  },
  {
    id: 'display',
    area: 'engine',
    scope: '2d',
    en: 'Display',
    pt: 'Exibição',
    icon: '🎨',
    items: [
      item('/display/display-object', 'DisplayObject', 'DisplayObject'),
      item('/display/group', 'Group', 'Group'),
      item('/display/sprite', 'Sprite', 'Sprite'),
      item('/display/animated-sprite', 'AnimatedSprite', 'AnimatedSprite'),
      item('/display/rect-shape', 'RectShape', 'RectShape'),
      item('/display/circle-shape', 'CircleShape', 'CircleShape'),
      item('/display/line-shape', 'LineShape', 'LineShape'),
      item('/display/text', 'Text', 'Text'),
      item('/display/polygon-shape', 'PolygonShape', 'PolygonShape'),
      item('/display/particles', 'ParticleEmitter', 'ParticleEmitter'),
    ],
  },
  {
    id: 'math',
    area: 'engine',
    scope: '2d',
    en: 'Math',
    pt: 'Matemática',
    icon: '📐',
    items: [
      item('/math/vec2', 'Vec2', 'Vec2'),
      item('/math/mat3', 'Mat3', 'Mat3'),
      item('/math/bounds-rect', 'BoundsRect', 'BoundsRect'),
    ],
  },
  {
    id: 'animation',
    area: 'engine',
    scope: '2d',
    en: 'Animation',
    pt: 'Animação',
    icon: '✨',
    items: [
      item('/animation/tween', 'Tween', 'Tween'),
      item('/animation/clips', 'Animation Clips', 'Clipes de Animação', 'NEW'),
      item('/animation/easing', 'Easing', 'Easing'),
      item('/animation/transitions', 'TransitionManager', 'TransitionManager'),
    ],
  },
  {
    id: 'camera',
    area: 'engine',
    scope: '2d',
    en: 'Camera',
    pt: 'Câmera',
    icon: '🎥',
    items: [item('/camera', 'Camera', 'Camera')],
  },
  {
    id: 'physics',
    area: 'engine',
    scope: '2d',
    en: 'Physics',
    pt: 'Física',
    icon: '🧲',
    items: [
      item('/physics/world', 'PhysicsWorld', 'PhysicsWorld'),
      item('/physics/body', 'PhysicsBody', 'PhysicsBody'),
    ],
  },
  {
    id: 'input',
    area: 'engine',
    scope: '2d',
    en: 'Input',
    pt: 'Entrada',
    icon: '🎮',
    items: [
      item('/input/keyboard-mouse', 'Keyboard & Mouse', 'Teclado & Mouse'),
      item('/input/gamepad', 'GamepadManager', 'GamepadManager'),
      item('/input/action-map', 'ActionMap', 'ActionMap', 'NEW'),
    ],
  },
  {
    id: 'audio',
    area: 'engine',
    scope: '2d',
    en: 'Audio',
    pt: 'Áudio',
    icon: '🔊',
    items: [
      item('/audio/manager', 'AudioManager', 'AudioManager'),
      item('/audio/channel', 'AudioChannel', 'AudioChannel'),
      item('/audio/bus', 'AudioBus & Mixing', 'AudioBus & Mixagem', 'NEW'),
      item('/audio/sfx', 'SfxPlayer', 'SfxPlayer', 'NEW'),
      item('/audio/music', 'MusicPlayer', 'MusicPlayer', 'NEW'),
    ],
  },
  {
    id: 'network',
    area: 'engine',
    scope: '2d',
    en: 'Network',
    pt: 'Rede',
    icon: '🌐',
    items: [
      item('/network/manager', 'NetworkManager', 'NetworkManager'),
      item('/network/room', 'NetworkRoom', 'NetworkRoom'),
    ],
  },
  {
    id: 'gameplay',
    area: 'engine',
    scope: '2d',
    en: 'Gameplay',
    pt: 'Gameplay',
    icon: '🕹️',
    items: [
      item('/gameplay/object-pool', 'ObjectPool', 'ObjectPool'),
      item('/gameplay/state-machine', 'StateMachine', 'StateMachine'),
      item('/gameplay/tilemap', 'Tilemap', 'Tilemap'),
    ],
  },
  {
    id: 'shaders',
    area: 'engine',
    scope: '2d',
    en: 'Shaders',
    pt: 'Shaders',
    icon: '🌈',
    items: [
      item('/shaders/system', 'ShaderSystem', 'ShaderSystem'),
      item('/shaders/builtins', 'Built-in Shaders', 'Shaders Nativos'),
    ],
  },
  {
    id: 'monetization',
    area: 'engine',
    scope: '2d',
    en: 'Monetization',
    pt: 'Monetização',
    icon: '💰',
    items: [
      item('/monetization/ads', 'AdManager', 'AdManager'),
      item('/monetization/iap', 'IAPManager', 'IAPManager'),
    ],
  },
  {
    id: 'debug',
    area: 'engine',
    scope: '2d',
    en: 'Debug & Save',
    pt: 'Debug & Save',
    icon: '🔍',
    items: [
      item('/debug/hud', 'DebugHUD', 'DebugHUD'),
      item('/debug/save', 'SaveManager', 'SaveManager'),
    ],
  },

  // ── 3D Engine ─────────────────────────────────────────────────────────────
  {
    id: '3d-start',
    area: 'engine',
    scope: '3d',
    en: 'Start here',
    pt: 'Comece aqui',
    icon: '🧊',
    items: [
      item('/3d/overview', '3D Engine Overview', 'Visão Geral da Engine 3D', 'NEW'),
      item('/3d/game-shape', 'The Shape of a Game', 'A Forma de um Jogo'),
    ],
  },
  {
    id: '3d-core',
    area: 'engine',
    scope: '3d',
    en: 'Engine & Input',
    pt: 'Engine & Entrada',
    icon: '⚙️',
    items: [
      item('/3d/engine', 'engine & createGame', 'engine & createGame'),
      item('/3d/input', 'input', 'input'),
      item('/3d/controls', 'controls', 'controls'),
      item('/3d/physics', 'physics', 'physics'),
      item('/3d/state', 'state', 'state'),
    ],
  },
  {
    id: '3d-world',
    area: 'engine',
    scope: '3d',
    en: 'World & Look',
    pt: 'Mundo & Aparência',
    icon: '🌍',
    items: [
      item('/3d/models', 'models', 'models'),
      item('/3d/materials', 'materials', 'materials'),
      item('/3d/lights', 'lights', 'lights'),
      item('/3d/postfx', 'postfx', 'postfx'),
      item('/3d/effects', 'effects', 'effects'),
    ],
  },
  {
    id: '3d-feel',
    area: 'engine',
    scope: '3d',
    en: 'Feel & Interface',
    pt: 'Sensação & Interface',
    icon: '🎛️',
    items: [
      item('/3d/animation', 'animation', 'animation'),
      item('/3d/sound', 'sound', 'sound'),
      item('/3d/hud', 'hud', 'hud'),
    ],
  },
  {
    id: '3d-tools',
    area: 'engine',
    scope: '3d',
    en: 'Tooling',
    pt: 'Ferramental',
    icon: '🧰',
    items: [
      item('/3d/debug', 'debug', 'debug'),
      item('/3d/math', 'math', 'math'),
      item('/3d/probe', 'probe', 'probe'),
    ],
  },

  // ── Tools ─────────────────────────────────────────────────────────────────
  {
    id: 'visual-editor',
    area: 'tools',
    scope: '2d',
    en: 'Visual Editor',
    pt: 'Editor Visual',
    icon: '🖊️',
    items: [item('/visual-editor', 'Visual Editor Workflow', 'Workflow do Editor Visual', 'NEW')],
  },
  {
    id: 'configuration',
    area: 'tools',
    en: 'Configuration',
    pt: 'Configuração',
    icon: '🛠️',
    items: [
      item('/tools/config', 'egm.config.ts', 'egm.config.ts'),
      item('/tools/testing', 'Testing', 'Testes'),
    ],
  },
  {
    id: 'cli',
    area: 'tools',
    en: 'CLI',
    pt: 'CLI',
    icon: '💻',
    items: [
      item('/cli/new', 'egm new', 'egm new'),
      item('/cli/simulate', 'egm simulate', 'egm simulate'),
      item('/cli/build', 'egm build', 'egm build'),
      item('/cli/test', 'egm test', 'egm test'),
      item('/cli/e2e', 'egm e2e', 'egm e2e'),
      item('/cli/editor', 'egm editor', 'egm editor', 'BETA'),
      item('/cli/go', 'egm go', 'egm go'),
      item('/cli/login', 'egm login', 'egm login', 'NEW'),
      item('/cli/publish', 'egm publish', 'egm publish', 'NEW'),
    ],
  },
  {
    id: 'simulator',
    area: 'tools',
    en: 'Simulator',
    pt: 'Simulador',
    icon: '📱',
    items: [
      item('/simulator/overview', 'Overview', 'Visão Geral'),
      item('/simulator/devtools', 'DevTools', 'DevTools'),
      item('/simulator/tunnel', 'ngrok Tunnel', 'Túnel ngrok'),
      item('/simulator/egmgo', 'EgmGO App', 'App EgmGO'),
    ],
  },
  {
    id: 'build',
    area: 'tools',
    en: 'Build Targets',
    pt: 'Alvos de Build',
    icon: '📦',
    items: [
      item('/build/desktop', 'Desktop', 'Desktop'),
      item('/build/web', 'Web', 'Web'),
      item('/build/mobile', 'iOS & Android', 'iOS & Android'),
      item('/build/tv', 'Smart TV', 'Smart TV'),
      item('/build/consoles', 'Consoles', 'Consoles'),
    ],
  },

  // ── Examples ──────────────────────────────────────────────────────────────
  {
    id: 'examples',
    area: 'examples',
    en: 'Gallery',
    pt: 'Galeria',
    icon: '🎲',
    items: [
      item('/examples', 'All Examples', 'Todos os Exemplos'),
      item('/examples/pong', 'Pong', 'Pong', undefined, '2d'),
      item('/examples/tetris', 'Tetris', 'Tetris', undefined, '2d'),
      item('/examples/chess', 'Chess', 'Xadrez', undefined, '2d'),
      item('/examples/air1945', '1945 Air Force', '1945 Air Force', undefined, '2d'),
      item('/examples/star-catch', 'Star Catch', 'Star Catch', undefined, '2d'),
      item('/examples/cut-the-rope', 'Cut the Rope', 'Cut the Rope', undefined, '2d'),
      item('/examples/fhz', 'Fruits Hate Zombies', 'Fruits Hate Zombies', undefined, '2d'),
      item('/examples/small-mission', 'Small Mission', 'Small Mission', undefined, '2d'),
      item('/examples/monetization-demo', 'Monetization Demo', 'Demo de Monetização', undefined, '2d'),
      item('/examples/street-brazil-fighter', 'Street Brazil Fighter', 'Street Brazil Fighter', undefined, '2d'),
      item('/examples/coin-run-3d', 'Coin Run 3D', 'Coin Run 3D', undefined, '3d'),
      item('/examples/orbit-dodge-3d', 'Orbit Dodge 3D', 'Orbit Dodge 3D', undefined, '3d'),
      item('/examples/neon-siege-3d', 'Neon Siege 3D', 'Neon Siege 3D', undefined, '3d'),
    ],
  },
]

export const ALL_ITEMS: NavItem[] = NAVIGATION.flatMap((s) => s.items)

const matchesType = (scope: GameType | undefined, type: GameType): boolean => !scope || scope === type

/** Sections of an area with only the items that apply to the chosen game type; empty sections are dropped. */
export function visibleSections(area: AreaId, type: GameType): NavSection[] {
  return NAVIGATION.filter((s) => s.area === area && matchesType(s.scope, type))
    .map((s) => ({ ...s, items: s.items.filter((i) => matchesType(i.scope, type)) }))
    .filter((s) => s.items.length > 0)
}

export function areaHome(area: Area, type: GameType): string {
  return typeof area.home === 'string' ? area.home : area.home[type]
}

export function areaOfSlug(slug: string): AreaId {
  const section = NAVIGATION.find((s) => s.items.some((i) => i.slug === slug))
  if (section) return section.area
  if (slug.startsWith('/examples')) return 'examples'
  return 'guide'
}

/** The game type a page belongs to, or undefined when it is useful for both. */
export function scopeOfSlug(slug: string): GameType | undefined {
  for (const section of NAVIGATION) {
    const found = section.items.find((i) => i.slug === slug)
    if (found) return found.scope ?? section.scope
  }
  return undefined
}

/** The item before and after `slug` in reading order, inside its area and for the chosen game type. */
export function neighbours(slug: string, type: GameType): { prev?: NavItem; next?: NavItem } {
  const items = visibleSections(areaOfSlug(slug), type).flatMap((s) => s.items)
  const i = items.findIndex((x) => x.slug === slug)
  if (i < 0) return {}
  return { prev: items[i - 1], next: items[i + 1] }
}

/** "Engine" becomes "2D Engine" or "3D Engine" once a game type is known. */
export function areaLabel(area: Area, type: GameType | undefined, lang: 'en' | 'pt'): string {
  return area.id === 'engine' && type ? `${type.toUpperCase()} ${area[lang]}` : area[lang]
}
