// @flow
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema: Object = new Schema({
  name: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

export default User;