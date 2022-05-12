const dbConnector = require("../models/dbConnect").get()

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
                return res.status(403).send({
                    message : "impossible de modifier le password ici..."
                })
            } 
            client.update(req.body)
            res.write(JSON.stringify({Message :  `User ${req.body.nom} mis a jour avec succès !` }))
            res.end()
        }
        else{
            res.write(JSON.stringify({Message :  `User ${req.body.nom} n'as pas été trouvé...` }))
            res.end()
        }
    } catch (error) {
        res.json(error)
    }
}

// supression d'un client
// exports.deleteClient = async (req, res, next) => {
//     try {
        
//     } catch (error) {
        
//     }
// }

// modification du mot de passe d'un client


