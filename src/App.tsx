import React, { useState } from 'react';
import { ScreenId } from './types';
import { TopNav } from './components/TopNav';
import { DashboardScreen } from './components/DashboardScreen';
import { StorefrontScreen } from './components/StorefrontScreen';
import { FeedScreen } from './components/FeedScreen';
import { TaskBoardScreen } from './components/TaskBoardScreen';
import { HtmlImporterScreen } from './components/HtmlImporterScreen';
import { Sparkles, Code2, Layers, Check, X } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId | 'custom'>('dashboard');
  const [customScreen, setCustomScreen] = useState<{ html: string; title: string } | null>(null);
  const [showQuickImportModal, setShowQuickImportModal] = useState(false);
  const [quickHtmlInput, setQuickHtmlInput] = useState('');
  const [quickTitle, setQuickTitle] = useState('');
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);

  const handleApplyCustomScreen = (html: string, title: string) => {
    setCustomScreen({ html, title });
    setCurrentScreen('custom');
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickHtmlInput.trim()) return;
    setCustomScreen({
      html: quickHtmlInput,
      title: quickTitle.trim() || 'Custom Imported Screen',
    });
    setCurrentScreen('custom');
    setShowQuickImportModal(false);
    setQuickHtmlInput('');
    setQuickTitle('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-slate-200">
      {/* Top Bar Contract (3 Zones, strictly one line, single brand element, 4-5 text links, 1 action) */}
      <TopNav
        currentScreen={currentScreen === 'custom' ? 'importer' : currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
        onOpenImporterModal={() => setShowQuickImportModal(true)}
      />

      {/* Helpful Welcome & Quick Context Callout */}
      {showWelcomeBanner && (
        <div className="bg-slate-900 text-slate-100 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                <strong>Multi-Screen Architecture Active:</strong> Explore the production screens below (Dashboard, Storefront, Feed, Tasks), or paste any HTML mockup to hotlink images and render your exact designs.
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => setCurrentScreen('importer')}
                className="underline hover:text-white transition-colors"
              >
                Open HTML Importer
              </button>
              <button
                onClick={() => setShowWelcomeBanner(false)}
                className="text-slate-400 hover:text-slate-200 p-0.5"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Screen Tab Bar when a custom screen has been loaded */}
      {customScreen && (
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Active View:</span>
              <span className="font-semibold text-slate-900">{customScreen.title}</span>
              <span className="text-slate-400">·</span>
              <button
                onClick={() => setCurrentScreen('importer')}
                className="text-slate-600 hover:text-slate-900 underline"
              >
                Edit in HTML Importer
              </button>
            </div>
            {currentScreen !== 'custom' && (
              <button
                onClick={() => setCurrentScreen('custom')}
                className="text-xs font-semibold text-slate-900 hover:text-indigo-600 flex items-center gap-1"
              >
                <span>Switch back to {customScreen.title}</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentScreen === 'dashboard' && <DashboardScreen />}
        {currentScreen === 'storefront' && <StorefrontScreen />}
        {currentScreen === 'feed' && <FeedScreen />}
        {currentScreen === 'tasks' && <TaskBoardScreen />}
        {currentScreen === 'importer' && (
          <HtmlImporterScreen onApplyCustomScreen={handleApplyCustomScreen} />
        )}
        {currentScreen === 'custom' && customScreen && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {customScreen.title}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Rendered dynamically from your custom imported HTML markup.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentScreen('importer')}
                  className="px-3.5 py-1.5 text-xs font-medium border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Edit Markup
                </button>
                <button
                  onClick={() => setCurrentScreen('dashboard')}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>

            <div
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs overflow-hidden"
              dangerouslySetInnerHTML={{ __html: customScreen.html }}
            />
          </div>
        )}
      </main>

      {/* Quiet, Human-Crafted Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">Screen Studio</span>
            <span aria-hidden="true">·</span>
            <span>Modular UI Systems & Hotlinked Asset Engine</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="hover:text-slate-900 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentScreen('storefront')}
              className="hover:text-slate-900 transition-colors"
            >
              Storefront
            </button>
            <button
              onClick={() => setCurrentScreen('feed')}
              className="hover:text-slate-900 transition-colors"
            >
              Feed
            </button>
            <button
              onClick={() => setCurrentScreen('tasks')}
              className="hover:text-slate-900 transition-colors"
            >
              Tasks
            </button>
            <button
              onClick={() => setCurrentScreen('importer')}
              className="hover:text-slate-900 transition-colors"
            >
              HTML Importer
            </button>
          </div>
        </div>
      </footer>

      {/* Quick HTML Importer Modal */}
      {showQuickImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-slate-600" />
                <h3 className="text-base font-bold text-slate-900">Import Custom HTML Screen</h3>
              </div>
              <button
                onClick={() => setShowQuickImportModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Screen Name / Title</label>
                <input
                  type="text"
                  placeholder="e.g. My App Screen"
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Paste HTML Markup (with <code className="font-mono text-[11px]">&lt;img src="..."&gt;</code> tags)
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="<div class='bg-white p-6 rounded-xl'>
  <h2>Screen Title</h2>
  <img src='https://...' alt='Hotlinked Asset' />
</div>"
                  value={quickHtmlInput}
                  onChange={(e) => setQuickHtmlInput(e.target.value)}
                  className="w-full p-3 font-mono text-[11px] bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400 leading-relaxed resize-none"
                  spellCheck={false}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowQuickImportModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 shadow-xs"
                >
                  Render & Load Screen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
