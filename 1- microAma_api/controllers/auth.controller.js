const dbConnector = require("../models/dbConnect").get()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
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

// login d'un client
exports.login = async (req, res, next) => {
    const client = await dbConnector.client.findOne({where: {email: req.body.email}})
    if (client) {
        const password = bcrypt.compareSync(req.body.password.trim(),client.password)
        if (!password) {
            return res.status(401).send({
                accessToken: null,
                message: "mot de passe incorecte"
            })
        }
        const dataToken = {
            id : client.id,
            nom : client.nom,
            prenom : client.prenom,
            dateNaissance : client.dateNaissance,
            email : client.email,
            roleId : client.roleId
        }
        var token = jwt.sign(dataToken, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
        res.status(200).send({
            accessToken : token
        })
    }
    else{
        res.status(401).send({
            message: "le client n'existe pas..."
        })
    }
}