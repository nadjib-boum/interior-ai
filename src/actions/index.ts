"use server";
import { z } from "zod";
import userService from "@/services/user";
import APIError from "@/utils/error";
import type { SignupFormState } from "@/types";

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(4, { message: "Username must be at least 3 characters" }),
  password: z.string().min(4, { message: "Password must be at least 8 characters" })
})

export async function signup(prevState: SignupFormState, formData: FormData): Promise<SignupFormState> {
  "use server";

  try {

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validatedFields = signupSchema.safeParse({ username, email, password })
    
    if (!validatedFields.success) {

      throw new APIError ({
        status: 400,
        code: "INVALID_INPUT",
        message: "Signup input is invalid",
        details: [validatedFields.error.flatten().fieldErrors]
      });

    } 

    const user = await userService.register ({ username, email, password });

    return {
      status: "success",
      data: {
        user
      }
    };

  } catch (err: any) {

    
    if (err instanceof APIError) {
      return {
        status: "error",
        error: err.getError ()
      }
    }
    
    console.log ("err", err);

    return {
      status: "error",
      error: {
        status: 500,
        code: "SERVER_ERROR",
        message: "Something Went Wrong",
      }
    }

  } 

}