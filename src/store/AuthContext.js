import { createContext } from "react";
const AuthContext = createContext ({
    token: null,
    isLoggedin: false,
    isEmailVerified: false,
    login: (token) => {},
    logout: () => {},
})

export default AuthContext;