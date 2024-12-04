import { FormControl, MenuItem, Select, TableCell } from "@mui/material";
import { TableRow, Checkbox } from "@mui/material";
import { useState } from "react";
import { BrokerParameter } from "../../../data/brokerConfiguration";
import { Column, Txt } from "../../CommonComponents";

interface Props {
    param: BrokerParameter & { type: "dropdown" };
}

export function DropdownParameter(props: Props) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Value A");
    const toggleOpen = () => setOpen(open => !open);

    const { name, description } = props.param;
    const items = ["Value A", "Value B", "Value C"];
    return (
        <TableRow
            onClick={e => {
                toggleOpen();
                e.preventDefault();
            }}
            sx={{ userSelect: "none" }}
        >
            <TableCell>
                <Column>
                    <Txt>{name}</Txt>
                    {open ? <Txt>{description}</Txt> : null}
                </Column>
            </TableCell>
            <TableCell>
                <Select
                    size="small"
                    value={selected}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                    onChange={e => setSelected(e.target.value)}
                >
                    {items.map(item => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </TableCell>
        </TableRow>
    );
}
