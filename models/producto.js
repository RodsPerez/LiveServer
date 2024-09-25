import mongoose, { SchemaType } from "mongoose";

const { Schema, model } = mongoose;

const ProductsSchema = new Schema({
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
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

ProductsSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();

  return data;
};

const Product = model("Product", ProductsSchema);
export { Product };
