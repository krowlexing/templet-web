import { produceRequests } from "../../network-helper-lib/wrapNetwork";
import { network } from "../../network/network";

export const [appsThunks, appsInitialState] = produceRequests({
    allApps: network.apps.all,
    create: network.apps.create,
});
