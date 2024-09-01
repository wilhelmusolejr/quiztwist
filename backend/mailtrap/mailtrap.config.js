import { MailtrapClient } from "mailtrap"; // Adjusted import statement
import dotenv from "dotenv";
dotenv.config();

export const mailTrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
