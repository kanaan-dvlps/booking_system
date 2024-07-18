import express from "express";
import bodyParser from "body-parser";
import process from "process";
import os from "os";
import cors from "cors";
import dotenv from "dotenv";
import {
  createDatabaseConnectionPool,
  closeDatabaseConnectionPool,
} from "./configs/databaseInitializer";
import {
  stablishMongoDBConnection,
  mongoDBConnctionCheck,
  closeMongoDBConnection,
  mongoDBDisconnected,
  mongoDBError,
} from "./configs/mongodb.config";
import { logWarning, logInfo, logSuccess } from "./helpers/consoleLogs.helper";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ? Routes files
import migrationsRoutes from "./routes/migrations/migrations.routes";
import login from "./routes/login";
import usersRoutes from "./routes/users/users.routes";
import propertyRoutes from "./routes/property/property.routes";
import reservationsRoutes from "./routes/reservations/reservations.routes";
import conversationRoutes from "./routes/messages/messages.routes";

// ? Router middleware
app.use("/migrations", migrationsRoutes);
app.use("/login", login);
app.use("/users", usersRoutes);
app.use("/property", propertyRoutes);
app.use("/reservations", reservationsRoutes);
app.use("/conversation", conversationRoutes);

const SERVER = app.listen(process.env.APP_PORT, () => {
  logWarning("SERVER", `-----------------------------------` + "\n");

  logSuccess("Server Started At", new Date().toLocaleString());
  logSuccess("Server Port", process.env["APP_PORT"] as string);
  logSuccess("Server Host Name", os.hostname());
  logSuccess(
    "Server IP",
    os.networkInterfaces().eth0?.[0]?.address + "\n" ?? "N/A" + "\n"
  );

  logInfo("SERVER", "connection to ODM/ORM... \n");
  // DB connection
  createDatabaseConnectionPool();
  mongoDBConnctionCheck();
  stablishMongoDBConnection();
  mongoDBError();
});

function signalHandler(signal: string) {
  if (signal) {
    console.log(`received signal: ${signal}`);
    console.log(`closing HTTP server...`);
    SERVER.close(() => {
      console.log(`HTTP server closed gracefully`);
      console.log(`closing ORM connection pool...`);
      closeDatabaseConnectionPool().then(() => {
        console.log(`ORM connection pool closed gracefully`);
        console.log(`exiting process`);
      });
      closeMongoDBConnection();
      mongoDBDisconnected();
      process.exit(0);
    });
  }
}

process.on("SIGINT", signalHandler);
process.on("SIGTERM", signalHandler);
