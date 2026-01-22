import mongoose from "mongoose";

export default async function ConnectDbAsync() {
  try {
    const mongooseUrl = process.env.MONGO_DB_URL as string;
    if (!mongooseUrl) throw new Error("MONGODB_URI is not defined in .env");

    await mongoose.connect(`${mongooseUrl}/ticket-management-system`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("database is connected successfully");
    });
    connection.on("error", (errors) => {
      console.log("connection have some error", errors);
      process.exit();
    });
    connection.on("disconnected", () => {
      console.warn("Database disconnected");
    });
  } catch (error) {
    console.log(
      "something went wrong while estiblishing connection with database"
    );
    console.log(error);
  }
}
