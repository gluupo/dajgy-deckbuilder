const { Schema, model } = require('mongoose');

const deckSchema = new Schema(
  {
    name: {
      type: String,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },

    swamp: {
      type: Number,
      default: 0,
      required: true
    },
    mountain: {
      type: Number,
      default: 0,
      required: true
    },
    plain: {
      type: Number,
      default: 0,
      required: true
    },
    forest: {
      type: Number,
      default: 0,
      required: true
    },
    island: {
      type: Number,
      default: 0,
      required: true
    },


    cards: [
      {
        name: {
          type: String,
          required: true,
        },
        types: [
          {
            type: String,
            required: true,
          }
        ],
        manaCost: {
          type: String,
        },
        supertypes: [
          {
            type: String,
          }
        ],
        rarity: {
          type: String,
        },
        imageUrl: {
          type: String,
          required: true,
        },
        text: {
          type: String,
        },
        multiverseid: {
          type: String,
        },
        cardCount: {
          type: Number,
          default: 1
        }
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);


deckSchema.virtual('totalCards').get(function () {
  return this.cards.length;
});

const Deck = model('Deck', deckSchema);

module.exports = Deck;
