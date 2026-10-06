import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/audio/bus',
  title: t('AudioBus and Mixing', 'AudioBus e Mixagem'),
  description: t(
    'Named gain buses feeding a master bus: volume, mute, fades, ducking, saved settings and pausing audio when the page is hidden.',
    'Barramentos de ganho nomeados que alimentam um barramento master: volume, mudo, fades, ducking, configurações salvas e pausa do áudio com a página oculta.',
  ),
  badge: 'NEW',
  source: 'src/engine/audio/AudioBus.ts',
  related: ['/audio/manager', '/audio/sfx', '/audio/music', '/audio/channel', '/debug/save'],
  sections: [
    {
      id: 'overview',
      title: t('Buses and the master', 'Barramentos e o master'),
      blocks: [
        {
          type: 'p',
          text: t(
            "A bus is a named volume stage that sounds pass through. `app.audio.bus('sfx')` and `app.audio.bus('music')` are created on first use and feed the **master** bus (`app.audio.master`, the same object as `bus('master')`), which feeds the speakers. Any other name works too: `bus('voice')` creates a third group. Each bus has a volume, a mute flag, fades and ducking, so \"music volume\", \"effects volume\" and \"mute all\" are one assignment each.",
            "Um barramento (bus) é um estágio de volume nomeado por onde os sons passam. `app.audio.bus('sfx')` e `app.audio.bus('music')` são criados no primeiro uso e alimentam o barramento **master** (`app.audio.master`, o mesmo objeto de `bus('master')`), que alimenta as caixas de som. Qualquer outro nome também serve: `bus('voice')` cria um terceiro grupo. Cada barramento tem volume, mudo, fades e ducking, então \"volume da música\", \"volume dos efeitos\" e \"silenciar tudo\" são uma atribuição cada.",
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('The old layer does not go through the buses', 'A camada antiga não passa pelos barramentos'),
          text: t(
            "The new mixing layer (`bus`, `master`, `sfx`, `music`) is opt-in and separate. The original `play`, `playOnChannel` and channels connect straight to the output, so the master and bus volumes do **not** affect them. Use [sfx](/audio/sfx) and [music](/audio/music) for sounds that should obey the mixer. See [AudioManager](/audio/manager).",
            "A camada nova de mixagem (`bus`, `master`, `sfx`, `music`) é opcional e separada. O `play`, o `playOnChannel` e os canais originais ligam direto à saída, então os volumes do master e dos barramentos **não** os afetam. Use [sfx](/audio/sfx) e [music](/audio/music) para os sons que devem obedecer ao mixer. Veja [AudioManager](/audio/manager).",
          ),
        },
        {
          type: 'p',
          text: t(
            "Inside a bus the signal passes through two separate gains: one for volume, mute and fades, one for ducking. They are separate so a fade and a duck never fight over the same parameter.",
            "Dentro de um barramento o sinal passa por dois ganhos separados: um para volume, mudo e fades, outro para o ducking. São separados para que um fade e um duck nunca briguem pelo mesmo parâmetro.",
          ),
        },
      ],
    },
    {
      id: 'api',
      title: t('AudioBus members', 'Membros do AudioBus'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'volume', type: 'number', default: '1', description: t('Target volume, 0 or more (1 is unity). Setting it cancels a fade in progress.', 'Volume alvo, 0 ou mais (1 é o volume original). Atribuir cancela um fade em andamento.') },
            { name: 'muted', type: 'boolean', default: 'false', description: t('While true the bus is silent, but `volume` is kept and comes back on unmute.', 'Enquanto true o barramento fica mudo, mas o `volume` é mantido e volta ao desmutar.') },
            { name: 'fade(to, seconds)', type: 'void', description: t('Ramps the volume linearly to `to` over `seconds`. `volume` reads the target at once.', 'Leva o volume linearmente até `to` ao longo de `seconds`. `volume` já lê o alvo na hora.') },
            { name: 'duck(trigger, amount, options?)', type: '() => void', description: t('Lowers **this** bus to `amount` times its level while `trigger` is playing something, and brings it back when `trigger` goes silent. Returns a function that removes the rule. Several rules on one bus combine by taking the lowest active amount. A bus cannot duck itself (it throws).', 'Abaixa **este** barramento para `amount` vezes o nível dele enquanto o `trigger` toca algo, e o traz de volta quando o `trigger` silencia. Devolve uma função que remove a regra. Várias regras em um barramento se combinam pela menor quantidade ativa. Um barramento não pode abafar a si mesmo (lança erro).') },
            { name: 'activeVoices', type: 'number', readonly: true, description: t('Number of voices (sounds or tracks) playing on this bus.', 'Número de vozes (sons ou faixas) tocando neste barramento.') },
            { name: 'name', type: 'string', readonly: true, description: t('The bus name.', 'O nome do barramento.') },
          ],
        },
        {
          type: 'props',
          title: t('DuckOptions', 'DuckOptions'),
          rows: [
            { name: 'attack', type: 'number', default: '0.05', description: t('Seconds to go down to the ducked level once the trigger starts sounding.', 'Segundos para descer ao nível abafado quando o trigger começa a soar.') },
            { name: 'release', type: 'number', default: '0.4', description: t('Seconds to come back once the trigger is silent again.', 'Segundos para voltar quando o trigger silencia de novo.') },
          ],
        },
        {
          type: 'p',
          text: t(
            "`amount` is clamped to 0..1. `music.duck(sfx, 0.4)` drops the music to 40% under any effect. Ducking reacts to voices on the trigger bus, so it follows both [sfx](/audio/sfx) and [music](/audio/music) played on it.",
            "O `amount` fica limitado a 0..1. `music.duck(sfx, 0.4)` derruba a música a 40% sob qualquer efeito. O ducking reage às vozes do barramento trigger, então acompanha tanto [sfx](/audio/sfx) quanto [music](/audio/music) tocados nele.",
          ),
        },
      ],
    },
    {
      id: 'persist',
      title: t('Saved settings and hidden pages', 'Configurações salvas e páginas ocultas'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'persist(target)', type: 'void', description: t('Saves the volume and mute flag of the master and of every bus through a [SaveManager](/debug/save) each time one changes, and restores the saved values right now. Buses found in the saved data are created. A missing or corrupt save leaves the defaults. `target` is a storage namespace such as `"egm.audio"` (a `SaveManager` is created for it) or a `SaveManager` you already have. The data lives in the slot `volumes`. Call it after `await app.init()`, because the buses need the audio context.', 'Salva o volume e o mudo do master e de cada barramento por um [SaveManager](/debug/save) a cada mudança, e restaura os valores salvos agora mesmo. Barramentos encontrados nos dados salvos são criados. Um save ausente ou corrompido deixa os padrões. `target` é um namespace de armazenamento como `"egm.audio"` (um `SaveManager` é criado para ele) ou um `SaveManager` que você já tem. Os dados ficam no slot `volumes`. Chame-o depois de `await app.init()`, porque os barramentos precisam do contexto de áudio.') },
            { name: 'pauseWhenHidden', type: 'boolean', default: 'false', description: t('When true, the audio context is suspended while the page is hidden and resumed when it is visible again.', 'Quando true, o contexto de áudio é suspenso enquanto a página está oculta e retomado quando ela volta a ficar visível.') },
          ],
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'audio-settings.ts',
          check: 'compile',
          code: `import { App } from 'easy-game-maker'

export function setupMixer(app: App): { setMusicVolume(v: number): void; toggleMute(): void } {
  const audio = app.audio

  audio.persist('egm.audio') // restores last session's volumes, saves every change
  audio.pauseWhenHidden = true

  audio.master.volume = 0.9
  audio.bus('sfx').volume = 0.8
  audio.bus('music').fade(0.3, 1.5) // glide to 0.3 over 1.5 seconds

  // The music sinks to 40% while any effect plays, then recovers
  const stopDucking = audio.bus('music').duck(audio.bus('sfx'), 0.4, { attack: 0.05, release: 0.4 })
  void stopDucking // call it later to remove the rule

  return {
    setMusicVolume: (v) => {
      audio.bus('music').volume = v
    },
    toggleMute: () => {
      audio.master.muted = !audio.master.muted
    },
  }
}`,
        },
      ],
    },
  ],
}

export default page
