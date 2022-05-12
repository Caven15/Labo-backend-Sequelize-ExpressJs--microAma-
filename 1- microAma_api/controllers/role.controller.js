const dbConnector = require("../models/dbConnect").get()

exports.addRole = (req, res, next) => {
    console.log("le role est :")
    console.log(req.body)
    dbConnector.role.create({role: req.body.role})
    res.write(JSON.stringify({Message :  `${req.body.role} ajouté !`}, null, 2))
    // console.log("le role a bien été ajouter")
    req.end()
}