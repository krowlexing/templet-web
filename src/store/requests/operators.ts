import {
    produceRequests,
    sliceFromDescription,
} from "../../network-helper-lib/wrapNetwork";
import { network } from "../../network/network";

export const [operatorsSlice, operatorThunks] = sliceFromDescription(
    "operators",
    {
        all: network.operators.all,
        delete: network.operators.delete,
        create: network.operators.create,
    }
);
