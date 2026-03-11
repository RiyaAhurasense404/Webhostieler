import { Request, Response, NextFunction } from "express"

interface CustomError extends Error {
  status?: number
  code?: string
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error:", err.message)

  try {
    if(err.code === 'ECONNREFUSED') {
      res.status(500).json({ error: "Database se connection nahi ho paya! 🔌" })
      return
    }

    if(err.code === 'ER_BAD_FIELD_ERROR') {
      res.status(400).json({ error: "Galat field! ❌" })
      return
    }

    if(err.status) {
      res.status(err.status).json({ error: err.message })
      return
    }

    res.status(500).json({ error: "Server mein kuch gadbad ho gayi! 😥" })

  } catch(err) {
    res.status(500).json({ error: "Kuch aur gadbad ho gayi! 😥" })
  } finally {
    console.log("Error handled!")
  }
}

export default errorHandler