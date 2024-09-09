import { act, render, screen, fireEvent } from "@testing-library/react";
import Pagination, { PaginationProps } from "../Pagination";

describe("<Pagination />", () => {
  let props: PaginationProps;
  let onChangePageFn: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    onChangePageFn = vi.fn();
    props = {
      currentPage: 1,
      pageCount: 1,
      handleOnChangePage: onChangePageFn,
    };
  });
  it("renders the component", () => {
    const { container } = render(<Pagination {...props} />);
    expect(container).toMatchSnapshot();
  });

  describe("when there are multiple pages", () => {
    beforeEach(() => {
      props = {
        currentPage: 1,
        pageCount: 10,
        handleOnChangePage: onChangePageFn,
      };
    });
    describe("and the current page is the first", () => {
      it("the previous page button is disabled", () => {
        const { container } = render(<Pagination {...props} />);
        expect(container).toMatchSnapshot();
        expect(
          screen.getByTestId("pagination-previous-button-testid")
        ).toBeDisabled();
      });
    });

    describe("and the current page is the last", () => {
      it("the next page button is disabled", () => {
        const { container } = render(
          <Pagination {...props} currentPage={10} />
        );
        expect(container).toMatchSnapshot();
        expect(
          screen.getByTestId("pagination-next-button-testid")
        ).toBeDisabled();
      });
    });

    describe("and the user clicks a specific page", () => {
      it("should call handleOnChangePage with the specific page", () => {
        render(<Pagination {...props} />);
        act(() => {
          fireEvent.click(screen.getByTestId("pagination-2-button-testid"));
        });

        expect(onChangePageFn).toHaveBeenCalledWith(2);
      });
    });

    describe("and the user clicks the previous page button", () => {
      it("should call handleOnChangePage with the previous page", () => {
        const currentPage = 3;
        render(<Pagination {...props} currentPage={currentPage} />);
        act(() => {
          fireEvent.click(
            screen.getByTestId("pagination-previous-button-testid")
          );
        });

        expect(onChangePageFn).toHaveBeenCalledWith(2);
      });
    });

    describe("and the user clicks the next page button", () => {
      it("should call handleOnChangePage with the next page", () => {
        const currentPage = 3;
        render(<Pagination {...props} currentPage={currentPage} />);
        act(() => {
          fireEvent.click(screen.getByTestId("pagination-next-button-testid"));
        });

        expect(onChangePageFn).toHaveBeenCalledWith(4);
      });
    });
  });
});
