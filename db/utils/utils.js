exports.formatDates = (list) => {
  const newArray = list.map((object) => {
    const { created_at: timestamp, ...restOfKeys } = object;
    new Date(timestamp);
    return { ...restOfKeys, created_at: new Date(timestamp) };
  });
  return newArray;
};

exports.makeRefObj = (list) => {
  const newObj = {};
  for (let i = 0; i < list.length; i++) {
    const {
      article_id: id,
      title: [articleTitle],
    } = list[i];
    newObj[articleTitle] = id;
  }
  return newObj;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map((object) => {
    const {
      belongs_to: [title],
      created_by: username,
      created_at: time,
      ...restOfKeys
    } = object;
    return {
      author: username,
      article_id: articleRef[title],
      created_at: new Date(time),
      ...restOfKeys,
    };
  });
  return formattedComments;
};
