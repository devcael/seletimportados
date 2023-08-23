import { Model, DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'mysql', // Pode ser 'mysql', 'postgres', 'sqlite' ou 'mssql'
    host: '127.0.0.1',
    username: 'asnweb',
    password: 'webasnsoft@',
    database: 'seletimportados',
});



export default sequelize;
