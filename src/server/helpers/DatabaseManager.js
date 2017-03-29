// @flow
import _ from 'lodash';

import Drug from '../models/Drug.model';
import Location from '../models/Location.model';
import Player from '../models/Player.model';

import locationsList from './database-objects/locationsList';
import drugsList from './database-objects/drugsList';

class DatabaseManager {
  constructor() {
    // Clear the database beore rebuild it
    Drug.remove();
    Location.remove();
    Player.remove();
  }

  create() {
    const self: Object = this;
    const locations: Promise<any> = this.createLocations();

    locations.then((locationsResults) => {
      return self.createDrugs(locationsResults);
    }).then((drugsResults) => {
      console.log(_.flattenDeep(drugsResults));
    }).catch((err) => {
      throw err;
    });
  }

  createLocations(): Promise<any> {
    const locationsPromises = locationsList.map((location) => {
      return new Promise((fulfill, reject) => {
        Location.find(location, (err, locations) => {
          if (err) {
            reject(err);
          }

          if (locations.length === 0) {
            const newLocation = new Location(location);

            newLocation.save((err, location) => {
              if (err) {
                reject(err);
              }

              fulfill(location);
            });
          } else {
            fulfill(locations[0]);
          }
        });
      });
    });

    return Promise.all(locationsPromises);
  }

  createDrugs(locations: Object): Promise<any> {
    const self = this;

    const drugsLocationsPromises = locations.map((location) => {
      return new Promise((fulfill, reject) => {
        const drugsListPromise = drugsList.map((drug) => {
          return self.createDrug({
            ...drug,
            locationId: location._id,
          });
        });

        Promise.all(drugsListPromise).then((drugs) => {
          fulfill(drugs);
        }).catch((err) => {
          reject(err);
        })
      });
    });

    return Promise.all(drugsLocationsPromises);
  }

  createDrug(drug: Object): Promise<any> {
    return new Promise((fulfill, reject) => {
      Drug.find(drug, (err, drugs) => {
        if (err) {
          reject(err);
        }

        if (typeof drugs === 'undefined' || drugs.length === 0) {
          const newDrug = new Drug(drug);

          newDrug.save((err, drug) => {
            if (err) {
              reject(err);
            }

            fulfill(drug);
          });
        } else {
          fulfill(drugs[0]);
        }
      });
    });
  }
}

export default new DatabaseManager();