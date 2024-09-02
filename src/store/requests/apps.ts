import { sliceFromDescription } from "../../network-helper-lib/wrapNetwork";
import { network } from "../../network/network";

export const [appsSlice, appsThunks] = sliceFromDescription("apps", {
    allApps: network.apps.all,
    create: network.apps.create,
    search: network.apps.search,
    appInfo: network.apps.info,
});
