import React, { useState, useEffect } from 'react';
import { SAMPLE_HTML_TEMPLATES } from '../data/mockData';
import { ExtractedAsset } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Code, Eye, Image as ImageIcon, Link as LinkIcon, Sparkles, Check, Copy, ExternalLink, RefreshCw } from 'lucide-react';

interface HtmlImporterScreenProps {
  onApplyCustomScreen?: (html: string, title: string) => void;
}

export const HtmlImporterScreen: React.FC<HtmlImporterScreenProps> = ({ onApplyCustomScreen }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(SAMPLE_HTML_TEMPLATES[0].id);
  const [htmlInput, setHtmlInput] = useState<string>(SAMPLE_HTML_TEMPLATES[0].html);
  const [extractedAssets, setExtractedAssets] = useState<ExtractedAsset[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'assets'>('preview');
  const [appliedMessage, setAppliedMessage] = useState(false);

  // Parse HTML for hotlinked images, links, and elements
  useEffect(() => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, 'text/html');
      const assets: ExtractedAsset[] = [];

      // Extract images
      const imgElements = doc.querySelectorAll('img');
      imgElements.forEach((img, idx) => {
        const src = img.getAttribute('src');
        if (src) {
          assets.push({
            id: `img-${idx}`,
            type: 'image',
            value: src,
            alt: img.getAttribute('alt') || `Hotlinked Image ${idx + 1}`,
          });
        }
      });

      // Extract links
      const linkElements = doc.querySelectorAll('a');
      linkElements.forEach((link, idx) => {
        const href = link.getAttribute('href');
        if (href) {
          assets.push({
            id: `link-${idx}`,
            type: 'link',
            value: href,
            alt: link.textContent?.trim() || href,
          });
        }
      });

      setExtractedAssets(assets);
    } catch {
      // Fallback regex if DOMParser fails
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      const assets: ExtractedAsset[] = [];
      let match;
      let count = 0;
      while ((match = imgRegex.exec(htmlInput)) !== null) {
        assets.push({
          id: `img-${count++}`,
          type: 'image',
          value: match[1],
          alt: `Hotlinked Asset ${count}`,
        });
      }
      setExtractedAssets(assets);
    }
  }, [htmlInput]);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const tmpl = SAMPLE_HTML_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setHtmlInput(tmpl.html);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 1800);
  };

  const handleApply = () => {
    if (onApplyCustomScreen) {
      const template = SAMPLE_HTML_TEMPLATES.find((t) => t.id === selectedTemplateId);
      onApplyCustomScreen(htmlInput, template?.name || 'Custom Imported Screen');
      setAppliedMessage(true);
      setTimeout(() => setAppliedMessage(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Guidance */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              HTML Screen & Hotlink Studio
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              Paste any screen mockup or HTML markup below to instantly inspect, hotlink visual assets, and render a live responsive component view.
            </p>
          </div>

          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-xs self-start"
          >
            {appliedMessage ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>{appliedMessage ? 'Screen Active!' : 'Set as Active Screen'}</span>
          </button>
        </div>

        {/* Template Quick Loaders (Clean Interactive Segmented Buttons) */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium mr-1">Load Presets:</span>
          {SAMPLE_HTML_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleSelectTemplate(tmpl.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedTemplateId === tmpl.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Code Editor on Left/Top, Inspector & Preview on Right/Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor Column */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
              <Code className="w-4 h-4 text-slate-500" />
              <span>HTML Markup & Hotlinked Tags</span>
            </div>
            <button
              onClick={() => setHtmlInput('')}
              className="text-[11px] text-slate-400 hover:text-slate-600"
            >
              Clear Editor
            </button>
          </div>

          <div className="relative">
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="<div class='...'> Paste HTML with <img src='...'> tags here </div>"
              rows={18}
              className="w-full p-3 font-mono text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400 leading-relaxed selection:bg-slate-700"
              spellCheck={false}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{htmlInput.length} characters</span>
            <span className="font-mono">{extractedAssets.filter(a => a.type === 'image').length} images extracted</span>
          </div>
        </div>

        {/* Preview & Asset Inspector Column */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col">
          {/* Subheader tabs */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Rendered View</span>
              </button>
              <button
                onClick={() => setActiveTab('assets')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'assets'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Hotlinked Assets ({extractedAssets.filter((a) => a.type === 'image').length})</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 hidden sm:block">
              Tailwind Sandbox Active
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="p-6 min-h-[460px] bg-slate-50/60 overflow-y-auto">
            {activeTab === 'preview' && (
              <div className="w-full">
                {htmlInput.trim() ? (
                  <div
                    className="imported-screen-content prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: htmlInput }}
                  />
                ) : (
                  <div className="py-20 text-center text-slate-400 space-y-2">
                    <Code className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-sm">Paste HTML in the code editor to generate live screens.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'assets' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-600">
                  The following media assets were detected in the HTML markup and are verified for hotlinking:
                </div>

                {extractedAssets.filter((a) => a.type === 'image').length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No <code className="font-mono">&lt;img&gt;</code> tags detected in the current HTML.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {extractedAssets
                      .filter((a) => a.type === 'image')
                      .map((asset) => (
                        <div
                          key={asset.id}
                          className="bg-white border border-slate-200 rounded-xl overflow-hidden p-3 space-y-3 shadow-xs"
                        >
                          <div className="aspect-16/9 bg-slate-100 rounded-lg overflow-hidden relative">
                            <ImageWithFallback
                              src={asset.value}
                              alt={asset.alt || 'Asset'}
                              fallbackTitle={asset.alt || 'Asset Image'}
                              containerClassName="w-full h-full"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-slate-900 truncate">
                              {asset.alt || 'Hotlinked Image'}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 truncate">
                              {asset.value}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            <button
                              onClick={() => copyToClipboard(asset.value)}
                              className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
                            >
                              {copiedUrl === asset.value ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-[11px] text-emerald-600">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span className="text-[11px]">Copy URL</span>
                                </>
                              )}
                            </button>

                            <a
                              href={asset.value}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-[11px]"
                            >
                              <span>Open URL</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
