const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
  res.send('Server is running');
});

mongoose.connect(process.env.DB_URL)
.then(() => console.log('DB Connected'))
.catch(() => console.error('Error While Connecting DB'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});