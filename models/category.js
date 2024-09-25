import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CategoriesSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El rol es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

CategoriesSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();

  return data;
};

const Category = model("Category", CategoriesSchema);
export { Category };
