import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import chokidar from 'chokidar';


import routes from './server/routes/routes';

const app = express();

const watcher = chokidar.watch('server');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// Watcher function
watcher.on('ready', () => {
  watcher.on('all', () => {
    console.log('Clearing /dist/ module cache from server');
    Object.keys(require.cache).forEach((id) => {
      if (/[/\\]app[/\\]/.test(id)) delete require.cache[id];
    });
  });
});

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
