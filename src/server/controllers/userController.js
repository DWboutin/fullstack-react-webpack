// @flow
import User from '../models/User.model';
import ErrorResponseHandler from '../helpers/ErrorResponseHandler';
import GuardAgainstMissingParameter from '../guards/GuardAgainstMissingParameter';

const userParameters: Array<string> = [
  'name',
];

export function create(req: Object, res: Object) {
  try{
    (new GuardAgainstMissingParameter(req.body, userParameters)).guard();

    const user: Object = new User(req.body);

    user.save((err, user) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).json(user);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function read(req: Object, res: Object) {
  try{
    User.find(req.query, (err, users) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).json(users);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function update(req: Object, res: Object) {
  try{
    User.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      User.findById(req.params.id, (errFind, user) => {
        if (err) {
          (new ErrorResponseHandler(res, errFind)).writeResponse();
        }

        res.status(200).send(user);
      });
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function remove(req: Object, res: Object) {
  try{
    User.findByIdAndRemove(req.params.id, req.body, (err, user) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).send(user);
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
