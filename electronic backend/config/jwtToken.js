import jwt from "jsonwebtoken";

// GENERAR TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export default generateToken;
