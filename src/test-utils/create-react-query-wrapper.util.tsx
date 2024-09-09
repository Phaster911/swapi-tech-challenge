import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import createQueryClient from "../react-query/create-queryclient";

export const createReactQueryWrapper = () => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={createQueryClient()}>
      {children}
    </QueryClientProvider>
  );
};
