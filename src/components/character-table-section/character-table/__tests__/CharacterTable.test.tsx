import { render } from "@testing-library/react";
import CharacterTable, { CharacterTableProps } from "../CharacterTable";
import { Person } from "../../../../react-query/queries/use-get-people.hook";

const firstPerson: Person = {
  id: "1",
  name: "name-1",
  gender: "gender-1",
  birthYear: "year-1",
  mass: "mass-1",
  filmsEntered: 0,
  height: "height-1",
};

const secondPerson: Person = {
  id: "2",
  name: "name-2",
  gender: "gender-2",
  birthYear: "year-2",
  mass: "mass-2",
  filmsEntered: 2,
  height: "height-2",
};

describe("<CharacterTable />", () => {
  let props: CharacterTableProps;
  beforeEach(() => {
    props = { people: [firstPerson, secondPerson] };
  });
  it("renders the component", () => {
    const { container } = render(<CharacterTable {...props} />);
    expect(container).toMatchSnapshot();
  });
});
