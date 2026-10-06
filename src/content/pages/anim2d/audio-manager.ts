import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/audio/manager',
  title: t('AudioManager', 'AudioManager'),
  description: t(
    "app.audio decodes sounds into buffers and plays them through named channels on top of the Web Audio API.",
    "app.audio decodifica sons em buffers e os toca por canais nomeados sobre a Web Audio API.",
  ),
  source: 'src/engine/audio/AudioManager.ts',
  related: ['/audio/bus', '/audio/sfx', '/audio/music', '/audio/channel', '/input/keyboard-mouse'],
  sections: [
    {
      id: 'overview',
      title: t('Buffers and a default channel', 'Buffers e um canal padrão'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`AudioManager` wraps one Web Audio `AudioContext` (created in `init()`, which `App.init()` calls). Sounds are decoded into `AudioBuffer`s stored by **key**. `play(key)` sends the buffer to the built-in `default` channel; `channel(name)` and `playOnChannel` let you split sounds into groups such as music and effects, each with its own volume. See [AudioChannel](/audio/channel).",
            "O `AudioManager` envolve um `AudioContext` da Web Audio (criado em `init()`, que `App.init()` chama). Os sons são decodificados em `AudioBuffer`s guardados por **chave**. `play(key)` envia o buffer ao canal embutido `default`; `channel(name)` e `playOnChannel` permitem separar sons em grupos como música e efeitos, cada um com volume próprio. Veja [AudioChannel](/audio/channel).",
          ),
        },
        {
          type: 'p',
          text: t(
            "The usual way to load audio is the asset manifest: `app.assets.load({ sounds: ['audio/jump.mp3'] })` fetches each file and registers its buffer under **the same URL string** you listed. Use that string as the key. You can also decode your own bytes with `loadBuffer`.",
            "O jeito usual de carregar áudio é o manifesto de assets: `app.assets.load({ sounds: ['audio/jump.mp3'] })` baixa cada arquivo e registra o buffer sob **a mesma string de URL** que você listou. Use essa string como chave. Você também pode decodificar seus próprios bytes com `loadBuffer`.",
          ),
        },
      ],
    },
    {
      id: 'unlock',
      title: t('Autoplay unlock and the queue', 'Desbloqueio do autoplay e a fila'),
      blocks: [
        {
          type: 'p',
          text: t(
            "Browsers keep an audio context **suspended** until the user interacts with the page. The manager now handles that for you: at `init()` it starts listening for the first `pointerdown`, `keydown` or `touchend`, resumes the context on it, and plays what was requested too early. Before this, a `play` before the first click marked the sound as playing on a clock that was stopped, and after the click nothing was heard.",
            "Os navegadores mantêm o contexto de áudio **suspenso** até o usuário interagir com a página. O manager agora cuida disso por você: no `init()` ele começa a escutar o primeiro `pointerdown`, `keydown` ou `touchend`, retoma o contexto nele e toca o que foi pedido cedo demais. Antes, um `play` antes do primeiro clique marcava o som como tocando em um relógio parado, e depois do clique nada era ouvido.",
          ),
        },
        {
          type: 'list',
          items: [
            t('Sounds requested while locked go to a **queue** of at most 32 items. When it is full the **oldest** is dropped.', 'Sons pedidos enquanto bloqueado vão para uma **fila** de no máximo 32 itens. Quando ela enche, o **mais antigo** é descartado.'),
            t('A queued sound older than **2 seconds** when the unlock happens is dropped instead of playing late.', 'Um som da fila com mais de **2 segundos** quando o desbloqueio acontece é descartado, em vez de tocar atrasado.'),
            t('Music is the exception: the latest music request is kept with no age limit (see [MusicPlayer](/audio/music)).', 'A música é a exceção: o último pedido de música é guardado sem limite de idade (veja [MusicPlayer](/audio/music)).'),
            t('The queue applies to `play`, `playOnChannel`, `sfx` and `music`. With the context already running, behavior is identical to before.', 'A fila vale para `play`, `playOnChannel`, `sfx` e `music`. Com o contexto já rodando, o comportamento é idêntico ao de antes.'),
          ],
        },
        {
          type: 'props',
          title: t('Unlock members', 'Membros do desbloqueio'),
          rows: [
            { name: 'unlockOnGesture()', type: 'Promise<void>', description: t('Starts listening for the first gesture and resolves once audio is unlocked. Idempotent. The `App` already does this at `init()`, so you only need it with `autoUnlock: false`, or to await the unlock. Needs `init()` to have run.', 'Começa a escutar o primeiro gesto e resolve quando o áudio é desbloqueado. Idempotente. O `App` já faz isso no `init()`, então você só precisa dele com `autoUnlock: false`, ou para esperar o desbloqueio. Exige que o `init()` tenha rodado.') },
            { name: 'unlocked', type: 'boolean', readonly: true, description: t('True once the context may play sound (running, or resumed by a gesture).', 'True quando o contexto pode tocar som (rodando, ou retomado por um gesto).') },
            { name: 'whenUnlocked', type: 'Promise<void>', readonly: true, description: t('Resolves once audio is unlocked.', 'Resolve quando o áudio é desbloqueado.') },
            { name: 'onUnlocked(listener)', type: '() => void', description: t('Calls `listener` when audio gets unlocked (at once if it already is). Returns an unsubscribe function.', 'Chama `listener` quando o áudio é desbloqueado (na hora, se já estiver). Devolve uma função de cancelamento.') },
          ],
        },
        {
          type: 'props',
          title: t('AudioManagerOptions (for your own AudioManager)', 'AudioManagerOptions (para um AudioManager seu)'),
          rows: [
            { name: 'autoUnlock', type: 'boolean', default: 'true', description: t('Start listening for the first gesture in `init()`.', 'Começar a escutar o primeiro gesto no `init()`.') },
            { name: 'rand', type: '() => number', default: 'Math.random', description: t('Random source in [0, 1) used for pitch variation.', 'Fonte de aleatoriedade em [0, 1) usada na variação de tom.') },
            { name: 'maxQueue', type: 'number', default: '32', description: t('Most queued sounds; the oldest is dropped when full.', 'Máximo de sons em fila; o mais antigo é descartado quando enche.') },
            { name: 'maxAgeSeconds', type: 'number', default: '2', description: t('Queued sounds older than this at the unlock are dropped.', 'Sons em fila mais velhos que isso no desbloqueio são descartados.') },
            { name: 'now', type: '() => number', description: t('Clock in seconds used to age queued sounds. Default: `performance.now() / 1000`.', 'Relógio em segundos usado para envelhecer os sons em fila. Padrão: `performance.now() / 1000`.') },
          ],
        },
        {
          type: 'p',
          text: t(
            "The `App` creates its `audio` with the defaults. These options matter when you construct an `AudioManager` yourself, for determinism and tests.",
            "O `App` cria o seu `audio` com os padrões. Essas opções importam quando você constrói um `AudioManager` por conta própria, para ter determinismo e testes.",
          ),
        },
      ],
    },
    {
      id: 'mixing',
      title: t('The mixing layer', 'A camada de mixagem'),
      blocks: [
        {
          type: 'p',
          text: t(
            "Next to the original buffers-and-channels layer there is a second, opt-in one. It does not touch the first: the master and bus volumes do **not** affect `play` and `playOnChannel`.",
            "Ao lado da camada original de buffers e canais há uma segunda, opcional. Ela não mexe na primeira: os volumes do master e dos barramentos **não** afetam `play` e `playOnChannel`.",
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'master / bus(name)', type: 'AudioBus', description: t('Named gain buses, volume, mute, fade and ducking. See [AudioBus](/audio/bus).', 'Barramentos de ganho nomeados, com volume, mudo, fade e ducking. Veja [AudioBus](/audio/bus).') },
            { name: 'sfx', type: 'SfxPlayer', readonly: true, description: t('Overlapping, pitch-varied, panned one-shots. See [SfxPlayer](/audio/sfx).', 'Efeitos curtos que se sobrepõem, com variação de tom e posição no estéreo. Veja [SfxPlayer](/audio/sfx).') },
            { name: 'music', type: 'MusicPlayer', readonly: true, description: t('One current track with crossfade, loop points, pause and resume. See [MusicPlayer](/audio/music).', 'Uma faixa atual com crossfade, pontos de laço, pausa e retomada. Veja [MusicPlayer](/audio/music).') },
            { name: 'persist(target)', type: 'void', description: t('Saves and restores volumes and mute through a `SaveManager`. See [AudioBus](/audio/bus).', 'Salva e restaura volumes e mudo por um `SaveManager`. Veja [AudioBus](/audio/bus).') },
            { name: 'pauseWhenHidden', type: 'boolean', default: 'false', description: t('Suspend the context while the page is hidden.', 'Suspende o contexto enquanto a página está oculta.') },
          ],
        },
      ],
    },
    {
      id: 'api',
      title: t('Methods', 'Métodos'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'loadBuffer(key, arrayBuffer)', type: 'Promise<void>', description: t("Decodes and stores a buffer. Throws if `init()` was not called.", "Decodifica e guarda um buffer. Lança erro se `init()` não foi chamado.") },
            { name: 'hasBuffer(key)', type: 'boolean', description: t("Whether the key is loaded.", "Se a chave está carregada.") },
            { name: 'play(key, options?)', type: 'void', description: t("Plays on the default channel. While the browser still keeps the audio context suspended (before the first user gesture) the request is queued and plays at the unlock; see below. Warns in the console and returns if the key is not loaded.", "Toca no canal padrão. Enquanto o navegador ainda mantém o contexto de áudio suspenso (antes do primeiro gesto do usuário), o pedido entra em fila e toca no desbloqueio; veja abaixo. Avisa no console e retorna se a chave não estiver carregada.") },
            { name: 'stop(key)', type: 'void', description: t("Stops that sound on the default channel only.", "Para aquele som só no canal padrão.") },
            { name: 'isPlaying(key)', type: 'boolean', description: t("Default channel only.", "Só no canal padrão.") },
            { name: 'stopAll()', type: 'void', description: t("Stops everything on every channel.", "Para tudo em todos os canais.") },
            { name: 'channel(name)', type: 'AudioChannel', description: t("Gets or creates a named channel (volume starts at 1).", "Obtém ou cria um canal nomeado (o volume começa em 1).") },
            { name: 'playOnChannel(channelName, key, options?)', type: 'void', description: t("Plays on a named channel, creating it if needed. If the key is not loaded it logs a console warning, like `play`, and does nothing.", "Toca em um canal nomeado, criando-o se preciso. Se a chave não estiver carregada, registra um aviso no console, como o `play`, e não faz nada.") },
            { name: 'setChannelVolume(channelName, volume)', type: 'void', description: t("Sets the master volume of a channel, creating it if needed.", "Define o volume mestre de um canal, criando-o se preciso.") },
            { name: 'setSoundVolume(key, volume, channelName?)', type: 'void', description: t("Sets the volume of one sound while it plays. Looks on `channelName` (default `'default'`). Does nothing if the sound is not playing.", "Define o volume de um som enquanto ele toca. Procura em `channelName` (padrão `'default'`). Não faz nada se o som não está tocando.") },
            { name: 'setVolume(name, volume)', type: 'void', description: t("If `name` is an existing channel, sets that channel's volume. Otherwise treats `name` as a sound key and sets that sound's volume on the default channel. Prefer the two explicit methods above.", "Se `name` é um canal existente, define o volume desse canal. Caso contrário, trata `name` como chave de som e define o volume desse som no canal padrão. Prefira os dois métodos explícitos acima.") },
            { name: 'destroy()', type: 'void', description: t("Stops all sounds and closes the context. Called by `App.destroy()`.", "Para todos os sons e fecha o contexto. Chamado por `App.destroy()`.") },
          ],
        },
        {
          type: 'props',
          title: t('ChannelPlayOptions', 'ChannelPlayOptions'),
          rows: [
            { name: 'loop', type: 'boolean', default: 'false', description: t("Repeat until stopped.", "Repete até ser parado.") },
            { name: 'volume', type: 'number', default: '1', description: t("Gain for this play, multiplied by the channel volume.", "Ganho desta execução, multiplicado pelo volume do canal.") },
            { name: 'onComplete', type: '() => void', description: t("Called when playback ends naturally. Not called when you `stop` it.", "Chamado quando a reprodução termina naturalmente. Não é chamado quando você usa `stop`.") },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Gotchas', 'Pontos de atenção'),
          text: t(
            "Sounds requested before the first user gesture are queued and played at the unlock (see above), not lost. `setVolume(name, volume)` is ambiguous (a channel name wins over a sound key), so prefer `setChannelVolume('default', 0.5)` or `setSoundVolume(key, 0.5)`. Playing a key that is already playing on the same channel restarts it instead of layering it.",
            "Sons pedidos antes do primeiro gesto do usuário entram em fila e tocam no desbloqueio (veja acima), em vez de se perderem. `setVolume(name, volume)` é ambíguo (um nome de canal vence uma chave de som), então prefira `setChannelVolume('default', 0.5)` ou `setSoundVolume(key, 0.5)`. Tocar uma chave que já está tocando no mesmo canal reinicia o som em vez de sobrepô-lo.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: music and effects', 'Exemplo: música e efeitos'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          filename: 'audio-demo.ts',
          code: `import { App, Scene } from 'easy-game-maker';

const MUSIC = 'audio/theme.mp3';
const JUMP = 'audio/jump.mp3';

class AudioScene extends Scene {
  private readonly app: App;

  constructor(app: App) {
    super();
    this.app = app;
  }

  override onCreate(): void {
    const audio = this.app.audio;

    audio.channel('music').setVolume(0.4);
    audio.channel('sfx').setVolume(1);

    // Browsers need a user gesture before sound can start
    this.app.input.once('pointerdown', () => {
      audio.playOnChannel('music', MUSIC, { loop: true });
    });

    this.app.input.on<{ code: string; repeat: boolean }>('keydown', (e) => {
      if (e.code === 'Space' && !e.repeat) {
        audio.playOnChannel('sfx', JUMP, { volume: 0.8 });
      }
    });
  }
}

async function main(): Promise<void> {
  const app = new App({ width: 640, height: 360 });
  await app.init();
  await app.assets.load({ sounds: [MUSIC, JUMP] });
  app.scenes.add('audio', class extends AudioScene {
    constructor() {
      super(app);
    }
  });
  await app.scenes.go('audio');
  app.run();
}

void main();
`,
        },
      ],
    },
  ],
}

export default page
