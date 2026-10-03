import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/build/web',
  title: t('Web', 'Web'),
  description: t(
    'The web target is not available in 0.2.0. What is planned, and how to host your game as a static site in the meantime.',
    'O alvo web não está disponível na 0.2.0. O que está planejado e como hospedar o seu jogo como um site estático enquanto isso.',
  ),
  source: 'src/cli/builders/WebBuilder.ts',
  related: ['/cli/build', '/build/desktop', '/tools/config', '/cli/simulate'],
  sections: [
    {
      id: 'status',
      title: t('Status', 'Situação'),
      blocks: [
        {
          type: 'callout',
          kind: 'warning',
          title: t('Not available yet', 'Ainda não disponível'),
          text: t(
            '`egm build web` prints `The "web" build target is not available yet. Only desktop builds are supported right now: egm build desktop [macos|windows|linux]` and exits with code 1. The builder exists in the code and will be opened together with the other targets. To publish a game on the EGM marketplace, use [`egm publish`](/cli/publish), which does its own web build and does not depend on this target.',
            '`egm build web` imprime `The "web" build target is not available yet. Only desktop builds are supported right now: egm build desktop [macos|windows|linux]` e encerra com código 1. O builder existe no código e será aberto junto com os outros alvos. Para publicar um jogo no marketplace do EGM, use o [`egm publish`](/cli/publish), que faz o seu próprio build web e não depende deste alvo.',
          ),
        },
        {
          type: 'p',
          text: t(
            'When it opens, the web target is meant to be the simplest one: a static folder (`dist/web`) with `index.html` and assets, ready for Netlify, Vercel, GitHub Pages or any CDN (Content Delivery Network, a network of servers that serve static files). No server-side code.',
            'Quando abrir, o alvo web deve ser o mais simples: uma pasta estática (`dist/web`) com `index.html` e assets, pronta para Netlify, Vercel, GitHub Pages ou qualquer CDN (Content Delivery Network, uma rede de servidores que entregam arquivos estáticos). Sem código no servidor.',
          ),
        },
      ],
    },
    {
      id: 'planned',
      title: t('What the planned build does', 'O que o build planejado faz'),
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            t('Runs `vite build` into `dist/web`.', 'Executa `vite build` em `dist/web`.'),
            t('Injects the scaling script into `index.html`, driven by `display.scaling` and `display.backgroundColor`, unless the scaling is `none`.', 'Injeta o script de escala no `index.html`, conduzido por `display.scaling` e `display.backgroundColor`, a menos que a escala seja `none`.'),
            t('Prints hosting instructions and offers to preview the result with `vite preview`.', 'Imprime instruções de hospedagem e oferece uma prévia do resultado com `vite preview`.'),
          ],
        },
      ],
    },
    {
      id: 'meanwhile',
      title: t('Hosting a static build today', 'Hospedando um build estático hoje'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Your project is a normal Vite project, so nothing stops you from running the same first step yourself. This is not a supported EGM path in 0.2.0, but it is the same command the builder uses:',
            'O seu projeto é um projeto Vite normal, então nada impede você de executar por conta própria o mesmo primeiro passo. Esse não é um caminho suportado pelo EGM na 0.2.0, mas é o mesmo comando que o builder usa:',
          ),
        },
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `npx vite build
npx vite preview   # http://localhost:4173`,
        },
        {
          type: 'callout',
          kind: 'info',
          text: t(
            'A plain `vite build` does not inject the scaling script that `egm build` and the simulator add. If your game relies on `display.scaling`, size the canvas yourself, for example with CSS, and test on the devices you care about.',
            'Um `vite build` simples não injeta o script de escala que o `egm build` e o simulador adicionam. Se o seu jogo depende de `display.scaling`, dimensione o canvas por conta própria, por exemplo com CSS, e teste nos dispositivos que importam.',
          ),
        },
        {
          type: 'p',
          text: t(
            'To try the game on a phone before that, use [egm simulate](/cli/simulate) with `--tunnel`. For a real distributable, [Desktop](/build/desktop) is the target that works.',
            'Para testar o jogo em um celular antes disso, use o [egm simulate](/cli/simulate) com `--tunnel`. Para algo distribuível de verdade, o [Desktop](/build/desktop) é o alvo que funciona.',
          ),
        },
      ],
    },
    {
      id: 'config',
      title: t('The settings it will use', 'As configurações que ele usará'),
      blocks: [
        {
          type: 'p',
          text: t(
            'These `egm.config.ts` fields already drive the simulator and are the ones the web build reads:',
            'Estes campos do `egm.config.ts` já conduzem o simulador e são os que o build web lê:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'egm.config.ts',
          code: `import { defineConfig } from 'easy-game-maker'

export default defineConfig({
  app: { name: 'Web Game', version: '1.0.0', bundleId: 'com.example.webgame' },
  display: {
    width: 1280,
    height: 720,
    orientation: 'landscape',
    backgroundColor: '#101827',
    scaling: 'fit', // 'fit' | 'fill' | 'stretch' | 'none'
  },
})`,
        },
      ],
    },
  ],
}

export default page
