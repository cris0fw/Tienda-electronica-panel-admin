import mongoose from "mongoose";

// CONECTAR BASE DE DATOS
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DBCONNECT);

    console.log("Base de datos fue conectada 😁");
  } catch (error) {
    console.log("base de datos no fue conectada 😪");
    process.exit(1);
  }
};

export default connectDB;
