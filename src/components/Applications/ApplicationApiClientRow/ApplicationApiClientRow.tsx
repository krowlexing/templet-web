import { TableCell, TableRow } from "@mui/material";
import { ApiClient } from "../../../data/apiClients";
import { Tags } from "../../Tags";

interface Props {
    apiClient: ApiClient;
}

export function ApplicationApiClientRow(props: Props) {
    const { name, apis, created, tags } = props.apiClient;

    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{apis}</TableCell>
            <TableCell>{created}</TableCell>
            <TableCell>
                <Tags tags={tags} />
            </TableCell>
        </TableRow>
    );
}
