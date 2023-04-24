const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    board_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "게시판 번호"
    },
    user_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "회원 번호",
      references: {
        model: 'users',
        key: 'user_no'
      }
    },
    board_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "제목"
    },
    board_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "내용"
    },
    create_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "등록일자"
    },
    update_dt: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수정일자"
    },
    board_del: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "삭제"
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
      {
        name: "user_no",
        using: "BTREE",
        fields: [
          { name: "user_no" },
        ]
      },
    ]
  });
};
