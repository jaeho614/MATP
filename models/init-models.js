var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _store = require("./store");
var _user = require("./user");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var store = _store(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    board,
    store,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
