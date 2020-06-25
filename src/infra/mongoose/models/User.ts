import { Document, Model, model, Schema } from "mongoose"
import bcrypt from 'bcryptjs';

// Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select:false
  },
}, { timestamps: true })

UserSchema.index({ email: 1 }, { unique: true });

interface IUserSchema extends Document {
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

// For model
export interface IUserModel extends Model<IUserSchema> {
}

// Document middlewares
// UserSchema.pre<IUserSchema>("save", async function (next) {
//   const salt = bcrypt.genSaltSync(10);
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, salt);
//   }
// });



const UserModel = model<IUserSchema, IUserModel>("User", UserSchema);
export default UserModel