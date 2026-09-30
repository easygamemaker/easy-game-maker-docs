import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/cli/go',
  title: t('egm go', 'egm go'),
  description: t(
    'Generate the EgmGO companion app for iOS and Android, so you can open your game on a real phone from the simulator.',
    'Gere o app companheiro EgmGO para iOS e Android, para abrir o seu jogo em um celular de verdade a partir do simulador.',
  ),
  source: 'src/cli/commands/go.ts',
  related: ['/simulator/egmgo', '/cli/simulate', '/simulator/tunnel', '/simulator/overview'],
  sections: [
    {
      id: 'usage',
      title: t('Usage', 'Uso'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm go            # iOS and Android
egm go ios        # iOS only
egm go android    # Android only`,
        },
        {
          type: 'p',
          text: t(
            '`egm go` does not build your game. It copies the EgmGO app sources, a small native shell that scans a QR code and loads the game in a WebView, into `dist/` of the current folder. Any other value than `ios` or `android` prints `Unknown platform "x". Valid: ios | android (or omit for both)` and exits with code 1. It does not read `egm.config.ts`, so it can run from any folder.',
            '`egm go` não compila o seu jogo. Ele copia os fontes do app EgmGO, uma pequena casca nativa que lê um QR code (Quick Response code) e carrega o jogo em uma WebView, para `dist/` da pasta atual. Qualquer valor diferente de `ios` ou `android` imprime `Unknown platform "x". Valid: ios | android (or omit for both)` e encerra com código 1. Ele não lê o `egm.config.ts`, então pode rodar de qualquer pasta.',
          ),
        },
      ],
    },
    {
      id: 'ios',
      title: t('iOS', 'iOS'),
      blocks: [
        {
          type: 'p',
          text: t(
            'It writes an Xcode project to `dist/egmgo-ios/EgmGO.xcodeproj`. Open it, select your device and run:',
            'Ele grava um projeto Xcode em `dist/egmgo-ios/EgmGO.xcodeproj`. Abra-o, selecione o seu dispositivo e execute:',
          ),
        },
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `open dist/egmgo-ios/EgmGO.xcodeproj
# in Xcode: choose your device, then Run (Cmd+R)`,
        },
      ],
    },
    {
      id: 'android',
      title: t('Android', 'Android'),
      blocks: [
        {
          type: 'p',
          text: t(
            'It writes a Gradle project to `dist/egmgo-android` and a placeholder launcher icon. If `adb` and Gradle are found and a device is connected, it also runs `assembleDebug` and installs the APK. Otherwise open the folder in Android Studio:',
            'Ele grava um projeto Gradle em `dist/egmgo-android` e um ícone de launcher provisório. Se `adb` e o Gradle forem encontrados e houver um dispositivo conectado, ele também executa `assembleDebug` e instala o APK (Android Package, o formato de instalação do Android). Caso contrário, abra a pasta no Android Studio:',
          ),
        },
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `open -a "Android Studio" dist/egmgo-android
# in Android Studio: Run, then pick your device`,
        },
        {
          type: 'p',
          text: t(
            'It looks for `adb` on `PATH`, in `ANDROID_HOME/platform-tools` and in the default SDK folders on macOS and Linux.',
            'Ele procura o `adb` no `PATH`, em `ANDROID_HOME/platform-tools` e nas pastas padrão do SDK no macOS e no Linux.',
          ),
        },
      ],
    },
    {
      id: 'then',
      title: t('Then run the simulator', 'Depois, rode o simulador'),
      blocks: [
        {
          type: 'p',
          text: t(
            'With EgmGO installed, run `egm simulate` in your game project and scan the QR code in the simulator with EgmGO. The phone and the computer must be on the same network, or use `egm simulate --tunnel`. A game can tell it is inside EgmGO because the app runs a script that marks the page:',
            'Com o EgmGO instalado, rode `egm simulate` no projeto do jogo e leia com o EgmGO o QR code do simulador. O celular e o computador precisam estar na mesma rede, ou use `egm simulate --tunnel`. Um jogo consegue saber que está dentro do EgmGO porque o app executa um script que marca a página:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          code: `declare global {
  interface Window {
    __EGMGO__?: boolean
  }
}

/** True when the game is running inside the EgmGO companion app. */
export function isEgmGo(): boolean {
  return (
    window.__EGMGO__ === true ||
    document.documentElement.hasAttribute('data-egmgo')
  )
}`,
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'EgmGO is a development tool, not a publishing channel. To ship, use [egm build](/cli/build); today that means desktop.',
            'O EgmGO é uma ferramenta de desenvolvimento, não um canal de publicação. Para publicar, use o [egm build](/cli/build); hoje isso significa desktop.',
          ),
        },
      ],
    },
  ],
}

export default page
