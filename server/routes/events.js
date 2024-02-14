const router = require("express").Router()
const { startEndDateValidator, currentDateValidator } = require("../models/event")
const { check } = require('express-validator')
const controller = require("../controllers/eventsController")

router.post("/", [
    check("name")
        .isLength({ min: 3 , max: 50})
        .bail().withMessage("Name must be from 3 to 50 characters"),
    check("description")
        .isLength({ min: 3 , max: 50})
        .bail().withMessage("Description must be from 3 to 50 characters"),
    check("place")
        .isLength({ min: 3 , max: 50})
        .bail().withMessage("Place must be from 3 to 50 characters"),
    check("startDate")
        .isISO8601()
        .toDate()
        .bail().withMessage("Invalid start date format")
        .custom(currentDateValidator),
    check("endDate")
        .isISO8601()
        .toDate()
        .bail().withMessage("Invalid end date format")
        .custom(startEndDateValidator),
    check("business")
        .isBoolean()
        .bail().withMessage("No type of event")
], controller.postEvent)

router.get("/", controller.getEvents)

router.delete("/:id", controller.deleteEvent)

router.get("/:id", controller.getUser)


router.put("/:id", [
    check("name")
        .isLength({ min: 3 , max: 50})
        .bail().withMessage("Name must be from 3 to 50 characters"),
    check("description")
        .isLength({ min: 3 , max: 50})
        .bail().withMessage("Description must be from 3 to 50 characters"),
    check("place")
        .isLength({ min: 3 , max: 50})
        .bail().withMessage("Place must be from 3 to 50 characters"),
    check("startDate")
        .isISO8601()
        .toDate()
        .bail().withMessage("Invalid start date format")
        .custom(currentDateValidator),
    check("endDate")
        .isISO8601()
        .toDate()
        .bail().withMessage("Invalid end date format")
        .custom(startEndDateValidator),
    check("business")
        .isBoolean()
        .bail().withMessage("No type of event")
], controller.updateEvent)




module.exports = router
