import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/audio/channel',
  title: t('AudioChannel', 'AudioChannel'),
  description: t(
    "A named mixer bus with its own master volume, obtained from app.audio.channel(name), that starts, stops and queries sounds independently of other channels.",
    "Um bus de mixagem nomeado, com volume mestre próprio, obtido em app.audio.channel(name), que inicia, para e consulta sons independentemente dos outros canais.",
  ),
  source: 'src/engine/audio/AudioChannel.ts',
  related: ['/audio/manager'],
  sections: [
    {
      id: 'overview',
      title: t('What a channel is', 'O que é um canal'),
      blocks: [
        {
          type: 'p',
          text: t(
            "An `AudioChannel` owns one Web Audio `GainNode` connected to the output. Every sound played on the channel gets its own gain that feeds that master gain, so changing the channel volume affects everything on it at once. That is what makes \"music volume\" and \"effects volume\" sliders easy.",
            "Um `AudioChannel` tem um `GainNode` da Web Audio ligado à saída. Cada som tocado no canal ganha seu próprio ganho, que alimenta esse ganho mestre, então mudar o volume do canal afeta tudo nele de uma vez. Isso facilita sliders de \"volume da música\" e \"volume dos efeitos\".",
          ),
        },
        {
          type: 'p',
          text: t(
            "You get channels from [AudioManager](/audio/manager): `app.audio.channel('music')` returns the same instance every time for a given name. The class is exported, but constructing it yourself needs an `AudioContext`, which normally you do not have direct access to.",
            "Você obtém canais do [AudioManager](/audio/manager): `app.audio.channel('music')` devolve a mesma instância sempre que o nome se repete. A classe é exportada, mas construí-la exige um `AudioContext`, ao qual normalmente você não tem acesso direto.",
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
            { name: 'play(key, buffer, options?)', type: 'void', description: t("Plays an already-decoded `AudioBuffer`. Any sound with the same `key` on this channel is stopped first. Takes the buffer directly, so from game code use `app.audio.playOnChannel(name, key, options)` instead.", "Toca um `AudioBuffer` já decodificado. Qualquer som com a mesma `key` neste canal é parado antes. Recebe o buffer diretamente, então no código do jogo use `app.audio.playOnChannel(name, key, options)`.") },
            { name: 'stop(key)', type: 'void', description: t("Stops that sound. Its `onComplete` is not called.", "Para aquele som. O `onComplete` dele não é chamado.") },
            { name: 'stopAll()', type: 'void', description: t("Stops every sound on the channel.", "Para todos os sons do canal.") },
            { name: 'pause(key)', type: 'void', description: t("Currently an alias of `stop`: there is no resume, playback restarts from the beginning.", "Hoje é um alias de `stop`: não há retomada, a reprodução recomeça do início.") },
            { name: 'isPlaying(key)', type: 'boolean', description: t("Whether that key is currently playing on this channel.", "Se aquela chave está tocando neste canal.") },
            { name: 'setVolume(volume)', type: 'void', description: t("Sets the channel master volume (0 is silent, 1 is unchanged). Applied at the current audio time, with no fade.", "Define o volume mestre do canal (0 é mudo, 1 é sem alteração). Aplicado no instante atual do áudio, sem fade.") },
            { name: 'setSoundVolume(key, volume)', type: 'void', description: t("Sets the volume of one sound currently playing on this channel. Does nothing if it is not playing.", "Define o volume de um som que está tocando neste canal. Não faz nada se ele não está tocando.") },
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            "Sounds are tracked per `key`, so one channel plays at most one instance of each key at a time. For overlapping copies of a short effect (rapid gunfire, say), you would need different keys registered for the same file.",
            "Os sons são rastreados por `key`, então um canal toca no máximo uma instância de cada chave por vez. Para cópias sobrepostas de um efeito curto (tiros rápidos, por exemplo), seria preciso registrar chaves diferentes para o mesmo arquivo.",
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example: volume settings', 'Exemplo: configurações de volume'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          check: 'compile',
          filename: 'audio-channel-demo.ts',
          code: `import { App, AudioChannel } from 'easy-game-maker';

function makeMixer(app: App): { music: AudioChannel; sfx: AudioChannel } {
  return { music: app.audio.channel('music'), sfx: app.audio.channel('sfx') };
}

async function main(): Promise<void> {
  const app = new App({ width: 640, height: 360 });
  await app.init();
  await app.assets.load({ sounds: ['audio/theme.mp3', 'audio/coin.mp3'] });

  const { music, sfx } = makeMixer(app);
  music.setVolume(0.3);
  sfx.setVolume(1);

  app.audio.playOnChannel('music', 'audio/theme.mp3', { loop: true });
  console.log(music.isPlaying('audio/theme.mp3')); // true once started

  app.audio.playOnChannel('sfx', 'audio/coin.mp3', {
    onComplete: () => console.log('coin finished'),
  });

  // Mute only the music, keep effects
  music.setVolume(0);

  // Stop the theme
  music.stop('audio/theme.mp3');
}

void main();
`,
        },
      ],
    },
  ],
}

export default page
