"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage () {

  return (
    <div>
      <span>Welcome To Dashboard</span>
      <br />
      <Link href={"#"} onClick={async () => await signOut({ callbackUrl: "/login" })}>Logout</Link>
    </div>
  );

}