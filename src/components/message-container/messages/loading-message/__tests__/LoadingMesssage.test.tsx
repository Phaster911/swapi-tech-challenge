import { render } from "@testing-library/react";
import LoadingMessage from "../LoadingMessage";

describe("<LoadingMessage />", () => {
  it("renders the component", () => {
    const { container } = render(<LoadingMessage />);
    expect(container).toMatchSnapshot();
  });
});
