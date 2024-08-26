import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import { unsafeStringKeys } from "../utils";

export function wrapNetwork<T extends string, Value, Arg>(
    name: T,
    request: (arg: Arg) => Promise<AxiosResponse<Value, unknown>>
) {
    return createAsyncThunk(name, async (arg: Arg) => {
        return await request(arg).then(x => x.data);
    });
}

export type NetworkDescription = {
    [k: string]: NetworkItem<unknown, unknown>;
};

type NetworkItem<Value, Arg> = (
    arg: Arg
) => Promise<AxiosResponse<Value, unknown>>;

export type NetworkThunks<D extends NetworkDescription> = {
    [K in keyof D]: K extends string
        ? D[K] extends NetworkItem<infer V, infer A>
            ? ReturnType<typeof wrapNetwork<K, V, A>>
            : undefined
        : undefined;
};

export function fromDescription<Description extends NetworkDescription>(
    description: Description
): NetworkThunks<Description> {
    const entries = unsafeStringKeys(description);

    const result = {} as NetworkThunks<Description>;
    for (const name of entries) {
        const request = description[name]!;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result[name] = wrapNetwork(name, request) as any;
    }

    return result;
}
