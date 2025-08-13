import { signIn, signOut } from "@/lib/auth";
import { type IAuthRepository } from "../domain/repositories/IAuthRepository";

export const authJsRepository: IAuthRepository = {
  async signIn(provider, options) {
    await signIn(provider, options);
  },
  async signOut(options) {
    await signOut(options);
  },
};
