/** Custom cricket ball — not a generic Lucide icon */
export function CricketBallLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="16" cy="16" r="14" fill="#c2410c" stroke="#f97316" strokeWidth="1.5" />
      <path
        d="M8 10c4 6 12 6 16 12M24 10c-4 6-12 6-16 12"
        stroke="#fef3c7"
        strokeWidth="1.25"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 22c2-4 10-4 12 0M10 10c2 4 10 4 12 0"
        stroke="#fef3c7"
        strokeWidth="0.75"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
