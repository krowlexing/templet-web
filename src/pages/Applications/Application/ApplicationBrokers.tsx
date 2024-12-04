import { ArrowBack } from "@mui/icons-material";
import {
    Button,
    Divider,
    Paper,
    Table,
    TableCell,
    TableHead,
} from "@mui/material";
import { useNavigate } from "react-router";
import { AppSkeleton } from "../../../components/App/AppSkeleton";
import { ApplicationMenu } from "../../../components/Applications/ApplicationMenu/ApplicationMenu";
import { UserRow } from "../../../components/Applications/UserRow/UserRow";
import { Column, Row, Txt } from "../../../components/CommonComponents";
import { sampleUsers } from "../../../sample/users";
import { sampleBrokers } from "../../../sample/brokers";
import { TableRow } from "@mui/material";
import { Broker } from "../../../data/broker";
import { Tags } from "../../../components/Tags";

type Props = {
    onBackClick: () => void;
};

export function ApplicationBrokers(props: Props) {
    const { onBackClick } = props;

    const applicationName = "Sequence Generator";
    const brokers = sampleBrokers;
    const tableHead = ["Name", "Id", "Permissions", "Added", "Tags"];
    const nav = useNavigate();

    return (
        <AppSkeleton>
            <Column margin={3}>
                <Row onClick={onBackClick} marginBottom={3}>
                    <ArrowBack />
                    <Txt>Back to Applications</Txt>
                </Row>
                <Row justifyContent="space-between" marginBottom={3}>
                    <Txt variant="h4">{applicationName}</Txt>
                    <Button variant="contained" color="success">
                        Add User
                    </Button>
                </Row>
                <Divider />
                <Row marginTop={3}>
                    <ApplicationMenu
                        selected="Brokers"
                        onClick={route => nav(`../${route}`)}
                    />
                    <Table component={Paper}>
                        <TableHead>
                            {tableHead.map(head => (
                                <TableCell>{head}</TableCell>
                            ))}
                        </TableHead>
                        {brokers.map(broker => (
                            <BrokerRow
                                broker={broker}
                                onClick={id => nav(`${id}`)}
                            />
                        ))}
                    </Table>
                </Row>
            </Column>
        </AppSkeleton>
    );
}

type BrokerRowProps = {
    broker: Broker;
    onClick: (id: string) => void;
};

function BrokerRow(props: BrokerRowProps) {
    const { name, id, permissions, created, tags } = props.broker;
    const { onClick } = props;

    const permissionsString = permissions.join(", ");
    return (
        <TableRow onClick={() => onClick(id)}>
            <TableCell>{name}</TableCell>
            <TableCell>{id}</TableCell>
            <TableCell>{permissionsString}</TableCell>
            <TableCell>{created}</TableCell>
            <TableCell>
                <Tags tags={tags} />
            </TableCell>
        </TableRow>
    );
}
