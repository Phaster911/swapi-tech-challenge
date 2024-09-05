import { render } from "@testing-library/react";
import TableHead from "../TableHead";

describe("<TableHead />", () => {
  it("renders the component", () => {
    const { container } = render(
      <table>
        <TableHead>
          <tr>
            <td>ABC</td>
          </tr>
        </TableHead>
      </table>
    );
    expect(container).toMatchSnapshot();
  });
});
