import { createAsyncThunk } from "@reduxjs/toolkit";
import { NodeData } from "../data/node";
import { v4 } from "uuid";
import { actions } from ".";
import axios from "axios";

const internalServer = {
    nodes: [] as NodeData[],

    createNode(): NodeData {
        const newNode = {
            uuid: v4().toString(),
            name: null,
            description: null,
            token: "some-kind-of-token",
        };

        this.nodes.push(newNode);

        return newNode;
    },
};

export async function register(
    name: string,
    username: string,
    password: string
) {
    return axios
        .post<string>(`${location.origin}/api/register`, {
            name,
            username,
            password,
        })
        .then(r => r.data);
}

export async function login(name: string, username: string, password: string) {
    return axios
        .post<string>(`${location.origin}/api/login`, { username, password })
        .then(r => r.data);
}

// export const thunks = {
//     createNode: {
//         tag: "node/create/request",
//         thunk: async (arg, { dispatch, getState }) => {
//             const node = await requestCreateNode();
//             dispatch(actions.addNode(node));
//         },
//     },
// };
// export const createNode = createAsyncThunk(
//     "node/create/request",
//     async (arg, { dispatch, getState }) => {
//         const node = await requestCreateNode();
//         dispatch(actions.addNode(node));
//     }
// );
