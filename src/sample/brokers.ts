import { Broker } from "../data/broker";

export const sampleBrokers: Broker[] = [
    {
        name: "ru-moscow-1",
        id: "9ed9b9d9-b9d9-4d9d-9d9d-b9d9d9d9d9d9",
        permissions: ["r", "w"],
        created: "3 hours ago",
        tags: ["new"],
    },
    {
        name: "ru-samara-ssau-building-15",
        id: "825c77b9-4ebf-4770-8cd8-2d2d2d2d2d2d",
        permissions: ["r", "w", "rs"],
        created: "2 months ago",
        tags: [],
    },
    {
        name: "ru-samara-ssau-hpc",
        id: "881a8d8d-8d8d-4d8d-8d8d-8d8d8d8d8d8d",
        permissions: ["r", "w", "rs"],
        created: "17 days ago",
        tags: [],
    },
];
