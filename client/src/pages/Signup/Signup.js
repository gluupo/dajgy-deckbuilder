import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
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
        <form className="form container col-12 col-md-12 col-lg-10 bg-dark p-4 p-sm-5 rounded-3 m-2"
          onSubmit={handleFormSubmit}>
          <h1 className='text-light mb-4'>Sign Up</h1>
          <input
            className="text-dark col-9 fs-5 border border-warning rounded-3 p-2 m-1"
            placeholder="Username"
            name="username"
            type="text"
            value={formState.name}
            onChange={handleChange}
          />
          <input
            className="text-dark col-9 fs-5 border border-warning rounded-3 p-2 m-1"
            placeholder="Email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className="text-dark col-9 fs-5 border border-warning rounded-3 p-2 m-1"
            placeholder="Password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button
            className="text-center col-4 btn btn-info btn-lg mt-4 fw-bold rounded-5"
            type="submit"
            type="button"
            onClick={handleFormSubmit}
            onChange={handleChange}
            id="submit">
            Submit
          </button>
        </form>
      </div>
    );
  };

  return (
    <main>
      <h4>Sign Up</h4>
      <div>
        {renderForm()}
        {error && <div>{error.message}</div>}
      </div>
    </main>
  );
};

export default Signup;
