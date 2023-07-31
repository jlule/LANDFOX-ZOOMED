const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
// const jwtBlock = require('./management/jwt');

require('dotenv/config');
const url = process.env.URL;


//Middlewares

app.use(morgan('tiny'));
app.use(express.text());
app.use(express.json());
app.use(cors());
app.options('*', cors());
// app.use(jwtBlock());

//Routers
const itemRouter = require('./routers/itemsRoutes');
app.use(url + '/items', itemRouter);

const categoryRouter = require('./routers/categoryRoutes');
app.use(url + '/category', categoryRouter);

const userRouter = require('./routers/userRoutes');
app.use(url +'/users', userRouter);

const cartRouter = require('./routers/cartRoutes');
app.use(url +'/cart', cartRouter);

// Database connection
mongoose.connect(process.env.CONNECTION_STRING,
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connection to database is successful. Hooray!!!")
})
.catch((err)=>{
    console.log("Connection to database failed. Booo!!!!")
})
 app.listen(3000, ()=>{
    console.log("Server running on port 3000")

 })





 
//  mongoose.connect(process.env.CONNECTION_STRING, {
//     useNewUrlParser : true, 
//     useUnifiedTopology : true})
// .then(()=>{
//     console.log("Connection to database successfull !");
// })
// .catch(()=>{
//     console.log("Connection to database failed :/");
// })
 
 
// app.listen(3000, '0.0.0.0', ()=>{
//     console.log("Express is running on port "+process.env.PORT);
// })

