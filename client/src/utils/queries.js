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
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const SEARCH = gql`
  query search($name:String!) {
    search(name:$name){
      name
      types
      manaCost
      superTypes
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
      cards{
        name
        types
        manaCost
        superTypes
        rarity
        imageUrl
        text
        multiverseid
        cardCount
      }
    }
  }
`;

export const GET_USER_DECKS = gql`
  query getUserDecks($userId:ID!) {
    getUserDecks(userId:$userId){
      _id
  	  cards{
      	name
      	types
      	manaCost
      	superTypes
      	rarity
      	imageUrl
      	text
      	multiverseid
      	cardCount	
    }
  }
}
`;
