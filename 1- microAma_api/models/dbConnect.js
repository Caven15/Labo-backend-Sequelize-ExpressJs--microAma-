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
const roleModel = require("./role.model")

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
                panier: panierModel(sequelize,DataTypes),
                role: roleModel(sequelize,DataTypes)

            }

            // ici je définis tout les règles concernant les tables (foreign key ect...)
            // client a un role
                dbConnector.role.hasOne(dbConnector.client);
                dbConnector.client.belongsTo(dbConnector.role);

            // panier a un client
                dbConnector.client.hasOne(dbConnector.panier);
                dbConnector.panier.belongsTo(dbConnector.client);

            // commande a un panier
                dbConnector.panier.hasOne(dbConnector.commande);
                dbConnector.commande.belongsTo(dbConnector.panier);

            // livraison a une commande
                dbConnector.commande.hasOne(dbConnector.livraison);
                dbConnector.livraison.belongsTo(dbConnector.commande);

            // ligneCommande a un panier
                dbConnector.panier.hasOne(dbConnector.ligneCommande);
                dbConnector.ligneCommande.belongsTo(dbConnector.panier);

            // ligneCommande a un produit
                dbConnector.produit.hasOne(dbConnector.ligneCommande);
                dbConnector.ligneCommande.belongsTo(dbConnector.produit);

            // produit a une categorie
                dbConnector.categorie.hasOne(dbConnector.produit);
                dbConnector.produit.belongsTo(dbConnector.categorie);


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