
import { Router } from "express";
import { ScheduleController } from "../schedule/schedule.controller";
import { Doc } from "zod/v4/core";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";



const router = Router();

router.post("/",auth(UserRole.DOCTOR),DoctorScheduleController.insertIntoDB)

export const doctorScheduleRoutes = router;