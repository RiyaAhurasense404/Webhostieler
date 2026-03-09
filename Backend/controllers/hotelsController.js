const db = require("../db");

const getAllHotels = (req, res) => {
  db.query(
    "SELECT id, name, city, price, image_url FROM hotels",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ data: results });
    }
  );
};

const getHotelById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM hotels WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: results[0] });
  });
};

const filterByCity = (req, res) => {
  const { city } = req.query;
  db.query(
    "SELECT id, name, city, price, image_url FROM hotels WHERE city = ?",
    [city],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ data: results });
    }
  );
};

const filterByPrice = (req, res) => {
  const { max_price } = req.query;
  db.query(
    "SELECT id, name, city, price, image_url FROM hotels WHERE price <= ?",
    [max_price],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ data: results });
    }
  );
};
module.exports = { getAllHotels, getHotelById, filterByCity, filterByPrice }