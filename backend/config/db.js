const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongodb Connectd:${connect.connection.host}`.cyan.underline)
    } catch (err){
        console.log(`Error ${err.message}`.red.underline)
    }
}

module.exports = connectDb