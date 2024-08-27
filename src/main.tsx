import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/index.ts";
import { mainRouter } from "./routers/mainRouter.tsx";
import { Network } from "./store/network.ts";

export const network = new Network();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={mainRouter} />
        </Provider>
    </React.StrictMode>
);
