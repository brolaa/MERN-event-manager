const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    place: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true},
    business: { type: Boolean, required: true },
    userId: { type: String, required: true }
})

const Event = mongoose.model("Event", eventSchema)

const startEndDateValidator = (endDate , {req}) => {
    if (endDate.getTime() <= req.body.startDate.getTime()) {
        throw new Error('End date must be after start date')
    }
    return true
}

const currentDateValidator = (date) => {
    if (date.getTime() < new Date().getTime()) {
        throw new Error('Date must be after current date')
    }
    return true
}

module.exports = { Event, startEndDateValidator, currentDateValidator }