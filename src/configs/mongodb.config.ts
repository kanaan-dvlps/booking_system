import ODM from "mongoose";
import {
  logSuccess,
  logError,
  logInfo,
  logWarning,
} from "../helpers/consoleLogs.helper";

export function stablishMongoDBConnection() {
  ODM.connect(process.env["MONGO_CONNECTION_URL"] as string);
}

export function mongoDBConnctionCheck() {
  ODM.connection.on("connected", () => {
    logSuccess("From MongoDB", "MongoDB connection established");

    logSuccess("Host", process.env["MONGO_DB_HOST"] as string);
    logSuccess("Port", process.env["MONGO_PORT"] as string);
    logSuccess("Database", (process.env["MONGO_DB_NAME"] as string) + "\n");

    logInfo("SERVER", `process PID ${process.pid} started` + "\n");
    logWarning("SERVER", `-----------------------------------`);
  });
}

export function closeMongoDBConnection() {
  ODM.connection.close(false);
  logWarning("From MongoDB", "Database connection closed gracefully");
}

export function mongoDBDisconnected() {
  ODM.connection.on("disconnected", () => {
    logWarning("From MongoDB", "MongoDB connection closed");
  });
}

export function mongoDBError() {
  ODM.connection.on("error", (error) => {
    if (error) logError("MongoDB connection error: ", error.message);
  });
}
