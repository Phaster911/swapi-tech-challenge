import { render } from "@testing-library/react";
import Footer from "../Footer";

describe("<Footer />", () => {
  it("renders the component", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
