import mongoose from "mongoose";

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) throw new Error("Esta id es invalida o no funciona");
};

export default validateMongoDbId;
