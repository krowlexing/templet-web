import { Operator } from "../data/operator";
import { AbstractSubNetwork } from "../network-helper-lib/AbstractNetwork";

export class AppUsersNetwork extends AbstractSubNetwork {
    all = (appId: number) =>
        this.axios().get<Operator[]>(`/api/apps/${appId}/users`);
    create = (appId: number, userId: number) =>
        this.axios().post(`/api/apps/${appId}/users`, { userId });

    delete = (appId: number, appUserId: number) =>
        this.axios().delete(`/api/apps/${appId}/users/${appUserId}`);
}
