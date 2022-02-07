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
`

export const CREATE_DECK = gql`
  mutation createDeck{
    createDeck{
      _id
    }
}`;


export const ADD_TO_DECK = gql`
  mutation addToDeck($_id:ID!,
   $multiverseid:String!, 
   $text:String, 
   $manaCost:String, 
   $name:String!, 
   $superTypes:[String], 
   $rarity:String, 
   $imageUrl:String!,
   $types:[String]
   ){
    addToDeck(_id:$_id, multiverseid:$multiverseid, text:$text, manaCost:$manaCost, name:$name, superTypes:$superTypes, rarity:$rarity, imageUrl:$imageUrl, types:$types){
      deck{
        _id
        cards{
          name
          text
          imageUrl
          manaCost
          superTypes
          rarity
          types
        }
      }
    }
  }`