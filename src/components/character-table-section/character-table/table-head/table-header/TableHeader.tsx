import styled from "styled-components";
import { COLORS, controlBorderRadius } from "../../../../../style-constants";

const TableHeader = styled.th`
  --radius: calc(${controlBorderRadius} * 2);
  background-color: ${COLORS.mainBackground};
  text-align: left;
  padding: 1.5rem 0.5rem;

  &:first-of-type {
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  &:last-of-type {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
`;

export default TableHeader;
