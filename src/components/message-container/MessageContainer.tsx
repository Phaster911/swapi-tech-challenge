import ErrorMessage from "./messages/error-message/ErrorMessage";
import NoResultsMessage from "./messages/no-results-message/NoResultsMessage";
import LoadingMessage from "./messages/loading-message/LoadingMessage";
import StyledMessageWrapper from "../shared/styled-message-wrapper/StyledMessageWrapper";

export type MessageContainerProps = {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  pageCount: number;
  tryAgainHandler: () => void;
};

export default function MessageContainer({
  isPending,
  isError,
  isSuccess,
  pageCount,
  tryAgainHandler,
}: MessageContainerProps) {
  return (
    <section>
      <StyledMessageWrapper>
        {isPending && <LoadingMessage />}
        {isError && <ErrorMessage tryAgainHandler={tryAgainHandler} />}
        {isSuccess && pageCount === 0 && <NoResultsMessage />}
      </StyledMessageWrapper>
    </section>
  );
}
