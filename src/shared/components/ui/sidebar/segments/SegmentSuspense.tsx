import { Suspense } from "react";
import { BaseLoader } from "../../loaders/BaseLoader";

export const SegmentSuspense = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense fallback={<BaseLoader className="mx-auto" />}>
      {children}
    </Suspense>
  );
};
