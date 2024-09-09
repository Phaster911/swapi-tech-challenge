import createQueryClient from "../create-queryclient";
import { QueryClient } from "@tanstack/react-query";

vi.mock("@tanstack/react-query", () => ({
  QueryClient: vi.fn(),
}));

describe("createReactQueryClient", () => {
  it("calls QueryClient with the correct config object", () => {
    createQueryClient();
    expect(QueryClient).toHaveBeenCalledWith({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
      },
    });
  });
});
