const express = require("express")
const cors = require("cors")
require("dotenv").config()
const db = require("./db")

const app = express()
app.use(cors())
app.use(express.json())

const hotelsRouter = require("./routes/hotels")
app.use("/api/hotels", hotelsRouter)

const authRouter = require("./routes/auth")
app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
  res.json({ message: "Server chal raha hai! 🚀" })
})

const errorHandler = require("./middleware/errorHandler")
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server port ${PORT} pe chal raha hai!`)
})