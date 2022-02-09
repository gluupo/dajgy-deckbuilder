import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const CREATE_DECK = gql`
  mutation createDeck{
    createDeck{
      _id
    }
  }
`;

export const EDIT_DECK = gql`
  mutation editDeck($deckId: ID!){
    editDeck(deckId: $deckId){
      _id
    }
  }
`;


export const ADD_TO_DECK = gql`
  mutation addToDeck($input: DeckInput){
    addToDeck(input: $input){
        cards{
          name
          text
          imageUrl
          manaCost
          supertypes
          rarity
          types
          cardCount
      }
    }
  }
`;
