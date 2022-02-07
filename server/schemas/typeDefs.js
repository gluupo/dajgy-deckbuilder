const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Deck {
    _id:ID
    cards:[Card]
  }

  type Card @cacheControl(maxAge:86400, scope: PUBLIC) {
    name: String!
    types: [String]!
    manaCost: String
    superTypes:[String]
    rarity: String
    imageUrl: String!
    text: String
    multiverseid: String
    cardCount: Int
  }
  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    search(name:String): [Card]
    getDeck(_id:ID!): Deck
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    createDeck: Deck,
    addToDeck(_id:ID!, multiverseid:String!, text:String, manaCost:String, name:String!, superTypes:[String], rarity:String, imageUrl:String!, types:[String]): Deck
  }

  enum CacheControlScope {
  PUBLIC
  PRIVATE
}

directive @cacheControl(
  maxAge: Int
  scope: CacheControlScope
  inheritMaxAge: Boolean
) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
`;

module.exports = typeDefs;
