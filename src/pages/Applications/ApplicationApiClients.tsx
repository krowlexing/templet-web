import {
    Button,
    Paper,
    Table,
    TableCell,
    TableHead,
    TextField,
} from "@mui/material";
import { AppSkeleton } from "../../components/App/AppSkeleton";
import { Column, Row, Txt } from "../../components/CommonComponents";
import { apiClients } from "../../sample/apiClients";
import { ApplicationApiClientRow } from "../../components/Applications/ApplicationApiClientRow/ApplicationApiClientRow";

export function ApplicationApiClients() {
    const headers = ["Name", "Number of APIs", "Created", "Tags"];
    const apiClient = apiClients;
    return (
        <AppSkeleton>
            <Column>
                <Txt sx={{ marginTop: 4, marginBottom: 2 }} variant="h5">
                    API Clients
                </Txt>
                <Row marginBottom={2} justifyContent="space-between">
                    <TextField
                        placeholder="Search by name"
                        size="small"
                    ></TextField>
                    <Button variant="contained" color="success">
                        Create Client
                    </Button>
                </Row>

                <Paper>
                    <Table>
                        <TableHead>
                            {headers.map(header => (
                                <TableCell>{header}</TableCell>
                            ))}
                        </TableHead>
                        {apiClient.map(client => (
                            <ApplicationApiClientRow apiClient={client} />
                        ))}
                    </Table>
                </Paper>
            </Column>
        </AppSkeleton>
    );
}
