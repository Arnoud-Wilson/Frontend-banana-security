import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import jwtDecode from "jwt-decode";
import checkIfTokenIsValid from "../helpers/checkIfTokenIsValid";


export const AuthContext = createContext({ });


function CustomProvider({children}) {
    const localToken = localStorage.getItem("token");
    const navigate = useNavigate();


    const [isAuthenticated, setIsAuthenticated] = useState({
        isAuth: false,
        username: null,
        email: null,
        password: null,
        token: null,
        id: null,
        status: "pending",
    });

    useEffect(() => {

        console.log("Context wordt gerefresht!")

        async function setUser() {
            const decoded = jwtDecode(localToken)

            try {
                const userResult = await axios.get(`http://localhost:3000/600/users/${decoded.sub}`, { headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localToken}`,
                    }})
                setIsAuthenticated({
                    isAuth: true,
                    username: `${userResult.data.username}`,
                    email: `${userResult.data.email}`,
                    id: `${userResult.data.id}`,
                    status: "done",
                });
                navigate("/profile");
            }catch (e){
                setIsAuthenticated({
                    status: "done",
                    isAuth: false,
                    username: null,
                    email: null,
                    id: null,
                })
                console.error(e)
            }
        }
        if (localToken !== null && checkIfTokenIsValid(localToken)) {
            void setUser()
        }
        else {
            setIsAuthenticated({
                status: "done",
                isAuth: false,
        })}
    }, []);


        async function login(e) {
            e.preventDefault();

            try {
                const loginData = await axios.post("http://localhost:3000/login", {
                    email: `${isAuthenticated.email}`,
                    password: `${isAuthenticated.password}`,
                })
                console.log("Gebruiker is ingelogd!");
                console.log(loginData)
                localStorage.setItem("token", `${loginData.data.accessToken}`)
                setIsAuthenticated({
                    isAuth: true,
                    token: `${loginData.data.accessToken}`,
                    status: "done",
                    username: isAuthenticated.username,
                    email: isAuthenticated.email,
                })
                navigate("/profile");
            }catch (e) {
                setIsAuthenticated({status: "done"});
                console.error(e);
            }
    }

    function logOut(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        setIsAuthenticated({
            isAuth: false,
            username: null,
            email: null,
            token: null,
            status: "done",
        });
        navigate("/");
    }

    const auth = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        isAuth: isAuthenticated.isAuth,
        username: isAuthenticated.username,
        email: isAuthenticated.email,
        token: isAuthenticated.token,
        id: isAuthenticated.id,
        loginFunction: login,
        logoutFunction: logOut
    }


    return (
        <AuthContext.Provider value={auth}>
            {isAuthenticated.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default CustomProvider;

