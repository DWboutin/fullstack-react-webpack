// @flow
import mongoose from 'mongoose';
import ExistingEntryException from '../exceptions/ExistingEntryException';

const Schema = mongoose.Schema;

const locationSchema: Object = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
});

locationSchema.pre('save', function (next) {
  const self = this;

  Location.find({
    name: self.name,
    country: self.country
  }, function (err, docs) {
    if (!docs.length){
      next();
    }else{
      next(new ExistingEntryException('Location already exists for this name and country'));
    }
  });
});

const Location = mongoose.model('Location', locationSchema);

export default Location;