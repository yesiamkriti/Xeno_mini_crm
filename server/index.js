const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const customers = require('./routes/customerRoutes');
const orders = require('./routes/orderRoutes');
const campaign = require('./routes/campaignRoutes');
const receipt = require('./routes/receiptRoute');
const auth = require('./routes/authRoutes');
const ai = require('./routes/aiRoutes');
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",[customers, orders, campaign, receipt,auth,ai]);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
