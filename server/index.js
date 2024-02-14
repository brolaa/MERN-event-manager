require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connection = require('./db')

const app = express()

//middleware
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8080

connection()

const tokenVerification = require('./middleware/tokenVerification')
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const eventRoutes = require("./routes/events")

// routes
app.get("/api/users/",tokenVerification)
app.get("/api/users/accountDetail",tokenVerification)
app.get("/api/users/deleteAccount",tokenVerification)
app.get("/api/events/",tokenVerification)
app.post("/api/events/",tokenVerification)
app.get("/api/events/:id",tokenVerification)
app.put("/api/events/:id",tokenVerification)
app.delete("/api/events/:id",tokenVerification)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/events", eventRoutes)

app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))