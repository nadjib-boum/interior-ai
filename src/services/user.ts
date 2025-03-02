import { and, eq } from "drizzle-orm";
import { db } from "@/utils/db";
import { usersTable } from "@/utils/db/schema";
import hashUtil from "@/utils/hash";
import type { LoginData, RegisterData } from "@/types";
import APIError from "@/utils/error";

class UserService {

  async login ({ username, password }: LoginData) {

    const result = await db.select().from(usersTable).where( and( eq(usersTable.username, username) ) );

    if (result.length < 1) {
      throw new APIError ({
        status: 401,
        code: "INVALID_CREDENTIALS",
        message: "Username or Password are incorrect",
      });
    }

    const isPasswordCorrect = await hashUtil.isHashValid (password, result[0].password);

    if (!isPasswordCorrect) {
      throw new APIError ({
        status: 401,
        code: "INVALID_CREDENTIALS",
        message: "Username or Password are incorrect",
      });
    }

    return result[0] || null;

  }

  async register ({ username, email, password }: RegisterData) {

    const existingUsers = await db.select().from (usersTable).where(eq(usersTable.email, email));

    if (existingUsers.length > 0) {

      throw new APIError ({
        status: 400,
        code: "DUPLICATE_RESOURCE",
        message: "Email already in use",
      });

    }

    const hashedPassword = await hashUtil.hash (password);

    const result = await db.insert (usersTable).values ({ username, email, password: hashedPassword }).returning ({ id: usersTable.id });

    return result[0] || null;

  }

}

const userService = new UserService ();

export default userService;