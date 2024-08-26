import { NavLink, RouteObject, useNavigate } from "react-router-dom";
import { NodesPage } from "../pages";
import { sampleNodes } from "../sample/nodes";
import { Registration } from "../pages/Registration";
import { Apps } from "../pages/Apps";
import { App } from "../pages/App";
import { sampleApp } from "../sample/app";
import { SkeletonShowcase } from "../pages/SkeletonShowcase";
import { Operators } from "../pages/Operators";
import { Brokers } from "../pages/Brokers";
import { AppInfo } from "../pages/AppInfo";
import { Users } from "../pages/Users";

const TestRegistration = () => {
    const nav = useNavigate();
    return <Registration onCreateAccount={() => nav("../apps")} />;
};

const TestApps = () => {
    const nav = useNavigate();
    return <Apps onClick={() => nav("1/info")} />;
};

const TestApp = () => {
    const nav = useNavigate();
    return <App data={sampleApp} />;
};

export const testRoutes: RouteObject[] = [
    {
        path: "",
        element: (
            <>
                <p>
                    <NavLink to="nodes">nodes</NavLink>
                </p>
                <p>
                    <NavLink to="auth">auth</NavLink>
                </p>
            </>
        ),
    },
    {
        path: "nodes",
        element: <NodesPage nodes={sampleNodes} />,
    },
    {
        path: "auth",
        element: <TestRegistration />,
    },

    {
        path: "apps",
        children: [
            {
                path: "",
                element: <TestApps />,
            },
            {
                path: "1",
                children: [
                    {
                        path: "info",

                        element: <AppInfo app={sampleApp} />,
                    },
                    {
                        path: "operators",
                        element: <Operators />,
                    },
                    {
                        path: "brokers",
                        element: <Brokers />,
                    },
                    {
                        path: "users",
                        element: <Users />,
                    },
                ],
            },
        ],
    },
];
