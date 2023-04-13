import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext({ });

function CustomProvider({children}) {
    const [isAuthenticated, toggleIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    function login(e) {
        e.preventDefault()
        toggleIsAuthenticated(true)
        console.log("Gebruiker is ingelogd!")
        navigate("/profile")
    }

    function logOut(e) {
        e.preventDefault()
        toggleIsAuthenticated(false)
        navigate("/")
    }


    const auth = {
        authenticated: isAuthenticated,
        loginFunction: login,
        logoutFunction: logOut
    }


    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export default CustomProvider;

