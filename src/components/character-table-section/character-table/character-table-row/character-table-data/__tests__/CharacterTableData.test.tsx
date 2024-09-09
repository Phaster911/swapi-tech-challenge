import { render } from "@testing-library/react";
import CharacterTableData from "../CharacterTableData";

describe("<CharacterTableData />", () => {
  it("renders the component", () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CharacterTableData cellName="field">ABC</CharacterTableData>
          </tr>
        </tbody>
      </table>
    );
    expect(container).toMatchSnapshot();
  });
});
