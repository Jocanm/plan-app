import {
  auth,
  signIn as authJsSignIn,
  signOut as authJsSignOut,
} from "@/lib/auth";
import { IAuthRepository } from "../domain/types";

const signIn: IAuthRepository["signIn"] = (provider, options) => {
  console.log({ options });
  return authJsSignIn(provider, options);
};

const signOut: IAuthRepository["signOut"] = options => {
  console.log({ options });
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
