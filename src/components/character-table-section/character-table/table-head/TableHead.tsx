import styled from "styled-components";
import { QUERIES } from "../../../../style-constants";

const TableHead = styled.thead`
  display: none;

  @media ${QUERIES.tabletAndUp} {
    display: revert;
  }
`;

export default TableHead;
