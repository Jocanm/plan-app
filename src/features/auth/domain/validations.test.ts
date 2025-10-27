import { describe, expect, it } from "vitest";
import { getAuthRedirect, isPublicRoute } from "./validations";

describe("Auth - Validations", () => {
  describe("Public Routes", () => {
    it("Should return true if route contains auth path (with locale)", () => {
      const ROUTE_EN = "/en/auth/login";
      const ROUTE_ES = "/es/auth/error";

      const isPublicEn = isPublicRoute(ROUTE_EN);
      const isPublicEs = isPublicRoute(ROUTE_ES);

      expect(isPublicEn).toBe(true);
      expect(isPublicEs).toBe(true);
    });

    it("Should return false for private routes (with locale)", () => {
      const ROUTE_DASHBOARD = "/en/dashboard";
      const ROUTE_PROJECT = "/es/dashboard/project-123";
      const HOMEPAGE_ROUTE = "/en";

      const isDashboardPublic = isPublicRoute(ROUTE_DASHBOARD);
      const isProjectPublic = isPublicRoute(ROUTE_PROJECT);
      const isPublicHomePage = isPublicRoute(HOMEPAGE_ROUTE);

      expect(isDashboardPublic).toBe(false);
      expect(isProjectPublic).toBe(false);
      expect(isPublicHomePage).toBe(false);
    });

    it("should return false for /authentication (with locale)", () => {
      const ROUTE = "/en/authentication/login";

      const isPublic = isPublicRoute(ROUTE);

      expect(isPublic).toBe(false);
    });
  });

  describe("Routes redirection", () => {
    it("Should redirect to login (with locale) if NOT authenticated user is in private route", () => {
      const redirectResponseEn = getAuthRedirect({
        isLoggedIn: false,
        pathname: "/en/dashboard",
      });
      const redirectResponseEs = getAuthRedirect({
        isLoggedIn: false,
        pathname: "/es/dashboard/project-123",
      });

      expect(redirectResponseEn).toEqual({
        shouldRedirect: true,
        redirectTo: "/en/auth/login",
      });
      expect(redirectResponseEs).toEqual({
        shouldRedirect: true,
        redirectTo: "/es/auth/login",
      });
    });

    it("Should NOT redirect if NOT authenticated user is in public route", () => {
      const redirectResponseEn = getAuthRedirect({
        isLoggedIn: false,
        pathname: "/en/auth/login",
      });
      const redirectResponseEs = getAuthRedirect({
        isLoggedIn: false,
        pathname: "/es/auth/error",
      });

      expect(redirectResponseEn).toEqual({
        shouldRedirect: false,
      });
      expect(redirectResponseEs).toEqual({
        shouldRedirect: false,
      });
    });

    it("Should NOT redirect if authenticated user is in private route", () => {
      const redirectResponseEn = getAuthRedirect({
        isLoggedIn: true,
        pathname: "/en/dashboard",
      });
      const redirectResponseEs = getAuthRedirect({
        isLoggedIn: true,
        pathname: "/es/design-system",
      });

      expect(redirectResponseEn).toEqual({
        shouldRedirect: false,
      });
      expect(redirectResponseEs).toEqual({
        shouldRedirect: false,
      });
    });

    it("Should redirect to dashboard (with locale) if authenticated user is in auth route", () => {
      const redirectResponseEn = getAuthRedirect({
        isLoggedIn: true,
        pathname: "/en/auth/login",
      });
      const redirectResponseEs = getAuthRedirect({
        isLoggedIn: true,
        pathname: "/es/auth/error",
      });

      expect(redirectResponseEn).toEqual({
        shouldRedirect: true,
        redirectTo: "/en/dashboard",
      });
      expect(redirectResponseEs).toEqual({
        shouldRedirect: true,
        redirectTo: "/es/dashboard",
      });
    });
  });
});
