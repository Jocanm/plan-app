import { ROUTES } from "@/lib/config/constants";
import { describe, expect, it, vi } from "vitest";
import { signOutUseCase } from "./use-cases";

describe("Auth - use cases", () => {
  describe("Auth - signout", () => {
    it("Should call signout with default values", async () => {
      const authRepoStub = {
        signOut: vi.fn(),
        signIn: vi.fn(),
      };

      await signOutUseCase(undefined, authRepoStub);

      expect(authRepoStub.signOut).toHaveBeenCalledTimes(1);
      expect(authRepoStub.signOut).toHaveBeenCalledWith({
        redirectTo: ROUTES.LOGIN,
      });
    });

    it("Should call signout with override values", async () => {
      const authRepoStub = {
        signOut: vi.fn(),
        signIn: vi.fn(),
      };

      await signOutUseCase({ redirectTo: "/custom" }, authRepoStub);

      expect(authRepoStub.signOut).toHaveBeenCalledWith({
        redirectTo: "/custom",
      });
    });
  });
});
