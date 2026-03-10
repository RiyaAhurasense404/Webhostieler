import { z } from "zod"

export const registerSchema = z.object({
  username: z.string().min(3, "Username kam se kam 3 characters ka hona chahiye"),
  password: z.string().min(6, "Password kam se kam 6 characters ka hona chahiye"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords match nahi kar rahe!",
  path: ["confirmPassword"]
})