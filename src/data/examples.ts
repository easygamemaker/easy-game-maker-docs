import { t, type L10n } from '@/content/types'
import type { GameType } from './navigation'

/** Same text in both languages: key names, tool names. */
const k = (text: string): L10n => t(text, text)

export const EXAMPLES_REPO = 'https://github.com/easygamemaker/easy-game-maker-examples'

export interface ExampleControl {
  input: L10n
  action: L10n
}

export interface Example {
  slug: string
  /** Folder inside the examples repository. */
  folder: string
  type: GameType
  name: L10n
  genre: L10n
  tagline: L10n
  /** What the game is and what it shows about the engine. */
  about: L10n
  image: string
  /** When set, the game is embedded and playable at /demos/<demo>/index.html (kept apart from the /examples docs routes). */
  demo?: string
  canvas: string
  controls: ExampleControl[]
  highlights: L10n[]
  /** SDK symbols the game imports, extracted from its source. */
  sdk: string[]
  /** TypeScript files and lines under src/. */
  files: number
  lines: number
  tests: number
  extras: L10n[]
}

/** Where each SDK symbol is documented. Used to turn the "SDK used" chips into links. */
export const SDK_DOCS: Record<string, string> = {
  App: '/core/app',
  Scene: '/core/scene',
  SceneParams: '/core/scene',
  SceneEvents: '/core/visual-scene',
  VisualScene: '/core/visual-scene',
  Texture: '/core/textures',
  WebGLRenderer: '/core/renderer',
  RectShape: '/display/rect-shape',
  CircleShape: '/display/circle-shape',
  Text: '/display/text',
  Group: '/display/group',
  Sprite: '/display/sprite',
  AnimatedSprite: '/display/animated-sprite',
  Easing: '/animation/easing',
  TransitionManager: '/animation/transitions',
  PhysicsWorld: '/physics/world',
  PhysicsBody: '/physics/body',
  PointerEvent2D: '/input/keyboard-mouse',
  NetworkRoom: '/network/room',
  AdManager: '/monetization/ads',
  IAPManager: '/monetization/iap',
  GButton: '/input/gamepad',
  GAxis: '/input/gamepad',
  PolygonShape: '/display/polygon-shape',
  // 3D engine (easy-game-maker/3d)
  createGame: '/3d/engine',
  thirdPerson: '/3d/controls',
  firstPerson: '/3d/controls',
  createPhysics: '/3d/physics',
  createCooldown: '/3d/state',
  createDifficulty: '/3d/state',
  createShake: '/3d/animation',
  Spring: '/3d/animation',
  followCamera: '/3d/controls',
  hits: '/3d/physics',
  createStateMachine: '/3d/state',
  createScore: '/3d/state',
  createTicker: '/3d/state',
  models: '/3d/models',
  materials: '/3d/materials',
  lights: '/3d/lights',
  createPostFX: '/3d/postfx',
  createParticles: '/3d/effects',
  createAmbience: '/3d/effects',
  shockwave: '/3d/effects',
  pop: '/3d/animation',
  flash: '/3d/animation',
  math: '/3d/math',
}

export const EXAMPLES: Example[] = [
  {
    slug: 'pong',
    folder: 'pong',
    type: '2d',
    name: t('Pong', 'Pong'),
    genre: t('Arcade, two players', 'Arcade, dois jogadores'),
    tagline: t('Two paddles, one ball, first to five.', 'Duas raquetes, uma bola, quem chegar a cinco vence.'),
    about: t(
      'The smallest complete game in the set: one scene, rectangles for everything, collision written by hand. A good first read to see how an EGM game is put together.',
      'O menor jogo completo do conjunto: uma cena, retângulos para tudo e colisão escrita à mão. Uma boa primeira leitura para ver como um jogo EGM é montado.',
    ),
    image: '/images/examples/pong.webp',
    demo: 'pong',
    canvas: '800 × 500',
    controls: [
      { input: k('W / S'), action: t('Player 1 up and down', 'Jogador 1 sobe e desce') },
      { input: k('↑ / ↓'), action: t('Player 2 up and down', 'Jogador 2 sobe e desce') },
      { input: k('Space'), action: t('Serve the ball', 'Sacar a bola') },
    ],
    highlights: [
      t('The ball speeds up with each rally.', 'A bola acelera a cada rebatida.'),
      t('A new match starts by itself after a winner.', 'Uma nova partida começa sozinha depois de um vencedor.'),
    ],
    sdk: ['App', 'Scene', 'RectShape', 'Text', 'Easing', 'SceneParams', 'TransitionManager'],
    files: 3,
    lines: 337,
    tests: 2,
    extras: [k('Vitest')],
  },
  {
    slug: 'tetris',
    folder: 'tetris',
    type: '2d',
    name: t('Tetris', 'Tetris'),
    genre: t('Puzzle', 'Quebra-cabeça'),
    tagline: t('Score, levels and a next-piece preview.', 'Pontuação, níveis e prévia da próxima peça.'),
    about: t(
      'A full Tetris clone with a menu, high score and levels from 1 to 15. It shows how to keep game rules (the board) apart from drawing, so they can be tested without a renderer.',
      'Um clone completo de Tetris com menu, recorde e níveis de 1 a 15. Mostra como separar as regras do jogo (o tabuleiro) do desenho, para poder testá-las sem renderizador.',
    ),
    image: '/images/examples/tetris.webp',
    demo: 'tetris',
    canvas: '500 × 660',
    controls: [
      { input: k('← → / A D'), action: t('Move', 'Mover') },
      { input: k('↑ / W'), action: t('Rotate', 'Girar') },
      { input: k('↓ / S'), action: t('Soft drop', 'Descida suave') },
      { input: k('Space'), action: t('Hard drop', 'Descida direta') },
      { input: k('P'), action: t('Pause', 'Pausar') },
    ],
    highlights: [
      t('Speed grows every ten lines.', 'A velocidade aumenta a cada dez linhas.'),
      t('Clearing four lines at once scores the most.', 'Limpar quatro linhas de uma vez rende mais pontos.'),
    ],
    sdk: ['App', 'Scene', 'RectShape', 'Text', 'SceneParams', 'TransitionManager', 'Easing'],
    files: 4,
    lines: 884,
    tests: 2,
    extras: [k('Vitest')],
  },
  {
    slug: 'chess',
    folder: 'chess',
    type: '2d',
    name: t('Chess', 'Xadrez'),
    genre: t('Board game, two players', 'Jogo de tabuleiro, dois jogadores'),
    tagline: t('All the rules: castling, en passant, promotion, checkmate.', 'Todas as regras: roque, en passant, promoção e xeque-mate.'),
    about: t(
      'A complete chess game where the rules live in their own module (move generation, check and checkmate) and the scene only draws and reacts to clicks.',
      'Um jogo de xadrez completo em que as regras ficam em um módulo próprio (geração de lances, xeque e xeque-mate) e a cena apenas desenha e reage aos cliques.',
    ),
    image: '/images/examples/chess.webp',
    demo: 'chess',
    canvas: '560 × 620',
    controls: [
      { input: k('Click / Tap'), action: t('Select a piece, then a highlighted square', 'Selecionar uma peça e depois uma casa destacada') },
    ],
    highlights: [
      t('Valid moves are highlighted before you commit.', 'Os lances válidos são destacados antes de você jogar.'),
      t('Pass-and-play on one device.', 'Dois jogadores no mesmo dispositivo.'),
    ],
    sdk: ['App', 'Scene', 'RectShape', 'Text', 'SceneParams', 'TransitionManager', 'Easing'],
    files: 5,
    lines: 1178,
    tests: 2,
    extras: [k('Vitest')],
  },
  {
    slug: 'air1945',
    folder: 'air1945',
    type: '2d',
    name: t('1945 Air Force', '1945 Air Force'),
    genre: t('Vertical shoot-’em-up', 'Shoot-’em-up vertical'),
    tagline: t('Waves, power-ups and a boss at the end of each wave.', 'Ondas de inimigos, power-ups e um chefe no fim de cada onda.'),
    about: t(
      'An arcade shooter with spawn patterns, bullet pools and a boss fight. It shows a larger game split into a game folder (player, enemies, bullets) and scenes.',
      'Um shooter de fliperama com padrões de geração, bullets e luta contra chefe. Mostra um jogo maior dividido em uma pasta de jogo (jogador, inimigos, tiros) e cenas.',
    ),
    image: '/images/examples/air1945.webp',
    demo: 'air1945',
    canvas: '420 × 680',
    controls: [
      { input: k('W A S D / arrows'), action: t('Move', 'Mover') },
      { input: k('Space / tap'), action: t('Shoot', 'Atirar') },
      { input: k('P / Esc'), action: t('Pause', 'Pausar') },
    ],
    highlights: [
      t('Three lives per run.', 'Três vidas por partida.'),
      t('Power-ups raise fire rate and bullet count.', 'Power-ups aumentam a cadência e o número de tiros.'),
    ],
    sdk: ['RectShape', 'App', 'Group', 'Scene', 'Text', 'SceneParams', 'TransitionManager', 'Easing'],
    files: 8,
    lines: 1640,
    tests: 2,
    extras: [k('Vitest')],
  },
  {
    slug: 'star-catch',
    folder: 'star-catch',
    type: '2d',
    name: t('Star Catch', 'Star Catch'),
    genre: t('Casual, one finger', 'Casual, com um dedo'),
    tagline: t('Catch the stars, dodge the bombs.', 'Pegue as estrelas, desvie das bombas.'),
    about: t(
      'Built with the visual editor: scenes are JSON views (public/views) and the code only holds the behaviour in *.events.ts files. It is the reference for the VisualScene workflow.',
      'Feito com o editor visual: as cenas são views em JSON (public/views) e o código guarda só o comportamento nos arquivos *.events.ts. É a referência do fluxo com VisualScene.',
    ),
    image: '/images/examples/star-catch.webp',
    demo: 'star-catch',
    canvas: '360 × 640',
    controls: [
      { input: k('Space / tap'), action: t('Start and move to the menu', 'Iniciar e voltar ao menu') },
    ],
    highlights: [
      t('A pool of falling objects instead of creating and destroying them.', 'Um pool de objetos em queda em vez de criar e destruir.'),
      t('Scenes are discovered with import.meta.glob.', 'As cenas são descobertas com import.meta.glob.'),
    ],
    sdk: ['App', 'SceneEvents', 'VisualScene', 'RectShape', 'Text'],
    files: 4,
    lines: 293,
    tests: 0,
    extras: [t('Visual editor', 'Editor visual')],
  },
  {
    slug: 'cut-the-rope',
    folder: 'cut-the-rope',
    type: '2d',
    name: t('Cut the Rope', 'Cut the Rope'),
    genre: t('Physics puzzle', 'Quebra-cabeça de física'),
    tagline: t('Cut ropes to swing the candy into the monster’s mouth.', 'Corte as cordas para levar o doce até a boca do monstro.'),
    about: t(
      'A rope simulation built on planck.js (a Box2D port) through the engine’s PhysicsWorld, with drag-to-cut input and sprite art.',
      'Uma simulação de corda sobre o planck.js (um port do Box2D) pelo PhysicsWorld da engine, com corte por arrasto e arte em sprites.',
    ),
    image: '/images/examples/cut-the-rope.webp',
    demo: 'cut-the-rope',
    canvas: '360 × 640',
    controls: [
      { input: t('Drag', 'Arrastar'), action: t('Cut a rope with mouse or touch', 'Cortar uma corda com mouse ou toque') },
    ],
    highlights: [
      t('Rope segments respond to gravity and momentum.', 'Os segmentos da corda respondem à gravidade e ao momento.'),
      t('Three stars to collect for a perfect score.', 'Três estrelas para coletar em uma pontuação perfeita.'),
    ],
    sdk: ['Group', 'Texture', 'App', 'Sprite', 'RectShape', 'PhysicsWorld', 'CircleShape', 'WebGLRenderer', 'PointerEvent2D', 'PhysicsBody', 'Scene', 'Text', 'TransitionManager', 'Easing', 'SceneParams', 'AnimatedSprite'],
    files: 11,
    lines: 1104,
    tests: 2,
    extras: [k('planck.js'), k('Vitest')],
  },
  {
    slug: 'fhz',
    folder: 'fhz',
    type: '2d',
    name: t('Fruits Hate Zombies', 'Fruits Hate Zombies'),
    genre: t('Physics catapult', 'Catapulta com física'),
    tagline: t('Launch fruit from a slingshot at zombie houses.', 'Lance frutas de um estilingue contra as casas dos zumbis.'),
    about: t(
      'The largest example: a level select, single and dual-catapult levels, star ratings and a results scene. It shows how to organise many scenes and level data.',
      'O maior exemplo: seleção de fases, fases com uma e com duas catapultas, notas em estrelas e uma cena de resultado. Mostra como organizar muitas cenas e dados de fase.',
    ),
    image: '/images/examples/fhz.webp',
    canvas: '568 × 320',
    controls: [
      { input: t('Drag back', 'Arrastar para trás'), action: t('Aim the catapult; the farther you pull, the stronger the shot', 'Mirar a catapulta: quanto mais você puxa, mais forte o tiro') },
      { input: t('Release', 'Soltar'), action: t('Launch', 'Lançar') },
    ],
    highlights: [
      t('Levels are data (config/levels.ts), scenes are generic.', 'As fases são dados (config/levels.ts) e as cenas são genéricas.'),
      t('Dual-lane levels with two catapults.', 'Fases com duas pistas e duas catapultas.'),
    ],
    sdk: ['App', 'Group', 'RectShape', 'PointerEvent2D', 'TransitionManager', 'Texture', 'Scene', 'Sprite', 'Text', 'Easing', 'PhysicsWorld', 'WebGLRenderer', 'SceneParams', 'PhysicsBody', 'AnimatedSprite'],
    files: 28,
    lines: 2636,
    tests: 4,
    extras: [k('planck.js'), k('Vitest'), k('E2E')],
  },
  {
    slug: 'small-mission',
    folder: 'small-mission',
    type: '2d',
    name: t('Small Mission', 'Small Mission'),
    genre: t('Multiplayer top-down shooter', 'Shooter multiplayer top-down'),
    tagline: t('Up to six players, one map, ninety seconds.', 'Até seis jogadores, um mapa, noventa segundos.'),
    about: t(
      'A client and a server: the EGM game connects through NetworkRoom to a plain WebSocket backend that owns the rules (bullets, hits, pickups). It needs its server running, so it is not embedded here.',
      'Um cliente e um servidor: o jogo EGM se conecta pelo NetworkRoom a um backend WebSocket simples que é dono das regras (tiros, acertos, coletas). Precisa do servidor rodando, por isso não é embutido aqui.',
    ),
    image: '/images/examples/small-mission.webp',
    canvas: '900 × 640',
    controls: [
      { input: k('W A S D'), action: t('Move', 'Mover') },
      { input: t('Mouse', 'Mouse'), action: t('Aim', 'Mirar') },
      { input: t('Click / Space', 'Clique / Espaço'), action: t('Shoot', 'Atirar') },
    ],
    highlights: [
      t('Server-authoritative: the server decides hits and pickups.', 'Servidor autoritativo: o servidor decide acertos e coletas.'),
      t('Three hit points, eight bullets per magazine, respawn after three seconds.', 'Três pontos de vida, oito balas por carregador, retorno após três segundos.'),
    ],
    sdk: ['RectShape', 'Text', 'App', 'Group', 'Scene', 'SceneParams', 'CircleShape', 'NetworkRoom'],
    files: 11,
    lines: 1662,
    tests: 0,
    extras: [k('WebSocket'), k('Node.js')],
  },
  {
    slug: 'monetization-demo',
    folder: 'monetization-demo',
    type: '2d',
    name: t('Monetization Demo', 'Demo de Monetização'),
    genre: t('Tool demo', 'Demonstração'),
    tagline: t('Ads and in-app purchases, simulated.', 'Anúncios e compras no app, simulados.'),
    about: t(
      'Try AdManager and IAPManager in the browser: in the simulator they show realistic mock ads and purchase sheets, and in a native build they call AdMob and the stores.',
      'Experimente o AdManager e o IAPManager no navegador: no simulador eles mostram anúncios e telas de compra simulados e, em um build nativo, chamam o AdMob e as lojas.',
    ),
    image: '/images/examples/monetization-demo.webp',
    demo: 'monetization-demo',
    canvas: '800 × 600',
    controls: [
      { input: t('Click', 'Clique'), action: t('Toggle a banner, show an interstitial, watch a rewarded ad, buy a product', 'Alternar o banner, mostrar um intersticial, ver um anúncio com recompensa, comprar um produto') },
    ],
    highlights: [
      t('Uses Google’s public test ad ids, so it is safe to run.', 'Usa os ids públicos de teste do Google, então é seguro executar.'),
      t('The monetization block of egm.config.ts drives the native bridges.', 'O bloco monetization do egm.config.ts define as pontes nativas.'),
    ],
    sdk: ['App', 'Scene', 'Group', 'RectShape', 'Text', 'SceneParams', 'AdManager', 'IAPManager'],
    files: 2,
    lines: 202,
    tests: 0,
    extras: [k('AdMob'), k('IAP')],
  },
  {
    slug: 'coin-run-3d',
    folder: 'coin-run-3d',
    type: '3d',
    name: t('Coin Run 3D', 'Coin Run 3D'),
    genre: t('Arcade, third person', 'Arcade, terceira pessoa'),
    tagline: t('Grab as many coins as you can before the clock runs out.', 'Pegue o máximo de moedas antes que o tempo acabe.'),
    about: t(
      'A small island, a runner and 45 seconds. Coins picked up in quick succession build a streak that pays more. The scoring, the streak and the coin placement live in a module with no three.js in it, so they are tested in plain Node.',
      'Uma ilha pequena, um corredor e 45 segundos. Moedas pegas em sequência rápida formam uma série que vale mais. A pontuação, a série e o sorteio das moedas ficam em um módulo sem three.js, por isso são testados em Node puro.',
    ),
    image: '/images/examples/coin-run-3d.webp',
    demo: 'coin-run-3d',
    canvas: '1280 × 720',
    controls: [
      { input: k('W A S D / ← ↑ ↓ →'), action: t('Run around the island', 'Correr pela ilha') },
      { input: k('Space / Enter'), action: t('Start a run, or run again', 'Começar uma corrida ou correr de novo') },
    ],
    highlights: [
      t('A third-person character with a chase camera and a blob shadow.', 'Um personagem em terceira pessoa com câmera de perseguição e sombra em mancha.'),
      t('Coins hop to a new spot when picked up, and the best score is saved.', 'As moedas mudam de lugar quando são pegas, e a melhor pontuação fica salva.'),
      t('Sound is synthesised by the engine: there are no asset files.', 'O som é sintetizado pela engine: não há arquivos de recursos.'),
    ],
    sdk: ['createGame', 'thirdPerson', 'followCamera', 'lights', 'models', 'materials', 'math', 'hits', 'createParticles', 'createPostFX', 'createStateMachine', 'createScore', 'createTicker', 'pop'],
    files: 3,
    lines: 393,
    tests: 1,
    extras: [k('Vitest'), k('three.js')],
  },
  {
    slug: 'orbit-dodge-3d',
    folder: 'orbit-dodge-3d',
    type: '3d',
    name: t('Orbit Dodge 3D', 'Orbit Dodge 3D'),
    genre: t('Lane runner, space', 'Corrida por faixas, espaço'),
    tagline: t('Slip through the gaps in rows of asteroids at rising speed.', 'Passe pelas brechas em fileiras de asteroides com velocidade crescente.'),
    about: t(
      'A ship races down a glowing runway while asteroid rows rush toward it. A state machine drives menu, play and game over, and a pool reuses the asteroids so nothing is allocated mid-run. The row generator always leaves a gap you can reach, and that rule is unit tested.',
      'Uma nave corre por uma pista brilhante enquanto fileiras de asteroides vêm em sua direção. Uma máquina de estados controla menu, jogo e fim de partida, e um pool reaproveita os asteroides para que nada seja alocado durante a corrida. O gerador de fileiras sempre deixa uma brecha alcançável, e essa regra tem teste unitário.',
    ),
    image: '/images/examples/orbit-dodge-3d.webp',
    demo: 'orbit-dodge-3d',
    canvas: '1280 × 720',
    controls: [
      { input: k('A D / ← →'), action: t('Steer the ship', 'Pilotar a nave') },
      { input: k('Space / Enter'), action: t('Launch, or launch again', 'Lançar ou lançar de novo') },
    ],
    highlights: [
      t('Three hull points, a flashing safe period after each hit, and screen shake.', 'Três pontos de casco, um período de proteção piscando após cada colisão e tremor de tela.'),
      t('The field of view widens with speed and the runway scrolls under the ship.', 'O campo de visão se abre com a velocidade e a pista rola sob a nave.'),
      t('Bloom on glowing materials; add ?fx=off to the address to turn it off.', 'Bloom nos materiais brilhantes; adicione ?fx=off ao endereço para desligá-lo.'),
    ],
    sdk: ['createGame', 'followCamera', 'lights', 'models', 'materials', 'math', 'createAmbience', 'createParticles', 'shockwave', 'flash', 'pop', 'createPostFX', 'createStateMachine', 'createScore'],
    files: 3,
    lines: 489,
    tests: 1,
    extras: [k('Vitest'), k('three.js')],
  },
  {
    slug: 'neon-siege-3d',
    folder: 'neon-siege-3d',
    type: '3d',
    name: t('Neon Siege 3D', 'Neon Siege 3D'),
    genre: t('First-person shooter, waves', 'Tiro em primeira pessoa, ondas'),
    tagline: t('Hold a neon arena against waves of hovering drones.', 'Defenda uma arena de neon contra ondas de drones flutuantes.'),
    about: t(
      'A pulse rifle, a walled arena with cover and drones that close in, circle you and fire back. The rifle is a hitscan ray from the camera, so cover blocks shots as well as bolts. The weapon, health, wave director and drone steering live in a module with no three.js in it, so they are tested in plain Node.',
      'Um rifle de pulso, uma arena murada com abrigos e drones que se aproximam, dão voltas em você e revidam. O rifle é um raio instantâneo saindo da câmera, então os abrigos bloqueiam tanto os tiros quanto os disparos dos drones. A arma, a vida, o diretor de ondas e o movimento dos drones ficam em um módulo sem three.js, por isso são testados em Node puro.',
    ),
    image: '/images/examples/neon-siege-3d.webp',
    demo: 'neon-siege-3d',
    canvas: '1280 × 720',
    controls: [
      { input: k('W A S D'), action: t('Move', 'Andar') },
      { input: t('Mouse (click to capture)', 'Mouse (clique para capturar)'), action: t('Aim', 'Mirar') },
      { input: t('Left click', 'Botão esquerdo'), action: t('Fire (hold for automatic fire)', 'Atirar (segure para tiro automático)') },
      { input: k('R'), action: t('Reload', 'Recarregar') },
      { input: k('Shift / Space'), action: t('Sprint / jump', 'Correr / pular') },
    ],
    highlights: [
      t('A magazine of 30, a reserve and a reload, with health and ammo drops that favour what you are short of.', 'Um carregador de 30, uma reserva e a recarga, com itens de vida e munição que aparecem mais quando você precisa deles.'),
      t('Drones circle-strafe, glow before they fire and get faster and tougher every wave.', 'Os drones circulam, brilham antes de atirar e ficam mais rápidos e resistentes a cada onda.'),
      t('Muzzle flash, sparks, recoil and hit shake, with bloom; add ?fx=off to the address to turn bloom off.', 'Clarão do cano, faíscas, recuo e tremor ao ser atingido, com bloom; adicione ?fx=off ao endereço para desligá-lo.'),
    ],
    sdk: ['createGame', 'firstPerson', 'createPhysics', 'lights', 'models', 'materials', 'math', 'createAmbience', 'createParticles', 'shockwave', 'createShake', 'Spring', 'flash', 'pop', 'createPostFX', 'createStateMachine', 'createScore', 'createCooldown', 'createDifficulty', 'createTicker'],
    files: 5,
    lines: 1307,
    tests: 1,
    extras: [k('Vitest'), k('three.js')],
  },
  {
    slug: 'street-brazil-fighter',
    folder: 'street-brazil-fighter',
    type: '2d',
    name: t('Street Brazil Fighter', 'Street Brazil Fighter'),
    genre: t('Fighting game, 1P vs CPU or 2P', 'Jogo de luta, 1P contra a CPU ou 2P'),
    tagline: t('Six folklore fighters, nine Brazilian stages, best of three.', 'Seis lutadores do folclore, nove cenários brasileiros, melhor de três.'),
    about: t(
      'A Street Fighter style fighting game. The fight is a deterministic 60 Hz simulation in plain TypeScript with no engine imports (state machine, hitboxes as frame data, projectiles, rounds and a seeded AI), so it is unit tested in Node; the scenes only draw it. The stages and fighter sprites were generated with Nano Banana Pro and processed by scripts that are part of the example.',
      'Um jogo de luta no estilo Street Fighter. A luta é uma simulação determinística a 60 Hz em TypeScript puro, sem imports do motor (máquina de estados, hitboxes como dados de quadros, projéteis, rounds e uma IA com semente), por isso é testada em Node; as cenas só a desenham. Os cenários e os sprites foram gerados com o Nano Banana Pro e processados por scripts que fazem parte do exemplo.',
    ),
    image: '/images/examples/street-brazil-fighter.webp',
    canvas: '1300 × 700',
    controls: [
      { input: k('W A S D'), action: t('P1 move, jump, crouch', 'P1 andar, pular, agachar') },
      { input: k('J / K / L / U'), action: t('P1 punch, kick, special, block', 'P1 soco, chute, especial, defesa') },
      { input: t('Arrows', 'Setas'), action: t('P2 move, jump, crouch', 'P2 andar, pular, agachar') },
      { input: k('Numpad 1 / 2 / 3 / 0'), action: t('P2 punch, kick, special, block', 'P2 soco, chute, especial, defesa') },
      { input: t('Gamepad', 'Controle'), action: t('D-pad, X punch, A kick, Y special, B block', 'D-pad, X soco, A chute, Y especial, B defesa') },
      { input: k('Esc / P / Start'), action: t('Pause', 'Pausar') },
    ],
    highlights: [
      t('Six fighters with their own frame data and a different special each: a dash, four projectiles and a ground wave.', 'Seis lutadores com dados de quadros próprios e um especial diferente cada: um avanço, quatro projéteis e uma onda no chão.'),
      t('Three CPU difficulty levels driven by a seeded AI with reaction delay, spacing and blocking.', 'Três níveis de dificuldade da CPU, com uma IA de semente fixa que tem tempo de reação, distância e defesa.'),
      t('The stage is a wide image scrolled by a camera that follows the fighters; add ?autoplay=cpu&speed=8 to watch a CPU match, or ?hitboxes=1 to see the boxes.', 'O cenário é uma imagem larga rolada por uma câmera que segue os lutadores; adicione ?autoplay=cpu&speed=8 para ver uma partida da CPU, ou ?hitboxes=1 para ver as caixas.'),
    ],
    sdk: ['App', 'Scene', 'SceneParams', 'Group', 'Sprite', 'Text', 'RectShape', 'CircleShape', 'PolygonShape', 'Texture', 'GButton', 'GAxis'],
    files: 50,
    lines: 6373,
    tests: 167,
    extras: [k('Vitest'), t('Nano Banana Pro art', 'Arte do Nano Banana Pro')],
  },
]

export const getExample = (slug: string): Example | undefined => EXAMPLES.find((e) => e.slug === slug)
