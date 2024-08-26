export type BrokerInfo = {
    description: string;
    stopped: boolean;
};

export type Broker = {
    name: string;
    owner: string;
    description: string;

    token: string;

    version: string;

    stopped: boolean;
    active: boolean;
};
