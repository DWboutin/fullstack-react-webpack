// @flow
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const playerSchema: Object = new Schema({
  name: { type: String, required: true, unique: true },
  currentLocationId: { type: Number, required: true },
  money: { type: Number, required: true },
  health: { type: Number, required: true },
  bankId: { type: Number },
});

const Player = mongoose.model('Player', playerSchema);

export default Player;