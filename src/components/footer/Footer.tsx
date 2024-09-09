import styled from "styled-components";
import MaxWidthWrapper from "../shared/max-width-wrapper/MaxWidthWrapper";
import { QUERIES } from "../../style-constants";

const FooterContentWrapper = styled(MaxWidthWrapper)`
  padding: 1rem;
  margin: 0 auto;
  text-align: center;

  @media ${QUERIES.tabletAndUp} {
    padding: 2rem;
  }
`;

export default function Footer() {
  return (
    <footer>
      <FooterContentWrapper>
        <p>© 2024 This Website. All Rights Reserved.</p>
      </FooterContentWrapper>
    </footer>
  );
}
