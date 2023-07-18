const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

app.use(cors());
dotenv.config();
connectDB();
app.use(express.json());

const thaliRoute = require("./routes/thalisRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

app.use("/api/thalis", thaliRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);

app.get("/", (req, res) => {
	res.send("Server Working🔥");
});

const port = process.env.PORT || 5000;
app.listen(port, () => `Server listening on ${port}`);
