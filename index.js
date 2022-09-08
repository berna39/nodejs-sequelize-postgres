const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();

//Database config
const sequelize = new Sequelize('codegigs', 'postgres', 'mypassword', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5431
});

// Database connecting
init();

async function init()
{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.listen(3000, (err) => {
    if(!err) console.log(`Server up and running`);
    else console.log(err);
})