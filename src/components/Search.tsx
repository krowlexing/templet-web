import { Add } from "@mui/icons-material";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { colors } from "./styles";
import { useRef, useState } from "react";
import { useCancellable } from "../utils/hooks";
interface Props {
    search: (query: string) => [Promise<string[]>, () => void];
    placeholder?: string;
    button?: JSX.Element;
}

export function Search(props: Props) {
    const [hints, performSearch, cancel] = useCancellable(
        props.search,
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
                        placeholder={props.placeholder}
                    />
                )}
            />
            {props.button ?? (
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
            )}
        </div>
    );
}
