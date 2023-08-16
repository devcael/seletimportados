import { Model, DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'mysql', // Pode ser 'mysql', 'postgres', 'sqlite' ou 'mssql'
    host: 'localhost',
    username: 'asnweb',
    password: 'webasnsoft',
    database: 'testedois',
});



export default sequelize;