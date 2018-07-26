const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = (wagner) => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/Trabajadores', {
    useMongoClient: true
  });

  wagner.factory('db', () => mongoose);
  const Trabajador = require('./trabajador.model');

  const models = {
    Trabajador,
  };

  _.each(models, (v, k) => {
    wagner.factory(k, () => v);
  });
}