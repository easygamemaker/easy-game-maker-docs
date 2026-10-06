import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/audio/sfx',
  title: t('SfxPlayer', 'SfxPlayer'),
  description: t(
    'app.audio.sfx plays overlapping, pitch-varied and panned one-shot effects on the sfx bus, with a voice limit and a handle to stop each sound.',
    'app.audio.sfx toca efeitos curtos que se sobrepõem, com variação de tom e posição no estéreo, no barramento sfx, com limite de vozes e um handle para parar cada som.',
  ),
  badge: 'NEW',
  source: 'src/engine/audio/SfxPlayer.ts',
  related: ['/audio/bus', '/audio/music', '/audio/manager', '/audio/channel'],
  sections: [
    {
      id: 'overview',
      title: t('One-shots that overlap', 'Efeitos curtos que se sobrepõem'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`app.audio.sfx` plays a loaded sound as a one-shot. By default every call **overlaps** the copies still playing (ten rapid hits give ten voices), unlike the original `app.audio.play`, which restarts the same key. The sound goes through the `sfx` [bus](/audio/bus), so the bus volume, mute and ducking apply.",
            "`app.audio.sfx` toca um som carregado como efeito curto. Por padrão cada chamada **se sobrepõe** às cópias que ainda tocam (dez golpes rápidos dão dez vozes), ao contrário do `app.audio.play` original, que reinicia a mesma chave. O som passa pelo [barramento](/audio/bus) `sfx`, então volume, mudo e ducking do barramento valem.",
          ),
        },
        {
          type: 'p',
          text: t(
            "The sound must already be loaded under its key (`app.assets.load({ sounds: [...] })` uses the URL as the key, or `app.audio.loadBuffer`). Unlike the original `play`, which only warns, `sfx.play` **throws** when the key was never loaded.",
            "O som precisa estar carregado sob a chave dele (`app.assets.load({ sounds: [...] })` usa a URL (Uniform Resource Locator) como chave, ou `app.audio.loadBuffer`). Ao contrário do `play` original, que só avisa, o `sfx.play` **lança erro** quando a chave nunca foi carregada.",
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
            { name: 'play(key, options?)', type: 'SfxHandle', description: t('Plays the loaded buffer. Before the first user gesture the request is queued and the handle reports `playing === false` until it starts. See [AudioManager](/audio/manager).', 'Toca o buffer carregado. Antes do primeiro gesto do usuário o pedido entra em fila e o handle reporta `playing === false` até começar. Veja [AudioManager](/audio/manager).') },
            { name: 'stop(key)', type: 'void', description: t('Stops every copy of `key` and cancels queued ones.', 'Para todas as cópias de `key` e cancela as que estão na fila.') },
            { name: 'stopAll()', type: 'void', description: t('Stops every effect and cancels queued ones.', 'Para todos os efeitos e cancela os que estão na fila.') },
            { name: 'activeVoices(key)', type: 'number', description: t('How many copies of `key` are sounding right now.', 'Quantas cópias de `key` estão soando agora.') },
          ],
        },
        {
          type: 'props',
          title: t('SfxPlayOptions', 'SfxPlayOptions'),
          rows: [
            { name: 'volume', type: 'number', default: '1', description: t('Gain of this one sound, 0 or more.', 'Ganho deste som, 0 ou mais.') },
            { name: 'pitch', type: 'number | [min, max]', default: '1', description: t('Playback rate: 1 is the original pitch, 2 is one octave up. A `[min, max]` pair picks a random rate in between for every call, so repeated hits do not sound identical. Clamped to 0.01..8.', 'Taxa de reprodução: 1 é o tom original, 2 é uma oitava acima. Um par `[min, max]` sorteia uma taxa entre os dois a cada chamada, para golpes repetidos não soarem iguais. Limitada a 0,01..8.') },
            { name: 'pan', type: 'number', description: t('Stereo position from -1 (left) to 1 (right). Ignored where `StereoPannerNode` is missing.', 'Posição no estéreo de -1 (esquerda) a 1 (direita). Ignorada onde falta o `StereoPannerNode`.') },
            { name: 'overlap', type: 'boolean', default: 'true', description: t('Whether the sound may play over a copy of itself that is still playing. With `false` the previous copy is stopped first (the behavior of the original `play`).', 'Se o som pode tocar por cima de uma cópia dele que ainda toca. Com `false` a cópia anterior é parada primeiro (o comportamento do `play` original).') },
            { name: 'maxVoices', type: 'number', default: '16', description: t('Most copies of this key sounding at once; the **oldest** is stopped beyond it.', 'Máximo de cópias desta chave soando ao mesmo tempo; a **mais antiga** é parada além disso.') },
            { name: 'bus', type: 'string', default: "'sfx'", description: t('Bus to play on.', 'Barramento em que tocar.') },
            { name: 'rand', type: '() => number', description: t('Random source in [0, 1) for a `[min, max]` pitch, for determinism. Default: the manager one (`Math.random`).', 'Fonte de aleatoriedade em [0, 1) para um pitch `[min, max]`, para ter determinismo. Padrão: a do manager (`Math.random`).') },
          ],
        },
        {
          type: 'props',
          title: t('SfxHandle', 'SfxHandle'),
          rows: [
            { name: 'key', type: 'string', readonly: true, description: t('The sound key.', 'A chave do som.') },
            { name: 'playing', type: 'boolean', readonly: true, description: t('True while the sound is audible: false while it still waits for the unlock, and after it ends or is stopped.', 'True enquanto o som está audível: false enquanto ainda espera o desbloqueio, e depois que termina ou é parado.') },
            { name: 'stop()', type: 'void', description: t('Stops the sound, or cancels it if it is still queued. Safe to call more than once.', 'Para o som, ou o cancela se ainda está na fila. Pode ser chamado mais de uma vez.') },
          ],
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
          filename: 'sfx-demo.ts',
          check: 'compile',
          code: `import { App } from 'easy-game-maker'

const HIT = 'audio/hit.wav'

export async function setupSfx(app: App): Promise<() => void> {
  await app.assets.load({ sounds: [HIT] })

  return () => {
    // Overlaps by default, varies the pitch a little, pans to the left, at most 4 at once
    const hit = app.audio.sfx.play(HIT, { pitch: [0.95, 1.05], pan: -0.3, maxVoices: 4, volume: 0.9 })
    if (!app.audio.unlocked) console.log('queued until the first gesture', hit.playing)
  }
}

export function silenceEffects(app: App): void {
  app.audio.sfx.stopAll()
}`,
        },
      ],
    },
  ],
}

export default page
