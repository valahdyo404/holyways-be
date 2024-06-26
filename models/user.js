"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.transaction, {
        as: "donateHistory",
        foreignKey: "idUser",
      })
      user.hasMany(models.fund, {
        as: "userFund",
        foreignKey: "idUser",
      })
      user.hasMany(models.chat, {
        as: "senderMessage",
        foreignKey: {
          name: "idSender",
        },
      })
      user.hasMany(models.chat, {
        as: "recipientMessage",
        foreignKey: {
          name: "idRecipient",
        },
      })
    }
  }
  user.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      profileImage: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "users",
      modelName: "user",
    }
  )
  return user
}
