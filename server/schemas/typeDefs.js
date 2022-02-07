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
  type Card @cacheControl(maxAge:86400, scope: PUBLIC) {
    name: String!
    types: [String]!
    manaCost: String
    superTypes:[String]
    rarity: String
    imageUrl: String!
    text: String
    multiverseid: String
  }
  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    search(name:String): [Card]
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
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
