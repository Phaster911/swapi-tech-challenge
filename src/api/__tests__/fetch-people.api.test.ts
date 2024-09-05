import fetchPeopleApi, { ApiPerson } from "../fetch-people.api";

const person: ApiPerson = {
  name: "name-1",
  gender: "gender-1",
  birth_year: "year-1",
  mass: "mass-1",
  height: "height-1",
  films: [],
  url: "/people/1/",
};

describe("getChargingStationsApi", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ count: 1, results: [person] }),
    });
  });
  describe("when there is no search criteria", () => {
    it("calls fetch with the current page", async () => {
      const result = await fetchPeopleApi("", 1);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://swapi.dev/api/people/?page=1"
      );
      expect(result).toEqual({
        results: [person],
        count: 1,
      });
    });
  });

  describe("when there is a search criteria", () => {
    it("calls fetch with the search criteria and the current page", async () => {
      const result = await fetchPeopleApi("abc", 1);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://swapi.dev/api/people/?search=abc&page=1"
      );
      expect(result).toEqual({
        results: [person],
        count: 1,
      });
    });
  });

  describe("when an error occurs", () => {
    describe("and fetch rejects", () => {
      beforeEach(() => {
        global.fetch = vi.fn().mockRejectedValue("error");
      });
      it("should throw", async () => {
        await expect(fetchPeopleApi("", 1)).rejects.toEqual("error");
      });
    });

    describe("and the response is not ok", () => {
      const response = {
        ok: false,
        status: 404,
      };
      beforeEach(() => {
        global.fetch = vi.fn().mockResolvedValue(response);
      });
      it("should throw", async () => {
        await expect(fetchPeopleApi("", 1)).rejects.toEqual(
          new Error(`Response status: ${response.status}`)
        );
      });
    });
  });
});
