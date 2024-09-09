import { render } from "@testing-library/react";
import NoResultsMessage from "../NoResultsMessage";

describe("<NoResultsMessage />", () => {
  it("renders the component", () => {
    const { container } = render(<NoResultsMessage />);
    expect(container).toMatchSnapshot();
  });
});
