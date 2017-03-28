// @flow
import Player from '../models/Player.model';
import ErrorResponseHandler from '../helpers/ErrorResponseHandler';
import GuardAgainstMissingParameter from '../guards/GuardAgainstMissingParameter';

const playerParameters: Array<string> = [
  'name',
  'currentLocationId',
  'money',
  'health',
];

export function create(req: Object, res: Object) {
  try{
    (new GuardAgainstMissingParameter(req.body, playerParameters)).guard();

    const player: Object = new Player(req.body);

    player.save((err, player) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).json(player);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function read(req: Object, res: Object) {
  try{
    Player.find(req.query, (err, players) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).json(players);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function update(req: Object, res: Object) {
  try{
    Player.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      Player.findById(req.params.id, (errFind, player) => {
        if (err) {
          (new ErrorResponseHandler(res, errFind)).writeResponse();
        }

        res.status(200).send(player);
      });
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function remove(req: Object, res: Object) {
  try{
    Player.findByIdAndRemove(req.params.id, req.body, (err, player) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).send(player);
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
