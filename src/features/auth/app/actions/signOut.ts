"use server";

import { ROUTES } from "@/lib/config/constants";
import { DEFAULT_LOCALE } from "../../../i18n/domain/constants";
import { buildLocalizedRoute } from "../../../i18n/domain/utils";
import { authRepository } from "../../data/auth.repository";
import { AuthOptions } from "../../domain/types";
import { signOutUseCase } from "../use-cases/authUseCases";

export const signOutAction = async (
  options?: AuthOptions,
  locale = DEFAULT_LOCALE
) => {
  const redirectTo = options?.redirectTo ?? ROUTES.LOGIN;
  const localizedRoute = buildLocalizedRoute(redirectTo, locale);

  await signOutUseCase(
    {
      redirectTo: localizedRoute,
    },
    authRepository
  );
};
