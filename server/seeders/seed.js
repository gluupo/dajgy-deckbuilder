const db = require('../config/connection');
const { User } = require('../models');
const { Deck } = require('../models');
const userSeeds = require('./userSeeds.json');
const deckSeeds = require('./deckSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Deck.deleteMany({});
    await User.insertMany(userSeeds);
    await Deck.insertMany(deckSeeds);

    const deck = await Deck.findOne()
    const user = await User.findOneAndUpdate({}, { $addToSet: { decks: deck._id } });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
