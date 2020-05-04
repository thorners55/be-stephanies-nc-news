exports.formatDates = (list) => {
  const newArray = list.map((object) => {
    const { created_at: timestamp, ...restOfKeys } = object;
    console.log(new Date(timestamp));
    return { ...restOfKeys, created_at: new Date(timestamp) };
  });
  return newArray;
};

exports.makeRefObj = (list) => {
  const refArray = list.map((object) => {
    const { article_id, title } = object;
    return { article_id, title };
  });
  return refArray;
};

/* This utility function should be able to take an array (list) of objects and return a reference object. The reference object must be keyed by each item's title, with the values being each item's corresponding id. e.g.

[{ article_id: 1, title: 'A' }]

will become

{ A: 1 } */

exports.formatComments = (comments, articleRef) => {};
/* This utility function should be able to take an array of comment objects (comments) and a reference object, and return a new array of formatted comments.

Each formatted comment must have:

Its created_by property renamed to an author key
Its belongs_to property renamed to an article_id key
The value of the new article_id key must be the id corresponding to the original title value provided
Its created_at value converted into a javascript date object
The rest of the comment's properties must be maintained */
