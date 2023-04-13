import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext({ });

function CustomProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState({
        isAuthenticated: false,
        user: null,
    });

    const navigate = useNavigate();

    function login(e) {
        e.preventDefault();
        setIsAuthenticated({
            isAuthenticated: true,
            user: "Arnoud",
        });
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logOut(e) {
        e.preventDefault();
        setIsAuthenticated({
            isAuthenticated: false,
            user: null,
        });
        navigate("/");
    }


    const auth = {
        ...isAuthenticated,
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

