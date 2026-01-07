
const paymentCheckRoutes = require('./Routes/AdminRoutes');
require('./Cron/PaymentCheck');
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/payment/', paymentCheckRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});