"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthAlert from "@/components/alerts/AuthAlert";
import SignupButton from "@/components/buttons/SubmitButton";
import { signup } from "@/actions"
import { cn } from "@/helpers/shadcn"
import ErrorField from "../ErrorField";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const router = useRouter();
  const [state, formAction] = useActionState (signup, { status: "error" });
  const [ loginData, setLoginData ] = useState<{ username: string; password: string; }>({ username: "", password: "" });

  useEffect(() => {

    (async () => {

      if (state.status == "success") {

        const signInOp = await signIn ("credentials", {
          redirect: false,
          username: loginData.username,
          password: loginData.password,
        })

        if (signInOp?.error) {
    
          return {
            status: "error",
            error: {
              message: "Auth Error"
            }
          }
    
        }

        router.push('/dashboard');

      }

    })();  

  }, [state, router]);

  return (
    <form className={cn("flex flex-col gap-6", className)} action={formAction} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" name="username" value={loginData.username} onChange={(e) => setLoginData ((prev) => ({ ...prev, username: e.target.value }))} required />
          { state.error?.code == "INVALID_INPUT" && <ErrorField error={state.error?.details![0]?.username} /> }
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" required />
          { state.error?.code == "INVALID_INPUT" && <ErrorField error={state.error?.details![0]?.email} /> }
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" name="password" value={loginData.password}  onChange={(e) => setLoginData ((prev) => ({ ...prev, password: e.target.value }))} required />
          { state.error?.code == "INVALID_INPUT" && <ErrorField error={state.error?.details![0]?.password} /> }
        </div>
        <SignupButton text="Sign up" pendingText="Creating an account..." />
      </div>
      { state.error?.message ? <AuthAlert message={state.error.message} /> : null }
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  )
}
