import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Row, Form, Button, Container } from 'react-bootstrap'

// Utilities
import { SEARCH } from '../../utils/queries';
// Components
import MTGCard from '../../components/Card/MTGCard';

const Search = () => {
  const [formState, setFormState] = useState({ name: '' });
  const [searchResults, { called, loading, data }] = useLazyQuery(SEARCH, { variables: { ...formState } });
  const results = data?.search || [];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (called && loading) {
      return (
        <p>loading</p>
      )
    } else {
      try {
        searchResults();
      }
      catch (e) {
        console.log(e)
      }
    }
  }

  const renderSearch = () => {
    if (results) {
      return (
        <>
          <Container
            className="mt-5 mb-5">
            <Row
              className="rounded-3 d-flex justify-content-center text-center align-items-center col-11 m-auto bg-dark" id="bg-card">
              <Form
                className="col-12 col-lg-10 bg-dark p-4 p-sm-5 rounded-3 m-2" onSubmit={handleFormSubmit}>
                <h1 className='text-light mb-4'>Search</h1>
                <Form.Control
                  className="text-dark col-9 fs-6 border border-warning rounded-3 p-2 m-1"
                  placeholder="Your card search here"
                  name="name"
                  type="name"
                  value={formState.name}
                  onChange={handleChange}
                />
                <Button
                  variant="outline-light"
                  size="lg"
                  className="text-center px-5 mt-4 fw-bold rounded-5"
                  type="submit"
                  id="submit">
                  Enter
                </Button>
              </Form>
              <Row
                className='d-flex justify-content-center col-sm-12 mb-5'>
                {results.map(e =>
                  < MTGCard
                    multiverseid={e.multiverseid}
                    types={e.types}
                    name={e.name}
                    manaCost={e.manaCost}
                    supertypes={e.supertypes}
                    rarity={e.rarity}
                    imageUrl={e.imageUrl}
                    text={e.text}
                  />)}
              </Row>
            </Row>
          </Container>
        </>
      )
    }
    return (
      <Container
        className='flex-fill d-flex mb-5'>
        <Row
          className="justify-content-center text-center align-items-center m-auto bg-dark">
          <Form
            className="col-12 col-lg-10 bg-dark p-4 p-sm-5 rounded-3"
            onSubmit={handleFormSubmit}>
            <h1
              className='text-light mb-4'>Search</h1>
            <Form.Control
              placeholder="Your card search here"
              name="name"
              type="name"
              value={formState.name}
              onChange={handleChange}
            />
            <Button
              variant="outline-light"
              size="lg"
              className="text-center px-5 mt-4 fw-bold rounded-5"
              type="submit"
              id="submit">
              Enter
            </Button>
          </Form>
        </Row>
      </Container>
    )
  }
  return (
    <>
      {renderSearch()}
    </>
  )
}


export default Search;