import {
  AuthProvider,
  IAuthRepository,
} from "../domain/repositories/IAuthRepository";

interface SignInRequest {
  provider: AuthProvider;
  authRepository: IAuthRepository;
}

export async function signInWithProviderUseCase({
  provider,
  authRepository,
}: SignInRequest) {
  await authRepository.signIn(provider);
}
