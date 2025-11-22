import { Skeleton } from "@/components/ui/skeleton";
import { Main } from "@/shared/components/layout/main/Main";

const SKELETON_TASK_WIDTHS = ["w-2/3", "w-3/4", "w-1/2", "w-4/5"] as const;

const LoadingProject = () => {
  return (
    <Main>
      <div role="status" aria-label="Loading project">
        {/* Project Header Skeleton */}
        <div className="w-full mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Color indicator skeleton */}
            <Skeleton className="rounded-sm h-3 w-3 shrink-0" />
            {/* Project name skeleton */}
            <Skeleton className="h-8 w-30 xs:w-48 sm:w-64" />
          </div>
          <div className="flex items-center gap-2">
            {/* Edit button skeleton */}
            <Skeleton className="h-10 w-10 sm:w-24" />
            {/* Archive button skeleton */}
            <Skeleton className="h-10 w-10 sm:w-28" />
          </div>
        </div>

        {/* Tasks Section Skeleton */}
        <section className="mb-8">
          {/* TaskInputCard skeleton */}
          <div className="w-full p-4 rounded-2xl border border-border bg-card/50 shadow-sm border-l-[3px] border-l-muted">
            <div className="flex items-center gap-3.5">
              <div className="flex-1 relative">
                <div className="bg-background/60 rounded-xl px-4 py-3 border border-border/40">
                  <Skeleton className="h-6 w-full max-w-xs" />
                </div>
              </div>
              <Skeleton className="shrink-0 h-11 w-11 rounded-xl" />
            </div>
          </div>

          {/* Tasks heading skeleton */}
          <Skeleton className="h-7 w-32 mt-4" />

          {/* Task cards skeletons */}
          <ul className="space-y-4 mt-4">
            {[0, 1, 2, 3].map(index => (
              <li key={index}>
                <div className="p-4 border bg-card rounded-lg w-full text-card-foreground border-l-4 border-l-muted flex items-start gap-4">
                  {/* Checkbox skeleton */}
                  <div className="my-auto">
                    <Skeleton className="h-5 w-5 shrink-0 rounded-sm" />
                  </div>

                  {/* Task content skeleton */}
                  <div className="flex flex-col gap-2 flex-1">
                    {/* Title skeleton with varying widths */}
                    <Skeleton
                      className={`h-5 ${SKELETON_TASK_WIDTHS[index % SKELETON_TASK_WIDTHS.length]}`}
                    />
                    {/* Description skeleton - alternating presence for variety */}
                    {index % 2 === 0 && <Skeleton className="h-4 w-full" />}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Main>
  );
};

export default LoadingProject;
