import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { auth } from "@/utils/auth";

export default async function ({ children }: { children: React.ReactNode }) {

  const session = await auth();

  if (!session) {
    return redirect ("/login");
  }

  return (
    <div id="dashboard">
      <Navbar />
      {children}
    </div>
  );


}