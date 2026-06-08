import {createContext, useState} from 'react';

export const AuthContext = createContext(); // global container for auth state

function AuthProvider({children}) {
    const[user, setUser] = useState(null);
    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
         localStorage.removeItem("token");
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;
