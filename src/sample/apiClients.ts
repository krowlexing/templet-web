import { ApiClient } from "../data/apiClients";

export const apiClients: ApiClient[] = [
    {
        name: "A common microservice",
        apis: 3,
        created: "5 months ago",
        tags: [],
    },
    {
        name: "Desktop app",
        apis: 1,
        created: "13 days ago",
        tags: [],
    },
    {
        name: "CLI tool",
        apis: 2,
        created: "3 years ago",
        tags: ["legacy"],
    },
    {
        name: "New Client",
        apis: 0,
        created: "1 minute ago",
        tags: [],
    },
];
