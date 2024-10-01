const cluster = require('cluster');
const os = require('os')
require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const basketRoutes = require('./routes/basketRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


const cors = require("cors");
const DATABASE_URL = process.env.DATABASE_URL;



const app = express();


app.use(express.json());
app.use(cors())

if(cluster.isMaster){
    const numCPUs = os.cpus().length;

    console.log(`Master is running`)
    console.log(`Forking ${numCPUs} workers ...`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Forking a new one...`);
        cluster.fork();
    });
}
else{


mongoose.connect(DATABASE_URL)
.then(()=> console.log("Connected to MongoDB Atlas"))
.catch((err)=> console.error("Error connecting to MongoDB Atlas"))

app.use('/orders',orderRoutes);
app.use('/products',productRoutes);
app.use('/users',userRoutes);
app.use('/auth',authRoutes);
app.use('/basket',basketRoutes);
app.use('/category',categoryRoutes);


app.listen(4000,()=>{
    console.log(`Server running on ${process.pid} @4000`)
})

}