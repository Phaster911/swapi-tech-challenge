import StyledMessageSection from "../../../shared/styled-message-wrapper/StyledMessageWrapper";

export default function NoResultsMessage() {
  return (
    <StyledMessageSection
      aria-labelledby="no-results-title"
      role="status"
      aria-live="assertive"
      data-testid="no-results-message-testid"
    >
      <h2 id="no-results-title">No Results Found</h2>
      <p>
        We're sorry, but no results matched your search criteria. Please try
        again with different keywords.
      </p>
    </StyledMessageSection>
  );
}
