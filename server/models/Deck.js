const { Schema, model } = require('mongoose');

const deckSchema = new Schema(
  {
    name: {
      type: String,
    },
    cards: [
      {
        name: {
          type: String,
          required: true,
          unique: true,
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
        superTypes: [
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

deckSchema.virtual('cardCount').get(function () {
  return this.cards.length;
});

const Deck = model('Deck', deckSchema);

module.exports = Deck;
