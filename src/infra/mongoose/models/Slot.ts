import { Document, Model, model, Schema } from "mongoose"
const STATUS: string[] = ["reserved", "available"];

const AvailabilitySchema = new Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: false
  },
  status: {
    type: String,
    required: true,
    choices: STATUS
  },
}, { timestamps: true, _id: true });

AvailabilitySchema.index({ customerId: 1 });
AvailabilitySchema.index({ start: 1, end: 1 });


const SlotSchema = new Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  professionalId: {
    type: Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
    immutable: true,
  },
  availabilities: [AvailabilitySchema]
}, { timestamps: true })

SlotSchema.index({ professionalId: 1 });
SlotSchema.index({ professionalId: 1, start: 1, end: 1 }, { unique: true });

interface ISlotSchema extends Document {
  start: Date;
  end: Date;
  professionalId: string;
  availabilities: {
    start: Date;
    end: Date;
    customerId?: string;
    status: string
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// For model
export interface ISlotModel extends Model<ISlotSchema> {
}


const SlotModel = model<ISlotSchema, ISlotModel>("Slot", SlotSchema);
export default SlotModel