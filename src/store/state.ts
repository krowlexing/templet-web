import { NodeData } from "../data/node";

export type State = {
    nodes: NodeData[];
};

export const initialState: State = {
    nodes: [],
};
