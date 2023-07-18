const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please enter all the required fields.");
	}
	const isUserExists = await User.findOne({ email });
	if (isUserExists) {
		res.status(400);
		throw new Error("User already exists, kindly login!");
	}

	try {
		const newUser = await User.create({ name, email, password });
		if (newUser) {
			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				token: generateToken(newUser._id),
			});
		}
	} catch (error) {
		return res.status(400).json({ message: error });
	}
});
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401).json({ message: "Invalid credentials" });
	}
});

module.exports = router;
