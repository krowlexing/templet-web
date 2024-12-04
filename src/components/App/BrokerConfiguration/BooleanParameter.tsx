import { Checkbox, TableCell, TableRow } from "@mui/material";
import { BrokerParameter } from "../../../data/brokerConfiguration";
import { useState } from "react";
import { Column, Txt } from "../../CommonComponents";

interface Props {
    param: BrokerParameter & { type: "boolean" };
}

export function BooleanParameter(props: Props) {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(open => !open);

    const { name, description } = props.param;

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
            <TableCell padding="checkbox" sx={{ textAlign: "center" }}>
                <Checkbox
                    onClick={e => {
                        e.stopPropagation();
                    }}
                />
            </TableCell>
        </TableRow>
    );
}
