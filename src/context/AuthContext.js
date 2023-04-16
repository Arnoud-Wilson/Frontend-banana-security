import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export const AuthContext = createContext({ });

function CustomProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState({
        isAuth: false,
        username: null,
        email: null,
        password: null,
    });

    const navigate = useNavigate();

        async function login(e) {
            e.preventDefault();

            try {
                const loginData = await axios.post("http://localhost:3000/login", {
                    email: `${isAuthenticated.email}`,
                    password: `${isAuthenticated.password}`,
                })
                console.log(loginData.data.accessToken)
                console.log("Gebruiker is ingelogd!");
                isAuthenticated.isAuth = true;
                navigate("/profile");
            }catch (e) {
                console.error(e)
            }
    }

    function logOut(e) {
        e.preventDefault();
        setIsAuthenticated({
            isAuth: false,
            username: null,
            email: null,
            password: null,
        });
        navigate("/");
    }

    const auth = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        isAuth: isAuthenticated.isAuth,
        username: isAuthenticated.username,
        email: isAuthenticated.email,
        password: isAuthenticated.password,
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

