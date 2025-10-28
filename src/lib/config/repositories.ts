import { env } from "../env";

export const repositoryConfig = {
  isTest: !!env.APP_TEST,
};
