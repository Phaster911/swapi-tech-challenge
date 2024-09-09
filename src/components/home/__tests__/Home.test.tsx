import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Home from "../Home";
import useGetPeople, {
  Person,
} from "../../../react-query/queries/use-get-people.hook";

vi.mock("../../../react-query/queries/use-get-people.hook");

const mocks = vi.hoisted(() => {
  return {
    default: vi.fn(),
  };
});

vi.mock("../../../hooks/use-debounce.hook", () => ({
  default: mocks.default,
}));

vi.mock("../../footer/Footer", () => ({
  default: () => <div>Footer</div>,
}));

const person: Person = {
  id: "1",
  name: "name-1",
  gender: "gender-1",
  birthYear: "year-1",
  mass: "mass-1",
  filmsEntered: 0,
  height: "height-1",
};

describe("<Home />", () => {
  let refetchFn: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    refetchFn = vi.fn();
    mocks.default.mockReturnValue("");
    vi.mocked(useGetPeople).mockReturnValue({
      data: {
        people: [person],
        pageCount: 5,
      },
      isPending: false,
      isSuccess: true,
      isError: false,
      refetch: refetchFn,
    });
  });
  it("renders the component", () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });

  describe("when the user types in the search input", () => {
    beforeEach(() => {
      // require("../../../hooks/use-debounce.hook").default = actualUseDebounce;
      vi.mock("../../../hooks/use-debounce.hook", async (importOriginal) => {
        const original =
          (await importOriginal()) as typeof import("../../../hooks/use-debounce.hook");
        return original;
      });
    });

    it("should call useGetPersons with the updated search criteria", async () => {
      vi.mock("../../../hooks/use-debounce.hook", async (importOriginal) => {
        const original =
          (await importOriginal()) as typeof import("../../../hooks/use-debounce.hook");
        return original;
      });
      render(<Home />);

      act(() => {
        fireEvent.change(screen.getByTestId("search-input-testid"), {
          target: {
            value: "abc",
          },
        });
      });
      await waitFor(() => {
        expect(screen.getByTestId("search-input-testid")).toHaveValue("abc");
        expect(useGetPeople).toHaveBeenCalledWith("abc", 1);
      });
    });

    it("should reset the current page to 1", async () => {
      render(<Home />);

      act(() => {
        fireEvent.click(screen.getByTestId("pagination-5-button-testid"));
      });

      expect(useGetPeople).toHaveBeenCalledWith("", 5);

      act(() => {
        fireEvent.change(screen.getByTestId("search-input-testid"), {
          target: {
            value: "abc",
          },
        });
      });
      await waitFor(() => {
        expect(screen.getByTestId("search-input-testid")).toHaveValue("abc");
        expect(useGetPeople).toHaveBeenCalledWith("abc", 1);
      });
    });
  });

  describe("when the user changes the page", () => {
    beforeEach(() => {
      vi.mocked(useGetPeople).mockReturnValue({
        data: {
          people: [],
          pageCount: 2,
        },
        isPending: false,
        isSuccess: true,
        isError: false,
        refetch: refetchFn,
      });
    });
    it("should call useGetPersons with the updated page", async () => {
      render(<Home />);

      act(() => {
        fireEvent.click(screen.getByTestId("pagination-next-button-testid"));
      });

      expect(useGetPeople).toHaveBeenCalledWith("", 2);
    });
  });

  describe("when an error occurs", () => {
    beforeEach(() => {
      vi.mocked(useGetPeople).mockReturnValue({
        data: undefined,
        isPending: false,
        isSuccess: false,
        isError: true,
        refetch: refetchFn,
      });
    });
    it("renders an error message and when the user clicks on the try again button, it calls the refetch function", () => {
      const { container } = render(<Home />);
      expect(container).toMatchSnapshot();
      expect(screen.getByTestId("try-again-testid")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("try-again-testid"));
      expect(refetchFn).toHaveBeenCalled();
    });
  });

  describe("when there are no results", () => {
    beforeEach(() => {
      vi.mocked(useGetPeople).mockReturnValue({
        data: {
          people: [],
          pageCount: 0,
        },
        isPending: false,
        isSuccess: true,
        isError: false,
        refetch: refetchFn,
      });
    });
    it("renders an empty results message", () => {
      const { container } = render(<Home />);
      expect(container).toMatchSnapshot();
      expect(
        screen.getByTestId("no-results-message-testid")
      ).toBeInTheDocument();
    });
  });

  describe("when useGetPeople is loading", () => {
    beforeEach(() => {
      vi.mocked(useGetPeople).mockReturnValue({
        data: undefined,
        isPending: true,
        isSuccess: false,
        isError: false,
        refetch: refetchFn,
      });
    });
    it("renders a loading message", () => {
      const { container } = render(<Home />);
      expect(container).toMatchSnapshot();
      expect(screen.getByTestId("loading-message-testid")).toBeInTheDocument();
    });
  });
});
