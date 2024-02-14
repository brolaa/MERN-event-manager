const { Event } = require("../models/event")
const {validationResult} = require("express-validator");

module.exports.postEvent = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }


        const userId = req.user._id

        let event = new Event()
        event.name = req.body.name
        event.description = req.body.description
        event.place = req.body.place
        event.startDate = req.body.startDate
        event.endDate = req.body.endDate
        event.business = req.body.business
        event.userId = userId

        await event.save()
        res.status(201).send({message: "Event created successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
}

module.exports.getEvents = async (req, res) => {
    //pobranie wszystkich wydarzeń użytkownika:
    Event.find({ userId: req.user._id }).exec()
        .then(async () => {
            const events = await Event.find({userId: req.user._id})
            res.status(200).send({ data: events, message: "Event List" });
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        })
}

module.exports.deleteEvent = async (req, res) => {
    Event.findByIdAndRemove(req.params.id).exec()
        .then(async () => {
            await Event.findByIdAndRemove(req.params.id)
            res.status(200).send({ message: "Event deleted successfully" })
        })
        .catch((error) => {
            res.status(500).send({ message: "Error on deleting: " + error.message });
        })
}

module.exports.getUser = async (req, res) => {
    Event.findById(req.params.id).exec()
        .then(async () => {
            const event = await Event.findById(req.params.id)
            res.status(200).send({ data: event, message: "Index " + req.params.id  });
        })
        .catch((error) => {
            res.status(500).send({ message: error.message });
        })
}

module.exports.updateEvent = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
        .then(async () => {
            await Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            res.status(200).send({ message: "Event updated sucessfully"})
        })
        .catch((error) => {
            res.status(500).send({ message: "Error on updating: " + error.message });
        })
}