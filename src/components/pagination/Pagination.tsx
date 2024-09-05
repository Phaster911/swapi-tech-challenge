import { ChevronLeft, ChevronRight } from "react-feather";
import VisuallyHidden from "../visually-hidden/VisuallyHidden";
import styled from "styled-components";
import { COLORS, controlBorderRadius, QUERIES } from "../../style-constants";
import { useMemo } from "react";

export type PaginationProps = {
  currentPage: number;
  pageCount: number;
  handleOnChangePage: (nextPage: number) => void;
};

const PaginationSection = styled.section`
  display: flex;
  justify-content: center;
`;

const StyledPaginationButton = styled.button<{ selected?: boolean }>`
  padding: 0.5rem;
  cursor: pointer;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  width: 2rem;
  border-radius: ${controlBorderRadius};
  border: none;
  background-color: ${(props) =>
    props.selected ? COLORS.accent : COLORS.pageBackground};

  @media ${QUERIES.tabletAndUp} {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    width: 2.5rem;
  }

  &:disabled {
    background-color: ${COLORS.disabled};
    cursor: not-allowed;
  }
`;

const StyledElipsis = styled.span`
  display: inline-block;
  padding: 0.5rem 0 0 0;
  cursor: default;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  min-width: 1rem;
  border-radius: ${controlBorderRadius};
  text-align: center;
`;

const StyledOl = styled.ol`
  display: flex;
  list-style: none;
  padding: 0;
`;

export default function Pagination({
  currentPage,
  pageCount,
  handleOnChangePage,
}: PaginationProps) {
  const onClickPreviousHandler = () => {
    handleOnChangePage(currentPage - 1);
  };

  const onClickNextHandler = () => {
    handleOnChangePage(currentPage + 1);
  };

  const onClickPageHandler = (nextPage: number) => {
    handleOnChangePage(nextPage);
  };

  const getPageNumbers = useMemo(() => {
    const pages = [];
    const maxPagesToShow = 3;

    if (pageCount <= maxPagesToShow) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      const sidePagesCount = Math.floor((maxPagesToShow - 1) / 2);
      let startPage = Math.max(2, currentPage - sidePagesCount);
      let endPage = Math.min(pageCount - 1, currentPage + sidePagesCount);

      if (currentPage <= sidePagesCount) {
        endPage = maxPagesToShow - 1;
      }
      if (currentPage + sidePagesCount >= pageCount) {
        startPage = pageCount - maxPagesToShow + 2;
      }

      pages.push(1);

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < pageCount - 1) {
        pages.push("...");
      }

      pages.push(pageCount);
    }

    return pages;
  }, [currentPage, pageCount]);

  const pageArray = getPageNumbers;

  return (
    <PaginationSection>
      <nav role="navigation" aria-label="Pagination Navigation">
        <StyledOl>
          <li key="previous">
            <StyledPaginationButton
              disabled={currentPage === 1}
              onClick={onClickPreviousHandler}
              data-testid="pagination-previous-button-testid"
              //aria-label="Previous page"
            >
              <ChevronLeft aria-label="Previous Page" />
              <VisuallyHidden>Previous Page</VisuallyHidden>
            </StyledPaginationButton>
          </li>

          {pageArray.map((page, index) => (
            <li key={`${page}-${index}`}>
              {page === "..." ? (
                <StyledElipsis aria-label="ellipsis indicating non-visible pages">
                  {page}
                </StyledElipsis>
              ) : (
                <StyledPaginationButton
                  onClick={() => onClickPageHandler(page as number)}
                  selected={currentPage === page}
                  aria-current={currentPage === page ? "true" : undefined}
                  aria-label={`Page ${page}`}
                  data-testid={`pagination-${page}-button-testid`}
                >
                  {page}
                </StyledPaginationButton>
              )}
            </li>
          ))}
          <li key="next">
            <StyledPaginationButton
              disabled={currentPage === pageCount}
              onClick={onClickNextHandler}
              data-testid="pagination-next-button-testid"
              //aria-label="Next page"
            >
              <ChevronRight aria-label="Next Page" />
              <VisuallyHidden>Next Page</VisuallyHidden>
            </StyledPaginationButton>
          </li>
        </StyledOl>
      </nav>
    </PaginationSection>
  );
}
