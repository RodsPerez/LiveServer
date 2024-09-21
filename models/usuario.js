import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nomre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["Admin_role", "User_role"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

const Usuario = model("Usuario", usuarioSchema);
export { Usuario };
