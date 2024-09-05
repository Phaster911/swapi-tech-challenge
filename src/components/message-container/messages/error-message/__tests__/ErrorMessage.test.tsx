import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";

describe("<ErrorMessage />", () => {
  let tryAgainFn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    tryAgainFn = vi.fn();
  });

  it("renders the component", () => {
    const { container } = render(<ErrorMessage tryAgainHandler={tryAgainFn} />);
    expect(container).toMatchSnapshot();
  });

  describe("when the try again button is clicked", () => {
    it("calls the tryAgainHandler", () => {
      render(<ErrorMessage tryAgainHandler={tryAgainFn} />);

      expect(screen.getByTestId("try-again-testid")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("try-again-testid"));
      expect(tryAgainFn).toHaveBeenCalled();
    });
  });
});
