import { render } from "@testing-library/react";
import MaxWidthWrapper from "../MaxWidthWrapper";

describe("<MaxWidthWrapper />", () => {
  it("renders the component", () => {
    const { container } = render(<MaxWidthWrapper />);
    expect(container).toMatchSnapshot();
  });
});
