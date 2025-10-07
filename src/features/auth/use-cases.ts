import {
  type AuthOptions,
  type AuthProvider,
  type IAuthRepository,
} from "../../lib/types/auth";

export async function signInWithProviderUseCase(
  provider: AuthProvider,
  options: AuthOptions | undefined,
  repo: IAuthRepository
) {
  await repo.signIn(provider, options);
}

export async function signOutUseCase(
  options: AuthOptions | undefined,
  repo: IAuthRepository
) {
  await repo.signOut(options);
}
