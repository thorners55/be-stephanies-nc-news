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
      describe("GET /api/topics Error handling", () => {
        test("status 404: unsupported /api route", () => {
          return request(app)
            .get("/api/mushrooms")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toBe("404 Bad Request: Not found");
            });
        });
        test("status 404: unsupported / route", () => {
          return request(app)
            .get("/mushrooms")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toBe("404 Bad Request: Not found");
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
      describe("GET /users/:username Error handling", () => {
        test("status 404: request for invalid username", () => {
          return request(app)
            .get("/api/users/userDoesNotExist")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe("Username not found");
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
        describe("/:article_id/comments", () => {
          describe("GET", () => {
            test("status 200: article exists but has no comments", () => {
              return request(app)
                .get("/api/articles/2/comments")
                .expect(200)
                .then(({ body }) => {
                  console.log(body);
                  expect(body.comments).toEqual([]);
                });
            });
            test("status 200: returns an object with key comments, value is an array", () => {
              return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body }) => {
                  console.log(body);
                  expect(Array.isArray(body.comments)).toBe(true);
                });
            });
            test("status 200: each comment (response array element object) has correct properties", () => {
              return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body }) => {
                  const comments = body.comments.forEach((comment) => {
                    expect(comment).toHaveProperty("comment_id");
                    expect(comment).toHaveProperty("author");
                    expect(comment.article_id).toBe(1);
                    expect(comment).toHaveProperty("votes");
                    expect(comment).toHaveProperty("body");
                  });
                });
            });
            test("status 200: comment object values are not null", () => {
              return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body }) => {
                  const comments = body.comments.forEach((comment) => {
                    expect(comment.article_id).not.toBeFalsy();
                    expect(comment.author).not.toBeFalsy();
                    expect(comment.body).not.toBeFalsy();
                    expect(comment.votes).not.toBe(null);
                  });
                });
            });
            test("status 200: QUERY - sorts comments by created_at in descending order by default", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=created_at")
                .expect(200)
                .then(({ body }) => {
                  console.log(body.comments);
                  expect(body.comments).toBeSortedBy("created_at", {
                    descending: true,
                  });
                });
            });
            test("status 200: QUERY - sorts comments by any valid column in descending order by default", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=author")
                .expect(200)
                .then(({ body }) => {
                  console.log(body.comments);
                  expect(body.comments).toBeSortedBy("author", {
                    descending: true,
                  });
                });
            });
            test("status 200: QUERY - sorts comments by any valid column in descending order by default", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=comment_id")
                .expect(200)
                .then(({ body }) => {
                  console.log(body.comments);
                  expect(body.comments).toBeSortedBy("comment_id", {
                    descending: true,
                  });
                });
            });
            test("status 200: QUERY - sorts comments by any valid column in descending order by default", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=comment_id")
                .expect(200)
                .then(({ body }) => {
                  console.log(body.comments);
                  expect(body.comments).toBeSortedBy("comment_id", {
                    descending: true,
                  });
                });
            });

            test("status 200: QUERY - accepts sort_by AND order request", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=comment_id&order=asc")
                .expect(200)
                .then(({ body }) => {
                  console.log(body);
                  expect(body.comments).toBeSortedBy("comment_id");
                });
            });
            test("status 200: QUERY - accepts sort_by AND order request", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=author&order=asc")
                .expect(200)
                .then(({ body }) => {
                  console.log(body);
                  expect(body.comments).toBeSortedBy("author");
                });
            });
            test("status 200: QUERY - accepts only order request and returns comments sorted by created_at in ascending order", () => {
              return request(app)
                .get("/api/articles/1/comments?order=asc")
                .expect(200)
                .then(({ body }) => {
                  console.log(body);
                  expect(body.comments).toBeSortedBy("created_at");
                });
            });
          });
        });
        describe("GET /:article_id/comments Error handling", () => {
          test("status 404: article id does not exist", () => {
            return request(app)
              .get("/api/articles/10000/comments")
              .expect(404)
              .then(({ body }) => {
                console.log(body.msg);
                expect(body.msg).toBe("article not found");
              });
          });
          test("status 400: bad article id request", () => {
            return request(app)
              .get("/api/articles/hashbrowns/comments")
              .expect(400)
              .then(({ body }) => {
                console.log(body);
              });
          });
          test("status 400: sort_by query does not exist", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=toast")
              .expect(400)
              .then(({ body }) => {
                console.log(body);
                expect(body.msg).toBe("sort_by or order request invalid");
              });
          });
          test("status 422: order query does not exist", () => {
            return request(app)
              .get("/api/articles/1/comments/?sort_by=beans")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe("sort_by or order request invalid");
              });
          });
        });
      });
    });

    describe("POST /api/articles/:article_id/comments", () => {
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
      describe("POST /api/articles/article_id Error handling", () => {
        test("status 422: article id does not exist", () => {
          return request(app)
            .post("/api/articles/50000/comments")
            .send({ username: "butter_bridge", body: "This is a comment" })
            .expect(422)
            .then(({ body }) => {
              expect(body.msg).toBe(
                "422 Unprocessable Entity - article id does not exist"
              );
            });
        });
        test("status 422: Username does not exist", () => {
          return request(app)
            .post("/api/articles/50000/comments")
            .send({ username: "IRUser", body: "This is a comment" })
            .expect(422)
            .then(({ body }) => {
              expect(body.msg).toBe("username not found");
            });
        });
        test("status 400: POST request does not included all required keys", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "butter_bridge" })
            .expect(400)
            .then(({ body }) => {
              console.log(body);
              expect(body.msg).toBe("request must include username and body");
              /* return request(app)
            .post("/api/articles/50000/comments")
            .send({ username: "IRUser", body: "This is a comment" })
            .expect(422)
            .then(({ body }) => {
              expect(body.msg).toBe("username not found");
            }); */
            });
        });
      });
    });

    describe("GET /api/articles/:article_id", () => {
      test("status 200: responds with relevent article object with a comment count property", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body.article.article_id).toBe(1);
            expect(body.article).toHaveProperty("comment_count");
            expect(body.article).toEqual({
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
            expect(body.article.article_id).toBe(2);
            expect(body.article.comment_count).toBe("0");
          });
      });
    });
    describe("PATCH /api/articles/:article_id", () => {
      test("status 200: responds with an object with property article, value is an object", () => {
        return request(app)
          .patch("/api/articles/2")
          .send({ inc_votes: 5 })
          .expect(200)
          .then(({ body }) => {
            console.log(body);

            expect(body.article).toHaveProperty("article_id");
          });
      });
      test("status 200: update votes on an article", () => {
        return request(app)
          .patch("/api/articles/2")
          .send({ inc_votes: 5 })
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body.article.votes).toBe(5);
            expect(body.article.article_id).toBe(2);
          });
      });
      test("status 200: update votes by negative number on an article", () => {
        return request(app)
          .patch("/api/articles/4")
          .send({ inc_votes: -5 })
          .expect(200)
          .then(({ body }) => {
            expect(body.article.votes).toBe(-5);
            expect(body.article.article_id).toBe(4);
          });
      });
      describe("PATCH /api/comments/:comment_id", () => {
        test("status 200: responds with an object with property comment, value is an object", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "butter_bridge", body: "This is a comment" })
            .then(({ body }) => {
              console.log(body);
            })
            .then(() => {
              return request(app)
                .patch("/api/comments/19")
                .send({ inc_votes: 5 })
                .expect(200);
            })
            .then(({ body }) => {
              console.log(body);
              expect(body).toHaveProperty("comment");
            });
        });
        test("status 200: response comment object has all comment info with properties of votes updated", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "butter_bridge", body: "This is a comment" })
            .then(({ body }) => {
              console.log(body);
            })
            .then(() => {
              return request(app)
                .patch("/api/comments/19")
                .send({ inc_votes: 5 })
                .expect(200);
            })
            .then(({ body }) => {
              expect(body.comment.votes).toBe(5);
              expect(body.comment.comment_id).toBe(19);
              expect(body.comment.author).toBe("butter_bridge");
              expect(body.comment.article_id).toBe(1);
              expect(body.comment).toHaveProperty("created_at");
              expect(body.comment.body).toBe("This is a comment");
            });
        });
        test("status 200: can update votes property with a negative number", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "butter_bridge", body: "This is a comment" })
            .then(({ body }) => {
              console.log(body);
            })
            .then(() => {
              return request(app)
                .patch("/api/comments/19")
                .send({ inc_votes: -3 })
                .expect(200);
            })
            .then(({ body }) => {
              expect(body.comment.votes).toBe(-3);
            });
        });
        test("status 200: will increment votes, not update number", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "butter_bridge", body: "This is a comment" })
            .then(({ body }) => {
              console.log(body);
            })
            .then(() => {
              return request(app)
                .patch("/api/comments/19")
                .send({ inc_votes: 5 })
                .expect(200);
            })
            .then(() => {
              return request(app)
                .patch("/api/comments/19")
                .send({ inc_votes: 2 })
                .expect(200);
            })
            .then(() => {
              return request(app)
                .patch("/api/comments/19")
                .send({ inc_votes: -1 })
                .expect(200);
            })
            .then(({ body }) => {
              expect(body.comment.votes).toBe(6);
            });
        });
      });
      describe("PATCH /api/comments/:comment_id Error handling", () => {
        test("status 405: unsupported HTTP method", () => {
          return request(app)
            .get("/api/comments/3")
            .expect(405)
            .then(({ body }) => {
              console.log(body);
              expect(body.msg).toBe("405 Bad Request: Method Not Allowed");
            });
        });
        test("status 200:  no inc_votes on request body, returns unchanged comment", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({})
            .expect(200)
            .then(({ body }) => {
              console.log(body);
              expect(body.comment.comment_id).toBe(1);
              expect(body.comment.votes).toBe(16);
            });
        });
        test("status 400: invalid request - invalid inc_votes value", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: "cat" })
            .expect(400)
            .then(({ body }) => {
              console.log(body);
              expect(body.msg).toBe(
                "400 Bad Request: Cannot access information - invalid request"
              );
            });
        });
        test("status 200: updates votes even if extra invalid property on request body", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1, name: "Stephanie" })
            .expect(200)
            .then(({ body }) => {
              console.log(body);
              expect(body.comment.votes).toBe(17);
            });
        });
        test("status 404: comment not found", () => {
          return request(app)
            .patch("/api/comments/425")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              console.log(body);
              expect(body.msg).toBe("comment not found");
            });
        });
      });
      describe("DELETE /api/comments/:comment_id", () => {
        test("status 204", () => {
          return request(app).delete("/api/comments/2").expect(204);
        });
      });
      describe("DELETE /api/comments/:comment_id Error handling", () => {
        test("status 404: valid comment_id but does not exist", () => {
          return request(app).delete("/api/comments/8000").expect(404);
        });
        test("status 400: invalid comment_id", () => {
          return request(app).delete("/api/comments/marmalade").expect(400);
        });
      });

      describe("PATCH /api/articles/:article_id Error handling", () => {
        test("status 200: ignores no inc_votes on request body and sends back unchanged article", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).toBe(100);
              expect(body.article.article_id).toBe(1);
              console.log(body);
            });
        });
        test("status 400: invalid request - invalid inc_votes value", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "cat" })
            .expect(400)
            .then(({ body }) => {
              console.log(body);
              expect(body.msg).toBe(
                "400 Bad Request: Cannot access information - invalid request"
              );
            });
        });
        test("status 400: invalid request - ignores invalid property on request body and returns article object", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1, name: "Stephanie" })
            .expect(200)
            .then(({ body }) => {
              console.log(body);
              expect(body.article.article_id).toBe(1);
              expect(body.article.votes).toBe(101);
            });
        });
      });
    });
    describe("GET /api/users/:article_id Error handling", () => {
      test("status 400: article_id requested does not exist", () => {
        return request(app)
          .get("/api/articles/666")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Article not found");
          });
      });
      test("status 400: bad article_id", () => {
        return request(app)
          .get("/api/articles/anArticle")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe(
              "400 Bad Request: Cannot access information - invalid request"
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

    describe("GET /api/articles", () => {
      test("status 200: responds with object with property articles ", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body).toHaveProperty("articles");
          });
      });
      test("status 200: response object has an array of objects", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            const testingProperties = body.articles.filter((object) => {
              return object === Object(object);
            });
            expect(testingProperties.length).toBe(12);
          });
      });
      test("status 200: response object array elements have properties of author, title, article_id, topic, created_at, votes, comment_count ", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            body.articles.forEach((article) => {
              expect(article).toHaveProperty("author");
              expect(article).toHaveProperty("title");
              expect(article).toHaveProperty("article_id");
              expect(article).toHaveProperty("topic");
              expect(article).toHaveProperty("title");
              expect(article).toHaveProperty("created_at");
              expect(article).toHaveProperty("votes");
              expect(article).toHaveProperty("comment_count");
            });
            expect(body.articles.length).toBe(12);
          });
      });

      test("status 200: filters by author", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            body.articles.forEach((object) => {
              expect(object.author).toBe("butter_bridge");
            });
            expect(body.articles.length).not.toBe(0);
          });
      });

      test("status 200: filters by topic", () => {
        return request(app)
          .get("/api/articles?topic=cats")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            const testing = body.articles.forEach((object) => {
              expect(object.topic).toBe("cats");
            });
            expect(body.articles.length).not.toBe(0);
          });
      });
      test("status 200: articles sorted by date by default", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });
      test("status 200: orders by asc query if passed", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy("created_at");
          });
      });

      test("status 200: filters by topic OR author AND sorts by any valid column", () => {
        return request(app)
          .get("/api/articles?author=rogersop&sort_by=comment_count&order=asc")
          .expect(200)
          .then(({ body }) => {
            console.log(body.articles);
            const convertToInt = body.articles.forEach((object) => {
              const number = object.comment_count;
              object.comment_count = parseInt(number);
              expect(object.author).toBe("rogersop");
            });
            expect(body.articles).toBeSortedBy("comment_count");
          });
      });
      test("status 200: filters by topic OR author AND sorts by any valid column AND orders by query", () => {
        return request(app)
          .get("/api/articles?topic=mitch&sort_by=article_id&order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy("article_id");
          });
      });
      test("status 200: user exists but is not an author of anything", () => {
        return request(app)
          .get("/api/articles?author=lurker")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body.articles).toEqual([]);
          });
      });
      test("status 200: topic exists but are no articles with this topic", () => {
        return request(app)
          .get("/api/articles?topic=paper")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body.articles).toEqual([]);
          });
      });
      describe("GET /api/articles Error handling", () => {
        test("status 400: bad sort_by query request", () => {
          return request(app)
            .get("/api/articles?sort_by=porridge")
            .expect(400)
            .then(({ body }) => {
              console.log(body);
              expect(body.msg).toBe("sort_by or order request invalid");
            });
        });
        test("status 400: bad order query request", () => {
          return request(app)
            .get("/api/articles?order=cornflakes")
            .expect(400)
            .then(({ body }) => {
              console.log(body);
              expect(body.msg).toBe("Invalid order query");
            });
        });
        test("status 404: bad author/topic not in the databsase", () => {
          return request(app)
            .get("/api/articles?author=IRUser")
            .expect(404)
            .then(({ body }) => {
              console.log;
              expect(body.msg).toBe("Username not found");
            });
        });
        test("status: 404 article not found", () => {
          return request(app)
            .get("/api/articles/1000")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe("Article not found");
              console.log(body);
            });
        });
        test("status 405: unsupported HTTP method", () => {
          return request(app)
            .post("/api/articles")
            .expect(405)
            .then(({ body }) => {
              console.log(body);
              expect(body.msg).toBe("405 Bad Request: Method Not Allowed");
            });
        });
      });
    });
  });
});
