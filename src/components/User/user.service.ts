export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export function getUser() {
    const str = localStorage.getItem("user");
    if (!str) {
        return;
    }
    return JSON.parse(str) || {};
}