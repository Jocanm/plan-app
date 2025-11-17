import prisma from "@/lib/prisma";
import { ITaskRepository } from "../domain/types/repository";

export const createTask: ITaskRepository["createTask"] = async data => {
  const taskCreated = await prisma.task.create({ data });

  return taskCreated;
};
