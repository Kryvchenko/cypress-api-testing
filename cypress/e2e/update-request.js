/// <reference types="cypress" />

describe("Update Request", () => {
  it("Update existing post via post api", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:3000/posts/2",
      body: {
        title: "What can I do with her?",
        author: "Tom Colins"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
