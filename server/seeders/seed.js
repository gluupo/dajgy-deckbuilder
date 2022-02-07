const db = require('../config/connection');
const { User } = require('../models');
const { Deck } = require('../models');
const userSeeds = require('./userSeeds.json');
const deckSeeds = require('./deckSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Deck.deleteMany({});
    await User.create(userSeeds);
    await Deck.create(deckSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
