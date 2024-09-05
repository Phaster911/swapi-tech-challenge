import { render, screen } from "@testing-library/react";
import Header, { HeaderProps } from "../Header";

vi.mock("../../search-input/SearchInput", () => ({
  default: () => <div>SearchInput</div>,
}));

describe("<Header />", () => {
  let props: HeaderProps;
  let handleOnChangeSearchFn: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    handleOnChangeSearchFn = vi.fn();
    props = {
      isPending: false,
      searchTerm: "",
      handleOnChangeSearch: handleOnChangeSearchFn,
    };
  });
  it("renders the component", () => {
    const { container } = render(<Header {...props} />);
    expect(container).toMatchSnapshot();
  });

  describe("when isPending is true", () => {
    it("should disable the form submit button", () => {
      const { container } = render(<Header {...props} isPending={true} />);
      expect(container).toMatchSnapshot();
      expect(screen.getByTestId("search-form-submit-testid")).toBeDisabled();
    });
  });
});
