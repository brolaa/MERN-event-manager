const router = require("express").Router()
const controller = require("../controllers/usersController")

// rejestracja użytkownika
router.post("/", controller.registerUser)

// Pobranie listy użytkowników
router.get("/", controller.getUsers)

// Pobranie szczegółów konta
router.get("/accountDetail", controller.getAccountDetail)

// Usunięcie konta użytkownika
router.get("/deleteAccount", controller.deleteUser)

module.exports = router
