import mongoose from 'mongoose'

export class DataBase {
    
    constructor() {
        this.connect()
    }
    private async connect() {
        const MONGO_URI = 'mongodb://localhost/testDB';
        await mongoose.connect( process.env.MONGODB_URL || MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
        console.log('DB is connected')
    }
}