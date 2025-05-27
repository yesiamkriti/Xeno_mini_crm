const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const ingestRoutes = require('./routes/ingest')
const segmentRoutes = require('./routes/segment')
const campaignRoutes = require('./routes/campaign')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api",[ingestRoutes,segmentRoutes,campaignRoutes]);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connect to mongoDb')
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error while connecting to mongodb', err)
    process.exit(1)
  })
