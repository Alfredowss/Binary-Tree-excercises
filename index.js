const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express');
const app = express();
const {router} = require('./routes/index')

//configs
require('dotenv').config()
app.set('view engine', 'pug');

//statics
app.use('/public', express.static(path.join(__dirname, 'public')))

//middlewars
app.use(bodyParser.json());
app.use(cors());


//routes
app.use(router);

//errors
app.use((err, req, res, next)=>{
	console.log(err)
	res.json({ error: 'internal error' })
});

//listening
app.listen(process.env.PORT || 8000, ()=>{
	console.log('listening on http://localhost:8000')
})
