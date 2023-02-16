// app.js


const express = require('express');
const connectDB = require('./config/db');



const app = express();


const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));





const routes = require('./routes/api/users');
app.use('/api/users', routes);


// Connect Database
connectDB();


app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));