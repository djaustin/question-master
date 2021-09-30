describe("Results Page", () => {
      it("view feedback in a table", () => {
        cy.intercept("GET", "/api/feedback", [{"id":1,"score":5,"username":"xx123456","comment":"sad times","createdAt":"2021-09-28T15:02:25.935Z","updatedAt":"2021-09-28T15:02:36.567Z"},{"id":2,"score":3,"username":"","comment":"happy times","createdAt":"2021-09-28T15:02:52.674Z","updatedAt":"2021-09-28T15:02:52.673Z"},{"id":3,"score":5,"username":"","comment":"","createdAt":"2021-09-28T15:02:54.611Z","updatedAt":"2021-09-28T15:02:54.611Z"}]).as("feedback");
        cy.visit('/results')
        cy.findByRole('cell', {name: /happy times/i})
      });
  });