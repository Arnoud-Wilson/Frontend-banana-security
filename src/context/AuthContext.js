import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import jwtDecode from "jwt-decode";


export const AuthContext = createContext({ });


function CustomProvider({children}) {

    const navigate = useNavigate();

    const localToken = localStorage.getItem("token");

    const [isAuthenticated, setIsAuthenticated] = useState({
        isAuth: false,
        username: null,
        email: null,
        password: null,
        token: null,
        id: null,
    });

    useEffect(() => {
        async function setUser() {
            const decoded = jwtDecode(localToken)

            try {
                const userResult = await axios.get(`http://localhost:3000/600/users/${decoded.sub}`, { headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localToken}`,
                    }})
                console.log(userResult.data)
                setIsAuthenticated({
                    isAuth: true,
                    username: `${userResult.data.username}`,
                    email: `${userResult.data.email}`,
                    id: `${userResult.data.id}`,
                });
                navigate("/profile");
            }catch (e){
                console.error(e)
            }
        }
        localToken !== null && setUser()
    }, []);


        async function login(e) {
            e.preventDefault();

            try {
                const loginData = await axios.post("http://localhost:3000/login", {
                    email: `${isAuthenticated.email}`,
                    password: `${isAuthenticated.password}`,
                })
                console.log("Gebruiker is ingelogd!");
                localStorage.setItem("token", `${loginData.data.accessToken}`)
                setIsAuthenticated({
                    isAuth: true,
                    token: `${loginData.data.accessToken}`,
                })
                navigate("/profile");
            }catch (e) {
                console.error(e)
            }
    }

    function logOut(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        setIsAuthenticated({
            isAuth: false,
            username: null,
            email: null,
            password: null,
            token: null,
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
        token: isAuthenticated.token,
        id: isAuthenticated.id,
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

