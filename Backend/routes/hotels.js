const express = require("express")
const router = express.Router()
const { getAllHotels, getHotelById , filterByCity, filterByPrice  } = require("../controllers/hotelsController")

router.get("/", getAllHotels)
router.get("/:id", getHotelById )

module.exports = router