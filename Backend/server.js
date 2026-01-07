require('dotenv').config();
const paymentCheckRoutes = require('./Routes/AdminRoutes');
const express = require('express');
const cors = require('cors');

//corn job exported
const{startPaymentCheck} = require('./Cron/PaymentCheck');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

startPaymentCheck();

app.use('/api/payment/', paymentCheckRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});