const dbConnector = require("../models/dbConnect").get()
const bcrypt = require('bcrypt')
// enregistrement d'un nouveau client
exports.register = async (req, res, next) => {
    try {
        // je férifie si le client n'existe pas déja dans la db
        const client = await dbConnector.client.findOne({where: {'email' :req.body.email}})
        if (client) {
            return res.status(401).json({message: "l'adresse e-mail existe déja dans le système"})
        }
        // sinon je stock mes valeur et j'envoie a la db
        else {
            let newClient = {
                nom : req.body.nom,
                prenom : req.body.prenom,
                dateNaissance : req.body.dateNaissance,
                numeroRue : req.body.numeroRue,
                rue : req.body.rue,
                ville : req.body.ville,
                codePostal : req.body.codePostal,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password.trim(), 10),
                roleId : 1,
            }
            dbConnector.client.create(newClient)
                .then((response)=> {
                    res.status(201).json({message : 'le client a été ajouté avec succès !'})
                })
        }
    } catch (error) {
        console.log(error)
    }
}