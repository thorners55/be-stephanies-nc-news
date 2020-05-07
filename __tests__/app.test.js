process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app.js");
const knex = require("../db/connection.js");

beforeEach(() => knex.seed.run());
afterAll(() => knex.destroy());

describe("app", () => {
  describe("/api", () => {
    describe("/topics", () => {
      describe("/GET", () => {
        test("responds with status 200", () => {
          return request(app).get("/api/topics").expect(200);
        });
        test("responds with an object with a key of topic, value is array", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              console.log(body);
              expect(Array.isArray(body.topics)).toBe(true);
            });
        });
        test("response topic objects have properties of keys and slugs", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              console.log(body.topics);
              const correctProperties = body.topics.forEach((object) => {
                expect(object).toHaveProperty("slug");
                expect(object).toHaveProperty("description");
              });
            });
        });
      });
      describe("Error handling", () => {
        test("status 404: unsupported /api route", () => {
          return request(app)
            .get("/api/mushrooms")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toBe("404 Bad Request: Route not found");
            });
        });
        test("status 404: unsupported / route", () => {
          return request(app)
            .get("/mushrooms")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toBe("404 Bad Request: Route not found");
            });
        });
        test("status 405: unsupported HTTP method", () => {
          return request(app)
            .post("/api/topics")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).toBe("405 Bad Request: Method Not Allowed");
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
              console.log(body, "<-----");
              expect(body.user).toHaveProperty("username", "lurker");
              expect(body.user).toHaveProperty("avatar_url");
              expect(body.user).toHaveProperty("name");
            });
        });
      });
      describe("Error handling", () => {
        test("status 404: request for invalid username", () => {
          return request(app)
            .get("/api/users/userDoesNotExist")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe("404 Bad Request: username does not exist");
            });
        });
        test("status 405: unsupported HTTP method", () => {
          return request(app)
            .post("/api/users/userDoesNotExist")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).toBe("405 Bad Request: Method Not Allowed");
            });
        });
      });
    });
    describe("/articles", () => {
      describe("/:article_id", () => {
        describe("POST", () => {
          test("status 201: posts a comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge", body: "This is a comment" })
              .expect(201);
          });
          test("status 201: has posted correct values of username and body onto comment and returns comment object", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge", body: "This is a comment" })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment.author).toBe("butter_bridge");
                expect(body.comment.body).toBe("This is a comment");
                expect(body.comment.article_id).toBe(1);
              });
          });
          describe("POST Error handling", () => {
            test("status 422: Could not find article id", () => {
              return request(app)
                .post("/api/articles/50000/comments")
                .send({ username: "butter_bridge", body: "This is a comment" })
                .expect(422)
                .then(({ body }) => {
                  expect(body.msg).toBe("article id does not exist");
                });
            });
            test("status 422: Username does not exist", () => {
              return request(app)
                .post("/api/articles/50000/comments")
                .send({ username: "IRUser", body: "This is a comment" })
                .expect(422)
                .then(({ body }) => {
                  expect(body.msg).toBe("username does not exist");
                });
            });
          });
        });
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
        describe("PATCH", () => {
          test("status 200: responds with an object with property article, value is an object", () => {
            return request(app)
              .patch("/api/articles/2")
              .send({ inc_votes: 5 })
              .expect(200)
              .then(({ body }) => {
                console.log(body);
                expect(Array.isArray(body.article)).toBe(true);
                expect(body.article[0]).toHaveProperty("article_id");
              });
          });
          test("status 200: update votes on an article", () => {
            return request(app)
              .patch("/api/articles/2")
              .send({ inc_votes: 5 })
              .expect(200)
              .then(({ body }) => {
                console.log(body);
                expect(body.article[0].votes).toBe(5);
                expect(body.article[0].article_id).toBe(2);
              });
          });
          test("status 200: update votes by negative number on an article", () => {
            return request(app)
              .patch("/api/articles/4")
              .send({ inc_votes: -5 })
              .expect(200)
              .then(({ body }) => {
                expect(body.article[0].votes).toBe(-5);
                expect(body.article[0].article_id).toBe(4);
              });
          });
        });
        describe("Error handling", () => {
          test("status 400: article_id requested does not exist", () => {
            return request(app)
              .get("/api/articles/666")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe(
                  "400 Bad Request: article does not exist"
                );
              });
          });
          test("status 400: bad article_id", () => {
            return request(app)
              .get("/api/articles/anArticle")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe(
                  "400 Bad Request: Cannot access information - invalid input"
                );
              });
          });
          test("status 405: unsupported HTTP method", () => {
            return request(app)
              .post("/api/articles/newId")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).toBe("405 Bad Request: Method Not Allowed");
              });
          });
        });
      });
      xdescribe("GET", () => {
        test("status 200", () => {
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
