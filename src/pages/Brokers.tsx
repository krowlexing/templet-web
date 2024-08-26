import { SideMenu } from "../components/Menu/SideMenu";
import { Skeleton } from "../components/Skeleton";
import { menu, templetMenu } from "../data/menu";
import { Operators as OperatorList } from "../components/Operators/Operators";
import { sampleOperators } from "../sample/operators";
import { Button, Paper } from "@mui/material";
import { Header1 } from "../components/styles";
import { BrokerList } from "../components/Brokers/BrokerList";
import { sampleBrokers } from "../sample/brokers";
import { BrokerForm } from "../components/Brokers/BrokerForm";
import { useModal } from "../utils";

export function Brokers() {
    const [newBrokerModal, open, close] = useModal((open, close) => (
        <BrokerForm onCreate={close} onCancel={close} />
    ));

    return (
        <Skeleton
            sidemenu={
                <SideMenu items={templetMenu} selected={menu.brokers.label} />
            }
            main={
                <Paper sx={{ padding: 2 }}>
                    <div
                        style={{
                            marginBottom: 20,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Header1>Брокеры</Header1>
                        <Button variant="contained" size="small" onClick={open}>
                            Добавить брокера
                        </Button>
                    </div>
                    <BrokerList brokers={sampleBrokers} />
                    {newBrokerModal}
                </Paper>
            }
        />
    );
}
