import { act, renderHook } from "@testing-library/react";
import useDebounce from "../use-debounce.hook";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useDebounce", () => {
  describe("when a delay is not passed", () => {
    it("returns a debounced value after 300ms", async () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value),
        {
          initialProps: {
            value: "value",
          },
        }
      );
      expect(result.current).toBe("value");
      rerender({ value: "value2" });
      expect(result.current).toBe("value");
      await act(async () => {
        vi.advanceTimersByTime(298);
      });
      expect(result.current).toBe("value");
      await act(async () => {
        vi.advanceTimersByTime(3);
      });
      expect(result.current).toBe("value2");
    });
  });
  describe("when a delay is passed", () => {
    it("returns a debounced value after the delay", async () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        {
          initialProps: {
            value: "value",
            delay: 1000,
          },
        }
      );
      expect(result.current).toBe("value");
      rerender({ value: "value2", delay: 1000 });
      expect(result.current).toBe("value");
      await act(async () => {
        vi.advanceTimersByTime(998);
      });
      expect(result.current).toBe("value");
      await act(async () => {
        vi.advanceTimersByTime(3);
      });
      expect(result.current).toBe("value2");
    });
  });

  describe("when a callback is passed", () => {
    it("returns a debounced value after the delay and calls the callback", async () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay, callback),
        {
          initialProps: {
            value: "value",
            delay: 1000,
          },
        }
      );
      expect(result.current).toBe("value");
      rerender({ value: "value2", delay: 1000 });
      expect(result.current).toBe("value");
      await act(async () => {
        vi.advanceTimersByTime(998);
      });
      expect(result.current).toBe("value");
      await act(async () => {
        vi.advanceTimersByTime(3);
      });
      expect(result.current).toBe("value2");
      expect(callback).toHaveBeenCalled();
    });
  });
});
