import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/3d/lights',
  title: t('lights', 'lights'),
  description: t(
    'Complete light rigs (key, fill, bounce and a tuned shadow camera), plus lights that follow objects and cheap blob shadows.',
    'Rigs de luz completos (principal, preenchimento, rebatida e câmera de sombra ajustada), além de luzes que seguem objetos e sombras de bolha baratas.',
  ),
  source: 'src/engine3d/lighting.ts',
  related: ['/3d/materials', '/3d/models', '/3d/postfx', '/3d/debug'],
  sections: [
    {
      id: 'overview',
      title: t('Rigs, not lights', 'Rigs, não luzes'),
      blocks: [
        {
          type: 'p',
          text: t(
            'Lighting is where a 3D scene is won or lost, and the failure mode is always the same: one white directional light, no ambient, no shadow tuning. Each rig in the `lights` namespace is a complete answer: key, fill, bounce and a shadow camera sized to the play area, which is the part that goes wrong by hand.',
            'A iluminação é onde uma cena 3D se ganha ou se perde, e a falha é sempre a mesma: uma luz direcional branca, sem ambiente, sem ajuste de sombra. Cada rig do namespace `lights` é uma resposta completa: luz principal, preenchimento, rebatida e uma câmera de sombra dimensionada para a área de jogo, que é a parte que dá errado quando se faz à mão.',
          ),
        },
        {
          type: 'p',
          text: t(
            'The first argument of every rig is the scene (`game.scene`). Rigs add their lights to it and return them so a game can animate or tweak them. Shadows only appear when the engine has `shadows` enabled (the default).',
            'O primeiro argumento de todo rig é a cena (`game.scene`). Os rigs adicionam suas luzes a ela e as devolvem para o jogo animar ou ajustar. As sombras só aparecem quando a engine está com `shadows` ligado (o padrão).',
          ),
        },
        {
          type: 'code',
          lang: 'ts',
          title: t('Sunset rig and a torch that follows the player', 'Rig de pôr do sol e uma tocha que segue o jogador'),
          code: `import { createGame, models, lights } from 'easy-game-maker/3d'

const game = createGame({ background: '#1b1030' })
const { sun } = lights.sunset(game.scene, { area: 30 })
game.add(models.ground(60))

const player = game.add(models.character())
lights.attachLight(player, { color: '#fb923c', intensity: 6, distance: 10, offset: [0, 2, 0] })

const shadow = lights.blobShadow(game.scene, player, { radius: 0.7 })
game.onUpdate((_dt, elapsed) => {
  player.position.x = Math.sin(elapsed) * 4
  shadow.update()
})
console.log('sun casts shadows:', sun.castShadow)`,
        },
      ],
    },
    {
      id: 'rigs',
      title: t('The rigs', 'Os rigs'),
      blocks: [
        {
          type: 'table',
          head: [t('Function', 'Função'), t('Returns', 'Devolve'), t('Look', 'Visual')],
          rows: [
            [t('`lights.daylight(scene, options?)`', '`lights.daylight(scene, options?)`'), t('`{ sun, sky }`', '`{ sun, sky }`'), t('Clear midday: warm sun, blue sky bounce, brown ground bounce.', 'Meio-dia limpo: sol quente, rebatida azul do céu e rebatida marrom do chão.')],
            [t('`lights.sunset(scene, options?)`', '`lights.sunset(scene, options?)`'), t('`{ sun, sky, rim }`', '`{ sun, sky, rim }`'), t('Low orange key with a cool counter-light. Long shadows.', 'Luz principal laranja e baixa com uma contraluz fria. Sombras longas.')],
            [t('`lights.night(scene, options?)`', '`lights.night(scene, options?)`'), t('`{ moon, sky }`', '`{ moon, sky }`'), t('Almost dark, with a cold moon. Leave headroom for glowing materials.', 'Quase escuro, com uma lua fria. Deixe folga para materiais brilhantes.')],
            [t('`lights.studio(scene, { intensity = 1 })`', '`lights.studio(scene, { intensity = 1 })`'), t('`{ key, fill, rim, ambient }`', '`{ key, fill, rim, ambient }`'), t('Neutral three-point light for a menu, a character or an item on a pedestal. `intensity` scales every light.', 'Luz neutra de três pontos para um menu, um personagem ou um item num pedestal. `intensity` escala todas as luzes.')],
            [t('`lights.moody(scene, { color, intensity = 3 })`', '`lights.moody(scene, { color, intensity = 3 })`'), t('`{ key, ambient }`', '`{ key, ambient }`'), t('Dark room, one coloured spot key, heavy ambient tint. For horror and neon. `color` defaults to the ember; the spot\'s power is `intensity * 30`.', 'Sala escura, uma luz de spot colorida e ambiente bem tingido. Para terror e neon. `color` usa o ember por padrão; a potência do spot é `intensity * 30`.')],
          ],
        },
        {
          type: 'props',
          title: t('Sun options (daylight, sunset, night)', 'Opções do sol (daylight, sunset, night)'),
          rows: [
            { name: 'color', type: 'ColorRepresentation', description: t('Each rig has its own default.', 'Cada rig tem o seu padrão.') },
            { name: 'intensity', type: 'number', description: t('Each rig has its own default.', 'Cada rig tem o seu padrão.') },
            { name: 'position', type: '[number, number, number]', default: '[8, 14, 6]', description: t('Sun position. `sunset` has its own default.', 'Posição do sol. O `sunset` tem o seu padrão.') },
            { name: 'target', type: '[number, number, number]', default: '[0, 0, 0]', description: t('What the light points at.', 'Para onde a luz aponta.') },
            { name: 'shadows', type: 'boolean', default: 'true', description: t('Turn the sun\'s shadow map off.', 'Desliga o shadow map do sol.') },
            { name: 'area', type: 'number', default: '24', description: t('Radius in world units that receives shadows. Set it to roughly your play space: too big and shadows go blocky, too small and they vanish at the edge.', 'Raio em unidades de mundo que recebe sombra. Ajuste para mais ou menos o seu espaço de jogo: grande demais deixa a sombra quadriculada, pequeno demais faz ela sumir na borda.') },
            { name: 'mapSize', type: 'number', default: '2048', description: t('Shadow map resolution.', 'Resolução do shadow map.') },
          ],
        },
        {
          type: 'p',
          text: t(
            '`studio`, `moody` and `attachLight` do not take `area`.',
            '`studio`, `moody` e `attachLight` não aceitam `area`.',
          ),
        },
      ],
    },
    {
      id: 'attached',
      title: t('Attached lights and blob shadows', 'Luzes anexadas e sombras de bolha'),
      blocks: [
        {
          type: 'props',
          title: t('lights.attachLight(object, options)', 'lights.attachLight(object, options)'),
          rows: [
            { name: 'color', type: 'ColorRepresentation', description: t('Light colour.', 'Cor da luz.') },
            { name: 'intensity', type: 'number', default: '8', description: t('Light strength.', 'Força da luz.') },
            { name: 'distance', type: 'number', default: '12', description: t('Keep it tight so the renderer can cull the light.', 'Mantenha curta para o renderer poder descartar a luz.') },
            { name: 'offset', type: '[number, number, number]', default: '[0, 1, 0]', description: t('Position relative to the object.', 'Posição relativa ao objeto.') },
            { name: 'shadows', type: 'boolean', default: 'false', description: t('Cast shadows from this light.', 'Projeta sombras desta luz.') },
          ],
        },
        {
          type: 'p',
          text: t(
            '`attachLight` returns a `PointLight` that follows something: a torch, a muzzle flash, a power core. Point lights are the expensive kind: a handful is fine, twenty is not.',
            '`attachLight` devolve uma `PointLight` que segue algo: uma tocha, o clarão de um tiro, um núcleo de energia. Luzes pontuais são as caras: um punhado está bem, vinte não.',
          ),
        },
        {
          type: 'props',
          title: t('lights.blobShadow(scene, target, options)', 'lights.blobShadow(scene, target, options)'),
          rows: [
            { name: 'radius', type: 'number', default: '0.6', description: t('Size of the round shadow.', 'Tamanho da sombra redonda.') },
            { name: 'opacity', type: 'number', default: '0.35', description: t('Shadow opacity at ground level.', 'Opacidade da sombra ao nível do chão.') },
            { name: 'y', type: 'number', default: '0.01', description: t('Height above the ground plane, to avoid z-fighting.', 'Altura acima do plano do chão, para evitar z-fighting.') },
            { name: 'fadeHeight', type: 'number', default: '6', description: t('Height at which the shadow has faded out.', 'Altura em que a sombra some por completo.') },
          ],
        },
        {
          type: 'p',
          text: t(
            'It returns `{ mesh, update, dispose }`. Call `update(groundY = 0)` every frame: the shadow shrinks and fades as the target rises. It lives in the scene, not under the character, so it does not inherit its spin. `dispose()` removes it. It reads better than a shadow map for anything moving fast.',
            'Ele devolve `{ mesh, update, dispose }`. Chame `update(groundY = 0)` a cada quadro: a sombra encolhe e desbota conforme o alvo sobe. Ela vive na cena, não sob o personagem, então não herda o giro dele. `dispose()` a remove. Ela lê melhor que um shadow map para qualquer coisa que se mova rápido.',
          ),
        },
        {
          type: 'callout',
          kind: 'warning',
          text: t(
            '`blobShadow` with `fadeHeight: 0` gives a `NaN` opacity (the height ratio becomes 0 / 0 when the target is at ground level).',
            '`blobShadow` com `fadeHeight: 0` gera opacidade `NaN` (a razão de altura vira 0 / 0 quando o alvo está no chão).',
          ),
        },
      ],
    },
  ],
}

export default page
