import { ROUTES } from "../../../src/lib/config/constants";

describe("Auth tests", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });

  describe("Middleware behavior", () => {
    it("Should redirect to login if NOT authenticated user is in private route", () => {
      cy.visit(ROUTES.HOME);
      cy.url().should("include", ROUTES.LOGIN);
    });

    it("Should allow NOT authenticated user to access public route", () => {
      cy.visit(ROUTES.LOGIN);
      cy.url().should("include", ROUTES.LOGIN);
    });

    it("Should NOT allow authenticated users to access auth pages", () => {
      cy.login("password");
      cy.visit(ROUTES.LOGIN);

      cy.url().should("not.contain", ROUTES.LOGIN);
    });

    it("Should allow authenticated user to access private routes", () => {
      cy.login("password");
      cy.visit(ROUTES.HOME);

      cy.location("pathname").should("equal", ROUTES.HOME);
    });
  });

  describe("Sign out", () => {
    it("Should redirect to login when sign out button is pressed", () => {
      cy.login("password");
      cy.getByTestId("sign-out-button").should("be.visible").click();

      cy.location("pathname").should("equal", ROUTES.LOGIN);
    });
  });

  describe("Login", () => {
    it("Should redirect to error page if there was an error redirection and append error to url", () => {
      const CUSTOM_ERROR = "customError";

      cy.visit(ROUTES.LOGIN, {
        qs: { error: CUSTOM_ERROR },
      });

      cy.location().should(loc => {
        expect(loc.pathname).equal(ROUTES.ERROR);
        expect(loc.search).contain(`error=${CUSTOM_ERROR}`);
      });
    });
  });
});
