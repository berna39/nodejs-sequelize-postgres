const { DataTypes } = require('sequelize');
const { db } = require('../database/config');


const Gig = db.define('gig', {
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
    }, {
        timestamps: false
    });

module.exports = Gig;