import { ROUTES } from "../../../src/lib/constants/routes";

describe("Auth Cases", () => {
  describe("Unauthenticated User", () => {
    beforeEach(() => {
      cy.clearAllCookies();
      cy.clearAllLocalStorage();
    });
    it("Should redirect to login if NOT authenticated user is in private route", () => {
      cy.visit(ROUTES.HOME);
      cy.url().should("include", ROUTES.LOGIN);
    });
    it("Should allow NOT authenticated user to access public route", () => {
      cy.visit(ROUTES.LOGIN);
      cy.url().should("include", ROUTES.LOGIN);
    });
  });

  describe("Authenticated User", () => {});
});
