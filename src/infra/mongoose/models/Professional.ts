import { Document, Model, model, Schema } from "mongoose"

// Schema
const ProfessionalSchema = new Schema({
  license: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
    unique: true,
  },
}, { timestamps: true })

interface IProfessionalSchema extends Document {
  license: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

ProfessionalSchema.index({ userId: 1 }, { unique: true });

// For model
export interface IProfessionalModel extends Model<IProfessionalSchema> {
}


const ProfessionalModel = model<IProfessionalSchema, IProfessionalModel>("Professional", ProfessionalSchema);
export default ProfessionalModel
