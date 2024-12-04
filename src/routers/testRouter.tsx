import { Navigate, NavLink, RouteObject, useNavigate } from "react-router-dom";
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
import { Login } from "../pages/Login";
import { RequireAuth } from "../utils/hooks";
import { PublicAppInfo } from "../pages/PublicAppInfo";
import { Applications } from "../components/Applications/Applications";
import { ApplicationUsers } from "../pages/Applications/Application/ApplicationUsers";
import { ApplicationApis } from "../pages/Applications/ApplicationAPIs";
import { ApplicationApiClientRow } from "../components/Applications/ApplicationApiClientRow/ApplicationApiClientRow";
import { ApplicationApiClients } from "../pages/Applications/ApplicationApiClients";
import { ApplicationBrokers } from "../pages/Applications/Application/ApplicationBrokers";
import { BrokerInfo } from "../pages/Applications/Broker/BrokerInfo";

const TestRegistration = () => {
    const nav = useNavigate();
    return <Registration onCreateAccount={() => nav("../apps")} />;
};

const TestApps = () => {
    const nav = useNavigate();
    return <Apps onClick={id => nav(id + "")} />;
};

const TestApp = () => {
    const nav = useNavigate();
    return <App data={sampleApp} />;
};

const TestApplicationUsers = () => {
    const nav = useNavigate();
    return <ApplicationUsers onBackClick={() => nav("../..")} />;
};

const WithBackClick = (props: {
    Element: (props: { onBackClick: () => void }) => JSX.Element;
}) => {
    const { Element } = props;
    const nav = useNavigate();
    return <Element onBackClick={() => nav("../..")} />;
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
        element: <div>nodes</div>,
    },
    {
        path: "auth",
        element: <TestRegistration />,
    },
    {
        path: "login",
        element: <Login />,
    },

    {
        path: "app-apis",
        element: <ApplicationApis />,
    },
    {
        path: "client-apis",
        element: <ApplicationApiClients />,
    },
    {
        path: "apps",
        children: [
            {
                path: "",
                element: <Applications />,
            },
            {
                path: ":appId",
                children: [
                    {
                        path: "",
                        element: <Navigate to="users" />,
                    },
                    {
                        path: "info",
                        element: <RequireAuth element={<AppInfo />} />,
                    },
                    {
                        path: "operators",
                        element: <Operators />,
                    },
                    {
                        path: "brokers",
                        children: [
                            {
                                path: "",
                                element: (
                                    <WithBackClick
                                        Element={ApplicationBrokers}
                                    />
                                ),
                            },
                            {
                                path: ":brokerId",
                                element: <BrokerInfo />,
                            },
                        ],
                    },
                    {
                        path: "users",
                        element: <TestApplicationUsers />,
                    },
                ],
            },
        ],
    },
];
