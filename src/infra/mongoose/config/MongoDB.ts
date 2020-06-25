
import mongoose, { Connection, ConnectionOptions } from "mongoose";
class MongoDb {
  private mongoOptions: ConnectionOptions; 
  private _connection!: Connection;   // Connection instance

  public constructor() {
    // To fix all deprecation warnings  https://mongoosejs.com/docs/deprecations.html
    this.mongoOptions = {
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    };
  }

  /**
   * starts database connection
   */
  public initialize() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(process.env.MONGODB_URI, this.mongoOptions)
        .then(conn => {
          this._connection = conn.connection;
          this._connection.on("error", err => {
            console.error(err);
          });
          console.log("[DB] connected to " + process.env.MONGODB_URI);
          this._connection.on("closed", () => {
            console.info("Disconnected");
          });
          resolve(this);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }
}

export default new MongoDb();