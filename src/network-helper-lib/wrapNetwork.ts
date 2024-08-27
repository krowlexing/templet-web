import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import { unsafeStringKeys } from "../utils";

import { empty, RequestNone } from "./tracker";
import { network } from "../network/network";

export function wrapNetwork<T extends string, Value, Arg>(
    name: T,
    request: (arg: Arg) => Promise<AxiosResponse<Value, unknown>>
) {
    return createAsyncThunk(name, async (arg: Arg) => {
        return await request(arg).then(x => {
            return x.data;
        });
    });
}

export type NetworkDescription = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k: string]: NetworkItem<any, never>;
};

type NetworkItem<Value, Arg> = (
    arg: Arg
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<AxiosResponse<Value, any>>;

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

type AxiosReturnValue<N> = N extends NetworkItem<infer T, infer A>
    ? T
    : undefined;

export type ThunksInitialState<Description extends NetworkDescription> = {
    [K in keyof Description]: RequestNone<AxiosReturnValue<Description[K]>>;
};

export function initialStateForDescription<D extends NetworkDescription>(
    description: D
): ThunksInitialState<D> {
    const entries = unsafeStringKeys(description);

    const result = {} as ThunksInitialState<D>;

    for (const name of entries) {
        result[name] = empty();
    }

    return result;
}

export function produceRequests<D extends NetworkDescription>(
    description: D
): [NetworkThunks<D>, ThunksInitialState<D>] {
    return [
        fromDescription(description),
        initialStateForDescription(description),
    ];
}

const description = {
    register: data =>
        network.register(data).then(response => {
            network.setToken(response.data);
            return response;
        }),
    login: data =>
        network.login(data).then(response => {
            network.setToken(response.data);
            return response;
        }),
} satisfies NetworkDescription;

export const authThunks = fromDescription(description);
