const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/admin');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

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
//open static folder in public mode
app.use('/public',express.static(path.join(__dirname, 'uploads'))); 
//routes
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);


app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})