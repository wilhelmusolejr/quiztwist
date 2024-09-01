import { mailTrapClient, sender } from "./mailtrap.config.js";

export const sendGreeting = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to our platform",
      text: `Hello ${name}, welcome to our platform`,
      category: "greeting",
    });

    console.log(response);
  } catch (error) {
    console.log("Error sending greeting email:", error);
    throw new Error("Error sending greeting email:", error);
  }
};
