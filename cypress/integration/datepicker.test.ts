import dayjs from "dayjs";

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
    dayjs(fromDate).startOf('day').toDate();
    dayjs(toDate).startOf('day').toDate();

    cy.intercept("GET", "/api/feedback*", []).as("feedback");
    const fromDateRegex = new RegExp(`\\s+${fromDate.getDate()}th`);
    const toDateRegex = new RegExp(`\\s+${toDate.getDate()}rd`);
    // Act
    cy.visit("/dashboard/summary");
    cy.wait('@feedback');
    cy.get("input[name=datepicker-input]").click();
    cy.findByRole("button", { name: fromDateRegex }).click();
    cy.findByRole("button", { name: toDateRegex }).click();

    // Assert
    cy.get("input[name=datepicker-input]").should('have.value', `${dayjs(fromDate).format("MM/DD/YYYY")} - ${dayjs(toDate).format("MM/DD/YYYY")}`);
  });
});
