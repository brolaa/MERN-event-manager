const { User, validateUser } = require("../models/user")
const bcrypt = require("bcrypt")
const { Event } = require("../models/event")

module.exports.registerUser = async (req, res) => {
    try {
        const { error } = validateUser(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const user = await User.findOne({ email: req.body.email })
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" })

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await new User({ ...req.body, password: hashPassword }).save()
        res.status(201).send({ message: "User created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
}

module.exports.getAccountDetail = async (req, res) => {
    User.findById(req.user._id).exec()
        .then(async () => {
            const user = await User.findById(req.user._id)
            res.status(200).send({ data: user, message: "Account Details" });
        })
        .catch((error) => {
            res.status(500).send({ message: error.message });
        })
}

module.exports.getUsers = async (req, res) => {
    //pobranie wszystkich użytkowników z bd:
    User.find().exec()
        .then(async () => {
            const users = await User.find();
            //konfiguracja odpowiedzi res z przekazaniem listy użytkowników:
            res.status(200).send({ data: users, message: "Lista użytkowników" });
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
}

module.exports.deleteUser = (req, res) => {
    User.findById(req.user._id).exec()
        .then(async () => {
            await User.findByIdAndRemove(req.user._id)
            await Event.deleteMany({userId: req.user._id})
            res.status(200).send({ message: "User deleted successfully" })
        })
        .catch((error) => {
            res.status(500).send({ message: "Błąd podczas usuwania: " + error.message });
        })

}