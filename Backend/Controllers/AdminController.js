
const db = require('../Utils/db');

const checkPaymentStatus = async (req, res) => {

    try {
        const [payments] = await db.query(`
      SELECT p.customer_id, p.status, p.created_at
      FROM payments p
      INNER JOIN (
        SELECT customer_id, MAX(created_at) AS latest_payment
        FROM payments
        GROUP BY customer_id
      ) latest
      ON p.customer_id = latest.customer_id
      AND p.created_at = latest.latest_payment
    `);

        const now = new Date();

        for (const payment of payments) {
            const paymentTime = new Date(payment.created_at);
            const diffMinutes = (now - paymentTime) / (1000 * 60);

            if (payment.status === "FAILED" || (payment.status === "PENDING" && diffMinutes > 15)) {
                await db.query(
                    "UPDATE customers SET status = 'BLOCKED' WHERE id= ?", [payment.customer_id]
                )
            }
        }

        console.log("payment check completed")

    } catch (err) {
        console.error("Payment status check failed:", err.message);
    }

}

module.exports = { checkPaymentStatus };