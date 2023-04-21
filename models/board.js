const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    board_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    store_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    board_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    board_stitle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    board_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    board_write: {
      type: DataTypes.DATE,
      allowNull: false
    },
    board_update: {
      type: DataTypes.DATE,
      allowNull: false
    },
    board_del: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'board',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "board_no" },
        ]
      },
    ]
  });
};
