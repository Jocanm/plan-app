"use server";

import {
  AuthOptions,
  AuthProvider,
} from "@/core/auth/domain/repositories/IAuthRepository";
import { authJsRepository } from "@/core/auth/infrastructure/AuthJsRepository";
import { signInWithProviderUseCase } from "@/core/auth/use-cases/SignInWithProvider";
import { signOutUseCase } from "@/core/auth/use-cases/SignOut";

export async function signInAction(
  provider: AuthProvider,
  options?: AuthOptions
) {
  await signInWithProviderUseCase({
    provider,
    authRepository: authJsRepository,
    options,
  });
}

export async function signOutAction(options?: AuthOptions) {
  await signOutUseCase({
    authRepository: authJsRepository,
    options,
  });
}
