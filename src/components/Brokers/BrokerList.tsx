import { Broker as BrokerData } from "../../data/broker";
import { Broker } from "./Broker";

interface Props {
    brokers: BrokerData[];
}

export function BrokerList(props: Props) {
    const { brokers } = props;

    return brokers.map(broker => <Broker broker={broker} />);
}
