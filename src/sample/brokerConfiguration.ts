import { BrokerConfiguration } from "../data/brokerConfiguration";

export const sampleBrokerConfiguration: BrokerConfiguration = {
    parameters: [
        {
            name: "on/off parameter",
            description: "some example of a boolean switch/checkbox",
            type: "boolean",
        },
        {
            name: "number parameter",
            description: "some example of a numerical parameter",
            type: "number",
        },
        {
            name: "dropdown parameter",
            description: "some example of a dropdown parameter",
            type: "dropdown",
        },
    ],
};
