import styled from "styled-components";
import { COLORS } from "../../../../style-constants";
import StyledMessageSection from "../../../shared/styled-message-wrapper/StyledMessageWrapper";

const svgString = `
  <svg viewBox='-33 -33 66 66' xmlns='http://www.w3.org/2000/svg'>
  <defs>
    <linearGradient id='fadeGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
      <stop offset='0%' style='stop-color:${COLORS.accent}; stop-opacity:1' />
      <stop offset='100%' style='stop-color:${COLORS.accent}; stop-opacity:0' />
    </linearGradient>
  </defs>
  <circle fill='none' stroke-width='6' stroke-dasharray='200' stroke='url(#fadeGradient)' stroke-dashoffset='56' r='30'/>
</svg>
`;

const encodedSvg = encodeURIComponent(svgString.trim());

const backgroundSvg = `url("data:image/svg+xml,${encodedSvg}")`;

const StyledProgress = styled.progress`
  appearance: none;
  display: block;
  background: none;
  width: 1em;
  height: 1em;
  border: 0;

  &::-moz-progress-bar {
    background: none;
  }
  &::-webkit-progress-bar {
    display: none;
  }

  background-image: ${backgroundSvg};

  width: 6em;
  height: 6em;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function LoadingMessage() {
  return (
    <StyledMessageSection
      aria-labelledby="loading-message-title"
      role="status"
      aria-live="assertive"
      data-testid="loading-message-testid"
    >
      <h2 id="loading-message-title">Loading...</h2>
      <label>
        <StyledProgress aria-label="Please wait while we fetch your search results." />
      </label>
    </StyledMessageSection>
  );
}
