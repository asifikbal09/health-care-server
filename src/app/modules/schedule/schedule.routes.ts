import { Router } from "express";
import { ScheduleController } from "./schedule.controller";


const router = Router();

router.post("/", ScheduleController.scheduleInsertData)

router.get("/", ScheduleController.getScheduleData)

router.delete("/:id", ScheduleController.deleteSchedule)

export const scheduleRoutes = router;