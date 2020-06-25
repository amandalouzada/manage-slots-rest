import { Document, Model } from "mongoose";
export default class MongooseRepository<T extends Model<Document>> {

  constructor(protected model: T) {
    this.model = model;
  }
  
}