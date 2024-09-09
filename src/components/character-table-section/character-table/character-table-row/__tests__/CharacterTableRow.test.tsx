import { render } from "@testing-library/react";
import CharacterTableRow, {
  CharacterTableRowProps,
} from "../CharacterTableRow";
import { Person } from "../../../../../react-query/queries/use-get-people.hook";
import { CharacterTableDataProps } from "../character-table-data/CharacterTableData";

const mockedCharacterTableData = vi
  .fn()
  .mockReturnValue(<td>CharacterTableData</td>);
vi.mock("../character-table-data/CharacterTableData", () => ({
  default: (props: CharacterTableDataProps) => mockedCharacterTableData(props),
}));

const person: Person = {
  id: "1",
  name: "name-1",
  gender: "gender-1",
  birthYear: "year-1",
  mass: "mass-1",
  filmsEntered: 0,
  height: "height-1",
};

describe("<CharacterTableRow />", () => {
  let props: CharacterTableRowProps;
  beforeEach(() => {
    props = {
      ...person,
    };
  });
  it("renders the component", () => {
    const { container } = render(
      <table>
        <tbody>
          <CharacterTableRow {...props} />
        </tbody>
      </table>
    );
    expect(container).toMatchSnapshot();
    expect(mockedCharacterTableData).toHaveBeenCalledTimes(6);
    expect(mockedCharacterTableData).toHaveBeenNthCalledWith(1, {
      cellName: "name",
      children: "name-1",
    });
    expect(mockedCharacterTableData).toHaveBeenNthCalledWith(2, {
      cellName: "gender",
      children: "gender-1",
    });
    expect(mockedCharacterTableData).toHaveBeenNthCalledWith(3, {
      cellName: "birth year",
      children: "year-1",
    });
    expect(mockedCharacterTableData).toHaveBeenNthCalledWith(4, {
      cellName: "height",
      children: "height-1",
    });
    expect(mockedCharacterTableData).toHaveBeenNthCalledWith(5, {
      cellName: "mass",
      children: "mass-1",
    });
    expect(mockedCharacterTableData).toHaveBeenNthCalledWith(6, {
      cellName: "films entered",
      children: 0,
    });
  });
});
