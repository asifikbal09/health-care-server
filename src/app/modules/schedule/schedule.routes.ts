import { Router } from "express";
import { ScheduleController } from "./schedule.controller";


const router = Router();

router.post("/", ScheduleController.scheduleInsertData)

router.get("/", ScheduleController.getScheduleData)

export const scheduleRoutes = router;