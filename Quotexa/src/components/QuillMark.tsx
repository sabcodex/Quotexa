interface QuillMarkProps {
  color: string;
  shaftColor?: string;
  size?: number;
  className?: string;
}

/**
 * Quotexa brand mark — a feather pen leaving an ink stroke,
 * used in place of quotation marks on the generated images.
 */
export default function QuillMark({ color, shaftColor, size = 40, className = '' }: QuillMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* feather vane */}
      <path
        d="M47 9C36 10.5 26.5 15 19.8 21.7 14.6 26.9 11 32.9 9.2 39.4L8.5 42l2.6-.7c6.5-1.8 12.5-5.4 17.7-10.6C35.5 24 40 14.5 47 9Z"
        fill={color}
      />
      {/* shaft cut through the vane */}
      {shaftColor && (
        <path d="M10.5 40 43 12.5" stroke={shaftColor} strokeWidth={2.1} strokeLinecap="round" />
      )}
      {/* pen tip touching the paper */}
      <path d="M8.5 42 6 45.4" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      {/* fresh ink stroke */}
      <path
        d="M6.5 49c4.6-2.8 8.8 2.1 14.2-.4 3.2-1.5 6.1.7 9.6.2"
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </svg>
  );
}
