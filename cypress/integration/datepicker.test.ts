import setToStartOfDay from "../fixtures/feedbackAssets";

describe("Date Picker on Summary Page", () => {
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
  it("should persist the date in the date picker", () => {
    // Arrange
    const fromDate = new Date();
    const toDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear(), fromDate.getMonth(), 14);
    toDate.setFullYear(toDate.getFullYear(), toDate.getMonth(), 23);
    setToStartOfDay(fromDate);
    setToStartOfDay(toDate);

    cy.intercept("GET", "/api/feedback*", []).as("feedback");
    const expectedQuery = [fromDate, toDate]
      .map((date) => date.toISOString())
      .join(",");
    const fromDateRegex = new RegExp(`\\s+${fromDate.getDate()}th`);
    const toDateRegex = new RegExp(`\\s+${toDate.getDate()}rd`);
    // Act
    cy.visit("/dashboard/summary");
    cy.findByRole("textbox").eq(0).click();
    cy.findByRole("button", { name: fromDateRegex }).click();
    cy.findByRole("button", { name: toDateRegex }).click();

    // Assert
    cy.findByRole("textbox").contains(`${fromDate.getDate()} - ${toDate.getDate()}`);
  });
});
