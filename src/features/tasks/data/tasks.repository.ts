import prisma from "@/lib/prisma";
import { ITaskRepository } from "../domain/types/repository";

export const createTask: ITaskRepository["createTask"] = async data => {
  return await prisma.task.create({ data });
};
