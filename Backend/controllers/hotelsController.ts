import { Request, Response, NextFunction } from "express"
import { getAllHotelsService, getHotelByIdService } from "../services/hotelsService"

interface CustomError extends Error {
  status?: number
}

export const getAllHotels = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("getAllHotels called!")
  try {
    const { city, max_price } = req.query as { city?: string; max_price?: string }

    if(max_price && isNaN(Number(max_price))) {
      const err: CustomError = new Error("Price sirf number hona chahiye! 🔢")
      err.status = 400
      throw err
    }

    if(city && !isNaN(Number(city))) {
      const err: CustomError = new Error("City sirf text hona chahiye! 🔤")
      err.status = 400
      throw err
    }

    const hotels = await getAllHotelsService(
      city as string | undefined,
      max_price ? Number(max_price) : undefined
    )

    res.json({ data: hotels })

  } catch(err) {
    next(err)
  } finally {
    console.log("getAllHotels complete!")
  }
}

export const getHotelById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("getHotelById called!")
  try {
    const { id } = req.params as {id: string}

    if(isNaN(Number(id))) {
      const err: CustomError = new Error("ID sirf number hona chahiye! 🔢")
      err.status = 400
      throw err
    }

    const hotel = await getHotelByIdService(id)
    res.json({ data: hotel })

  } catch(err) {
    next(err)
  } finally {
    console.log("getHotelById complete!")
  }
}