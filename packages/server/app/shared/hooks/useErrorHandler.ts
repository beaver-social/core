import { useState, useCallback } from "react";

/**
 * A hook to handle errors in functional components
 * Use this with ErrorBoundary to properly catch and handle errors
 *
 * @example
 * const handleError = useErrorHandler();
 *
 * try {
 *   // Some risky operation
 * } catch (error) {
 *   handleError(error);
 * }
 */
function useErrorHandler(): (error: Error) => void {
  const [, setError] = useState<Error | null>(null);

  return useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
}

export default useErrorHandler;
