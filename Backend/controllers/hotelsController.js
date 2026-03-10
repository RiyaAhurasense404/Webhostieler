const db = require("../db");

const getAllHotels = (req, res) => {
  const { city, max_price } = req.query
  console.log("city:", city, "max_price:", max_price)
  
  let query = "SELECT id, name, city, price, image_url FROM hotels WHERE 1=1"
  const params = []

  if(city) {
    query += " AND city = ?"
    params.push(city)
  }
  
  if(max_price) {
    query += " AND price <= ?"
    params.push(max_price)
  }

  db.query(query, params, (err, results) => {
    if(err) return res.status(500).json({ error: err.message })
    res.json({ data: results })
  })
}

const getHotelById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM hotels WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: results[0] });
  });
};


module.exports = { getAllHotels, getHotelById }