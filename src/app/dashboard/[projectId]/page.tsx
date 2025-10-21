"use client";

import { usePathname } from "next/navigation";

const ProjectPage = () => {
  const pathname = usePathname();

  return <div>ProjectPage: {pathname}</div>;
};

export default ProjectPage;
