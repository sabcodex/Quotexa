import type { QuoteCategory } from './quotes';

/* ---------------------------------- Categories --------------------------------- */

export interface CategoryMeta {
  id: QuoteCategory;
  name: string;
  icon: string;
  description: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'strength', name: 'Strength', icon: '🔥', description: 'Resilience and courage' },
  { id: 'woman', name: 'Women', icon: '👑', description: 'Confidence and power' },
  { id: 'man', name: 'Men', icon: '🦁', description: 'Character and discipline' },
  { id: 'professional', name: 'Professional', icon: '💼', description: 'Work and leadership' },
  { id: 'mindset', name: 'Mindset', icon: '🧠', description: 'Focus and growth' },
  { id: 'success', name: 'Success', icon: '🏆', description: 'Ambition and action' },
  { id: 'wisdom', name: 'Wisdom', icon: '📚', description: 'Calm and clarity' },
  { id: 'selflove', name: 'Self Love', icon: '💖', description: 'Care and healing' },
];

/* ------------------------------------ Sizes ------------------------------------ */

export interface SizePreset {
  id: string;
  ratio: string;
  width: number;
  height: number;
  hint: string;
}

export const SIZES: SizePreset[] = [
  { id: '2-3', ratio: '2:3', width: 1000, height: 1500, hint: 'Tall portrait' },
  { id: '1-1', ratio: '1:1', width: 1080, height: 1080, hint: 'Square' },
  { id: '4-5', ratio: '4:5', width: 1080, height: 1350, hint: 'Portrait' },
  { id: '3-4', ratio: '3:4', width: 1200, height: 1600, hint: 'Classic portrait' },
  { id: '9-16', ratio: '9:16', width: 1080, height: 1920, hint: 'Full-screen vertical' },
  { id: '1-2', ratio: '1:2.1', width: 1000, height: 2100, hint: 'Extra tall' },
  { id: '16-9', ratio: '16:9', width: 1920, height: 1080, hint: 'Wide landscape' },
  { id: '191-1', ratio: '1.91:1', width: 1200, height: 628, hint: 'Wide banner' },
];

/* ------------------------------------ Fonts ------------------------------------ */

export interface FontPreset {
  id: string;
  name: string;
  value: string;
}

export const FONTS: FontPreset[] = [
  { id: 'serif', name: 'Editorial Serif', value: 'Georgia, "Times New Roman", serif' },
  { id: 'sans', name: 'Clean Sans', value: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  { id: 'grotesk', name: 'Modern Grotesk', value: 'Verdana, Geneva, sans-serif' },
  { id: 'mono', name: 'Typewriter', value: '"Courier New", Courier, monospace' },
  { id: 'display', name: 'Bold Display', value: 'Impact, "Arial Black", sans-serif' },
  { id: 'rounded', name: 'Soft Rounded', value: '"Trebuchet MS", "Segoe UI", sans-serif' },
];

/* ------------------------------- Canvas colors --------------------------------- */

export type ColorTarget = 'background' | 'text' | 'accent' | 'quoteMark';

export type CanvasColors = Record<ColorTarget, string>;

export const COLOR_TARGETS: Array<{ id: ColorTarget; label: string }> = [
  { id: 'background', label: 'Background' },
  { id: 'text', label: 'Quote text' },
  { id: 'accent', label: 'Accent' },
  { id: 'quoteMark', label: 'Feather mark' },
];

export interface StylePreset {
  id: string;
  name: string;
  colors: CanvasColors;
}

export const STYLE_PRESETS: StylePreset[] = [
  { id: 'linen', name: 'Linen', colors: { background: '#f7f1e7', text: '#24211d', accent: '#b4623e', quoteMark: '#d8c3aa' } },
  { id: 'paper', name: 'Paper', colors: { background: '#ffffff', text: '#1f2937', accent: '#4f46e5', quoteMark: '#cbd5e1' } },
  { id: 'ink', name: 'Ink', colors: { background: '#161b22', text: '#f4f1ea', accent: '#d4ae70', quoteMark: '#39424e' } },
  { id: 'ocean', name: 'Ocean', colors: { background: '#e9f2f4', text: '#17384a', accent: '#2e7188', quoteMark: '#b3ccd4' } },
  { id: 'rose', name: 'Rose', colors: { background: '#f8edef', text: '#46282f', accent: '#b65d70', quoteMark: '#e0c1c7' } },
  { id: 'forest', name: 'Forest', colors: { background: '#e8eee6', text: '#1d3328', accent: '#4d7b5d', quoteMark: '#bcd0bf' } },
  { id: 'midnight', name: 'Midnight', colors: { background: '#10162a', text: '#eef1ff', accent: '#7c8cff', quoteMark: '#2b3557' } },
  { id: 'sand', name: 'Sand', colors: { background: '#efe6d9', text: '#3a2f24', accent: '#a4703a', quoteMark: '#d3c1a9' } },
];

/* ------------------------------- Palette swatches ------------------------------ */

export const PALETTE_ROWS: string[][] = [
  ['#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff'],
  ['#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff'],
  ['#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc'],
  ['#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd'],
  ['#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0'],
  ['#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79'],
  ['#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47'],
  ['#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130'],
];

/* --------------------------------- Utilities ----------------------------------- */

export function normalizeHex(value: string): string | null {
  const clean = value.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return `#${clean.split('').map((c) => c + c).join('').toLowerCase()}`;
  }
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    return `#${clean.toLowerCase()}`;
  }
  return null;
}

export function hexToRgba(hex: string, alpha: number): string {
  const value = normalizeHex(hex) ?? '#000000';
  const r = Number.parseInt(value.slice(1, 3), 16);
  const g = Number.parseInt(value.slice(3, 5), 16);
  const b = Number.parseInt(value.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function isLightColor(hex: string): boolean {
  const value = normalizeHex(hex) ?? '#ffffff';
  const r = Number.parseInt(value.slice(1, 3), 16);
  const g = Number.parseInt(value.slice(3, 5), 16);
  const b = Number.parseInt(value.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
