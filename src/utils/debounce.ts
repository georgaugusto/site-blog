/**
 * Debounce utility functions and hooks optimized for Next.js v15 and React v19
 *
 * These utilities follow React best practices for performance optimization:
 * - Proper cleanup to prevent memory leaks
 * - Stable references with useCallback
 * - TypeScript support for better DX
 * - React v19 concurrent features support
 */

import { useCallback, useEffect, useRef, useState } from "react";

// Type-safe function constraint for debounce utilities
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebouncableFunction = (...args: any[]) => any;

/**
 * Generic debounce function that can be used outside of React components
 *
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends DebouncableFunction>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * React hook for debounced callbacks
 * Optimized for React v19 with proper cleanup and stable references
 *
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced callback function
 *
 * @example
 * ```tsx
 * const debouncedSearch = useDebounce(
 *   (query: string) => performSearch(query),
 *   300
 * );
 * ```
 */
export function useDebounce<T extends DebouncableFunction>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
}

/**
 * Hook for debounced values - useful for search inputs
 * Uses React's concurrent features for better UX
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     performSearch(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Advanced debounced callback hook with leading edge execution option
 * Optimized for search scenarios where you want immediate feedback
 *
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @param leading - Execute immediately on first call
 * @returns Object with debounced function and cancel method
 *
 * @example
 * ```tsx
 * const { debouncedCallback, cancel } = useAdvancedDebounce(
 *   (query: string) => performSearch(query),
 *   300,
 *   true // immediate execution on first call
 * );
 * ```
 */
export function useAdvancedDebounce<T extends DebouncableFunction>(
  callback: T,
  delay: number,
  leading = false
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);
  const lastCallTimeRef = useRef<number>(0);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cancel;
  }, [cancel]);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTimeRef.current;

      cancel();

      // Leading edge execution
      if (leading && timeSinceLastCall >= delay) {
        lastCallTimeRef.current = now;
        callbackRef.current(...args);
        return;
      }

      // Trailing edge execution
      timeoutRef.current = setTimeout(() => {
        lastCallTimeRef.current = Date.now();
        callbackRef.current(...args);
        timeoutRef.current = null;
      }, delay);
    },
    [delay, leading, cancel]
  );

  return { debouncedCallback, cancel };
}
