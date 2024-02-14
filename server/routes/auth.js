const router = require("express").Router()
const controller = require("../controllers/authController")

// Logowanie użytkownika
router.post("/", controller.loginUser)


module.exports = router