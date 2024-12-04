import { ArrowBack } from "@mui/icons-material";
import {
    Button,
    TableHead,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";
import { Divider, Table, Paper } from "@mui/material";
import { AppSkeleton } from "../../../components/App/AppSkeleton";
import { Column, Row, Txt } from "../../../components/CommonComponents";
import { useNavigate } from "react-router";
import { sampleBrokers } from "../../../sample/brokers";
import { sampleBrokerConfiguration } from "../../../sample/brokerConfiguration";
import { BooleanParameter } from "../../../components/App/BrokerConfiguration/BooleanParameter";
import { DropdownParameter } from "../../../components/App/BrokerConfiguration/DropdownParameter";
import { NumberParameter } from "../../../components/App/BrokerConfiguration/NumberParameter";
import { GenericParameter } from "../../../components/App/BrokerConfiguration/GenericParameter";
import { Search } from "../../../components/Search";
import { useModal } from "../../../utils";
import { PermissionEditor } from "../../../components/App/BrokerConfiguration/PermissionEditor";

export function BrokerInfo() {
    const [modal, open, close] = useModal((open, close) => {
        return (
            <Column padding={2} minWidth={300}>
                <Txt variant="h4">Permissions</Txt>
                <PermissionEditor />
                <Button sx={{ paddingTop: 3 }} onClick={close}>
                    Close
                </Button>
            </Column>
        );
    });
    const nav = useNavigate();
    const onBackClick = () => nav("../");

    const broker = sampleBrokers[0];
    const params = sampleBrokerConfiguration.parameters;
    return (
        <AppSkeleton>
            <Column margin={3}>
                <Row onClick={onBackClick} marginBottom={3}>
                    <ArrowBack />
                    <Txt>Back to Brokers</Txt>
                </Row>
                <Row justifyContent="space-between" marginBottom={3}>
                    <Txt variant="h4">{broker.name}</Txt>
                    <Button variant="contained" color="success" onClick={open}>
                        Edit permissions
                    </Button>
                </Row>
                <Divider sx={{ marginBottom: 3 }} />
                <TextField size="small" placeholder="Search params" />
                <Row>
                    <Table>
                        {params.map(param => (
                            <GenericParameter param={param} />
                        ))}
                    </Table>
                </Row>
            </Column>
            {modal}
        </AppSkeleton>
    );
}
