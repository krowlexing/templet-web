import {
    Button,
    Stack,
    TableCell,
    TableHead,
    TextField,
    Typography,
} from "@mui/material";
import { Table, TableRow } from "@mui/material";
import { Tag } from "../Tag";
import { Paper } from "@mui/material";
import { Application } from "../../data/application";
import { sampleApplications } from "../../sample/applications";

interface Props {}

export function ApplicationsContent(props: Props) {
    const round = { borderRadius: "40px" };
    const applications = sampleApplications;
    return (
        <div style={{ width: "100%", flex: 1 }}>
            <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 4 }}>
                Applications
            </Typography>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
            >
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search by name or api subdomain"
                    sx={{ width: 400 }}
                />
                <Button variant="contained" color="success">
                    Create Application
                </Button>
            </Stack>

            <Paper sx={{ borderRadius: 1.5 }}>
                <Table>
                    <TableHead
                        sx={{
                            borderBottom: "2px solid lightgray",
                        }}
                    >
                        <TableCell>Name</TableCell>
                        <TableCell>API Subdomain</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Tags</TableCell>
                    </TableHead>

                    {applications.map(app => (
                        <ApplicationRow application={app} />
                    ))}
                </Table>
            </Paper>
        </div>
    );
}

function ApplicationRow(props: { application: Application }) {
    const { name, subdomain, created, tags } = props.application;
    return (
        <TableRow>
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
