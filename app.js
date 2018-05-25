import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';


import routes from './server/routes/routes';


const app = express();


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// Home page route
app.get('/', (req, res) => {
  res.status(200);
  res.json({
    name: 'Welcome to Maintenance Tracker',
    message: 'Your Service, Our Pleasure'
  });
});


// routes
app.use('/api/v1/', routes);

// Trivial Route
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid routes'
  });
});


app.listen(port, () => console.log(`Application started on port ${port}, ${process.cwd()}, ${__dirname}`));
export default app;
