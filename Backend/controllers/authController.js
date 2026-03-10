const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  const { username, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err, results) => {
      if(err) return res.status(500).json({ error: err.message })
      res.json({ message: "Register successful! ✅" })
    }
  )
}

const login = async (req, res) => {
  const { username, password } = req.body
  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if(err) return res.status(500).json({ error: err.message })
    if(results.length === 0) return res.status(401).json({ message: "User nahi mila!" })
    const isMatch = await bcrypt.compare(password, results[0].password)
    if(!isMatch) return res.status(401).json({ message: "Galat password!" })
    const token = jwt.sign({ id: results[0].id, username }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.json({ token, username })
  })
}

module.exports = { register, login }
