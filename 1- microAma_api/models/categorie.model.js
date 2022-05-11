const categorieModel = (sequelize, DataTypes) => {
    const categorie = sequelize.define("categorie", {
        categorie: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return categorie
}

module.exports = categorieModel