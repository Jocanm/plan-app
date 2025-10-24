import {
  type AuthOptions,
  type AuthProvider,
  type IAuthRepository,
} from "@/features/auth/domain/types";
import { ROUTES } from "@/lib/config/constants";

export async function signInWithProviderUseCase(
  provider: AuthProvider,
  options: AuthOptions | undefined,
  repo: IAuthRepository
) {
  const defaultOptions: AuthOptions = {
    redirectTo: ROUTES.DASHBOARD,
    ...options,
  };
  await repo.signIn(provider, defaultOptions);
}

export async function signOutUseCase(
  options: AuthOptions | undefined,
  repo: IAuthRepository
) {
  const defaultOptions: AuthOptions = {
    redirectTo: ROUTES.LOGIN,
    ...options,
  };
  await repo.signOut(defaultOptions);
}

export const getCurrentUserUseCase = async (repo: IAuthRepository) => {
  const currentUser = await repo.getCurrentUser();
  if (!currentUser) throw new Error();

  return currentUser;
};
