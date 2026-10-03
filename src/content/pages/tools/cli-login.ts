import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/cli/login',
  title: t('egm login and logout', 'egm login e logout'),
  description: t(
    'Sign in to Easy Game Maker AI from the terminal with a device code, and forget the stored credential. Needed by egm publish.',
    'Entre no Easy Game Maker AI pelo terminal com um código de dispositivo e esqueça a credencial guardada. Necessário para o egm publish.',
  ),
  badge: 'NEW',
  source: 'src/cli/commands/login.ts',
  related: ['/cli/publish', '/tools/config', '/cli/build'],
  sections: [
    {
      id: 'status',
      title: t('Release status', 'Situação da versão'),
      blocks: [
        {
          type: 'callout',
          kind: 'info',
          title: t('Not released yet', 'Ainda não lançado'),
          text: t(
            '`egm login`, `egm logout` and `egm publish` arrive with the next SDK release after 0.2.4. This page describes them ahead of the release.',
            '`egm login`, `egm logout` e `egm publish` chegam na próxima versão do SDK (Software Development Kit) depois da 0.2.4. Esta página os descreve antes do lançamento.',
          ),
        },
      ],
    },
    {
      id: 'usage',
      title: t('Usage', 'Uso'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm login                       # shows a code, you approve it in the browser
egm login --no-browser          # print the code and the link, do not open a browser
egm login --endpoint https://ai.example.com
egm logout                      # forget the stored credential`,
        },
        {
          type: 'props',
          rows: [
            { name: '--endpoint <url>', type: 'string', default: 'EGM_AI_URL or https://ai.egmsdk.com', description: t('The Easy Game Maker AI backend that holds your account. Must be https (plain http is accepted only for localhost).', 'O backend do Easy Game Maker AI que guarda a sua conta. Precisa ser https (http puro só é aceito para localhost).') },
            { name: '--no-browser', type: 'boolean', default: 'false', description: t('Do not open the browser. The browser is also left alone when there is no terminal.', 'Não abre o navegador. Ele também não é aberto quando não há terminal.') },
          ],
        },
      ],
    },
    {
      id: 'flow',
      title: t('How the login works', 'Como o login funciona'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The CLI uses the OAuth device authorization flow (RFC 8628), made for programs that cannot show a login form. Your password never reaches the CLI.',
            'O CLI (Command-Line Interface) usa o fluxo de autorização por dispositivo do OAuth (RFC 8628, Request for Comments), feito para programas que não conseguem mostrar um formulário de login. A sua senha nunca chega ao CLI.',
          ),
        },
        {
          type: 'list',
          ordered: true,
          items: [
            t('The CLI asks the backend for a device code and prints a code such as `ABCD-EFGH` and a link.', 'O CLI pede um código de dispositivo ao backend e imprime um código como `ABCD-EFGH` e um link.'),
            t('It opens the link in your browser (unless `--no-browser` or there is no terminal). You sign in and approve the code.', 'Ele abre o link no navegador (a menos que haja `--no-browser` ou que não exista terminal). Você entra na conta e aprova o código.'),
            t('Meanwhile the CLI polls the backend, honoring the interval the server asks for, until you approve, deny or the code expires.', 'Enquanto isso, o CLI consulta o backend, respeitando o intervalo que o servidor pede, até você aprovar, negar ou o código expirar.'),
            t('On approval, the CLI stores a revocable credential and prints the date it stops being valid.', 'Na aprovação, o CLI guarda uma credencial revogável e imprime a data em que ela deixa de valer.'),
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Only approve what you started', 'Aprove só o que você começou'),
          text: t(
            'The CLI prints "Only approve if you started this login yourself". If someone sends you a code you did not request, do not approve it: approving gives that program access to publish in your name.',
            'O CLI imprime "Only approve if you started this login yourself". Se alguém lhe enviar um código que você não pediu, não aprove: aprovar dá a esse programa acesso para publicar em seu nome.',
          ),
        },
      ],
    },
    {
      id: 'storage',
      title: t('Where the credential is stored', 'Onde a credencial fica guardada'),
      blocks: [
        {
          type: 'p',
          text: t(
            'In `~/.egm/credentials.json`. The folder has mode 0700 and the file 0600 (owner only), the file is written atomically, and there is one entry per endpoint, so you can be signed in to more than one backend. Set `EGM_HOME` to keep the file somewhere else. The CLI never prints the credential.',
            'Em `~/.egm/credentials.json`. A pasta tem modo 0700 e o arquivo 0600 (só o dono), o arquivo é gravado de forma atômica e existe uma entrada por endpoint, então você pode estar conectado a mais de um backend. Defina `EGM_HOME` para guardar o arquivo em outro lugar. O CLI nunca imprime a credencial.',
          ),
        },
        {
          type: 'p',
          text: t(
            '`egm logout` deletes the entry for the endpoint (default or `--endpoint`). That only forgets it on your machine: to revoke the credential on the server too, open the developer area of the web app and revoke the device.',
            '`egm logout` apaga a entrada do endpoint (o padrão ou o de `--endpoint`). Isso só a esquece na sua máquina: para revogar a credencial também no servidor, abra a área do desenvolvedor do app web e revogue o dispositivo.',
          ),
        },
      ],
    },
    {
      id: 'errors',
      title: t('When it fails', 'Quando falha'),
      blocks: [
        {
          type: 'table',
          head: [t('Situation', 'Situação'), t('What the CLI does', 'O que o CLI faz')],
          rows: [
            [t('You deny the code in the browser', 'Você nega o código no navegador'), t('Stops, exit code 1, nothing is saved', 'Para, código de saída 1, nada é gravado')],
            [t('The code expires', 'O código expira'), t('Stops with "Run egm login again", exit code 1', 'Para com "Run egm login again", código de saída 1')],
            [t('The server asks to slow down', 'O servidor pede para ir mais devagar'), t('Waits longer between checks', 'Espera mais entre as consultas')],
            [t('Network failure or a 5xx answer while waiting', 'Falha de rede ou resposta 5xx durante a espera'), t('Retries up to 3 times in a row, then stops', 'Tenta de novo até 3 vezes seguidas e então para')],
            [t('The endpoint is plain http and not localhost', 'O endpoint é http puro e não é localhost'), t('Refuses before any request', 'Recusa antes de qualquer requisição')],
          ],
        },
      ],
    },
  ],
}

export default page
