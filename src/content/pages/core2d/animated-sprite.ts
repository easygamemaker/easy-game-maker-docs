import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/display/animated-sprite',
  title: t('AnimatedSprite', 'AnimatedSprite'),
  description: t(
    'A Sprite that flips through a list of frame textures at a fixed rate, with ranges and a completion event.',
    'Um Sprite que percorre uma lista de texturas de quadros a uma taxa fixa, com intervalos e um evento de conclusão.',
  ),
  source: 'src/engine/display/AnimatedSprite.ts',
  related: ['/display/sprite', '/animation/clips', '/core/texture-atlas', '/core/assets', '/core/events', '/animation/tween'],
  sections: [
    {
      id: 'create',
      title: t('Creating and updating', 'Criando e atualizando'),
      blocks: [
        {
          type: 'props',
          title: t('Constructor options', 'Opções do construtor'),
          rows: [
            { name: 'frames', type: 'Texture[]', description: t('The frame textures. The first one is shown right away.', 'As texturas dos quadros. A primeira é exibida imediatamente.') },
            { name: 'fps', type: 'number', default: '12', description: t('Frames per second.', 'Quadros por segundo.') },
            { name: 'loop', type: 'boolean', default: 'true', description: t('Restart after the last frame.', 'Recomeça após o último quadro.') },
            { name: 'x, y', type: 'number', default: '0', description: t('Position, as on `Sprite`.', 'Posição, como em `Sprite`.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('It starts stopped', 'Começa parado'),
          text: t(
            'A new `AnimatedSprite` is stopped: call `play()` once. While it is in the current scene, the scene calls its `update(dt)` every frame, so you do not need to. Calling `update(dt)` by hand is still safe, it is not applied twice. `width` and `height` are not taken from the frames, so set them or the sprite falls back to the current texture size.',
            'Um novo `AnimatedSprite` começa parado: chame `play()` uma vez. Enquanto estiver na cena atual, a cena chama seu `update(dt)` a cada quadro, então você não precisa chamar. Chamar `update(dt)` à mão continua seguro, ele não é aplicado duas vezes. `width` e `height` não vêm dos quadros: defina-os ou o sprite usa o tamanho da textura atual.',
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('Playback API', 'API de reprodução'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'play()', type: 'void', description: t('Starts or resumes playback (and clears the finished flag).', 'Inicia ou retoma a reprodução (e limpa o indicador de término).') },
            { name: 'stop()', type: 'void', description: t('Pauses on the current frame.', 'Pausa no quadro atual.') },
            { name: 'gotoAndStop(frame)', type: 'void', description: t('Shows a frame (clamped to the valid range) and stops.', 'Mostra um quadro (limitado ao intervalo válido) e para.') },
            { name: 'gotoAndPlay(frame)', type: 'void', description: t('Jumps to a frame and plays the full frame range.', 'Salta para um quadro e reproduz todo o intervalo de quadros.') },
            { name: 'playRange(start, end, fps, loop, onComplete?)', type: 'void', description: t('Plays frames `start` to `end` (0-based, inclusive) at the given rate. The `fps` and `loop` you pass replace the sprite settings from then on. `onComplete` runs when a non-looping range ends.', 'Reproduz os quadros de `start` a `end` (base 0, inclusivo) na taxa dada. O `fps` e o `loop` passados substituem as configurações do sprite daí em diante. `onComplete` roda quando um intervalo sem loop termina.') },
            { name: 'play(clip, options?)', type: 'void', description: t('Plays a [Clip](/animation/clips) (durations per frame, loop modes, events), in seconds or in simulation steps. `play()` with no argument still resumes the frame-array animation.', 'Toca um [Clip](/animation/clips) (durações por quadro, modos de laço, eventos), em segundos ou em passos da simulação. `play()` sem argumento continua retomando a animação por array de quadros.') },
            { name: 'stepClip() / seek(clip, t, options?)', type: 'void', description: t('`stepClip()` advances a clip played with `unit: "steps"` by one simulation step. `seek` shows the frame of a clip at a time without playing. See [Clips](/animation/clips).', '`stepClip()` avança um clipe tocado com `unit: "steps"` por um passo da simulação. `seek` mostra o quadro de um clipe em um tempo, sem tocar. Veja [Clipes](/animation/clips).') },
            { name: 'atlas / clipEvent', type: 'TextureAtlas | null / event', description: t('`atlas` (also a constructor option) resolves the frame names of a clip. The `"clipEvent"` event carries `{ name, frame, clip }`.', '`atlas` (também uma opção do construtor) resolve os nomes de quadros de um clipe. O evento `"clipEvent"` carrega `{ name, frame, clip }`.') },
            { name: 'update(dt)', type: 'void', description: t('Advances the animation by `dt` seconds. Does nothing while stopped or finished. The scene calls it for you each frame.', 'Avança a animação em `dt` segundos. Não faz nada enquanto parado ou terminado. A cena o chama por você a cada quadro.') },
            { name: 'currentFrame', type: 'number', readonly: true, description: t('Index of the frame on screen.', 'Índice do quadro na tela.') },
            { name: 'isPlaying', type: 'boolean', readonly: true, description: t('True while advancing.', 'True enquanto avança.') },
            { name: 'totalFrames', type: 'number', readonly: true, description: t('Number of frames.', 'Número de quadros.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'When a non-looping animation reaches its end it stays on the last frame, stops, emits the `complete` event (payload `null`, see [events](/core/events)) and then calls the range callback if there is one.',
            'Quando uma animação sem loop chega ao fim, ela fica no último quadro, para, emite o evento `complete` (payload `null`, veja [eventos](/core/events)) e então chama o callback do intervalo, se houver.',
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
          filename: 'src/animated.ts',
          check: 'compile',
          code: `import { AnimatedSprite, App, Scene } from 'easy-game-maker'
import type { SceneParams, Texture } from 'easy-game-maker'

class Run extends Scene {
  private runner!: AnimatedSprite

  async onCreate(params?: SceneParams): Promise<void> {
    const app = params?.app as App
    await app.assets.load({ images: ['run0.png', 'run1.png', 'run2.png', 'run3.png'] })

    const frames = ['run0.png', 'run1.png', 'run2.png', 'run3.png']
      .map((key) => app.assets.getTexture(key))
      .filter((tex): tex is Texture => tex !== undefined)

    this.runner = new AnimatedSprite({ frames, fps: 10, x: 180, y: 300 })
    this.runner.width = 64
    this.runner.height = 64
    this.runner.on('complete', () => console.log('finished'))
    this.runner.play()
    this.add(this.runner)
  }
}

export { Run }`,
        },
      ],
    },
  ],
}

export default page
