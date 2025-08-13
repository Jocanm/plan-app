import { IAuthRepository } from "../domain/repositories/IAuthRepository";

interface SignOutRequest {
  authRepository: IAuthRepository;
}

export async function signOutUseCase({
  authRepository,
}: SignOutRequest): Promise<void> {
  await authRepository.signOut();
}
