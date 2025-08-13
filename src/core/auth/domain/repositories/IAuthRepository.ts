export type AuthProvider = "google" | "github";

export interface IAuthRepository {
  signIn(provider: AuthProvider): Promise<void>;
  signOut(): Promise<void>;
}
