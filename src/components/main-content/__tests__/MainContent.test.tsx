import { render, screen } from "@testing-library/react";
import MainContent, { MainContentProps } from "../MainContent";
import { Person } from "../../../react-query/queries/use-get-people.hook";

vi.mock("../../pagination/Pagination", () => ({
  default: () => <div>Pagination</div>,
}));

vi.mock("../../character-table-section/CharacterTableSection", () => ({
  default: () => <div>CharacterTableSection</div>,
}));

vi.mock("../../message-container/MessageContainer", () => ({
  default: () => <div>MessageContainer</div>,
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

describe("<MainContent />", () => {
  let props: MainContentProps;
  let handleOnChangePageFn: ReturnType<typeof vi.fn>;
  let tryAgainHandlerFn: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    handleOnChangePageFn = vi.fn();
    tryAgainHandlerFn = vi.fn();
    props = {
      shouldShowData: true,
      people: [person],
      currentPage: 1,
      pageCount: 1,
      handleOnChangePage: handleOnChangePageFn,
      isPending: false,
      isSuccess: false,
      isError: false,
      tryAgainHandler: tryAgainHandlerFn,
    };
  });
  it("renders the component", () => {
    const { container } = render(<MainContent {...props} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText("CharacterTableSection")).toBeInTheDocument();
    expect(screen.getByText("Pagination")).toBeInTheDocument();
  });

  describe("when shouldShowData is false", () => {
    it("should render the message container", () => {
      const { container } = render(
        <MainContent {...props} shouldShowData={false} />
      );
      expect(container).toMatchSnapshot();
      expect(screen.getByText("MessageContainer")).toBeInTheDocument();
    });
  });
});
