import { createContext } from "react";
const AuthContext = createContext ({
    token: null,
    isLoggedin: false,
    login: (token) => {},
    logout: () => {},
})

export default AuthContext;