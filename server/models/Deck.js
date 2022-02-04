const { Schema, model } = require('mongoose');

const deckSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  card: [
    {

    }
  ]
});

const Deck = model('Deck', deckSchema);

module.exports = Deck;
