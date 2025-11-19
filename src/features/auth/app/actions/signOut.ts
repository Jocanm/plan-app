"use server";

import { ROUTES } from "@/lib/config/constants";
import { logger } from "@/lib/logger";
import { DEFAULT_LOCALE } from "../../../i18n/domain/constants";
import { buildLocalizedRoute } from "../../../i18n/domain/utils";
import { authRepository } from "../../data/auth.repository";
import { AuthEvents } from "../../domain/events/catalog";
import { AuthOptions } from "../../domain/types";
import { signOutUseCase } from "../use-cases/authUseCases";

export const signOutAction = async (
  options?: AuthOptions,
  locale = DEFAULT_LOCALE
) => {
  const redirectTo = options?.redirectTo ?? ROUTES.LOGIN;
  const localizedRoute = buildLocalizedRoute(redirectTo, locale);

  try {
    await signOutUseCase({ redirectTo: localizedRoute }, authRepository);
    logger.info(
      { event: AuthEvents.signoutSuccess },
      "User signed out successfully"
    );
  } catch (error) {
    logger.error(
      { event: AuthEvents.signoutFail, error },
      "User sign out failed"
    );
    throw error;
  }
};
