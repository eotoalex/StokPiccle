const { Sequelize } = require('sequelize');
const db = require("../config/database");

const User = db.define("users", {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
        unique: true,
    },
    email:{
        type: Sequelize.STRING,
        unique: true,
    },
    accesstoken:{
        type: Sequelize.STRING,
        unique: true,
        },
    refreshtoken:{
        type: Sequelize.STRING,
        unique: true,
        }, 
    password: Sequelize.STRING,
    },{
    freezeTableName: true, 
})

// Reset database entry.
// User.sync({force: true}) 

module.exports = User;