import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { ApiSection, Callout } from '@/components/docs/ApiSection'
import { useLang } from '@/context/LangContext'
import { Badge } from '@/components/ui/Badge'

const platforms = [
  { name: 'Web', cmd: 'egm build web', output_en: 'dist/web, a Vite production bundle', output_pt: 'dist/web, um bundle de produção Vite', icon: '🌐', badge: null },
  { name: 'iOS', cmd: 'egm build ios', output_en: 'Xcode project with a WebView shell', output_pt: 'Projeto Xcode com uma shell WebView', icon: '🍎', badge: null },
  { name: 'Android', cmd: 'egm build android', output_en: 'Gradle/Kotlin project with a WebView shell', output_pt: 'Projeto Gradle/Kotlin com uma shell WebView', icon: '🤖', badge: null },
  { name: 'Desktop (macOS)', cmd: 'egm build desktop macos', output_en: 'Swift/WKWebView application and, when available, a DMG', output_pt: 'Aplicativo Swift/WKWebView e, quando disponível, um DMG', icon: '🖥️', badge: null },
  { name: 'Desktop (Windows)', cmd: 'egm build desktop windows', output_en: 'Tauri project for Windows packaging', output_pt: 'Projeto Tauri para empacotamento Windows', icon: '🪟', badge: null },
  { name: 'Desktop (Linux)', cmd: 'egm build desktop linux', output_en: 'Tauri project for Linux packaging', output_pt: 'Projeto Tauri para empacotamento Linux', icon: '🐧', badge: null },
  { name: 'Tizen (Samsung TV)', cmd: 'egm build tizen', output_en: 'Tizen project; Tizen Studio packages the .wgt', output_pt: 'Projeto Tizen; o Tizen Studio gera o .wgt', icon: '📺', badge: 'NEW' },
  { name: 'WebOS (LG TV)', cmd: 'egm build webos', output_en: '.ipk package for LG Smart TV', output_pt: 'Pacote .ipk para LG Smart TV', icon: '📺', badge: 'NEW' },
  { name: 'Android TV', cmd: 'egm build androidtv', output_en: 'Gradle project optimized for TV input', output_pt: 'Projeto Gradle otimizado para entrada de TV', icon: '📺', badge: 'NEW' },
  { name: 'tvOS', cmd: 'egm build tvos', output_en: 'Xcode project for Apple TV', output_pt: 'Projeto Xcode para Apple TV', icon: '📺', badge: 'NEW' },
  { name: 'Xbox', cmd: 'egm build xbox', output_en: 'PWA project; Windows SDK creates the MSIX package', output_pt: 'Projeto PWA; o Windows SDK gera o pacote MSIX', icon: '🎮', badge: 'NEW' },
  { name: 'PlayStation', cmd: 'egm build playstation', output_en: 'PlayStation project files; Sony SDK steps remain manual', output_pt: 'Arquivos de projeto PlayStation; etapas do SDK Sony continuam manuais', icon: '🎮', badge: 'NEW' },
]

const CONFIG_EXAMPLE = `// egm.config.ts
import { defineConfig } from 'easy-game-maker'

export default defineConfig({
  app: {
    name: 'Awesome Game',
    version: '1.0.0',
    bundleId: 'com.example.awesomegame',
    icon: 'public/icon.png',
  },
  display: {
    width: 1280,
    height: 720,
    backgroundColor: '#0a0a0f',
  },
})`

export function BuildPage() {
  const { lang } = useLang()

  return (
    <DocLayout>
      <PageHeader
        title={lang === 'en' ? 'Build Targets' : 'Plataformas de Build'}
        badge="CLI"
        description={
          lang === 'en'
            ? '10+ build targets from a single codebase. Generate web bundles and native projects for desktop, Smart TVs, and consoles.'
            : 'Mais de 10 destinos de build a partir de uma única base de código. Gere bundles web e projetos nativos para desktop, Smart TVs e consoles.'
        }
      />

      <div className="space-y-10">
        {/* Platform image */}
        <div className="rounded-2xl overflow-hidden border border-[#1e1e2a] bg-[#111118]">
          <img src="/images/platforms.webp" alt="Platforms" className="w-full h-40 object-cover opacity-80"
            onError={e => { (e.target as HTMLImageElement).style.display='none' }} />
        </div>

        <ApiSection title={lang === 'en' ? 'Configuration' : 'Configuração'}>
          <CodeBlock code={CONFIG_EXAMPLE} filename="egm.config.ts" />
        </ApiSection>

        <ApiSection title={lang === 'en' ? 'All platforms' : 'Todas as plataformas'}>
          <div className="space-y-3">
            {platforms.map(p => (
              <div key={p.name} className="flex items-start gap-4 bg-[#111118] border border-[#1e1e2a] rounded-xl p-4">
                <span className="text-2xl flex-shrink-0">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#f0f0f8] text-sm font-semibold">{p.name}</span>
                    {p.badge && <Badge variant="green">{p.badge}</Badge>}
                  </div>
                  <code className="text-[#8b85ff] font-mono text-xs bg-[#6c63ff11] px-2 py-0.5 rounded block w-fit mb-1">
                    {p.cmd}
                  </code>
                  <p className="text-[#55556a] text-xs">
                    {lang === 'en' ? p.output_en : p.output_pt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ApiSection>

        <Callout type="warning">
          {lang === 'en'
            ? 'Native packages require each platform SDK: Tizen Studio, webOS CLI, Android Studio, Xcode, Windows SDK, or PlayStation Partners tools. TV and console targets are experimental.'
            : 'Pacotes nativos exigem o SDK de cada plataforma: Tizen Studio, CLI webOS, Android Studio, Xcode, Windows SDK ou ferramentas PlayStation Partners. Os destinos de TV e console são experimentais.'}
        </Callout>
      </div>
    </DocLayout>
  )
}
