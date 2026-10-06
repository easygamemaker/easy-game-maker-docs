import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/audio/music',
  title: t('MusicPlayer', 'MusicPlayer'),
  description: t(
    'app.audio.music plays one current track on the music bus with equal-power crossfade, seamless loop points, pause and resume.',
    'app.audio.music toca uma faixa atual no barramento music com crossfade de potência igual, pontos de laço sem emenda, pausa e retomada.',
  ),
  badge: 'NEW',
  source: 'src/engine/audio/MusicPlayer.ts',
  related: ['/audio/bus', '/audio/sfx', '/audio/manager', '/audio/channel'],
  sections: [
    {
      id: 'overview',
      title: t('One track at a time', 'Uma faixa por vez'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`app.audio.music` keeps one current track. Asking for another track fades the old one out while the new one fades in (an **equal-power** crossfade: sine and cosine curves, so the loudness stays steady in the middle). The track plays on the `music` [bus](/audio/bus). The buffer must be loaded first, and `play` throws when the key was never loaded.",
            "`app.audio.music` mantém uma faixa atual. Pedir outra faixa faz a antiga sumir enquanto a nova entra (um crossfade de **potência igual**: curvas de seno e cosseno, para o volume percebido ficar estável no meio). A faixa toca no [barramento](/audio/bus) `music`. O buffer precisa estar carregado antes, e o `play` lança erro quando a chave nunca foi carregada.",
          ),
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Before the first gesture', 'Antes do primeiro gesto'),
          text: t(
            "A music request made before the browser lets audio play is kept (only the latest one) and starts at the unlock, with **no age limit**. Effects are different: they are dropped after 2 seconds. See [AudioManager](/audio/manager).",
            "Um pedido de música feito antes de o navegador liberar o áudio é guardado (só o mais recente) e começa no desbloqueio, **sem limite de idade**. Os efeitos são diferentes: são descartados depois de 2 segundos. Veja [AudioManager](/audio/manager).",
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('Reference', 'Referência'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'play(key, options?)', type: 'void', description: t('Plays the loaded buffer. Asking for the track that is already current (and not paused) does nothing: it keeps playing, with no restart.', 'Toca o buffer carregado. Pedir a faixa que já é a atual (e não está pausada) não faz nada: ela continua tocando, sem reiniciar.') },
            { name: 'stop(options?)', type: 'void', description: t('Stops the music, optionally fading out with an equal-power curve (`{ fade }` in seconds).', 'Para a música, opcionalmente com fade de saída em curva de potência igual (`{ fade }` em segundos).') },
            { name: 'pause() / resume()', type: 'void', description: t('Pause remembers where the track was (loop region included); `resume` continues from there.', 'A pausa lembra onde a faixa estava (região de laço incluída); o `resume` continua dali.') },
            { name: 'current', type: 'string | null', readonly: true, description: t('Key of the track that is playing, paused or waiting for the unlock; `null` when none.', 'Chave da faixa que está tocando, pausada ou esperando o desbloqueio; `null` quando não há nenhuma.') },
            { name: 'paused', type: 'boolean', readonly: true, description: t('True while paused with `pause()`.', 'True enquanto pausada com `pause()`.') },
          ],
        },
        {
          type: 'props',
          title: t('MusicPlayOptions', 'MusicPlayOptions'),
          rows: [
            { name: 'crossfade', type: 'number', default: '0', description: t('Seconds of equal-power crossfade from the current track (a fade-in when there is none).', 'Segundos de crossfade de potência igual a partir da faixa atual (um fade-in quando não há nenhuma).') },
            { name: 'loop', type: 'boolean', default: 'true', description: t('Loop the track, seamlessly, through the `loop` of the audio source node.', 'Repete a faixa, sem emenda, pelo `loop` do nó de fonte de áudio.') },
            { name: 'volume', type: 'number', default: '1', description: t('Gain of the track, 0 or more (on top of the bus volume).', 'Ganho da faixa, 0 ou mais (somado ao volume do barramento).') },
            { name: 'startAt', type: 'number', default: '0', description: t('Offset in seconds into the buffer to start from.', 'Deslocamento em segundos no buffer de onde começar.') },
            { name: 'loopStart / loopEnd', type: 'number', description: t('Loop region in seconds, only used together with `loop`. A track with an intro can loop only its body.', 'Região de laço em segundos, usada só junto com `loop`. Uma faixa com introdução pode repetir só o corpo.') },
            { name: 'bus', type: 'string', default: "'music'", description: t('Bus to play on.', 'Barramento em que tocar.') },
          ],
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('stopAll also stops music', 'stopAll também para a música'),
          text: t(
            "`app.audio.stopAll()` stops the legacy channels, every effect and the music. To stop only the music, use `app.audio.music.stop({ fade: 1 })`.",
            "`app.audio.stopAll()` para os canais antigos, todos os efeitos e a música. Para parar só a música, use `app.audio.music.stop({ fade: 1 })`.",
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
          filename: 'music-demo.ts',
          check: 'compile',
          code: `import { App } from 'easy-game-maker'

const MENU = 'audio/menu.ogg'
const LEVEL = 'audio/level1.ogg'

export async function setupMusic(app: App): Promise<void> {
  await app.assets.load({ sounds: [MENU, LEVEL] })

  app.audio.music.play(MENU, { loop: true, volume: 0.7 }) // starts at the first gesture if needed
}

export function startLevel(app: App): void {
  // Equal-power crossfade; the body of the track loops between 4 s and 60 s
  app.audio.music.play(LEVEL, { crossfade: 1.5, loop: true, loopStart: 4, loopEnd: 60 })
}

export function pauseMenu(app: App, paused: boolean): void {
  if (paused) app.audio.music.pause()
  else app.audio.music.resume()
}

export function endLevel(app: App): void {
  app.audio.music.stop({ fade: 1 })
  console.log(app.audio.music.current) // null
}`,
        },
      ],
    },
  ],
}

export default page
