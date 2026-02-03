import z from "zod";

const createPatientValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  patient: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    address: z.string().min(1, "Address is required").optional(),
  }),
});

export const UserValidation = {
  createPatientValidationSchema,
};
