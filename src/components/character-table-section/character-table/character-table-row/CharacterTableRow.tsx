import styled from "styled-components";
import CharacterTableData from "./character-table-data/CharacterTableData";
import { Person } from "../../../../react-query/queries/use-get-people.hook";

const StyledTableRow = styled.tr`
  &:nth-child(even) td {
    background-color: #f0f0f0;
    overflow: hidden;
  }

  &:last-child {
    border-bottom: revert;
  }
`;

export type CharacterTableRowProps = Omit<Person, "id">;

export default function CharacterTableRow({
  name,
  gender,
  birthYear,
  mass,
  filmsEntered,
  height,
}: CharacterTableRowProps) {
  return (
    <StyledTableRow data-testid="table-row">
      <CharacterTableData cellName="name">{name}</CharacterTableData>
      <CharacterTableData cellName="gender">{gender}</CharacterTableData>
      <CharacterTableData cellName="birth year">{birthYear}</CharacterTableData>
      <CharacterTableData cellName="height">{height}</CharacterTableData>
      <CharacterTableData cellName="mass">{mass}</CharacterTableData>
      <CharacterTableData cellName="films entered">
        {filmsEntered}
      </CharacterTableData>
    </StyledTableRow>
  );
}
