const express = require('express');
require('dotenv').config();
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const SERVER_PORT = 7000;
app.use(cors());
app.use(express.json());

const users = require('./routes/user.jsx');

app.get('/', (req, res) => {
    res.send('Hong Movie server is up and running well !!');
})

app.use('/user', users);
server.listen(process.env.PORT || SERVER_PORT, () => {
    console.log(`server is listening to ${SERVER_PORT}`);
})