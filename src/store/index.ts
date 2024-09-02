import {
    Action,
    CombinedSliceReducer,
    ThunkDispatch,
    combineSlices,
    configureStore,
    createSlice,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { appsSlice, appsThunks } from "./requests/apps";
import { authSlice, authThunks } from "./requests/auth";
import { operatorsSlice, operatorThunks } from "./requests/operators";
import { network } from "../network/network";
import { usersSlice, usersThunks } from "./requests/users";

const main = createSlice({
    name: "global",
    initialState: { loggedIn: network.logged },
    reducers: {
        loggedIn: state => {
            state.loggedIn = true;
        },
    },
});

const rootReducer = combineSlices(
    main,
    usersSlice,
    appsSlice,
    authSlice,
    operatorsSlice
);

export const store = configureStore({
    reducer: rootReducer,
});

export const thunks = {
    apps: appsThunks,
    auth: authThunks,
    operators: operatorThunks,
    users: usersThunks,
};

export const actions = main.actions;

export type ExtractState<R> = R extends CombinedSliceReducer<infer S>
    ? S
    : never;

type State = ExtractState<typeof rootReducer>;
type Dispatch = ThunkDispatch<State, void, Action>;
export const useAppDispatch = useDispatch.withTypes<Dispatch>();
export const useAppSelector = useSelector.withTypes<State>();
