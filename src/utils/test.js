//@flow
import { formatElapsedTime } from "./";
describe("formatElapsedTime", () => {
  it("formatElapsedTime() must accept numeric elapsedMilliseconds as its only argument", () => {
    let input = "three";
    let expectedOutput = "00:00:00";
    //$FlowFixMe
    expect(formatElapsedTime(input)).toEqual(expectedOutput);
  });
  it("formatElapsedTime() correctly formats time less than a second", () => {
    let input = 300;
    let expectedOutput = "00.30";
    expect(formatElapsedTime(input)).toEqual(expectedOutput);
  });
  it("formatElapsedTime() correctly formats time less than a minute", () => {
    let input = 2500;
    let expectedOutput = "02.50";
    expect(formatElapsedTime(input)).toEqual(expectedOutput);
  });
  it("formatElapsedTime() correctly formats time less than an hour", () => {
    let input = 129100;
    let expectedOutput = "02:09.10";
    expect(formatElapsedTime(input)).toEqual(expectedOutput);
  });
  it("formatElapsedTime() correctly formats time more than one hour", () => {
    let input = 100000000;
    let expectedOutput = "27:46:40.00";
    expect(formatElapsedTime(input)).toEqual(expectedOutput);
  });
});
