import { Document, Model, model, Schema } from "mongoose"

// Schema
const CustomerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
    unique: true,
  },
}, { timestamps: true })

interface ICustomerSchema extends Document {
  createdAt: Date;
  updatedAt: Date;
}

CustomerSchema.index({ userId: 1 }, { unique: true });

// For model
export interface ICustomerModel extends Model<ICustomerSchema> {
}


const CustomerModel = model<ICustomerSchema, ICustomerModel>("Customer", CustomerSchema);
export default CustomerModel
