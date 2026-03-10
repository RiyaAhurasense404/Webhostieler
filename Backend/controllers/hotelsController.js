const db = require("../db")

const getAllHotels = async (req, res, next) => {
  console.log("getAllHotels called!")
  try {
    const { city, max_price } = req.query

    if(max_price && isNaN(max_price)) {
      const err = new Error("Price sirf number hona chahiye! 🔢")
      err.status = 400
      throw err
    }

    if(city && !isNaN(city)) {
      const err = new Error("City sirf text hona chahiye! 🔤")
      err.status = 400
      throw err
    }

    let query = "SELECT id, name, city, price, image_url FROM hotels WHERE 1=1"
    const params = []

    if(city) {
      query += " AND city = ?"
      params.push(city)
    }
    if(max_price) {
      query += " AND price <= ?"
      params.push(Number(max_price))
    }

    db.query(query, params, (err, results) => {
      try {
        if(err) throw err
        if(results.length === 0) {
          const err = new Error("Koi hotel nahi mila is city mein! 🏨")
          err.status = 404
          throw err
        }
        res.json({ data: results })
      } catch(err) {
        next(err)
      } finally {
        console.log("getAllHotels query complete!")
      }
    })
  } catch(err) {
    next(err)
  } finally {
    console.log("getAllHotels function complete!")
  }
}

const getHotelById = async (req, res, next) => {
  console.log("getHotelById called!")
  try {
    const { id } = req.params

    if(!id) {
      const err = new Error("ID dena zaroori hai! ❌")
      err.status = 400
      throw err
    }

    if(isNaN(id)) {
      const err = new Error("ID should be a number! 🔢")
      err.status = 400
      throw err
    }

    db.query("SELECT * FROM hotels WHERE id = ?", [id], (err, results) => {
      try {
        if(err) throw err

        if(!results[0]) {
          const err = new Error("Hotel nahi mila! 🏨")
          err.status = 404
          throw err
        }

        res.json({ data: results[0] })
      } catch(err) {
        next(err)
      } finally {
        console.log("getHotelById query complete!")
      }
    })
  } catch(err) {
    next(err)
  } finally {
    console.log("getHotelById function complete!")
  }
}

module.exports = { getAllHotels, getHotelById }