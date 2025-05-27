const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors');
const dotenv =require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOURI)
.then(()=>{
    console.log("Connect to mongoDb");
    app.listen(process.env.PORT, ()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
