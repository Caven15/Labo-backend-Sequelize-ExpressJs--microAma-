const dbConnector = require("../models/dbConnect").get()
const bcrypt = require("bcrypt")

// récupère tout les clients
exports.getAllClients = async (req, res, next) => {
    try {
        const allClients = await dbConnector.client.findAll()
        res.status(200).json(allClients)
    } catch (error) {
        res.json(error)
    }
}

// récuperer un client par son role
exports.getClientByRoleId = async (req, res, next) => {
    try {
        let client = await dbConnector.client.findAll({ where: { roleId: req.params.id } })
        res.json(client)
    } catch (error) {
        res.json(error)
    }
}

// récupère un client par son id
exports.getClientById = async (req, res, next) => {
    try {
        let client = await dbConnector.client.findByPk(req.params.id)
        res.json(client)
    } catch (error) {
        res.json(error)
    }
}

// mise a jour d'un client
exports.updateClient = async (req, res, next) => {
    try {
        const client = await dbConnector.client.findByPk(req.params.id)
        if (client) {
            if(req.body.password) {
                return res.status(403).send({message : "impossible de modifier le password ici..."})
            } 
            client.update(req.body)
            res.write(JSON.stringify({Message :  `client nr : ${req.params.idm} mis a jour avec succès !` }))
            res.end()
        }
        else{
            res.write(JSON.stringify({Message :  `client nr : ${req.params.id} n'as pas été trouvé...` }))
            res.end()
        }
    } catch (error) {
        res.json(error)
    }
}

// supression d'un client
exports.deleteClient = async (req, res, next) => {
    try {
        const client = await dbConnector.client.destroy({where : {id : req.params.id}})
        if (client) {
            res.write(JSON.stringify({Message :  `client nr : ${req.params.id} a été suprimer avec succès !` }))
            res.end()
        }else{
            res.write(JSON.stringify({Message :  `client nr : ${req.params.id} n'existe pas` }))
            res.end()
        }
    } catch (error) {
        
    }
}

// modification du mot de passe d'un client
exports.updatePassword = async (req, res, next) => {
    try {
        const client = await dbConnector.client.findOne({where : {id : req.params.id}})
        if (client) {
            const password = bcrypt.compareSync(req.body.oldPassword.trim(), client.password)
            if (!password) {
                res.status(401).send({message: "mot de passe invalide !"})
            }
            if (req.body.newPassword != req.body.confirmNewPassword) {
                res.status(401).send({message: `le mot de passe ne correspond pas !`})
            }
            if (req.body.newPassword == "") {
                res.status(401).send({message: `le mot de passe ne peut être vide !`})
            } 
            const newPassword = bcrypt.hashSync(req.body.newPassword.trim(), 10)
            await client.update({password : newPassword})
            res.status(201).send({message: "mot de passe changé avec succès !"})
        }
        else {
            res.write(JSON.stringify({Message :  `client nr : ${req.params.id} n'existe pas !` }))
            res.end()
        }
    } catch (error) {
        res.json(error)
    }
}


