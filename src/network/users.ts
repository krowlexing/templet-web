import { AxiosInstance } from "axios";
import { AbstractSubNetwork } from "../network-helper-lib/AbstractNetwork";
import { AppUser } from "../data/users";

export class UsersNetwork extends AbstractSubNetwork {
    search = (query: string) => search(this.axios(), query);
}

function search(axios: AxiosInstance, query: string) {
    return axios.get<AppUser[]>("/api/users/search", {
        params: {
            query,
        },
    });
}
