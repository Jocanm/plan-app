import { Skeleton } from "@/components/ui/skeleton";

export const SideCalendarSkeleton = () => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 6); // 6am - 6pm

  return (
    <div className="bg-card shrink-0 py-5 h-full">
      <div className="h-full flex px-4">
        {/* Time Gutter */}
        <div className="w-14 flex flex-col gap-12 pt-8">
          {hours.map(hour => (
            <Skeleton key={hour} className="h-3 w-10" />
          ))}
        </div>

        {/* Calendar Area */}
        <div className="flex-1 relative border-l border-border/40">
          {/* Time slot lines */}
          <div className="absolute inset-0 flex flex-col">
            {hours.map(hour => (
              <div key={hour} className="flex-1 border-b border-border/20" />
            ))}
          </div>

          {/* Skeleton Events */}
          <div className="relative h-full px-3">
            {/* Event 1 - Morning */}
            <div className="absolute top-[10%] left-3 right-3">
              <Skeleton className="h-12 w-full rounded-md" />
            </div>

            {/* Event 2 - Mid-morning */}
            <div className="absolute top-[28%] left-3 right-3">
              <Skeleton className="h-16 w-4/5 rounded-md" />
            </div>

            {/* Event 3 - Afternoon */}
            <div className="absolute top-[52%] left-3 right-3">
              <Skeleton className="h-10 w-3/4 rounded-md" />
            </div>

            {/* Event 4 - Late afternoon */}
            <div className="absolute top-[72%] left-3 right-3">
              <Skeleton className="h-14 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
