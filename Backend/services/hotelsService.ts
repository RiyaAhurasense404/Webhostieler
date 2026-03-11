import db from "../db"
import { RowDataPacket } from "mysql2"

interface CustomError extends Error {
  status?: number
}

export interface Hotel extends RowDataPacket {
  id: number
  name: string
  city: string
  price: number
  image_url: string
}

export const getAllHotelsService = (city?: string, max_price?: number): Promise<Hotel[]> => {
  return new Promise((resolve, reject) => {
    try {
      let query = "SELECT id, name, city, price, image_url FROM hotels WHERE 1=1"
      const params: (string | number)[] = []

      if(city) {
        query += " AND city = ?"
        params.push(city)
      }
      if(max_price) {
        query += " AND price <= ?"
        params.push(max_price)
      }

      db.query(query, params, (err: CustomError | null, results: Hotel[]) => {
        try {
          if(err) throw err
          if(results.length === 0) {
            const err: CustomError = new Error("Koi hotel nahi mila! 🏨")
            err.status = 404
            throw err
          }
          resolve(results)
        } catch(err) {
          reject(err)
        }
      })
    } catch(err) {
      reject(err)
    }
  })
}

export const getHotelByIdService = (id: string | number): Promise<Hotel> => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM hotels WHERE id = ?", [id], (err: CustomError | null, results: Hotel[]) => {
      try {
        if(err) throw err
        if(!results[0]) {
          const err: CustomError = new Error("Hotel nahi mila! 🏨")
          err.status = 404
          throw err
        }
        resolve(results[0])
      } catch(err) {
        reject(err)
      }
    })
  })
}