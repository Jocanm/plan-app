import messages from "./messages/en.json";
import { locales } from "./src/lib/constants/locale";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof messages;
  }
}
