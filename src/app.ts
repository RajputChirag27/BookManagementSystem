import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './inversifyConfig';
import dotenv from 'dotenv'
import swaggerDocument from '../swagger.json'
import swaggerUi from 'swagger-ui-express';
dotenv.config();

// Set up Express server
const app = express();

// Create InversifyExpressServer instance
const server = new InversifyExpressServer(container, null, { rootPath: '/api' }, app);

// Configure swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configure controllers
server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
