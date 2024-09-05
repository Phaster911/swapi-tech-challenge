import { act, fireEvent, render, screen } from "@testing-library/react";
import SearchInput, { SearchInputProps } from "../SearchInput";

describe("<SearchInput />", () => {
  let props: SearchInputProps;
  let onChangeFn: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    onChangeFn = vi.fn();
    props = {
      value: "",
      disabled: false,
      onChangeHandler: onChangeFn,
    };
  });
  it("renders the component", () => {
    const { container } = render(<SearchInput {...props} />);
    expect(container).toMatchSnapshot();
  });

  describe("when the input disabled is true", () => {
    beforeEach(() => {
      props = {
        value: "",
        disabled: true,
        onChangeHandler: onChangeFn,
      };
    });
    it("renders the component", () => {
      const { container } = render(<SearchInput {...props} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("when the user changes the value", () => {
    it("onChangeHandler is called with the new value", () => {
      render(<SearchInput {...props} />);
      act(() => {
        fireEvent.change(screen.getByTestId("search-input-testid"), {
          target: {
            value: "abc",
          },
        });
      });

      expect(onChangeFn).toHaveBeenCalledWith("abc");
    });
  });
});
