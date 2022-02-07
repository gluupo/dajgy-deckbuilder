import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
// Utilities
import { SEARCH } from '../utils/queries';
import Card from '../components/Card/Card';
import { Pagination } from 'react-bootstrap'
// Components

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
          <form onSubmit={handleFormSubmit}>
            <input
              placeholder="Enter your search here"
              name="name"
              type="name"
              value={formState.name}
              onChange={handleChange}
            />
            <button type="submit">
              Submit
            </button>
          </form>
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
        </>
      )
    }
    return (
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Enter your search here"
          name="name"
          type="name"
          value={formState.name}
          onChange={handleChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    )
  }
  return (
    <>
      {renderSearch()}
    </>
  )
}


export default Search;