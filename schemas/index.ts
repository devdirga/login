import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 character required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Minimum 6 character required",
  }),
  name: z.string().min(10, {
    message: "Minimum 10 character required",
  }),
});

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Minimum 6 character required",
  }),
  name: z.string().min(10, {
    message: "Minimum 10 character required",
  }),
});
