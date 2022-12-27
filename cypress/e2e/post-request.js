/// <reference types="cypress" />

describe("Post Request", () => {
  let titleOfPosts = [];
  let randomTitle =
    Math.random().toString(36).substring(1) +
    Math.random().toString(36).substring(1);

  it("Create a new post via post api", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/posts",
      body: {
        title: randomTitle,
        author: "Sarah Jhons"
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it("Validate title of latest post", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/posts",
      headers: {
        accept: "application/json"
      }
    })
      .then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));
        body.map((el) => titleOfPosts.push(el["title"]));
        cy.log(titleOfPosts);
      })
      .then(() => {
        let titleRes = titleOfPosts[titleOfPosts.length - 1];
        expect(titleRes).to.eq(randomTitle);
      });
  });
});
