const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  test("returns empty array when passed empty array", () => {
    expect(formatDates([])).toEqual([]);
  });
  test("returns new array", () => {
    const list = [
      {
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ];
    expect(formatDates(list)).not.toBe([
      {
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ]);
  });
  test("does not mutate original array", () => {
    const list = [
      {
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ];
    formatDates(list);
    expect(list).toEqual([
      {
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ]);
  });
  test("returns correct values", () => {
    const list = [
      {
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ];
    const expectedList = [
      {
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: new Date(911564514171),
      },
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: new Date(785420514171),
      },
    ];
    formatDates(expectedList);
    expect(formatDates(list)).toEqual(expectedList);
  });
});

describe("makeRefObj", () => {
  test("returns empty object when passed empty array", () => {
    const array = [];
    const testArray = formatDates(array);
    expect(makeRefObj(testArray)).toEqual({});
  });
  test("does not mutate original array", () => {
    const array = [
      {
        article_id: 1,
        title: "A",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171,
      },
      {
        article_id: 2,
        title: "B",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        article_id: 3,
        title: "C",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ];
    const testArray = formatDates(array);
    const newArray = makeRefObj(testArray);
    const oldValues = testArray.map((object) => {
      const { article_id, title } = object;
      return { article_id, title };
    });
    expect(testArray).not.toBe(newArray);
    expect(oldValues).toEqual([
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" },
    ]);
  });
  test("returns an array with correct properties and values", () => {
    const array = [
      {
        article_id: 1,
        title: "A",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171,
      },
      {
        article_id: 2,
        title: "B",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        article_id: 3,
        title: "C",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ];
    const testArray = formatDates(array);
    makeRefObj(testArray);
    expect(makeRefObj(testArray)).toEqual({ A: 1, B: 2, C: 3 });
  });
});

describe("formatComments", () => {
  test("returns empty array when passed empty array", () => {
    const array = [];
    expect(formatComments(array)).toEqual([]);
  });
  test("doesn't mutate original array", () => {
    const array = [
      {
        body: "I am 100% sure that we're not completely sure.",
        belongs_to: "A: catspiracy to bring down democracy",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1069850163389,
      },
      {
        body: "This is a bad article name",
        belongs_to: "B",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389,
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "C",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389,
      },
    ];
    const objRef = { A: 1, B: 2, C: 3 };
    formatComments(array, objRef);
    expect(array).toEqual([
      {
        body: "I am 100% sure that we're not completely sure.",
        belongs_to: "A: catspiracy to bring down democracy",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1069850163389,
      },
      {
        body: "This is a bad article name",
        belongs_to: "B",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389,
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "C",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389,
      },
    ]);
  });
  test("belongs_to has been changed to article_id with corresponding original title value provided, created_by property has been changed to author, maintains other properties", () => {
    const outputArray = [
      {
        body: "I am 100% sure that we're not completely sure.",
        article_id: 1,
        author: "butter_bridge",
        votes: 1,
        created_at: new Date(1069850163389),
      },
      {
        body: "This is a bad article name",
        article_id: 2,
        author: "butter_bridge",
        votes: 1,
        created_at: new Date(1038314163389),
      },
      {
        body: "The owls are not what they seem.",
        article_id: 3,
        author: "icellusedkars",
        votes: 20,
        created_at: new Date(1006778163389),
      },
    ];
    const refObj = { A: 1, B: 2, C: 3 };
    const array = [
      {
        body: "I am 100% sure that we're not completely sure.",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1069850163389,
      },
      {
        body: "This is a bad article name",
        belongs_to: "B",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389,
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "C",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389,
      },
    ];
    expect(formatComments(array, refObj)).toEqual(outputArray);
    expect(formatComments(array, refObj)[1]).toHaveProperty(
      "author",
      "butter_bridge"
    );
  });
});
