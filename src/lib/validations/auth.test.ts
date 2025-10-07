import { ROUTES } from "../constants/routes"
import { getAuthRedirect, isPublicRoute } from "./auth"

describe("Auth - Validations", () => {
  describe('Public Routes', () => {
    it("Should return true if route contains auth path", () => {
      const ROUTE = "/auth/**"

      const isPublic = isPublicRoute(ROUTE)

      expect(isPublic).toBe(true)
    })

    it("Should return false for private routes", () => {
      const ROUTE_1 = "/dash/**"
      const HOMEPAGE_ROUTE = "/"

      const isPublic = isPublicRoute(ROUTE_1)
      const isPublicHomePage = isPublicRoute(HOMEPAGE_ROUTE)

      expect(isPublic).toBe(false);
      expect(isPublicHomePage).toBe(false);
    })

    it('should return false for /authentication', () => {
      const ROUTE = "/authentication/**"

      const isPublic = isPublicRoute(ROUTE)

      expect(isPublic).toBe(false);
    });
  })

  describe('Routes redirection', () => {
    it("Should redirect to login if NOT authenticated user is in private route", () => {
      const redirectResponse = getAuthRedirect({
        isLoggedIn: false,
        pathname: ROUTES.HOME
      })

      expect(redirectResponse).toEqual({
        shouldRedirect: true,
        redirectTo: ROUTES.LOGIN
      })
    })
    it("Should NOT redirect if NOT authenticated user is in public route", () => {
      const redirectResponse = getAuthRedirect({
        isLoggedIn: false,
        pathname: ROUTES.LOGIN
      })

      expect(redirectResponse).toEqual({
        shouldRedirect: false
      })
    })
    it("Should NOT redirect if authenticated user is in private route", () => {
      const redirectResponse = getAuthRedirect({
        isLoggedIn: true,
        pathname: ROUTES.HOME
      })

      expect(redirectResponse).toEqual({
        shouldRedirect: false
      })
    })
    it("Should redirect to home if authenticated user is in auth route", () => {
      const redirectResponse = getAuthRedirect({
        isLoggedIn: true,
        pathname: ROUTES.LOGIN
      })

      expect(redirectResponse).toEqual({
        shouldRedirect: true,
        redirectTo: ROUTES.HOME
      })
    })
  })
})