import { z } from "zod";

const emailSchema = z.email().trim();

const usernameSchema = z
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and _",
  );

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be at most 72 characters");

const avatarSchema = z.url().trim().optional().nullable();

const loginWithEmail = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const loginWithUsername = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const userZod = {
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
  avatar: avatarSchema,

  signup: z.object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
  }),

  login: z.union([loginWithEmail, loginWithUsername]),

  updateMe: z
    .object({
      username: usernameSchema.optional(),
      avatar: avatarSchema,

      currentPassword: z.string().min(1).optional(),
      newPassword: passwordSchema.optional(),
    })
    .refine(
      (data) => {
        const wantsChange =
          data.currentPassword !== undefined || data.newPassword !== undefined;

        if (!wantsChange) return true;

        return !!data.currentPassword && !!data.newPassword;
      },
      {
        message:
          "To change password, provide both currentPassword and newPassword",
      },
    ),
};
