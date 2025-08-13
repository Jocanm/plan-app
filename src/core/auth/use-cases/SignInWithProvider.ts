import {
  AuthOptions,
  AuthProvider,
  IAuthRepository,
} from "../domain/repositories/IAuthRepository";

interface SignInRequest {
  provider: AuthProvider;
  authRepository: IAuthRepository;
  options?: AuthOptions;
}

export async function signInWithProviderUseCase({
  provider,
  authRepository,
  options,
}: SignInRequest) {
  await authRepository.signIn(provider, options);
}
