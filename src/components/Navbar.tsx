"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {

  return (
    <div className="flex justify-between items-center py-2 px-10 border-b-1 border-gray-200">
      <div>
        <Link href={"/dashboard"}>
          <img src={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`} alt="logo" width={40} />
        </Link>
      </div>
      <div>
        <Button variant={"ghost"} className="cursor-pointer flex items-center" onClick={async () => await signOut({ callbackUrl: "/login" })}>
          Logout
        </Button>
      </div>
    </div>
  );

}

export default Navbar;