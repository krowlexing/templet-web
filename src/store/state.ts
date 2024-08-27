import { AppData } from "../data/app";
import { NodeData } from "../data/node";
import { Requests, requestsInitialState } from "./requests";

export type State = {
    apps: AppData[];
    requests: Requests;
};

export const initialState: State = {
    apps: [],
    requests: requestsInitialState,
};
