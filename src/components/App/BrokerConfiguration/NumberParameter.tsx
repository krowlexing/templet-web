import { TableCell, Input } from "@mui/material";
import { TableRow } from "@mui/material";
import { BrokerParameter } from "../../../data/brokerConfiguration";
import { Column, Txt } from "../../CommonComponents";
import { useState } from "react";

interface Props {
    param: BrokerParameter & { type: "number" };
}

export function NumberParameter(props: Props) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(open => !open);
    const { name, description } = props.param;

    return (
        <TableRow onClick={e => toggleOpen()}>
            <TableCell>
                <Column>
                    <Txt>{name}</Txt>
                    {open ? <Txt>{description}</Txt> : null}
                </Column>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
                <Input defaultValue={10} sx={{ maxWidth: 40 }} type="number" />
            </TableCell>
        </TableRow>
    );
}
