const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

const thali = require("../models/thaliModel");

router.get("/getAllThalis", protect, async (req, res) => {
	try {
		const thalis = await thali.find({});
		res.send(thalis);
	} catch (error) {
		return res.status(400).json({ message: error });
	}
});

module.exports = router;
