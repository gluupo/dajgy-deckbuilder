const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    decks: [Deck]
    workingDeck: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Deck {
    _id:ID
    name: String
    cards:[Card]
    swamp: Int
    mountain: Int
    plain: Int
    forest: Int
    island: Int
    createdAt: String
  }


  type Card @cacheControl(maxAge:86400, scope: PUBLIC) {
    name: String!
    types: [String]!
    manaCost: String
    supertypes:[String]
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
    getUserDecks(userId:ID!): [Deck]
    getAllDecks(order: Int, limit: Int): [Deck]
  }

  input DeckInput {
    multiverseid:String!,
    text:String,
    manaCost:String,
    name:String!,
    supertypes:[String],
    rarity:String,
    imageUrl:String!,
    types:[String],
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    createDeck: Deck,
    addToDeck(input: DeckInput): Deck
    editDeck(deckId: ID): Deck
    removeCard(multiverseid: String!): Card
    editLand(landtype: String!, operation: String!):Deck
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
