const Sequelize = require("sequelize");
// HOW WAS I ABLE TO GET AWAY WITH NOT PUTTING => require('dotenv').config???

module.exports = new Sequelize(
    // process.env.DB,
    database ='quiggly_db',
    process.env.DB_USER,
    
    process.env.PASSWORD, {
        // I see now. Explicitly stating the diaclect is conflicting with my dotenv variables being read properly.
        dialect:'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
});