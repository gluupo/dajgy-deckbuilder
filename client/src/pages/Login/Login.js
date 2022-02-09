import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { Row, Form, Button, Container } from 'react-bootstrap'

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
      <Container className='flex-fill align-items-center d-flex'>
        <Row className="rounded-3 d-flex justify-content-center text-center align-items-center col-11 col-lg-6 m-auto bg-dark" id="bg-card">
          <Form className="col-12 col-md-12 col-lg-10 bg-dark p-4 p-sm-5 rounded-3 m-2"
            onSubmit={handleFormSubmit}>
            <h1 className='text-light mb-4'>Log In</h1>
            <Form.Control
              className="text-dark col-9 fs-6 border border-warning rounded-3 p-2 m-1"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Form.Control
              className="text-dark col-9 fs-6 border border-warning rounded-3 p-2 m-1"
              placeholder="**********"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <div>
              <Button
                variant="outline-light"
                size="lg"
                className="text-center px-5 mt-4 fw-bold rounded-5"
                type="submit"
                id="submit"
                onClick={handleFormSubmit}
                onChange={handleChange}>
                Enter
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    );
  };

  return (
    <>
      {renderForm()}
      {error && <div className='text-center text-danger fs-3 fw-bold'>{error.message}</div>}
    </>
  );
};

export default Login;
