const mongoose = require("mongoose");
const thaliSchema = mongoose.Schema(
	{
		name: { type: String, require },
		subscription: [],
		prices: [],
		category: { type: String, require },
		image: { type: String, require },
		description: { type: String, require },
	},
	{
		timestamps: true,
	}
);

const thaliModel = mongoose.model("thalis", thaliSchema);

module.exports = thaliModel;
