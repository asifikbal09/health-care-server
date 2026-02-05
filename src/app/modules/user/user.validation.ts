import z from "zod";

const createPatientValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  patient: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    address: z.string().min(1, "Address is required").optional(),
  }),
});
const createAdminValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  admin: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    contactNumber: z.string().optional(),
  }),
});
const createDoctorValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  doctor: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    contactNumber: z.string().optional(),
    address: z.string().min(1, "Address is required").optional(),
    registrationNumber: z.string().min(1, "Registration Number is required"),
    experience: z.number().min(0, "Experience must be a non-negative number"),
    gender: z.string().min(1, "Gender is required"),
    appointmentFee: z.number().min(0, "Appointment Fee must be a non-negative number"),
    qualification: z.string().min(1, "Qualification is required"),
    currentWorkingPlace: z.string().min(1, "Current Working Place is required"),
    designation: z.string().min(1, "Designation is required"),
  }),
});

export const UserValidation = {
  createPatientValidationSchema,
  createAdminValidationSchema,
  createDoctorValidationSchema
};
