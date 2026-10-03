import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/cli/publish',
  title: t('egm publish', 'egm publish'),
  description: t(
    'Build your game for the web, check it, pack it into an encrypted .egmpkg and send it to the Easy Game Maker play marketplace.',
    'Compile o seu jogo para a web, confira, empacote em um .egmpkg cifrado e envie ao marketplace Easy Game Maker play.',
  ),
  badge: 'NEW',
  source: 'src/cli/commands/publish.ts',
  related: ['/cli/login', '/cli/build', '/build/web', '/tools/config'],
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
            '`egm publish` arrives with the next SDK release after 0.2.4, together with the play service it uploads to. This page describes it ahead of the release. It does not depend on `egm build web`, which stays disabled.',
            '`egm publish` chega na próxima versão do SDK (Software Development Kit) depois da 0.2.4, junto com o serviço play para o qual ele envia. Esta página o descreve antes do lançamento. Ele não depende do `egm build web`, que continua desativado.',
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
          code: `egm login                        # once per machine
egm publish --init               # writes a template egm.publish.json
egm publish --dry-run            # builds and packs locally: no network, no login
egm publish                      # asks for confirmation, uploads, waits for the result
egm publish --yes --no-build     # CI style: no prompt, reuse an up-to-date dist/web`,
        },
        {
          type: 'props',
          rows: [
            { name: '-d, --dir <path>', type: 'string', default: '.', description: t('The game project folder.', 'A pasta do projeto do jogo.') },
            { name: '--endpoint <url>', type: 'string', default: 'EGM_AI_URL or https://ai.egmsdk.com', description: t('The backend that holds your login (see egm login).', 'O backend que guarda o seu login (veja egm login).') },
            { name: '--play <url>', type: 'string', description: t('The play service URL. By default, the one your login reports.', 'A URL do serviço play. Por padrão, a que o seu login informa.') },
            { name: '--dry-run', type: 'boolean', default: 'false', description: t('Runs everything locally (config, manifest, build, checks, packaging), encrypts to a throwaway key, prints the file list, sizes and warnings, then deletes the package. It touches no network and needs no login.', 'Executa tudo localmente (config, manifesto, build, verificações, empacotamento), cifra para uma chave descartável, imprime a lista de arquivos, tamanhos e avisos e apaga o pacote. Não usa a rede e não exige login.') },
            { name: '-y, --yes', type: 'boolean', default: 'false', description: t('Skip the confirmation that shows title, version, size and destination. Without a terminal, `--yes` is required.', 'Pula a confirmação que mostra título, versão, tamanho e destino. Sem terminal, `--yes` é obrigatório.') },
            { name: '--no-build', type: 'boolean', default: 'false', description: t('Reuse `dist/web`. It stops with a hint when the folder is missing or older than `src/`, `public/`, `index.html`, `egm.config.ts` or `package.json`.', 'Reaproveita o `dist/web`. Para com uma dica quando a pasta não existe ou é mais velha que `src/`, `public/`, `index.html`, `egm.config.ts` ou `package.json`.') },
            { name: '--init', type: 'boolean', default: 'false', description: t('Write a template `egm.publish.json` and exit. It never overwrites an existing file.', 'Escreve um `egm.publish.json` de modelo e encerra. Nunca sobrescreve um arquivo existente.') },
            { name: '--wait <seconds>', type: 'number', default: '300', description: t('How long to wait for the analysis result (1 to 3600).', 'Quanto esperar pelo resultado da análise (1 a 3600).') },
          ],
        },
      ],
    },
    {
      id: 'listing',
      title: t('The store listing: egm.publish.json', 'A página da loja: egm.publish.json'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Create `egm.publish.json` at the project root. Missing or invalid fields are all reported at once, with an example file. Fields that start with `_` are ignored, and unknown fields only produce a warning.',
            'Crie o `egm.publish.json` na raiz do projeto. Campos ausentes ou inválidos são todos relatados de uma vez, com um arquivo de exemplo. Campos que começam com `_` são ignorados, e campos desconhecidos só geram um aviso.',
          ),
        },
        {
          type: 'code',
          lang: 'json',
          filename: 'egm.publish.json',
          code: `{
  "slug": "space-miner",
  "title": "Space Miner",
  "description": "Mine rocks, dodge comets and upgrade your ship.",
  "tags": ["arcade", "space"],
  "category": "arcade",
  "license": "proprietary",
  "icon": "public/assets/icon.png",
  "screenshots": ["public/assets/shot-1.png"],
  "input": ["keyboard", "mouse", "touch"]
}`,
        },
        {
          type: 'table',
          head: [t('Field', 'Campo'), t('Rule', 'Regra')],
          rows: [
            [t('`slug`', '`slug`'), t('Required. 3 to 40 characters: lowercase letters, digits and single hyphens.', 'Obrigatório. De 3 a 40 caracteres: letras minúsculas, dígitos e hifens simples.')],
            [t('`title`, `description`', '`title`, `description`'), t('Required. Up to 80 and 500 characters.', 'Obrigatórios. Até 80 e 500 caracteres.')],
            [t('`longDescription`', '`longDescription`'), t('Optional, up to 5000 characters.', 'Opcional, até 5000 caracteres.')],
            [t('`tags`', '`tags`'), t('Up to 8, each up to 24 characters.', 'Até 8, cada uma com até 24 caracteres.')],
            [t('`category`', '`category`'), t('`action`, `adventure`, `arcade`, `board`, `card`, `casual`, `educational`, `platformer`, `puzzle`, `racing`, `rpg`, `shooter`, `simulation`, `sports`, `strategy` or `other` (default).', '`action`, `adventure`, `arcade`, `board`, `card`, `casual`, `educational`, `platformer`, `puzzle`, `racing`, `rpg`, `shooter`, `simulation`, `sports`, `strategy` ou `other` (padrão).')],
            [t('`author`, `license`', '`author`, `license`'), t('Optional display name (the server uses your developer profile) and an SPDX (Software Package Data Exchange) license id or `proprietary` (default).', 'Nome de exibição opcional (o servidor usa o seu perfil de desenvolvedor) e um identificador de licença SPDX (Software Package Data Exchange) ou `proprietary` (padrão).')],
            [t('`icon`', '`icon`'), t('A PNG (Portable Network Graphics) inside the project, square and at least 128 px (512 recommended). Falls back to `app.icon`.', 'Um PNG (Portable Network Graphics) dentro do projeto, quadrado e de pelo menos 128 px (512 recomendado). Usa `app.icon` se faltar.')],
            [t('`cover`, `screenshots`', '`cover`, `screenshots`'), t('Optional PNG or JPEG files, up to 6 screenshots.', 'Arquivos PNG ou JPEG opcionais, até 6 capturas de tela.')],
            [t('`input`', '`input`'), t('A subset of `touch`, `keyboard`, `gamepad`, `mouse`. Default: keyboard, mouse and touch.', 'Um subconjunto de `touch`, `keyboard`, `gamepad`, `mouse`. Padrão: teclado, mouse e toque.')],
            [t('`usesNetwork`', '`usesNetwork`'), t('Optional. When omitted, it is detected from the built code; a mismatch with the declared value is a warning.', 'Opcional. Quando omitido, é detectado no código compilado; uma divergência com o valor declarado gera um aviso.')],
          ],
        },
        {
          type: 'p',
          text: t(
            'The version (`app.version`, which must be a semantic version such as `1.2.3`), the size, orientation, scaling and mode come from `egm.config.ts`. The engine version comes from the SDK. Each upload needs a version that was not published before.',
            'A versão (`app.version`, que precisa ser uma versão semântica como `1.2.3`), o tamanho, a orientação, a escala e o modo vêm do `egm.config.ts`. A versão do engine vem do SDK. Cada envio precisa de uma versão que ainda não foi publicada.',
          ),
        },
      ],
    },
    {
      id: 'checks',
      title: t('What it checks before sending', 'O que ele confere antes de enviar'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('Refuses games with ads (`monetization.admob`) or in-game purchases (`monetization.iap`): the marketplace does not support them yet. It names the keys to remove.', 'Recusa jogos com anúncios (`monetization.admob`) ou compras dentro do jogo (`monetization.iap`): o marketplace ainda não os aceita. Ele diz quais chaves remover.'),
            t('Builds with `vite build --base ./` into `dist/web` (relative paths, because every game is served from its own origin) and injects the scaling script.', 'Compila com `vite build --base ./` em `dist/web` (caminhos relativos, porque cada jogo é servido da sua própria origem) e injeta o script de escala.'),
            t('Checks `index.html`: every `src` and `href` is relative and points to a file that exists, with no `<base>` tag and no external URL. An old `dist/web` built without `--base ./` is refused.', 'Confere o `index.html`: todo `src` e `href` é relativo e aponta para um arquivo que existe, sem tag `<base>` e sem URL externa. Um `dist/web` antigo, compilado sem `--base ./`, é recusado.'),
            t('Applies the package rules below to every file.', 'Aplica as regras de pacote abaixo a cada arquivo.'),
            t('Scans the built code for network use and warns about root-relative `fetch("/...")` calls (they work, since the game is served from its own origin root, but the file must be in the package).', 'Examina o código compilado em busca de uso de rede e avisa sobre chamadas `fetch("/...")` com caminho a partir da raiz (funcionam, já que o jogo é servido da raiz da própria origem, mas o arquivo precisa estar no pacote).'),
          ],
        },
        {
          type: 'table',
          head: [t('Package rule', 'Regra do pacote'), t('Limit', 'Limite')],
          rows: [
            [t('Final encrypted package', 'Pacote final cifrado'), t('200 MiB', '200 MiB')],
            [t('All files uncompressed', 'Todos os arquivos descompactados'), t('500 MiB', '500 MiB')],
            [t('Each file', 'Cada arquivo'), t('100 MiB', '100 MiB')],
            [t('Entries, counting the 2 metadata files', 'Entradas, contando os 2 arquivos de metadados'), t('5000', '5000')],
            [t('Path depth', 'Profundidade do caminho'), t('12 levels', '12 níveis')],
            [t('Allowed types', 'Tipos permitidos'), t('html, js, mjs, css, json, png, jpg, jpeg, gif, webp, ico, mp3, ogg, wav, m4a, woff, woff2, ttf, otf, glb, gltf, bin, txt, xml (svg and wasm with a warning)', 'html, js, mjs, css, json, png, jpg, jpeg, gif, webp, ico, mp3, ogg, wav, m4a, woff, woff2, ttf, otf, glb, gltf, bin, txt, xml (svg e wasm com aviso)')],
            [t('Never allowed', 'Nunca permitidos'), t('source maps, executables (exe, dll, sh, bat, com, apk, dmg, msi), nested archives (checked by name and by the first bytes), symbolic links, names with spaces or a leading dot', 'mapas de código, executáveis (exe, dll, sh, bat, com, apk, dmg, msi), arquivos aninhados (conferidos pelo nome e pelos primeiros bytes), links simbólicos, nomes com espaço ou começando com ponto')],
          ],
        },
        {
          type: 'p',
          text: t(
            'Files that start with a dot, such as `.DS_Store`, are skipped silently.',
            'Arquivos que começam com ponto, como o `.DS_Store`, são ignorados em silêncio.',
          ),
        },
      ],
    },
    {
      id: 'package',
      title: t('What gets sent', 'O que é enviado'),
      blocks: [
        {
          type: 'p',
          text: t(
            'An `.egmpkg` file: an unpassworded zip (with `egmpkg.json`, `manifest.json` and all game files) wrapped in an `age` encryption envelope addressed to the play service keys. Only the play service can open it, and it also hides the file names. The package is built as a stream, so memory stays flat even for a 200 MiB game, and it is kept in a temporary folder that is deleted at the end.',
            'Um arquivo `.egmpkg`: um zip sem senha (com `egmpkg.json`, `manifest.json` e todos os arquivos do jogo) dentro de um envelope de criptografia `age` endereçado às chaves do serviço play. Só o serviço play consegue abri-lo, e isso também esconde os nomes dos arquivos. O pacote é montado em fluxo, então a memória fica estável mesmo para um jogo de 200 MiB, e ele fica numa pasta temporária apagada no final.',
          ),
        },
        {
          type: 'list',
          ordered: true,
          items: [
            t('Trades your login credential for a short-lived publish token.', 'Troca a sua credencial de login por um token de publicação de vida curta.'),
            t('Reads the play service package keys and encrypts to every key that is active or next.', 'Lê as chaves de pacote do serviço play e cifra para toda chave ativa ou próxima.'),
            t('Asks for an upload, sends the package, and confirms it with its real size and SHA-256 (Secure Hash Algorithm, 256 bits) hash.', 'Pede um envio, manda o pacote e o confirma com o tamanho real e o hash SHA-256 (Secure Hash Algorithm, 256 bits).'),
            t('Checks the status every 3 seconds, up to `--wait` seconds, until it is `pending_review`, `published`, `rejected` or `failed`.', 'Consulta o estado a cada 3 segundos, por até `--wait` segundos, até ele ser `pending_review`, `published`, `rejected` ou `failed`.'),
          ],
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('The CLI protects your token', 'O CLI protege o seu token'),
          text: t(
            'Only https is used (http only for localhost), redirects are never followed, tokens are never printed, and the publish token is sent to the upload address only when it is on the same origin as the play service. The full wire contract is in `docs/publish-protocol.md` of the SDK repository.',
            'Só se usa https (http apenas para localhost), redirecionamentos nunca são seguidos, tokens nunca são impressos, e o token de publicação só vai ao endereço de envio quando ele está na mesma origem do serviço play. O contrato completo está em `docs/publish-protocol.md` no repositório do SDK.',
          ),
        },
      ],
    },
    {
      id: 'exit',
      title: t('Result and exit codes', 'Resultado e códigos de saída'),
      blocks: [
        {
          type: 'table',
          head: [t('Outcome', 'Resultado'), t('Exit code', 'Código de saída')],
          rows: [
            [t('`published` or `pending_review` (waiting for review), and a finished `--dry-run`', '`published` ou `pending_review` (aguardando revisão) e um `--dry-run` concluído'), t('0', '0')],
            [t('`rejected` (the reasons are printed) or `failed`', '`rejected` (os motivos são impressos) ou `failed`'), t('1', '1')],
            [t('Any local problem, refused login, 401/403/409/413, cancelled prompt or timeout', 'Qualquer problema local, login recusado, 401/403/409/413, confirmação cancelada ou tempo esgotado'), t('1', '1')],
          ],
        },
        {
          type: 'table',
          head: [t('Message', 'Mensagem'), t('What to do', 'O que fazer')],
          rows: [
            [t('credential refused (`invalid_credential`)', 'credencial recusada (`invalid_credential`)'), t('Run `egm login` again.', 'Rode `egm login` de novo.')],
            [t('not an approved publisher, or profile incomplete (403)', 'não é um publicador aprovado, ou perfil incompleto (403)'), t('Complete the developer profile in the web app, at `/developer/profile` of your endpoint.', 'Complete o perfil de desenvolvedor no app web, em `/developer/profile` do seu endpoint.')],
            [t('version already published (409)', 'versão já publicada (409)'), t('Bump `app.version` in `egm.config.ts`.', 'Aumente `app.version` no `egm.config.ts`.')],
            [t('package too large (413)', 'pacote grande demais (413)'), t('Remove or shrink assets until it fits in 200 MiB.', 'Remova ou reduza assets até caber em 200 MiB.')],
          ],
        },
      ],
    },
  ],
}

export default page
