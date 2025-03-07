"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import ImageResizable from "@/components/ImageResizable";

type ResultDiologProps = {
  originalImage: string;
  newImage: string;
} 

const ResultDialog = ({ originalImage, newImage }: ResultDiologProps) => {

  const router = useRouter ();

  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Here is your design</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <ImageResizable originalImage={originalImage} newImage={newImage}  />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link href={newImage} target="_blank">
            <Button variant={"secondary"}>Download</Button>
          </Link>
          <Button onClick={() => router.push("/dashboard")}>Close</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

}

export default ResultDialog;