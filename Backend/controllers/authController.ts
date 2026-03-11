import { Request, Response, NextFunction } from "express"
import { registerService, loginService } from "../services/authService"

interface CustomError extends Error {
  status?: number
}

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("Register called!")
  try {
    const { username, password }: { username: string; password: string } = req.body

    if(!username || !password) {
      const err: CustomError = new Error("Username aur password dena zaroori hai! ❌")
      err.status = 400
      throw err
    }

    if(password.length < 6) {
      const err: CustomError = new Error("Password must have 6 characters! ❌")
      err.status = 400
      throw err
    }

    await registerService(username, password)
    res.json({ message: "Register successful! ✅" })

  } catch(err) {
    next(err)
  } finally {
    console.log("Register function complete!")
  }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("Login called!")
  try {
    const { username, password }: { username: string; password: string } = req.body

    if(!username || !password) {
      const err: CustomError = new Error("Username aur password dena zaroori hai! ❌")
      err.status = 400
      throw err
    }

    const result = await loginService(username, password)
    res.json(result)

  } catch(err) {
    next(err)
  } finally {
    console.log("Login function complete!")
  }
}
