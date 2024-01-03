import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Register from "./pages/Register/register.tsx";
import Login from "./pages/Login/login.tsx";
import {PropsWithChildren} from "react";
import {ThemeProvider} from "@emotion/react";

import theme from './theme';
import UserProvider, {useUser} from "./contexts/userContext.tsx";
import {CssBaseline} from "@mui/material";
import Dashboard from "./pages/Dashboard/dashboard.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute/>,
    },
    {
        path: "/auth/register",
        element: <Register/>,
    },
    {
        path: "/auth/login",
        element: <Login/>,
    },
    {
        path: "*",
        element: <NoMatch/>,
    },
]);

type ComponentWithProps = [React.ComponentType<any>, object?];

function buildProvidersTree(componentWithProps: ComponentWithProps[] = []) {
    const initialComponent = ({children}: PropsWithChildren) => <>{children}</>;
    return componentWithProps.reduce(
        (AccumulatedComponents, [Provider, props = {}]) => {
            return ({children}) => {
                return (
                    <AccumulatedComponents>
                        <Provider {...props}>{children}</Provider>
                    </AccumulatedComponents>
                );
            };
        },
        initialComponent
    );
}

const queryClient = new QueryClient()

const ProvidersTree = buildProvidersTree([
    [QueryClientProvider, {client: queryClient}],
    [ThemeProvider, {theme}],
    [UserProvider],
]);

function App() {
    return (
        <ProvidersTree>
            <CssBaseline/>
            <RouterProvider router={router} fallbackElement={<h1>Loading..</h1>}/>
        </ProvidersTree>
    );
}

function ProtectedRoute() {
    const user = useUser()
    if (!user.email) {
        return <Navigate to="/auth/login"/>;
    }

    return <Dashboard/>;
}

function NoMatch() {
    return <h2>404</h2>;
}

export default App
