import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Globe, Smartphone, Monitor, Tv, Gamepad2, Box, Cpu } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { Button } from '@/components/ui/Button'

const features = [
  { icon: Zap, en: 'WebGL2 Renderer', pt: 'Renderer WebGL2', desc_en: 'Sprite batching, custom shaders, 60fps', desc_pt: 'Sprite batching, shaders custom, 60fps', color: '#fbbf24' },
  { icon: Box, en: 'Physics (planck.js)', pt: 'Física (planck.js)', desc_en: 'Rigid bodies, joints, sensors, debug draw', desc_pt: 'Corpos rígidos, juntas, sensores', color: '#34d399' },
  { icon: Globe, en: 'Multiplayer', pt: 'Multiplayer', desc_en: 'WebSocket rooms and real-time networking', desc_pt: 'Salas WebSocket e rede em tempo real', color: '#60a5fa' },
  { icon: Cpu, en: 'Shader System', pt: 'Sistema de Shaders', desc_en: 'GLSL kernel system, built-in effects', desc_pt: 'Sistema GLSL kernel, efeitos nativos', color: '#a78bfa' },
  { icon: Gamepad2, en: 'Gamepad Support', pt: 'Suporte a Gamepad', desc_en: 'Xbox, PlayStation, Switch, TV remotes', desc_pt: 'Xbox, PlayStation, Switch, controles TV', color: '#f87171' },
  { icon: Smartphone, en: 'Mobile Ready', pt: 'Pronto para Mobile', desc_en: 'AdMob, IAP, Apple Pay, Google Play', desc_pt: 'AdMob, IAP, Apple Pay, Google Play', color: '#fb923c' },
]

const platforms = [
  { icon: Globe, label: 'Web', color: '#60a5fa' },
  { icon: Smartphone, label: 'iOS', color: '#a78bfa' },
  { icon: Smartphone, label: 'Android', color: '#34d399' },
  { icon: Monitor, label: 'Desktop', color: '#fbbf24' },
  { icon: Tv, label: 'Smart TV', color: '#fb923c' },
  { icon: Gamepad2, label: 'Console', color: '#f87171' },
]

const quickLinks = [
  { slug: '/installation', en: 'Installation', pt: 'Instalação', icon: '📦' },
  { slug: '/first-game', en: 'Your First Game', pt: 'Seu Primeiro Jogo', icon: '🎮' },
  { slug: '/workflow', en: 'TypeScript → Build', pt: 'TypeScript → Build', icon: '🔄' },
  { slug: '/core/app', en: 'App Class', pt: 'Classe App', icon: '⚙️' },
  { slug: '/cli/simulate', en: 'Simulator', pt: 'Simulador', icon: '📱' },
  { slug: '/cli/editor', en: 'Visual Editor', pt: 'Editor Visual', icon: '🖊️' },
]

export function HomePage() {
  const { lang } = useLang()

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[#1e1e2a]">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6c63ff] opacity-[0.07] blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#6c63ff11] border border-[#6c63ff33] rounded-full px-3 py-1 text-xs text-[#8b85ff] font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6c63ff] animate-pulse" />
            {lang === 'en' ? 'v0.1.0 — Early Access' : 'v0.1.0 — Acesso Antecipado'}
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-[#f0f0f8] mb-4 tracking-tight leading-tight">
            Easy Game Maker
          </h1>
          <p className="text-lg text-[#8888aa] mb-2 font-mono">
            TypeScript <span className="text-[#6c63ff]">→</span> EGM{' '}
            <span className="text-[#6c63ff]">→</span>{' '}
            {lang === 'en' ? 'Build Anywhere' : 'Publique em Qualquer Lugar'}
          </p>
          <p className="text-[#55556a] text-sm mb-10 max-w-lg mx-auto leading-relaxed">
            {lang === 'en'
              ? 'A TypeScript-first 2D game engine with WebGL2 rendering, physics, multiplayer, and one-click builds for 10+ platforms.'
              : 'Engine 2D TypeScript-first com renderer WebGL2, física, multiplayer e builds com um clique para 10+ plataformas.'}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/installation">
              <Button variant="primary" size="lg">
                {lang === 'en' ? 'Get Started' : 'Começar'}
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/first-game">
              <Button variant="outline" size="lg">
                {lang === 'en' ? 'View Examples' : 'Ver Exemplos'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Architecture diagram */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#55556a] mb-2 font-semibold">
            {lang === 'en' ? 'How it works' : 'Como funciona'}
          </p>
          <h2 className="text-2xl font-bold text-[#f0f0f8]">
            {lang === 'en' ? 'Write once. Ship everywhere.' : 'Escreva uma vez. Publique em qualquer lugar.'}
          </h2>
        </div>

        {/* Architecture flow */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { label: 'TypeScript', sub: lang === 'en' ? 'Your game code' : 'Seu código', color: '#60a5fa', icon: '{ }' },
            { label: 'EGM Engine', sub: lang === 'en' ? 'WebGL2 + Physics' : 'WebGL2 + Física', color: '#6c63ff', icon: '⚡' },
            { label: 'egm build', sub: lang === 'en' ? '1 command' : '1 comando', color: '#34d399', icon: '▶' },
            { label: '10+ Platforms', sub: lang === 'en' ? 'Web, iOS, Android...' : 'Web, iOS, Android...', color: '#fbbf24', icon: '🌍' },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mb-2 mx-auto"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}33` }}
                >
                  <span style={{ color: step.color }}>{step.icon}</span>
                </div>
                <p className="text-[#f0f0f8] text-sm font-semibold">{step.label}</p>
                <p className="text-[#55556a] text-xs">{step.sub}</p>
              </div>
              {i < 3 && (
                <ArrowRight size={20} className="text-[#1e1e2a] flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Platforms row */}
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          {platforms.map(p => (
            <div
              key={p.label}
              className="flex items-center gap-1.5 bg-[#111118] border border-[#1e1e2a] rounded-lg px-3 py-1.5 text-xs"
            >
              <p.icon size={12} style={{ color: p.color }} />
              <span className="text-[#8888aa]">{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero image */}
      <div className="max-w-4xl mx-auto px-6 pb-4">
        <div className="relative rounded-2xl overflow-hidden border border-[#1e1e2a] bg-[#111118]">
          <img
            src="/images/hero.webp"
            alt="EGM Engine"
            className="w-full h-48 sm:h-64 object-cover opacity-80"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        </div>
      </div>

      {/* Features grid */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#f0f0f8]">
            {lang === 'en' ? 'Everything you need' : 'Tudo que você precisa'}
          </h2>
          <p className="text-[#8888aa] text-sm mt-2">
            {lang === 'en' ? 'Batteries included — no extra setup required' : 'Baterias inclusas — sem configuração extra'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div
              key={f.en}
              className="group bg-[#111118] border border-[#1e1e2a] rounded-xl p-5 hover:border-[#2a2a3a] transition-all duration-200 hover:translate-y-[-2px]"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}22` }}
              >
                <f.icon size={18} style={{ color: f.color }} />
              </div>
              <p className="text-[#f0f0f8] text-sm font-semibold mb-1">
                {lang === 'en' ? f.en : f.pt}
              </p>
              <p className="text-[#55556a] text-xs leading-relaxed">
                {lang === 'en' ? f.desc_en : f.desc_pt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick start */}
      <div className="max-w-4xl mx-auto px-6 pb-14">
        <div className="bg-[#111118] border border-[#1e1e2a] rounded-2xl p-6">
          <h2 className="text-lg font-bold text-[#f0f0f8] mb-4">
            {lang === 'en' ? 'Quick Start' : 'Início Rápido'}
          </h2>
          <div className="bg-[#0d0d14] rounded-xl border border-[#1e1e2a] p-4 mb-6 font-mono text-sm">
            <div className="text-[#55556a]"># {lang === 'en' ? 'Install EGM CLI' : 'Instalar EGM CLI'}</div>
            <div><span className="text-[#6c63ff]">npm</span><span className="text-[#8888aa]"> install -g easy-game-maker</span></div>
            <div className="mt-2 text-[#55556a]"># {lang === 'en' ? 'Create your game' : 'Criar seu jogo'}</div>
            <div><span className="text-[#6c63ff]">egm</span><span className="text-[#8888aa]"> new my-game</span></div>
            <div className="mt-2 text-[#55556a]"># {lang === 'en' ? 'Start simulator' : 'Iniciar simulador'}</div>
            <div><span className="text-[#6c63ff]">egm</span><span className="text-[#8888aa]"> simulate</span></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {quickLinks.map(l => (
              <Link
                key={l.slug}
                to={l.slug}
                className="flex items-center gap-2 p-3 rounded-lg bg-[#0a0a0f] border border-[#1e1e2a] hover:border-[#6c63ff44] hover:bg-[#6c63ff08] transition-all text-sm text-[#8888aa] hover:text-[#f0f0f8]"
              >
                <span>{l.icon}</span>
                <span className="truncate">{lang === 'en' ? l.en : l.pt}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
