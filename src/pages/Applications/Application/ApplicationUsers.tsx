import {
    Button,
    Divider,
    Paper,
    Table,
    TableCell,
    TableHead,
} from "@mui/material";
import { AppSkeleton } from "../../../components/App/AppSkeleton";
import { ArrowBack } from "@mui/icons-material";
import { Typography as Text } from "@mui/material";
import { Column, Row, Txt } from "../../../components/CommonComponents";
import { ApplicationMenu } from "../../../components/Applications/ApplicationMenu/ApplicationMenu";
import { sampleUsers } from "../../../sample/users";
import { UserRow } from "../../../components/Applications/UserRow/UserRow";
import { useNavigate } from "react-router";

type Props = {
    onBackClick: () => void;
};

export function ApplicationUsers(props: Props) {
    const { onBackClick } = props;

    const applicationName = "Sequence Generator";
    const users = sampleUsers;
    const tableHead = ["Name", "Email", "Id", "Added", "Tags"];
    const nav = useNavigate();

    return (
        <AppSkeleton>
            <Column margin={3}>
                <Row onClick={onBackClick} marginBottom={3}>
                    <ArrowBack />
                    <Txt>Back to Applications</Txt>
                </Row>
                <Row justifyContent="space-between" marginBottom={3}>
                    <Text variant="h4">{applicationName}</Text>
                    <Button variant="contained" color="success">
                        Add User
                    </Button>
                </Row>
                <Divider />
                <Row marginTop={3}>
                    <ApplicationMenu
                        selected="Users"
                        onClick={route => nav(`../${route}`)}
                    />
                    <Table component={Paper}>
                        <TableHead>
                            {tableHead.map(head => (
                                <TableCell>{head}</TableCell>
                            ))}
                        </TableHead>
                        {users.map(user => (
                            <UserRow user={user} />
                        ))}
                    </Table>
                </Row>
            </Column>
        </AppSkeleton>
    );
}
