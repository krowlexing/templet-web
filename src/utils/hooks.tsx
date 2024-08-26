import { Paper } from "@mui/material";
import { useRef, useState } from "react";

export function useModal(
    component: (open: () => void, close: () => void) => JSX.Element
): [JSX.Element | undefined, () => void, () => void] {
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    let item;
    if (open) {
        item = (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "rgba(0, 0, 0, 0.3)",
                }}
                onClick={closeModal}
            >
                <Paper
                    sx={{ padding: 2 }}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                >
                    {component(openModal, closeModal)}
                </Paper>
            </div>
        );
    }
    return [item, openModal, closeModal];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCancellable<T, A extends any[]>(
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
