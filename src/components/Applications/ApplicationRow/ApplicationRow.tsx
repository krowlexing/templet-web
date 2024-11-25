import { TableCell, TableRow } from "@mui/material";
import { Application } from "../../../data/application";
import { Tag } from "../../Tag";

type Props = {
    application: Application;
    onClick: () => void;
};
export function ApplicationRow(props: Props) {
    const { name, subdomain, created, tags } = props.application;
    const { onClick } = props;
    return (
        <TableRow onClick={onClick}>
            <TableCell>{name}</TableCell>
            <TableCell>{subdomain}</TableCell>
            <TableCell>{created}</TableCell>
            <TableCell>
                {tags[0] && <Tag value={tags[0]} />}{" "}
                {tags.length > 1 && `+ ${tags.length - 1}`}
            </TableCell>
        </TableRow>
    );
}
