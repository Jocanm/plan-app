import {
  AuthOptions,
  IAuthRepository,
} from "../domain/repositories/IAuthRepository";

interface SignOutRequest {
  options?: AuthOptions;
  authRepository: IAuthRepository;
}

export async function signOutUseCase({
  authRepository,
  options,
}: SignOutRequest): Promise<void> {
  await authRepository.signOut(options);
}
