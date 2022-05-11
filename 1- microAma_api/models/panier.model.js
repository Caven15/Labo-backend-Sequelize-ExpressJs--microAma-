const panierModel = (sequelize, DataTypes) => {
    const panier = sequelize.define("panier", {
        // aucune donnée a ajouter ici...
    },
    {
        // permet de ne pas generer les colonnes créer par sequelize
        createdAt: false,
        updatedAt: false,
    })

    return panier
}

module.exports = panierModel