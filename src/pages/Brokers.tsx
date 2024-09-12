import { SideMenu } from "../components/Menu/SideMenu";
import { Skeleton } from "../components/Skeleton";
import { menu, templetMenu } from "../data/menu";
import { Operators as OperatorList } from "../components/Operators/Operators";
import { sampleOperators } from "../sample/operators";
import { Button, Paper } from "@mui/material";
import { Header1 } from "../components/styles";
import { BrokerList } from "../components/Brokers/BrokerList";
import { sampleBrokers } from "../sample/brokers";
import { useModal } from "../utils";
import { useEffect, useState } from "react";
import { Broker } from "../data/broker";
import { network } from "../network/network";
import { useParams } from "react-router-dom";
import { BrokerForm } from "../components/Brokers/BrokerForm";

export function Brokers() {
    const [brokers, setBrokers] = useState<Broker[]>();
    const appId = +useParams<{ appId: string }>().appId!;

    const getBrokers = (appId: number) =>
        network.brokers
            .all(appId)
            .then(res => res.data)
            .then(setBrokers);

    const [newBrokerModal, open, close] = useModal((open, close) => (
        <BrokerForm
            onCreate={broker => {
                network.brokers
                    .create(appId, broker)
                    .then(() => getBrokers(appId));
            }}
            onCancel={close}
        />
    ));

    useEffect(() => {
        getBrokers(appId);
    }, [appId]);

    if (brokers == undefined) {
        return ":(";
    }

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
                    <BrokerList brokers={brokers} />
                    {newBrokerModal}
                </Paper>
            }
        />
    );
}
