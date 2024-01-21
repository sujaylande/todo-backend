import mongoose from "mongoose";

const connectDB = () => {
 mongoose.connect(process.env.MONGO_URI, {
    dbName: 'backendapi',
}).then((c) => {
    console.log(`MongoDB connected with ${c.connection.host}`);
    }).catch((err) => {
    console.log(err); });
}

export default connectDB;
