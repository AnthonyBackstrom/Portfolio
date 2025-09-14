const express = require('express');
const { Pool } = require('pg');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");

const app = express();
app.use(helmet())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testi 
const cors = require('cors');
// Enable CORS for all origins
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var corsOptions = {
    origin: 'http://frontend:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

// Testi loppuu 
 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','http://frontend:3000');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({});
  }
  next();
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' // only use SSL in production
});

//Endpoints
const endpoints = [
  require("./endpoints/adduser"),
  require("./endpoints/answers"),
  require("./endpoints/hash"),
  require("./endpoints/login"),
  require("./endpoints/skills"),
  require("./endpoints/softskills"),
  require("./endpoints/upload")
];

endpoints.forEach(endpoint => endpoint.setup(app, pool));
//Endpoints

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  if(process.env.JWT_SECRET === undefined) {
    console.log("JWT_SECRET not found, exiting.");
    process.exit(4);
  }
  console.log(`Server listening on port ${PORT}`);
});
