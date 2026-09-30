import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/effects',
  title: t('effects', 'effects'),
  description: t(
    'Particles, shockwaves, trails and ambient dust, all drawn through cheap fixed-size buffers.',
    'Partículas, ondas de choque, rastros e poeira ambiente, tudo desenhado por buffers baratos de tamanho fixo.',
  ),
  source: 'src/engine3d/particles.ts',
  related: ['/3d/materials', '/3d/animation', '/3d/models', '/3d/postfx'],
  sections: [
    {
      id: 'overview',
      title: t('Why one Points object', 'Por que um único Points'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Sparks, smoke, debris and trails make an event feel like it happened. Everything here runs through one `Points` object with a fixed buffer allocated once. Spawning a mesh per particle is why games stutter: a hundred meshes is a hundred draw calls, and the garbage lands as a hitch at the worst moment. A burst of five hundred particles here costs one draw call and zero allocations.',
            'Faíscas, fumaça, destroços e rastros fazem um evento parecer que aconteceu. Tudo aqui passa por um único objeto `Points` com um buffer fixo alocado uma vez. Criar um mesh por partícula é o motivo de jogos travarem: cem meshes são cem draw calls, e o lixo cai como um engasgo na pior hora. Uma explosão de quinhentas partículas aqui custa uma draw call e nenhuma alocação.',
          ),
        },
        {
          type: 'p',
          text: t(
            'Use the `effects` namespace (`effects.createParticles`) or the flat exports `createParticles`, `createTrail`, `createAmbience` and `shockwave`.',
            'Use o namespace `effects` (`effects.createParticles`) ou os exports diretos `createParticles`, `createTrail`, `createAmbience` e `shockwave`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Burst, shockwave, trail and dust', 'Explosão, onda de choque, rastro e poeira'),
          code: `import { createGame, lights, models, createParticles, createTrail, createAmbience, shockwave } from 'easy-game-maker/3d'

const game = createGame({ background: '#0b1020' })
lights.night(game.scene)
game.add(models.ground(60))

const fx = createParticles(game.engine, { max: 800 })
createAmbience(game.engine, { count: 300, radius: 30, color: '#94a3b8' })

const orb = game.add(models.sphere(0.3, { color: '#f97316', position: [0, 1, 0] }))
createTrail(game.engine, orb, { length: 32, color: '#f97316' })

game.onUpdate((_dt, elapsed) => {
  orb.position.x = Math.sin(elapsed * 2) * 5
})

window.addEventListener('pointerdown', () => {
  fx.burst(orb.position, { color: '#f97316', count: 24 })
  shockwave(game.engine, orb.position, { color: '#f97316', to: 5 })
})`,
        },
      ],
    },
    {
      id: 'particles',
      title: t('Particle systems', 'Sistemas de partículas'),
      blocks: [
        {
          type: 'props',
          title: t('createParticles(engine, options)', 'createParticles(engine, options)'),
          rows: [
            { name: 'max', type: 'number', default: '600', description: t('Buffer size: the most particles alive at once. It is a ring buffer, so a burst larger than the buffer overwrites its own oldest particles.', 'Tamanho do buffer: o máximo de partículas vivas ao mesmo tempo. É um buffer circular, então uma explosão maior que o buffer sobrescreve as próprias partículas mais antigas.') },
            { name: 'size', type: 'number', default: '0.18', description: t('Default particle size.', 'Tamanho padrão da partícula.') },
            { name: 'color', type: 'ColorRepresentation', description: t('Default particle colour.', 'Cor padrão da partícula.') },
            { name: 'texture', type: 'Texture', description: t('The sprite each particle draws (default a soft white spark). It is disposed together with the system.', 'O sprite que cada partícula desenha (por padrão uma faísca branca suave). É descartado junto com o sistema.') },
            { name: 'gravity', type: 'number', default: '-9', description: t('Gravity applied to particles.', 'Gravidade aplicada às partículas.') },
            { name: 'blending', type: 'THREE.Blending', description: t('Defaults to additive, so overlapping sparks brighten.', 'Por padrão é aditivo, então faíscas sobrepostas clareiam.') },
            { name: 'parent', type: 'Object3D', description: t('What the points are added to (default the scene).', 'Onde os pontos são adicionados (por padrão a cena).') },
          ],
        },
        {
          type: 'table',
          head: [t('Method', 'Método'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`fx.burst`', '`fx.burst`'), t('`burst(position, { count = 20, color, speed = 4, spread = 1, lifetime = 0.8, size, direction, drag = 1.2, gravityScale = 1 })`', '`burst(position, { count = 20, color, speed = 4, spread = 1, lifetime = 0.8, size, direction, drag = 1.2, gravityScale = 1 })`'), t('A one-off spray: hits, pickups, explosions. `position` is a `Vector3` or `[x, y, z]`. Lifetime varies 30% per particle.', 'Um jato único: acertos, itens coletados, explosões. `position` é um `Vector3` ou `[x, y, z]`. O tempo de vida varia 30% por partícula.')],
            [t('`fx.stream`', '`fx.stream`'), t('`stream(position, dt, { rate = 30, ...burst options })`', '`stream(position, dt, { rate = 30, ...opções do burst })`'), t('A continuous emitter: call it every frame; it emits the right number whatever the framerate.', 'Um emissor contínuo: chame a cada quadro; ele emite a quantidade certa em qualquer taxa de quadros.')],
            [t('`fx.spray`', '`fx.spray`'), t('`spray(position, direction, options)`', '`spray(position, direction, options)`'), t('A cone along a direction (must be a `Vector3`, normalised for you): muzzle flashes, thrusters.', 'Um cone ao longo de uma direção (precisa ser um `Vector3`, normalizado por você): clarões de tiro, propulsores.')],
            [t('`fx.smoke`', '`fx.smoke`'), t('`smoke(position, options)`', '`smoke(position, options)`'), t('Slow, rising, fading. Grey, 10 particles, size 0.5 by default. Use non-additive `blending` in the system for it to read as smoke rather than light.', 'Lenta, subindo e sumindo. Cinza, 10 partículas, tamanho 0,5 por padrão. Use `blending` não aditivo no sistema para parecer fumaça e não luz.')],
            [t('`fx.clear`', '`fx.clear`'), t('`clear()`', '`clear()`'), t('Kills every particle.', 'Mata todas as partículas.')],
            [t('`fx.dispose`', '`fx.dispose`'), t('`dispose()`', '`dispose()`'), t('Stops updating, removes the points from their parent, frees geometry, material and texture.', 'Para de atualizar, remove os pontos do pai e libera geometria, material e textura.')],
          ],
        },
        {
          type: 'p',
          text: t(
            '`fx.points` and `fx.material` expose the underlying `Points` and `ShaderMaterial`. Particles hold full strength for the first half of their life and fade over the second; size and fade are per particle.',
            '`fx.points` e `fx.material` expõem o `Points` e o `ShaderMaterial` por baixo. As partículas mantêm força total na primeira metade da vida e desbotam na segunda; tamanho e desbotamento são por partícula.',
          ),
        },
      ],
    },
    {
      id: 'others',
      title: t('Other effects', 'Outros efeitos'),
      blocks: [
        {
          type: 'table',
          head: [t('Name', 'Nome'), t('Signature', 'Assinatura'), t('Notes', 'Notas')],
          rows: [
            [t('`shockwave`', '`shockwave`'), t('`shockwave(engine, position, { color, from = 0.4, to = 6, duration = 0.5, thickness = 0.25, vertical = false })`', '`shockwave(engine, position, { color, from = 0.4, to = 6, duration = 0.5, thickness = 0.25, vertical = false })`'), t('An expanding, fading ring: area-of-effect tells, landings. `position` is `{ x, y, z }` (a `Vector3` works, a tuple does not). It removes itself when done and returns the mesh.', 'Um anel que se expande e some: avisos de área de efeito, aterrissagens. `position` é `{ x, y, z }` (um `Vector3` serve, uma tupla não). Ele se remove ao terminar e devolve o mesh.')],
            [t('`createTrail`', '`createTrail`'), t('`createTrail(engine, target, { length = 24, color, width = 2, parent })`', '`createTrail(engine, target, { length = 24, color, width = 2, parent })`'), t('A ribbon that follows `target` as a rolling history of positions. Returns `{ line, dispose() }`. Most platforms draw lines one pixel wide whatever `width` says.', 'Uma fita que segue `target` como um histórico rolante de posições. Devolve `{ line, dispose() }`. A maioria das plataformas desenha linhas de um pixel, seja qual for o `width`.')],
            [t('`createAmbience`', '`createAmbience`'), t('`createAmbience(engine, { count = 400, radius = 60, color, size = 0.12, drift = 0.4, follow })`', '`createAmbience(engine, { count = 400, radius = 60, color, size = 0.12, drift = 0.4, follow })`'), t('Drifting dust or a starfield as one cheap `Points`. `follow` keeps the field centred on an object (x and z only). Returns the `Points` with an added `dispose()`.', 'Poeira à deriva ou campo de estrelas como um único `Points` barato. `follow` mantém o campo centrado num objeto (só x e z). Devolve o `Points` com um `dispose()` a mais.')],
          ],
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Host slices', 'Fatias do host'),
          text: t(
            'The systems need only a slice of the engine: `ParticlesHost` is `scene` plus `onUpdate`, and `TrailHost` is `scene` plus `onLateUpdate`. Passing `game` or `game.engine` both work.',
            'Os sistemas só precisam de uma fatia da engine: `ParticlesHost` é `scene` mais `onUpdate`, e `TrailHost` é `scene` mais `onLateUpdate`. Passar `game` ou `game.engine` funciona nos dois casos.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            'Dispose what you create when a level ends: `createParticles(...).dispose()` also unregisters its `onUpdate` listener, and `createAmbience` and `createTrail` have their own `dispose()`.',
            'Descarte o que você cria quando a fase acaba: `createParticles(...).dispose()` também remove seu listener de `onUpdate`, e `createAmbience` e `createTrail` têm o próprio `dispose()`.',
          ),
        },
      ],
    },
  ],
}

export default page
