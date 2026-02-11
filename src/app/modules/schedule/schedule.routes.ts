import { Router } from "express";
import { ScheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/", ScheduleController.scheduleInsertData);

router.get(
  "/",
  auth(UserRole.DOCTOR, UserRole.ADMIN),
  ScheduleController.getScheduleData,
);

router.delete("/:id", ScheduleController.deleteSchedule);

export const scheduleRoutes = router;
