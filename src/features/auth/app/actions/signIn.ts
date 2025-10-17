"use server";

import { authRepository } from "../../data/auth";
import { AuthOptions, AuthProvider } from "../../domain/types";
import { signInWithProviderUseCase } from "../use-cases/authUseCases";

export const signInAction = async (
  provider: AuthProvider,
  options?: AuthOptions
) => {
  await signInWithProviderUseCase(provider, options, authRepository);
};
