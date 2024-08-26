import {
    Action,
    PayloadAction,
    ThunkDispatch,
    configureStore,
    createSlice,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { type State, initialState } from "./state";
import { NodeData } from "../data/node";
import { thunk } from "redux-thunk";

const slice = createSlice({
    initialState,
    name: "general",
    reducers: {
        addNode(state, action: PayloadAction<NodeData>) {
            state.nodes.push(action.payload);
        },
    },
});

export const store = configureStore<State>({
    reducer: slice.reducer,
});

export const actions = slice.actions;

type Dispatch = ThunkDispatch<State, void, Action>;
export const useAppDispatch = useDispatch.withTypes<Dispatch>();
export const useAppSelector = useSelector.withTypes<State>();
