export const NavigationSkeleton = () => {
  return (
    <div className="space-y-2" aria-hidden="true">
      <div className="h-8 bg-muted rounded animate-pulse" />
      <div className="h-8 bg-muted rounded animate-pulse" />
      <div className="h-8 bg-muted rounded animate-pulse" />
    </div>
  );
};
