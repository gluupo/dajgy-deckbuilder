import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

import Auth from '../../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  const renderForm = () => {
    if (data) {
      return (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      )
    }
    return (
      <div className="row justify-content-center text-center align-items-center col-11 col-lg-6 m-auto">
        <form
          className="form container col-12 col-md-12 col-lg-10 bg-dark p-4 p-sm-5 rounded-3 m-2"
          onSubmit={handleFormSubmit}>
          <h1 className='text-light mb-4'>Login</h1>
          <input
            className="text-dark col-9 fs-5 border border-warning rounded-3 p-2 m-1"
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className="text-dark col-9 fs-5 border border-warning rounded-3 p-2 m-1"
            placeholder="**********"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <div>
            <button
              className="text-center col-4 btn btn-info btn-lg mt-4 fw-bold rounded-5"
              type="button"
              onClick={handleFormSubmit}
              onChange={handleChange}
              id="submit"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <main>
      <h4>Login</h4>
      <div className="row text-center text-light">
        <div>
          {renderForm()}
          {error && <div>{error.message}</div>}
        </div>
      </div>
    </main>
  );
};

export default Login;
