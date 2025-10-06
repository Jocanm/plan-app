"use server"

import { authRepository } from "../../data/auth";
import { AuthOptions, AuthProvider } from "../../lib/types/auth";
import { signInWithProviderUseCase, signOutUseCase } from "./use-cases";

export const signInAction = async (
  provider: AuthProvider,
  options?: AuthOptions
) => {
  await signInWithProviderUseCase(provider, options, authRepository);
};

export const signOutAction = async (
  options?: AuthOptions
) => {
  await signOutUseCase(options, authRepository);
};