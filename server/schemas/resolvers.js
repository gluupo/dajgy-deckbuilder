const { AuthenticationError } = require('apollo-server-express');
const { User, Deck } = require('../models');
const { card } = require('mtgsdk')
const { signToken } = require('../utils/auth');
const { collection } = require('../models/User');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id }).populate('decks');
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('decks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    search: async (_, args, context) => {
      const response = await card.where({ name: args.name });
      console.log(response)
      return response.filter(e => e.imageUrl)
    },
    getDeck: async (_, args, context) => {
      const deck = await Deck.findOne({ _id: args._id })
      return deck;
    },
    getAllDecks: async (_, { order = -1, limit = 5 }, context) => {
      return await Deck.find({}).sort({ createdAt: order }).limit(limit)
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createDeck: async (_, args, context) => {
      if (context.user) {
        const deck = await Deck.create({});
        const user = await User.findOne({ _id: context.user._id });
        user.decks.push(deck._id);
        user.workingDeck = deck._id;
        user.save();
        return deck
      }
    },
    addToDeck: async (_, { input }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        console.log(input)
        Object.keys(input).map(k => input[k] = typeof input[k] == 'string' ? input[k].trim() : input[k]);
        const deck = await Deck.findOne({ _id: user.workingDeck })
        const exists = deck.cards.some((obj) => obj.multiverseid === input.multiverseid)
        console.log(exists)
        if (!exists) {
          deck.cards.push({ ...input })
        }
        else {
          for (let i = 0; i < deck.cards.length; i++) {
            if (deck.cards[i].multiverseid === input.multiverseid) {
              if (deck.cards[i].supertypes && deck.cards[i].supertypes.some(str => str === 'Legendary') && deck.cards[i].cardCount < 2)
                deck.cards[i].cardCount++
            } else if (deck.cards[i].cardCount < 4)
              deck.cards[i].cardCount++
          }
        }
        deck.save()
        return deck;
      }
    },
    editDeck: async (_, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        const exists = user.decks.includes(args.deckId)
        if (exists) {
          user.workingDeck = args.deckId
          const deck = await Deck.findOne({ _id: args.deckId })
          return deck;
        }
      }
    },
    removeCard: async (_, { card }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        const deck = await Deck.findOneAndUpdate(
          { _id: user.workingDeck }
          // This is will get me to the right deck
        );
        const exists = deck.cards.some((obj) => obj.multiverseid === input.multiverseid)
        console.log(exists)
        if (!exists) {
          return deck
        } else {
          for (let i = 0; i < deck.cards.length; i++) {
            if (deck.cards[i].multiverseid === card.multiverseid && deck.cards[i].cardCount < 4) {
              deck.cards[i].cardCount--
            }
          }
          return deck
        }
      }
    },
    // editLand: async (_, args, context) => {
    //   if (context.user) {
    //     const user = await User.findOne({ _id: context.user._id });
    //     const deck = await Deck.findOneAndUpdate(
    //       { _id: user.workingDeck }
    //     )
    //   }
    // }
  }
}


module.exports = resolvers;
