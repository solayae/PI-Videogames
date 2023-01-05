const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("genre", {
    // id: {
    //   type: DataTypes.UUID,   // no le ponemos id porque sequelize lo pone solo
    //   primaryKey: true,
    // },
    name: {
      type: DataTypes.STRING,
    },
  });
};

