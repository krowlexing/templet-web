import { createAsyncThunk } from "@reduxjs/toolkit";
import { NodeData } from "../data/node";
import { v4 } from "uuid";
import { actions } from ".";
import axios, { AxiosInstance } from "axios";

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

export class Network {
    instance: AxiosInstance;

    constructor() {
        const token = localStorage.getItem("token");
        if (token != null) {
            this.instance = axios.create({
                baseURL: location.origin,
                headers: {
                    Authorization: token,
                },
            });
        } else {
            this.instance = axios.create({
                baseURL: location.origin,
            });
        }
    }

    setToken = (token: string) => {
        localStorage.setItem("token", token);
        this.instance = axios.create({
            baseURL: location.origin,
            headers: {
                Authorization: token,
            },
        });
    };

    public register = (name: string, username: string, password: string) =>
        register(this.instance, name, username, password).then(x => {
            this.setToken(x);
            return x;
        });

    test = () => this.instance.get<string>("/api/test").then(res => res.data);

    public login = (username: string, password: string) =>
        login(this.instance, username, password).then(x => {
            this.setToken(x);
            return x;
        });
}

export async function register(
    axios: AxiosInstance,
    name: string,
    username: string,
    password: string
) {
    return axios
        .post<string>("/api/register", {
            name,
            username,
            password,
        })
        .then(r => r.data);
}

export async function login(
    axios: AxiosInstance,
    username: string,
    password: string
) {
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
