import { Broker } from "../data/broker";
import { AbstractSubNetwork } from "../network-helper-lib/AbstractNetwork";

export type NewBroker = {
    name: string;
    description: string;
    stopped: boolean;
};

export class BrokersNetwork extends AbstractSubNetwork {
    all = (appId: number) =>
        this.axios().get<Broker[]>(`/api/apps/${appId}/brokers`);
    create = (appId: number, broker: NewBroker) =>
        this.axios().post(`/api/apps/${appId}/brokers`, broker);
    delete = (appId: number, brokerId: number) =>
        this.axios().delete(`/api/apps/${appId}/brokers/${brokerId}`);
}
