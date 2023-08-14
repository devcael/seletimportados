import { useEffect, useState } from "react";

const useDelayedFunctionCall = <T extends any[]>(
    delay: number
): ((func: (...args: T) => void, ...args: T) => void) => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const delayedCall = (func: (...args: T) => void, ...args: T) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            func(...args);
        }, delay);

        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return delayedCall;
};

export default useDelayedFunctionCall;