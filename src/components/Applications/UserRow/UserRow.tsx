import { TableCell, TableRow } from "@mui/material";
import { AppUser } from "../../../data/users";
import { Tags } from "../../Tags";
interface Props {
    user: AppUser;
}

export function UserRow(props: Props) {
    const {
        user: { name, email, id, added, tags },
    } = props;

    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{id}</TableCell>
            <TableCell>{added}</TableCell>
            <TableCell>
                <Tags tags={tags} />
            </TableCell>
        </TableRow>
    );
}
