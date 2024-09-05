import { render } from "@testing-library/react";
import StyledMessageWrapper from "../StyledMessageWrapper";

describe("<StyledMessageWrapper />", () => {
  it("renders the component", () => {
    const { container } = render(<StyledMessageWrapper />);
    expect(container).toMatchSnapshot();
  });
});
