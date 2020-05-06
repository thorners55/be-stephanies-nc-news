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
        test("response array elements have properties of description and slug", () => {
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
      describe("Error handling", () => {
        test("status 404: unsupported /api route", () => {
          return request(app)
            .get("/api/mushrooms")
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toBe("400 Bad Request: Route not found");
            });
        });
        test("status 404: unsupported / route", () => {
          return request(app)
            .get("/mushrooms")
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toBe("400 Bad Request: Route not found");
            });
        });
        test("status 405: unsupported HTTP method", () => {
          return request(app).post("/api/topics").expect(405);
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
              console.log(body, "<-----");
              expect(body).toHaveProperty("username", "lurker");
              expect(body).toHaveProperty("avatar_url");
              expect(body).toHaveProperty("name");
            });
        });
      });
      describe("Error handling", () => {
        test("status 400: request for invalid username", () => {
          return request(app)
            .get("/api/users/hubbubofcheeps")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("400 Bad Request: username does not exist");
            });
        });
      });
    });
    describe("/articles", () => {
      describe("/:article_id", () => {
        describe("GET", () => {
          test("status 200: responds with relevent article object with a comment count property", () => {
            return request(app)
              .get("/api/articles/1")
              .expect(200)
              .then(({ body }) => {
                expect(body.article_id).toBe(1);
                expect(body).toHaveProperty("comment_count");
                expect(body).toEqual({
                  article_id: 1,
                  title: "Living in the shadow of a great man",
                  body: "I find this existence challenging",
                  votes: 100,
                  topic: "mitch",
                  author: "butter_bridge",
                  created_at: "2018-11-15T12:21:54.171Z",
                  comment_count: "13",
                });
              });
          });
          test("status 200: will respond with comment count of 0 if there are no comments", () => {
            return request(app)
              .get("/api/articles/2")
              .expect(200)
              .then(({ body }) => {
                expect(body.article_id).toBe(2);
                expect(body.comment_count).toBe("0");
              });
          });
        });
      });
      describe("GET", () => {
        xtest("status 200", () => {
          return request(app).get("/api/articles").expect(200);
        });
        xtest("responds with an array of objects", () => {
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
        xtest("response array elements have properties of author, title, article_id, topic, created_at, votes, comment_count ", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              body.forEach((article) => {
                expect(article).toHaveProperty("author");
                expect(article).toHaveProperty("title");
                expect(article).toHaveProperty("article_id");
                expect(article).toHaveProperty("topic");
                expect(article).toHaveProperty("title");
                expect(article).toHaveProperty("created_at");
                expect(article).toHaveProperty("votes");
                expect(article).toHaveProperty("comment_count");
              });
            });
        });
      });
    });
  });
});