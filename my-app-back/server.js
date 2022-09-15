import express from 'express';
import mongoose from 'mongoose';
import router from './routers/Auth.js';
import cors from 'cors';

const PORT = 5000;
const URI = "mongodb+srv://user1:user1@cluster0.lswt8ul.mongodb.net/new-way?retryWrites=true&w=majority"

const app = express();
app.use(cors());

app.use(express.json());
app.use('', router);

mongoose.connect(URI, {
    useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));