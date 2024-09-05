import { render } from "@testing-library/react";
import MessageContainer, { MessageContainerProps } from "../MessageContainer";

vi.mock("../messages/no-results-message/NoResultsMessage", () => {
  return {
    default: () => <div>NoResultsMessage</div>,
  };
});

vi.mock("../messages/error-message/ErrorMessage", () => {
  return {
    default: () => <div>ErrorMessage</div>,
  };
});

vi.mock("../messages/loading-message/LoadingMessage", () => {
  return {
    default: () => <div>LoadingMessage</div>,
  };
});

describe("<MessageContainer />", () => {
  let props: MessageContainerProps;
  let tryAgainFn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    tryAgainFn = vi.fn();
  });

  describe("when isPending is true", () => {
    beforeEach(() => {
      props = {
        isPending: true,
        isError: false,
        isSuccess: false,
        pageCount: 0,
        tryAgainHandler: tryAgainFn,
      };
    });

    it("renders the loading message", () => {
      const { container } = render(<MessageContainer {...props} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe("when isError is true", () => {
    beforeEach(() => {
      props = {
        isPending: false,
        isError: true,
        isSuccess: false,
        pageCount: 0,
        tryAgainHandler: tryAgainFn,
      };
    });
    it("renders the error message", () => {
      const { container } = render(<MessageContainer {...props} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe("when isSuccess is true and there are no results", () => {
    beforeEach(() => {
      props = {
        isPending: false,
        isError: false,
        isSuccess: true,
        pageCount: 0,
        tryAgainHandler: tryAgainFn,
      };
    });
    it("renders the no results message", () => {
      const { container } = render(<MessageContainer {...props} />);

      expect(container).toMatchSnapshot();
    });
  });
});
