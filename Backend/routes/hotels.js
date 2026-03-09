const express = require("express")
const router = express.Router()
const { getAllHotels, getHotelById , filterByCity, filterByPrice  } = require("../controllers/hotelsController")

router.get("/", getAllHotels)
router.get("/:id", getHotelById )
router.get("/filter/city", filterByCity)
router.get("/filter/price", filterByPrice )

module.exports = router