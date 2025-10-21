import { ROUTES } from "@/lib/config/constants";
import { describe, expect, it, vi } from "vitest";
import { signInWithProviderUseCase, signOutUseCase } from "./authUseCases";

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

  describe("Auth - signin", () => {
    it("Should redirect to dashboard page by default after signin", async () => {
      const authRepoStub = {
        signOut: vi.fn(),
        signIn: vi.fn(),
      };

      await signInWithProviderUseCase("github", undefined, authRepoStub);

      expect(authRepoStub.signIn).toHaveBeenCalledWith("github", {
        redirectTo: ROUTES.DASHBOARD,
      });
    });

    it("Should be able to redirect to custom page after signin", async () => {
      const authRepoStub = {
        signOut: vi.fn(),
        signIn: vi.fn(),
      };

      await signInWithProviderUseCase(
        "github",
        {
          redirectTo: "custom",
        },
        authRepoStub
      );

      expect(authRepoStub.signIn).toHaveBeenCalledWith("github", {
        redirectTo: "custom",
      });
    });
  });
});
