export type BrokerInfo = {
    description: string;
    stopped: boolean;
};

export type Broker = {
    name: string;
    id: string;
    permissions: string[];
    created: string;
    tags: string[];
};
