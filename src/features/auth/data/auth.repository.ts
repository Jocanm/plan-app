import {
  auth,
  signIn as authJsSignIn,
  signOut as authJsSignOut,
} from "@/lib/auth";
import { IAuthRepository } from "../domain/types";

const signIn: IAuthRepository["signIn"] = (provider, options) => {
  return authJsSignIn(provider, options);
};

const signOut: IAuthRepository["signOut"] = options => {
  return authJsSignOut(options);
};

const getCurrentUser: IAuthRepository["getCurrentUser"] = async () => {
  const session = await auth();
  return session?.user ?? null;
};

export const authRepository: IAuthRepository = {
  signIn,
  signOut,
  getCurrentUser,
};
