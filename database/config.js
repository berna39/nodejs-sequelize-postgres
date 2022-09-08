const { Sequelize } = require('sequelize');
//Database config
module.exports.db = new Sequelize('codegigs', 'postgres', 'mypassword', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5431,
    pool:{
        max: 20,
        min: 0,
        idle: 0
    }
});
