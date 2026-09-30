import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/debug/save',
  title: t('SaveManager', 'SaveManager'),
  description: t(
    'Save and load JSON data in named slots, namespaced per game and backed by localStorage.',
    'Salve e carregue dados JSON (JavaScript Object Notation) em slots nomeados, com espaço de nomes por jogo e apoio no localStorage.',
  ),
  source: 'src/engine/debug/SaveManager.ts',
  related: ['/monetization/iap', '/core/app', '/guide/troubleshooting'],
  sections: [
    {
      id: 'overview',
      title: t('What it does', 'O que faz'),
      blocks: [
        {
          type: 'p',
          text: t(
            "`SaveManager` serialises any JSON-friendly value into `localStorage` under the key `namespace:slot`. Use a distinct namespace per game (the default is `egm`) so games on the same domain do not overwrite each other. Each entry is wrapped in a `SavePayload`: `{ v: 1, ts: <timestamp>, data }`.",
            "O `SaveManager` serializa qualquer valor compatível com JSON no `localStorage`, sob a chave `namespace:slot`. Use um namespace diferente por jogo (o padrão é `egm`) para que jogos no mesmo domínio não se sobrescrevam. Cada entrada é embrulhada num `SavePayload`: `{ v: 1, ts: <timestamp>, data }`.",
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Where the data lives', 'Onde os dados ficam'),
          text: t(
            'Data is stored in the browser or WebView storage of that device. It is not synced, not encrypted and can be cleared by the player. Do not store anything you must trust, such as proof of purchase.',
            'Os dados ficam no armazenamento do navegador ou da WebView daquele dispositivo. Não há sincronização nem criptografia, e o jogador pode apagá-los. Não guarde nada em que você precise confiar, como prova de compra.',
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
            { name: 'new SaveManager(namespace?)', type: 'constructor', default: "'egm'", description: t('Prefix for every key.', 'Prefixo de todas as chaves.') },
            { name: 'save<T>(slot, data): boolean', type: 'method', description: t('Writes the slot. Returns `false` (and logs a warning) if storage is unavailable or full.', 'Grava o slot. Retorna `false` (e registra um aviso) se o armazenamento está indisponível ou cheio.') },
            { name: 'load<T>(slot): T | null', type: 'method', description: t('Returns the data, or `null` if the slot is missing or corrupted.', 'Retorna os dados, ou `null` se o slot não existe ou está corrompido.') },
            { name: 'loadMeta<T>(slot): SavePayload<T> | null', type: 'method', description: t('Returns the whole payload, including `v` and `ts`.', 'Retorna o payload inteiro, com `v` e `ts`.') },
            { name: 'exists(slot): boolean', type: 'method', description: t('Whether the slot is present.', 'Se o slot existe.') },
            { name: 'delete(slot): void', type: 'method', description: t('Removes one slot.', 'Remove um slot.') },
            { name: 'clear(): void', type: 'method', description: t('Removes every slot in this namespace.', 'Remove todos os slots deste namespace.') },
            { name: 'slots(): string[]', type: 'method', description: t('Names of the slots saved in this namespace.', 'Nomes dos slots salvos neste namespace.') },
            { name: 'saveNumber / loadNumber(slot, fallback = 0)', type: 'method', description: t('Convenience for a single number.', 'Atalho para um único número.') },
            { name: 'saveString / loadString(slot, fallback = "")', type: 'method', description: t('Convenience for a single string.', 'Atalho para uma única string.') },
            { name: 'increment(slot, by = 1): number', type: 'method', description: t('Adds to a numeric slot, saves it and returns the new value.', 'Soma a um slot numérico, salva e retorna o novo valor.') },
          ],
        },
      ],
    },
    {
      id: 'example',
      title: t('Progress and high score', 'Progresso e recorde'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/save.ts',
          check: 'compile',
          code: `import { SaveManager } from 'easy-game-maker'

interface Progress {
  level: number
  coins: number
}

const store = new SaveManager('mygame')

export function saveProgress(p: Progress): void {
  if (!store.save<Progress>('slot1', p)) {
    console.warn('progress could not be saved')
  }
}

export function loadProgress(): Progress {
  return store.load<Progress>('slot1') ?? { level: 1, coins: 0 }
}

export function submitScore(score: number): number {
  const best = Math.max(store.loadNumber('highScore', 0), score)
  store.saveNumber('highScore', best)
  return best
}

export function lastSavedAt(): number | null {
  return store.loadMeta<Progress>('slot1')?.ts ?? null
}

export function countRun(): number {
  return store.increment('runs')
}`,
        },
      ],
    },
  ],
}

export default page
