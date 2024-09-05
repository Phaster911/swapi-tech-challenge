import { render } from "@testing-library/react";
import { Person } from "../../../react-query/queries/use-get-people.hook";
import CharacterTableSection, {
  CharacterTableSectionProps,
} from "../CharacterTableSection";

vi.mock("../character-table/CharacterTable", () => ({
  default: () => <div>CharacterTable</div>,
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

describe("<Header />", () => {
  let props: CharacterTableSectionProps;
  beforeEach(() => {
    props = {
      people: [person],
    };
  });
  it("renders the component", () => {
    const { container } = render(<CharacterTableSection {...props} />);
    expect(container).toMatchSnapshot();
  });
});
