import { AxiosInstance } from "axios";
import { AbstractSubNetwork } from "../network-helper-lib/AbstractNetwork";
import { AppData, NewApp } from "../data/app";

export class AppsRequests extends AbstractSubNetwork {
    all = () => allApps(this.axios());
    create = (app: NewApp) => create(this.axios(), app);
    search = (title: string) => search(this.axios(), title);
    info = (id: number) => info(this.axios(), id);
}

function allApps(axios: AxiosInstance) {
    return axios.get<AppData[]>("/api/apps/");
}

const create = (axios: AxiosInstance, app: NewApp) =>
    axios.post("/api/apps/", app);

const search = (axios: AxiosInstance, title: string) =>
    axios.get<AppData[]>("/api/apps/search", {
        params: {
            q: title,
        },
    });

const info = (axios: AxiosInstance, id: number) =>
    axios.get<AppData>(`/api/apps/${id}/info`);
