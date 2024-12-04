export type BrokerParameterType = "boolean" | "dropdown" | "number";
export type BrokerConfiguration = {
    parameters: BrokerParameter[];
};

export type BrokerParameter = {
    name: string;
    description: string;
    type: BrokerParameterType;
};
