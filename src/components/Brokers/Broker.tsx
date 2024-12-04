import { Button, Switch } from "@mui/material";
import { Broker as BrokerData } from "../../data/broker";
import styled from "@emotion/styled";
import { colors } from "../styles";
import { Bedtime, BoltSharp } from "@mui/icons-material";

interface Props {
    broker: BrokerData;
}

export function Broker(props: Props) {
    const indicator = (b: boolean) => <Switch checked={b} />;

    return (
        <Container>
            <div>name - owner</div>
            <div>
                <div>Active: {indicator(false)}</div>
                <div>Stopped: {indicator(false)}</div>
            </div>
        </Container>
    );
}

const Container = styled.div({
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid " + colors.secondary,
    padding: 5,
    alignItems: "center",
    textAlign: "center",
    marginBottom: 10,
    borderRadius: 5,
});
