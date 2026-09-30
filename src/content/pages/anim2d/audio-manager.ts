import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/audio/manager',
  title: t('AudioManager', 'AudioManager'),
  description: t(
    "app.audio decodes sounds into buffers and plays them through named channels on top of the Web Audio API.",
    "app.audio decodifica sons em buffers e os toca por canais nomeados sobre a Web Audio API.",
  ),
  source: 'src/engine/audio/AudioManager.ts',
  related: ['/audio/channel', '/input/keyboard-mouse'],
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
      id: 'api',
      title: t('Methods', 'Métodos'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'loadBuffer(key, arrayBuffer)', type: 'Promise<void>', description: t("Decodes and stores a buffer. Throws if `init()` was not called.", "Decodifica e guarda um buffer. Lança erro se `init()` não foi chamado.") },
            { name: 'hasBuffer(key)', type: 'boolean', description: t("Whether the key is loaded.", "Se a chave está carregada.") },
            { name: 'play(key, options?)', type: 'void', description: t("Plays on the default channel and resumes the context if the browser suspended it. Warns in the console and returns if the key is not loaded.", "Toca no canal padrão e retoma o contexto se o navegador o suspendeu. Avisa no console e retorna se a chave não estiver carregada.") },
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
            "Browsers block audio until a user gesture, so the first `play` after a click or key press is the one that wakes the context. `setVolume(name, volume)` is ambiguous (a channel name wins over a sound key), so prefer `setChannelVolume('default', 0.5)` or `setSoundVolume(key, 0.5)`. Playing a key that is already playing on the same channel restarts it instead of layering it.",
            "Navegadores bloqueiam áudio até um gesto do usuário, então o primeiro `play` depois de um clique ou tecla é o que acorda o contexto. `setVolume(name, volume)` é ambíguo (um nome de canal vence uma chave de som), então prefira `setChannelVolume('default', 0.5)` ou `setSoundVolume(key, 0.5)`. Tocar uma chave que já está tocando no mesmo canal reinicia o som em vez de sobrepô-lo.",
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
