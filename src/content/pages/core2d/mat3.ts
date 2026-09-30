import { t, type DocPage } from '../../types'

const page: DocPage = {
  slug: '/math/mat3',
  title: t('Mat3', 'Mat3'),
  description: t(
    'Static helpers for 3x3 matrices stored as column-major Float32Array(9), used for 2D transforms.',
    'Auxiliares estáticos para matrizes 3x3 armazenadas como Float32Array(9) em ordem de colunas, usadas em transformações 2D.',
  ),
  source: 'src/engine/core/math/Mat3.ts',
  related: ['/display/display-object', '/core/renderer', '/math/vec2'],
  sections: [
    {
      id: 'layout',
      title: t('Layout', 'Layout'),
      blocks: [
        {
          type: 'p',
          text: t(
            '`Mat3` is a class of static functions; there are no instances. A matrix is a plain `Float32Array` of 9 numbers in column-major order, index `column * 3 + row`. A 2D point is treated as `(x, y, 1)`, so the translation lives in `m[6]` and `m[7]`.',
            '`Mat3` é uma classe de funções estáticas; não há instâncias. Uma matriz é um `Float32Array` simples de 9 números em ordem de colunas, índice `coluna * 3 + linha`. Um ponto 2D é tratado como `(x, y, 1)`, então a translação fica em `m[6]` e `m[7]`.',
          ),
        },
        {
          type: 'code',
          lang: 'text',
          check: 'skip',
          code: `| m[0]  m[3]  m[6] |     | a  c  tx |
| m[1]  m[4]  m[7] |  =  | b  d  ty |
| m[2]  m[5]  m[8] |     | 0  0  1  |`,
        },
      ],
    },
    {
      id: 'api',
      title: t('Functions', 'Funções'),
      blocks: [
        {
          type: 'props',
          rows: [
            { name: 'Mat3.identity()', type: 'Float32Array', description: t('The identity matrix.', 'A matriz identidade.') },
            { name: 'Mat3.translation(tx, ty)', type: 'Float32Array', description: t('A translation.', 'Uma translação.') },
            { name: 'Mat3.rotation(r)', type: 'Float32Array', description: t('A rotation by `r` radians (clockwise on screen, since `y` points down).', 'Uma rotação de `r` radianos (horária na tela, pois `y` aponta para baixo).') },
            { name: 'Mat3.scaling(sx, sy)', type: 'Float32Array', description: t('A scale.', 'Uma escala.') },
            { name: 'Mat3.TRS(x, y, r, sx, sy)', type: 'Float32Array', description: t('Translation * rotation * scale in one matrix. `DisplayObject.localTransform` is this.', 'Translação * rotação * escala em uma matriz. `DisplayObject.localTransform` é isto.') },
            { name: 'Mat3.multiply(a, b)', type: 'Float32Array', description: t('Returns `a * b`. Applying the result transforms by `b` first, then `a`, so `parent * child` gives a child in the parent space.', 'Retorna `a * b`. Aplicar o resultado transforma primeiro por `b`, depois por `a`, então `pai * filho` coloca o filho no espaço do pai.') },
            { name: 'Mat3.transformPoint(m, x, y)', type: '[number, number]', description: t('Transforms a point and returns `[x, y]`.', 'Transforma um ponto e retorna `[x, y]`.') },
            { name: 'Mat3.projection(width, height)', type: 'Float32Array', description: t('Orthographic matrix that maps screen pixels (origin top-left, `y` down) to clip space. The renderer uses it.', 'Matriz ortográfica que mapeia pixels de tela (origem no canto superior esquerdo, `y` para baixo) ao espaço de clip. O renderer a usa.') },
          ],
        },
        {
          type: 'callout',
          kind: 'info',
          title: t('Every call allocates', 'Toda chamada aloca'),
          text: t(
            'Each function returns a fresh array. That is fine for occasional use, but avoid calling them for thousands of objects per frame inside your own code.',
            'Cada função retorna um array novo. Isso é bom para uso ocasional, mas evite chamá-las para milhares de objetos por quadro no seu próprio código.',
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
          filename: 'src/world-point.ts',
          check: 'compile',
          code: `import { DisplayObject, Mat3 } from 'easy-game-maker'

/** Where a point given in the local space of \`obj\` ends up in scene coordinates. */
export function localToWorld(obj: DisplayObject, lx: number, ly: number): [number, number] {
  return Mat3.transformPoint(obj.worldTransform, lx, ly)
}

/** Same thing, building the matrix by hand. */
export function rotateAround(cx: number, cy: number, radians: number, x: number, y: number): [number, number] {
  const m = Mat3.multiply(Mat3.translation(cx, cy), Mat3.multiply(Mat3.rotation(radians), Mat3.translation(-cx, -cy)))
  return Mat3.transformPoint(m, x, y)
}`,
        },
      ],
    },
  ],
}

export default page
