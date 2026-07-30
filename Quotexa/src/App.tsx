import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import {
  AlignCenter,
  Check,
  Download,
  ImageIcon,
  Layers,
  Moon,
  Palette,
  RefreshCw,
  Sparkles,
  Sun,
  Type,
} from 'lucide-react';
import { quotes, type Quote, type QuoteCategory } from './data/quotes';
import QuillMark from './components/QuillMark';
import {
  CATEGORIES,
  FONTS,
  SIZES,
  STYLE_PRESETS,
  normalizeHex,
  type CanvasColors,
  type ColorTarget,
  type SizePreset,
  type StylePreset,
} from './data/presets';
import QuoteCanvas from './components/QuoteCanvas';
import ColorStudio from './components/ColorStudio';
import StepCard from './components/StepCard';

const CUSTOM_SIZE: SizePreset = { id: 'custom', ratio: 'Custom', width: 1080, height: 1350, hint: 'Your own dimensions' };
const SIZE_OPTIONS = [...SIZES, CUSTOM_SIZE];

const PREVIEW_MAX_W = 340;
const PREVIEW_MAX_H = 500;

type PanelId = 'category' | 'size' | 'colors' | 'text';

function pickQuote(category: QuoteCategory, exclude?: string): Quote {
  const pool = quotes[category].filter((item) => item.text !== exclude);
  const list = pool.length > 0 ? pool : quotes[category];
  return list[Math.floor(Math.random() * list.length)];
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem('quotexa-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [openPanel, setOpenPanel] = useState<PanelId | null>(null);

  const [category, setCategory] = useState<QuoteCategory>('strength');
  const [quote, setQuote] = useState<Quote>(() => pickQuote('strength'));

  const [sizeId, setSizeId] = useState('2-3');
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(1350);

  const [colors, setColors] = useState<CanvasColors>(STYLE_PRESETS[0].colors);
  const [colorTarget, setColorTarget] = useState<ColorTarget>('background');
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [presetId, setPresetId] = useState(STYLE_PRESETS[0].id);

  const [font, setFont] = useState(FONTS[0]);
  const [textScale, setTextScale] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [showAuthor, setShowAuthor] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  const [showBrand, setShowBrand] = useState(true);

  const [isDownloading, setIsDownloading] = useState(false);
  const [status, setStatus] = useState('');

  const exportRef = useRef<HTMLDivElement>(null);

  const togglePanel = (panel: PanelId) => setOpenPanel((current) => (current === panel ? null : panel));

  const selectedSize = SIZE_OPTIONS.find((item) => item.id === sizeId) ?? SIZES[0];
  const canvasSize = useMemo(
    () =>
      sizeId === 'custom'
        ? {
            width: Math.min(3000, Math.max(200, customWidth || 200)),
            height: Math.min(3000, Math.max(200, customHeight || 200)),
          }
        : { width: selectedSize.width, height: selectedSize.height },
    [sizeId, customWidth, customHeight, selectedSize],
  );

  const previewScale = Math.min(1, PREVIEW_MAX_W / canvasSize.width, PREVIEW_MAX_H / canvasSize.height);
  const previewW = Math.round(canvasSize.width * previewScale);
  const previewH = Math.round(canvasSize.height * previewScale);

  const categoryMeta = CATEGORIES.find((item) => item.id === category) ?? CATEGORIES[0];
  const presetName =
    presetId === 'custom' ? 'Custom' : STYLE_PRESETS.find((item) => item.id === presetId)?.name ?? 'Custom';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    window.localStorage.setItem('quotexa-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(''), 2800);
    return () => window.clearTimeout(timer);
  }, [status]);

  const changeCategory = (next: QuoteCategory) => {
    setCategory(next);
    setQuote(pickQuote(next));
    setOpenPanel(null);
  };

  const changeSize = (next: string) => {
    setSizeId(next);
    if (next !== 'custom') setOpenPanel(null);
  };

  const applyColor = useCallback(
    (raw: string) => {
      const color = normalizeHex(raw);
      if (!color) return;
      setColors((current) => ({ ...current, [colorTarget]: color }));
      setPresetId('custom');
      setCustomColors((current) => [color, ...current.filter((item) => item !== color)].slice(0, 12));
    },
    [colorTarget],
  );

  const applyPreset = (preset: StylePreset) => {
    setColors(preset.colors);
    setPresetId(preset.id);
  };

  const handleDownload = async () => {
    if (!exportRef.current) return;
    setIsDownloading(true);
    setStatus('Rendering your image…');
    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 1,
        width: canvasSize.width,
        height: canvasSize.height,
      });
      const link = document.createElement('a');
      link.download = `quotexa-${category}-${canvasSize.width}x${canvasSize.height}.png`;
      link.href = dataUrl;
      link.click();
      setStatus('Saved to your downloads ✓');
    } catch (error) {
      console.error(error);
      setStatus('Could not export. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const canvasProps = {
    text: quote.text,
    author: quote.author,
    categoryLabel: categoryMeta.name,
    size: canvasSize,
    colors,
    fontFamily: font.value,
    textScale,
    uppercase,
    showAuthor,
    showLabel,
    showBrand,
  };

  const toggleRow = (label: string, value: boolean, onChange: (value: boolean) => void) => (
    <button
      type="button"
      onClick={() => onChange(!value)}
      aria-pressed={value}
      className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[13px] font-semibold text-[var(--text)] transition hover:border-[var(--border-strong)]"
    >
      {label}
      <span className={`relative h-5 w-9 rounded-full transition ${value ? 'bg-[var(--brand)]' : 'bg-[var(--border-strong)]'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${value ? 'left-[18px]' : 'left-0.5'}`} />
      </span>
    </button>
  );

  return (
    <div className="app-bg min-h-screen text-[var(--text)]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand)] text-[var(--brand-contrast)] shadow-md">
              <QuillMark color="currentColor" size={22} />
            </span>
            <div>
              <p className="font-display text-[17px] font-extrabold leading-none tracking-tight">Quotexa</p>
              <p className="mt-1 text-[11px] text-[var(--muted)]">Daily quote images, ready to post</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-1">
              <button
                type="button"
                onClick={() => setIsDark(false)}
                aria-pressed={!isDark}
                title="Light mode"
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition ${
                  !isDark ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm' : 'text-[var(--muted)]'
                }`}
              >
                <Sun size={14} /> Light
              </button>
              <button
                type="button"
                onClick={() => setIsDark(true)}
                aria-pressed={isDark}
                title="Dark mode"
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition ${
                  isDark ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm' : 'text-[var(--muted)]'
                }`}
              >
                <Moon size={14} /> Dark
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6">
        <div className="animate-rise mb-6 flex items-center gap-2 text-[13px] font-semibold text-[var(--text-soft)]">
          <Sparkles size={15} className="text-[var(--brand)]" />
          <span>Tap “Change” on any step to open it — your result waits at the bottom.</span>
        </div>

        {/* ── STEPS ───────────────────────────────────────────────── */}
        <div className="grid items-start gap-4 md:grid-cols-2">
          {/* 01 — Category */}
          <StepCard
            step="Step 01"
            title="Category"
            icon={<Layers size={18} />}
            delay={0}
            open={openPanel === 'category'}
            onToggle={() => togglePanel('category')}
            summary={
              <>
                <span>{categoryMeta.icon}</span>
                <span className="truncate">{categoryMeta.name}</span>
                <span className="text-[var(--muted)]">· {quotes[category].length} quotes</span>
              </>
            }
          >
            <div className="scroll-slim max-h-[290px] space-y-1.5 overflow-y-auto pr-1">
              {CATEGORIES.map((item) => {
                const active = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => changeCategory(item.id)}
                    aria-pressed={active}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.99] ${
                      active
                        ? 'border-[var(--brand)] bg-[var(--brand-soft)]'
                        : 'border-transparent bg-[var(--surface-2)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold text-[var(--text)]">{item.name}</span>
                      <span className="block truncate text-[11px] text-[var(--muted)]">{item.description}</span>
                    </span>
                    {active && <Check size={16} className="text-[var(--brand)]" />}
                  </button>
                );
              })}
            </div>
          </StepCard>

          {/* 02 — Image size */}
          <StepCard
            step="Step 02"
            title="Image size"
            icon={<ImageIcon size={18} />}
            delay={60}
            open={openPanel === 'size'}
            onToggle={() => togglePanel('size')}
            summary={
              <>
                <span className="truncate">{sizeId === 'custom' ? 'Custom' : selectedSize.ratio}</span>
                <span className="font-mono text-[var(--muted)]">
                  · {canvasSize.width} × {canvasSize.height}
                </span>
              </>
            }
          >
            <div className="scroll-slim max-h-[290px] space-y-1.5 overflow-y-auto pr-1">
              {SIZE_OPTIONS.map((item) => {
                const active = sizeId === item.id;
                const boxHeight = Math.max(10, Math.min(30, 20 * (item.height / item.width)));
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => changeSize(item.id)}
                    aria-pressed={active}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.99] ${
                      active
                        ? 'border-[var(--brand)] bg-[var(--brand-soft)]'
                        : 'border-transparent bg-[var(--surface-2)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                      <span
                        className={`block rounded-[3px] border-2 ${active ? 'border-[var(--brand)]' : 'border-[var(--border-strong)]'}`}
                        style={{ width: 20, height: boxHeight }}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold text-[var(--text)]">
                        {item.ratio}
                        {item.id !== 'custom' && (
                          <span className="ml-2 font-mono text-[11px] font-medium text-[var(--text-soft)]">
                            {item.width} × {item.height}
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-[11px] text-[var(--muted)]">{item.hint}</span>
                    </span>
                    {active && <Check size={16} className="text-[var(--brand)]" />}
                  </button>
                );
              })}
            </div>

            {sizeId === 'custom' && (
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border)] pt-3">
                <label className="block">
                  <span className="mb-1 block text-[11px] font-semibold text-[var(--muted)]">Width (px)</span>
                  <input
                    type="number"
                    min={200}
                    max={3000}
                    value={customWidth}
                    onChange={(event) => setCustomWidth(Number(event.target.value) || 0)}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 font-mono text-sm outline-none focus:border-[var(--brand)]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] font-semibold text-[var(--muted)]">Height (px)</span>
                  <input
                    type="number"
                    min={200}
                    max={3000}
                    value={customHeight}
                    onChange={(event) => setCustomHeight(Number(event.target.value) || 0)}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 font-mono text-sm outline-none focus:border-[var(--brand)]"
                  />
                </label>
              </div>
            )}
          </StepCard>

          {/* 03 — Colors */}
          <StepCard
            step="Step 03"
            title="Colors"
            icon={<Palette size={18} />}
            delay={120}
            open={openPanel === 'colors'}
            onToggle={() => togglePanel('colors')}
            summary={
              <>
                <span className="flex overflow-hidden rounded-md ring-1 ring-black/10">
                  {[colors.background, colors.text, colors.accent, colors.quoteMark].map((color, index) => (
                    <span key={index} className="h-4 w-4" style={{ backgroundColor: color }} />
                  ))}
                </span>
                <span className="truncate">{presetName}</span>
              </>
            }
          >
            <ColorStudio
              colors={colors}
              target={colorTarget}
              customColors={customColors}
              activePresetId={presetId}
              onTargetChange={setColorTarget}
              onColorChange={applyColor}
              onPresetChange={applyPreset}
              onReset={() => applyPreset(STYLE_PRESETS[0])}
            />
          </StepCard>

          {/* 04 — Text */}
          <StepCard
            step="Step 04"
            title="Text"
            icon={<Type size={18} />}
            delay={180}
            open={openPanel === 'text'}
            onToggle={() => togglePanel('text')}
            summary={
              <>
                <span className="truncate">{font.name}</span>
                <span className="font-mono text-[var(--muted)]">· {Math.round(textScale * 100)}%</span>
              </>
            }
          >
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Font</p>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {FONTS.map((item) => {
                    const active = font.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFont(item)}
                        aria-pressed={active}
                        className={`rounded-xl border px-3 py-2 text-left transition active:scale-[0.99] ${
                          active
                            ? 'border-[var(--brand)] bg-[var(--brand-soft)]'
                            : 'border-transparent bg-[var(--surface-2)] hover:border-[var(--border-strong)]'
                        }`}
                        style={{ fontFamily: item.value }}
                      >
                        <span className="block truncate text-[13px] font-bold text-[var(--text)]">{item.name}</span>
                        <span className="block truncate text-[11px] text-[var(--muted)]">Aa Bb Cc</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Text size</p>
                  <span className="font-mono text-[11px] text-[var(--text-soft)]">{Math.round(textScale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={130}
                  value={Math.round(textScale * 100)}
                  onChange={(event) => setTextScale(Number(event.target.value) / 100)}
                  className="w-full"
                  aria-label="Text size"
                />
              </div>

              <div className="space-y-1.5">
                {toggleRow('Uppercase quote', uppercase, setUppercase)}
                {toggleRow('Show author', showAuthor, setShowAuthor)}
                {toggleRow('Show category label', showLabel, setShowLabel)}
                {toggleRow('Show watermark', showBrand, setShowBrand)}
              </div>

              <div className="border-t border-[var(--border)] pt-3">
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                  <AlignCenter size={13} /> Edit wording
                </p>
                <textarea
                  value={quote.text}
                  onChange={(event) => setQuote((current) => ({ ...current, text: event.target.value }))}
                  rows={3}
                  className="scroll-slim w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[13px] leading-6 outline-none focus:border-[var(--brand)]"
                />
                <input
                  value={quote.author}
                  onChange={(event) => setQuote((current) => ({ ...current, author: event.target.value }))}
                  placeholder="Author"
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[13px] outline-none focus:border-[var(--brand)]"
                />
              </div>
            </div>
          </StepCard>
        </div>

        {/* ── RESULT ──────────────────────────────────────────────── */}
        <section className="theme-surface animate-rise mt-5 rounded-2xl p-5 sm:p-7" style={{ animationDelay: '240ms' }}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Your result</p>
              <h2 className="font-display text-lg font-bold">Ready to download</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-soft)]">
                {categoryMeta.icon} {categoryMeta.name}
              </span>
              <span className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-soft)]">
                {canvasSize.width} × {canvasSize.height}
              </span>
              <span className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-soft)]">
                {font.name}
              </span>
            </div>
          </div>

          {/* IMAGE CENTERED */}
          <div className="flex flex-col items-center">
            <div className="tile-bg w-full max-w-[380px] rounded-xl p-5">
              <div
                className="animate-canvas relative mx-auto overflow-hidden rounded-lg shadow-lg"
                key={`${quote.text}-${canvasSize.width}x${canvasSize.height}-${font.id}`}
                style={{ width: previewW, height: previewH }}
              >
                <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${previewScale})` }}>
                  <QuoteCanvas {...canvasProps} />
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Scaled preview · {canvasSize.width} × {canvasSize.height}
              </p>
            </div>

            {/* Colors used – centered under the image */}
            <div className="mt-5 flex w-full max-w-[380px] items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
              <span className="text-[12px] font-semibold text-[var(--muted)]">Colors used</span>
              <span className="flex items-center gap-1.5">
                {Object.entries(colors).map(([key, value]) => (
                  <span
                    key={key}
                    className="h-6 w-6 rounded-lg ring-1 ring-black/10"
                    style={{ backgroundColor: value }}
                    title={`${key}: ${value.toUpperCase()}`}
                  />
                ))}
              </span>
            </div>

            {/* Buttons centered below the image */}
            <div className="mt-4 grid w-full max-w-[380px] grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setQuote(pickQuote(category, quote.text))}
                className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-[13px] font-bold text-[var(--text)] transition hover:bg-[var(--surface-2)] active:scale-[0.98]"
              >
                <RefreshCw size={16} /> New quote
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-4 py-3 text-[13px] font-bold text-[var(--brand-contrast)] shadow-md transition hover:opacity-90 active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
              >
                {isDownloading ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
                {isDownloading ? 'Exporting…' : 'Download'}
              </button>
            </div>
            <p className="mt-2.5 min-h-[18px] text-center text-[12px] font-semibold text-[var(--text-soft)]">
              {status || `Exports at full ${canvasSize.width} × ${canvasSize.height} quality`}
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
          Quotexa · made for daily posting
        </p>
      </footer>

      <div aria-hidden className="pointer-events-none fixed left-[-20000px] top-0">
        <div ref={exportRef}>
          <QuoteCanvas {...canvasProps} />
        </div>
      </div>
    </div>
  );
}
