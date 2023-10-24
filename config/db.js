import mongoose from "mongoose";
import colors from "colors";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGOURL);
        console.log(`connected to mongodb database ${mongoose.connection.host}`.bgMagenta.white);     
    } catch (error) {
        console.log(`mongodb error ${error}`.bgRed.white);        
    }
};

export default connectDB;

