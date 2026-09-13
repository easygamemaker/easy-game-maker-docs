import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { PropTable } from '@/components/docs/PropTable'
import { useLang } from '@/context/LangContext'

const SCAFFOLD = `# Create a new Visual Editor project
egm new my-game --visual

cd my-game
npm install
egm editor          # open visual editor (port 5174)
egm simulate        # run simulator (port 5173)`

const CONFIG = `// egm.config.ts
import { defineConfig } from 'easy-game-maker';

export default defineConfig({
  app: { name: 'My Game', version: '1.0.0', bundleId: 'com.example.mygame' },
  display: { width: 360, height: 640, orientation: 'portrait', backgroundColor: '#1a1a2e' },
  visualEditor: true,   // ← enables the Visual Editor workflow
  build: {
    ios: { deploymentTarget: '16.0' },
    android: { minSdkVersion: 26, targetSdkVersion: 34 },
  },
});`

const STRUCTURE = `my-game/
  egm.config.ts          ← visualEditor: true
  src/
    main.ts              ← auto-discovers scenes via import.meta.glob
    events/
      MenuScene.events.ts   ← game logic / behavior
      GameScene.events.ts
  public/
    views/
      MenuScene.view.json   ← visual layout (edited by the editor)
      GameScene.view.json
    assets/                ← sprites, sounds, etc.`

const MAIN_TS = `// src/main.ts — Visual Editor project pattern
import { App } from 'easy-game-maker';
import type { SceneEvents } from 'easy-game-maker';

const app = new App({ width: 360, height: 640, backgroundColor: '#1a1a2e' });
app.init();

// Auto-discover all events/*.events.ts files
// Vite resolves these at build time with full HMR support
const eventsModules = import.meta.glob('./events/*.events.ts');

for (const path in eventsModules) {
  // Derive scene name from file path: "MenuScene" from "./events/MenuScene.events.ts"
  const name = path.replace('./events/', '').replace('.events.ts', '');
  app.scenes.addVisual(name, eventsModules[path] as () => Promise<{ default: SceneEvents }>);
}

void app.goto('MenuScene', { params: { app } });
app.run();`

const VIEW_JSON = `// public/views/GameScene.view.json — visual layout
{
  "name": "GameScene",
  "version": 1,
  "width": 360,
  "height": 640,
  "objects": [
    {
      "id": "background",
      "type": "RectShape",
      "parent": null,
      "x": 0, "y": 0, "width": 360, "height": 640,
      "anchorX": 0, "anchorY": 0,
      "fill": "#1a1f3a",
      "alpha": 1, "visible": true, "zIndex": 0
    },
    {
      "id": "player",
      "type": "RectShape",
      "parent": null,
      "x": 180, "y": 580, "width": 70, "height": 14,
      "anchorX": 0.5, "anchorY": 0.5,
      "fill": "#4dabf7",
      "alpha": 1, "visible": true, "zIndex": 5
    },
    {
      "id": "scoreText",
      "type": "Text",
      "parent": null,
      "x": 14, "y": 22,
      "text": "Score: 0",
      "fontSize": 16, "color": "#ffffff", "fontFamily": "monospace",
      "anchorX": 0, "anchorY": 0.5,
      "alpha": 1, "visible": true, "zIndex": 10
    }
  ]
}`

const EVENTS_TS = `// src/events/GameScene.events.ts — game logic / behavior
import type { SceneEvents, VisualScene, App } from 'easy-game-maker';
import { RectShape, Text } from 'easy-game-maker';

// Module-level state (persists across hot reloads)
let player: RectShape | null = null;
let scoreText: Text | null = null;
let score = 0;

export default {
  onInit(scene: VisualScene, app: App) {
    // Access objects by their view.json id
    player    = scene.getById<RectShape>('player');
    scoreText = scene.getById<Text>('scoreText');

    score = 0;
    if (scoreText) scoreText.text = 'Score: 0';

    // Create dynamic objects (NOT in view.json — created in code)
    for (let i = 0; i < 10; i++) {
      const bullet = new RectShape({ x: 0, y: -50, width: 8, height: 8, fill: '#ffd700' });
      bullet.visible = false;
      scene.add(bullet);
    }
  },

  onUpdate(scene: VisualScene, app: App, dt: number) {
    if (!player) return;

    // Move player with arrow keys or touch
    const speed = 260 * dt;
    if (app.input.isKeyDown('ArrowLeft'))  player.x = Math.max(player.width / 2, player.x - speed);
    if (app.input.isKeyDown('ArrowRight')) player.x = Math.min(360 - player.width / 2, player.x + speed);

    // Update score display
    score++;
    if (scoreText && score % 60 === 0) scoreText.text = \`Score: \${score / 60 | 0}\`;
  },

  onResume(scene: VisualScene, app: App) {
    score = 0;
    if (scoreText) scoreText.text = 'Score: 0';
  },

  onDestroy(scene: VisualScene, app: App) {
    app.timers.cancelAll();
  },
} satisfies SceneEvents;`

const ADD_VISUAL = `// SceneManager.addVisual() — registers a VisualScene
app.scenes.addVisual(
  'GameScene',                         // scene name (matches view.json filename)
  () => import('./events/GameScene.events')  // events loader (lazy import)
);

// The engine automatically fetches /views/GameScene.view.json at runtime`

const OBJECT_TYPES = [
  { type: 'RectShape', desc_en: 'Rectangle with fill, stroke, cornerRadius', desc_pt: 'Retângulo com fill, stroke, cornerRadius' },
  { type: 'CircleShape', desc_en: 'Circle with fill and radius', desc_pt: 'Círculo com fill e radius' },
  { type: 'Text', desc_en: 'Text with fontSize, color, fontFamily, fontWeight', desc_pt: 'Texto com fontSize, color, fontFamily, fontWeight' },
  { type: 'Sprite', desc_en: 'Image sprite with texture path', desc_pt: 'Sprite de imagem com caminho de textura' },
  { type: 'AnimatedSprite', desc_en: 'Frame-by-frame animation with fps and loop', desc_pt: 'Animação quadro-a-quadro com fps e loop' },
  { type: 'Group', desc_en: 'Container for organizing child objects', desc_pt: 'Container para organizar objetos filhos' },
  { type: 'LineShape', desc_en: 'Line from (x,y) to (x2,y2)', desc_pt: 'Linha de (x,y) até (x2,y2)' },
  { type: 'ParticleEmitter', desc_en: 'CPU particle system with full config', desc_pt: 'Sistema de partículas CPU com configuração completa' },
]

export function VisualEditorPage() {
  const { lang } = useLang()
  const l = (en: string, pt: string) => lang === 'en' ? en : pt

  return (
    <DocLayout>
      <PageHeader
        title={l('Visual Editor', 'Editor Visual')}
        badge="VISUAL"
        badgeVariant="green"
        description={l(
          'Build games visually — edit layouts in the browser editor, write behavior in TypeScript. Two modes: Code-First (existing projects) and Visual Editor (new workflow).',
          'Construa jogos visualmente — edite layouts no editor browser, escreva comportamento em TypeScript. Dois modos: Code-First (projetos existentes) e Editor Visual (novo workflow).'
        )}
      />

      <div className="space-y-10">

        {/* Two modes */}
        <ApiSection title={l('Two Editor Modes', 'Dois Modos do Editor')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📝</span>
                <span className="text-[#f0f0f8] font-semibold text-sm">Code-First</span>
                <span className="text-xs bg-[#ff980022] text-[#ff9800] px-2 py-0.5 rounded">DEFAULT</span>
              </div>
              <p className="text-[#8888aa] text-xs leading-relaxed mb-3">
                {l(
                  'Existing projects without visualEditor: true. The editor opens in Code-Only mode — file tree, Monaco editor, and Execute button.',
                  'Projetos existentes sem visualEditor: true. O editor abre no modo Code-Only — árvore de arquivos, Monaco editor e botão Execute.'
                )}
              </p>
              <code className="text-[#8b85ff] text-xs">egm editor</code>
            </div>
            <div className="bg-[#111118] border border-[#4caf5030] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🎨</span>
                <span className="text-[#f0f0f8] font-semibold text-sm">Visual Editor</span>
                <span className="text-xs bg-[#4caf5022] text-[#4caf50] px-2 py-0.5 rounded">NEW</span>
              </div>
              <p className="text-[#8888aa] text-xs leading-relaxed mb-3">
                {l(
                  'Projects with visualEditor: true. Full visual editing — scene CRUD, object palette, inspector, undo/redo, zoom, and file CRUD.',
                  'Projetos com visualEditor: true. Edição visual completa — CRUD de scenes, paleta de objetos, inspector, desfazer/refazer, zoom e CRUD de arquivos.'
                )}
              </p>
              <code className="text-[#8b85ff] text-xs">egm new my-game --visual</code>
            </div>
          </div>
        </ApiSection>

        {/* Scaffold */}
        <ApiSection title={l('Scaffolding a Visual Project', 'Criando um Projeto Visual')}>
          <CodeBlock code={SCAFFOLD} lang="bash" />
          <Callout type="info">
            {l(
              'The --visual flag creates the views/ and events/ directories and wires main.ts with import.meta.glob for auto-discovery.',
              'O flag --visual cria os diretórios views/ e events/ e configura main.ts com import.meta.glob para auto-descoberta.'
            )}
          </Callout>
        </ApiSection>

        {/* Config */}
        <ApiSection title={l('Enable Visual Editor in Config', 'Habilitar Editor Visual no Config')}>
          <CodeBlock code={CONFIG} />
        </ApiSection>

        {/* Structure */}
        <ApiSection title={l('Project Structure', 'Estrutura do Projeto')}>
          <CodeBlock code={STRUCTURE} lang="bash" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="bg-[#111118] border border-[#1e1e2a] rounded-lg p-3">
              <p className="text-[#4caf50] text-xs font-mono mb-1">public/views/*.view.json</p>
              <p className="text-[#8888aa] text-xs">
                {l('Visual layout — fetched at runtime. Edited by the editor. Contains all display objects with their properties.', 'Layout visual — carregado em runtime. Editado pelo editor. Contém todos os objetos de display com suas propriedades.')}
              </p>
            </div>
            <div className="bg-[#111118] border border-[#1e1e2a] rounded-lg p-3">
              <p className="text-[#4caf50] text-xs font-mono mb-1">src/events/*.events.ts</p>
              <p className="text-[#8888aa] text-xs">
                {l('Game behavior — TypeScript, bundled by Vite. Access view objects via scene.getById().', 'Comportamento do jogo — TypeScript, empacotado pelo Vite. Acesse objetos via scene.getById().')}
              </p>
            </div>
          </div>
        </ApiSection>

        {/* main.ts */}
        <ApiSection title="main.ts">
          <CodeBlock code={MAIN_TS} />
        </ApiSection>

        {/* view.json */}
        <ApiSection title="view.json">
          <p className="text-[#8888aa] text-sm mb-4">
            {l(
              'The view.json file defines the static layout of a scene. It is loaded at runtime by VisualScene and edited visually by the editor.',
              'O arquivo view.json define o layout estático de uma scene. É carregado em runtime pelo VisualScene e editado visualmente pelo editor.'
            )}
          </p>
          <CodeBlock code={VIEW_JSON} lang="json" />

          <div className="mt-6">
            <p className="text-[#f0f0f8] text-sm font-semibold mb-3">
              {l('Supported Object Types', 'Tipos de Objetos Suportados')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OBJECT_TYPES.map(o => (
                <div key={o.type} className="flex items-start gap-2 bg-[#111118] border border-[#1e1e2a] rounded-lg p-3">
                  <code className="text-[#8b85ff] text-xs font-mono flex-shrink-0">{o.type}</code>
                  <span className="text-[#8888aa] text-xs">{lang === 'en' ? o.desc_en : o.desc_pt}</span>
                </div>
              ))}
            </div>
          </div>
        </ApiSection>

        {/* events.ts */}
        <ApiSection title="events.ts — SceneEvents">
          <CodeBlock code={EVENTS_TS} />
          <PropTable
            title="SceneEvents interface"
            props={[
              { name: 'onInit(scene, app)', type: 'function', description_en: 'Called once when the scene loads. Fetch objects with getById(), set up initial state.', description_pt: 'Chamado uma vez quando a scene carrega. Busque objetos com getById(), configure estado inicial.' },
              { name: 'onUpdate(scene, app, dt)', type: 'function', description_en: 'Called every frame. dt is elapsed seconds (e.g. 0.016 at 60fps).', description_pt: 'Chamado a cada frame. dt é segundos decorridos (ex: 0.016 a 60fps).' },
              { name: 'onResume(scene, app)', type: 'function', description_en: 'Called each time the scene becomes active (after navigation back).', description_pt: 'Chamado cada vez que a scene se torna ativa (após navegação de volta).' },
              { name: 'onDestroy(scene, app)', type: 'function', description_en: 'Called when the scene is destroyed. Cancel timers, clean up.', description_pt: 'Chamado quando a scene é destruída. Cancele timers, limpe recursos.' },
            ]}
          />
        </ApiSection>

        {/* addVisual */}
        <ApiSection title="app.scenes.addVisual()">
          <CodeBlock code={ADD_VISUAL} />
          <Callout type="tip">
            {l(
              'VisualScene automatically fetches /views/{name}.view.json at runtime. No bundling needed for view files — they are served statically from public/views/.',
              'VisualScene automaticamente busca /views/{name}.view.json em runtime. Não é necessário empacotamento para arquivos view — eles são servidos estaticamente de public/views/.'
            )}
          </Callout>
        </ApiSection>

        {/* Editor features */}
        <ApiSection title={l('Visual Editor Features', 'Funcionalidades do Editor Visual')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: '🎬', en: 'Scene Management', pt: 'Gerenciamento de Scenes', desc_en: 'Add, rename and delete scenes from the left panel. Each operation creates/renames/deletes the view.json and events.ts files.', desc_pt: 'Adicione, renomeie e exclua scenes no painel esquerdo. Cada operação cria/renomeia/exclui os arquivos view.json e events.ts.' },
              { icon: '⬜', en: 'Object Palette', pt: 'Paleta de Objetos', desc_en: 'Click + in the Objects panel to open the palette. Choose from RectShape, CircleShape, Text, Group, Sprite, AnimatedSprite, LineShape, ParticleEmitter.', desc_pt: 'Clique + no painel Objects para abrir a paleta. Escolha entre RectShape, CircleShape, Text, Group, Sprite, AnimatedSprite, LineShape, ParticleEmitter.' },
              { icon: '🔍', en: 'Inspector', pt: 'Inspector', desc_en: 'Click any object to inspect. Edit all properties — Transform, Appearance, Text, Animation, Particles. Changes are instantly reflected in the scene.', desc_pt: 'Clique em qualquer objeto para inspecionar. Edite todas as propriedades — Transform, Aparência, Texto, Animação, Partículas. Mudanças refletem imediatamente.' },
              { icon: '↩', en: 'Undo / Redo', pt: 'Desfazer / Refazer', desc_en: 'Ctrl+Z to undo, Ctrl+Shift+Z to redo. Captures drag operations, inspector edits, add/delete object operations (50-step stack).', desc_pt: 'Ctrl+Z para desfazer, Ctrl+Shift+Z para refazer. Captura operações de drag, edições de inspector, add/delete objetos (stack de 50 passos).' },
              { icon: '🔎', en: 'Viewport Zoom', pt: 'Zoom do Viewport', desc_en: 'Fit, 25%, 50%, 75%, 100%, 150%, 200% via toolbar buttons. Auto-fit applied when switching scenes.', desc_pt: 'Fit, 25%, 50%, 75%, 100%, 150%, 200% via botões da toolbar. Auto-fit aplicado ao trocar de scene.' },
              { icon: '📝', en: 'Events Tab', pt: 'Aba Events', desc_en: 'Click Events tab when a scene is selected to open the scene\'s events.ts file in Monaco editor. Ctrl+S saves and triggers HMR.', desc_pt: 'Clique na aba Events quando uma scene está selecionada para abrir o arquivo events.ts no Monaco editor. Ctrl+S salva e ativa HMR.' },
              { icon: '📂', en: 'File CRUD', pt: 'CRUD de Arquivos', desc_en: 'Right-click any file or folder for: Rename, New File Here, New Folder Here, Delete. Click + in Files header for new file/folder.', desc_pt: 'Clique direito em arquivo ou pasta: Renomear, Novo Arquivo Aqui, Nova Pasta Aqui, Excluir. Clique + no cabeçalho Files para novo arquivo/pasta.' },
              { icon: '🚀', en: 'Execute', pt: 'Execute', desc_en: 'Opens the full EGM Simulator in a new tab for testing. The simulator has device frames, QR code and EgmGO support.', desc_pt: 'Abre o simulador EGM completo em nova aba para testes. O simulador tem frames de dispositivos, QR code e suporte EgmGO.' },
            ].map(f => (
              <div key={f.en} className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">{f.icon}</span>
                  <div>
                    <p className="text-[#f0f0f8] text-sm font-semibold mb-1">{lang === 'en' ? f.en : f.pt}</p>
                    <p className="text-[#8888aa] text-xs leading-relaxed">{lang === 'en' ? f.desc_en : f.desc_pt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ApiSection>

        <Callout type="info">
          {l(
            'The view.json is saved to public/views/ when you drag objects, edit inspector properties, or add/delete objects. The scene reloads automatically via destroyScene() + go().',
            'O view.json é salvo em public/views/ quando você arrasta objetos, edita propriedades no inspector ou adiciona/exclui objetos. A scene recarrega automaticamente via destroyScene() + go().'
          )}
        </Callout>

      </div>
    </DocLayout>
  )
}
