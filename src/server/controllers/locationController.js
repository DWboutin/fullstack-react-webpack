// @flow
import Location from '../models/Location.model';
import ErrorResponseHandler from '../helpers/ErrorResponseHandler';
import GuardAgainstMissingParameter from '../guards/GuardAgainstMissingParameter';

const locationParameters: Array<string> = [
  'name',
  'country'
];

export function create(req: Object, res: Object) {
  try{
    (new GuardAgainstMissingParameter(req.body, locationParameters)).guard();

    const location: Object = new Location(req.body);

    location.save((err, location) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).json(location);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function read(req: Object, res: Object) {
  try{
    Location.find(req.query, (err, locations) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).json(locations);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function update(req: Object, res: Object) {
  try{
    Location.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      Location.findById(req.params.id, (errFind, location) => {
        if (err) {
          (new ErrorResponseHandler(res, errFind)).writeResponse();
        }

        res.status(200).send(location);
      });
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function remove(req: Object, res: Object) {
  try{
    Location.findByIdAndRemove(req.params.id, req.body, (err, location) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).send(location);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export default {
  create,
  read,
  update,
  delete: remove,
};
