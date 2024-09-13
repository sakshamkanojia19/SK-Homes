import express from 'express';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';

import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
dotenv.config()


const app = express();
const PORT  = process.env.PORT || 8080; //8080 is fall back 

app.use(express.json())
app.use(cookieParser())
app.use(cors()) ;         //cors for cross origin errors

//listen to server by clg using arrow funfor console
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

//route
app.use('/api/user',userRoute)

app.use("/api/residency",residencyRoute)