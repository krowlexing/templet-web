import { TableCell, TableRow } from "@mui/material";
import { Tags } from "../../Tags";
import { ApplicationApi } from "../../../data/applicationApi";

interface Props {
    applicationApi: ApplicationApi;
}

export function ApplicationApiRow(props: Props) {
    const { name, subdomain, scope, granted, tags } = props.applicationApi;
    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{subdomain}</TableCell>
            <TableCell>{scope}</TableCell>
            <TableCell>{granted}</TableCell>
            <TableCell>
                <Tags tags={tags} />
            </TableCell>
        </TableRow>
    );
}
