import { AxiosInstance } from "axios";
import { AbstractSubNetwork } from "../network-helper-lib/AbstractNetwork";
import { AppData, NewApp } from "../data/app";

export class AppsRequests extends AbstractSubNetwork {
    all = () => allApps(this.axios());
    create = (app: NewApp) => create(this.axios(), app);
}

function allApps(axios: AxiosInstance) {
    return axios.get<AppData[]>("/api/apps/");
}

const create = (axios: AxiosInstance, app: NewApp) =>
    axios.post("/api/apps/", app);
