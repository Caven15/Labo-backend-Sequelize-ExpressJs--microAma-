require("dotenv").config()
const { Sequelize, DataTypes } = require("sequelize")

// ici je peux importer les model de mes table
const clientModel = require("./client.model")
const categorieModel = require("./categorie.model")
const livraisonModel = require("./livraison.model")
const commandeModel = require("./commande.model")
const ligneCommandeModel = require("./ligneCommande.model")
const produitModel = require("./produit.model")
const panierModel = require("./panier.model")

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
                // ici j'importe mes futur modèles
                client: clientModel(sequelize,DataTypes),
                categorie: categorieModel(sequelize,DataTypes),
                livraison: livraisonModel(sequelize,DataTypes),
                commande: commandeModel(sequelize,DataTypes),
                ligneCommande: ligneCommandeModel(sequelize,DataTypes),
                produit: produitModel(sequelize,DataTypes),
                panier: panierModel(sequelize,DataTypes)
            }

            // ici je définis tout les règles concernant les tables (foreign key ect...)

                // règle 1

                // règle 2

                // règle 3

            dbConnector.sequelize.sync({force : true})    //sync({force : true}) pour reinitiliser la db
        }
    },

    get : () => {
        if(!dbConnector)
            this.connect
        else
            return dbConnector
    }
}