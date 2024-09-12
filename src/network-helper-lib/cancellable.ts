import { useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cancellablePromise<A extends any[], T>(
    func: (...args: A) => Promise<T>,
    timeout: number
): (...args: A) => [Promise<T>, () => void] {
    let rejection: () => void;

    return (...args: A) => [
        new Promise((resolve, reject) => {
            // if (cancelled) reject("cancelled because of var");
            const id = setTimeout(() => {
                func(...args).then(resolve);
            }, timeout);

            rejection = () => {
                clearTimeout(id);
                reject("cancelled");
            };
        }),
        () => {
            rejection && rejection();
        },
    ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cancellable<A extends any[], T>(
    func: (...args: A) => T
): (...args: A) => [Promise<T>, () => void] {
    let cancelled = false;
    let rejection: () => void;
    return (...args: A) => [
        new Promise((resolve, reject) => {
            if (cancelled) {
                reject("cancelled");
            }
            const id = setTimeout(() => resolve(func(...args)), 1000);
            rejection = () => {
                clearTimeout(id);
                reject("cancelled");
            };
        }),
        () => {
            cancelled = true;
            rejection && rejection();
        },
    ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useCancellable<T, A extends any[]>(
    request: (...args: A) => [Promise<T>, () => void],
    defaultValue: T
) {
    const cancelation = useRef(() => {});
    const [result, setResult] = useState(defaultValue);

    return [
        result,
        (...args: A) => {
            cancelation.current();
            const [promise, cancel] = request(...args);
            cancelation.current = cancel;
            promise
                .then(result => setResult(result))
                .catch(e => {
                    if (e != "cancelled") {
                        throw e;
                    }
                });
        },
        cancelation.current,
    ] as const;
}
