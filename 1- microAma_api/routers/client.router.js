const express = require("express")
const router = express.Router()
const clientController = require("../controllers/client.controller")

router.get("/getAll", clientController.getAllClients)
router.get("/getAllByRole/:id", clientController.getClientByRoleId)
router.get("/:id", clientController.getClientById)
router.patch("/:id", clientController.updateClient)

module.exports = router