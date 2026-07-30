import { useEffect, useState } from 'react';
import { Check, ChevronDown, Grid2x2, Palette as PaletteIcon, Pipette, RotateCcw } from 'lucide-react';
import Collapsible from './Collapsible';
import {
  COLOR_TARGETS,
  PALETTE_ROWS,
  STYLE_PRESETS,
  normalizeHex,
  type CanvasColors,
  type ColorTarget,
  type StylePreset,
} from '../data/presets';

interface ColorStudioProps {
  colors: CanvasColors;
  target: ColorTarget;
  customColors: string[];
  activePresetId: string;
  onTargetChange: (target: ColorTarget) => void;
  onColorChange: (color: string) => void;
  onPresetChange: (preset: StylePreset) => void;
  onReset: () => void;
}

export default function ColorStudio({
  colors,
  target,
  customColors,
  activePresetId,
  onTargetChange,
  onColorChange,
  onPresetChange,
  onReset,
}: ColorStudioProps) {
  const activeColor = colors[target];
  const activeLabel = COLOR_TARGETS.find((item) => item.id === target)?.label ?? 'Color';

  const [draft, setDraft] = useState(activeColor.replace('#', '').toUpperCase());
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [themesOpen, setThemesOpen] = useState(false);

  useEffect(() => {
    setDraft(activeColor.replace('#', '').toUpperCase());
  }, [activeColor]);

  const commitHex = (value: string) => {
    const cleaned = value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
    setDraft(cleaned.toUpperCase());
    const normalized = normalizeHex(cleaned);
    if (normalized) onColorChange(normalized);
  };

  /* choosing a swatch applies it and closes the palette */
  const pickColor = (color: string) => {
    onColorChange(color);
    setPaletteOpen(false);
  };

  const pickTheme = (preset: StylePreset) => {
    onPresetChange(preset);
    setThemesOpen(false);
  };

  /* tapping a target opens the palette for that element */
  const selectTarget = (next: ColorTarget) => {
    onTargetChange(next);
    setPaletteOpen(true);
    setThemesOpen(false);
  };

  const swatchClass = (color: string) =>
    `h-6 w-6 rounded-full transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
      activeColor.toLowerCase() === color.toLowerCase()
        ? 'ring-2 ring-offset-2 ring-[var(--text)] ring-offset-[var(--surface)]'
        : 'ring-1 ring-black/10'
    }`;

  const sectionButton = (
    isOpen: boolean,
    onClick: () => void,
    icon: React.ReactNode,
    title: string,
    hint: string,
    trailing?: React.ReactNode,
  ) => (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.99] ${
        isOpen
          ? 'border-[var(--brand)] bg-[var(--brand-soft)]'
          : 'border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--border-strong)]'
      }`}
    >
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isOpen ? 'text-[var(--brand)]' : 'text-[var(--text-soft)]'}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-bold text-[var(--text)]">{title}</span>
        <span className="block truncate text-[11px] text-[var(--muted)]">{hint}</span>
      </span>
      {trailing}
      <ChevronDown size={15} className={`shrink-0 text-[var(--muted)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );

  return (
    <div className="space-y-3">
      {/* which element are we coloring */}
      <div className="grid grid-cols-2 gap-2">
        {COLOR_TARGETS.map((item) => {
          const isActive = target === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectTarget(item.id)}
              aria-pressed={isActive}
              className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition active:scale-[0.98] ${
                isActive
                  ? 'border-[var(--brand)] bg-[var(--brand-soft)]'
                  : 'border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--border-strong)]'
              }`}
            >
              <span className="h-6 w-6 shrink-0 rounded-lg ring-1 ring-black/10" style={{ backgroundColor: colors[item.id] }} />
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-semibold text-[var(--text)]">{item.label}</span>
                <span className="block font-mono text-[10px] uppercase text-[var(--muted)]">{colors[item.id]}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* hex code for the selected element */}
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-2 focus-within:border-[var(--brand)]">
          <span className="h-7 w-7 shrink-0 rounded-lg ring-1 ring-black/10" style={{ backgroundColor: activeColor }} />
          <span className="text-sm font-semibold text-[var(--muted)]">#</span>
          <input
            aria-label={`${activeLabel} hex code`}
            value={draft}
            onChange={(event) => commitHex(event.target.value)}
            onBlur={() => setDraft(activeColor.replace('#', '').toUpperCase())}
            spellCheck={false}
            maxLength={6}
            placeholder="RRGGBB"
            className="w-full min-w-0 bg-transparent font-mono text-sm uppercase tracking-wide text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
          />
        </div>
        <label
          className="relative flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-soft)] transition hover:border-[var(--border-strong)]"
          title="Pick any color"
        >
          <Pipette size={16} />
          <input
            type="color"
            value={activeColor}
            onChange={(event) => onColorChange(event.target.value)}
            className="absolute inset-0 h-full w-full opacity-0"
            aria-label="Open system color picker"
          />
        </label>
        <button
          type="button"
          onClick={onReset}
          title="Reset colors"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-soft)] transition hover:border-[var(--border-strong)]"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* palette — opens on tap, closes after picking */}
      <div>
        {sectionButton(
          paletteOpen,
          () => {
            setPaletteOpen((value) => !value);
            setThemesOpen(false);
          },
          <Grid2x2 size={16} />,
          'Palette',
          paletteOpen ? `Pick a color for ${activeLabel.toLowerCase()}` : '80 swatches + your custom colors',
          <span className="h-5 w-5 shrink-0 rounded-md ring-1 ring-black/10" style={{ backgroundColor: activeColor }} />,
        )}

        <Collapsible open={paletteOpen}>
          <div className="mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
              {activeLabel}
            </p>
            <div className="space-y-1.5">
              {PALETTE_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-between gap-1.5">
                  {row.map((color) => (
                    <button
                      key={color}
                      type="button"
                      title={color.toUpperCase()}
                      onClick={() => pickColor(color)}
                      className={swatchClass(color)}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {customColors.length > 0 && (
              <div className="mt-3 border-t border-[var(--border)] pt-3">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Custom</p>
                <div className="flex flex-wrap gap-1.5">
                  {customColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      title={color.toUpperCase()}
                      onClick={() => pickColor(color)}
                      className={swatchClass(color)}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Collapsible>
      </div>

      {/* color themes — also a button */}
      <div>
        {sectionButton(
          themesOpen,
          () => {
            setThemesOpen((value) => !value);
            setPaletteOpen(false);
          },
          <PaletteIcon size={16} />,
          'Color themes',
          activePresetId === 'custom'
            ? 'Custom colors in use'
            : `${STYLE_PRESETS.find((item) => item.id === activePresetId)?.name ?? ''} selected`,
          <span className="flex shrink-0 overflow-hidden rounded-md ring-1 ring-black/10">
            {[colors.background, colors.text, colors.accent].map((color, index) => (
              <span key={index} className="h-5 w-3" style={{ backgroundColor: color }} />
            ))}
          </span>,
        )}

        <Collapsible open={themesOpen}>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3">
            {STYLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => pickTheme(preset)}
                className={`flex items-center justify-between gap-2 rounded-xl border px-2.5 py-2 transition active:scale-[0.98] ${
                  activePresetId === preset.id
                    ? 'border-[var(--brand)] bg-[var(--brand-soft)]'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
                }`}
              >
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--text)]">
                  {activePresetId === preset.id && <Check size={13} className="text-[var(--brand)]" />}
                  {preset.name}
                </span>
                <span className="flex overflow-hidden rounded-md ring-1 ring-black/10">
                  {[preset.colors.background, preset.colors.text, preset.colors.accent].map((color) => (
                    <span key={color} className="h-5 w-3.5" style={{ backgroundColor: color }} />
                  ))}
                </span>
              </button>
            ))}
          </div>
        </Collapsible>
      </div>
    </div>
  );
}
