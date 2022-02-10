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

export const REMOVE_FROM_DECK = gql`
  mutation removeCard($multiverseid: String!){
    removeCard(multiverseid: $multiverseid){
    multiverseid
    }
  }
`;

export const EDIT_LAND = gql`
  mutation editLand($landtype: String!, $operation: String!) {
    editLand(landtype:$landtype,operation:$operation){
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

export const UPDATE_DECK_NAME = gql`
    mutation updateDeckName($deckName: String!){
        updateDeckName(deckName: $deckName){
            name
        }
    }
`;
