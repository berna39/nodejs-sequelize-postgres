const express = require('express');
const { db } = require('./database/config');
const Gig = require('./models/Gigs');
const app = express();

app.use(express.json());

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

app.get('/gigs', async (_, res) => {
    const gigs = await Gig.findAll();
    gigs.every(gis => console.log(gis instanceof Gig));
    res.send(gigs);
});

app.get('/gigs-reduced', async (_, res) => {
    const gigs = await Gig.findAll({ attributes:['id', 'title', ['budget', 'amount']] });
    gigs.every(gis => console.log(gis instanceof Gig));
    res.send(gigs);
});

app.get('/gigs-by-title/:title', async (req, res) => {
    const gigs = await Gig.findAll({ where: { title: req.params.title } });
    gigs.every(gis => console.log(gis instanceof Gig));
    res.send(gigs);
});

app.post('/gigs', async (req, res) => {
    const {title, description, technologies, budget, contact_email} = req.body;
    const gig = await Gig.create({
        title,
        description,
        technologies,
        budget,
        contact_email
    });

    res.send(gig);
});

app.listen(3000, (err) => {
    if(!err) console.log(`Server up and running`);
    else console.log(err);
})