import {
    NetworkDescription,
    produceRequests,
    sliceFromDescription,
} from "../../network-helper-lib/wrapNetwork";
import { network, RegistrationParams } from "../../network/network";

const description = {
    register: (data: RegistrationParams) =>
        network.register(data).then(response => {
            network.setToken(response.data);
            return response;
        }),
    login: (data: RegistrationParams) =>
        network.login(data).then(response => {
            network.setToken(response.data);
            return response;
        }),
} satisfies NetworkDescription;

export const [authSlice, authThunks] = sliceFromDescription(
    "auth",
    description
);
