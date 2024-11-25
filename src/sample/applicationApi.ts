import { ApplicationApi } from "../data/applicationApi";

export const sampleApplicationApis: ApplicationApi[] = [
    {
        name: "A022008 generation",
        subdomain: "a022008-seq-gen",
        scope: "Owner",
        granted: "2 days ago",
        tags: [],
    },
    {
        name: "LLM training Dashboard",
        subdomain: "yet-another-llm",
        scope: "Owner",
        granted: "3 weeks ago",
        tags: ["critical", "1 more "],
    },
    {
        name: "Latin squares app result",
        subdomain: "5e268fc6-5ec6-479f-91b9-229025b3b233",
        scope: "Owner",
        granted: "8 months ago",
        tags: [],
    },
    {
        name: "LLM training Monitoring",
        subdomain: "yet-another-llm",
        scope: "User",
        granted: "2 years ago",
        tags: [],
    },
    {
        name: "New API",
        subdomain: "152e268fc6-5ec6-479f-91b9-229025b3b233",
        scope: "Owner",
        granted: "1 minute ago",
        tags: [],
    },
];
