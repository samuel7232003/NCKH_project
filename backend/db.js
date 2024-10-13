const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb+srv://thanhleviet723:7XK0Iv4oo2IzKNsN@nckh-project.prnwd.mongodb.net/nckh-project?retryWrites=true&w=majority&appName=nckh-project");
        console.log(`MongoDb Connected!`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
