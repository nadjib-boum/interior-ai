import { Button } from "@/components/ui/button";
import Link from "next/link";

const CreateRoomBtn = () => {

  return (
    <Link href={"/dashboard/new-room"}>
      <Button>Create Room</Button>
    </Link>
  );

}

export default CreateRoomBtn;