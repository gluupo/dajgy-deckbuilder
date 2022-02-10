import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      decks {
        _id
  	    cards{
        	name
        	types
        	manaCost
        	supertypes
        	rarity
        	imageUrl
        	text
        	multiverseid
        	cardCount	
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      decks {
        _id
  	    cards{
        	name
        	types
        	manaCost
        	supertypes
        	rarity
        	imageUrl
        	text
        	multiverseid
        	cardCount	
        }
      }
    }
  }
`;

export const SEARCH = gql`
  query search($name:String!) {
    search(name:$name){
      name
      types
      manaCost
      supertypes
      rarity
      imageUrl
      text
      multiverseid
    }
  }
`;

export const GET_DECK = gql`
  query getDeck($_id:ID!) {
    getDeck(_id:$_id){
      _id
      createdAt
      swamp
      plain
      mountain
      forest
      island
      cards{
        name
        types
        manaCost
        supertypes
        rarity
        imageUrl
        text
        multiverseid
        cardCount
      }
    }
  }
`;
export const GET_ALL_DECKS = gql`
  query getAllDecks {
    getAllDecks{
      _id
      name
      createdAt
    }
  }
`;

