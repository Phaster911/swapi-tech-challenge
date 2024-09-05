import styled from "styled-components";
import { COLORS, QUERIES } from "../../style-constants";
import MaxWidthWrapper from "../shared/max-width-wrapper/MaxWidthWrapper";
import MessageContainer from "../message-container/MessageContainer";
import CharacterTableSection from "../character-table-section/CharacterTableSection";
import Pagination from "../pagination/Pagination";
import { Person } from "../../react-query/queries/use-get-people.hook";

const StyledMain = styled.main`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  background-color: ${COLORS.mainBackground};
`;

const Wrapper = styled(MaxWidthWrapper)`
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;

  @media ${QUERIES.tabletAndUp} {
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
  }
`;

export type MainContentProps = {
  shouldShowData: boolean;
  people: Person[];
  currentPage: number;
  pageCount: number;
  handleOnChangePage: (page: number) => void;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  tryAgainHandler: () => void;
};

export default function MainContent({
  shouldShowData,
  people,
  currentPage,
  pageCount,
  handleOnChangePage,
  isPending,
  isSuccess,
  isError,
  tryAgainHandler,
}: MainContentProps) {
  return (
    <StyledMain>
      <Wrapper>
        {shouldShowData ? (
          <>
            <CharacterTableSection people={people} />
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              handleOnChangePage={handleOnChangePage}
            />
          </>
        ) : (
          <MessageContainer
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
            pageCount={pageCount}
            tryAgainHandler={tryAgainHandler}
          />
        )}
      </Wrapper>
    </StyledMain>
  );
}
