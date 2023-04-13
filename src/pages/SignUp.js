import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    const [formState, setFormState] = useState({
        email: "",
        user: "",
        password: "",
    })

    function changeHandler(e) {
        const changedFieldName = e.target.name;

        setFormState({
            ...formState,
            [changedFieldName]: e.target.value,
        });
    }

    function register(e) {
        e.preventDefault();
        console.log(formState);
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={register}>
          <label htmlFor="email">Email adres:</label>
          <input
              type="email"
              name="email"
              value={formState.email}
              onChange={changeHandler}
          />
          <label htmlFor="user">Gebruikersnaam:</label>
          <input
              type="text"
              name="user"
              value={formState.user}
              onChange={changeHandler}
          />
          <label htmlFor="email">Wachtwoord:</label>
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