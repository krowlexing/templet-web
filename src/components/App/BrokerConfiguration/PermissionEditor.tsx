import { CheckBox } from "@mui/icons-material";
import { Checkbox, Table, TableCell, TableRow } from "@mui/material";

interface Props {}

export function PermissionEditor(props: Props) {
    const permissions = ["read", "write", "response"];
    const defaults = [true, true, false];
    return (
        <Table>
            {permissions.map((permission, i) => (
                <TableRow>
                    <TableCell>{permission}</TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                        <Checkbox defaultChecked={defaults[i]} />
                    </TableCell>
                </TableRow>
            ))}
        </Table>
    );
}
