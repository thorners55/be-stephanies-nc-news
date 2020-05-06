process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app.js");
const knex = require("../db/connection.js");

afterAll(() => knex.destroy());

describe("app", () => {
  describe("/api", () => {
    describe("/topics", () => {
      describe("/GET", () => {
        test("responds with status 200", () => {
          return request(app).get("/api/topics").expect(200);
        });
        test("responds with an array of objects", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              const testingProperties = body.filter((object) => {
                return object === Object(object);
              });
              expect(Array.isArray(body)).toBe(true);
              expect(testingProperties.length).toBe(3);
            });
        });
        test("response array elements have properties of description and slug and value is NOT null", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              body.forEach((topic) => {
                expect(topic).toHaveProperty("slug");
                expect(topic).toHaveProperty("description");
              });
            });
        });
      });
    });
    describe("/users/:username", () => {
      describe("GET", () => {
        test("status 200", () => {
          return request(app).get("/api/users/lurker").expect(200);
        });
        test("responds with an object with properties of username, avatar_url, and name", () => {
          return request(app)
            .get("/api/users/lurker")
            .expect(200)
            .then(({ body }) => {
              expect(body).toHaveProperty("username", "lurker");
              expect(body).toHaveProperty("avatar_url");
              expect(body).toHaveProperty("name");
            });
        });
      });
    });
    describe.only("/articles", () => {
      describe("GET", () => {
        test("status 200", () => {
          return request(app).get("/api/articles").expect(200);
        });
        test("responds with an array of objects", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              const testingProperties = body.filter((object) => {
                return object === Object(object);
              });
              expect(Array.isArray(body)).toBe(true);
              expect(testingProperties.length).toBe(12);
            });
        });
        test("response array elements have properties of *** and value is NOT null", () => {});
      });
    });
  });
});

// NEED TO REFACTOR TOPICS TEST TO TEST NOT NULL, THEN CONTINUE WITH ARTICLES TESTING
