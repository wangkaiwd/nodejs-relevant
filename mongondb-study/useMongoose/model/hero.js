const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeroSchema = new Schema({
  name: String,
  skillCount: Number,
  alias: String,
  position: String
});

const Hero1 = mongoose.model('hero1', HeroSchema);

module.exports = Hero1;
