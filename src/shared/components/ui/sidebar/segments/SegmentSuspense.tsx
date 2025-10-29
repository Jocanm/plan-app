import { Suspense } from "react";
import { NavigationSkeleton } from "../skeletons/NavigationSkeleton";

export const SegmentSuspense = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Suspense fallback={<NavigationSkeleton />}>{children}</Suspense>;
};
