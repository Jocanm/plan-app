"use server";

import { ROUTES } from "@/constants/routes";
import { signOut as authSignOut } from "@/lib/auth";

export const signOut = async () => {
  await authSignOut({
    redirectTo: ROUTES.LOGIN,
  });
};
