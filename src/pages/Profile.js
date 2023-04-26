import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


function Profile() {
    const {...isAuthenticated} = useContext(AuthContext);
    const localToken = localStorage.getItem("token");
    const [privateContent, setPrivateContent] = useState();

    useEffect(() => {

        async function getPrivateContent() {
            try {
            const response = await axios.get("http://localhost:3000/660/private-content", { headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localToken}`,
                }})
                setPrivateContent({
                    content: `${response.data.content}`,
                    title: `${response.data.title}`,
                })

            } catch (e) {
                console.error(e)
            }
        }void getPrivateContent();
    },[]);

    return (
        privateContent !== undefined &&
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {isAuthenticated.username}</p>
                <p><strong>Email:</strong> {isAuthenticated.email}</p>
            </section>
            <section>
                <h2>{privateContent.title}</h2>
                <p>{privateContent.content}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
);
}

export default Profile;