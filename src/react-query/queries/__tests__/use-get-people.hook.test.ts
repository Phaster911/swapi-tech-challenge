import { renderHook } from "@testing-library/react";

import { waitFor } from "@testing-library/react";
import { createReactQueryWrapper } from "../../../test-utils/create-react-query-wrapper.util";
import fetchPeopleApi, { ApiPerson } from "../../../api/fetch-people.api";
import useGetPeople, { Person } from "../use-get-people.hook";

vi.mock("../../../api/fetch-people.api", () => ({
  default: vi.fn(),
}));

const firstApiPerson: ApiPerson = {
  name: "name-1",
  gender: "gender-1",
  birth_year: "year-1",
  mass: "mass-1",
  height: "height-1",
  films: [],
  url: "/people/1/",
};

const secondApiPerson: ApiPerson = {
  name: "name-2",
  gender: "gender-2",
  birth_year: "year-2",
  mass: "mass-2",
  height: "height-2",
  films: ["film-1", "film-2"],
  url: "/people/2/",
};

const firstPerson: Person = {
  id: "1",
  name: "name-1",
  gender: "gender-1",
  birthYear: "year-1",
  mass: "mass-1",
  filmsEntered: 0,
  height: "height-1",
};

const secondPerson: Person = {
  id: "2",
  name: "name-2",
  gender: "gender-2",
  birthYear: "year-2",
  mass: "mass-2",
  filmsEntered: 2,
  height: "height-2",
};

const successfulApiResponse = {
  results: [firstApiPerson, secondApiPerson],
  count: 2,
};

const successfulMultiPageApiResponse = {
  results: [firstApiPerson, secondApiPerson],
  count: 12,
};

const successfulData = {
  pageCount: 1,
  people: [firstPerson, secondPerson],
};

const successfulMultiPageData = {
  pageCount: 2,
  people: [firstPerson, secondPerson],
};

describe("useGetPeople", () => {
  describe("when the api response is successful", () => {
    beforeEach(() => {
      vi.mocked(fetchPeopleApi).mockResolvedValue(successfulApiResponse);
    });
    describe("and there is not a seach criteria", () => {
      it("runs the query and returns the expectd result", async () => {
        const { result } = renderHook(() => useGetPeople("", 1), {
          wrapper: createReactQueryWrapper(),
        });
        await waitFor(() => {
          expect(fetchPeopleApi).toHaveBeenCalledWith("", 1);
        });
        await waitFor(() => {
          expect(result.current.isPending).toBe(false);
        });

        expect(result.current.isSuccess).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toEqual(successfulData);
        expect(result.current).toMatchInlineSnapshot(`
          {
            "data": {
              "pageCount": 1,
              "people": [
                {
                  "birthYear": "year-1",
                  "filmsEntered": 0,
                  "gender": "gender-1",
                  "height": "height-1",
                  "id": "1",
                  "mass": "mass-1",
                  "name": "name-1",
                },
                {
                  "birthYear": "year-2",
                  "filmsEntered": 2,
                  "gender": "gender-2",
                  "height": "height-2",
                  "id": "2",
                  "mass": "mass-2",
                  "name": "name-2",
                },
              ],
            },
            "isError": false,
            "isPending": false,
            "isSuccess": true,
            "refetch": [Function],
          }
        `);
      });
    });

    describe("and there is a search criteria", () => {
      it("runs the query and returns the expectd result", async () => {
        const { result } = renderHook(() => useGetPeople("abc", 1), {
          wrapper: createReactQueryWrapper(),
        });
        await waitFor(() => {
          expect(fetchPeopleApi).toHaveBeenCalledWith("abc", 1);
        });
        await waitFor(() => {
          expect(result.current.isPending).toBe(false);
        });

        expect(result.current.isSuccess).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toEqual(successfulData);
      });
    });

    describe("and the current page changes", () => {
      it("runs the query and returns the expectd result", async () => {
        const { result } = renderHook(() => useGetPeople("", 2), {
          wrapper: createReactQueryWrapper(),
        });
        await waitFor(() => {
          expect(fetchPeopleApi).toHaveBeenCalledWith("", 2);
        });
        await waitFor(() => {
          expect(result.current.isPending).toBe(false);
        });

        expect(result.current.isSuccess).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toEqual(successfulData);
      });
    });

    describe("and there is more than one results page", () => {
      beforeEach(() => {
        vi.mocked(fetchPeopleApi).mockResolvedValue(
          successfulMultiPageApiResponse
        );
      });
      it("runs the query and returns the expectd result", async () => {
        const { result } = renderHook(() => useGetPeople("", 1), {
          wrapper: createReactQueryWrapper(),
        });
        await waitFor(() => {
          expect(fetchPeopleApi).toHaveBeenCalledWith("", 1);
        });
        await waitFor(() => {
          expect(result.current.isPending).toBe(false);
        });

        expect(result.current.isSuccess).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toEqual(successfulMultiPageData);
      });
    });
  });

  describe("when an error occurs in the api", () => {
    beforeEach(() => {
      vi.mocked(fetchPeopleApi).mockRejectedValue("error");
    });
    it("runs the query and returns the expectd result", async () => {
      const { result } = renderHook(() => useGetPeople("", 1), {
        wrapper: createReactQueryWrapper(),
      });
      await waitFor(() => {
        expect(fetchPeopleApi).toHaveBeenCalledWith("", 1);
      });
      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(true);
      expect(result.current.data).toBe(undefined);
    });
  });
});
