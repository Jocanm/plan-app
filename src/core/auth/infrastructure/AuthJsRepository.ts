import { signIn, signOut } from "@/lib/auth";
import {
  type AuthProvider,
  type IAuthRepository,
} from "../domain/repositories/IAuthRepository";

export const authJsRepository: IAuthRepository = {
  async signIn(provider: AuthProvider) {
    await signIn(provider);
  },
  async signOut() {
    await signOut();
  },
};
