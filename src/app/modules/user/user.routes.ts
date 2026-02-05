import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../helper/fileUploader";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createPatientValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    next();
  },
  UserController.createPatient,
);
router.post(
  "/create-admin",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    next();
  },
  UserController.createAdmin,
);

export const userRoutes = router;
