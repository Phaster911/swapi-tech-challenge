import styled from "styled-components";
import { controlBorderRadius, QUERIES } from "../../../../../style-constants";
import { ReactNode } from "react";

const StyledTableData = styled.td`
  --radius: calc(${controlBorderRadius} * 2);
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 15ch auto;
  gap: 0.5rem;
  text-align: left;

  &:first-child {
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
  }
  &:last-child {
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }

  &::before {
    content: attr(data-cell) ": ";
    text-transform: capitalize;
    font-weight: 700;
  }

  @media ${QUERIES.tabletAndUp} {
    display: revert;
    padding: 1rem 0.5rem;

    &::before {
      display: none;
    }

    &:first-child {
      border-top-left-radius: var(--radius);
      border-bottom-left-radius: var(--radius);
      border-top-right-radius: 0;
    }
    &:last-child {
      border-top-right-radius: var(--radius);
      border-bottom-right-radius: var(--radius);
      border-bottom-left-radius: 0;
    }
  }
`;

export type CharacterTableDataProps = {
  cellName: string;
  children: ReactNode;
};

export default function CharacterTableData({
  cellName,
  children,
}: CharacterTableDataProps) {
  return <StyledTableData data-cell={cellName}>{children}</StyledTableData>;
}
