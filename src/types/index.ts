import { usersTable } from "@/utils/db/schema"
import type { APIErrorParams } from "@/utils/error";

export type User = typeof usersTable.$inferInsert;

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