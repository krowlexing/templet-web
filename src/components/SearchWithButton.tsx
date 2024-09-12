import { Add } from "@mui/icons-material";
import { Autocomplete, IconButton, TextField } from "@mui/material";

import { useCancellable } from "../utils/hooks";
import { colors } from "./styles";

interface Props<T, K extends number> {
    placeholder?: string;
    search: (query: string) => [Promise<T[]>, () => void];
    button?: JSX.Element;
    getLabel: (obj: T) => string;
    getKey: (obj: T) => K;
    onSelect: (userId: number) => void;
    onUnselect: () => void;
    onButtonClick: () => void;
}

export function SearchWithButton<T, K extends number>(props: Props<T, K>) {
    const { search, getLabel, getKey } = props;
    const { onSelect, onUnselect, onButtonClick } = props;

    const [options, wrappedSearch] = useCancellable(search, []);

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
                options={options}
                getOptionKey={option =>
                    typeof option === "string" ? -1 : getKey(option)
                }
                getOptionLabel={option =>
                    typeof option === "string" ? option : getLabel(option)
                }
                onChange={(event, value, reason) => {
                    if (reason === "selectOption") {
                        if (value == null || typeof value == "string") {
                            onUnselect();
                        } else {
                            onSelect(getKey(value));
                        }
                    } else {
                        onUnselect();
                    }
                }}
                onInputChange={onUnselect}
                onInput={t => {
                    const target = t.target as HTMLInputElement;
                    wrappedSearch(target.value);
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
                onClick={onButtonClick}
            >
                <Add />
            </IconButton>
        </div>
    );
}
