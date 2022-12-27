const Sequelize = require("sequelize");
// HOW WAS I ABLE TO GET AWAY WITH NOT PUTTING => require('dotenv').config???

module.exports = new Sequelize(
    // process.env.DB,
//     connection = 'postgres://wfmjbuikhkvwtj:a3b4a9ebe14723b05385f1708888c045420c0450c201d10b237cc045d8d650c0@ec2-52-3-60-53.compute-1.amazonaws.com:5432/dbfl02b4p6u3ei',
//     host='ec2-52-3-60-53.compute-1.amazonaws.com',
//     database='dbfl02b4p6u3ei',
//     user='wfmjbuikhkvwtj',
//     password='a3b4a9ebe14723b05385f1708888c045420c0450c201d10b237cc045d8d650c0',{
//         // I see now. Explicitly stating the diaclect is conflicting with my dotenv variables being read properly.
//         dialect:'postgres',
//         pool: {
//             max: 5,
//             min: 0,
//             idle: 10000
//         }
// }
    // host='ec2-52-3-60-53.compute-1.amazonaws.com',
    // database=process.env.DATABASE,
    // user=process.env.USER,
    // password='a3b4a9ebe14723b05385f1708888c045420c0450c201d10b237cc045d8d650c0',{
    //     // I see now. Explicitly stating the diaclect is conflicting with my dotenv variables being read properly.
    //     dialect:'postgres',
    //     pool: {
    //         max: 5,
    //         min: 0,
    //         idle: 10000
    //     }
    // },
    
    // PORT=5432,




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
}
);