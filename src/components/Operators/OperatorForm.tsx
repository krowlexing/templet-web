import { Add } from "@mui/icons-material";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { colors } from "../styles";
import { useRef, useState } from "react";
import { thunks, useAppDispatch, useAppSelector } from "../../store";
import { Search } from "../Search";
import { performSearch } from "../../pages/Apps";
import { useDispatch } from "react-redux";
import { AppUser } from "../../data/users";
import { network } from "../../network/network";
import { useParams } from "react-router";

interface Props {
    search: (query: string) => [Promise<void>, () => void];
    placeholder?: string;
    button?: JSX.Element;
}

export function OperatorForm() {
    const dispatch = useAppDispatch();
    const [selectedUser, setSelectedUser] = useState(-1);
    const appId = +useParams<{ appId: string }>().appId!;

    const [_, performSearc, cancel] = useCancellable(
        q => performSearch(() => dispatch(thunks.users.search(q))),
        null
    );

    const search = useAppSelector(state => state.users.search);
    const hints = search.value ?? [];
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                padding: 3,
            }}
        >
            <div>selected user: {selectedUser}</div>
            <Autocomplete
                sx={{ marginRight: 1, width: "100%" }}
                disablePortal
                freeSolo
                filterOptions={x => x}
                options={hints}
                getOptionKey={user => (typeof user === "string" ? -1 : user.id)}
                getOptionLabel={user =>
                    typeof user === "string" ? user : user.username
                }
                onChange={(event, value, reason, details) => {
                    if (reason === "selectOption") {
                        if (value == null || typeof value == "string") {
                            setSelectedUser(-1);
                        } else {
                            setSelectedUser(value.id);
                        }
                    } else {
                        setSelectedUser(-1);
                    }
                }}
                onInputChange={() => {
                    setSelectedUser(-1);
                }}
                onInput={t => {
                    const target = t.target as HTMLInputElement;
                    performSearc(target.value);
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        sx={{ marginRight: 1, width: "100%" }}
                        size="small"
                        placeholder={"username"}
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
                onClick={() => {
                    if (selectedUser != -1) {
                        network.operators
                            .create({
                                appId,
                                userId: selectedUser,
                            })
                            .then(() => {
                                dispatch(thunks.operators.all(appId));
                            });
                    }
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

function cancelable<T>(func: () => T): [Promise<T>, () => void] {
    let cancelled = false;
    let rejection: () => void;
    return [
        new Promise((resolve, reject) => {
            if (cancelled) {
                reject("cancelled");
            }
            const id = setTimeout(() => resolve(func()), 1000);
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
