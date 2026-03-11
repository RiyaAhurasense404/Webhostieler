import db from "../db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { RowDataPacket, OkPacket } from "mysql2"

interface CustomError extends Error {
    status?: number
    code?: string
}

interface User extends RowDataPacket {
    id: number
    username: string
    password: string
}

export const registerService = (username: string, password: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            db.query(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                [username, hashedPassword],
                (err: CustomError | null) => {
                    try {
                        if (err) {
                            if (err.code === 'ER_DUP_ENTRY') {
                                const dupErr: CustomError = new Error("Username already exists! ❌")
                                dupErr.status = 400
                                throw dupErr
                            }
                            throw err
                        }
                        resolve()
                    } catch (err) {
                        reject(err)
                    }
                }
            )
        } catch (err) {
            reject(err)
        }
    })
}

export const loginService = (username: string, password: string): Promise<{ token: string; username: string }> => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE username = ?", [username], async (err: CustomError | null, results: User[]) => {
            try {
                if (err) throw err

                if (results.length === 0) {
                    const err: CustomError = new Error("User not found! ❌")
                    err.status = 401
                    throw err
                }

                const isMatch = await bcrypt.compare(password, results[0].password)
                if (!isMatch) {
                    const err: CustomError = new Error("Wrong password! ❌")
                    err.status = 401
                    throw err
                }

                const token = jwt.sign(
                    { id: results[0].id, username },
                    process.env.JWT_SECRET as string,
                    { expiresIn: "1d" }
                )

                resolve({ token, username })
            } catch (err) {
                reject(err)
            }
        })
    })
}