import styled from "styled-components";
import TableHead from "./table-head/TableHead";
import TableHeader from "./table-head/table-header/TableHeader";
import CharacterTableRow from "./character-table-row/CharacterTableRow";
import { COLORS, controlBorderRadius, QUERIES } from "../../../style-constants";
import { Person } from "../../../react-query/queries/use-get-people.hook";
import VisuallyHidden from "../../visually-hidden/VisuallyHidden";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const TableWrapper = styled.div`
  background-color: ${COLORS.pageBackground};
  border-radius: calc(${controlBorderRadius} * 2);
  padding: 1rem;

  @media ${QUERIES.tabletAndUp} {
    padding: 2rem;
  }
`;

export type CharacterTableProps = {
  people: Person[];
};

export default function CharacterTable({ people }: CharacterTableProps) {
  return (
    <TableWrapper>
      <StyledTable>
        <caption id="table-caption">
          <VisuallyHidden>Star Wars characters table</VisuallyHidden>
        </caption>
        <TableHead>
          <tr>
            <TableHeader>NAME</TableHeader>
            <TableHeader>GENDER</TableHeader>
            <TableHeader>BIRTH YEAR</TableHeader>
            <TableHeader>MASS</TableHeader>
            <TableHeader>HEIGHT</TableHeader>
            <TableHeader>FILMS STARRED</TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {people.map(
            ({ id, name, gender, birthYear, mass, filmsEntered, height }) => (
              <CharacterTableRow
                key={id}
                name={name}
                gender={gender}
                birthYear={birthYear}
                mass={mass}
                height={height}
                filmsEntered={filmsEntered}
              />
            )
          )}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
}
