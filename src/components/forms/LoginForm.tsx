"use client";

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthAlert from "@/components/alerts/AuthAlert";
import { cn } from "@/helpers/shadcn"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const [ loginData, setLoginData ] = useState<{ username: string; password: string; }>({ username: "", password: "" });
  const [ error, setError ] = useState<string | null> (null);
  const [ loading, setLoading ] = useState<boolean> (false);
  const router = useRouter ();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault ();

    setError (null);

    setLoading (true);

    const { username, password } = loginData;

    const loginOp = await signIn ("credentials", {
      redirect: false,
      username,
      password
    })

    setLoading (false);

    if (loginOp?.error) return setError ("Invalid Credentials")

    router.push("/dashboard");

  }
  
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Username</Label>
          <Input id="username" type="text"  value={loginData.username} onChange={(e) => setLoginData ((prev) => ({ ...prev, username: e.target.value }))} required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password"  value={loginData.password} onChange={(e) => setLoginData ((prev) => ({ ...prev, password: e.target.value }))} required />
        </div>
        <Button type="submit" className="w-full cursor-pointer" disabled={loading} onClick={handleClick}>
          { loading ? <Loader2 className="animate-spin" /> : "Login" }
        </Button>
        { error ? <AuthAlert message={error} /> : null}
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}
