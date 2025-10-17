"use server";

import { authRepository } from "../../data/auth";
import { AuthOptions } from "../../domain/types";
import { signOutUseCase } from "../use-cases/authUseCases";

export const signOutAction = async (options?: AuthOptions) => {
  await signOutUseCase(options, authRepository);
};
