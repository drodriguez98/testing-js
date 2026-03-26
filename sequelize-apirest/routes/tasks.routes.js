import { Router } from "express";

import { createTask, getTasks, updateTask, deleteTask, getTask } from "../src/controllers/tasks.controller.js";

const router = Router();

// Routes

router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/", getTasks);
router.get("/:id", getTask);

export default router;