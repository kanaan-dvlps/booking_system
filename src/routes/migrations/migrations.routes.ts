import { Router } from "express";
import {
  listMigrationFiles,
  migrateToLatest,
  migrateUp,
  rollbackMigration,
} from "../../controllers/migrations/migrationRunner.controller";
const router = Router();

router.get("/list", async (req, res) => {
  try {
    const migrationList = await listMigrationFiles();
    res.status(200).send(migrationList);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/latest", async (req, res) => {
  try {
    const migrationResult = await migrateToLatest();
    res.status(200).send(migrationResult);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/up", async (req, res) => {
  try {
    const migrationResult = await migrateUp();
    res.status(200).send(migrationResult);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/rollback", async (req, res) => {
  try {
    const migrationResult = await rollbackMigration();
    res.status(200).send(migrationResult);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
