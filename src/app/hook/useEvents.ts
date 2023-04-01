import { useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEvent = <T extends (...args: any[]) => any>(callback: T): T => {
    const ref = useRef(callback);
    ref.current = callback;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, react-hooks/exhaustive-deps, @typescript-eslint/no-unsafe-argument
    return useCallback(((...args) => ref.current(...args)) as T, []);
};
