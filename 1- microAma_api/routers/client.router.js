const express = require("express")
const router = express.Router()
const clientController = require("../controllers/client.controller")

router.get("/getAll", clientController.getAllClients)
router.get("/getAllByRole/:id", clientController.getClientByRoleId)
router.get("/:id", clientController.getClientById)
router.patch("/updateClient/:id", clientController.updateClient)
router.patch("/updatePassword/:id", clientController.updatePassword)
router.delete("/:id", clientController.deleteClient)

module.exports = router