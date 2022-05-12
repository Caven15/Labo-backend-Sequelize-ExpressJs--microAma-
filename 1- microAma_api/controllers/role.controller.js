const dbConnector = require("../models/dbConnect").get()

exports.addRole = (req, res, next) => {
    dbConnector.role.create({role: req.body.role})
    res.write(JSON.stringify({Message :  `${req.body.role} ajouté !`}, null, 2))
    req.end()
}