## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### GET `/api/topics`

Assertion: expected [ Array(3) ] to contain key 'topics'

Hints:

- send topics to the client in an object, with a key of topics: `{ topics: [] }` <----
- use the data from the `test-data` in your tests
- ensure there are no discrepancies between the README specification and your table column names

### GET `/api/articles`

Assertion: expected 400 to equal 200

Hints:

- use a 200 status code

### GET `/api/articles`

Assertion: expected { Object (msg) } to contain key 'articles'

Hints:

- send articles to the client in an object, with a key of articles: `{ articles: [] }`
- use the data from the `test-data` in your tests

### GET `/api/articles`

Assertion: Cannot read property '0' of undefined

Hints:

- the default sort should be by `created_at` and the default order should be `desc`

### GET `/api/articles`

Assertion: Cannot read property '0' of undefined

Hints:

- add a `comment_count` property to each article
- join to the `comments` table, as this information lives there
- use an aggregate `COUNT` function
- use `GROUP BY` to avoid duplicate rows

### GET `/api/articles?sort_by=author`

Assertion: Cannot read property '0' of undefined

Hints:

- accept a `sort_by` query, with a value of any column name
- use `author` for the column to store the username that created the article

### GET `/api/articles?order=asc`

Assertion: Cannot read property '0' of undefined

Hints:

- accept an `order` query of `asc` or `desc`

### GET `/api/articles?author=butter_bridge`

Assertion: Cannot read property 'every' of undefined

Hints:

- accept an `author` query of any author that exists in the database
- use `where` in the model

### GET `/api/articles?topic=mitch`

Assertion: Cannot read property 'every' of undefined

Hints:

- accept an `topic` query of any topic slug that exists in the database
- use `where` in the model

### GET `/api/articles?author=lurker`

Assertion: expected 400 to equal 200

Hints:

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the user exists

### GET `/api/articles?topic=paper`

Assertion: expected 400 to equal 200

Hints:

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the topic exists

### GET `/api/articles?topic=not-a-topic`

Assertion: expected 400 to equal 404

Hints:

- use a 404 status code, when provided a non-existent topic
- use a separate model to check whether the topic exists

### GET `/api/articles?author=not-an-author`

Assertion: expected 400 to equal 404

Hints:

- use a 404 status code, when provided a non-existent author
- use a separate model to check whether the author exists

### PATCH `/api/articles`

Assertion: expected 400 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### GET `/api/articles/1`

Assertion: expected { Object (article_id, title, ...) } to contain key 'article'

Hints:

- send the article to the client in an object, with a key of `article`: `{ article: {} }`
- return the single article in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names

### GET `/api/articles/2`

Assertion: Cannot read property 'votes' of undefined

Hints:

- default the vote column to `0` in the migration
- article with article_id 2 has no comments, you may need to check your join

### GET `/api/articles/1`

Assertion: Cannot read property 'comment_count' of undefined

Hints:

- ensure you have calculated a comment_count for the article

### GET `/api/articles/1000`

Assertion: expected 400 to equal 404

Hints:

- if an article is not found with a valid `article_id`, use a 404: Not Found status code

### PUT `/api/articles/1`

Assertion: expected 400 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PATCH `/api/articles/1`

Assertion: expected { Object (article_id, title, ...) } to contain key 'article'

Hints:

- send the updated article with a key of `article`

### PATCH `/api/articles/1`

Assertion: Cannot read property 'votes' of undefined

Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**

### PATCH `/api/articles/1`

Assertion: Cannot read property 'votes' of undefined

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

### GET `/api/articles/1/comments`

Assertion: expected 400 to equal 200

Hints:

- use a 200: OK status code for a successful `GET` request

### GET `/api/articles/1/comments`

Assertion: expected undefined to be an array

Hints:

- send comments in an array, with a key of `comments`

### GET `/api/articles/1/comments`

Assertion: Cannot read property '0' of undefined

Hints:

- send comments to the client in an object, with a key of comments: `{ comments: [] }`
- use `author` for the column to store the username that created the comment
- each comment does not need a key of `article_id`
- use the data from the `test-data` in your tests

### GET `/api/articles/1/comments`

Assertion: Cannot read property '0' of undefined

Hints:

- sort comments by `created_at` by default
- order should default to `DESC`

### GET `/api/articles/1/comments?sort_by=votes`

Assertion: Cannot read property '0' of undefined

Hints:

- accept a `sort_by` query of any valid column
- order should default to `DESC`

### GET `/api/articles/1/comments?order=asc`

Assertion: Cannot read property '0' of undefined

Hints:

- accept an `order` query of `asc` or `desc`
- `sort_by` should default to `created_at`

### GET `/api/articles/2/comments`

Assertion: expected 400 to equal 200

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments

### GET `/api/articles/1000/comments`

Assertion: expected 400 to equal 404

Hints:

- return 404: Not Found when given a valid `article_id` that does not exist

### PUT `/api/articles/1/comments`

Assertion: expected 400 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### POST `/api/articles/1/comments`

Assertion: expected 400 to equal 201

Hints:

- use a 201: Created status code for a successful `POST` request

### POST `/api/articles/1/comments`

Assertion: expected { Object (msg) } to contain key 'comment'

Hints:

- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README

### POST `/api/articles/1/comments`

Assertion: Cannot read property 'votes' of undefined

Hints:

- default `votes` to `0` in the migrations
- default `created_at` to the current time in the migrations

### POST `/api/articles/10000/comments`

Assertion: expected 400 to be one of [ 404, 422 ]

Hints:

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist

### PATCH `/api/comments/1`

Assertion: expected 400 to equal 200

Hints:

- use a 200: OK status code for successful `patch` requests

### PATCH `/api/comments/1`

Assertion: expected { Object (msg) } to contain key 'comment'

Hints:

- send the updated comment back to the client in an object, with a key of comment: `{ comment: {} }`

### PATCH `/api/comments/1`

Assertion: Cannot read property 'votes' of undefined

Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**

### PATCH `/api/comments/1`

Assertion: expected 400 to equal 200

Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body

### PATCH `/api/comments/1000`

Assertion: expected 400 to equal 404

Hints:

- use a 404: Not Found when `PATCH` contains a valid comment_id that does not exist

### PUT `/api/comments/1`

Assertion: expected 400 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### DELETE `/api/comments/1`

Assertion: expected 400 to equal 204

Hints:

- use a 204: No Content status code
- do not return anything on the body

### DELETE `/api/comments/1000`

Assertion: expected 400 to equal 404

Hints:

- use a 404: Not Found when `DELETE` contains a valid comment_id that does not exist

### GET `/api/users/butter_bridge`

Assertion: expected { Object (username, avatar_url, ...) } to contain key 'user'

Hints:

- send the user to the client in an object, with a key of `user`: `{ user: {} }`
- return the single user in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names

### GET `/api/users/not-a-username`

Assertion: expected 400 to equal 404

Hints:

- if a user is not found with a valid `user_id`, use a 404: Not Found status code

### GET `/non-existent-route`

Assertion: expected 400 to equal 404

Hints:

- have middleware to catch non-existent routes with a wildcard: `/*`
- use a 404 status code

### DELETE `/api`

Assertion: expected 400 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code
