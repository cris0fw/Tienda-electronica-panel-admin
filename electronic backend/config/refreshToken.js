import jwt from "jsonwebtoken";

// GENERAR EL REFRESH TOKEN
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export default generateRefreshToken;
