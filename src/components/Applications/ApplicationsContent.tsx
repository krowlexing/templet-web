import {
    Button,
    Stack,
    TableCell,
    TableHead,
    TextField,
    Typography,
    Table,
    Paper,
} from "@mui/material";
import { sampleApplications } from "../../sample/applications";
import { ApplicationRow } from "./ApplicationRow/ApplicationRow";
import { useNavigate } from "react-router";

interface Props {}

export function ApplicationsContent(props: Props) {
    const nav = useNavigate();
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
                        <ApplicationRow
                            application={app}
                            onClick={() => nav("1/users")}
                        />
                    ))}
                </Table>
            </Paper>
        </div>
    );
}
