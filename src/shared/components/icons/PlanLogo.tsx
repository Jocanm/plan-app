interface PlanLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const PlanLogo = ({ className = "", size = "md" }: PlanLogoProps) => {
  // Generate unique IDs to avoid conflicts when multiple logos are on the same page
  const uniqueId = Math.random().toString(36).substring(2, 9);
  const gradientId = `planGradient-${uniqueId}`;
  const accentId = `planAccent-${uniqueId}`;

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(239, 85%, 67%)" />
            <stop offset="100%" stopColor="hsl(243, 100%, 82%)" />
          </linearGradient>
          <linearGradient id={accentId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(142, 71%, 45%)" />
            <stop offset="100%" stopColor="hsl(39, 95%, 62%)" />
          </linearGradient>
        </defs>

        {/* Main container circle */}
        <circle
          cx="24"
          cy="24"
          r="20"
          fill={`url(#${gradientId})`}
          className="drop-shadow-lg"
        />

        {/* Inner geometric pattern representing task organization */}
        <g transform="translate(24, 24)">
          {/* Central organizing point */}
          <circle cx="0" cy="0" r="3" fill="white" opacity="0.9" />

          {/* Task/plan lines radiating out */}
          <g stroke="white" strokeWidth="2" opacity="0.8">
            <line x1="0" y1="-12" x2="0" y2="-8" strokeLinecap="round" />
            <line x1="8.5" y1="-8.5" x2="6" y2="-6" strokeLinecap="round" />
            <line x1="12" y1="0" x2="8" y2="0" strokeLinecap="round" />
            <line x1="8.5" y1="8.5" x2="6" y2="6" strokeLinecap="round" />
            <line x1="0" y1="12" x2="0" y2="8" strokeLinecap="round" />
            <line x1="-8.5" y1="8.5" x2="-6" y2="6" strokeLinecap="round" />
            <line x1="-12" y1="0" x2="-8" y2="0" strokeLinecap="round" />
            <line x1="-8.5" y1="-8.5" x2="-6" y2="-6" strokeLinecap="round" />
          </g>

          {/* Small accent dots */}
          <circle cx="0" cy="-10" r="1.5" fill={`url(#${accentId})`} />
          <circle cx="7" cy="-7" r="1.5" fill={`url(#${accentId})`} />
          <circle cx="10" cy="0" r="1.5" fill={`url(#${accentId})`} />
          <circle cx="7" cy="7" r="1.5" fill={`url(#${accentId})`} />
        </g>
      </svg>
    </div>
  );
};
