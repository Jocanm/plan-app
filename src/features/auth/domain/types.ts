export type AuthProvider = "google" | "github";

export interface AuthOptions {
  redirectTo?: string;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface IAuthRepository {
  signIn(provider: AuthProvider, options?: AuthOptions): Promise<void>;
  signOut(options?: AuthOptions): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
