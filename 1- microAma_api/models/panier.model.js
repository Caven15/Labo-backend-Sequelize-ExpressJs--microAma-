const panierModel = (sequelize, DataTypes) => {
    const panier = sequelize.define("panier", {
        // aucune donnée a ajouter ici...
    })

    return panier
}

module.exports = panierModel