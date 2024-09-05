import { ChangeEvent, useId } from "react";
import VisuallyHidden from "../visually-hidden/VisuallyHidden";
import styled from "styled-components";
import { COLORS, controlBorderRadius, QUERIES } from "../../style-constants";

const StyledLabel = styled.label`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  display: flex;
  align-items: stretch;
  justify-content: stretch;

  @media ${QUERIES.tabletAndUp} {
    flex-grow: 0.6;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.mainBackground : COLORS.pageBackground};
  border: 2px solid ${COLORS.mainBackground};
  border-radius: ${controlBorderRadius};
  padding: 0.8rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "auto")};
`;

export type SearchInputProps = {
  value: string;
  disabled: boolean;
  onChangeHandler: (value: string) => void;
};

export default function SearchInput({
  value,
  disabled,
  onChangeHandler,
}: SearchInputProps) {
  const id = useId();
  return (
    <StyledLabel htmlFor={id}>
      <VisuallyHidden>Search for Star Wars characters by name</VisuallyHidden>
      <StyledInput
        id={id}
        type="search"
        placeholder="Search by character name"
        value={value}
        name="search"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChangeHandler(event.target.value)
        }
        aria-label="Search for Star Wars characters by name"
        disabled={disabled}
        data-testid="search-input-testid"
      />
    </StyledLabel>
  );
}
