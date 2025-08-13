export type AuthProvider = "google" | "github";

export interface AuthOptions {
  redirectTo?: string;
}

export interface IAuthRepository {
  signIn(provider: AuthProvider, options?: AuthOptions): Promise<void>;
  signOut(options?: AuthOptions): Promise<void>;
}
