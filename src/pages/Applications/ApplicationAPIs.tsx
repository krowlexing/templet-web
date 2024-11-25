import { Paper, Table, TableCell, TableHead, TextField } from "@mui/material";
import { AppSkeleton } from "../../components/App/AppSkeleton";
import { Column, Txt } from "../../components/CommonComponents";
import { sampleApplicationApis } from "../../sample/applicationApi";
import { ApplicationApiRow } from "../../components/Applications/ApplicationApiRow/ApplicationApiRow";

export function ApplicationApis() {
    const headers = ["Name", "Subdomain", "Scope", "Access Granted", "Tags"];
    const apis = sampleApplicationApis;
    return (
        <AppSkeleton>
            <Column>
                <Txt sx={{ marginTop: 4, marginBottom: 2 }} variant="h5">
                    Application APIs
                </Txt>
                <TextField
                    sx={{ marginBottom: 2, marginTop: 2 }}
                    placeholder="Search by name or subdomain"
                    size="small"
                />

                <Paper>
                    <Table>
                        <TableHead>
                            {headers.map(header => (
                                <TableCell>{header}</TableCell>
                            ))}
                        </TableHead>

                        {apis.map(api => (
                            <ApplicationApiRow applicationApi={api} />
                        ))}
                    </Table>
                </Paper>
            </Column>
        </AppSkeleton>
    );
}
