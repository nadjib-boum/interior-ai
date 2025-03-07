import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/utils/auth";

const f = createUploadthing();

export const ourFileRouter = {

  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {

      const session = await auth ();

      if (!session) throw new UploadThingError("Unauthorized");

      return { user: session.user };

    })
    .onUploadComplete(async ({ metadata, file }) => {}),
    
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
