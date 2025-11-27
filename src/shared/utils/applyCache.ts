import { env } from "@/lib/env";
import {
  cacheLife as nextCacheLife,
  cacheTag as nextCacheTag,
} from "next/cache";

const IS_TEST_MODE = env.APP_TEST;

type NextCacheProfile = Parameters<typeof nextCacheLife>[0];
export type CacheProfile =
  | "default"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "max"
  | NextCacheProfile;

export interface CacheBehavior {
  tags: string[];
  profile: CacheProfile;
}

export const applyCacheBehavior = (behavior: CacheBehavior): void => {
  if (IS_TEST_MODE) {
    nextCacheLife({ stale: 0, revalidate: 0, expire: 0 });
  } else {
    nextCacheTag(...behavior.tags);
    nextCacheLife(behavior.profile as NextCacheProfile);
  }
};
