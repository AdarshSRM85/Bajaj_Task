const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Za-z]+$/.test(item));
    const highestAlphabet = alphabets
      .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
      .slice(-1);

    res.json({
      is_success: true,
      user_id: "your_fullname_ddmmyyyy",
      email: "your_email@domain.com",
      roll_number: "your_roll_number",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.json({ is_success: false, error: error.message });
  }
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
