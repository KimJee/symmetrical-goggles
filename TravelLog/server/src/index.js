const express = require('express'); // Webserver module
const morgan = require('morgan');   // Logs requests into a logger
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({origin: 'https://localhost:3000'}))

const port = process.env.PORT || 1337;



app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
    });
})

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);    // Changes the status to 404
    next(error);    // Goes onto the next middleware
  });
  
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // If the status code is 200 another route gave us an error
    // Otherwise pass in whatever status
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: error.stack,
    });
});

app.listen(port, ()  => {
    console.log(`Listening at http://localhost:${port}`);
});