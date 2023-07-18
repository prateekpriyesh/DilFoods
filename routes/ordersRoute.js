const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.SECRET_KEY);
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/orderModel");
const { protect } = require("../middleware/authMiddleware");

router.post("/placeorder", async (req, res) => {
	const { token, subtotal, currentUser, cartItems, val } = req.body;
	var payment;
	try {
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		});

		payment = await stripe.paymentIntents.create(
			{
				amount: subtotal * 100,
				currency: "inr",
				customer: customer.id,
				receipt_email: token.email,

				payment_method_types: ["card"],
			},
			{
				idempotencyKey: uuidv4(),
			}
		);
		const paymentConfirm = await stripe.paymentIntents.confirm(payment.id, {
			payment_method: "pm_card_visa",
		});
		// res.status(200).send(paymentConfirm);
		if (paymentConfirm) {
			const newOrder = new Order({
				name: currentUser.name,
				email: currentUser.email,
				userid: currentUser._id,
				orderItems: cartItems,
				orderAmount: subtotal,
				shippingAddress: {
					street: token.card.address_line1,
					city: token.card.address_city,
					country: token.card.address_country,
					pincode: token.card.address_zip,
				},
				transactionId: payment.id,
				time: val,
			});

			newOrder.save();
			res.send("Order placed successfully!");
		} else {
			res.send("Payment failed");
		}
	} catch (error) {
		return res.status(400).json({ message: "some error occurred" + error });
	}
});

router.post("/getuserorders", async (req, res) => {
	const { userid } = req.body;
	try {
		const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
		res.send(orders);
	} catch (error) {
		return res.status(400).json({ message: "some error occurred" + error });
	}
});

router.get("/getAllOrders", protect, async (req, res) => {
	const orders = await Order.find({});
	res.json(orders);
});

module.exports = router;
