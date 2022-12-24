import express  from "express";
// to process data sent in an HTTP request body
import bodyParser from "body-parser";
import morgan from 'morgan';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from'./Routes/PostRoute.js';
import UploadRoutes from './Routes/UploadRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';
// Router
const app = express();

// To serve images for public
app.use(express.static('public'));
app.use('/images',express.static("images"));

// Middleware app
app.use(cors())
// app.use(morgan('dev'));
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))


// Confidential data to be hidden
dotenv.config()
// Connection
mongoose.
connect(process.env.MONGO_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).
    // Listening
    then(()=>app.listen(process.env.PORT,()=>console.log(`Server started at ${process.env.PORT} ....`))).
    // Error Handling
    catch((error)=>console.log(error));

    // Ussage of Routes
    app.use('/auth', AuthRoute);
    app.use('/user', UserRoute);
    app.use('/post', PostRoute);
    app.use('/upload',UploadRoutes);
    app.use('/chat', ChatRoute);
    app.use('/message', MessageRoute);