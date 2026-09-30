import type { ComponentType } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LangProvider } from '@/context/LangContext'
import { GameTypeProvider } from '@/context/GameTypeContext'
import { SiteBackground } from '@/components/layout/SiteBackground'
import { getPage } from '@/content/registry'
import { ALL_ITEMS } from '@/data/navigation'
import { ContentPage, PlaceholderPage } from '@/pages/ContentPage'
import { ExamplesGallery } from '@/pages/examples/ExamplesGallery'
import { ExampleDetail } from '@/pages/examples/ExampleDetail'
import { getExample } from '@/data/examples'

import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

// Pages written before the content system. Each one is used only for the slugs it really documents; the content
// registry always wins, so migrating a page is just adding a file under content/pages and deleting its line here.
import { IntroductionPage } from '@/pages/docs/IntroductionPage'
import { InstallationPage } from '@/pages/docs/InstallationPage'
import { AppPage } from '@/pages/docs/AppPage'
import { ScenePage } from '@/pages/docs/ScenePage'
import { DisplayPage } from '@/pages/docs/DisplayPage'
import { AnimationPage } from '@/pages/docs/AnimationPage'
import { CameraPage } from '@/pages/docs/CameraPage'
import { PhysicsPage } from '@/pages/docs/PhysicsPage'
import { InputPage } from '@/pages/docs/InputPage'
import { NetworkPage } from '@/pages/docs/NetworkPage'
import { MonetizationPage } from '@/pages/docs/MonetizationPage'
import { EditorPage } from '@/pages/docs/EditorPage'
import { VisualEditorPage } from '@/pages/docs/VisualEditorPage'
import { VisualScenePage } from '@/pages/docs/VisualScenePage'
import { CLIPage } from '@/pages/docs/CLIPage'
import { SimulatorPage } from '@/pages/docs/SimulatorPage'
import { BuildPage } from '@/pages/docs/BuildPage'

const LEGACY: Record<string, ComponentType> = {
  '/introduction': IntroductionPage,
  '/installation': InstallationPage,
  '/core/app': AppPage,
  '/core/scene': ScenePage,
  '/camera': CameraPage,
  '/visual-editor': VisualEditorPage,
  '/core/visual-scene': VisualScenePage,
  '/cli/editor': EditorPage,
  ...Object.fromEntries(['new', 'simulate', 'build', 'test', 'e2e', 'go'].map((c) => [`/cli/${c}`, CLIPage])),
  ...Object.fromEntries(
    ['display-object', 'group', 'sprite', 'animated-sprite', 'rect-shape', 'circle-shape', 'line-shape', 'text', 'polygon-shape', 'particles'].map((p) => [`/display/${p}`, DisplayPage]),
  ),
  ...Object.fromEntries(['tween', 'easing', 'transitions'].map((p) => [`/animation/${p}`, AnimationPage])),
  ...Object.fromEntries(['world', 'body'].map((p) => [`/physics/${p}`, PhysicsPage])),
  ...Object.fromEntries(['keyboard-mouse', 'gamepad'].map((p) => [`/input/${p}`, InputPage])),
  ...Object.fromEntries(['manager', 'room'].map((p) => [`/network/${p}`, NetworkPage])),
  ...Object.fromEntries(['ads', 'iap'].map((p) => [`/monetization/${p}`, MonetizationPage])),
  ...Object.fromEntries(['overview', 'devtools', 'tunnel', 'egmgo'].map((p) => [`/simulator/${p}`, SimulatorPage])),
  ...Object.fromEntries(['web', 'mobile', 'desktop', 'tv', 'consoles'].map((p) => [`/build/${p}`, BuildPage])),
}

function PageResolver() {
  const { pathname } = useLocation()
  const slug = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  const page = getPage(slug)
  if (page) return <ContentPage page={page} />

  if (slug === '/examples') return <ExamplesGallery />
  const example = slug.startsWith('/examples/') ? getExample(slug.slice('/examples/'.length)) : undefined
  if (example) return <ExampleDetail example={example} />

  const Legacy = LEGACY[slug]
  if (Legacy) return <Legacy />

  if (ALL_ITEMS.some((i) => i.slug === slug)) return <PlaceholderPage slug={slug} />
  return <NotFoundPage />
}

export default function App() {
  return (
    <LangProvider>
      <GameTypeProvider>
        <SiteBackground />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageResolver />} />
        </Routes>
      </GameTypeProvider>
    </LangProvider>
  )
}
