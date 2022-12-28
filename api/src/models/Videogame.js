const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo.
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE
    },
    rating: {
      type: DataTypes.DECIMAL
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    }
  });
};
