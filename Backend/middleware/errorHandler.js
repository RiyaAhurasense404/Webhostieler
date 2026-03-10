const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message)
  
    try {
      if(err.code === 'ECONNREFUSED') {
        return res.status(500).json({ error: "Database se connection nahi ho paya! 🔌" })
      }
  
      if(err.code === 'ER_BAD_FIELD_ERROR') {
        return res.status(400).json({ error: "Galat field! ❌" })
      }
  
      if(err.status) {
        return res.status(err.status).json({ error: err.message })
      }
  
      res.status(500).json({ error: "Server mein kuch gadbad ho gayi! 😥" })
  
    } catch(err) {
      res.status(500).json({ error: "Kuch aur gadbad ho gayi! 😥" })
    } finally {
      console.log("Error handled!")
    }
  }
  
  module.exports = errorHandler