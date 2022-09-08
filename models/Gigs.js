const { Sequelie, DataTypes, Model } = require('sequelize');
const { db } = require('../database/config');


const Gig = db.define('Gig', {
    title: {
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    technologies:{
        type: DataTypes.STRING
    },
    budget:{
        type: DataTypes.STRING
    },
    contact_email:{
        type: DataTypes.STRING
    }
});

module.exports = Gig;