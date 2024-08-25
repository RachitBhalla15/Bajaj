const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const user_id = "Rachit_Bhalla_15082002"; // Replace with dynamic generation
  const email = "rachit.bhalla2021@vitstuden.ac.in";
  const roll_number = "21BAI1869";

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highest_lowercase_alphabet = alphabets
    .filter(char => char === char.toLowerCase())
    .sort((a, b) => b.localeCompare(a))[0] || "";

  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
