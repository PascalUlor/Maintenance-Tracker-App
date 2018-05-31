import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';
import winston from './server/config/winston';


import routes from './server/routes/routes';


const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(cors({ credentials: true, origin: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: winston.stream }));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});

// Home page route
app.get('/', (req, res) => {
  res.status(200);
  res.json({
    name: 'Welcome to Maintenance Tracker',
    message: 'Your Service, Our Pleasure',
  });
});


// routes
app.use('/api/v1/', routes);
app.use('/api/v1/', express.static(`${__dirname}/client`));

// Trivial Route
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid routes',
  });
});


app.listen(port, () => winston.info(`Application started on port ${port}, ${process.cwd()}, ${__dirname}`));
export default app;
