import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/quickstart',
  title: t('Your First 3D Game', 'Seu Primeiro Jogo 3D'),
  description: t(
    'Create a 3D project with egm new --3d, then build a small coin-collecting game step by step.',
    'Crie um projeto 3D com egm new --3d e monte, passo a passo, um pequeno jogo de coletar moedas.',
  ),
  badge: 'NEW',
  source: 'easy-game-maker/src/cli/commands/new3d.ts',
  related: ['/3d/overview', '/3d/game-shape', '/3d/controls', '/3d/physics'],
  sections: [
    {
      id: 'create',
      title: t('1. Create the project', '1. Crie o projeto'),
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          check: 'skip',
          code: `egm new my-game --3d
cd my-game
npm install
npm run dev`,
        },
        {
          type: 'p',
          text: t(
            '`npm run dev` runs `egm simulate`. The scaffold writes these files: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `egm.config.ts` (with `mode: \'3d\'`), `.gitignore` and `src/main.ts`. It depends on `easy-game-maker` and on `three` (pinned to 0.185.1).',
            '`npm run dev` executa o `egm simulate`. O scaffold escreve estes arquivos: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `egm.config.ts` (com `mode: \'3d\'`), `.gitignore` e `src/main.ts`. Ele depende de `easy-game-maker` e de `three` (fixado em 0.185.1).',
          ),
        },
      ],
    },
    {
      id: 'scaffold',
      title: t('2. Read the starter', '2. Leia o ponto de partida'),
      blocks: [
        {
          type: 'p',
          text: t(
            'The generated `src/main.ts` is a lit ground and a character that spins. This is the whole file:',
            'O `src/main.ts` gerado é um chão iluminado e um personagem que gira. Este é o arquivo inteiro:',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { createGame, lights, models } from 'easy-game-maker/3d';

const game = createGame({ background: '#101827', cameraPosition: [0, 3, 8] });

lights.daylight(game.scene);
game.add(models.ground(40));

const hero = models.character();
game.add(hero);

game.onUpdate((dt, elapsed) => {
  hero.rotation.y += dt;
  hero.userData.animate?.(elapsed, 1);
});
`,
        },
        {
          type: 'list',
          items: [
            t('`createGame` builds the renderer, loop, input, HUD (Heads-Up Display, the interface over the canvas), sound and tweens, and starts running.', '`createGame` monta o renderizador, o loop, a entrada, o HUD (Heads-Up Display, a interface sobre o canvas), o som e os tweens, e já começa a rodar.'),
            t('`lights.daylight` lights the scene and `models.ground` is a checkered floor already lying in the XZ plane.', '`lights.daylight` ilumina a cena e `models.ground` é um chão xadrez que já está deitado no plano XZ.'),
            t('`game.onUpdate` runs every frame with `dt` (seconds since the last frame) and `elapsed`.', '`game.onUpdate` roda a cada quadro com `dt` (segundos desde o quadro anterior) e `elapsed`.'),
          ],
        },
      ],
    },
    {
      id: 'move',
      title: t('3. Make it move', '3. Faça se mover'),
      description: t(
        'Physics gives the hero a floor and gravity, `thirdPerson` reads the input, and `followCamera` trails behind.',
        'A física dá ao herói chão e gravidade, o `thirdPerson` lê a entrada e o `followCamera` segue atrás.',
      ),
      blocks: [
        {
          type: 'p',
          text: t(
            'Replace the `onUpdate` spin with a physics world and a controller. `thirdPerson` moves the character in camera space (WASD or arrows), turns it to face travel, and jumps on `Space` when it has a physics `body`. Call `world.step(dt)` once per frame from `onUpdate`.',
            'Troque o giro do `onUpdate` por um mundo de física e um controlador. O `thirdPerson` move o personagem no espaço da câmera (WASD ou setas), vira o personagem para o lado do movimento e pula com `Space` quando há um `body` de física. Chame `world.step(dt)` uma vez por quadro no `onUpdate`.',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import { createGame, createPhysics, followCamera, lights, models, thirdPerson } from 'easy-game-maker/3d';

const game = createGame({ background: '#101827', cameraPosition: [0, 5, 10] });

lights.daylight(game.scene);
game.add(models.ground(60));

const world = createPhysics();
world.addGround(0);

const hero = models.character();
game.add(hero);

const body = world.addBody({ object: hero, radius: 0.5, height: 1.8, position: [0, 0.5, 0] });
thirdPerson(game, game.input, hero, { body });
followCamera(game, hero, { distance: 9, height: 5 });

game.onUpdate((dt, elapsed) => {
  world.step(dt);
  hero.userData.animate?.(elapsed, Math.hypot(body.velocity.x, body.velocity.z));
});
`,
        },
        {
          type: 'callout',
          kind: 'tip',
          title: t('Read input in onUpdate', 'Leia a entrada no onUpdate'),
          text: t(
            '`pressed`, `released`, `look` and `wheel` are cleared in the first `onLateUpdate` listener. Read them in `onUpdate`, and keep `onLateUpdate` for things that must see final positions, such as cameras.',
            '`pressed`, `released`, `look` e `wheel` são limpos no primeiro listener de `onLateUpdate`. Leia-os no `onUpdate` e deixe o `onLateUpdate` para o que precisa ver as posições finais, como as câmeras.',
          ),
        },
      ],
    },
    {
      id: 'coins',
      title: t('4. Add coins, score and a probe', '4. Adicione moedas, pontuação e um probe'),
      blocks: [
        {
          type: 'p',
          text: t(
            'A body created with `trigger: true` detects overlap without blocking. Its `onEnter` hook fires once when the hero touches it. `createScore` keeps a best score in `localStorage` and, given the `hud`, shows `Score` and `Best` in the corner. `game.probe.register` exposes state to tests through `window.__EGM_GAME__` (see [The Shape of a Game](/3d/game-shape)).',
            'Um body criado com `trigger: true` detecta sobreposição sem bloquear. O hook `onEnter` dispara uma vez quando o herói encosta nele. O `createScore` guarda a melhor pontuação no `localStorage` e, recebendo o `hud`, mostra `Score` e `Best` no canto. O `game.probe.register` expõe o estado para testes por meio do `window.__EGM_GAME__` (veja [A Forma de um Jogo](/3d/game-shape)).',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/main.ts',
          check: 'compile',
          code: `import {
  createGame,
  createPhysics,
  createScore,
  followCamera,
  lights,
  materials,
  models,
  thirdPerson,
} from 'easy-game-maker/3d';

const game = createGame({ background: '#101827', cameraPosition: [0, 5, 10] });

lights.daylight(game.scene);
game.add(models.ground(60));

const world = createPhysics();
world.addGround(0);

const hero = models.character();
game.add(hero);
const body = world.addBody({ object: hero, radius: 0.5, height: 1.8, position: [0, 0.5, 0] });
thirdPerson(game, game.input, hero, { body });
followCamera(game, hero, { distance: 9, height: 5 });

const score = createScore({ key: 'my-game-best', hud: game.hud });

for (let i = 0; i < 8; i++) {
  const angle = (i / 8) * Math.PI * 2;
  const coin = models.sphere(0.4, { material: materials.glow('#facc15'), position: [Math.cos(angle) * 8, 1, Math.sin(angle) * 8] });
  game.add(coin);

  const pickup = world.addBody({ object: coin, radius: 0.8, height: 2, trigger: true });
  pickup.onEnter = (other) => {
    if (other !== body) return;
    pickup.enabled = false;
    coin.visible = false;
    score.add();
    game.audio.play('coin');
  };
}

game.probe.register('game', () => ({ score: score.value, x: hero.position.x, z: hero.position.z }));

game.onUpdate((dt, elapsed) => {
  world.step(dt);
  hero.userData.animate?.(elapsed, Math.hypot(body.velocity.x, body.velocity.z));
});
`,
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Sound needs a gesture', 'O som precisa de um gesto'),
          text: t(
            'Every sound is synthesised with the Web Audio API when it plays. Browsers only start audio after the player interacts with the page, so a game that "has no sound" usually just has not been clicked yet.',
            'Todo som é sintetizado com a Web Audio API quando toca. Os navegadores só iniciam o áudio depois que o jogador interage com a página, então um jogo "sem som" geralmente só não recebeu um clique ainda.',
          ),
        },
      ],
    },
    {
      id: 'next',
      title: t('5. Next steps', '5. Próximos passos'),
      blocks: [
        {
          type: 'list',
          items: [
            t('Test it in the browser with `egm simulate` (what `npm run dev` runs).', 'Teste no navegador com `egm simulate` (o que o `npm run dev` executa).'),
            t('Package it with `egm build desktop`. Desktop is the only platform available today: the other platforms are not ready yet and the EGM Marketplace is planned.', 'Empacote com `egm build desktop`. Desktop é a única plataforma disponível hoje: as outras ainda não estão prontas e o EGM Marketplace está planejado.'),
            t('Learn each module: [controls](/3d/controls), [physics](/3d/physics), [input](/3d/input) and [state](/3d/state). The full map is in the [overview](/3d/overview).', 'Aprenda cada módulo: [controls](/3d/controls), [physics](/3d/physics), [input](/3d/input) e [state](/3d/state). O mapa completo está na [visão geral](/3d/overview).'),
          ],
        },
      ],
    },
  ],
}

export default page
