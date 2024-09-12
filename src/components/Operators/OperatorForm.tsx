import { useState } from "react";

import { Add } from "@mui/icons-material";
import { Autocomplete, IconButton, TextField } from "@mui/material";

import { useParams } from "react-router";

import { network } from "../../network/network";
import { thunks, useAppDispatch, useAppSelector } from "../../store";
import { colors } from "../styles";
import { useCancellable } from "../../utils/hooks";
import { cancellable } from "../../network-helper-lib/cancellable";

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
        cancellable((q: string) => dispatch(thunks.users.search(q))),
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
