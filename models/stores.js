const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stores', {
    store_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "가게번호"
    },
    rgn_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "지역번호",
      references: {
        model: 'regions',
        key: 'rgn_no'
      }
    },
    store_nm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "가게 이름"
    },
    store_addr: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "가게 주소"
    },
    store_detail_addr: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "가게 상세 주소"
    },
    store_tel: {
      type: DataTypes.STRING(13),
      allowNull: true,
      comment: "가게 전화",
      unique: "uk_name"
    },
    store_content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "가게 설명"
    },
    store_wkd_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "평일 영업시간"
    },
    store_wknd_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "주말 영업시간"
    },
    store_break_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "쉬는 시간"
    },
    store_view_cnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "좋아요 수"
    },
    create_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "등록 일자"
    },
    update_dt: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수정 일자"
    },
    store_del: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "삭제 여부"
    }
  }, {
    sequelize,
    tableName: 'stores',
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
      {
        name: "uk_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "store_tel" },
        ]
      },
      {
        name: "rgn_no",
        using: "BTREE",
        fields: [
          { name: "rgn_no" },
        ]
      },
    ]
  });
};