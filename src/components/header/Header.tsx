import { Search } from "react-feather";
import SearchInput from "../search-input/SearchInput";
import { FormEvent } from "react";
import styled from "styled-components";
import { COLORS, controlBorderRadius, QUERIES } from "../../style-constants";
import MaxWidthWrapper from "../shared/max-width-wrapper/MaxWidthWrapper";

const Wrapper = styled(MaxWidthWrapper)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  margin: 0 auto;
  padding: 1rem 1rem;
  gap: 1rem;

  @media ${QUERIES.tabletAndUp} {
    grid-template-columns: minmax(max-content, 1fr) 1fr;
    grid-template-rows: 1fr;
  }
`;

const StyledH1 = styled.h1`
  text-align: center;

  @media ${QUERIES.tabletAndUp} {
    text-align: left;
  }
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media ${QUERIES.tabletAndUp} {
    justify-content: flex-end;
  }
`;

const StyledSubmitButon = styled.button<{ disabled: boolean }>`
  border-radius: ${controlBorderRadius};
  padding: 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ disabled }) =>
    disabled ? COLORS.mainBackground : COLORS.pageBackground};
  border: 2px solid ${COLORS.mainBackground};
`;

export type HeaderProps = {
  isPending: boolean;
  searchTerm: string;
  handleOnChangeSearch: (value: string) => void;
};

export default function Header({
  isPending,
  searchTerm,
  handleOnChangeSearch,
}: HeaderProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <header>
      <Wrapper>
        <StyledH1>Star Wars Characters</StyledH1>
        <StyledForm onSubmit={handleSubmit} role="search">
          <SearchInput
            disabled={isPending}
            value={searchTerm}
            onChangeHandler={handleOnChangeSearch}
          />
          <StyledSubmitButon
            type="submit"
            aria-label="Search for Star Wars characters by name"
            disabled={isPending}
            data-testid="search-form-submit-testid"
          >
            <Search
              aria-label="Search for Star Wars characters by name"
              color={COLORS.accent}
            />
          </StyledSubmitButon>
        </StyledForm>
      </Wrapper>
    </header>
  );
}
