import { COLORS } from "../../style-constants";
import styled from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import createQueryClient from "../../react-query/create-queryclient";
import Home from "../home/Home";

const AppWrapper = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  color: ${COLORS.text};
`;

export default function App() {
  return (
    <AppWrapper>
      <QueryClientProvider client={createQueryClient()}>
        <Home />
      </QueryClientProvider>
    </AppWrapper>
  );
}
