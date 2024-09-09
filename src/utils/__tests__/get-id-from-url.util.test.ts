import getIdFromUrl from "../get-id-from-url.util";

describe("getIdFromUrl", () => {
  test.each`
    url            | result
    ${"/people"}   | ${""}
    ${"/people/"}  | ${""}
    ${"/people/1"} | ${"1"}
  `(`when the url is $url the id is $result`, ({ url, result }) => {
    expect(getIdFromUrl(url)).toBe(result);
  });
});
