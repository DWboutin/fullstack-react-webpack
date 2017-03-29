// @flow
import mongoose from 'mongoose';
import ExistingEntryException from '../exceptions/ExistingEntryException';

const Schema = mongoose.Schema;

const drugSchema: Object = new Schema({
  name: { type: String, required: true },
  locationId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

drugSchema.pre('save', function (next) {
  const self = this;

  Drug.find({
    name: self.name,
    locationId: self.locationId
  }, function (err, docs) {
    if (!docs.length){
      next();
    }else{
      next(new ExistingEntryException('Drug already exists for this name and location'));
    }
  });
});

const Drug = mongoose.model('Drug', drugSchema);

export default Drug;