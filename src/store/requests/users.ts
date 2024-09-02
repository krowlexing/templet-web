import { sliceFromDescription } from "../../network-helper-lib/wrapNetwork";
import { network } from "../../network/network";

export const [usersSlice, usersThunks] = sliceFromDescription("users", {
    search: network.users.search,
});
