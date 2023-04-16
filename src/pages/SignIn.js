import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn() {
    const { isAuthenticated, setIsAuthenticated, loginFunction } = useContext(AuthContext);


    function changeHandler(e) {
        e.preventDefault();
        const changedFieldName = e.target.name;

        setIsAuthenticated({
            ...isAuthenticated,
            [changedFieldName]: e.target.value,
        });
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={loginFunction} >
          <label htmlFor="email">Email adres:</label>
          <input
              type="email"
              name="email"
              // value={isAuthenticated.email}
              onChange={changeHandler}
          />
          <label htmlFor="password">Wachtwoord:</label>
          <input
              type="password"
              name="password"
              // value={isAuthenticated.password}
              onChange={changeHandler}
          />
        <button>Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;