const dbConnector = require("../models/dbConnect").get()

// ajoute une nouvelle catégorie
exports.addCategorie = async (req, res, next) => {
    try {
        const categorie = await dbConnector.categorie.findOne({where: {'categorie' :req.body.categorie}})
        if (categorie) {
            return res.status(401).json({message: "la catégorie existe déja dans le système !"})
        }
        else{
            let newCategorie = {
                categorie : req.body.categorie
            }
            dbConnector.categorie.create(newCategorie)
                .then((response) => {
                    res.status(201).json({message: "la catégorie a été ajouté avec succès !"})
                })
        }
    } catch (error) {
        console.log(error)
    }
}

// récupère toute les catégorie
exports.getAllCategorie = async (req, res, next) => {
    try {
        allCategories = await dbConnector.categorie.findAll()
        res.status(200).json(allCategories)
    } catch (error) {
        console.log(error)
    }
}

// récupère une catégorie par son id 
exports.getCategorieById = async (req, res, next) => {
    try {
        let categorie = await dbConnector.categorie.findByPk(req.params.id)
        res.json(categorie)
    } catch (error) {
        res.json(error)
    }
}

// récupère une catégorie par son nom
exports.getCategorieByName = async (req, res, next) => {
    try {
        let categorie = await dbConnector.categorie.findAll({ where: { categorie: req.params.categorie } })
        res.json(categorie)
    } catch (error) {
        console.log(error)
    }
}

// met a jour une catégorie par son id
exports.updateCategorie = async (req, res, next) => {
    try {
        const categorie = await dbConnector.categorie.findByPk(req.params.id)
        if (categorie) {
            categorie.update(req.body)
            res.write(JSON.stringify({message : "catégorie mis a jour avec succès"}))
            res.end()
        }
        else{
            res.write(JSON.stringify({message : "cette catégorie n'existe pas"}))
            res.end()
        }
    } catch (error) {
        res.json(error)
    }
}

// supprime une catégorie par son id 

