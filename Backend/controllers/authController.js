const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
  console.log("Register called!")
  try {
    const { username, password } = req.body

    if(!username || !password) {
      const err = new Error("Username aur password dena zaroori hai! ❌")
      err.status = 400
      throw err
    }

    if(password.length < 6) {
      const err = new Error("Password must have 6 characters! ❌")
      err.status = 400
      throw err
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword],
      (err, results) => {
        try {
          if(err) {
            if(err.code === 'ER_DUP_ENTRY') {
              const dupErr = new Error("Username already exists! ❌")
              dupErr.status = 400
              throw dupErr
            }
            throw err
          }
          res.json({ message: "Register successful! ✅" })
        } catch(err) {
          next(err)
        } finally {
          console.log("Register query complete!")
        }
      }
    )
  } catch(err) {
    next(err)
  } finally {
    console.log("Register function complete!")
  }
}

const login = async (req, res, next) => {
  console.log("Login called!")
  try {
    const { username, password } = req.body

    if(!username || !password) {
      const err = new Error("Username aur password dena need hai! ❌")
      err.status = 400
      throw err
    }

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
      try {
        if(err) throw err

        if(results.length === 0) {
          const err = new Error("User not found! ❌")
          err.status = 401
          throw err
        }

        const isMatch = await bcrypt.compare(password, results[0].password)
        if(!isMatch) {
          const err = new Error("Wrong password! ❌")
          err.status = 401
          throw err
        }

        const token = jwt.sign(
          { id: results[0].id, username },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        )

        res.json({ token, username })
      } catch(err) {
        next(err)
      } finally {
        console.log("Login query complete!")
      }
    })
  } catch(err) {
    next(err)
  } finally {
    console.log("Login function complete!")
  }
}

module.exports = { register, login }