import { NavLink, createBrowserRouter } from "react-router-dom";
import { testRoutes } from "./testRouter";

export const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <NavLink to={"/test"}>test</NavLink>
            </>
        ),
    },
    {
        path: "/test",
        children: testRoutes,
    },
]);
