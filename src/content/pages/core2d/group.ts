import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/display/group',
  title: t('Group', 'Group'),
  description: t(
    'A container that holds child display objects, moves them together and hit-tests them.',
    'Um contêiner que guarda objetos de exibição filhos, move todos juntos e faz hit test neles.',
  ),
  source: 'src/engine/display/Group.ts',
  related: ['/display/display-object', '/core/scene', '/display/sprite'],
  sections: [
    {
      id: 'about',
      title: t('What a Group is', 'O que é um Group'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`Group` extends `DisplayObject` and owns a `children` array. Its transform (position, rotation, scale, alpha, visibility) applies to every child, so moving a group moves everything inside it. `Scene` is itself a `Group`.',
            '`Group` estende `DisplayObject` e possui um array `children`. Sua transformação (posição, rotação, escala, alpha, visibilidade) se aplica a todos os filhos, então mover um grupo move tudo o que está dentro dele. `Scene` é ela mesma um `Group`.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'children', type: 'DisplayObject[]', readonly: true, description: t('Children in insertion order.', 'Filhos em ordem de inserção.') },
            { name: 'add(...objects)', type: 'this', description: t('Adds one or more objects. An object that already has a parent is removed from it first, so an object never has two parents.', 'Adiciona um ou mais objetos. Um objeto que já tem pai é removido dele antes, então um objeto nunca tem dois pais.') },
            { name: 'remove(obj)', type: 'this', description: t('Removes a child and clears its `parent`. Does nothing if it is not a child.', 'Remove um filho e limpa seu `parent`. Não faz nada se não for filho.') },
            { name: 'removeAll()', type: 'this', description: t('Removes every child (without destroying them).', 'Remove todos os filhos (sem destruí-los).') },
            { name: 'hitTest(x, y)', type: 'DisplayObject | null', description: t('Returns the top-most visible leaf under the point (given in the local space of the group), or `null`.', 'Retorna a folha visível mais ao topo sob o ponto (dado no espaço local do grupo), ou `null`.') },
            { name: 'destroy()', type: 'void', description: t('Destroys every child, removes them, then removes the group listeners.', 'Destrói cada filho, remove-os e depois remove os listeners do grupo.') },
            { name: 'getBounds()', type: 'Bounds', description: t("Returns the group's own `x, y, width, height`. It does not measure the children.", 'Retorna o `x, y, width, height` do próprio grupo. Não mede os filhos.') },
          ],
        },
      ],
    },
    {
      id: 'hit',
      title: t('Hit testing', 'Hit testing'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`hitTest` walks children front to back: higher `zIndex` first, then the last added, and it skips invisible ones. Each child receives the point converted into its own local space (undoing its position, rotation and scale), so rotated and scaled objects are picked correctly. A nested `Group` recurses with that local point. A leaf is tested against its `getBounds()`, which already applies the anchor once.',
            '`hitTest` percorre os filhos da frente para trás: maior `zIndex` primeiro, depois o último adicionado, e ignora os invisíveis. Cada filho recebe o ponto convertido para o seu espaço local (desfazendo posição, rotação e escala), então objetos rotacionados e escalados são selecionados corretamente. Um `Group` aninhado recorre com esse ponto local. Uma folha é testada contra o seu `getBounds()`, que já aplica a âncora uma vez.',
          ),
        },
      ],
    },
    {
      id: 'example',
      title: t('Example', 'Exemplo'),
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          filename: 'src/hud-group.ts',
          check: 'compile',
          code: `import { Group, RectShape, Scene, Text } from 'easy-game-maker'

export class Level extends Scene {
  private hud = new Group()

  onCreate(): void {
    this.hud.x = 16
    this.hud.y = 16
    const lives = new Text({ text: 'Lives: 3', x: 4, y: 2, fontSize: 18 })
    lives.anchorX = lives.anchorY = 0
    this.hud.add(new RectShape({ x: 60, y: 14, width: 120, height: 28, fill: '#00000088' }), lives)
    this.add(this.hud)
  }

  onUpdate(dt: number): void {
    this.hud.alpha = 0.7 + 0.3 * Math.sin(performance.now() / 300)
    void dt
  }

  clearHud(): void {
    this.hud.removeAll()
  }
}`,
        },
      ],
    },
  ],
}

export default page
