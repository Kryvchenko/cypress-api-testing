/// <reference types="cypress" />

describe("Get Request", () => {
  let result;
  it("Validate status code of the /post api", () => {
    result = cy.request("http://localhost:3000/posts");
    result.its("status").should("equal", 200);
  });

  it("Validate host/api contains correct key and values", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/posts",
      headers: {
        accept: "application/json"
      }
    }).then((response) => {
      let body = JSON.parse(JSON.stringify(response.body));
      cy.log(body);

      expect(body[0]).has.property("title", "json-server");
      expect(body[1]).has.property("author", "kryo");

      body.map((el) => {
        expect(el).to.have.all.keys("id", "title", "author");
        cy.log("Author: " + el["author"] + " Title: " + el["title"]);
      });
    });
  });
});
