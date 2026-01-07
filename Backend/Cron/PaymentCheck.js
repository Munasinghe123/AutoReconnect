
console.log(">>> PaymentCheck.js LOADED <<<");

const cron = require('node-cron');

console.log("cron value:", cron);

const { checkPaymentStatus } = require('../Controllers/AdminController');


function startPaymentCheck() {
    cron.schedule("*/1 * * * *", async () => {
        console.log("Running payment status check...");
        await checkPaymentStatus();
    });
}
module.exports = {startPaymentCheck}

