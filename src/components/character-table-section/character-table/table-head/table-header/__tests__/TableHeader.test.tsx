import { render } from "@testing-library/react";
import TableHeader from "../TableHeader";

describe("<TableHeader />", () => {
  it("renders the component", () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHeader>ABC</TableHeader>
          </tr>
        </thead>
      </table>
    );
    expect(container).toMatchSnapshot();
  });
});
