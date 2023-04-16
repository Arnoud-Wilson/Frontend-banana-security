import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        username: "",
    })

    function changeHandler(e) {
        const changedFieldName = e.target.name;

        setFormState({
            ...formState,
            [changedFieldName]: e.target.value,
        });
    }

    async function register() {

        try {
            await axios.post("http://localhost:3000/register", {
                email: `${formState.email}`,
                password: `${formState.password}`,
                username: `${formState.username}`,
            });
            navigate("/signin")
        }
        catch (e) {
            console.error(e)
        }
    }

    function inputData(e) {
        e.preventDefault();
        console.log(formState);
        register();
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={inputData}>
          <label htmlFor="email">Email adres:</label>
          <input
              type="email"
              name="email"
              value={formState.email}
              onChange={changeHandler}
          />
          <label htmlFor="username">Gebruikersnaam:</label>
          <input
              type="text"
              name="username"
              value={formState.username}
              onChange={changeHandler}
          />
          <label htmlFor="password">Wachtwoord:</label>
          <input
              type="password"
              name="password"
              value={formState.password}
              onChange={changeHandler}
          />
          <button>Registreren</button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;