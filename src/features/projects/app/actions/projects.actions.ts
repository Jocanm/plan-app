"use server";

import { auth } from "@/lib/auth";
import { projectsRepository } from "../../data/projects.repository";
import { projectsUseCases } from "../use-cases/projectsUseCases";

export const getProjectsForSidebar = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthenticated exception");
  }

  return await projectsUseCases.getProjectsForSidebar({
    userId: session.user.id,
    repo: projectsRepository,
  });
};
