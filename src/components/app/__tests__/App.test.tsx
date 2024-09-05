import { render } from "@testing-library/react";
import App from "../App";

vi.mock("../../home/Home", () => ({
  default: () => <div>Home</div>,
}));

describe("<App />", () => {
  it("renders the component", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
