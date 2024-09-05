import styled from "styled-components";
import { Person } from "../../react-query/queries/use-get-people.hook";
import CharacterTable from "./character-table/CharacterTable";

const StyledSection = styled.section`
  flex-grow: 1;
`;

export type CharacterTableSectionProps = {
  people: Person[];
};

export default function CharacterTableSection({
  people,
}: CharacterTableSectionProps) {
  return (
    <StyledSection aria-labelledby="table-caption">
      <CharacterTable people={people} />
    </StyledSection>
  );
}
