"use client";

import CreateRoomBtn from "@/components/buttons/CreateRoomBtn";

export default function DashboardPage () {

  const rooms = [];

  return (
    <div>
      {
        rooms.length > 0 ?
          <span>Rooms Table Here</span>
        :
          (
            <div className="flex flex-col items-center gap-4 mt-14">
              <img src={`${process.env.NEXT_PUBLIC_SITE_URL}/images/interior-design.png`} width={220} />
              <span className="text-3xl font-bold">Create An AI Interior For Your Room</span>
              <CreateRoomBtn />
            </div>
          )
      }
    </div>
  );

}