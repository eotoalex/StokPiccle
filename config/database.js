const Sequelize = require("sequelize");
const development = 0;
const production = 1;

if (development){
    
    module.exports = new Sequelize(
        database=process.env.DATABASE__,
        user=process.env.USER__,
        password=process.env.PASSWORD__,{
           host:process.env.HOST__,
           dialect:process.env.DIALECT__,
       });
} else if (production){
    module.exports = new Sequelize(
        database=process.env.DATABASE_ ,
        user=process.env.USER_,
        password=process.env.PASSWORD_,{
           host:process.env.HOST_,
           dialect:process.env.DIALECT_,
           dialectOptions: {
               ssl: {
                  rejectUnauthorized: false
               }
           }
       });
};

