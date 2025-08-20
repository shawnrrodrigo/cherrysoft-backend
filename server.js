const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mailRoutes = require("./src/routes/mailRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/mail", mailRoutes);

app.get("/", (req, res) => {
  res.send("Email backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
