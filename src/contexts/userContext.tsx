/* eslint-disable @typescript-eslint/no-unsafe-return */
import {Dispatch, PropsWithChildren, useReducer} from "react";
import {createCustomContext} from "./create-context";
import {getUser, User} from "../components/User/user.service.ts";

const initial: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: ''
};

type UserContextState = {
    user: User;
    dispatch: Dispatch<UserActions>;
};

const [useCustomContext, ContextProvider] =
    createCustomContext<UserContextState>();

export default function UserProvider({children}: PropsWithChildren) {
    const _user = getUser();
    const [user, dispatch] = useReducer(userReducer, _user ? _user : initial);

    return (
        <ContextProvider value={{user, dispatch}}>{children}</ContextProvider>
    );
}

export function useUser(): User {
    const {user} = useCustomContext();
    return user;
}

export function useUserDispatch() {
    const {dispatch} = useCustomContext();
    return dispatch;
}

export type UserActions = ActionLogout | ActionLogin;

type ActionLogin = {
    type: "login";
    payload: User;
};

type ActionLogout = {
    type: "logout";
};

function userReducer(user: User, action: UserActions): User {
    switch (action.type) {
        case "login":
            return {
                ...user,
                ...action.payload,
            };

        case "logout":
            return {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            };
        default:
            return user;
    }
}
