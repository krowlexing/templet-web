import { ConvertRequests } from "../../network-helper-lib/tracker";
import { appsInitialState } from "./apps";

export const requestsInitialState = {
    ...appsInitialState,
} as const;

export type Requests = ConvertRequests<typeof requestsInitialState>;
