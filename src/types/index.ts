import { z } from "zod";
import { roomsTable, usersTable } from "@/utils/db/schema"
import type { APIErrorParams } from "@/utils/error";

export type User = typeof usersTable.$inferInsert;

export type Room = typeof roomsTable.$inferInsert;

export type LoginData = {
  username: string;
  password: string;
}

export type RegisterData = {
  username: string;
  email: string;
  password: string;
}

export type SignupFormState = {
  status: "success" | "error";
  data?: {
    user: {
      id: number;
    }
  };
  error?: APIErrorParams
}


declare module "next-auth" {

  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
    };
  }
  
  interface User {
    id: string;
    email: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
  }
}

export type FormStepProps = {
  setFieldValue: (name: string, value: string | File) => void;
  error?: string;
}

export type InteriorFormDataParams = {
  image: File | null;
  roomType: "" | "living room" | "bedroom" | "kitchen" | "office" | "bathroom";
  designType: string;
  details?: string;
}

export type InteriorFormErrors = {
  image?: string;
  roomType?: string;
  designType?: string;
  details?: string;
}

export type DesignItem = {
  label: string;
  url: string;
}

export type RoomItem = {
  name: string;
  label: string;
}

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(4, { message: "Username must be at least 3 characters" }),
  password: z.string().min(4, { message: "Password must be at least 8 characters" })
})

export const generateRoomSchema = z.object({
  imageUrl: z.string().nonempty(),
  imageKey: z.string().nonempty(),
  roomType: z.string().nonempty(),
  designType: z.string().nonempty(),
  details: z.string().optional(),
})


export type GenerateRoomData = z.infer<typeof generateRoomSchema>;
