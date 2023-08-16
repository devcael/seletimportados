import { Model, DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'mysql', // Pode ser 'mysql', 'postgres', 'sqlite' ou 'mssql'
    host: 'seletimportados.ceeyrsriy0wg.sa-east-1.rds.amazonaws.com',
    username: 'asnweb',
    password: 'webasnsoft',
    database: 'seletimportados',
});



export default sequelize;