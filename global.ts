import { locales } from "@/features/i18n/domain/constants";
import messages from "./messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof messages;
  }
}
