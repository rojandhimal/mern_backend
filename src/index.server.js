const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/admin');

// environment variables 
env.config();

// conect database
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@ecom.apruz.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(express.json());


app.use('/api',authRoutes);
app.use('/api',adminRoutes);


app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})