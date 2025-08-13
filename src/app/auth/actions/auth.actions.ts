"use server";

import { AuthProvider } from "@/core/auth/domain/repositories/IAuthRepository";
import { authJsRepository } from "@/core/auth/infrastructure/AuthJsRepository";
import { signInWithProviderUseCase } from "@/core/auth/use-cases/SignInWithProvider";
import { signOutUseCase } from "@/core/auth/use-cases/SignOut";

export async function signInAction(provider: AuthProvider) {
  await signInWithProviderUseCase({
    provider,
    authRepository: authJsRepository,
  });
}

export async function signOutAction() {
  await signOutUseCase({
    authRepository: authJsRepository,
  });
}
