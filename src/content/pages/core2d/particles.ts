import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/display/particles',
  title: t('ParticleEmitter', 'ParticleEmitter'),
  description: t(
    'A CPU particle system with a fixed pool, continuous emission, bursts and start/end size and color.',
    'Um sistema de partículas na CPU com pool fixo, emissão contínua, rajadas e tamanho e cor inicial/final.',
  ),
  source: 'src/engine/display/ParticleEmitter.ts',
  related: ['/display/sprite', '/core/textures', '/gameplay/object-pool', '/core/visual-scene'],
  sections: [
    {
      id: 'config',
      title: t('ParticleConfig', 'ParticleConfig'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Pass a `ParticleConfig` to the constructor; every field is optional. The pool of `maxParticles` particles is allocated once, and each live particle is drawn as one quad through the same batcher as sprites. Particles are simulated in the emitter local space, so moving the emitter moves the live particles with it.',
            'Passe um `ParticleConfig` ao construtor; todos os campos são opcionais. O pool de `maxParticles` partículas é alocado uma vez, e cada partícula viva é desenhada como um quad pelo mesmo batcher dos sprites. As partículas são simuladas no espaço local do emissor, então mover o emissor move junto as partículas vivas.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'texture', type: 'Texture', description: t('Particle image. Default: a shared white circle.', 'Imagem da partícula. Padrão: um círculo branco compartilhado.') },
            { name: 'maxParticles', type: 'number', default: '200', description: t('Pool size, the cap on simultaneous particles.', 'Tamanho do pool, o limite de partículas simultâneas.') },
            { name: 'emitRate', type: 'number', default: '30', description: t('Particles per second.', 'Partículas por segundo.') },
            { name: 'lifeMin, lifeMax', type: 'number', default: '0.5, 1.0', description: t('Lifetime range in seconds.', 'Faixa de tempo de vida em segundos.') },
            { name: 'angle', type: 'number', default: '-Math.PI / 2', description: t('Emission direction in radians (0 is right, -PI/2 is up).', 'Direção de emissão em radianos (0 é para a direita, -PI/2 é para cima).') },
            { name: 'spread', type: 'number', default: 'Math.PI / 4', description: t('Half-angle of the cone, in radians.', 'Meio-ângulo do cone, em radianos.') },
            { name: 'speedMin, speedMax', type: 'number', default: '60, 120', description: t('Initial speed range in px/s.', 'Faixa de velocidade inicial em px/s.') },
            { name: 'gravityX, gravityY', type: 'number', default: '0, 150', description: t('Acceleration in px/s². A positive `gravityY` pulls down; use a negative one for rising smoke or fire.', 'Aceleração em px/s². Um `gravityY` positivo puxa para baixo; use negativo para fumaça ou fogo que sobe.') },
            { name: 'startSize, endSize', type: 'number', default: '12, 0', description: t('Size in pixels at birth and at death, interpolated linearly.', 'Tamanho em pixels ao nascer e ao morrer, interpolado linearmente.') },
            { name: 'sizeVariance', type: 'number', default: '4', description: t('Random plus/minus applied to the start size (minimum result 0.5).', 'Variação aleatória para mais ou para menos no tamanho inicial (resultado mínimo 0,5).') },
            { name: 'startColor, endColor', type: '[r, g, b, a]', default: '[1,1,1,1], [1,1,1,0]', description: t('Colors from 0 to 1, interpolated over the life. The alpha channel fades the particle.', 'Cores de 0 a 1, interpoladas ao longo da vida. O canal alpha faz a partícula desaparecer.') },
            { name: 'angularVelocity, angularVelocityVariance', type: 'number', default: '0, 0', description: t('Spin in radians/s and its random variation. Each particle starts at a random rotation.', 'Giro em radianos/s e sua variação aleatória. Cada partícula começa com rotação aleatória.') },
            { name: 'loop', type: 'boolean', default: 'true', description: t('Only matters together with `duration`. With `loop: true` the emission timer restarts every `duration` seconds, so emission keeps going; with `loop: false` emission stops for good once `duration` runs out. Without a `duration`, emission is continuous either way.', 'Só importa junto com `duration`. Com `loop: true` o cronômetro de emissão reinicia a cada `duration` segundos, então a emissão continua; com `loop: false` a emissão para de vez quando `duration` acaba. Sem `duration`, a emissão é contínua nos dois casos.') },
            { name: 'duration', type: 'number', default: '-1', description: t('Seconds to emit for; `-1` means forever. For a one-shot timed effect combine it with `loop: false`; call `start()` to emit again.', 'Segundos de emissão; `-1` significa para sempre. Para um efeito único com tempo, combine com `loop: false`; chame `start()` para emitir de novo.') },
          ],
        },
      ],
    },
    {
      id: 'control',
      title: t('Controlling it', 'Controlando'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'update(dt)', type: 'void', description: t('Advances the simulation and emits new particles. The scene calls it every frame while the emitter is in the current scene graph; calling it by hand as well is safe.', 'Avança a simulação e emite novas partículas. A cena o chama a cada quadro enquanto o emissor está no grafo da cena atual; chamá-lo à mão também é seguro.') },
            { name: 'burst(count)', type: 'void', description: t('Spawns `count` particles at once (capped by `maxParticles`), independent of `emitRate`.', 'Gera `count` partículas de uma vez (limitado por `maxParticles`), independente de `emitRate`.') },
            { name: 'start() / stop()', type: 'void', description: t('Resume or pause emission. `stop` lets the live particles finish. `start` also resets the emission timer.', 'Retoma ou pausa a emissão. `stop` deixa as partículas vivas terminarem. `start` também reinicia o cronômetro de emissão.') },
            { name: 'clear()', type: 'void', description: t('Kills every live particle immediately.', 'Mata todas as partículas vivas imediatamente.') },
            { name: 'activeCount', type: 'number', readonly: true, description: t('Live particles, as of the last `update`.', 'Partículas vivas, na última chamada de `update`.') },
            { name: 'isRunning', type: 'boolean', readonly: true, description: t('Whether emission is enabled.', 'Se a emissão está habilitada.') },
            { name: 'cfg', type: 'Required<ParticleConfig>', readonly: true, description: t('The resolved configuration. Fixed after construction: create a new emitter to change it.', 'A configuração resolvida. Fixa após a construção: crie um novo emissor para mudá-la.') },
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Editor scenes', 'Cenas do editor'),
          text: t(
            'A `ParticleEmitter` created from a [view.json](/core/visual-scene) is updated automatically like any other emitter in the scene. Fetch it with `scene.getById` only when you want to call `burst` or change its position.',
            'Um `ParticleEmitter` criado a partir de um [view.json](/core/visual-scene) é atualizado automaticamente como qualquer outro emissor da cena. Busque-o com `scene.getById` apenas quando quiser chamar `burst` ou mudar sua posição.',
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
          filename: 'src/particles.ts',
          check: 'compile',
          code: `import { App, ParticleEmitter, Scene } from 'easy-game-maker'
import type { PointerEvent2D, SceneParams } from 'easy-game-maker'

class Campfire extends Scene {
  private fire = new ParticleEmitter({
    emitRate: 60,
    maxParticles: 120,
    angle: -Math.PI / 2,
    spread: 0.5,
    speedMin: 40,
    speedMax: 100,
    gravityY: -20,
    startSize: 14,
    endSize: 2,
    sizeVariance: 6,
    startColor: [1, 0.6, 0.1, 1],
    endColor: [1, 0.1, 0, 0],
  })
  private sparks = new ParticleEmitter({ emitRate: 0, maxParticles: 60, speedMin: 120, speedMax: 240, endSize: 0 })
  private app!: App

  onCreate(params?: SceneParams): void {
    this.app = params?.app as App
    this.fire.x = 180
    this.fire.y = 500
    this.add(this.fire, this.sparks)
    this.app.input.on<PointerEvent2D>('pointerdown', this.onTap)
  }

  private readonly onTap = (p: PointerEvent2D): void => {
    this.sparks.x = p.x
    this.sparks.y = p.y
    this.sparks.burst(40)
  }

  onDestroy(): void {
    this.app.input.off('pointerdown', this.onTap)
  }
}

export { Campfire }`,
        },
      ],
    },
  ],
}

export default page
