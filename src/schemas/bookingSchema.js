import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(5),
  room_no: z.number(),
  checkin_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD format"),
  checkout_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD format"),
});
