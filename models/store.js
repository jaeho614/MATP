const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('store', {
    store_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    store_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    menu_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    region_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    store_addr: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    store_detail_addr: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    store_tel: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    wkd_time: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    wknd_time: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    breaktime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    view_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    like_cnt: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    store_menu: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    store_tag: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'store',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "store_no" },
        ]
      },
    ]
  });
};
