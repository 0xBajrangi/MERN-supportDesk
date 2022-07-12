const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors')
const PORT = process.env.PORT;
const connectDb = require('./config/db');
const { errorHandler } = require("./middleware/errorMiddleware")

// connect to Database
connectDb()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);


app.listen(PORT, () => console.log(`server started on port ${PORT}`))