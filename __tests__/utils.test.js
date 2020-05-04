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
    console.log(formatDates(expectedList));
    expect(formatDates(list)).toEqual(expectedList);
  });
});

describe.only("makeRefObj", () => {
  test("returns empty array when passed empty array", () => {
    const array = [];
    const testArray = formatDates(array);
    expect(makeRefObj(testArray)).toEqual([]);
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
    expect(makeRefObj(testArray)).toEqual([
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" },
    ]);
  });

  // returns an array
});

describe("formatComments", () => {});
