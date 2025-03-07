import { db } from "@/utils/db";
import { roomsTable } from "@/utils/db/schema";
import aiUtil from "@/utils/ai";
import { Room } from "@/types";

class RoomService {

  async createRoomImage ({ roomType, designType, details, originalImage, userId }: Omit<Room, 'newImage'>) {

    const newImage = await aiUtil.generateImage ({ prompt: "Generate a yellow apple image" })

    const room = await db.insert(roomsTable).values({
      roomType,
      designType,
      details,
      originalImage,
      newImage,
    }).returning();

    return room[0];

  }

}

const roomService = new RoomService ();

export default roomService;