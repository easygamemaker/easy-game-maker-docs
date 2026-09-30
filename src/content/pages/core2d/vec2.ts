import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/math/vec2',
  title: t('Vec2', 'Vec2'),
  description: t(
    'A small mutable 2D vector with immutable static helpers for add, subtract, scale, normalize, distance, dot and lerp.',
    'Um pequeno vetor 2D mutável com auxiliares estáticos imutáveis para somar, subtrair, escalar, normalizar, distância, produto escalar e lerp.',
  ),
  source: 'src/engine/core/math/Vec2.ts',
  related: ['/math/bounds-rect', '/math/mat3', '/camera', '/physics/body'],
  sections: [
    {
      id: 'shape',
      title: t('Instance and static API', 'API de instância e estática'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`new Vec2(x = 0, y = 0)` holds two public fields. The math lives in **static** functions that never modify their arguments and return a new `Vec2` (or a number), which fits the immutable style used across the engine. The instance only has `clone()` and `set()`.',
            '`new Vec2(x = 0, y = 0)` guarda dois campos públicos. A matemática fica em funções **estáticas** que nunca modificam seus argumentos e retornam um novo `Vec2` (ou um número), o que combina com o estilo imutável usado na engine. A instância só tem `clone()` e `set()`.',
          ),
        },
        {
          type: 'props',
          rows: [
            { name: 'x, y', type: 'number', default: '0', description: t('Public, mutable components.', 'Componentes públicos e mutáveis.') },
            { name: 'clone()', type: 'Vec2', description: t('A copy.', 'Uma cópia.') },
            { name: 'set(x, y)', type: 'this', description: t('Overwrites both components in place and returns the same vector.', 'Sobrescreve os dois componentes no lugar e retorna o mesmo vetor.') },
            { name: 'Vec2.add(a, b)', type: 'Vec2', description: t('`a + b`.', '`a + b`.') },
            { name: 'Vec2.sub(a, b)', type: 'Vec2', description: t('`a - b`.', '`a - b`.') },
            { name: 'Vec2.scale(a, s)', type: 'Vec2', description: t('`a * s` for a number `s`.', '`a * s` para um número `s`.') },
            { name: 'Vec2.magnitude(a)', type: 'number', description: t('Length.', 'Comprimento.') },
            { name: 'Vec2.normalize(a)', type: 'Vec2', description: t('Unit vector, or `(0, 0)` when the length is 0.', 'Vetor unitário, ou `(0, 0)` quando o comprimento é 0.') },
            { name: 'Vec2.distance(a, b)', type: 'number', description: t('Distance between two points.', 'Distância entre dois pontos.') },
            { name: 'Vec2.dot(a, b)', type: 'number', description: t('Dot product.', 'Produto escalar.') },
            { name: 'Vec2.lerp(a, b, t)', type: 'Vec2', description: t('Linear interpolation; `t` is not clamped.', 'Interpolação linear; `t` não é limitado.') },
            { name: 'Vec2.ZERO, Vec2.ONE', type: 'Vec2', readonly: true, description: t('Shared constants `(0, 0)` and `(1, 1)`.', 'Constantes compartilhadas `(0, 0)` e `(1, 1)`.') },
          ],
        },
        {
          type: 'callout',
          kind: 'warning',
          title: t('Do not mutate ZERO and ONE', 'Não mude ZERO e ONE'),
          text: t(
            '`Vec2.ZERO` and `Vec2.ONE` are single shared instances. The field is `readonly` but the components are not, so `Vec2.ZERO.x = 5` would corrupt every user. Call `.clone()` before you edit one.',
            '`Vec2.ZERO` e `Vec2.ONE` são instâncias únicas e compartilhadas. O campo é `readonly`, mas os componentes não, então `Vec2.ZERO.x = 5` corromperia todos os usuários. Chame `.clone()` antes de editar um deles.',
          ),
        },
        {
          type: 'p',
          text: t(
            'Display objects do not use `Vec2` for their position (they have plain `x` and `y` numbers); it is a helper for your own math.',
            'Objetos de exibição não usam `Vec2` para a posição (eles têm `x` e `y` numéricos simples); é um auxiliar para a sua própria matemática.',
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
          filename: 'src/chase.ts',
          check: 'compile',
          code: `import { CircleShape, Scene, Vec2 } from 'easy-game-maker'

export class Chase extends Scene {
  private enemy!: CircleShape
  private target = new Vec2(300, 400)

  onCreate(): void {
    this.enemy = new CircleShape({ x: 40, y: 40, radius: 14, fill: '#ef476f' })
    this.add(this.enemy)
  }

  onUpdate(dt: number): void {
    const pos = new Vec2(this.enemy.x, this.enemy.y)
    if (Vec2.distance(pos, this.target) < 2) return

    const dir = Vec2.normalize(Vec2.sub(this.target, pos))
    const next = Vec2.add(pos, Vec2.scale(dir, 120 * dt))
    this.enemy.x = next.x
    this.enemy.y = next.y
  }
}`,
        },
      ],
    },
  ],
}

export default page
