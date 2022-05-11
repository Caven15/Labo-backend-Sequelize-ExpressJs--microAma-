const produitModel = (sequelize, DataTypes) => {
    const produit = sequelize.define("produit", {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prix: {
            type: DataTypes.REAL,
            allowNull: false
        }
    })

    return produit
}

module.exports = produitModel