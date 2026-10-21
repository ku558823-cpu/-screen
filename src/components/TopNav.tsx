import React from 'react';
import { ScreenId } from '../types';

interface TopNavProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenImporterModal: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenImporterModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectScreen('dashboard')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-slate-700 transition-colors text-left"
        >
          Screen Studio
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectScreen('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 ${
              currentScreen === 'dashboard'
                ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSelectScreen('storefront')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 ${
              currentScreen === 'storefront'
                ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Storefront
          </button>
          <button
            onClick={() => onSelectScreen('feed')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 ${
              currentScreen === 'feed'
                ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Media Feed
          </button>
          <button
            onClick={() => onSelectScreen('tasks')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 ${
              currentScreen === 'tasks'
                ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Task Board
          </button>
          <button
            onClick={() => onSelectScreen('importer')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 ${
              currentScreen === 'importer'
                ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            HTML Importer
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenImporterModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Import Custom HTML
          </button>
        </div>
      </div>

      {/* Mobile Screen Switcher Bar */}
      <div className="md:hidden flex items-center gap-2 px-4 py-2 border-t border-slate-100 overflow-x-auto scrollbar-none bg-slate-50">
        <button
          onClick={() => onSelectScreen('dashboard')}
          className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${currentScreen === 'dashboard' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onSelectScreen('storefront')}
          className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${currentScreen === 'storefront' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
        >
          Storefront
        </button>
        <button
          onClick={() => onSelectScreen('feed')}
          className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${currentScreen === 'feed' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
        >
          Media Feed
        </button>
        <button
          onClick={() => onSelectScreen('tasks')}
          className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${currentScreen === 'tasks' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
        >
          Tasks
        </button>
        <button
          onClick={() => onSelectScreen('importer')}
          className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${currentScreen === 'importer' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
        >
          HTML Importer
        </button>
      </div>
    </header>
  );
};
