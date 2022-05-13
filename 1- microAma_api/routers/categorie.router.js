const express = require("express")
const router = express.Router()
const categorieController = require("../controllers/categorie.controller")

router.post("/", categorieController.addCategorie)
router.get("/getAll", categorieController.getAllCategorie)
router.get("/getById/:id", categorieController.getCategorieById)
router.get("/getByCategorie/:categorie", categorieController.getCategorieByName)
router.patch("/:id", categorieController.updateCategorie)

module.exports = router