const express = require('express');
require('dotenv').config();
const databaseconnect = require("./config/database")
const authRouter = require('./router/router')
const cors = require('cors')
const app = express();
const cookieParser = require("cookie-parser")

const listURL = ["http://localhost:5501", "http://127.0.0.1:5501"  ]

app.use(cors({
	origin: listURL,
	credentials: true
}))


app.use(cookieParser());
app.use(express.json());
app.use('/', authRouter)

databaseconnect();

const PORT = process.env.PORT || 3000

app.use('/', (req, res)=>{
	res.status(200).json({data: "JWT Server "})
});

app.listen(PORT, ()=>{
	console.log(`Your server URL IS : http://localhost:3000`);
})

module.exports = app;