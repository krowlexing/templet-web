import { AxiosInstance } from "axios";
import { AbstractSubNetwork } from "../network-helper-lib/AbstractNetwork";
import { Operator } from "../data/operator";

export class OperatorsRequests extends AbstractSubNetwork {
    all = (appId: number) => all(this.axios(), appId);
    create = ({ appId, userId }: { appId: number; userId: number }) =>
        create(this.axios(), appId, userId);
    delete = ({ appId, operatorId }: { appId: number; operatorId: number }) =>
        deleteOperator(this.axios(), appId, operatorId);
}

function all(axios: AxiosInstance, appId: number) {
    return axios.get<Operator[]>(`/api/apps/${appId}/operators`);
}

const create = (axios: AxiosInstance, appId: number, userId: number) =>
    axios.post(`/api/apps/${appId}/operators`, { operatorId: userId });

const deleteOperator = (
    axios: AxiosInstance,
    appId: number,
    operatorId: number
) => axios.delete(`/api/apps/${appId}/operators/${operatorId}`);
