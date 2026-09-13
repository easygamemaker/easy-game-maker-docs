import { Routes, Route } from 'react-router-dom'
import { LangProvider } from '@/context/LangContext'

import { HomePage } from '@/pages/HomePage'
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
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    <LangProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/installation" element={<InstallationPage />} />
        <Route path="/first-game" element={<InstallationPage />} />
        <Route path="/project-structure" element={<InstallationPage />} />
        <Route path="/workflow" element={<IntroductionPage />} />

        {/* Visual Editor */}
        <Route path="/visual-editor" element={<VisualEditorPage />} />
        <Route path="/core/visual-scene" element={<VisualScenePage />} />

        {/* Core */}
        <Route path="/core/app" element={<AppPage />} />
        <Route path="/core/scene" element={<ScenePage />} />
        <Route path="/core/assets" element={<AppPage />} />
        <Route path="/core/events" element={<AppPage />} />
        <Route path="/core/timer" element={<AppPage />} />
        <Route path="/core/platform" element={<AppPage />} />

        {/* Display */}
        <Route path="/display/*" element={<DisplayPage />} />

        {/* Math */}
        <Route path="/math/*" element={<AppPage />} />

        {/* Animation */}
        <Route path="/animation/*" element={<AnimationPage />} />

        {/* Camera */}
        <Route path="/camera" element={<CameraPage />} />

        {/* Physics */}
        <Route path="/physics/*" element={<PhysicsPage />} />

        {/* Input */}
        <Route path="/input/*" element={<InputPage />} />

        {/* Audio */}
        <Route path="/audio/*" element={<AppPage />} />

        {/* Network */}
        <Route path="/network/*" element={<NetworkPage />} />

        {/* Gameplay */}
        <Route path="/gameplay/*" element={<AppPage />} />

        {/* Shaders */}
        <Route path="/shaders/*" element={<AppPage />} />

        {/* Monetization */}
        <Route path="/monetization/*" element={<MonetizationPage />} />

        {/* Debug */}
        <Route path="/debug/*" element={<AppPage />} />

        {/* CLI */}
        <Route path="/cli/*" element={<CLIPage />} />
        <Route path="/cli/editor" element={<EditorPage />} />

        {/* Simulator */}
        <Route path="/simulator/*" element={<SimulatorPage />} />

        {/* Build */}
        <Route path="/build/*" element={<BuildPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LangProvider>
  )
}
