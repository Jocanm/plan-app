import { signIn as authJsSignIn, signOut as authJsSignOut } from "@/lib/auth";
import { IAuthRepository } from "../lib/types/auth";

export const authRepository: IAuthRepository = {
  async signIn(provider, options) {
    return authJsSignIn(provider, options);
  },
  async signOut(options) {
    return authJsSignOut(options);
  },
};
