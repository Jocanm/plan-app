import { ROUTES } from "../../../src/lib/config/constants";
import { withLocale } from "../../utils/navigation.utils";

describe("Auth tests", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });

  describe("Middleware behavior", () => {
    it("Should redirect to login if NOT authenticated user is in private route", () => {
      cy.visit(withLocale(ROUTES.DASHBOARD));
      cy.url().should("include", withLocale(ROUTES.LOGIN));
    });

    it("Should allow NOT authenticated user to access public route", () => {
      cy.visit(withLocale(ROUTES.LOGIN));
      cy.url().should("include", withLocale(ROUTES.LOGIN));
    });

    it("Should NOT allow authenticated users to access auth pages", () => {
      cy.login("password");
      cy.visit(withLocale(ROUTES.LOGIN));

      cy.url().should("not.contain", withLocale(ROUTES.LOGIN));
    });

    it("Should allow authenticated user to access private routes", () => {
      cy.login("password");
      cy.visit(withLocale(ROUTES.DASHBOARD));

      cy.location("pathname").should("contain", withLocale(ROUTES.DASHBOARD));
    });
  });

  describe("Sign out", () => {
    it("Should take the user to login after he pressed logout button", () => {
      cy.login("password");

      cy.getByTestId("signout-button").click();
      cy.location("pathname").should("contain", withLocale(ROUTES.LOGIN));
    });
  });
});
