import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Form, Button, Container } from 'react-bootstrap'

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
      <Container className='flex-fill align-items-center d-flex'>
        <Row className="rounded-3 d-flex justify-content-center text-center align-items-center col-11 col-lg-6 m-auto bg-dark" id="bg-card">
          <Form className="col-12 col-md-12 col-lg-10 bg-dark p-4 p-sm-5 rounded-3 m-2"
            onSubmit={handleFormSubmit}>
            <h1 className='text-light mb-4'>Sign Up</h1>
            <Form.Control
              className="text-dark col-9 fs-6 border border-warning rounded-3 p-2 m-1"
              placeholder="Username"
              name="username"
              type="text"
              value={formState.name}
              onChange={handleChange}
            />
            <Form.Control
              className="text-dark col-9 fs-6 border border-warning rounded-3 p-2 m-1"
              placeholder="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Form.Control
              className="text-dark col-9 fs-6 border border-warning rounded-3 p-2 m-1"
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
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
          </Form>
        </Row>
      </Container>
    );
  };

  return (
    <>
      {renderForm()}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default Signup;
