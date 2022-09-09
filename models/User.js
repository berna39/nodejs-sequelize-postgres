const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const User = db.define('User', {
    name: DataTypes.STRING,
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: DataTypes.STRING
});

(async () => {
    await User.sync({ force: true });
})();

module.exports = User;