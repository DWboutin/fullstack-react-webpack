// @flow
import Drug from '../models/Drug.model';
import ErrorResponseHandler from '../helpers/ErrorResponseHandler';
import GuardAgainstMissingParameter from '../guards/GuardAgainstMissingParameter';

const drugParameters: Array<string> = [
  'name',
  'locationId',
  'quantity',
  'price'
];

export function create(req: Object, res: Object) {
  try{
    (new GuardAgainstMissingParameter(req.body, drugParameters)).guard();

    const drug: Object = new Drug(req.body);

    drug.save((err, drug) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).json(drug);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function read(req: Object, res: Object) {
  try{
    Drug.find(req.query, (err, drugs) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).json(drugs);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function update(req: Object, res: Object) {
  try{
    Drug.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      Drug.findById(req.params.id, (errFind, drug) => {
        if (err) {
          (new ErrorResponseHandler(res, errFind)).writeResponse();
        }

        res.status(200).send(drug);
      });
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function remove(req: Object, res: Object) {
  try{
    Drug.findByIdAndRemove(req.params.id, req.body, (err, drug) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).send(drug);
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
