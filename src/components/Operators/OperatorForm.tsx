import { Add } from "@mui/icons-material";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { colors } from "../styles";
import { useRef, useState } from "react";

export function OperatorForm() {
    const [hints, performSearch, cancel] = useCancellable(
        search,
        [] as string[]
    );
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                padding: 3,
            }}
        >
            <Autocomplete
                sx={{ marginRight: 1, width: "100%" }}
                disablePortal
                freeSolo
                filterOptions={x => x}
                options={hints}
                onInput={t => {
                    const target = t.target as HTMLInputElement;
                    performSearch(target.value);
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        sx={{ marginRight: 1, width: "100%" }}
                        size="small"
                        placeholder="Username"
                    />
                )}
            />
            <IconButton
                sx={{
                    backgroundColor: colors.primary,
                    color: colors.background,
                    borderRadius: 1,
                    ":hover": {
                        backgroundColor: colors.accent,
                    },
                }}
            >
                <Add />
            </IconButton>
        </div>
    );
}

const searchResults = ["krowlexing", "svostokin", "shattered"];

function search(query: string): [Promise<string[]>, () => void] {
    let cancelled = false;
    let rejection: () => void;
    return [
        new Promise((resolve, reject) => {
            if (cancelled) {
                reject("cancelled");
            }
            const id = setTimeout(
                () => resolve(searchResults.filter(x => x.startsWith(query))),
                1000
            );
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

// function cancelable();

// function perform(q: string) {
//     const [result, cancel] = search(q);

//     result
//         .then(x => {
//             console.log(x);
//         })
//         .catch(y => {
//             console.log(y);
//         });
// }

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
