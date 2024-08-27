import axios, { AxiosInstance } from "axios";
import { AbstractNetwork } from "../network-helper-lib/AbstractNetwork";
import { AppsRequests } from "./apps";

export class Network extends AbstractNetwork {
    apps: AppsRequests = new AppsRequests(this);

    constructor() {
        super();
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

    register = (params: RegistrationParams) => register(this.instance, params);
    login = (params: LoginBody) => login(this.instance, params);
}

export type RegistrationParams = {
    name: string;
    username: string;
    password: string;
};

export async function register(
    axios: AxiosInstance,
    { name, username, password }: RegistrationParams
) {
    return axios.post<string>("/api/register", {
        name,
        username,
        password,
    });
}

export type LoginBody = {
    username: string;
    password: string;
};

export async function login(
    axios: AxiosInstance,
    { username, password }: LoginBody
) {
    return axios.post<string>("/api/login", {
        username,
        password,
    });
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

export const network = new Network();