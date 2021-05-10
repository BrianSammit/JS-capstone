import Board from "../score/scoreBoard";

describe("create the board", () => {
  let arr = [5, 4, 9, 7];
  it("It return the arr sort it ", () => {
    Board(arr);
    expect(arr).toEqual([4, 5, 7, 9]);
  });
});
