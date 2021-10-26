import { verify } from "cypress/types/sinon";
import data from "../fixtures/results.json";

describe("Results Page", () => {
  before(() => {
    cy.login();
  });
  beforeEach(() =>
    Cypress.Cookies.preserveOnce(
      "next-auth.session-token",
      "next-auth.csrf-token",
      "next-auth.callback-url"
    )
  );
  it("should show feedback in a table", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.wait(500);
    cy.findAllByRole("cell", { name: /happy times/i });
  });
  it("should allow global text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.findByLabelText(/search all columns/i).type("sad");
    cy.findByText(/happy/i).should("not.exist");
    cy.findAllByText(/sad times/i).should("be.visible");
  });
  it("should allow date text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");

    cy.findAllByRole("textbox").eq(2).type("29");
    cy.findByText(/28-09/i).should("not.exist");
    cy.findAllByText(/29-09/i).should("be.visible");
  });
  it("should allow comment text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");

    cy.findAllByRole("textbox").eq(3).type("happy");
    cy.findByText(/sad times/i).should("not.exist");
    cy.findByText(/neutral times/i).should("not.exist");
    cy.findAllByText(/happy times/i).should("be.visible");
  });
  it("should allow username text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");

    cy.findAllByRole("textbox").eq(4).type("zz");
    cy.findByText(/xx123456/i).should("not.exist");
    cy.findByText(/ab123456/i).should("not.exist");
    cy.findAllByText(/zz123456/i).should("be.visible");
  });
  it("should allow score range filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");

    cy.findAllByRole("spinbutton").eq(0).type("2");
    cy.findAllByRole("spinbutton").eq(1).type("4");

    cy.findByText(/sad times/i).should("not.exist");
    cy.findByText(/happy times/i).should("not.exist");
    cy.findAllByText(/neutral times/i).should("be.visible");
  });
  it("should allow address text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");

    cy.findAllByRole("textbox").eq(5).type("192");
    cy.findByText(/127.0.0.1/i).should("not.exist");
    cy.findByText(/10.131.0.1/i).should("not.exist");
    cy.findAllByText(/192.168.0.1/i).should("be.visible");
  });
  it("should show to maximum number of pages correctly and the 'previous' button should be disabled", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");

    cy.findByLabelText(/total and current pages/i).contains("2");
    cy.findByLabelText(/previous page/i).should('be.disabled')
  });
  it("should call the api with a skip value of 10 when the 'next' button is clicked and make the 'next' button disabled", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");

    cy.wait("@feedback").its("request.url").should("include", "0");
    cy.wait(500);

    cy.findByLabelText(/next page/i).click();

    cy.wait("@feedback").its("request.url").should("include", "10");
    cy.findByLabelText(/next page/i).should('be.disabled')
  });
  it("should disable the next button and display 'Page 1 of 1' when there are no results", () => {
    cy.intercept("GET", "/api/feedback*", []).as("feedback");
    cy.visit("/dashboard/results");

    cy.findByLabelText(/next page/i).should('be.disabled');
    cy.findByLabelText(/total and current pages/i).contains("1");
  });
});
