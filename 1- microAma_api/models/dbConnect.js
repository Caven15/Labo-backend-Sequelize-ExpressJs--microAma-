require("dotenv").config()
const { Sequelize, DataTypes } = require("sequelize")

// ici je peux importer les model de mes table
const clientModel = require("./client.model")
// model 2
// model 3
// model ...

let dbConnector

module.exports = {
    connect : () => {
        if (!dbConnector){
            const sequelize = new Sequelize(
                process.env.DB_NAME, 
                process.env.DB_USER, 
                process.env.DB_PASSWORD,
                {
                    host: process.env.DB_HOST,
                    dialect: "mysql",
                    port: 3308,
                    timezone: "+02:00"
                })
            dbConnector = {
                Sequelize: Sequelize,
                sequelize: sequelize,
                client: clientModel(sequelize,DataTypes)
                // ici j'importe mes futur modèles
            }

            // ici je définis tout les règles concernant les tables (foreign key ect...)

                // règle 1

                // règle 2

                // règle 3

            dbConnector.sequelize.sync()    //sync({force : true}) pour reinitiliser la db
        }
    },

    get : () => {
        if(!dbConnector)
            this.connect
        else
            return dbConnector
    }
}