"use server";
import userService from "@/services/user";
import roomService from "@/services/room";
import APIError from "@/utils/error";
import { auth } from "@/utils/auth";
import { type SignupFormState, type GenerateRoomData, generateRoomSchema, signupSchema } from "@/types";

export async function signup(formData: FormData): Promise<SignupFormState> {
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


export async function generateRoom (data: GenerateRoomData) {

  try {

    const session = await auth ();

    if (!session) {
      throw new APIError ({
        status: 400,
        code: "INVALID_CREDENTIALS",
      });
    }

    const validatedFields = generateRoomSchema.safeParse(data);

    if (!validatedFields.success) {

      throw new APIError ({
        status: 400,
        code: "INVALID_INPUT",
        message: "Room Data is invalid",
        details: [validatedFields.error.flatten().fieldErrors],
      });

    }

    const { imageUrl, roomType, designType, details } = data;

    const image = await roomService.createRoomImage ({
      originalImage: imageUrl,
      roomType,
      designType,
      details,
      userId: +session.user.id,
    });

    return {
      status: "success",
      data: {
        image
      }
    };

  } catch (error) {

    if (error instanceof APIError) {

      const errData = error.getError ();

      return {
        status: "error",
        error: errData
      };

    }

    console.log ("error", error);

    return {
      status: "error",
      error: {
        message: "Something Went Wrong"
      }
    };

  }

}