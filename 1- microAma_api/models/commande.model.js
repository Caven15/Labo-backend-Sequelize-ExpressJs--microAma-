const commandeModel = (sequelize, DataTypes) => {
    const commande = sequelize.define("commande", {
        prix: {
            type: DataTypes.REAL,
            allowNull: false
        }
    })

    return commande
}

module.exports = commandeModel