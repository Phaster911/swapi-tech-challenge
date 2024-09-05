import { render } from "@testing-library/react";
import VisuallyHidden from "../VisuallyHidden";

describe("<VisuallyHidden />", () => {
  it("renders the component", () => {
    const { container } = render(
      <VisuallyHidden>
        <span></span>
      </VisuallyHidden>
    );
    expect(container).toMatchSnapshot();
  });
});
