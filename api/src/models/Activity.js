const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    
    id: {
        type: DataTypes.UUID, //sequelize crea tu propio id
        defaultValue:UUIDV4,
        allowNull: false,
        primaryKey:true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    difficulty: {
        type: DataTypes.ENUM ('1','2','3','4','5',),
        allowNull: false,
    },
    
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    season: {
        type: DataTypes.ENUM ('summer','fall','winter','spring',),
        allowNull: false,
    },

  });
};
