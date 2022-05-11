const ligneCommandeModel = (sequelize, DataTypes) => {
    const ligneCommande = sequelize.define("ligneCommande", {
        quantite: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        prix: {
            type: DataTypes.REAL,
            allowNull: false
        }
    })

    return ligneCommande
}

module.exports = ligneCommandeModel