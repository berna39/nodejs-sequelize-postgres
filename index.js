const express = require('express');
const { db } = require('./database/config');
const Gig = require('./models/Gigs');
const { Op } = require('sequelize');
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
    res.send(gigs);
});

app.get('/gigs-order', async (_, res) => {
    const gigs = await Gig.findAll({ order: [ ['title', 'ASC'] ] });
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

app.get('/gigs-by-title-or-technologies/:title/:technologie', async (req, res) => {
    const gigs = await Gig.findAll({ 
        where: { 
            [ Op.and] : [ { title: req.params.title }, { technologies: req.params.technologie } ] 
        } 
    });
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

app.put('/gigs', async (req, res) => {
    const {id, title, description, technologies, budget, contact_email} = req.body;
    const gig = await Gig.update({
        title,
        description,
        technologies,
        budget,
        contact_email
    }, { where: { id:id } });

    res.send(gig);
});

app.delete('/gigs/:id', async (req, res) => {
    await Gig.destroy({ where: { id: req.params.id } });
    res.send({ status: "Deleted" });
});

app.get('/bulk-create', async (req, res) => {
    await Gig.bulkCreate([
        {  
            title: "Sample 1",
            description: "The description sample 1",
            technologies: "NoSQL, Postgres",
            budget: "2100",
            contact_email: "sample1@email.com"
        },
        {  
            title: "Sample 2",
            description: "The description sample 2",
            technologies: "NoSQL, Nodejs",
            budget: "4300",
            contact_email: "sample2@email.com"
        },
        {  
            title: "Sample 3",
            description: "The description sample 3",
            technologies: "MySql, Java",
            budget: "5600",
            contact_email: "sample3@email.com"
        }
    ]);

    res.send({ message: "Data sample created" });
});

app.listen(3000, (err) => {
    if(!err) console.log(`Server up and running`);
    else console.log(err);
})