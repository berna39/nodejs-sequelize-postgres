const express = require('express');
const { db } = require('./database/config');
const Gigs = require('./models/Gigs');
const app = express();

init();

async function init()
{
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.get('/gigs', (_, res) => {
    
})

app.listen(3000, (err) => {
    if(!err) console.log(`Server up and running`);
    else console.log(err);
})