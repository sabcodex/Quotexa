import { hexToRgba, type CanvasColors } from '../data/presets';
import QuillMark from './QuillMark';

export interface CanvasSize {
  width: number;
  height: number;
}

interface QuoteCanvasProps {
  text: string;
  author: string;
  categoryLabel: string;
  size: CanvasSize;
  colors: CanvasColors;
  fontFamily: string;
  textScale: number;
  uppercase: boolean;
  showAuthor: boolean;
  showLabel: boolean;
  showBrand: boolean;
}

export default function QuoteCanvas({
  text,
  author,
  categoryLabel,
  size,
  colors,
  fontFamily,
  textScale,
  uppercase,
  showAuthor,
  showLabel,
  showBrand,
}: QuoteCanvasProps) {
  const short = Math.min(size.width, size.height);
  const isWide = size.width / size.height > 1.2;

  const lengthFactor = text.length > 190 ? 0.68 : text.length > 140 ? 0.78 : text.length > 95 ? 0.89 : 1;
  const base = isWide ? size.height * 0.085 : size.width * 0.066;
  const quoteSize = Math.round(base * lengthFactor * textScale);
  const authorSize = Math.round(Math.min(size.width * 0.026, 36));
  const labelSize = Math.round(Math.max(13, Math.min(size.width * 0.0155, 22)));
  const rule = Math.max(2, short * 0.0032);
  const frame = Math.max(5, short * 0.01);

  return (
    <div
      className="relative isolate overflow-hidden"
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily,
      }}
    >
      {/* soft accent shapes */}
      <div
        className="absolute rounded-full"
        style={{
          width: short * 0.9,
          height: short * 0.9,
          top: -short * 0.36,
          right: -short * 0.34,
          backgroundColor: hexToRgba(colors.accent, 0.1),
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: short * 0.55,
          height: short * 0.55,
          bottom: -short * 0.24,
          left: -short * 0.22,
          backgroundColor: hexToRgba(colors.accent, 0.07),
        }}
      />

      {/* corner frame */}
      <div
        className="absolute"
        style={{
          top: short * 0.058,
          left: short * 0.058,
          width: short * 0.17,
          height: short * 0.17,
          borderTop: `${frame}px solid ${colors.accent}`,
          borderLeft: `${frame}px solid ${colors.accent}`,
        }}
      />
      <div
        className="absolute"
        style={{
          right: short * 0.058,
          bottom: short * 0.058,
          width: short * 0.17,
          height: short * 0.17,
          borderRight: `${frame}px solid ${colors.accent}`,
          borderBottom: `${frame}px solid ${colors.accent}`,
        }}
      />

      <div
        className="relative z-10 flex h-full flex-col items-center justify-center text-center"
        style={{ padding: `${short * 0.12}px ${size.width * (isWide ? 0.12 : 0.125)}px` }}
      >
        {showLabel && (
          <div
            className="flex items-center"
            style={{ color: colors.accent, fontSize: labelSize, letterSpacing: labelSize * 0.22, gap: short * 0.03, marginBottom: short * 0.045 }}
          >
            <span style={{ width: short * 0.06, height: rule, backgroundColor: colors.accent, display: 'block' }} />
            <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>{categoryLabel}</span>
            <span style={{ width: short * 0.06, height: rule, backgroundColor: colors.accent, display: 'block' }} />
          </div>
        )}

        <div aria-hidden="true" style={{ marginBottom: short * 0.04, transform: 'rotate(-6deg)' }}>
          <QuillMark color={colors.quoteMark} shaftColor={colors.background} size={Math.round(short * 0.17)} />
        </div>

        <p
          style={{
            margin: 0,
            fontSize: quoteSize,
            fontWeight: 700,
            lineHeight: 1.16,
            letterSpacing: -quoteSize * 0.015,
            maxWidth: size.width * 0.84,
            textTransform: uppercase ? 'uppercase' : 'none',
          }}
        >
          {text}
        </p>

        {showAuthor && author.trim().length > 0 && (
          <div className="flex items-center justify-center" style={{ marginTop: short * 0.075, gap: short * 0.032 }}>
            <span style={{ width: short * 0.07, height: rule, backgroundColor: colors.accent, display: 'block' }} />
            <span style={{ color: colors.accent, fontSize: authorSize, fontStyle: 'italic' }}>{author}</span>
            <span style={{ width: short * 0.07, height: rule, backgroundColor: colors.accent, display: 'block' }} />
          </div>
        )}
      </div>

      {showBrand && (
        <span
          style={{
            position: 'absolute',
            left: short * 0.062,
            bottom: short * 0.05,
            color: hexToRgba(colors.text, 0.45),
            fontSize: Math.max(11, labelSize * 0.72),
            fontWeight: 600,
            letterSpacing: labelSize * 0.12,
            textTransform: 'uppercase',
          }}
        >
          Quotexa
        </span>
      )}
    </div>
  );
}
