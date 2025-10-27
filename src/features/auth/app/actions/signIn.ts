"use server";

import { ROUTES } from "@/lib/config/constants";
import { DEFAULT_LOCALE } from "../../../i18n/domain/constants";
import { buildLocalizedRoute } from "../../../i18n/domain/utils";
import { authRepository } from "../../data/auth.repository";
import { AuthOptions, AuthProvider } from "../../domain/types";
import { signInWithProviderUseCase } from "../use-cases/authUseCases";

export const signInAction = async (
  provider: AuthProvider,
  options?: AuthOptions,
  locale = DEFAULT_LOCALE
) => {
  const redirectTo = options?.redirectTo ?? ROUTES.DASHBOARD;
  const localizedRoute = buildLocalizedRoute(redirectTo, locale);

  await signInWithProviderUseCase(
    provider,
    {
      redirectTo: localizedRoute,
    },
    authRepository
  );
};
