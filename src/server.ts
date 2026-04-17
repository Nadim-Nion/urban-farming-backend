import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import config from './app/config/index.js';
import seedSuperAdmin from './app/db';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url!);

    await seedSuperAdmin();

    server = app.listen(config.port, () => {
      console.log(`Express Project Setup listening on port ${config.port} 😊`);
    });
  } catch (error) {
    console.error('Error connecting to the database 😢:', error);
  }
}

main();

/* 
Handle Unhandled Rejection and Uncaught Exception errors from outside of the Express Application. These errors are not handled by the global error handler of the Express Application. So, we need to handle them separately here in the server.ts file.
*/

process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection is detected. Server is Shutting down... 😈');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('Uncaught Exception is detected. Server is Shutting down... 😈');

  process.exit(1);
});

// Promise.reject();
// console.log(x);
