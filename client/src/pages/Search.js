import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Pagination, Row, Col, Form, Button, Container } from 'react-bootstrap'
// Utilities
import { SEARCH } from '../utils/queries';
// Components
import Card from '../components/Card/Card';

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
      console.log(results)
      return (
        <>
          <Container>
            <Form className='mb-5' onSubmit={handleFormSubmit}>
              <Form.Control
                placeholder="Enter your search here"
                name="name"
                type="name"
                value={formState.name}
                onChange={handleChange}
              />
              <Button type="submit">
                Submit
              </Button>
            </Form>
            <Row className='d-flex justify-content-center'>
              {results.map(e =>
                < Card
                  multiverseid={e.multiverseid}
                  name={e.name}
                  manaCost={e.manaCost}
                  superTypes={e.superTypes}
                  rarity={e.rarity}
                  imageUrl={e.imageUrl}
                  text={e.text}
                />)}
            </Row>
          </Container>
        </>
      )
    }
    return (
      <Form className='mb-5' onSubmit={handleFormSubmit}>
        <Form.Control
          placeholder="Enter your search here"
          name="name"
          type="name"
          value={formState.name}
          onChange={handleChange}
        />
        <Button type="submit">
          Submit
        </Button>
      </Form>
    )
  }
  return (
    <>
      {renderSearch()}
    </>
  )
}


export default Search;