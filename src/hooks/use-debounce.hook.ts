import { useEffect, useState } from "react";

export default function useDebounce<T>(
  value: T,
  delay?: number,
  callback?: () => void
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      if (callback) {
        callback();
      }
    }, delay || 300);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, callback]);

  return debouncedValue;
}
