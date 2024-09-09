import { RotateCcw } from "react-feather";
import styled from "styled-components";
import StyledMessageSection from "../../../shared/styled-message-wrapper/StyledMessageWrapper";
import { COLORS, controlBorderRadius } from "../../../../style-constants";

const StyledButton = styled.button`
  background-color: ${COLORS.pageBackground};
  border-radius: ${controlBorderRadius};
  border: none;
  padding: 1rem 1.5rem;
  cursor: pointer;
  display: flex;
  gap: 1rem;
`;

type FooterProps = {
  tryAgainHandler: () => void;
};

export default function ErrorMessage({ tryAgainHandler }: FooterProps) {
  return (
    <StyledMessageSection
      aria-labelledby="error-message-title"
      role="alert"
      aria-live="assertive"
    >
      <h2 id="error-message-title">Error: Unable to complete search</h2>
      <p>There was a problem processing your request. Please try again.</p>
      <StyledButton
        id="try-again-button"
        aria-label="try again"
        data-testid="try-again-testid"
        onClick={tryAgainHandler}
      >
        Try Again
        <RotateCcw />
      </StyledButton>
    </StyledMessageSection>
  );
}
