import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import "./db"
import hotelsRouter from "./routes/hotels"
import authRouter from "./routes/auth"
import errorHandler from "./middleware/errorHandler"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/hotels", hotelsRouter)
app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
  res.json({ message: "Server chal raha hai! 🚀" })
})

app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server port ${PORT} pe chal raha hai!`)
})