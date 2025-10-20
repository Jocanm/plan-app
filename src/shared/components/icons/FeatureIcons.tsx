interface FeatureIconProps {
  className?: string;
}

export const TaskOrganizationIcon = ({ className = "" }: FeatureIconProps) => (
  <div className={`w-12 h-12 ${className}`}>
    <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="taskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(142, 71%, 45%)" />
          <stop offset="100%" stopColor="hsl(142, 71%, 35%)" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="24" cy="24" r="18" fill="url(#taskGradient)" opacity="0.1" />

      {/* Task items */}
      <g fill="url(#taskGradient)">
        {/* Completed task */}
        <rect x="12" y="14" width="24" height="3" rx="1.5" opacity="0.8" />
        <circle cx="15" cy="15.5" r="2" fill="hsl(142, 71%, 45%)" />
        <path
          d="M13.5 15.5l1 1 2.5-2.5"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active task */}
        <rect x="12" y="22" width="20" height="3" rx="1.5" opacity="0.6" />
        <circle
          cx="15"
          cy="23.5"
          r="2"
          fill="none"
          stroke="hsl(142, 71%, 45%)"
          strokeWidth="1.5"
        />

        {/* Pending task */}
        <rect x="12" y="30" width="16" height="3" rx="1.5" opacity="0.4" />
        <circle
          cx="15"
          cy="31.5"
          r="2"
          fill="none"
          stroke="hsl(142, 71%, 45%)"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  </div>
);

export const CalendarIntegrationIcon = ({
  className = "",
}: FeatureIconProps) => (
  <div className={`w-12 h-12 ${className}`}>
    <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient
          id="calendarGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="hsl(239, 85%, 67%)" />
          <stop offset="100%" stopColor="hsl(243, 100%, 82%)" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="url(#calendarGradient)"
        opacity="0.1"
      />

      {/* Calendar frame */}
      <rect
        x="14"
        y="16"
        width="20"
        height="18"
        rx="3"
        fill="none"
        stroke="url(#calendarGradient)"
        strokeWidth="2"
      />

      {/* Calendar header */}
      <rect
        x="14"
        y="16"
        width="20"
        height="5"
        rx="3"
        fill="url(#calendarGradient)"
        opacity="0.8"
      />

      {/* Calendar rings */}
      <circle cx="18" cy="14" r="1.5" fill="url(#calendarGradient)" />
      <circle cx="30" cy="14" r="1.5" fill="url(#calendarGradient)" />

      {/* Calendar grid dots */}
      <g fill="url(#calendarGradient)" opacity="0.6">
        <circle cx="18" cy="25" r="1" />
        <circle cx="22" cy="25" r="1" />
        <circle cx="26" cy="25" r="1" />
        <circle cx="30" cy="25" r="1" />
        <circle cx="18" cy="29" r="1" />
        <circle cx="22" cy="29" r="1" />
        <circle cx="26" cy="29" r="1" />
      </g>

      {/* Active day highlight */}
      <circle cx="30" cy="29" r="2.5" fill="hsl(142, 71%, 45%)" opacity="0.8" />
      <circle cx="30" cy="29" r="1" fill="white" />
    </svg>
  </div>
);

export const CollaborationIcon = ({ className = "" }: FeatureIconProps) => (
  <div className={`w-12 h-12 ${className}`}>
    <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="collabGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(39, 95%, 62%)" />
          <stop offset="100%" stopColor="hsl(39, 95%, 52%)" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="url(#collabGradient)"
        opacity="0.1"
      />

      {/* People circles */}
      <g fill="url(#collabGradient)">
        {/* Person 1 */}
        <circle cx="18" cy="20" r="4" opacity="0.9" />
        <circle cx="18" cy="32" r="6" opacity="0.7" />

        {/* Person 2 */}
        <circle cx="30" cy="20" r="4" opacity="0.9" />
        <circle cx="30" cy="32" r="6" opacity="0.7" />

        {/* Person 3 (overlapping) */}
        <circle cx="24" cy="22" r="4" opacity="0.9" />
        <circle cx="24" cy="34" r="6" opacity="0.7" />
      </g>

      {/* Connection lines */}
      <g
        stroke="url(#collabGradient)"
        strokeWidth="1.5"
        opacity="0.5"
        strokeDasharray="2,2"
      >
        <line x1="20" y1="22" x2="22" y2="24" />
        <line x1="26" y1="24" x2="28" y2="22" />
      </g>

      {/* Collaboration indicator */}
      <circle cx="24" cy="16" r="2" fill="hsl(142, 71%, 45%)" opacity="0.8" />
    </svg>
  </div>
);
