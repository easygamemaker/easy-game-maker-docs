import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { ApiSection } from '@/components/docs/ApiSection'
import { PropTable } from '@/components/docs/PropTable'
import { useLang } from '@/context/LangContext'

const VIEW_LOADER_TYPES = `// ViewObject — one object in view.json
interface ViewObject {
  id: string;           // unique, used by getById()
  type: string;         // 'RectShape' | 'CircleShape' | 'Text' | 'Sprite' | ...
  parent?: string | null; // id of parent Group, or null for root
  x?: number; y?: number;
  width?: number; height?: number;
  rotation?: number;
  scaleX?: number; scaleY?: number;
  anchorX?: number; anchorY?: number;
  alpha?: number; visible?: boolean; zIndex?: number;
  // RectShape / CircleShape
  fill?: string; stroke?: string; strokeWidth?: number;
  cornerRadius?: number; radius?: number;
  // Text
  text?: string; fontSize?: number; color?: string;
  fontFamily?: string; fontWeight?: string;
  // Sprite
  texture?: string; // URL to asset
  // AnimatedSprite
  frames?: string[]; fps?: number; loop?: boolean; autoPlay?: boolean;
  // LineShape
  x2?: number; y2?: number;
  // ParticleEmitter — full ParticleConfig fields
  emitRate?: number; maxParticles?: number; /* ... */
  // Optional physics body
  physics?: {
    type?: 'static' | 'dynamic' | 'kinematic';
    shape?: 'rect' | 'circle';
    density?: number; friction?: number; restitution?: number;
    isSensor?: boolean; fixedRotation?: boolean;
  };
}`

const GET_BY_ID = `// Access view objects from events.ts
import type { VisualScene, App } from 'easy-game-maker';
import { RectShape, Text } from 'easy-game-maker';

export default {
  onInit(scene: VisualScene, app: App) {
    // getById<T>(id) — finds object by its view.json id
    const player = scene.getById<RectShape>('player');
    const score  = scene.getById<Text>('scoreText');

    if (player) player.x = 180;
    if (score)  score.text = 'Score: 0';
  }
}`

const ADD_DYNAMIC = `// Dynamic objects: create in code, NOT in view.json
import { RectShape } from 'easy-game-maker';

export default {
  onInit(scene: VisualScene, app: App) {
    // Static objects come from view.json automatically
    const player = scene.getById<RectShape>('player')!;

    // Dynamic objects (bullets, particles, enemies) — create manually
    for (let i = 0; i < 20; i++) {
      const bullet = new RectShape({ x: 0, y: -50, width: 6, height: 12, fill: '#ffd700' });
      bullet.visible = false;
      scene.add(bullet);   // ← add to scene directly
    }
  }
}`

export function VisualScenePage() {
  const { lang } = useLang()
  const l = (en: string, pt: string) => lang === 'en' ? en : pt

  return (
    <DocLayout>
      <PageHeader
        title="VisualScene & ViewLoader"
        badge="NEW"
        badgeVariant="green"
        description={l(
          'VisualScene extends Scene and loads its display graph from a view.json file. ViewLoader instantiates display objects from the JSON definition.',
          'VisualScene estende Scene e carrega seu grafo de display de um arquivo view.json. ViewLoader instancia os objetos de display a partir da definição JSON.'
        )}
      />

      <div className="space-y-10">

        <ApiSection title="VisualScene">
          <PropTable
            title={l('Properties & Methods', 'Propriedades & Métodos')}
            props={[
              { name: 'sceneName', type: 'string', description_en: 'Name of the scene — used to resolve /views/{name}.view.json at runtime.', description_pt: 'Nome da scene — usado para resolver /views/{name}.view.json em runtime.' },
              { name: 'viewJson', type: 'ViewJson | null', description_en: 'The parsed view.json — accessible from events for advanced use.', description_pt: 'O view.json parseado — acessível dos events para uso avançado.' },
              { name: 'viewObjects', type: 'ReadonlyMap<string, DisplayObject>', description_en: 'All objects instantiated from view.json, keyed by their id.', description_pt: 'Todos os objetos instanciados do view.json, indexados pelo id.' },
              { name: 'getById<T>(id)', type: 'T | null', description_en: 'Inherited from Scene. Searches the scene graph by name (id). Returns null if not found — always check for null!', description_pt: 'Herdado de Scene. Busca o grafo de cena pelo nome (id). Retorna null se não encontrado — sempre verifique o null!' },
            ]}
          />

          <PropTable
            title="onCreate lifecycle"
            props={[
              { name: '1. fetch(viewUrl)', type: 'async', description_en: 'Fetches /views/{name}.view.json from public/. On failure, uses empty scene (no crash).', description_pt: 'Busca /views/{name}.view.json de public/. Em falha, usa scene vazia (sem crash).' },
              { name: '2. ViewLoader.build()', type: 'async', description_en: 'Creates all display objects, builds hierarchy (parent/child), applies physics bodies. Textures are loaded via fetch + uploadTexture for Sprite/AnimatedSprite.', description_pt: 'Cria todos os objetos de display, constrói hierarquia (pai/filho), aplica corpos de física. Texturas são carregadas via fetch + uploadTexture para Sprite/AnimatedSprite.' },
              { name: '3. eventsLoader()', type: 'async', description_en: 'Dynamically imports the events module (lazy import from import.meta.glob).', description_pt: 'Importa dinamicamente o módulo de events (lazy import do import.meta.glob).' },
              { name: '4. events.onInit()', type: 'async', description_en: 'Calls your onInit hook. Errors are caught and logged — they do NOT prevent the scene from becoming current.', description_pt: 'Chama seu hook onInit. Erros são capturados e logados — eles NÃO impedem a scene de se tornar ativa.' },
            ]}
          />
        </ApiSection>

        <ApiSection title={l('Accessing view objects', 'Acessando objetos da view')}>
          <CodeBlock code={GET_BY_ID} />
        </ApiSection>

        <ApiSection title={l('Adding dynamic objects', 'Adicionando objetos dinâmicos')}>
          <CodeBlock code={ADD_DYNAMIC} />
          <p className="text-[#8888aa] text-sm mt-3">
            {l(
              'Split responsibilities: view.json handles the static layout (backgrounds, HUD, player start position). events.ts creates dynamic objects (bullets, enemies, particles) and manages game logic.',
              'Divida responsabilidades: view.json gerencia o layout estático (fundos, HUD, posição inicial do player). events.ts cria objetos dinâmicos (balas, inimigos, partículas) e gerencia a lógica do jogo.'
            )}
          </p>
        </ApiSection>

        <ApiSection title="ViewObject (view.json schema)">
          <CodeBlock code={VIEW_LOADER_TYPES} />
        </ApiSection>

      </div>
    </DocLayout>
  )
}
